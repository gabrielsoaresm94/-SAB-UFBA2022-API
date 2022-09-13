import { Test, TestingModule } from '@nestjs/testing'
import { StudentsService } from '../service/students.service'
import { StudentEntity } from '../entities/students.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { NotFoundException } from '@nestjs/common'
import { TestUtil } from '../../common/tests/TestUtil'

describe('User Service', () => {
  let service: StudentsService

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn()
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        StudentEntity,
        { provide: getRepositoryToken(StudentEntity), useValue: mockRepository }
      ]
    }).compile()

    service = await moduleFixture.resolve(StudentsService)
  })

  beforeEach(() => {
    mockRepository.find.mockReset()
    mockRepository.findOne.mockReset()
    mockRepository.create.mockReset()
  })
  jest.useFakeTimers()
  describe('findUserById', () => {
    it('Should return student after Get student by ID', async () => {
      const student = TestUtil.givenValidStudent()

      mockRepository.findOne.mockResolvedValue(student)
      const studentResult = await service.findById(1)
      expect(studentResult).toMatchObject({ name: student.name })
      expect(mockRepository.findOne).toBeCalledTimes(1)
    })

    it('Should return NotFoundException if not find a user', async () => {
      mockRepository.findOne.mockReturnValue(null)
      expect(service.findById(1)).rejects.toBeInstanceOf(NotFoundException)
      expect(mockRepository.findOne).toBeCalledTimes(1)
    })
  })
})
