import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from '../../Services/Http/http-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Ticket } from '../../Models/interfaces';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Components/header/header';
import { MenuComponent } from '../../Components/menu/menu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-num',
  imports: [CommonModule, HeaderComponent, MenuComponent],
  templateUrl: './ticket-num.html',
  styleUrl: './ticket-num.css',
})
export class TicketNumPage implements OnInit {

  ticketResult: Ticket | null = null;
  isLoading: boolean = true;
  id: string = ''

  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router,private cdr: ChangeDetectorRef){}

  ngOnInit() {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.getUserTicket(this.id);
  }

  getUserTicket(id: string){
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

  deleteTicket(){
    Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // AQUÍ es donde llamas a tu servicio
      this.http.deleteUserTicket(this.id).subscribe({
        next: () => {
          this.ticketResult = null; // Borra la tarjeta de la vista
          Swal.fire('¡Eliminado!', 'El ticket ha sido borrado.', 'success');
          this.router.navigate(["/history/"])
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudo eliminar el ticket', err);
        }
      });
    }
  });
  }
}
