import { Component, OnDestroy } from '@angular/core';
import { Subject, catchError, map, takeUntil} from 'rxjs';
import { Router } from '@angular/router';

import { TramiteCofeprisStore } from '../../../../estados/tramite.store';
import { TramiteFolioService } from '@ng-mf/data-access-user';

/**
 * Componente para gestionar el paso tres del trámite.
 */
@Component({
  selector: 'app-firmar-solicitud',
  templateUrl: './firmar-solicitud.component.html',
  styles: ``,
})
export class FirmarSolicitudComponent implements OnDestroy {

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * 
   * @param router Servicio de enrutamiento.
   * @param serviciosExtraordinariosServices Servicio para gestionar los servicios extraordinarios.
   * @param tramiteCofeprisStore Almacén para gestionar el estado del trámite.
   */
  constructor(
    private router: Router,
    private tramiteFolioService: TramiteFolioService,
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
      this.tramiteFolioService
        .obtenerTramite(19)
        .pipe(
          map((tramite) => {
            this.tramiteCofeprisStore.establecerTramite(tramite.data, FIRMA);
            this.router.navigate(['servicios-extraordinarios/acuse']);
          }),
          catchError((_error) => {
            return _error;
          }),
          takeUntil(this.destruirNotificador$)
        )
        .subscribe();
    }
  }

  /**
   * Se ejecuta al destruir el componente.
   * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}
