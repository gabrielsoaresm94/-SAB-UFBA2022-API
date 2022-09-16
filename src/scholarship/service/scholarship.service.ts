import { Injectable } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateScholarshipDto } from '../dto/create-scholarship.dto'
import { UpdateScholarshipDto } from '../dto/update-scholarship.dto'
import { Scholarship } from '../entities/scholarship.entity'

@Injectable()
export class ScholarshipService {
  constructor(
    @InjectRepository(Scholarship)
    private scholarshipRepository: Repository<Scholarship>
  ) {}

  async create(createScholarshipDto: CreateScholarshipDto) {
    try {
      return await this.scholarshipRepository.save(createScholarshipDto)
    } catch (error) {
      return new BadRequestException('Error to create scholarship')
    }
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
