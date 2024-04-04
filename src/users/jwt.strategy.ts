import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy,ExtractJwt} from "passport-jwt"
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>
    ){
        super({
            //retrieve the jwt token from the request
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.ACESS_TOKEN_SECRET})
    }
    async validate(payload:JwtPayload):Promise<User>{
        const id=payload.sub
        const {role}=payload
        const user= await this.userRepository.findOneBy({id})
        if(!user){
            throw new UnauthorizedException();
        }
        //user.role=role
        return user
    }
}