import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class logInDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
