import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { ArticleService } from '../service/article.service'
import { CreateArticleDto } from '../dto/create-article.dto'
const axios = require('axios')
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

  @Get('/xml')
  async xml() {
    const url =
      'http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4796195U9'
    // const parser = new xml2js.Parser()
    // fs.readFile('src/article/controller/curriculo.xml', function (err, data) {
    //   parser.parseString(data, async function (err, result) {
    //     if (err) {
    //       return 'Erro ao ler o arquivo'
    //     }
    //     console.log(JSON.stringify(result))
    //     return await JSON.stringify(result)
    //   })
    // })

    axios
      .get(url)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
