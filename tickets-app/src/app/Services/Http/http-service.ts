import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../../Models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  api_provider = "http://127.0.0.1:8000/api/";
  
  constructor(private http: HttpClient){}

  register(username:string, password1:string, password2:string, email:string, name:string, lastname:string){
      const api_url = this.api_provider + "registration/";
      const body = {username:username, password1:password1, password2:password2, email:email, name:name, lastname:lastname}

      this.http.post(api_url, body)
  }

  login(name:string, password:string){
    const api_url = this.api_provider + "authentication/login/";
    const body = {username: name, password: password};

    this.http.post(api_url, body);
  }

  getTicketInfo(ticket:File): Observable<Ticket>{
    const api_url = this.api_provider + "tickets/";
    const formData = new FormData();
    
    formData.append('image', ticket);

    return this.http.post<Ticket>(api_url, formData);
  }
}
