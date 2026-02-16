import { Signal } from "@angular/core";

export interface Ticket{
    'id': number, 
    'image': string, 
    'company_name': string, 
    'total': number, 
    'date': Date,
    'igic': number,
    'base_amount': number,
    'cif': string,
    'invoice_number': string,
}

export interface User{
    accessToken: string, 
    refreshToken: string,
    email: string,
    username: string,
    firstName: string,
    lastName: string,
}

export interface JWToken{
    accessToken: string,
    refreshToken: string,
}