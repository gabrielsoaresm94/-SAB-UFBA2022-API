import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
dotenv.config()

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST, // process.env.HOST
  port: 5432, // parseInt(process.env.DATABASE_PORT)
  username: 'postgres', // process.env.DATABASE_USERNAME
  password: 'postgres', // process.env.DATABASE_PASSWORD
  database: 'postgres', // process.env.DATABASE_NAME
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/migrations/**/*{.ts,.js}']
})
