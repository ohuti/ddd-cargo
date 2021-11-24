import { User } from '@users/domain/User'
import { UserEmail } from '@users/domain/UserEmail'
import { UserName } from '@users/domain/UserName'
import { UserOcupation } from '@users/domain/UserOccupation'
import { UserPassword } from '@users/domain/UserPassword'

test('Testing Client Entity creation', () => {
    const emailVO = UserEmail.create('testing@powerrev.com')
    const nameVO = UserName.create('Test client')
    const occupationVO = UserOcupation.create('admin')
    const passwordVO = UserPassword.create('testing@1943$')

    expect(emailVO.isFailure).toBe(false)
    expect(nameVO.isFailure).toBe(false)
    expect(occupationVO.isFailure).toBe(false)
    expect(passwordVO.isFailure).toBe(false)

    const email = emailVO.getValue()
    const name = nameVO.getValue()
    const occupation = occupationVO.getValue()
    const password = passwordVO.getValue()

    expect(email.equals(email)).toBe(true)
    expect(name.equals(name)).toBe(true)
    expect(occupation.equals(occupation)).toBe(true)
    expect(password.equals(password)).toBe(true)

    const clientEntity = User.create({email,name,occupation,password})
    const client = clientEntity.getValue()

    expect(clientEntity.isSuccess).toBe(true)
    expect(client.equals(client)).toBe(true)
    expect(client.id).not.toBe(null || undefined)
})
