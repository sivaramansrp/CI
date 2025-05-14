import { Component, OnDestroy } from '@angular/core';
import { Subject, catchError, map, takeUntil } from 'rxjs';
import { ImportacionesAgropecuariasService } from '../../services/importaciones-agropecuarias.service';
import { Router } from '@angular/router';
import { TramiteFolioStore } from '@libs/shared/data-access-user/src';

/**
 * @component PasoTresComponent
 * @description
 * Componente encargado de gestionar el tercer paso del trámite 130107.
 * Este paso incluye la lógica para manejar la firma del usuario, obtener el trámite correspondiente
 * y redirigir a la pantalla de acuse.
 * 
 * @selector app-paso-tres
 * @templateUrl ./paso-tres.component.html
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
})
export class PasoTresComponent implements OnDestroy {
  /**
   * @property destroyed$
   * @description
   * Sujeto utilizado para manejar la destrucción de observables y evitar fugas de memoria.
   * 
   * @type {Subject<void>}
   * @private
   */
  private destroyed$ = new Subject<void>();

  /**
   * @constructor
   * @description
   * Constructor del componente que inyecta los servicios necesarios para manejar la lógica del tercer paso.
   * 
   * @param router Servicio de enrutamiento para la navegación.
   * @param importacionesSvc Servicio para manejar las operaciones relacionadas con las importaciones agropecuarias.
   * @param tramiteStore Store para gestionar el estado del trámite.
   */
  constructor(
    private router: Router,
    private importacionesSvc: ImportacionesAgropecuariasService,
    private tramiteStore: TramiteFolioStore
  ) {}

  /**
   * @method obtieneFirma
   * @description
   * Maneja el evento para obtener la firma del usuario. Si la firma es válida, obtiene el trámite correspondiente
   * desde el servicio, lo establece en el store y redirige a la pantalla de acuse.
   * 
   * @param ev La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;

    if (FIRMA) {
      // Obtiene el número de trámite y establece el trámite en el store
      this.importacionesSvc
        .obtenerTramite(19)
        .pipe(
          map((tramite) => {
            this.tramiteStore.establecerTramite(tramite.data, FIRMA);
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
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable `destroyed$` para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
