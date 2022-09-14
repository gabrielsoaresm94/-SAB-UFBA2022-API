
import { InjectRepository } from '@nestjs/typeorm'
import { StudentEntity } from '../../students/entities/students.entity'
import { Repository } from 'typeorm'
import { CreateUserDTO } from '../model/user.dto.input'
import { NotFoundException } from '@nestjs/common'

export class UserService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>
  ) {}

  async findUserByTaxId(tax_id: string): Promise<CreateUserDTO> {
    try {
      const user = await this.studentRepository.findOne({ where: { tax_id } })
      if (user) return new CreateUserDTO(user)
    } catch (error) {
      throw new NotFoundException('User not found')
    }
  }
}
