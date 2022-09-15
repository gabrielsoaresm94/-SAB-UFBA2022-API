import { PartialType } from '@nestjs/mapped-types'
import { CreateAdvisorDto } from './create-advisor.dto'

export class ResponseAdvisorDto extends PartialType(CreateAdvisorDto) {}
