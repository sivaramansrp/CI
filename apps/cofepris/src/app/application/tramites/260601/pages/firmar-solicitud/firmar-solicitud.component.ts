import { catchError, map } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ServiciosExtraordinariosService } from '@ng-mf/data-access-user';
import { TramiteCofeprisStore } from '../../../../estados/tramite.store';

/**
 * Componente para gestionar el paso tres del trámite.
 */
@Component({
  selector: 'app-firmar-solicitud',
  templateUrl: './firmar-solicitud.component.html',
  styles: ``,
})
export class FirmarSolicitudComponent {
  /**
   * Constructor del componente.
   * 
   * @param router Servicio de enrutamiento.
   * @param serviciosExtraordinariosServices Servicio para gestionar los servicios extraordinarios.
   * @param tramiteCofeprisStore Almacén para gestionar el estado del trámite.
   */
  constructor(
    private router: Router,
    private serviciosExtraordinariosServices: ServiciosExtraordinariosService,
    private tramiteCofeprisStore: TramiteCofeprisStore
  ) {
    // El constructor se utiliza para la inyección de dependencias.
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
            this.tramiteCofeprisStore.establecerTramite(tramite.data, FIRMA);
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
