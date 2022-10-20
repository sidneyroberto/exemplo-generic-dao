import * as EmailValidator from 'email-validator'
import { Entity } from '../../decorators/Entity'

import { EntityValidationError } from '../../errors/EntityValidationError'
@Entity
export class User {
  private _name: string = ''
  private _email: string = ''

  constructor(name: string, email: string) {
    this.name = name
    this.email = email
  }

  set name(name: string) {
    console.log(name)
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
