import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class FindOneUserDTO implements Readonly<FindOneUserDTO> {
  @ApiProperty({ required: false })
  @IsString()
  @IsEmail()
  @Optional()
  @MaxLength(170)
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Optional()
  @MaxLength(170)
  id?: string;
}

export class CreateUserDTO implements Readonly<CreateUserDTO> {
  @ApiProperty({ required: true })
  @IsString()
  @IsEmail()
  @MaxLength(170)
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(80)
  @MinLength(8)
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(16)
  @MinLength(4)
  nick: string;
}

export class LoginUserDTO implements Readonly<LoginUserDTO> {
  @ApiProperty({ required: true })
  @IsString()
  @IsEmail()
  @MaxLength(170)
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(80)
  @MinLength(8)
  password: string;
}
