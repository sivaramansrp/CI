import { catchError, map } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosExtraordinariosService } from '../../service/servicios-extraordinarios.service';
import { TramiteStore } from '@libs/shared/data-access-user/src/core/estados/tramite.store';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss'
})
export class PasoDosComponent {

  constructor(
    private readonly router: Router,
    private readonly tramiteStore: TramiteStore,
    private readonly serviciosExtraordinariosService: ServiciosExtraordinariosService
  ) { 
      // El constructor está intencionalmente vacío para la inyección de dependencias 
    }

  /**
  * Maneja el evento para obtener la firma y realiza acciones adicionales.
  * @param ev - La cadena de texto que representa la firma obtenida.
  */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      // Obtiene el número de trámite
      this.serviciosExtraordinariosService
        .obtenerTramite(19)
        .pipe(
          map((tramite) => {
            this.tramiteStore.establecerTramite(tramite.data, FIRMA);
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
