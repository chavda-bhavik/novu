import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLocale, IsOptional, IsString } from 'class-validator';

export class UpdateSubscriberRequestDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty()
  @IsLocale()
  @IsOptional()
  locale?: string;
}
