import {  HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserProfileDto } from './dto/create-userProfile.dto';
import { Profile } from './entities/profile.entity';
import { Utilisateur } from './entities/users.entity';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(Utilisateur) private readonly userRepository: Repository<Utilisateur>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>) { }

  async findAll(role: "Tester" | "Admin" | "TeamLeader" | "", currentPage: number,): Promise<Utilisateur[]> {
    //fixing pagination, skip elements = numbrElements* (currentPage-1) to skip the previous elements
    const resPerPage = 3
    const skip = resPerPage * (currentPage - 1)
    let queryBuilder = this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.profile', 'profile');
    //Pagination is implemented using offset and limit methods of the query builder to skip elements and limit the number of results per page.
    if (role === "") {
      const users = await queryBuilder.offset(skip).limit(resPerPage).getMany();
      return users;
    }

    const users = this.userRepository.findBy({ role })
    return users
  }
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['profile']
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto)

  }
  async remove(id: number): Promise<void> {
    this.userRepository.delete({ id })
  }
  async countAll(): Promise<number> {
    try {
      // Count the number of users in the database
      const count = await this.userRepository.count();
      return count;
    } catch (error) {
      // If an error occurs, handle it appropriately
      throw new Error(`Failed to count users: ${error.message}`)
    }
  }
  async createUserProfile(id: number, createUserProfile: CreateUserProfileDto): Promise<Utilisateur> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new HttpException('User not found cannot create profile', HttpStatus.BAD_REQUEST)
    }
    const newProfile = this.profileRepository.create(createUserProfile)
    const savedProfile = await this.profileRepository.save(newProfile)//save is async
    user.profile = savedProfile
    return this.userRepository.save(user)

  }
  async activateAccount(activationToken: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ activationToken })
    if (user) {
      user.isActive = true
      return this.userRepository.save(user)
    }
    throw new HttpException('User not found cannot activate account', HttpStatus.BAD_REQUEST)
  }
  async getUsersByRole(role: "Tester" | "Admin" | "TeamLeader") {
    const users = this.userRepository.findBy({ role })
    return users
  }

}
