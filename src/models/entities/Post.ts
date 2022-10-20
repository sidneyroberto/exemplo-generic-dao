import { Entity } from '../../decorators/Entity'
import { EntityValidationError } from '../../errors/EntityValidationError'

@Entity
export class Post {
  private _title: string = ''
  private _content: string = ''
  private _creationDate: Date = new Date()

  set title(title: string) {
    if (title.length < 0) {
      throw new EntityValidationError('Title cannot be empty')
    }
    this._title = title
  }

  get title() {
    return this._title
  }

  set content(content: string) {
    if (content.length < 10) {
      throw new EntityValidationError(
        'Content must have at least 50 characteres'
      )
    }
    this._content = content
  }

  get content() {
    return this._content
  }

  set creationDate(creationDate: Date) {
    if (creationDate > new Date()) {
      throw new EntityValidationError('Creation date must not be in future')
    }
    this._creationDate = creationDate
  }

  get creationDate() {
    return this._creationDate
  }
}
