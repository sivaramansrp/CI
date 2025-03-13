import { catchError, map } from 'rxjs';
import { TramiteFolioStore } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosExtraordinariosService } from '@ng-mf/data-access-user';

@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {

  constructor(
    private router: Router,
    private serviciosExtraordinariosServices: ServiciosExtraordinariosService,
    private tramiteStore: TramiteFolioStore
  ) { }

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
