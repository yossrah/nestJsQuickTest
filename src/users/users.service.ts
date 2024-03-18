import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserProfileDto } from './dto/create-userProfile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>) {}
   async createUser(createUserDto:CreateUserDto){
   try{ const { email } = createUserDto;
    // Check if the email already exists
    const existingUser = await this.userRepository.findOneBy({ email });
    if(existingUser){
        throw new ConflictException('Email already exists');
    }
    const characters=process.env.CHARACTERS
                    let activationCode="";
                    for(let i=0;i<25;i++){
                        activationCode+=characters[Math.floor(Math.random()*characters.length)]
                    }
    const newUser=  this.userRepository.create({...createUserDto,
                    CreatedAt:new Date(),
                    isActive:false,
                    activationCode:activationCode})
    return this.userRepository.save(newUser);
   }catch(error){
    if (error instanceof ConflictException) {
      throw error; // Rethrow conflict exception
  } else {
      // Handle other exceptions (e.g., database error)
      throw new InternalServerErrorException('Failed to create user');
  }
   }  
    }
   async findAll(){
        const users=await this.userRepository.find({relations:['profile']})
        return users
    }
    async findOne(id: number) {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
        relations:['profile']
      });
      if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
  }
   async update(id:number,updateUserDto:UpdateUserDto){
    return await this.userRepository.update(id, updateUserDto)
     
    }
   async remove(id:number){
    return this.userRepository.delete({id})}
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
      async createUserProfile(id:number,createUserProfile:CreateUserProfileDto){
        const user=await this.userRepository.findOneBy({id})
        if(!user){
          throw new HttpException('User not found cannot create profile',HttpStatus.BAD_REQUEST)
        }
        const newProfile=this.profileRepository.create(createUserProfile)
        const savedProfile=await this.profileRepository.save(newProfile)//save is async
        user.profile= savedProfile
        return this.userRepository.save(user)

      }
}
