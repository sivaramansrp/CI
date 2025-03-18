/* eslint-disable sort-imports */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/naming-convention */
import { catchError, map } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ServiciosPantallaService } from 'libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TramiteCofeprisStore } from '../../../../estados/tramite.store';



@Component({
  selector: 'app-pasotres',
  templateUrl: './pasotres.component.html',
})
export class PasotresComponent {
  /**
   * Constructor del componente.
   * @param router - El enrutador.
   * @param serviciosExtraordinariosServices - Los servicios extraordinarios.
   * @param TramiteCofeprisStore - El almacén de trámites.
   */
  constructor(
    private router: Router,
    private serviciosExtraordinariosServices: ServiciosPantallaService,
    private TramiteCofeprisStore: TramiteCofeprisStore
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
            this.TramiteCofeprisStore.establecerTramite(tramite.data, firma);
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
