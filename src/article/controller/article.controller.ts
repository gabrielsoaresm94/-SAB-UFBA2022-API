import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { ArticleService } from '../service/article.service'
import { CreateArticleDto } from '../dto/create-article.dto'
import { Roles } from '../../roles/decorator/roles.decorator'
import { Role } from '../../roles/enum/role.enum'

@Controller('v1/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/create')
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  @Roles(Role.ADMIN, Role.ADVISOR)
  @Get('/findall')
  findAll() {
    return this.articleService.findAll()
  }

  @Roles(Role.ADMIN, Role.ADVISOR)
  @Get('/findbyid/:id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id)
  }

  // @Patch('/update/:id')
  // update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  //   return this.articleService.update(+id, updateArticleDto)
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }

  @Get('/generate-pdf')
  async xml() {
    return this.articleService.generatePDF()
  }
}
