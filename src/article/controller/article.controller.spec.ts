import { Test, TestingModule } from '@nestjs/testing'
import { ArticleController } from './article.controller'
import { ArticleService } from '../service/article.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ArticleEntity } from '../entities/article.entity'

describe('ArticleController', () => {
  let controller: ArticleController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        ArticleService,
        { provide: getRepositoryToken(ArticleEntity), useValue: {} }
      ]
    }).compile()

    controller = module.get<ArticleController>(ArticleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
