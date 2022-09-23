import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hashPassword } from 'src/utils/bcrypt'
import { Repository } from 'typeorm'
import { CreateAdminDto } from '../dto/create-admin.dto'
import { ResponseAdminDto, toAdminResponseDto } from '../dto/response-admin.dto'
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

  async findAll(): Promise<ResponseAdminDto[]> {
    const admins = await this.adminRepository.find()
    return admins.map((admin) => toAdminResponseDto(admin))
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOneBy({ id: id })
    if (!admin) throw new NotFoundException('Admin not found')

    return toAdminResponseDto(admin)
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
