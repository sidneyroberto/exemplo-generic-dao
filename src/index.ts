import GenericDAO from './models/dao/GenericDAO'
import User from './models/entities/User'
import Post from './models/entities/Post'

const run = async () => {
  const user = new User('Sidney Sousa', 'sidney@email.com')
  const userDao = new GenericDAO<User>()
  const savedUser = await userDao.save(user)
  console.log(savedUser)

  const post = new Post(
    'Generics with Typescript',
    `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit commodo quam, a egestas dolor dictum eu. Sed et massa venenatis, malesuada diam sed, sodales purus. Maecenas eu nunc id nibh vehicula pretium eget ut augue. Fusce elementum neque quis tortor luctus ultricies. Curabitur pretium arcu et euismod dapibus. Morbi sagittis, nunc in eleifend tincidunt, dolor libero finibus ipsum, in sollicitudin lacus ante vitae elit. Vestibulum fringilla arcu ac egestas ultricies. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum nec quam ultricies, ullamcorper urna in, ultrices dolor.

      Nulla sodales blandit iaculis. Ut aliquam malesuada sapien, at gravida ante ultricies at. Nulla tristique consectetur odio, at venenatis nibh elementum sit amet. Curabitur nunc mauris, varius eu interdum eget, tempor at turpis. Donec hendrerit viverra est, vitae auctor turpis ornare non. Phasellus in sapien sit amet mauris porttitor vulputate eget eget neque. Aliquam in cursus urna. Sed rutrum lobortis mollis. Pellentesque tristique dui molestie turpis lacinia, at semper quam aliquet. Aenean quam mauris, consequat et leo nec, dictum congue ex. Integer eleifend a nibh et lobortis. Duis sodales maximus dolor id auctor.

      Quisque a condimentum odio, in varius tortor. Maecenas scelerisque erat vitae velit accumsan consequat. Nulla suscipit vehicula urna eget commodo. Sed tellus felis, molestie ut urna in, luctus vehicula neque. Suspendisse velit est, iaculis nec hendrerit sed, fringilla eu augue. Pellentesque ornare massa metus, ut elementum lacus eleifend sed. Duis vel justo vitae arcu mattis scelerisque. Donec placerat nunc nec metus vestibulum, eget ullamcorper metus suscipit. Integer faucibus augue metus, eget ultricies augue ultricies et. Nunc blandit vestibulum mi id maximus. Integer nisi ipsum, finibus ac est nec, tempor venenatis nibh. Praesent ac felis quis neque gravida pretium vitae eget metus.

      Curabitur pellentesque nunc vitae arcu venenatis, ac tempus leo ultrices. Phasellus sit amet imperdiet arcu. Vestibulum sit amet odio pretium quam aliquam viverra. Vestibulum dapibus erat nunc, at rutrum nulla fermentum quis. In euismod ipsum dictum, semper leo vel, suscipit sapien. Fusce molestie dolor et eros laoreet posuere. Quisque accumsan odio eu purus iaculis sollicitudin. Ut vulputate pharetra lectus, vitae molestie elit. Donec in purus quis lorem rutrum varius et vel lectus. Pellentesque congue elit non augue molestie aliquet. Aliquam augue felis, molestie in commodo maximus, tristique eu dolor. Nunc luctus ornare pulvinar. Praesent posuere ex quis rutrum dictum.

      In bibendum malesuada vulputate. Quisque aliquam in mauris at feugiat. Sed vitae purus id sapien lacinia placerat. Etiam semper libero arcu, in hendrerit risus faucibus a. Nullam ut quam non velit placerat dignissim quis nec enim. Vestibulum ac consectetur velit, a feugiat augue. Nulla dolor ipsum, porta sed euismod at, pulvinar id augue.
  `
  )
  const postDAO = new GenericDAO<Post>()
  const savedPost = await postDAO.save(post)
  console.log(savedPost)
}

run()
