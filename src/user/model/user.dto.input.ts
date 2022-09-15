import { IsNumber, IsString } from 'class-validator'
import { StudentEntity } from '../../students/entities/students.entity'

export class CreateUserDTO {
  constructor(user: StudentEntity) {
    this.id = user.id
    this.tax_id = user.tax_id
    this.name = user.name
    this.role = user.role
    this.password = user.password
  }

  @IsString()
  readonly tax_id: string

  @IsString()
  readonly password: string

  @IsString()
  readonly name: string

  @IsNumber()
  readonly id: number

  @IsString()
  readonly role: string
}
