import { executeQuery } from '../../config/db'

export class GenericDAO<T extends Object> {
  private _tableName: string

  constructor(Entity: new (...args: any[]) => T) {
    this._tableName = Entity.name.toLowerCase()
  }

  async save(obj: T) {
    const values = this._getObjectValues(obj)

    const sqlQuery = `insert into "${this._tableName}"(${this._getAttributes(
      obj
    ).join(', ')}) values(${this._getAttributes(obj).map(
      (_, index) => `$${index + 1}`
    )}) returning *`

    const result = await executeQuery(sqlQuery, values)
    return result ? result.rows[0] : result
  }

  async delete(id: number) {
    const sqlQuery = `delete from "${this._tableName}" where id = $1`
    const result = await executeQuery(sqlQuery, [id])
    return result.rowCount > 0 ? true : false
  }

  async update(obj: T, id: number) {
    const settings = this._getAttributes(obj).map(
      (a, index) => `${a} = $${index + 1}`
    )
    const sqlQuery = `
      update "${this._tableName}"
      set ${settings.join(', ')}
      where "id" = $${settings.length + 1}
      returning *
    `
    const values = [...this._getObjectValues(obj), id]
    const result = await executeQuery(sqlQuery, values)
    return result ? result.rows[0] : result
  }

  private _getAttributes(obj: T) {
    return Object.getOwnPropertyNames(obj).map((p) => p.replace('_', ''))
  }

  private _getObjectValues(obj: T) {
    return this._getAttributes(obj).map((a) => Reflect.get(obj, a))
  }
}
