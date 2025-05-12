import { catchError, map } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteStore } from '@libs/shared/data-access-user/src/core/estados/tramite.store';
@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent {
  constructor(
    private router: Router,
    private serviciosExtraordinariosServices: TramiteFolioService,
    private tramiteStore: TramiteStore
  ) {}

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
