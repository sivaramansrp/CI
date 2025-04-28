import { Component, Inject, OnDestroy } from '@angular/core';
import { Subject, catchError, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { Router } from '@angular/router';
import { TramiteAgriState } from '../../../../estados/tramites/tramite220503.store';
import { TramiteFolioService } from '@libs/shared/data-access-user/src';
@Component({
  selector: 'app-paso-tres',
  standalone: true,
  imports: [CommonModule, FirmaElectronicaComponent],
  templateUrl: './PasoTres.component.html',
})
export class PasoTresComponent implements OnDestroy {
  /**
   * Tipo de persona, puede ser un valor numérico que se asigna según la acción.
   */
  tipoPersona!: number;
  private destroy$: Subject<void> = new Subject<void>(); // Sujeto para manejar el ciclo de vida del componente y evitar fugas de memoria

  /**
   * Constructor que inyecta los servicios necesarios para el funcionamiento del componente.
   * @param router Servicio de enrutamiento para navegar entre rutas.
   * @param serviciosExtraordinariosServices Servicio para obtener información del trámite.
   * @param tramiteStore Almacén de estado del trámite para gestionar los datos del trámite.
   */
  constructor(
    private router: Router,
    private serviciosExtraordinariosServices: TramiteFolioService,
    @Inject(TramiteAgriState) private tramiteStore: TramiteAgriState
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que obtiene el tipo de persona y lo asigna a la propiedad 'tipoPersona'.
   * @param tipo Tipo de persona que se obtiene como parámetro.
   */
  obtenerTipoPersona(tipo: number): void {
    this.tipoPersona = tipo; // Asigna el tipo de persona al campo correspondiente
  }

  /**
   * Método que maneja el evento de obtener la firma electrónica y realiza acciones adicionales.
   * @param ev La cadena de texto que representa la firma obtenida desde el componente de firma electrónica.
   */
  obtieneFirma(ev: string): void {
    /**
     * Se asigna la firma obtenida a la constante `FIRMA`.
     */
    const FIRMA: string = ev;

    if (FIRMA) {
      // Si se obtiene una firma válida
      /**
       * Llamada al servicio para obtener los datos del trámite correspondiente.
       */
      this.serviciosExtraordinariosServices
        .obtenerTramite(19)
        .pipe(
          /**
           * Mapea la respuesta del servicio y realiza acciones con los datos del trámite.
           */
          map((tramite) => {
            /**
             * Guarda el trámite en el store junto con la firma obtenida.
             */
            this.tramiteStore.establecerTramite(tramite.data, FIRMA);

            /**
             * Redirecciona al usuario a la página de acuse de recibo.
             */
            this.router.navigate(['servicios-extraordinarios/acuse']);
          }),

          /**
           * Manejo de errores en caso de que falle la obtención del trámite.
           */
          catchError((_error) => {
            return _error;
          }),

          /**
           * Se asegura de que la suscripción se complete cuando el componente se destruya,
           * evitando posibles fugas de memoria.
           */
          takeUntil(this.destroy$)
        )
        .subscribe(); // Inicia la suscripción
    }
  }

  /**
   * Método de ciclo de vida para limpiar los recursos cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    /**
     * Emite una señal de destrucción para notificar a los observadores que el flujo está finalizando.
     * Esto ayuda a cerrar correctamente cualquier suscripción activa.
     */
    this.destroy$.next();

    /**
     * Completa el flujo del `Subject`, asegurando que no se envíen más valores
     * y evitando posibles fugas de memoria.
     */
    this.destroy$.complete();
  }
}
