import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAdvisorDto } from '../dto/create-advisor.dto'
import { Advisor, toAdvisorDTO } from '../entities/advisor.entity'
import { hashPassword } from '../../utils/bcrypt'
import { ResponseAdvisorDto } from '../dto/response-advisor.dto'

@Injectable()
export class AdvisorService {
  constructor(
    @InjectRepository(Advisor)
    private advisorRepository: Repository<Advisor>
  ) {}

  async create(createAdvisorDto: CreateAdvisorDto) {
    try {
      const passwordHash = await hashPassword(createAdvisorDto.password)
      const advisor = this.advisorRepository.create({
        ...createAdvisorDto,
        password: passwordHash
      })
      await this.advisorRepository.save(advisor)
    } catch (error) {
      throw new BadRequestException("Can't create advisor")
    }
  }

  async findAll(): Promise<ResponseAdvisorDto[]> {
    const advisors = await this.advisorRepository.find()
    return advisors.map((advisor) => toAdvisorDTO(advisor))
  }

  async findOneById(id: number) {
    const advisor = await this.advisorRepository.findOneBy({ id })
    if (!advisor) throw new NotFoundException('Advisor not found')
    return toAdvisorDTO(advisor)
  }

  async findOneByEmail(email: string) {
    const advisor = await this.advisorRepository.findOneBy({ email })
    if (!advisor) throw new NotFoundException('Advisor not found')
    return toAdvisorDTO(advisor)
  }

  // update(id: number, updateAdvisorDto: UpdateAdvisorDto) {
  //   return `This action updates a #${id} advisor`
  // }

  async remove(id: number) {
    const removed = await this.advisorRepository.delete(id)
    if (removed.affected === 1) return

    throw new NotFoundException('Advisor not found')
  }
}
