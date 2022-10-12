import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { ScholarshipService } from '../service/scholarship.service'
import { CreateScholarshipDto } from '../dto/create-scholarship.dto'
import { Roles } from '../../roles/decorator/roles.decorator'
import { Role } from '../../roles/enum/role.enum'

@Controller('v1/scholarship')
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) {}

  @Roles(Role.STUDENT)
  @Post()
  create(@Body() createScholarshipDto: CreateScholarshipDto) {
    return this.scholarshipService.create(createScholarshipDto)
  }

  @Get()
  findAll() {
    return this.scholarshipService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scholarshipService.findOneById(+id)
  }
}
