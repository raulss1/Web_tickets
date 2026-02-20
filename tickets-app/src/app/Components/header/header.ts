import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from '../../Services/Http/http-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {

  userName: string = ''; 

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.currentUser$.subscribe(usuario => {
      if (usuario) {
        this.userName = usuario.username; // O usuario.name
      } else {
        this.userName = ''; // Si no hay usuario (logout)
      }
    });
  }

  logoPicture = "assets/img/Icono.png"
  profilePicture: string | null = null;

}
