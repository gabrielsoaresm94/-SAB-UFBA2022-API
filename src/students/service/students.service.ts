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

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>
  ) {}

  async findAllStudents(): Promise<ResponseStudentDTO[]> {
    const students: StudentEntity[] = await this.studentRepository.find({
      relations: ['articles']
    })
    return students.map((student) => toStudentResponseDTO(student))
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

  async updateStudent(student: any) {
    //TODO: IMPLEMENTS
    return student // TODO : update student
  }
}
