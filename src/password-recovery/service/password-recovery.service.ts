import { BadRequestException, Injectable } from '@nestjs/common'

import { EmailService } from '../../email/service/email.service'
import { AdvisorService } from '../../advisor/service/advisor.service'
import { StudentsService } from '../../students/service/students.service'
import { PasswordRecoveryRequestDto } from '../ model/password-recovery-request.dto'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ResetPasswordRequestDto } from '../ model/reset-password-request.dto'
import { TokenErrors } from '../../enums/token.enums'

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

  async resetPassword(dto: ResetPasswordRequestDto): Promise<void> {
    try {
      if (dto.password !== dto.confirmPassword) {
        throw new BadRequestException('passwords are differents')
      }
      const payload = this.jwtService.verify(dto.token)
      if (!('email' in payload)) {
        throw new BadRequestException('bad token')
      }
      const { email } = payload
      await this.advisorService.updatePassword(email, dto.password)
      await this.studentsService.updatePassword(email, dto.password)
    } catch (error) {
      console.log(error)
      if (error?.name === TokenErrors.TOKEN_EXPIRED_ERROR) {
        throw new BadRequestException('token expired')
      }
      throw error
    }
  }
}
