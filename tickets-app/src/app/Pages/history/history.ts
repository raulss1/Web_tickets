import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from '../../Services/Http/http-service';
import { Ticket } from '../../Models/interfaces';
import { CommonModule } from '@angular/common';
import { immediateProvider } from 'rxjs/internal/scheduler/immediateProvider';
import { MenuComponent } from '../../Components/menu/menu';
import { HeaderComponent } from '../../Components/header/header';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-history',
  imports: [CommonModule, MenuComponent, HeaderComponent, RouterLink],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class HistoryPage implements OnInit{

    tickets: Ticket[] = [];
    isLoading: boolean = true;

    constructor(private http: HttpService, private cdr: ChangeDetectorRef){}

    ngOnInit() {
      this.getUserTickets();
    }

    getUserTickets(){
      this.http.getAllUserTickets().subscribe({
        next: (res: any) => {
          this.tickets = res;
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
