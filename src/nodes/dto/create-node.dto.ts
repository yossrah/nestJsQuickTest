import { IsNotEmpty, IsString } from "class-validator";
import { Component } from "src/components/entities/component.entity";

export class CreateNodeDto {
    @IsString()
    @IsNotEmpty()
    data: any;
    
    @IsNotEmpty()
    position: any={};

    @IsNotEmpty()
    icon:string;
    
    @IsNotEmpty()
    component:Component;

    @IsNotEmpty()
    @IsString()
    type:string;
    
    @IsNotEmpty()
    @IsString()
    code:string
}
