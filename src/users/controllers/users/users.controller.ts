import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateUserProfileDto } from 'src/users/dto/create-userProfile.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}
    @Get()
    getUsers() {
        return this.userService.findAll();
    }

    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto)
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
    countAll(){
    return this.userService.countAll();
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
