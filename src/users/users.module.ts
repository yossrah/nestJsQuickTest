import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './entities/profile.entity';
import { Post } from 'src/posts/entities/post.entity';
import { MailingService } from 'src/mailing/mailing.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Utilisateur } from './entities/users.entity';

@Module({
  imports:[ConfigModule.forRoot(),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secretOrPrivateKey: process.env.ACESS_TOKEN_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([Utilisateur,Profile,Post]),
  ],
  controllers: [UsersController],
  providers: [UsersService,MailingService,ConfigService,
    
  ],
  //to guard other modules with  PassportModule and JwtStrategy
  exports:[
    
    PassportModule
  ]
})
export class UsersModule {}
