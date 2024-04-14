import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/dtos/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { CreateUserProfileDto } from 'src/users/dto/create-userProfile.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Utilisateur } from 'src/users/entities/users.entity';
import { UserInterceptor } from 'src/users/interceptors/users.interceptor';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService,){}
    @Get('')
    @Roles(Role.Admin)
    //to protect route with only valid authenticated users(valid jwt)
    @UseGuards(JwtAuthGuard,RolesGuard)
   
    //@UseGuards(RolesGuard)
    
    //@UseInterceptors(UserInterceptor)
    getUsers(@Query('role') role:"Tester"|"Admin"|"TeamLeader"|""="",
    // send currentPage as a query parameter of type number by default it is page one
             @Query('currentPage') currentPage:number=1) {
                //console.log(user)
             return this.userService.findAll(role,currentPage);
    }

    @Post()
    @Patch('/:activationCode')
    async activateAccount(@Param('activationCode') activationCode: string, @Body() updateUserDto:UpdateUserDto){
        return this.userService.activateAccount(activationCode,updateUserDto)

    }
    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    updateUser(@GetUser() user:Utilisateur,@Param('id',ParseIntPipe) id: number, @Body()updateUserDto:UpdateUserDto){
        console.log(user)
        return this.userService.update(id,updateUserDto);
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    deleteUser(@Param('id',ParseIntPipe) id: number){
        return this.userService.remove(id);
    }

    @Get('/countAll')
    @UseGuards(JwtAuthGuard)
    countAll(){
    return this.userService.countAll();
  }
  @Get('')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
    getUsersbyRole(@Query('role') role:"Tester"|"Admin"|"TeamLeader"){
    return this.userService.getUsersByRole(role);
  }
    
    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(UserInterceptor)
    getUser(@Param('id',ParseIntPipe) id: number){
        return this.userService.findOne(id);
    }

    @Post('/:id/profile')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(UserInterceptor)
    createUserProfile(@Body() createUserProfile:CreateUserProfileDto, @Param('id',ParseIntPipe)id:number){
        return this.userService.createUserProfile(id,createUserProfile)
    }
    
}
