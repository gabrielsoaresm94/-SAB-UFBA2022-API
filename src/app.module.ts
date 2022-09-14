import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { StudentsModule } from './students/students.module'
import { EmailModule } from './email/email.module'
import { ArticleModule } from './article/article.module'

require('dotenv')

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    StudentsModule,
    EmailModule,
    ArticleModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
