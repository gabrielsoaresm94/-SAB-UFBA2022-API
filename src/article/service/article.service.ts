/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateArticleDto } from '../dto/create-article.dto'
import { ResponseArticleDTO } from '../dto/response-article.dto'
import { ArticleEntity, toArticleResponseDTO } from '../entities/article.entity'
import { StudentsService } from '../../students/service/students.service'
const PDFKit = require('pdfkit')
const fs = require('fs')

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    private studentService: StudentsService
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    return this.articleRepository.save(createArticleDto)
  }

  async findAll(): Promise<ResponseArticleDTO[]> {
    const articles = await this.articleRepository.find()
    return articles.map((article) => toArticleResponseDTO(article))
  }

  async findOne(id: number): Promise<ResponseArticleDTO> {
    const article = await this.articleRepository.findOneBy({ id })
    if (!article) throw new NotFoundException('Article not found')
    return article
  }

  // update(id: number, updateArticleDto: UpdateArticleDto) {
  //   return `This action updates a #${id} article` //TODO
  // }

  async remove(id: number) {
    const removed = await this.articleRepository.delete(id)
    if (removed.affected === 0) {
      throw new NotFoundException('Article not found')
    }
    return 'Article deleted'
  }

  async generatePDF() {
    const doc = new PDFKit()
    doc
      .fontSize(25)
      .text('Relatório de bolsas alocadas', 100, 80, { align: 'center' })
    const students = await this.studentService.findAllStudents()
    for (const student of students) {
      doc.text('Nome do aluno: ' + student.name).fontSize(16)
      doc.text('Matrícula: ' + student.enrolment_number).fontSize(16)
      doc.text('Curso: ' + student.course).fontSize(16)
      doc.text('Email: ' + student.email).fontSize(16)
      doc
        .text('Data de início no PGCOMP: ' + student.enrollment_date_pgcomp)
        .fontSize(16)
      doc.text('Artigos publicados:').fontSize(16)
      doc.moveDown()
      for (let i = 0; i < student.articles.length; i++) {
        doc.text('Artigo #' + (i + 1)).fontSize(16)
        doc.text('Título: ' + student.articles[i].title).fontSize(12)
        doc
          .text('Data de publicação: ' + student.articles[i].publication_date)
          .fontSize(12)
        doc.text('Doi Link: ' + student.articles[i].doi_link).fontSize(12)
        doc
          .text('Local de publicação: ' + student.articles[i].publication_place)
          .fontSize(12)
        doc.moveDown()
      }
    }
    doc.pipe(fs.createWriteStream('relatorio.pdf'))
    doc.end()
  }
}
