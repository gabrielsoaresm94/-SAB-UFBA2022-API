import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateScholarshipDto } from '../dto/create-scholarship.dto'
import { UpdateScholarshipDto } from '../dto/update-scholarship.dto'
import { Scholarship } from '../entities/scholarship.entity'

@Injectable()
export class ScholarshipService {
  constructor(
    @InjectRepository(Scholarship)
    private studentRepository: Repository<Scholarship>
  ) {}

  create(createScholarshipDto: CreateScholarshipDto) {
    return 'This action adds a new scholarship'
  }

  findAll() {
    return `This action returns all scholarship`
  }

  findOne(id: number) {
    return `This action returns a #${id} scholarship`
  }

  update(id: number, updateScholarshipDto: UpdateScholarshipDto) {
    return `This action updates a #${id} scholarship`
  }

  remove(id: number) {
    return `This action removes a #${id} scholarship`
  }
}
