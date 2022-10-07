import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {
  StudentEntity,
  toStudentResponseDTO
} from '../entities/students.entity'
import { CreateStudentDTO } from '../model/student.dto.input'
import { hashPassword } from '../../utils/bcrypt'
import { ResponseStudentDTO } from '../model/student.response.dto'
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate'
import { PageDto } from '../../pageable/page.dto'
import { PageMetaDto } from '../../pageable/page-meta.dto'
import { CreateScholarshipDto } from '../../scholarship/dto/create-scholarship.dto'
import { ScholarshipService } from '../../scholarship/service/scholarship.service'

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    private scholarshipService: ScholarshipService
  ) {}

  async findAllStudents() {
    const students: StudentEntity[] = await this.studentRepository.find({
      relations: {
        articles: true,
        scolarship: true
      }
    })
    console.log(students[0])
    return students.map((student) => toStudentResponseDTO(student))
  }

  async findAllStudentsPaginate(options: IPaginationOptions) {
    const studentsPaginate = paginate<StudentEntity>(
      this.studentRepository,
      options,
      { relations: ['articles', 'scolarship'] }
    )
    const items = (await studentsPaginate).items
    const itemsDto = await items.map((student) => toStudentResponseDTO(student))
    const meta = (await studentsPaginate).meta
    const metaDto = new PageMetaDto(
      meta.totalItems,
      meta.itemCount,
      meta.itemsPerPage,
      meta.totalPages,
      meta.currentPage
    )

    return new PageDto(itemsDto, metaDto)
  }

  async findById(id: number) {
    const student = await this.studentRepository.findOne({
      relations: { articles: true, scolarship: true },
      loadEagerRelations: true,
      where: {
        id: id
      }
    })
    if (!student) throw new NotFoundException('Student not found')
    return toStudentResponseDTO(student)
  }

  async findByCourse(course: string): Promise<ResponseStudentDTO[]> {
    const students = await this.studentRepository.find({
      relations: { articles: true, scolarship: true },
      loadEagerRelations: true,
      where: { course: ILike(`%${course}%`) }
    })
    return students.map((student) => toStudentResponseDTO(student))
  }

  async findByEmail(email: string): Promise<ResponseStudentDTO> {
    const findStudent = await this.studentRepository.findOne({
      where: { email },
      relations: { articles: true, scolarship: true },
      loadEagerRelations: true
    })
    if (findStudent) return toStudentResponseDTO(findStudent)

    throw new NotFoundException('Student not found')
  }

  async findByAdvisorId(advisor_id: number): Promise<ResponseStudentDTO[]> {
    const students: StudentEntity[] = await this.studentRepository.find({
      where: { advisor_id },
      relations: { articles: true, scolarship: true },
      loadEagerRelations: true
    })
    return students.map((student) => toStudentResponseDTO(student))
  }

  async createStudent(student: CreateStudentDTO) {
    try {
      const passwordHash = await hashPassword(student.password)
      const newStudent = await this.studentRepository.create({
        ...student,
        password: passwordHash
      })
      const savedStudent = await this.studentRepository.save(newStudent)
      const toSaveScholarship = student.scholarship
      toSaveScholarship.student_id = savedStudent.id
      console.log(toSaveScholarship)
      await this.scholarshipService.create(toSaveScholarship)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async updatePassword(email: string, password: string) {
    const passwordHash = await hashPassword(password)
    await this.studentRepository.update({ email }, { password: passwordHash })
  }

  async updateStudent(student: any) {
    //TODO: IMPLEMENTS
    return student // TODO : update student
  }
}
