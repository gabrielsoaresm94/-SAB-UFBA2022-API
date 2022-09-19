import { Module } from '@nestjs/common'
import { AdvisorModule } from '../advisor/advisor.module'
import { EmailModule } from '../email/email.module'
import { StudentsModule } from '../students/students.module'
import { PasswordRecoveryController } from './controller/password-recovery.controller'
import { PasswordRecoveryService } from './service/password-recovery.service'

@Module({
  imports: [StudentsModule, AdvisorModule, EmailModule],
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService],
  exports: [PasswordRecoveryService]
})
export class PasswordRecoveryModule {}
