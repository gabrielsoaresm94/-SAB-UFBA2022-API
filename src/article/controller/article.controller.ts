import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common'
import { ArticleService } from '../service/article.service'
import { CreateArticleDto } from '../dto/create-article.dto'
import { Response } from 'express'
import * as moment from 'moment'

@Controller('v1/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/create')
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  @Get('/findall')
  findAll() {
    return this.articleService.findAll()
  }

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
  async generateReport(@Res() response: Response): Promise<void> {
    const doc = await this.articleService.generatePDF()
    const filename =
      'RELATORIO DE BOLSAS ATUALIZADO EM ' +
      moment().format('DD-MM-yy hh:mm:ss') +
      '.pdf'
    response.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="' + filename + '"',
      'Content-Length': doc.length
    })
    response.end(doc)
  }
}
