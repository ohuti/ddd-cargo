import { User } from '@userDomain/User'
import { UserEmail } from '@userDomain/UserEmail'
import { UserName } from '@userDomain/UserName'
import { UserPassword } from '@userDomain/UserPassword'

test('Testing Client Entity creation', () => {
    const emailVO = UserEmail.create('testing@powerrev.com')
    const nameVO = UserName.create('Test client')
    const passwordVO = UserPassword.create('testing@1943$')

    expect(emailVO.isFailure).toBe(false)
    expect(nameVO.isFailure).toBe(false)
    expect(passwordVO.isFailure).toBe(false)

    const email = emailVO.getValue()
    const name = nameVO.getValue()
    const password = passwordVO.getValue()

    expect(email.equals(email)).toBe(true)
    expect(name.equals(name)).toBe(true)
    expect(password.equals(password)).toBe(true)

    const clientEntity = User.create({email,name,password})
    const client = clientEntity.getValue()

    expect(clientEntity.isSuccess).toBe(true)
    expect(client.equals(client)).toBe(true)
    expect(client.id).not.toBe(null || undefined)
})
