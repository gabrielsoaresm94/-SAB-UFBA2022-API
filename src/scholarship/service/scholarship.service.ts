import { Injectable } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateScholarshipDto } from '../dto/create-scholarship.dto'
import { ResponseScholarshipDto } from '../dto/response-scholarship.dto'
import { UpdateScholarshipDto } from '../dto/update-scholarship.dto'
import { Scholarship, toScholarshipDTO } from '../entities/scholarship.entity'

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
      return new BadRequestException(error.message)
    }
  }

  async findAll(): Promise<ResponseScholarshipDto[]> {
    const scholarships: Scholarship[] = await this.scholarshipRepository.find({
      relations: {
        student_id: true
      }
    })

    return scholarships.map((scholarship) => toScholarshipDTO(scholarship))
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
