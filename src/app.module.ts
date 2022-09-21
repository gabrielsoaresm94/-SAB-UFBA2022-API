import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
//import { DatabaseModule } from './database/database.module'
import { StudentsModule } from './students/students.module'
import { EmailModule } from './email/email.module'
import { ArticleModule } from './article/article.module'
import { AuthModule } from './auth/auth.module'
import { ProfileModule } from './profile/profile.module'
import { AdvisorModule } from './advisor/advisor.module'
import { ScholarshipModule } from './scholarship/scholarship.module'
import { PasswordRecoveryModule } from './password-recovery/password-recovery.module'

require('dotenv')

@Module({
  imports: [
    //DatabaseModule,
    ConfigModule.forRoot(),
    StudentsModule,
    EmailModule,
    ArticleModule,
    AuthModule,
    ProfileModule,
    PasswordRecoveryModule,
    AdvisorModule,
    ScholarshipModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
