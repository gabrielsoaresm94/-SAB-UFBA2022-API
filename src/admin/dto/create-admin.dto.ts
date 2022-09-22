import { IsEmail, IsString } from 'class-validator'

export class CreateAdminDto {
  @IsString() readonly name: string
  @IsString() readonly tax_id: string
  @IsEmail() readonly email: string
  @IsString() readonly password: string
  @IsString() readonly role: string
}
