import { Validated } from "validated-extendable"
import { z } from 'zod'

export const addressSchema = z.object({
  country:  z.string().min(1).max(50),
  state: z.string() ,
  city:  z.string(),
  cep:  z.string(),
  neighbor:  z.string(),
  street:  z.string(),
  number: z.number(),
  addicional:  z.string(),
  id: z.number(),
})

export class Address extends Validated(addressSchema){}
