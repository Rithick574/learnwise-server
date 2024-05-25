import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class InstructorQueryDto {
    @IsOptional()
    @IsString()
    status?: string;
  
    @IsOptional()
    @IsString()
    search?: string;
  
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    page: number = 1;
  
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    limit: number = 10;
  }