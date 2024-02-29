import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
  IsOptional,
} from 'class-validator';

export class GetEstimateDto {
  @IsOptional()
  @IsString()
  make: string;

  @IsOptional()
  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @Min(1930)
  @Max(2030)
  year: number;

  @IsOptional()
  @IsLongitude()
  lng: number;

  @IsOptional()
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  milage: number;
}
