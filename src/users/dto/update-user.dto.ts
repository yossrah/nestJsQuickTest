import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "src/auth/dtos/createUser.dto";
export class UpdateUserDto extends PartialType (CreateUserDto){}