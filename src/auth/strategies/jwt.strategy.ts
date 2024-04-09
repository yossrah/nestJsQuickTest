import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy,ExtractJwt} from "passport-jwt"
import { Utilisateur } from "src/users/entities/users.entity";
import { Repository } from "typeorm";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(Utilisateur) private readonly userRepository:Repository<Utilisateur>){
        super({
        //retrieve the jwt token from the request
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.ACESS_TOKEN_SECRET})
    }

    async validate(payload: JwtPayload): Promise<Utilisateur> {
        const {id, role } = payload
        const user = await this.userRepository.findOneBy( {id} )
        if (!user) {
            throw new UnauthorizedException();
        }
        //user.role=role
        return user
    }

}