import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWToken, Ticket, User } from '../../Models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  api_provider = "http://127.0.0.1:8000/api/";
  
  constructor(private http: HttpClient){}

  register(username:string, password1:string, password2:string, email:string, name:string, lastname:string): Observable<User>{
      const api_url = this.api_provider + "registration/";
      const body = {username:username, password1:password1, password2:password2, email:email, name:name, lastname:lastname}

      return this.http.post<User>(api_url, body)
  }

  login(name:string, password:string): Observable<User>{
    const api_url = this.api_provider + "authentication/login/";
    const body = {username: name, password: password};

    return this.http.post<User>(api_url, body);
  }

  refreshToken(token:string): Observable<JWToken>{
    const api_url = this.api_provider + "token/refresh/";
    const body = {token:token}

    return this.http.post<JWToken>(api_url, body)
  }

  getTicketInfo(ticket:File): Observable<Ticket>{
    const api_url = this.api_provider + "tickets/";
    const formData = new FormData();
    
    formData.append('image', ticket);

    return this.http.post<Ticket>(api_url, formData);
  }
}
