export class PasswordRecoveryRequestDto {
  constructor(email: string) {
    this.email = email
  }

  readonly email: string
}
