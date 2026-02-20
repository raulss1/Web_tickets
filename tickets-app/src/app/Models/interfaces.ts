import { Signal } from "@angular/core";
import { NumberValueAccessor } from "@angular/forms";

export interface Ticket{
    uuid: string,
    id: number, 
    image: string, 
    company_name: string | null; 
    total: number | null; 
    date: string | null;
    igic: number | null;
    base_amount: number | null;
    cif: string | null;
    invoice_number: string | null;
}

export interface UserData{
    id: number,
    email: string,
    username: string,
    first_name: string,
    last_name: string,
}