import { Component, ViewChild } from '@angular/core';
import {
  Solicitud110203State,
  Tramite110203Store,
} from '../../../../estados/tramites/tramite110203.store';
import { Subject, takeUntil } from 'rxjs';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { OCTA_TEMPO } from '@libs/shared/data-access-user/src/core/services/130102/octava-temporal.enum';
import { Tramite110203Query } from '../../../../estados/queries/tramite110203.query';
import { WizardComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
})
export class TecnicosComponent {
  /**
   * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = OCTA_TEMPO;

  /**
   * @property {number} indice - El índice actual del paso.
   */
  indice: number = 1;
  /**
   * Referencia al componente hijo `WizardComponent`.
   *
   * Usando el decorador `@ViewChild`, Angular inyecta una instancia del componente
   * `WizardComponent` presente en la plantilla.
   * Esto permite controlar su ciclo de vida, invocar métodos públicos
   * y acceder a sus propiedades directamente desde el componente padre.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Estado de la solicitud 110203.
   *
   * Este objeto contiene toda la información necesaria para representar el estado
   * de una solicitud: identificador, estado actual, metadatos y cualquier dato
   * adicional requerido por la lógica de negocio.
   *
   * Propiedades comunes del tipo `Solicitud110203State` (ejemplo):
   * - `id: string` — Identificador único de la solicitud.
   * - `estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA'` — Estado actual.
   * - `datos: Record<string, any>` — Objeto con los datos específicos de la solicitud.
   */
  solicitudState!: Solicitud110203State;

  /**
   * Objeto que contiene la información de los pasos del asistente (wizard).
   *
   * Este objeto define la configuración de la navegación paso a paso dentro del flujo.
   * Se utiliza para controlar el número total de pasos, el índice actual
   * y los textos de los botones de navegación.
   *
   * @type {DatosPasos}
   * @public
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;

  /**
   * Constructor del componente.
   *
   * Inyecta las dependencias necesarias para gestionar el estado y las consultas
   * relacionadas con el trámite **110203**.
   * Además, establece una suscripción al observable `selectSolicitud$`
   * para mantener actualizada la propiedad `solicitudState` en función de los
   * cambios del estado en el store.
   *
   * @param {Tramite110203Query} tramite110203Query - Servicio de consulta (Query) que expone los observables
   *                                                  relacionados con el estado del trámite.
   * @param {Tramite110203Store} tramite110203Store - Servicio de almacenamiento (Store) encargado de gestionar
   *                                                  el estado global del trámite.
   */
  constructor(
    private tramite110203Query: Tramite110203Query,
    private tramite110203Store: Tramite110203Store
  ) {
    this.tramite110203Query.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });
  }

  /**
   * Actualiza la propiedad `indice` según el valor del objeto `AccionBoton` proporcionado.
   * Si la propiedad `valor` de `AccionBoton` está entre 1 y 4 (inclusive), establece `indice` en `valor`.
   * Dependiendo de la propiedad `accion` de `AccionBoton`, mueve el componente del asistente hacia adelante o hacia atrás.
   *
   * @param {AccionBoton} e - El objeto del botón de acción que contiene las propiedades `valor` y `accion`.
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}