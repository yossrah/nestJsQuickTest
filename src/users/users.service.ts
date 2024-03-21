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
import * as bcrypt from 'bcrypt'
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    private readonly mailingService:MailingService,
    private readonly jwtService:JwtService
    ) {}
    private async hashPassword(password:string,salt:string):Promise<string>{//return Promise<string> because it is asyn funct
      return bcrypt.hash(password,salt)
    }
   async signUp(createUserDto:CreateUserDto){
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
    //generate unique salt
      const salt= await bcrypt.genSalt() //you can also save the salt to the db and add a column for the user entity
      //newUser.salt=salt
      const newUser=  this.userRepository.create({...createUserDto,
                    CreatedAt:new Date(),
                    isActive:false,
                    activationCode:activationCode})
      newUser.password= await this.hashPassword(newUser.password,salt)
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
    async signIn(authCredentials:AuthCredentialsDto):Promise<string>{
      const {email,password}=authCredentials
      const existingUser = await this.userRepository.findOneBy({ email });
        if(!existingUser){
          throw new ConflictException('unvalid credentials');
        }
         // Compare the provided password with the hashed password stored in the database
         const isPasswordValid = await bcrypt.compare(password, existingUser.password);
         if (!isPasswordValid) {
             throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
         }
         const payload:JwtPayload = { email: existingUser.email, sub: existingUser.id ,role: existingUser.role};
         const accessToken=this.jwtService.sign(payload);
         return accessToken
    }
   async findAll(role:"Tester"|"Admin"|"TeamLeader"|"",currentPage:number): Promise<User[]>{
    //fixing pagination, skip elements = numbrElements* (currentPage-1) to skip the previous elements
     const resPerPage=3
     const skip= resPerPage * (currentPage - 1)
     let queryBuilder = this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.profile', 'profile');
     //Pagination is implemented using offset and limit methods of the query builder to skip elements and limit the number of results per page.
       if(role===""){
        const users = await queryBuilder.offset(skip).limit(resPerPage).getMany();
        return users;
       }
       
       const users= this.userRepository.findBy({role})
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
