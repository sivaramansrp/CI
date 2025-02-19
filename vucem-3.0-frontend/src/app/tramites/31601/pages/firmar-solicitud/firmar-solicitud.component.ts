import { catchError, map } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { TramiteStore } from '../../../../estados/tramite.store';
import { ServiciosPantallaService } from '../../../../core/services/31601/servicios-pantalla.service';

/**
 * Componente para firmar la solicitud.
 */
@Component({
  selector: 'app-firmar-solicitud',
  templateUrl: './firmar-solicitud.component.html',
})
export class FirmarSolicitudComponent {
  /**
   * Constructor del componente.
   * @param router - El enrutador.
   * @param serviciosExtraordinariosServices - Los servicios extraordinarios.
   * @param tramiteStore - El almacén de trámites.
   */
  constructor(
    private router: Router,
    private serviciosExtraordinariosServices: ServiciosPantallaService,
    private tramiteStore: TramiteStore
  ) {
    // Constructor
  }

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
            this.tramiteStore.establecerTramite(tramite.data, firma);
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
