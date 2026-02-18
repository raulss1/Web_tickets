import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../Services/Http/http-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {

  userName: string = ''; 

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.httpService.currentUser$.subscribe(usuario => {
      if (usuario) {
        this.userName = usuario.username; // O usuario.name
      } else {
        this.userName = ''; // Si no hay usuario (logout)
      }
    });
  }

  logoPicture: string | null = null;
  profilePicture: string | null = null;

  goToHome(){
    this.router.navigate(['/dashboard'])
  }
}
