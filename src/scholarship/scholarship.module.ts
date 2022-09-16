import { Module } from '@nestjs/common';
import { ScholarshipService } from './service/scholarship.service';
import { ScholarshipController } from './controller/scholarship.controller';

@Module({
  controllers: [ScholarshipController],
  providers: [ScholarshipService]
})
export class ScholarshipModule {}
