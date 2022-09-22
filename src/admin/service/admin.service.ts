import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hashPassword } from 'src/utils/bcrypt'
import { Repository } from 'typeorm'
import { CreateAdminDto } from '../dto/create-admin.dto'
import { UpdateAdminDto } from '../dto/update-admin.dto'
import { Admin } from '../entities/admin.entity'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const passwordHash = await hashPassword(createAdminDto.password)
      const newAdmin = this.adminRepository.create({
        ...createAdminDto,
        password: passwordHash
      })
      await this.adminRepository.save(newAdmin)
    } catch (error) {
      throw new BadRequestException('Error to create admin')
    }
  }

  async findAll() {
    return await this.adminRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`
  }

  async remove(id: number) {
    const removed = await this.adminRepository.delete(id)
    if (removed.affected === 1) return

    throw new NotFoundException('Admin not found')
  }
}
