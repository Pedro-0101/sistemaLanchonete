import { IsNumber, IsString, Length } from "class-validator";
import { addressProps } from "../../entities/address/address";

export class createAddressDto {
    @IsNumber()
    id: number

    @IsString()
    @Length(3, 50)
    country: string

    @IsString()
    @Length(2, 2)
    state: string;

    @IsString()
    @Length(3, 50)
    city: string;

    @IsString()
    @Length(9, 9)
    cep: string;

    @IsString()
    @Length(3, 50)
    neighbor: string;

    @IsString()
    @Length(3, 50)
    street: string;

    @IsNumber()
    number: number;

    @IsString()
    @Length(3, 255)
    addicional: string;

    constructor(props: addressProps){
        this.id = props.id
        this.country = props.country
        this.state = props.state
        this.city = props.city
        this.cep = props.cep
        this.neighbor = props.neighbor
        this.street = props.street
        this.number = props.number
        this.addicional = props.addicional
    }


}