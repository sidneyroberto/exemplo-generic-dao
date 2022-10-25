import { executeQuery } from '../../config/db'
import { BaseEntity } from '../entities/BaseEntity'

export class GenericDAO<T extends BaseEntity> {
  private _tableName: string
  private _entity: new (...args: any[]) => T

  constructor(entity: new (...args: any[]) => T) {
    this._entity = entity
    this._tableName = entity.name.toLowerCase()
  }

  async save(obj: T): Promise<T | null> {
    const values = this._getObjectValues(obj)

    const sqlQuery = `insert into "${this._tableName}"(${this._getAttributes(
      obj
    )
      .map((a) => `"${a}"`)
      .join(', ')}) values(${this._getAttributes(obj).map(
      (_, index) => `$${index + 1}`
    )}) returning *`

    const result = await executeQuery(sqlQuery, values)
    const instance = new this._entity()
    return result.rowCount > 0 ? Object.assign(instance, result.rows[0]) : null
  }

  async delete(id: number): Promise<boolean> {
    const sqlQuery = `delete from "${this._tableName}" where id = $1`
    const result = await executeQuery(sqlQuery, [id])
    return result.rowCount > 0 ? true : false
  }

  async update(obj: T, id: number): Promise<T | null> {
    const settings = this._getAttributes(obj).map(
      (a, index) => `"${a}" = $${index + 1}`
    )
    const sqlQuery = `
      update "${this._tableName}"
      set ${settings.join(', ')}
      where "id" = $${settings.length + 1}
      returning *
    `
    const values = [...this._getObjectValues(obj), id]
    const result = await executeQuery(sqlQuery, values)
    const instance = new this._entity()
    return result.rowCount > 0 ? Object.assign(instance, result.rows[0]) : null
  }

  async findAll(): Promise<T[]> {
    const sqlQuery = `select *from "${this._tableName}" order by id`
    const result = await executeQuery(sqlQuery)

    const objs: T[] = result
      ? result.rows.map((r) => {
          const instance: T = new this._entity()
          Object.assign(instance, r)
          return instance
        })
      : []

    return objs
  }

  async findById(id: number): Promise<T | null> {
    const sqlQuery = `select *from "${this._tableName}" where id = $1`
    const result = await executeQuery(sqlQuery, [id])
    const instance: T = new this._entity()
    return result.rowCount > 0 ? Object.assign(instance, result.rows[0]) : null
  }

  private _getAttributes(obj: T): string[] {
    return Object.getOwnPropertyNames(obj)
  }

  private _getObjectValues(obj: T): any[] {
    return this._getAttributes(obj).map((a) => Reflect.get(obj, a))
  }
}
