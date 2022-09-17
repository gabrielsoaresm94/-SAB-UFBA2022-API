export class ResponseScholarshipDto {
  constructor(
    id: number,
    student_id: number,
    scholarship_start_at: Date,
    scholarship_ends_at: Date,
    extension_ends_at: Date,
    salary: number,
    active: boolean,
    model: string
  ) {
    this.student_id = student_id
    this.scholarship_start_at = scholarship_start_at
    this.scholarship_ends_at = scholarship_ends_at
    this.extension_ends_at = extension_ends_at
    this.salary = salary
    this.active = active
    this.model = model
  }

  readonly student_id: number
  readonly agency_id: number
  readonly scholarship_start_at: Date
  readonly scholarship_ends_at: Date
  readonly extension_ends_at: Date
  readonly salary: number
  readonly active: boolean
  readonly model: string
}
