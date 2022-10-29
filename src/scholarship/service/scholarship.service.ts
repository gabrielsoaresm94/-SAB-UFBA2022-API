import { Injectable } from '@nestjs/common'
import {
  BadRequestException,
  NotFoundException
} from '@nestjs/common/exceptions'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateScholarshipDto } from '../dto/create-scholarship.dto'
import { ResponseScholarshipDto } from '../dto/response-scholarship.dto'
import { NewFinalDateScholarshipDto } from '../dto/update-scholarship.dto'
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

  getDatePlustDays(days: number): Date {
    const actualDate = new Date()
    actualDate.setDate(actualDate.getDate() + days)
    return actualDate
  }

  async getNeedsNotifyScolarships(): Promise<Scholarship[]> {
    return await this.scholarshipRepository
      .createQueryBuilder('scholarship')
      .innerJoin('scholarship.student', 'student')
      .where('scholarship.scholarship_ends_at = :date', {
        date: this.getDatePlustDays(30)
      })
      .orWhere('scholarship.scholarship_ends_at = :date', {
        date: this.getDatePlustDays(60)
      })
      .orWhere('scholarship.scholarship_ends_at = :date', {
        date: this.getDatePlustDays(90)
      })
      .getMany()
  }

  async updateFinalDateScholarship(
    newFinalDate: NewFinalDateScholarshipDto,
    id: number
  ) {
    const scholarship = await this.scholarshipRepository.findOneBy({ id })
    if (!scholarship) throw new NotFoundException('Scholarship not found')

    if (newFinalDate.newFinalDate < scholarship.scholarship_starts_at) {
      throw new BadRequestException(
        'Scholarship new end date must be after the start date'
      )
    }

    if (newFinalDate.newFinalDate <= scholarship.scholarship_ends_at) {
      throw new BadRequestException(
        'Scholarship new end date must be after the current end date'
      )
    }
    this.scholarshipRepository.update(
      { id },
      { scholarship_ends_at: newFinalDate.newFinalDate }
    )
  }
}
