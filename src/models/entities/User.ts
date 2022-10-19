import * as EmailValidator from 'email-validator'

import BaseEntity from './BaseEntity'
import EntityValidationError from '../../errors/EntityValidationError'

export default class User extends BaseEntity {
  private _name: string = ''
  private _email: string = ''

  constructor(name: string, email: string) {
    super()
    this.name = name
    this.email = email
  }

  set name(name: string) {
    if (name.length < 10) {
      throw new EntityValidationError(
        'Invalid name: name should have 10 characters at least'
      )
    }
    this._name = name
  }

  get name() {
    return this._name
  }

  set email(email: string) {
    if (!EmailValidator.validate(email)) {
      throw new EntityValidationError('Invalid e-mail')
    }
    this._email = email
  }

  get email() {
    return this._email
  }
}
