import { Module } from '@nestjs/common'
import { ArticleService } from './service/article.service'
import { ArticleController } from './controller/article.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleEntity } from './entities/article.entity'
import { StudentEntity } from '../students/entities/students.entity'
import { StudentsService } from '../students/service/students.service'

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, StudentEntity])],
  controllers: [ArticleController],
  providers: [ArticleService, StudentsService]
})
export class ArticleModule {}
