import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Scholarship } from '../scholarship/entities/scholarship.entity'
import { ScholarshipModule } from '../scholarship/scholarship.module'
import { ScholarshipService } from '../scholarship/service/scholarship.service'
import { StudentsController } from './controller/students.controller'
import { StudentEntity } from './entities/students.entity'
import { StudentsService } from './service/students.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity, Scholarship]),
    ScholarshipModule
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService]
})
export class StudentsModule {}
