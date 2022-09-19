export class ResponseAgencyDto {
  constructor(id: number, name: string, description: string) {
    this.id = id
    this.name = name
    this.description = description
  }

  readonly id: number
  readonly name: string
  readonly description: string
}
