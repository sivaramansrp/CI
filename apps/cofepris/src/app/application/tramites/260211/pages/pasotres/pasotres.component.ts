/* eslint-disable sort-imports */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/naming-convention */
 
import { catchError, map } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosPantallaService } from 'libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TramiteCofeprisStore } from '../../../../estados/tramite.store';
 
/**
 * Componente para gestionar el paso tres del proceso de trámite.
 *
 * Este componente maneja la obtención de la firma del usuario
 * y posteriormente redirige a la pantalla de acuse si la firma es válida.
 */
@Component({
  selector: 'app-pasotres',
  templateUrl: './pasotres.component.html',
})
export class PasotresComponent {
  /**
   * Constructor del componente.
   *
   * @param router - Servicio de enrutamiento para la navegación.
   * @param serviciosExtraordinariosServices - Servicio para manejar trámites extraordinarios.
   * @param TramiteCofeprisStore - Store para gestionar el estado del trámite.
   */
  constructor(
    private router: Router,
    private serviciosExtraordinariosServices: ServiciosPantallaService,
    private TramiteCofeprisStore: TramiteCofeprisStore
  ) {
    // Constructor
  }
 
  /**
   * Maneja el evento para obtener la firma del usuario.
   * Si la firma es válida, obtiene el trámite correspondiente
   * y redirige a la pantalla de acuse.
   *
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const firma: string = ev;
 
    if (firma) {
      // Obtiene el número de trámite y establece el trámite en el store
      this.serviciosExtraordinariosServices
        .obtenerTramite(19)
        .pipe(
          map((tramite) => {
            this.TramiteCofeprisStore.establecerTramite(tramite.data, firma);
            // Redirige a la pantalla de acuse
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
 