import { BaseEntity } from './BaseEntity'
export class User extends BaseEntity {
  name: string = ''
  email: string = ''

  constructor(name: string, email: string) {
    super()
    this.name = name
    this.email = email
  }
}
