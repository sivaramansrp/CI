import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TramiteAgaceStore } from '../../../../estados/tramite.store';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { catchError } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente PasoTresComponent.
 *
 * Este componente se encarga de manejar la lógica del paso tres en el flujo de trámites.
 *
 * Propiedades:
 * - `tipoPersona`: Número que representa el tipo de persona.
 *
 * Métodos:
 * - `obtenerTipoPersona(tipo: number)`: Método para establecer el tipo de persona.
 * - `obtieneFirma(ev: string)`: Método que maneja el evento de obtención de firma y realiza acciones adicionales como
 *   la navegación y el establecimiento del trámite en el almacén.
 * - `ngOnDestroy()`: Método del ciclo de vida de Angular que se ejecuta al destruir el componente, utilizado para
 *   completar el Subject `destroy$` y evitar fugas de memoria.
 *
 * Constructor:
 * - Inyecta las dependencias necesarias como el enrutador, el servicio de trámites y el almacén de trámites.
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.css',
})
/**
 * Componente PasoTresComponent.
 *
 * Este componente se encarga de manejar la lógica del paso tres en el flujo de trámites.
 */
export class PasoTresComponent implements OnDestroy {
  /**
   * Tipo de persona.
   */
  tipoPersona!: number;
  
  /**
   * Observable para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param router Servicio de enrutamiento.
   * @param serviciosExtraordinariosServices Servicio de servicios extraordinarios.
   * @param tramiteStore Almacén de trámites.
   */
  constructor(
    private router: Router,
    private serviciosExtraordinariosServices: TramiteFolioService,
    @Inject(TramiteAgaceStore) private tramiteStore: TramiteAgaceStore
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene el tipo de persona.
   * @param tipo Tipo de persona.
   */
  obtenerTipoPersona(tipo: number): void {
    this.tipoPersona = tipo;
  }

  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.serviciosExtraordinariosServices
        .obtenerTramite(19)
        .pipe(
          map((tramite) => {
            this.tramiteStore.establecerTramite(tramite.data, FIRMA);
            this.router.navigate(['servicios-extraordinarios/acuse']);
          }),
          catchError((_error) => {
            return _error;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Aquí se utiliza para emitir un valor a `destroy$` y completar el observable,
   * asegurando la limpieza de suscripciones y evitando fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
