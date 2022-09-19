import { Injectable } from '@nestjs/common'

import { EmailService } from '../../email/service/email.service'
import { AdvisorService } from '../../advisor/service/advisor.service'
import { StudentsService } from '../../students/service/students.service'
import { PasswordRecoveryRequestDto } from '../ model/password-recovery-request.dto'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class PasswordRecoveryService {
  constructor(
    private studentsService: StudentsService,
    private emailService: EmailService,
    private advisorService: AdvisorService,
    private configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async requestPasswordRecovery(
    dto: PasswordRecoveryRequestDto
  ): Promise<void> {
    const payload = { email: dto.email }
    const token = this.jwtService.sign(payload)
    await this.emailService.sendEmail({
      to: dto.email,
      template: 'recovery-password-request',
      context: {
        resetPasswordUrl: this.configService.get('RESET_PASSWORD_URL'),
        token
      }
    })
  }
}
