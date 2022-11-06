/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateArticleDto } from '../dto/create-article.dto'
import { ResponseArticleDTO } from '../dto/response-article.dto'
import { ArticleEntity, toArticleResponseDTO } from '../entities/article.entity'
import { StudentsService } from '../../students/service/students.service'
import { AdvisorService } from '../../advisor/service/advisor.service'
const PDFKit = require('pdfkit')

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    private studentService: StudentsService,
    private advisorService: AdvisorService
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const studentIsValid = await this.studentService.findById(
      createArticleDto.student_id
    )
    if (!studentIsValid) {
      return new NotFoundException('Student not found')
    }
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

  async formatterDate(date: string) {
    const arrayDate = date.split('-')
    return arrayDate[2] + '/' + arrayDate[1] + '/' + arrayDate[0]
  }
  async formatDate(date: Date) {
    if (date == null) {
      return 'Sem previsão'
    }
    const day = date.getDate().toString()
    const dayFormatted = day.length == 1 ? '0' + day : day
    const month = (date.getMonth() + 1).toString()
    const monthFormatted = month.length == 1 ? '0' + month : month
    const year = date.getFullYear()
    return dayFormatted + '/' + monthFormatted + '/' + year
  }

  async generatePDF(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      const doc = new PDFKit({ size: 'A4' })
      doc.fontSize(25)
      doc
        .font('Times-Roman')
        .text('Relatório de bolsas alocadas', { align: 'center' })
      doc.lineWidth(15)
      doc.lineCap('butt').moveTo(50, 120).lineTo(550, 120).stroke()
      const students = await this.studentService.findAllStudents()
      for (const student of students) {
        doc.moveDown(2)
        doc.fontSize(12)
        doc.font('Times-Roman').text('Nome: ' + student.name)
        doc.text('Matrícula: ' + student.enrollment_number)
        doc.text('Curso: ' + student.course).fontSize(12)
        doc.text('Email: ' + student.email)
        doc.text('Telefone: ' + student.phone_number).fontSize(12)
        const enrollment_date = await this.formatterDate(
          student.enrollment_date_pgcomp.toString()
        )
        const defense_date = await this.formatDate(student.defense_prediction)
        doc
          .text(
            'Data de início no PGCOMP: ' +
              enrollment_date +
              '           Data de defesa: ' +
              defense_date
          )
          .fontSize(12)
        if (student.scholarship == null) {
          doc
            .font('Times-Bold')
            .text('Estudante sem bolsa de pesquisa', { align: 'center' })
        } else {
          doc.fontSize(12)
          const scholarship_start = await this.formatDate(
            student.scholarship.scholarship_starts_at
          )
          const scholarship_end = await this.formatDate(
            student.scholarship.scholarship_ends_at
          )
          doc
            .text(
              'Data de início da bolsa: ' +
                scholarship_start +
                '                   Data de fim da bolsa: ' +
                scholarship_end
            )
            .fontSize(12)
          if (
            student.scholarship.extension_ends_at == null ||
            student.scholarship.extension_ends_at.getTime() ==
              student.scholarship.scholarship_ends_at.getTime()
          ) {
            doc
              .font('Times-Bold')
              .text('Sem extensão de bolsa cadastrada', { align: 'center' })
          } else {
            doc
              .font('Times-Bold')
              .text(
                'Bolsa extendida até: ' +
                  (await this.formatDate(
                    student.scholarship.extension_ends_at
                  )),
                { align: 'center' }
              )
          }
        }
        doc.fontSize(12)
        if (student.advisor_id != null) {
          const advisor = await this.advisorService.findOneById(
            student.advisor_id
          )

          doc.font('Times-Roman').text('Orientador(a): ' + advisor.name)
          doc.text('Email do(a) orientador(a): ' + advisor.email).fontSize(12)
        } else {
          doc.text('Estudante sem orientador(a)')
        }
        doc.moveDown(2)
        if (student.articles.length > 0) {
          if (student.articles.length == 1) {
            doc.text('Artigo publicado: ').fontSize(12)
          } else {
            doc.text('Artigos publicados:').fontSize(12)
          }
          doc.moveDown()
          for (let i = 0; i < student.articles.length; i++) {
            doc.fontSize(10)
            doc.text('    Título: ' + student.articles[i].title)
            const publication_date = await this.formatDate(
              student.articles[i].publication_date
            )
            doc.text(
              '    Local de publicação: ' +
                student.articles[i].publication_place
            )
            doc.text('    Data de publicação: ' + publication_date).fontSize(10)
            doc
              .text('    DOI Link: ' + student.articles[i].doi_link)
              .fontSize(10)
            doc.moveDown()
          }
        } else {
          doc.text('Sem artigos publicados.').fontSize(12)
        }
        doc.moveDown(2)
        doc.lineWidth(5)
        doc
          .lineCap('butt')
          .moveTo(doc.x, doc.y)
          .lineTo(doc.x + 450, doc.y)
          .stroke()
      }
      doc.end()

      const buffer = []
      doc.on('data', buffer.push.bind(buffer))
      doc.on('end', () => {
        const data = Buffer.concat(buffer)
        resolve(data)
      })
    })
    return pdfBuffer
  }
}
