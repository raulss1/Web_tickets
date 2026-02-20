import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Ticket, UserData } from '../../Models/interfaces';
import Cookies from 'js-cookie';

// Definimos una interfaz auxiliar para la respuesta del Login de dj-rest-auth
// Normalmente devuelve: { key: '...', user: { ... } } o tokens + user
interface LoginResponse {
  user: UserData;
  access?: string;
  refresh?: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  
  private api_provider = "http://127.0.0.1:8000/api/";

  // Inicializamos el estado leyendo del localStorage
  private currentUserSubject = new BehaviorSubject<UserData | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(private http: HttpClient){}

  register(username:string, password1:string, password2:string, email:string, name:string, lastname:string): Observable<LoginResponse>{
      const api_url = `${this.api_provider}registration/`;
      const body = {
        username, 
        password1, 
        password2, 
        email, 
        firstName: name, 
        lastName: lastname
      };

      return this.http.post<LoginResponse>(api_url, body)
        .pipe(
          tap((response) => {
            if (response.user){
              this.saveUserToStorage(response.user)
            }
          })
        )
  }

  login(username:string, password:string): Observable<LoginResponse>{
    const api_url = `${this.api_provider}authentication/login/`;
    const body = { username, password };

    return this.http.post<LoginResponse>(api_url, body, { withCredentials: true })
      .pipe(
        tap((response) => {
          if (response.user) {
            this.saveUserToStorage(response.user);
          }
        })
      );
  }

  getTicketInfo(ticket: File): Observable<Ticket>{
    const api_url = `${this.api_provider}tickets/`;
    const formData = new FormData();
    
    formData.append('image', ticket);

    const csrfToken = Cookies.get('csrftoken'); 

    return this.http.post<Ticket>(api_url, formData, { 
        withCredentials: true,
        headers: {
            'X-CSRFToken': csrfToken || '' 
        }
    });
  }

  getAllUserTickets(): Observable<Ticket>{
    const api_url = `${this.api_provider}my-tickets/`;

    return this.http.get<Ticket>(api_url, {withCredentials: true});
  }

  getUserTicket(ticket_uuid: string): Observable<Ticket>{
    const api_url = `${this.api_provider}my-tickets/ticketdetail/${ticket_uuid}`;

    return this.http.get<Ticket>(api_url, {withCredentials: true});
  }

  deleteUserTicket(ticket_uuid: string){
    const api_url = `${this.api_provider}delete/${ticket_uuid}`;

    return this.http.delete(api_url, {withCredentials: true});
  }

  getUserInfo(): Observable<UserData>{
    const api_url = `${this.api_provider}authentication/userdetails/`;

    return this.http.get<UserData>(api_url, {withCredentials: true});
  }

  refreshToken() {
    const api_url = `${this.api_provider}token/refresh/`;
    
    return this.http.post(api_url, {}, { withCredentials: true });
  }

  logout() {
    const api_url = `${this.api_provider}authentication/logout/`;

    return this.http.post(api_url, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.removeUserFromStorage();
        })
      );
  }

  verifyEmail(key: string) {
    const api_url = `${this.api_provider}registration/verify-email/`;

    return this.http.post(api_url, { key: key });
  }

  // saber el valor actual del usuario sin suscribirse
  public get currentUserValue(): UserData | null {
    return this.currentUserSubject.value;
  }

  private saveUserToStorage(user: UserData) {
    localStorage.setItem('user_data', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private getUserFromStorage(): UserData | null {
    const data = localStorage.getItem('user_data');
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }
    return null;
  }

  private removeUserFromStorage() {
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
  }
}