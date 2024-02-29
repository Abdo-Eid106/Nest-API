import { IsNotEmpty } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
