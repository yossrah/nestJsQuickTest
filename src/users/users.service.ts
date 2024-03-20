import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserProfileDto } from './dto/create-userProfile.dto';
import { Profile } from './entities/profile.entity';
import { MailingService } from 'src/mailing/mailing.service';
import { SendEmailDto } from 'src/mailing/mailing.interface';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    private readonly mailingService:MailingService
    ) {}
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

// Send activation email to the user
      const dto:SendEmailDto={
      from: 'yossrahashassi20@gmail.com',
      to: email,
      subject: 'Confirm your account',
      html: `<div>
                <h1>Confirmation email</h1>
                <h2>Good morning</h2>
                <p>To activate your account, click this link:</p>
                <a href="http://localhost:3001/quicktest/confirm/${activationCode}">Click here!</a>
            </div>`
}
    await this.mailingService.sendEmail(dto);
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
   async findAll(): Promise<User[]>{
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
   async remove(id:number): Promise<void>{
    this.userRepository.delete({id})}
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
  async createUserProfile(id:number,createUserProfile:CreateUserProfileDto): Promise<User>{
        const user=await this.userRepository.findOneBy({id})
        if(!user){
          throw new HttpException('User not found cannot create profile',HttpStatus.BAD_REQUEST)
        }
        const newProfile=this.profileRepository.create(createUserProfile)
        const savedProfile=await this.profileRepository.save(newProfile)//save is async
        user.profile= savedProfile
        return this.userRepository.save(user)

      }
  async activateAccount(activationCode:string,updateUserDto:UpdateUserDto){
      const user=await this.userRepository.findOneBy({activationCode})
      if(user){
       user.isActive=true
       return this.userRepository.save(user)
      }
      throw new HttpException('User not found cannot activate account',HttpStatus.BAD_REQUEST)
      }
  async getUsersByRole(role:"Tester"|"Admin"|"TeamLeader") {
      const users= this.userRepository.findBy({role})
      return users}
      
}
