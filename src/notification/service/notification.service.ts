import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { StudentsService } from '../../students/service/students.service'
import { EmailService } from '../../email/service/email.service'
import { ScholarshipService } from '../../scholarship/service/scholarship.service'

@Injectable()
export class NotificationService {
  constructor(
    private studentsSerivce: StudentsService,
    private emailService: EmailService,
    private scholarshipService: ScholarshipService
  ) {}
  private readonly logger = new Logger(NotificationService.name)

  getDatePlustDays(days: number): Date {
    const actualDate = new Date()
    actualDate.setHours(21, 0, 0, 0)
    actualDate.setDate(actualDate.getDate() + days - 1)
    return actualDate
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async notifyAlmostEndedScholarships() {
    this.logger.debug('Starting notifying almost ended scholarships')
    const scholarships = await this.scholarshipService.findAll()
    const dates = [
      this.getDatePlustDays(365),
      this.getDatePlustDays(180),
      this.getDatePlustDays(90)
    ]

    for (const { scholarship_ends_at, student: studentId } of scholarships) {
      const student = await this.studentsSerivce.findById(studentId)
      this.logger.debug(`notifying for student: ${student.email}`)
      for (let i = 0; i < 3; i++) {
        if (scholarship_ends_at.toISOString() === dates[i].toISOString()) {
          this.emailService.sendEmail({
            to: student.email,
            context: { months: i + 1 },
            template: 'notify-end',
            subject: 'Notificação sobre bolsa'
          })
        }
      }
    }
    this.logger.debug(`finish notifying almost ended scholarships`)
  }
}
