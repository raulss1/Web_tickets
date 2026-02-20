import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from '../../Services/Http/http-service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../Components/menu/menu';
import { HeaderComponent } from '../../Components/header/header';
import { UserData } from '../../Models/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, MenuComponent, HeaderComponent, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class PerfilPage implements OnInit {

  userData: UserData = { id: 0, first_name: '', last_name: '', email: '', username: '' } as any;
  isLoading: boolean = true;

  constructor(private http: HttpService, private cdr: ChangeDetectorRef){}

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(){
    this.http.getUserInfo().subscribe({
      next: (res) => {
        this.userData = res;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }
}
