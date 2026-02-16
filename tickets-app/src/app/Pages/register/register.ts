import { Component } from '@angular/core';
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

  email = ''
  username = ''
  password1 = ''
  password2 = ''
  name = ''
  lastname = ''

  constructor(private http: HttpService, private router: Router){}

  onRegister(){
    this.http.register(this.username, this.password1, this.password2, this.email, this.name, this.lastname).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        alert(err);
      }
    })
  }
}
