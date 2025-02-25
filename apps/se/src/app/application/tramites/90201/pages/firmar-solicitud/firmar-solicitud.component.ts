/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TramiteStore } from 'apps/aga/src/app/application/estados/tramite.store';
import { ExpansionDeProductoresService } from 'libs/shared/data-access-user/src/core/services/90201/expansion-de-productores.service';
import { firmar, solicitud } from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-firmar-solicitud',
  templateUrl: './firmar-solicitud.component.html',
})
export class FirmarSolicitudComponent {


  public TEXTOS = firmar;
  public TEXTOS2 = solicitud;
   /**
   * Constructor del componente.
   * @param router - El enrutador.
   * @param serviciosExtraordinariosServices - Los servicios extraordinarios.
   * @param tramiteStore - El almacén de trámites.
   */
   constructor(
    private router: Router,
    private _expansionDesvc: ExpansionDeProductoresService,
    private tramiteStore: TramiteStore
  ) {
    // Constructor
  }

  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const firma: string = ev;
    if (firma) {
      // Obtiene el número de trámite
      this._expansionDesvc
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
