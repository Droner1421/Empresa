import {
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsEmail,
    IsNumber,
    IsPositive,
} from "class-validator";

export class CreatePostulacionDto {
    @IsNumber()
    @IsPositive()
    id_vacante:     number;

    @IsString()
    @MinLength(3)
    @MaxLength(150)
    nombre_postulante: string;

    @IsEmail()
    correo:         string;

    @IsString()
    @MinLength(7)
    @MaxLength(20)
    telefono:       string;

    @IsString()
    @IsOptional()
    CV_url:         string;
}
