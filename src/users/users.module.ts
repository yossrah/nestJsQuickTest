import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './entities/profile.entity';
import { Post } from 'src/posts/entities/post.entity';
import { MailingService } from 'src/mailing/mailing.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Utilisateur } from './entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports:[ConfigModule.forRoot(),
    /*PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secretOrPrivateKey: process.env.ACESS_TOKEN_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),*/
    TypeOrmModule.forFeature([Utilisateur,Profile,Post]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService,MailingService,ConfigService,JwtService,
    
  ],
  //to guard other modules with  PassportModule and JwtStrategy
  exports:[
   // PassportModule
  ]
})
export class UsersModule {}
