import { Component } from '@angular/core';
import { HttpService } from '../../Services/Http/http-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginPage {

  username = '';
  password = '';

  constructor(private http: HttpService, private router: Router) {}

  onLogin(){
    this.http.login(this.username, this.password).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        alert('Usuario o contraseña incorrectos');
      }
    })
  }
}
