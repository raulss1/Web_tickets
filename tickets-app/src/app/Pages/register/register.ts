import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpService } from '../../Services/Http/http-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterPage {

  email = '';
  username = '';
  password1 = '';
  password2 = '';
  firstName = '';
  lastName = '';

  // 1. Variable para controlar qué pantalla se muestra
  registroExitoso: boolean = false; 
  isLoading: boolean = false; // Opcional, pero recomendado para deshabilitar el botón al enviar

  constructor(private http: HttpService, private router: Router, private cdr: ChangeDetectorRef){}

  onRegister(){
    this.isLoading = true; // Empieza la carga

    this.http.register(this.username, this.password1, this.password2, this.email, this.firstName, this.lastName).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.registroExitoso = true; 
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        alert(err); 
      }
    })
  }
}
