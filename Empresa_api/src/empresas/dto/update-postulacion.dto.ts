import {
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsEmail,
    IsNumber,
    IsPositive,
} from "class-validator";

export class UpdatePostulacionDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    id_vacante:     number;

    @IsString()
    @MinLength(3)
    @MaxLength(150)
    @IsOptional()
    nombre_postulante: string;

    @IsEmail()
    @IsOptional()
    correo:         string;

    @IsString()
    @MinLength(7)
    @MaxLength(20)
    @IsOptional()
    telefono:       string;

    @IsString()
    @IsOptional()
    CV_url:         string;
}
