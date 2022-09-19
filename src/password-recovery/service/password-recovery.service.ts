import { Injectable } from '@nestjs/common'

import { EmailService } from '../../email/service/email.service'
import { AdvisorService } from '../../advisor/service/advisor.service'
import { StudentsService } from '../../students/service/students.service'
import { PasswordRecoveryRequestDto } from '../ model/password-recovery-request.dto'

@Injectable()
export class PasswordRecoveryService {
  constructor(
    private studentsService: StudentsService,
    private emailService: EmailService,
    private advisorService: AdvisorService
  ) {}

  async requestPasswordRecovery(
    dto: PasswordRecoveryRequestDto
  ): Promise<void> {
    await this.emailService.sendEmail({
      to: dto.email,
      template: 'recovery-password-request',
      from: 'noreply@application.com',
      context: {
        token: dto.email
      }
    })
    console.log(dto)
  }
}
