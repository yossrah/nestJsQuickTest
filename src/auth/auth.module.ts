import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PassportModule } from '@nestjs/passport';
import { MailingService } from 'src/mailing/mailing.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Utilisateur } from 'src/users/entities/users.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';



@Module({
  imports:[
    ConfigModule.forRoot(),
    //provide the strategy
    PassportModule.register({defaultStrategy:'jwt'}),
    //jwtModule setup
    JwtModule.register({
      //secret key to sign the payload for jwt token
      secretOrPrivateKey: process.env.ACESS_TOKEN_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([Utilisateur]),
    
  ],
  controllers: [AuthController],
  providers: [ /*{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },*/
  AuthService,
    MailingService,
    ConfigService,
  JwtStrategy],
  //to guard other modules with  PassportModule and JwtStrategy
  exports:[
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
