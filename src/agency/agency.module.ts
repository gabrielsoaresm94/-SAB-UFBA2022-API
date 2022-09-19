import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AgencyController } from './controller/agency.controller'
import { AgencyEntity } from './entities/agency.entity'
import { AgencyService } from './service/agency.service'

@Module({
  imports: [TypeOrmModule.forFeature([AgencyEntity])],
  controllers: [AgencyController],
  providers: [AgencyService]
})
export class AgencyModule {}
