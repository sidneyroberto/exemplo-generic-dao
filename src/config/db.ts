import { Pool, QueryResult } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

export const sqlPool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB,
  host: process.env.HOST,
  port: Number(process.env.PORT),
  password: process.env.PASSWORD,
})

export const createTables = async () => {
  console.log('Creating tables...')
  sqlPool.query(
    'create table if not exists "user" ("id" serial primary key, "name" varchar not null, "email" varchar not null)',
    (err, _) => {
      if (err) {
        console.log('Error while trying to create table user')
        console.log(err)
      }
    }
  )

  sqlPool.query(
    'create table if not exists "post" ("id" serial primary key, "title" varchar not null, "content" varchar not null, "creationDate" date not null)',
    (err, _) => {
      if (err) {
        console.log('Error while trying to create table post')
        console.log(err)
      }
    }
  )
}

export const executeQuery = async (
  query: string,
  values?: any[]
): Promise<QueryResult<any>> => {
  const result = values
    ? await sqlPool.query(query, values)
    : await sqlPool.query(query)

  return result
}

process.on('SIGINT', async () => {
  await sqlPool.end()
  console.log('Connection to db closed')
})
