import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  DefaultValuePipe,
  ParseIntPipe,
  Query
} from '@nestjs/common'
import { CreateStudentDTO } from '../model/student.dto.input'
import { ResponseStudentDTO } from '../model/student.response.dto'
import { StudentsService } from '../service/students.service'

@Controller('v1/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('/list/all')
  async findAllStudents(
    // CRIAR ENDPOINT PARA VERIFICAR ISSO, POIS QUEBRA TUDO
    // mudando os parametros do service, quebra o resto dos lugares que chamam o findall
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ) {
    limit = limit > 100 ? 100 : limit
    return await this.studentsService.findAllStudents({
      page,
      limit
    })
  }

  @Get('/paginate')
  async paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ) {
    limit = limit > 100 ? 100 : limit
    return await this.studentsService.paginate({
      page,
      limit
    })
  }

  @Get('find/byid/:id')
  async findById(@Param('id') id: number) {
    return await this.studentsService.findById(id)
  }

  @Get('find/bycourse')
  async findByCourse(
    @Query('course') course: string
  ): Promise<ResponseStudentDTO[]> {
    return await this.studentsService.findByCourse(course)
  }

  @Get('find/byemail')
  async findByEmail(@Query('email') email: string) {
    return await this.studentsService.findByEmail(email)
  }

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
