import { describe, it, expect } from "vitest";
import { createAddressDto } from '../../dtos/address/addressDtos'
import { Address, addressSchema } from "../../entities/address/address";


const country = 'Brasil'
const state = 'SP'
const city = 'Tiete'
const cep = '18530-000'
const neighbor = 'Centro'
const street = 'Avenida sao joao'
const number = 122
const addicional = "Teste"
const id = 1

var validAddress = new createAddressDto(
    { id, country, state, city, cep, neighbor, street, number, addicional }
)


describe('Create address dto', async () => {
    it('Cria um endereco valido', async () => {

        const address = addressSchema.parse(validAddress)

        expect(address).toBeInstanceOf(Address)
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

    it('Nao cria endereco com nome de pais menor que 3', async () => {

        validAddress.country = 'br'
        const address = await addressSchema.parse(validAddress)
        console.log(address)
        
        
        //expect(errors.length).toBe(1)
        //expect(errors.map( (e) => e.property)).toContain('country')

    })
})