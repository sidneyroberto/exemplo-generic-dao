import { EntityValidationError } from '../../errors/EntityValidationError'
import { User } from './User'

describe('Tests over User entity', () => {
  it('should not allow an user with invalid name', () => {
    expect(() => {
      const user = new User()
      user.name = 'Sidney'
      user.email = 'sidney@email.com'
    }).toThrow(EntityValidationError)
  })

  it('should not allow an user with invalid e-mail', () => {
    expect(() => {
      const user = new User()
      user.name = 'Sidney Sousa'
      user.email = 'sidney.email.com'
    }).toThrow(EntityValidationError)
  })

  it('should allow an user with valid name and e-mail', () => {
    const user = new User()
    user.name = 'Sidney Sousa'
    user.email = 'sidney@email.com'
    expect(user.name).toBe('Sidney Sousa')
    expect(user.email).toBe('sidney@email.com')
  })
})
