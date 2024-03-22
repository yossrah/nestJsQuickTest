import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from 'src/users/dto/authCredentials.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateUserProfileDto } from 'src/users/dto/create-userProfile.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UserInterceptor } from 'src/users/interceptors/users.interceptor';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService,
){}
    @Get('')
    @UseInterceptors(UserInterceptor)
    getUsers(@Query('role') role:"Tester"|"Admin"|"TeamLeader"|""="",
    // send currentPage as a query parameter of type number by default it is page one
             @Query('currentPage') currentPage:number=1) {
             return this.userService.findAll(role,currentPage);
    }

    @Post()
    signUp(@Body() createUserDto:CreateUserDto){
        return this.userService.signUp(createUserDto)
    }
    @Post('/signIn')
    signIn(@Body() authCredentials:AuthCredentialsDto):Promise<string>{
        return this.userService.signIn(authCredentials)
    }

    @Patch('/:activationCode')
    async activateAccount(@Param('activationCode') activationCode: string, @Body() updateUserDto:UpdateUserDto){
        return this.userService.activateAccount(activationCode,updateUserDto)

    }
    @Put('/:id')
    updateUser(@Param('id',ParseIntPipe) id: number, @Body()updateUserDto:UpdateUserDto){
        return this.userService.update(id,updateUserDto);
    }

    @Delete('/:id')
    deleteUser(@Param('id',ParseIntPipe) id: number){
        return this.userService.remove(id);
    }

    @Get('/countAll')
    @UseGuards(AuthGuard())
    countAll(){
    return this.userService.countAll();
  }
  @Get('')
    getUsersbyRole(@Query('role') role:"Tester"|"Admin"|"TeamLeader"){
    return this.userService.getUsersByRole(role);
  }
    
    @Get('/:id')
    getUser(@Param('id',ParseIntPipe) id: number){
        return this.userService.findOne(id);
    }

    @Post('/:id/profile')
    createUserProfile(@Body() createUserProfile:CreateUserProfileDto, @Param('id',ParseIntPipe)id:number){
        return this.userService.createUserProfile(id,createUserProfile)
    }
    
}
