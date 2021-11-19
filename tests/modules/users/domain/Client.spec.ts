import { Client } from '@users/domain/Client'
import { ClientEmail } from '@users/domain/ClientEmail'
import { ClientName } from '@users/domain/ClientName'
import { ClientOcupation } from '@users/domain/ClientOccupation'
import { ClientPassword } from '@users/domain/ClientPassword'

test('Testing Client Entity creation', () => {
    const emailVO = ClientEmail.create('testing@powerrev.com')
    const nameVO = ClientName.create('Test client')
    const occupationVO = ClientOcupation.create('Recipient')
    const passwordVO = ClientPassword.create('testing@1943$')

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

    const clientEntity = Client.create({email,name,occupation,password})
    const client = clientEntity.getValue()

    expect(clientEntity.isSuccess).toBe(true)
    expect(client.equals(client)).toBe(true)
    expect(client.id).not.toBe(null || undefined)
})
