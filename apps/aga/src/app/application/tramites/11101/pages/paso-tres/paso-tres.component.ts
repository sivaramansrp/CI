import { catchError, map } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteFolioStore } from '@ng-mf/data-access-user';

/**
 * Componente para gestionar el paso tres del trámite.
 * Este componente se encarga de manejar la obtención de la firma y la navegación posterior.
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  /**
   * Constructor de la clase. Inyecta los servicios necesarios.
   * @param {Router} router - Servicio para manejar la navegación entre rutas.
   * @param {TramiteFolioService} tramiteFolioServices - Servicio para obtener información del trámite.
   * @param {TramiteFolioStore} tramiteStore - Almacén para gestionar el estado del trámite.
   */
  constructor(
    private router: Router,
    private tramiteFolioServices: TramiteFolioService,
    private tramiteStore: TramiteFolioStore
  ) {}

  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * 
   * Este método realiza las siguientes acciones:
   * - Obtiene el número de trámite utilizando el servicio `TramiteFolioService`.
   * - Establece el trámite en el almacén `TramiteFolioStore` junto con la firma obtenida.
   * - Navega a la página de acuse (`servicios-extraordinarios/acuse`).
   * 
   * @param {string} ev - La cadena de texto que representa la firma obtenida.
   * @returns {void}
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      // Obtiene el número de trámite
      this.tramiteFolioServices
        .obtenerTramite(19)
        .pipe(
          map((tramite) => {
            // Establece el trámite en el almacén con la firma
            this.tramiteStore.establecerTramite(tramite.data, FIRMA);
            // Navega a la página de acuse
            this.router.navigate(['servicios-extraordinarios/acuse']);
          }),
          catchError((_error) => {
            // Manejo de errores
            return _error;
          })
        )
        .subscribe();
    }
  }
}