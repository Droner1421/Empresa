import {
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
} from "class-validator";

export class CreateEmpresaDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    nombre:         string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    giro:           string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    tamaño:         string;

    @IsString()
    @MinLength(3)
    @MaxLength(200)
    direccion:      string;

    @IsString()
    @MinLength(7)
    @MaxLength(20)
    telefono:       string;
}
