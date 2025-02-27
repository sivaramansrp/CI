import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosExtraordinariosService } from 'libs/shared/data-access-user/src/core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-paso-cuatro',
  templateUrl: './paso-cuatro.component.html',
  styleUrl: './paso-cuatro.component.scss'
})
export class PasoCuatroComponent {
  constructor(
    private readonly router: Router,
    private readonly serviciosExtraordinariosServices: ServiciosExtraordinariosService,
  ) { }

  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const firma: string = ev;
    if (firma) {
      // Obtiene el número de trámite
      this.serviciosExtraordinariosServices
        .obtenerTramite(19)
        .pipe(
          map((tramite) => {

            this.router.navigate(['servicios-extraordinarios/acuse']);
          }),
          catchError((_error) => {
            return _error;
          })
        )
        .subscribe();
    }
  }
}
