import { GenericDAO } from './models/dao/GenericDAO'
import { Post } from './models/entities/Post'
import { User } from './models/entities/User'

const run = async () => {
  const user = new User('Sidney Sousa', 'sidney@email.com')
  const userDao = new GenericDAO(User)
  let result = await userDao.save(user)
  console.log(result)
  let { id } = result
  user.email = 'sidney.sousa@email.com'
  result = await userDao.update(user, id)
  console.log(result)

  const post = new Post()
  post.title = 'Generics with TypeScript'
  post.content = 'Generics with TypeScript are very useful'
  post.creationDate = new Date('2022-10-10T00:00:00')
  const postDAO = new GenericDAO(Post)
  result = await postDAO.save(post)
  console.log(result)
  post.title = 'Another title'
  result = await postDAO.update(post, result.id)
  console.log(result)
}

run()
