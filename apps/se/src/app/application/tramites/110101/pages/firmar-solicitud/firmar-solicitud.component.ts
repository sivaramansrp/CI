/* eslint-disable @nx/enforce-module-boundaries */
import { catchError, map } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosPantallaService } from 'libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TramiteStore } from '../../../../estados/tramite.store';

@Component({
  selector: 'app-firmar-solicitud',
  templateUrl: './firmar-solicitud.component.html',
})
export class FirmarSolicitudComponent {

/**
   * Constructor del componente.
   * @param router - El enrutador.
   * @param serviciosExtraordinariosServices - Los servicios extraordinarios.
   * @param TramiteAgaceStore - El almacén de trámites.
   */
constructor(
  private router: Router,
  private serviciosExtraordinariosServices: ServiciosPantallaService,
  private TramiteAgaceStore: TramiteStore
) {
  // Constructor
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
        map((tramite) => {
          this.TramiteAgaceStore.establecerTramite(tramite.data, FIRMA);
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
