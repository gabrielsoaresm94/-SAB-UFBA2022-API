import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { Roles } from '../../roles/decorator/roles.decorator'
import { Role } from '../../roles/enum/role.enum'
import { CreateStudentDTO } from '../model/student.dto.input'
import { ResponseStudentDTO } from '../model/student.response.dto'
import { StudentsService } from '../service/students.service'

@Controller('v1/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Roles(Role.ADMIN, Role.ADVISOR)
  @Get('/list/all')
  async findAllStudents() {
    return await this.studentsService.findAllStudents()
  }

  @Roles(Role.ADMIN, Role.ADVISOR)
  @Get('find/byid/:id')
  async findById(@Param('id') id: number) {
    return await this.studentsService.findById(id)
  }

  @Roles(Role.ADMIN, Role.ADVISOR)
  @Get('find/bycourse')
  async findByCourse(
    @Query('course') course: string
  ): Promise<ResponseStudentDTO[]> {
    return await this.studentsService.findByCourse(course)
  }

  @Roles(Role.ADMIN, Role.ADVISOR)
  @Get('find/byemail')
  async findByEmail(@Query('email') email: string) {
    return await this.studentsService.findByEmail(email)
  }

  @Roles(Role.ADMIN, Role.ADVISOR)
  @Get('/find/byadvisorid/:advisor_id')
  async findByAdvisorId(@Param('advisor_id') advisor_id: number) {
    return await this.studentsService.findByAdvisorId(advisor_id)
  }

  @Post()
  async createStudent(@Body() student: CreateStudentDTO) {
    return this.studentsService.createStudent(student)
  }

  @Patch()
  async updateStudent(@Body() student: CreateStudentDTO) {
    return this.studentsService.updateStudent(student) // TODO : update student
  }
}
