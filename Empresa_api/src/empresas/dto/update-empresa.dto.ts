import {
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
} from "class-validator";

export class UpdateEmpresaDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @IsOptional()
    nombre:         string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @IsOptional()
    giro:           string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @IsOptional()
    tamaño:         string;

    @IsString()
    @MinLength(3)
    @MaxLength(200)
    @IsOptional()
    direccion:      string;

    @IsString()
    @MinLength(7)
    @MaxLength(20)
    @IsOptional()
    telefono:       string;
}
