import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../Services/Http/http-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmar-correo',
  imports: [CommonModule],
  templateUrl: './confirmar-correo.html',
  styleUrl: './confirmar-correo.css',
})
export class ConfirmarCorreoPage implements OnInit {
  mensaje = '';
  status: 'loading' | 'success' | 'error' = 'loading';

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');

    if (key) {
      // 2. Se la enviamos a Django para verificar
      this.http.verifyEmail(key).subscribe({
        next: (res) => {
          this.mensaje = '¡Correo confirmado con éxito! Redirigiendo...';
          this.status = 'success';
          setTimeout(() => this.router.navigate(['/dashboard']), 2000);
        },
        error: (err) => {
          this.mensaje = 'El enlace es inválido o ya ha expirado.';
          this.status = 'error';
          setTimeout(() => this.router.navigate(['/register']), 2000);
        }
      });
    }
    else {
      this.status = 'error';
      this.mensaje = 'No se ha encontrado ninguna clave de verificación en la URL.';
    }
  }
}
