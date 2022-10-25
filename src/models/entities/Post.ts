import { BaseEntity } from './BaseEntity'

export class Post extends BaseEntity {
  title: string
  content: string
  creationDate: Date

  constructor(title: string, content: string, creationDate: Date) {
    super()
    this.title = title
    this.content = content
    this.creationDate = creationDate
  }
}
