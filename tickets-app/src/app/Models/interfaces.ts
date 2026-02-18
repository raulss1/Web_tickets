import { Signal } from "@angular/core";
import { NumberValueAccessor } from "@angular/forms";

export interface Ticket{
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
    firstName: string,
    lastName: string,
}