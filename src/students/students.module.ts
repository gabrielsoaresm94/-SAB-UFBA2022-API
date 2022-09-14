import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StudentsController } from './controller/students.controller'
import { StudentEntity } from './entities/students.entity'
import { StudentsService } from './service/students.service'

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
