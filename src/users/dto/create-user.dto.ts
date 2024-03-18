import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Matches, MinLength, Validate} from "class-validator";
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
export class CreateUserDto{
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    name:string
    @IsString()
    @MinLength(3, { message: 'lastname must have atleast 3 characters.' })
    @IsNotEmpty()
    lastname:string
    @IsInt()
    phone: number
    @IsEmail()
    email:string
    @IsNotEmpty()
    @Matches(passwordRegEx,{
        message: `Password must contain Minimum 6 and maximum 20 characters, 
        at least one uppercase letter, 
        one lowercase letter, 
        one number and 
        one special character`,
      })
    password:string
    @IsNotEmpty()
    @IsEnum(['Admin', 'Tester', 'TeamLeader'])
    role:'Admin'|'Tester'|'TeamLeader'

}