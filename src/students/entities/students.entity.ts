import {
  ArticleEntity,
  toArticleResponseDTO
} from '../../article/entities/article.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ResponseStudentDTO } from '../model/student.response.dto'

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 14, nullable: false, unique: true })
  tax_id: string

  @Column({ length: 9, nullable: false, unique: true })
  enrolment_number: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  course: string

  @Column({ nullable: false })
  link_lattes: string

  @Column()
  advisor_id: number

  @Column({ nullable: false })
  enrollment_date_pgcomp: Date

  @Column({ length: 11, nullable: false })
  phone_number: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: true, default: 'STUDENT' })
  role: string

  @OneToMany(() => ArticleEntity, (article) => article.student)
  articles: ArticleEntity[]
}

export function toStudentResponseDTO(
  student: StudentEntity
): ResponseStudentDTO {
  return new ResponseStudentDTO(
    student.id,
    student.tax_id,
    student.enrolment_number,
    student.name,
    student.email,
    student.course,
    student.link_lattes,
    student.advisor_id,
    student.enrollment_date_pgcomp,
    student.phone_number,
    student.role,
    student.articles.map((article) => toArticleResponseDTO(article))
  )
}
