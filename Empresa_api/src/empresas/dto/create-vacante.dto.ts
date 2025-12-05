import {
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsEnum,
    IsNumber,
    IsPositive,
} from "class-validator";

export class CreateVacanteDto {
    @IsNumber()
    @IsPositive()
    id_empresa:     number;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    puesto:         string;

    @IsString()
    @MinLength(10)
    descripcion:    string;

    @IsNumber()
    @IsPositive()
    salario:        number;

    @IsEnum(['Presencial', 'Remoto', 'Híbrido'])
    modalidad:      string;
}
