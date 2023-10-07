import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 2,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birthAt: Date;
}
