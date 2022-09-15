import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CreateAdvisorDto } from '../dto/create-advisor.dto'

@Entity('advisor')
export class Advisor {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 14, nullable: false, unique: true })
  tax_id: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ length: 11, nullable: false })
  phone_number: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: true, default: 'ADVISOR' })
  role: string
}

export function toAdvisorDTO(advisor: Advisor): CreateAdvisorDto {
  return new CreateAdvisorDto(
    advisor.tax_id,
    advisor.name,
    advisor.email,
    advisor.phone_number,
    advisor.password,
    advisor.role
  )
}
