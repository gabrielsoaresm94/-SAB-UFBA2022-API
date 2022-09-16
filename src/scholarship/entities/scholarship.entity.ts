import { StudentEntity } from '../../students/entities/students.entity'
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

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
}
