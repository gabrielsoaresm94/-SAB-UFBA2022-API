import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { EmailService } from '../../email/service/email.service'
import { ScholarshipService } from '../../scholarship/service/scholarship.service'

@Injectable()
export class NotificationService {
  constructor(
    private emailService: EmailService,
    private scholarshipService: ScholarshipService
  ) {}
  private readonly logger = new Logger(NotificationService.name)

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async notifyAlmostEndedScholarships() {
    this.logger.debug('Starting notifying almost ended scholarships')
    const scholarships =
      await this.scholarshipService.getNeedsNotifyScolarships()
    const dates = [
      this.scholarshipService.getDatePlustDays(30),
      this.scholarshipService.getDatePlustDays(60),
      this.scholarshipService.getDatePlustDays(90)
    ]

    for (const { student, scholarship_ends_at } of scholarships) {
      this.logger.debug(`notifying for student: ${student}`)
      for (let i = 0; i < 3; i++) {
        if (scholarship_ends_at === dates[i]) {
          this.emailService.sendEmail({
            to: student.email,
            context: { months: i + 1 },
            template: 'notify-end'
          })
        }
      }
    }
    this.logger.debug(`finish notifying almost ended scholarships`)
  }
}
