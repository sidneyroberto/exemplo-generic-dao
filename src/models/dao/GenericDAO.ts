import BaseEntity from '../entities/BaseEntity'
import { executeQuery } from '../../config/db'

export default class GenericDAO<T extends BaseEntity> {
  async save(obj: T) {
    const attributes = Object.getOwnPropertyNames(obj).map((p) =>
      p.replace('_', '')
    )

    const values = attributes.map((a) => Reflect.get(obj, a))

    const tableName = obj.constructor.name.toLowerCase()

    const sqlQuery = `insert into "${tableName}"(${attributes.join(
      ', '
    )}) values(${attributes.map((_, index) => `$${index + 1}`)}) returning *`
    console.log(sqlQuery)

    const result = await executeQuery(sqlQuery, values)
    return result ? result.rows[0] : result
  }
}
