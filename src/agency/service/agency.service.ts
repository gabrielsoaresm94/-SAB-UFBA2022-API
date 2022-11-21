import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAgencyDto } from '../dto/create-agency.dto'
import { ResponseAgencyDto } from '../dto/response-agency.dto'
import { AgencyEntity, toAgencyResponseDto } from '../entities/agency.entity'

@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(AgencyEntity)
    private agencyRepository: Repository<AgencyEntity>
  ) {}

  async create(createAgencyDto: CreateAgencyDto) {
    return this.agencyRepository.save(createAgencyDto)
  }

  async findAll(): Promise<ResponseAgencyDto[]> {
    const agencys = await this.agencyRepository.find()
    return agencys.map((agency) => toAgencyResponseDto(agency))
  }

  async findOne(id: number): Promise<ResponseAgencyDto> {
    const agency = await this.agencyRepository.findOneBy({ id })
    if (!agency) throw new NotFoundException('Agency not found')
    return agency
  }

  async remove(id: number) {
    const removed = await this.agencyRepository.delete(id)
    if (removed.affected === 0) {
      throw new NotFoundException('Agency not found')
    }
    return 'Agency deleted'
  }
}
