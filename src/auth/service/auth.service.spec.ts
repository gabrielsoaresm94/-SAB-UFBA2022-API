import { Test,  TestingModule } from "@nestjs/testing"
import { INestApplication, HttpException } from '@nestjs/common'
import { AuthService } from "./auth.service"
import { UserService } from "../../user/service/user.service"
import { ResponseStudentDTO } from "../../students/model/student.response.dto"
import { getRepositoryToken } from "@nestjs/typeorm"
import { StudentEntity } from "../../students/entities/students.entity"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { jwtConstants } from "../constants"
import { CreateStudentDTO } from "../../students/model/student.dto.input"


describe('User Login Service', ()=>{
    let app: INestApplication
    let authService: AuthService

    const mockRepository ={
        find: jest.fn(),
        findOneBy: jest.fn(),
        create: jest.fn()
    }

    beforeAll(async () =>{
        const moduleFixture: TestingModule = await Test.createTestingModule({
            providers:[UserService, AuthService, {
                provide: getRepositoryToken(StudentEntity), useValue: mockRepository
            } ],
            imports:[JwtModule.register({
                secret: jwtConstants.secretKey,
                signOptions: { expiresIn: jwtConstants.expirationTime }
              })] 
        }).compile()
        authService = await moduleFixture.resolve(AuthService)
    })

    beforeEach(()=>{
        mockRepository.find.mockReset()
        mockRepository.findOneBy.mockReset()
        mockRepository.create.mockReset()
    })

    describe('Login Test', ()=>{
        it('Should not return access_token after verify credentials',async () => {
            const user = new ResponseStudentDTO(
                1,
                '413431',
                '123456789',
                'John Doe',
                'email@gmail.com',
                'Computer Science',
                'https://lattes.cnpq.br/1234567890123456',
                1,
                new Date(),
                '12345678901',
                'STUDENT'
              )
            expect(authService.login(user)).toBeInstanceOf(Promise<{}>);
        })

        it('Should return access_token after verify credentials',async () => {
            const student = new CreateStudentDTO(
                "123456789", 
                "12345678901",
                "John Doe",
                "johndoe@email.com",
                "Computer Science", 
                "link.lates", 
                1, 
                new Date(), 
                "999999999", 
                "1234", 
                "STUDENT"
            )
            const user = "123456789"
            const password = "1234"
            mockRepository.create.mockResolvedValue(student)
            expect(authService.validateUser(user, password)).toThrowErrorMatchingSnapshot("Wrong credentials provided")
        })
    })
            
})