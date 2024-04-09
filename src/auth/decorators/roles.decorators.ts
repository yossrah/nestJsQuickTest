import { Reflector } from "@nestjs/core";

//create a roles decorator
export const Roles = Reflector.createDecorator<string[]>();