import EntityValidationError from '../../errors/EntityValidationError'
import BaseEntity from './BaseEntity'

export default class Post extends BaseEntity {
  private _title: string = ''
  private _content: string = ''

  constructor(title: string, content: string) {
    super()
    this.title = title
    this.content = content
  }

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
    if (content.length < 50) {
      throw new EntityValidationError(
        'Content must have at least 50 characteres'
      )
    }
    this._content = content
  }

  get content() {
    return this._content
  }
}
