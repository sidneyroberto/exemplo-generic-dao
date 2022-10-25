import { createTables } from './config/db'
import { GenericDAO } from './models/dao/GenericDAO'
import { Post } from './models/entities/Post'
import { User } from './models/entities/User'

/*
const run = async () => {
  await createTables()
  const user = new User('Sidney Sousa', 'sidney@email.com')
  const userDao = new GenericDAO(User)
  let savedUser = await userDao.save(user)
  console.log(savedUser)
  let { id } = savedUser
  user.email = 'sidney.sousa@email.com'
  savedUser = await userDao.update(user, id)
  console.log(savedUser)

  const post = new Post(
    'Generics with TypeScript',
    'Generics with TypeScript are very useful',
    new Date('2022-10-10T00:00:00')
  )
  const postDAO = new GenericDAO(Post)
  let savedPost = await postDAO.save(post)
  console.log(savedPost)
  post.title = 'Another title'
  savedPost = await postDAO.update(post, savedPost.id)
  console.log(savedPost)
}

run()


class A {
  private _a: string
  private _b: string

  constructor(a: string, b: string) {
    this._a = a
    this._b = b
  }
}

class G<T> {
  private _class: new (...args: any[]) => T

  constructor(entity: new (...args: any[]) => T) {
    this._class = entity
  }

  createInstance() {
    const obj = { _b: 'E aeh', _a: 'Oi' }
    const instance: T = new this._class()
    const attrs = Object.getOwnPropertyNames(obj)
    Object.assign(instance, obj)
    return instance
  }
}

const obj = new G(A)
console.log(obj.createInstance())
*/

createTables().then(() => {
  const userDAO = new GenericDAO(User)
  userDAO.findAll().then((users) => console.log(users))
  const postDAO = new GenericDAO(Post)
  postDAO.findAll().then((posts) => console.log(posts))

  postDAO.findById(2).then((post) => console.log(post))
  userDAO.findById(2).then((user) => console.log(user))
})
