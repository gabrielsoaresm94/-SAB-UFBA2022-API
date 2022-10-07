import { Injectable } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common/exceptions'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateScholarshipDto } from '../dto/create-scholarship.dto'
import { ResponseScholarshipDto } from '../dto/response-scholarship.dto'
import { Scholarship, toScholarshipDTO } from '../entities/scholarship.entity'

@Injectable()
export class ScholarshipService {
  constructor(
    @InjectRepository(Scholarship)
    private scholarshipRepository: Repository<Scholarship>
  ) {}

  async create(createScholarshipDto: CreateScholarshipDto) {
    return await this.scholarshipRepository.save(createScholarshipDto)
  }

  async findAll(): Promise<ResponseScholarshipDto[]> {
    const scholarships: Scholarship[] = await this.scholarshipRepository.find({
      relations: {
        student: true
      }
    })

    return scholarships.map((scholarship) => toScholarshipDTO(scholarship))
  }

  async findOneById(id: number): Promise<ResponseScholarshipDto> {
    const scholarship = await this.scholarshipRepository.find({
      where: { id: id },
      relations: {
        student: true
      }
    })
    if (!scholarship || scholarship.length === 0) {
      throw new NotFoundException('Scholarship not found')
    }

    return toScholarshipDTO(scholarship[0])
  }
}
