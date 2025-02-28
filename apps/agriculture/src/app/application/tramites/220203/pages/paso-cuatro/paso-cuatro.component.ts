import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { ServiciosExtraordinariosService } from '@ng-mf/data-access-user';
@Component({
  selector: 'app-paso-cuatro',
  templateUrl: './paso-cuatro.component.html',
  styleUrls: ['./paso-cuatro.component.scss']  // Fixed typo from styleUrl to styleUrls
})
export class PasoCuatroComponent {
  constructor(
    private readonly router: Router,
    private readonly serviciosExtraordinariosServices: ServiciosExtraordinariosService
  ) {
    console.log('PASO CUATRO COMPONENT');
  }
  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      // Obtiene el número de trámite
      this.serviciosExtraordinariosServices
        .obtenerTramite(19)
        .pipe(
          map(() => {
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
