import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ID_PROCEDIMIENTO } from '../../../constants/exporticon-estupefacientes.enum';
import { PagoDeDerechosComponent } from '../../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../../shared/models/terceros-relacionados.model';
import { Tramite260302Store } from '../../../estados/tramite260302Store.store';

/**
 * @component PagoDeDerechosContenedoraComponent
 * @description Componente contenedor que utiliza el componente `PagoDeDerechosComponent`
 * para gestionar la funcionalidad relacionada con el pago de derechos.
 * Este componente interactúa con el estado del trámite a través del store `Tramite260302Store`.
 */
@Component({
  selector: 'app-pago-de-derechos-contenedora',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-de-derechos-contenedora.component.html',
  styleUrl: './pago-de-derechos-contenedora.component.scss',
})
export class PagoDeDerechosContenedoraComponent implements OnDestroy {

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Observable privado utilizado para notificar la destrucción del componente.
   * Se utiliza con el operador `takeUntil` para cancelar automáticamente las suscripciones 
   * activas cuando el componente es destruido, evitando así fugas de memoria.
   * @private
   * @readonly
   */
  private destroyNotifier$: Subject<void> = new Subject<void>();

  /**
   * @property {boolean} esFormularioSoloLectura
   * @description Propiedad booleana que indica si el formulario está en modo de solo lectura.
   * Cuando es `true`, el formulario no permite modificaciones por parte del usuario.
   * Su valor se determina basándose en el estado de la consulta y el ID del procedimiento.
   * @type {boolean}
   * @public
   */
  esFormularioSoloLectura!: boolean;

  /**
   * @property {PagoDerechosFormState} pagoDerechos
   * @description Estado actual del formulario de pago de derechos, obtenido del store del trámite.
   * Contiene toda la información relacionada con los datos del pago de derechos,
   * incluyendo formularios, validaciones y estados de los campos.
   * @type {PagoDerechosFormState}
   * @public
   */
  public pagoDerechos: PagoDerechosFormState;

  /**
   * @property {string} idProcedimiento
   * @description Identificador único del procedimiento asociado al trámite.
   * Es una propiedad de solo lectura que obtiene su valor de la constante ID_PROCEDIMIENTO.
   * Se utiliza para identificar el tipo específico de trámite que se está procesando.
   * @type {string}
   * @readonly
   * @public
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;
    
  /**
   * @constructor
   * @description Constructor del componente que inicializa las dependencias necesarias.
   * Inyecta el store `Tramite260302Store` para gestionar el estado del trámite y
   * `ConsultaioQuery` para obtener información sobre el estado del formulario.
   * 
   * Durante la inicialización:
   * - Obtiene el estado actual del pago de derechos desde el store
   * - Se suscribe a los cambios del estado de consulta para determinar el modo de solo lectura
   * - Configura la gestión automática de suscripciones para evitar fugas de memoria
   * 
   * @param {Tramite260302Store} tramiteStore - Store que administra el estado del trámite 260302,
   *                                          proporciona acceso a los datos y métodos de actualización
   * @param {ConsultaioQuery} consultaQuery - Servicio de consulta que proporciona el estado general 
   *                                        del formulario, incluyendo información sobre permisos de edición
   */
  constructor(
    public tramiteStore: Tramite260302Store,
    private consultaQuery: ConsultaioQuery
  ) {
    // Inicializa el estado del pago de derechos con el valor actual del store
    this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
    
    // Suscripción para monitorear cambios en el estado de consulta
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((seccionState) => {
        // Determina si el formulario debe estar en modo solo lectura
        if (!seccionState.create && seccionState.procedureId === '260302') {
          this.esFormularioSoloLectura = seccionState.readonly;
        }
      });
  }
  

  /**
   * @method updatePagoDerechos
   * @description Método público que actualiza los datos del formulario de pago de derechos en el store del trámite.
   * Este método actúa como un puente entre el componente hijo `PagoDeDerechosComponent` y el store,
   * permitiendo que los cambios realizados en el formulario se reflejen en el estado global de la aplicación.
   * 
   * Funcionalidad:
   * - Recibe los datos actualizados del formulario de pago de derechos
   * - Delega la actualización al método correspondiente del store
   * - Mantiene la sincronización entre el componente y el estado global
   * 
   * @param {PagoDerechosFormState} event - Estado actualizado del formulario de pago de derechos
   *                                      que contiene todos los campos y validaciones del formulario
   * @returns {void} Este método no retorna ningún valor, solo actualiza el estado
   * @public
   */
  updatePagoDerechos(event: PagoDerechosFormState): void {
    this.tramiteStore.updatePagoDerechos(event);
  }

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta automáticamente cuando el componente
   * está a punto de ser destruido. Implementa la interfaz `OnDestroy` para realizar tareas de limpieza.
   * 
   * Funcionalidad de limpieza:
   * - Emite un valor a través del observable `destroyNotifier$` para notificar a todas las suscripciones
   *   activas que el componente está siendo destruido
   * - Completa el observable `destroyNotifier$` para liberar todos los recursos asociados
   * - Previene fugas de memoria al cancelar automáticamente todas las suscripciones que utilizan
   *   el operador `takeUntil(this.destroyNotifier$)`
   * 
   * Esta implementación sigue las mejores prácticas de Angular para la gestión de memoria
   * y el manejo del ciclo de vida de los componentes.
   * 
   * @returns {void} No retorna ningún valor
   * @public
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
