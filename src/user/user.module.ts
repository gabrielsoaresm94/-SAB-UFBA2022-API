import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdvisorModule } from '../advisor/advisor.module'
import { Advisor } from '../advisor/entities/advisor.entity'
import { StudentEntity } from '../students/entities/students.entity'
import { StudentsModule } from '../students/students.module'
import { UserService } from './service/user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity, Advisor]),
    StudentsModule,
    AdvisorModule
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
