import { catchError, map } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ServiciosExtraordinariosService } from '@ng-mf/data-access-user';
import { TramiteStore } from '../../../../estados/tramite.store';

/**
 * Componente para gestionar el paso tres del trámite.
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent {
  /**
   * Constructor del componente.
   * 
   * @param router Servicio de enrutamiento.
   * @param serviciosExtraordinariosServices Servicio para gestionar los servicios extraordinarios.
   * @param tramiteStore Almacén para gestionar el estado del trámite.
   */
  constructor(
    private router: Router,
    private serviciosExtraordinariosServices: ServiciosExtraordinariosService,
    private tramiteStore: TramiteStore
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
