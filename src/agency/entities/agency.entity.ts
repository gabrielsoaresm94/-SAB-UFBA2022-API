import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ResponseAgencyDto } from '../dto/response-agency.dto'

@Entity('agency')
export class AgencyEntity {
  @PrimaryGeneratedColumn() id: number

  @Column({ nullable: false }) name: string
  @Column({ nullable: false }) description: string
}

export function toAgencyResponseDto(agency: AgencyEntity): ResponseAgencyDto {
  return new ResponseAgencyDto(agency.id, agency.name, agency.description)
}
