import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dtos/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'

import { MailingService } from 'src/mailing/mailing.service';
import { SendEmailDto } from 'src/mailing/mailing.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from './dtos/createUser.dto';
import { Utilisateur} from 'src/users/entities/users.entity';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(Utilisateur) private readonly userRepository:Repository<Utilisateur>,
    private readonly mailingService: MailingService,
    private jwtService:JwtService){}

    private async hashPassword(password: string, salt: string): Promise<string> {//return Promise<string> because it is asyn funct
      return bcrypt.hash(password, salt)
    }

    async register(createUserDto:CreateUserDto):Promise<Utilisateur>{
      const {username,password}=createUserDto
      try{
        const existingUser=await this.userRepository.findOneBy({username})
        if(existingUser){
          throw new ConflictException('Username already exists'); 
        }
        //generate activation token
        const characters = process.env.CHARACTERS
        let activationToken = "";
        for (let i = 0; i < 25; i++) {
          activationToken += characters[Math.floor(Math.random() * characters.length)]
         }
        //hashing password 
        // a salt is unique per user
        const salt=await bcrypt.genSalt()
        //console.log('saaaaaaaaaaaaaaalt',salt)
        const newUser = this.userRepository.create({
          ...createUserDto,
          CreatedAt: new Date(),
          isActive: false,
          activationToken: activationToken
        })
        newUser.password= await this.hashPassword(newUser.password, salt)
        // Send activation email to the user
        const dto: SendEmailDto = {
          from: 'yossrahashassi20@gmail.com',
          to: username,
          subject: 'Confirm your account',
          html: `<div>
                  <h1>Confirmation email</h1>
                  <h2>Good morning</h2>
                  <p>To activate your account, click this link:</p>
                  <a href="http://localhost:3001/quicktest/confirm/${activationToken}">Click here!</a>
              </div>`
        }
        await this.mailingService.sendEmail(dto);
        //save user to db
        return await this.userRepository.save(newUser);
      }
      catch(error){
        
        if (error instanceof ConflictException) {
          throw error; // Rethrow conflict exception
        } 
        else {
          // Handle other exceptions (e.g., database error)
          throw new InternalServerErrorException('Failed to create user');
        }
      }
      
    }
    


    async validateUser({username,password}:AuthPayloadDto):Promise<{accessToken:string}>{
        const existingUser = await this.userRepository.findOneBy({ username });
        if (!existingUser) {
        throw new ConflictException('unvalid credentials');
         }
    // Compare the provided password with the hashed password stored in the database
     const isPasswordValid =await this.validatePassword(password, existingUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }  
    //extract the payload structure into an interface
    const payload:JwtPayload= { username: existingUser.username, id: existingUser.id, role: existingUser.role };
    const accessToken = await this.jwtService.sign(payload);
    return {accessToken}
    }
    private async validatePassword(password:string,userpassword:string){
      return await bcrypt.compare(password, userpassword);

    }
}
