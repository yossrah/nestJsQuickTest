import { IsNotEmpty, IsString } from "class-validator";

export class CreateComponentDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    icon:string;
    @IsNotEmpty()
    @IsString()
    type:string;
    @IsNotEmpty()
    @IsString()
    code:string
}
