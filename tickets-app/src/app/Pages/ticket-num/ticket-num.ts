import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from '../../Services/Http/http-service';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../../Models/interfaces';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Components/header/header';
import { MenuComponent } from '../../Components/menu/menu';

@Component({
  selector: 'app-ticket-num',
  imports: [CommonModule, HeaderComponent, MenuComponent],
  templateUrl: './ticket-num.html',
  styleUrl: './ticket-num.css',
})
export class TicketNumPage implements OnInit {

  ticketResult: Ticket | null = null;
  isLoading: boolean = true;

  constructor(private http: HttpService, private router: ActivatedRoute, private cdr: ChangeDetectorRef){}

  ngOnInit() {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.getUserTicket(id);
  }

  getUserTicket(id: number){
    this.http.getUserTicket(id).subscribe({
      next: (res) => {
          this.ticketResult = res;
          this.isLoading = false;
          this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false;
      }
    })
  }
}
