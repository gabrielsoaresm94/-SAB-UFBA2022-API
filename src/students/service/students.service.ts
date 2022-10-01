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
import {
  paginate,
  IPaginationOptions,
  Pagination,
  IPaginationMeta
} from 'nestjs-typeorm-paginate'
import { PageDto } from '../../pageable/page.dto'
import { PageMetaDto } from '../../pageable/page-meta.dto'

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>
  ) {}

  async findAllStudents(options: IPaginationOptions) {
    // const students: StudentEntity[] = await this.studentRepository.find({
    //   relations: ['articles']
    // })
    // return students.map((student) => toStudentResponseDTO(student))

    const studentsPaginate = paginate<StudentEntity>(
      this.studentRepository,
      options,
      { relations: ['articles'] }
    )
    const items = (await studentsPaginate).items
    const itemsDto = await items.map((student) => toStudentResponseDTO(student))
    const meta = (await studentsPaginate).meta
    const metaDto = new PageMetaDto(
      meta.itemCount,
      meta.itemsPerPage,
      meta.totalItems,
      meta.totalPages,
      meta.currentPage
    )

    const p = new PageDto(itemsDto, metaDto)
    console.log(p)
    return p
  }

  async paginate(options: IPaginationOptions) {
    const studentsPaginate = paginate<StudentEntity>(
      this.studentRepository,
      options,
      { relations: ['articles'] }
    )
    const items = (await studentsPaginate).items
    const itemsDto = await items.map((student) => toStudentResponseDTO(student))
    const meta = (await studentsPaginate).meta
    const metaDto = new PageMetaDto(
      meta.itemCount,
      meta.itemsPerPage,
      meta.totalItems,
      meta.totalPages,
      meta.currentPage
    )

    const p = new PageDto(itemsDto, metaDto)
    console.log(p)
    return p
  }

  async findById(id: number) {
    const student = await this.studentRepository.findOne({
      relations: { articles: true },
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
      relations: { articles: true },
      loadEagerRelations: true,
      where: { course: ILike(`%${course}%`) }
    })
    return students.map((student) => toStudentResponseDTO(student))
  }

  async findByEmail(email: string): Promise<ResponseStudentDTO> {
    const findStudent = await this.studentRepository.findOne({
      where: { email },
      relations: { articles: true },
      loadEagerRelations: true
    })
    if (findStudent) return toStudentResponseDTO(findStudent)

    throw new NotFoundException('Student not found')
  }

  async findByAdvisorId(advisor_id: number): Promise<ResponseStudentDTO[]> {
    const students: StudentEntity[] = await this.studentRepository.find({
      where: { advisor_id },
      relations: { articles: true },
      loadEagerRelations: true
    })
    return students.map((student) => toStudentResponseDTO(student))
  }

  async createStudent(student: CreateStudentDTO) {
    try {
      const passwordHash = await hashPassword(student.password)
      const newStudent = this.studentRepository.create({
        ...student,
        password: passwordHash
      })
      await this.studentRepository.save(newStudent)
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
