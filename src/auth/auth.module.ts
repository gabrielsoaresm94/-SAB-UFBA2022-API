import { Module } from '@nestjs/common'
import { AuthService } from './service/auth.service'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategy/local.strategy'
import { jwtConstants } from './constants'
import { JwtModule } from '@nestjs/jwt'
import { UserService } from '../user/service/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StudentEntity } from '../students/entities/students.entity'
import { AuthController } from './controller/auth.controller'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secretKey,
      signOptions: { expiresIn: jwtConstants.expirationTime }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
