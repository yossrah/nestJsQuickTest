import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateParamDto {
    @IsNotEmpty()
    name: string;
    value: string;
}
