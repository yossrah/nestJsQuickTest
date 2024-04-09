import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
@Post()
register(@Body() createUserDto:CreateUserDto){
   return this.authService.register(createUserDto)
}
@Post('login')
login(@Body() authPayload:AuthPayloadDto):Promise<{accessToken:string}>{
   return this.authService.validateUser(authPayload)
}


}
