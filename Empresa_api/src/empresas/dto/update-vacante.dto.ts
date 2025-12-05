import {
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsEnum,
    IsNumber,
    IsPositive,
} from "class-validator";

export class UpdateVacanteDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    id_empresa:     number;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @IsOptional()
    puesto:         string;

    @IsString()
    @MinLength(10)
    @IsOptional()
    descripcion:    string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    salario:        number;

    @IsEnum(['Presencial', 'Remoto', 'Híbrido'])
    @IsOptional()
    modalidad:      string;
}
