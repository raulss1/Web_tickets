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

export interface UserData{
    email: string,
    username: string,
    firstName: string,
    lastName: string,
}