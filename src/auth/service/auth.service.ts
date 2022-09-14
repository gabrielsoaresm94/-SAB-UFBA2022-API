import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { comparePassword } from '../../utils/bcrypt'
import { CreateUserDTO } from '../../user/model/user.dto.input'
import { UserService } from '../../user/service/user.service'
import { errorMessages } from '../constants'
import { ResponseUserDTO } from '../../user/model/user.response.dto'
import { User } from 'src/user/interface/user.interface'
import { UserEntity } from 'src/user/entities/user.entity'
import { ResponseStudentDTO } from 'src/students/model/student.response.dto'
import { IncomingMessage } from 'http'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(tax_id: string, passwordInserted: string): Promise<ResponseUserDTO> {
      const user = await this.userService.findUserByTaxId(tax_id)
      if (!user) throw new HttpException(errorMessages.userNotFoundMessage, HttpStatus.NOT_FOUND)
      const validPassword = await comparePassword(
        passwordInserted,
        user.password
      )
      if (!validPassword) throw new HttpException(errorMessages.invalidPasswordMessage, HttpStatus.UNAUTHORIZED) 
      return new ResponseUserDTO(user.id, user.tax_id, user.name, user.role);
  }

  async login(loggedUser: ResponseUserDTO ) {
    const payload = {
      username: loggedUser.name,
      sub: loggedUser.id
    }
    return {
      access_token: this.jwtService.sign(payload),
      id: loggedUser.id,
      role: loggedUser.role,
      tax_id: loggedUser.tax_id,
      name: loggedUser.name,
    }
  }
}
