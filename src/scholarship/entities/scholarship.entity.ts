import { StudentEntity } from '../../students/entities/students.entity'
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { ResponseScholarshipDto } from '../dto/response-scholarship.dto'

@Entity('scholarship')
export class Scholarship {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  @OneToOne(() => StudentEntity)
  @JoinColumn()
  student_id: number

  @Column({ nullable: false })
  //TODO: AGUARDANDO ENTITY AGENCIA
  agency_id: number

  @Column({ nullable: false })
  scholarship_start_at: Date

  @Column({ nullable: false })
  scholarship_ends_at: Date

  @Column({ nullable: false })
  extension_ends_at: Date

  @Column({ nullable: false })
  salary: number

  @Column({ nullable: false })
  active: boolean

  @Column({ nullable: false })
  model: string

  student: StudentEntity
}

export function toScholarshipDTO(
  scholarship: Scholarship
): ResponseScholarshipDto {
  const scholarshipDto = new ResponseScholarshipDto(
    scholarship.id,
    scholarship.student_id,
    scholarship.agency_id,
    scholarship.scholarship_start_at,
    scholarship.scholarship_ends_at,
    scholarship.extension_ends_at,
    scholarship.salary,
    scholarship.active,
    scholarship.model
  )

  return scholarshipDto
}
