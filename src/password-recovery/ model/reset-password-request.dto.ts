export class ResetPasswordRequestDto {
  constructor(token: string, password, newPassword, confirmPassword) {
    this.token = token
    this.password = newPassword
    this.confirmPassword = confirmPassword
  }

  readonly token: string
  readonly password: string
  readonly confirmPassword: string
}
