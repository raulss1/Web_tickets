import { Component, input } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header';
import { MenuComponent } from '../../Components/menu/menu';
import { HttpService } from '../../Services/Http/http-service';
import { Ticket } from '../../Models/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-extract',
  imports: [HeaderComponent, MenuComponent, CommonModule],
  templateUrl: './ticket-extract.html',
  styleUrl: './ticket-extract.css',
})
export class TicketExtractPage {

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isLoading: boolean = false;
  ticketResult: Ticket | null = null;

  constructor(private http: HttpService) {}

  // 1. Maneja la selección del archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Creamos un lector para mostrar la previsualización
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadTicket(){
    if (!this.selectedFile) return;

    this.isLoading = true;

    this.http.getTicketInfo(this.selectedFile).subscribe({
      next: (res) => {
        this.ticketResult = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error subiendo ticket:', err);
        alert('Hubo un error al procesar el ticket. Inténtalo de nuevo.');
        this.isLoading = false;
      }
    })
  }

  resetForm() {
    this.selectedFile = null;
    this.imagePreview = null;
    this.ticketResult = null;
  }

}
