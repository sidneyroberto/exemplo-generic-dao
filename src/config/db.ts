import { Client, QueryResult } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

export const sqlClient = new Client({
  user: process.env.DB_USER,
  database: process.env.DB,
  host: process.env.HOST,
  port: Number(process.env.PORT),
  password: process.env.PASSWORD,
})

const createTables = async () => {
  await sqlClient.connect()
  sqlClient.query(
    'create table if not exists "user" (id serial primary key, name varchar not null, email varchar not null)',
    (err, _) => {
      if (err) {
        console.log('Error while trying to create table user')
        console.log(err)
      }
    }
  )

  sqlClient.query(
    'create table if not exists "post" (id serial primary key, title varchar not null, content varchar not null, creationDate date not null)',
    (err, _) => {
      if (err) {
        console.log('Error while trying to create table user')
        console.log(err)
      }
    }
  )
}
createTables()

export const executeQuery = async (
  query: string,
  values?: any[]
): Promise<QueryResult<any>> => {
  const result = values
    ? await sqlClient.query(query, values)
    : await sqlClient.query(query)

  return result
}

process.on('SIGINT', () => {
  console.log('Closing db connection')
  sqlClient.end()
})
