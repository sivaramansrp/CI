import { Component, OnDestroy } from '@angular/core';
import { ReplaySubject, catchError, map, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteStore } from '@ng-mf/data-access-user';

/**
 * @component PasoTresComponent
 * @description Componente que representa el tercer paso dentro del flujo de un trámite.
 * Este componente gestiona la lógica y la interfaz de usuario correspondiente a este paso.
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
})
export class PasoTresComponent implements OnDestroy {
  /**
   * @property {number} tipoPersona
   * @description Representa el tipo de persona (física o moral).
   * Este valor se utiliza para determinar el flujo del trámite según el tipo de persona.
   */
  tipoPersona!: number;

  /**
   * @property {ReplaySubject<boolean>} destroyed$
   * @description Observable utilizado para manejar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * @constructor
   * @description Constructor que se utiliza para la inyección de dependencias.
   * @param {Router} router - Servicio de enrutamiento para navegar entre páginas.
   * @param {TramiteFolioService} serviciosExtraordinariosServices - Servicio para gestionar trámites.
   * @param {TramiteStore} tramiteStore - Store para gestionar el estado del trámite.
   */
  constructor(
    private router: Router,
    private serviciosExtraordinariosServices: TramiteFolioService,
    private tramiteStore: TramiteStore
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * @method obtenerTipoPersona
   * @description Establece el tipo de persona (física o moral).
   * @param {number} tipo - Tipo de persona.
   * @returns {void}
   */
  obtenerTipoPersona(tipo: number): void {
    this.tipoPersona = tipo;
  }

  /**
   * @method obtieneFirma
   * @description Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param {string} ev - La cadena de texto que representa la firma obtenida.
   * @returns {void}
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      // Obtiene el número de trámite
      this.serviciosExtraordinariosServices
        .obtenerTramite(19)
        .pipe(
          takeUntil(this.destroyed$), // Cancela la suscripción al destruir el componente.
          map((tramite) => {
            // Establece el trámite en el store y navega a la página de acuse.
            this.tramiteStore.establecerTramite(tramite.data, FIRMA);
            this.router.navigate(['pago/registro-solicitud/acuse']);
          }),
          catchError((_error) => {
            return _error; // Maneja errores en la solicitud.
          })
        )
        .subscribe();
    }
  }

  /**
   * @method ngOnDestroy
   * @description Método que se ejecuta al destruir el componente.
   * Libera los recursos utilizados por las suscripciones activas.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true); // Notifica la destrucción del componente.
    this.destroyed$.complete(); // Completa el observable para evitar fugas de memoria.
  }
}