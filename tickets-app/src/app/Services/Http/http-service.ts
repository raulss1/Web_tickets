import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Ticket, UserData } from '../../Models/interfaces';

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
  
  // Asegúrate de que esta URL base termine en /
  private api_provider = "http://127.0.0.1:8000/api/";

  // Inicializamos el estado leyendo del localStorage
  private currentUserSubject = new BehaviorSubject<UserData | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(private http: HttpClient){}

  // --- REGISTRO ---
  register(username:string, password1:string, password2:string, email:string, name:string, lastname:string): Observable<LoginResponse>{
      const api_url = `${this.api_provider}registration/`; // Template literals son más limpios
      const body = {
        username, 
        password1, 
        password2, 
        email, 
        first_name: name, // Django suele usar first_name/last_name por defecto
        last_name: lastname
      };

      // Importante: withCredentials para que si el registro loguea automáticamente, guarde la cookie
      return this.http.post<LoginResponse>(api_url, body, { withCredentials: true })
        .pipe(
          tap((response) => {
            if (response.user){
              this.saveUserToStorage(response.user)
            }
          })
        )
  }

  // --- LOGIN (CORREGIDO) ---
  login(username:string, password:string): Observable<LoginResponse>{
    const api_url = `${this.api_provider}authentication/login/`;
    const body = { username, password };

    // Usamos .pipe(tap(...))
    // Esto significa: "Haz la petición y SI sale bien, ejecuta este código antes de devolver los datos al componente"
    return this.http.post<LoginResponse>(api_url, body, { withCredentials: true })
      .pipe(
        tap((response) => {
          // Aquí capturamos al usuario REAL que viene del backend
          if (response.user) {
            this.saveUserToStorage(response.user);
          }
        })
      );
  }

  // --- SUBIR TICKET (CORREGIDO) ---
  getTicketInfo(ticket: File): Observable<Ticket>{
    const api_url = `${this.api_provider}tickets/`;
    const formData = new FormData();
    
    formData.append('image', ticket);

    // CRUCIAL: withCredentials: true
    // Sin esto, Django no sabrá quién está subiendo la foto y dará error 401
    return this.http.post<Ticket>(api_url, formData, { withCredentials: true });
  }

  // --- REFRESH TOKEN (VERSIÓN COOKIES) ---
  refreshToken() {
    const api_url = `${this.api_provider}token/refresh/`;
    
    // No enviamos nada en el body ({}) ni pasamos argumentos.
    // La magia la hace 'withCredentials: true', que envía la cookie 'jwt-refresh-token'
    return this.http.post(api_url, {}, { withCredentials: true });
  }

  // --- LOGOUT ---
  logout() {
    // Corregido el typo "logut" -> "logout"
    const api_url = `${this.api_provider}authentication/logout/`;

    return this.http.post(api_url, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.removeUserFromStorage();
        })
      );
  }

  // --- GETTERS PÚBLICOS DEL ESTADO ---
  // Un helper útil para saber el valor actual sin suscribirse
  public get currentUserValue(): UserData | null {
    return this.currentUserSubject.value;
  }

  // --- MÉTODOS PRIVADOS DE ALMACENAMIENTO ---

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