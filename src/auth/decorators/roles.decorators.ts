import { SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../dtos/role.enum";


//create a roles decorator
//export const Roles = Reflector.createDecorator<string[]>();
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);