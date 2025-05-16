import { Component,OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { Subject,catchError,map,takeUntil } from 'rxjs';

import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';

import { TramiteCofeprisStore } from '../../../../estados/tramite.store';

/**
 * @component PasoTresComponent
 * @description Componente correspondiente al tercer paso del flujo de solicitud.
 * Permite obtener la firma electrónica del usuario y redirigir a la pantalla de acuse.
 */

@Component({
  selector: 'app-paso-tres', // Selector utilizado para identificar el componente en el DOM.
  templateUrl: './paso-tres.component.html', // Ruta del archivo de plantilla HTML del componente.
  styleUrls: ['./paso-tres.component.scss'], // Ruta del archivo de estilos SCSS del componente.
})
/**
 * @class PasoTresComponent
 * @description Componente que representa el tercer paso del proceso de solicitud.
 * Permite obtener la firma electrónica del usuario y redirigir a la pantalla de acuse.
 */
export class PasoTresComponent implements OnDestroy {
  /**
   * property {Subject<void>} destroyed$
   * description Sujeto utilizado para manejar la destrucción de observables.
   * private
   */
  private destroyed$ = new Subject<void>();
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
    const FIRMA: string = ev;

    if (FIRMA) {
      // Obtiene el número de trámite y establece el trámite en el store
      this.serviciosExtraordinariosServices
        .obtenerTramite(19)
        .pipe(
          map((tramite) => {
            this.TramiteCofeprisStore.establecerTramite(tramite.data, FIRMA);
            // Redirige a la pantalla de acuse
            this.router.navigate(['servicios-extraordinarios/acuse']);
          }),
          catchError((_error) => {
            return _error;
          }),
          takeUntil(this.destroyed$)
        )
        .subscribe();
    }
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
