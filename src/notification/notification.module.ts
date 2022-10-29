import { Module } from '@nestjs/common'
import { ScholarshipModule } from '../scholarship/scholarship.module'
import { EmailModule } from '../email/email.module'
import { NotificationService } from './service/notification.service'

@Module({
  imports: [EmailModule, ScholarshipModule],
  providers: [NotificationService],
  exports: []
})
export class NotificationModule {}
