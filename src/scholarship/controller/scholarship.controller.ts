import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException
} from '@nestjs/common'
import { ScholarshipService } from '../service/scholarship.service'
import { CreateScholarshipDto } from '../dto/create-scholarship.dto'
import { NewFinalDateScholarshipDto } from '../dto/update-scholarship.dto'

@Controller('v1/scholarship')
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) {}

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

  @Post('/:id/update/end')
  async updateFinalDateScholarship(
    @Param('id') id: number,
    @Body() newFinalDate: NewFinalDateScholarshipDto
  ) {
    return this.scholarshipService.updateFinalDateScholarship(newFinalDate, id)
  }
}
