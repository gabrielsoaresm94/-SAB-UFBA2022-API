import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StudentEntity } from '../students/entities/students.entity'
import { StudentsModule } from '../students/students.module'
import { UserService } from './service/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity]), StudentsModule],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
