import { describe, it, expect } from "vitest";
import { validate } from "class-validator";
import { createAddressDto } from '../../dtos/address/addressDtos'

describe('Create address dto', async () => {
    it('Cria um endereco valido', async () => {

        const country = 'Brasil'
        const state = 'SP'
        const city = 'Tiete'
        const cep = '18530-000'
        const neighbor = 'Centro'
        const street = 'Avenida sao joao'
        const number = 122
        const addicional = "Teste"
        const id = 1

        const address = new createAddressDto(
            {id, country, state, city, cep, neighbor, street, number, addicional}
        )

        const errors = await validate(address)
        console.log(errors)

        expect(address).toBeInstanceOf(createAddressDto)
        expect(errors.length).toBe(0)
        expect(address.id).toBe(id)
        expect(address.country).toBe(country)
        expect(address.state).toBe(state)
        expect(address.city).toBe(city)
        expect(address.cep).toBe(cep)
        expect(address.neighbor).toBe(neighbor)
        expect(address.street).toBe(street)
        expect(address.number).toBe(number)
        expect(address.addicional).toBe(addicional)
    })
})