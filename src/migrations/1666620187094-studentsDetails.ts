import { MigrationInterface, QueryRunner } from 'typeorm'

export class studentsDetails1666620187094 implements MigrationInterface {
  name = 'studentsDetails1666620187094'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "article" ("id" SERIAL NOT NULL, "student_id" integer NOT NULL, "title" character varying NOT NULL, "publication_date" TIMESTAMP NOT NULL, "publication_place" character varying NOT NULL, "doi_link" character varying NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "scholarship" ("id" SERIAL NOT NULL, "student_id" integer NOT NULL, "agency_id" integer NOT NULL, "scholarship_starts_at" TIMESTAMP NOT NULL, "scholarship_ends_at" TIMESTAMP NOT NULL, "extension_ends_at" TIMESTAMP NOT NULL, "salary" integer NOT NULL, "active" boolean NOT NULL, "model" character varying NOT NULL, CONSTRAINT "REL_5a9664d15e435d927f1348ef0d" UNIQUE ("student_id"), CONSTRAINT "PK_90ab4b7111faf40fd3c788eac7b" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "student" ("id" SERIAL NOT NULL, "tax_id" character varying(14) NOT NULL, "enrollment_number" character varying(10) NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "course" character varying NOT NULL, "link_lattes" character varying NOT NULL, "advisor_id" integer NOT NULL, "enrollment_date_pgcomp" date NOT NULL, "phone_number" character varying(11) NOT NULL, "password" character varying NOT NULL, "role" character varying DEFAULT 'STUDENT', "defense_prediction" TIMESTAMP NOT NULL, CONSTRAINT "UQ_4b02ce9388473fc888bfa11ee02" UNIQUE ("tax_id"), CONSTRAINT "UQ_a35b43b1922066e1ce387302533" UNIQUE ("enrollment_number"), CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "advisor" ("id" SERIAL NOT NULL, "tax_id" character varying(14) NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" character varying(11) NOT NULL, "password" character varying NOT NULL, "role" character varying DEFAULT 'ADVISOR', CONSTRAINT "UQ_ce52b8702f9c8c891dc384a4034" UNIQUE ("tax_id"), CONSTRAINT "UQ_0cdae2f0f94c29535b8e322c921" UNIQUE ("email"), CONSTRAINT "PK_41bd0367a08f2d8c34560a2785e" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "admin" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tax_id" character varying(14) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'ADMIN', CONSTRAINT "UQ_3cd54a103dcd8e9b5d5913b45c0" UNIQUE ("tax_id"), CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "article" ADD CONSTRAINT "FK_6593243b4fd0fd8a496b2cd58db" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "scholarship" ADD CONSTRAINT "FK_5a9664d15e435d927f1348ef0d4" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "scholarship" DROP CONSTRAINT "FK_5a9664d15e435d927f1348ef0d4"`
    )
    await queryRunner.query(
      `ALTER TABLE "article" DROP CONSTRAINT "FK_6593243b4fd0fd8a496b2cd58db"`
    )
    await queryRunner.query(`DROP TABLE "admin"`)
    await queryRunner.query(`DROP TABLE "advisor"`)
    await queryRunner.query(`DROP TABLE "student"`)
    await queryRunner.query(`DROP TABLE "scholarship"`)
    await queryRunner.query(`DROP TABLE "article"`)
  }
}
