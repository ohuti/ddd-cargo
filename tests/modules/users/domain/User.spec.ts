import { User } from '@domainModels/user/User'
import { UserEmail } from '@domainModels/user/UserEmail'
import { UserName } from '@domainModels/user/UserName'
import { UserPassword } from '@domainModels/user/UserPassword'

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
