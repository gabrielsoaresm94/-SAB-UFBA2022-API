import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ArticleEntity } from '../entities/article.entity'
import { ArticleService } from './article.service'

describe('ArticleService', () => {
  let service: ArticleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        ArticleEntity,
        { provide: getRepositoryToken(ArticleEntity), useValue: {} }
      ]
    }).compile()

    service = module.get<ArticleService>(ArticleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
