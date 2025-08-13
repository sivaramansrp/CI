import { Component, OnDestroy } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ID_PROCEDIMIENTO } from '../../../constants/estupefacientes.enum';
import { PagoDeDerechosComponent } from '../../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../../shared/models/terceros-relacionados.model';
import { Tramite260301Store } from '../../../estados/tramite260301Store.store';

/**
 * @component PagoDeDerechosContenedoraComponent
 * @description Componente contenedor responsable de encapsular y gestionar la funcionalidad
 * relacionada con el pago de derechos en el trámite 260301. Actúa como intermediario entre
 * la vista y el componente reutilizable `PagoDeDerechosComponent`, proporcionando una capa
 * de abstracción que facilita la gestión del estado y la comunicación con el store del trámite.
 * 
 * Este componente implementa el patrón container/presentational, donde este actúa como el
 * contenedor que maneja la lógica de negocio y el estado, mientras que el componente hijo
 * se encarga únicamente de la presentación de la información.
 * 
 * 
 * @example
 * ```html
 * <app-pago-de-derechos-contenedora 
 *   [formularioDeshabilitado]="isDisabled">
 * </app-pago-de-derechos-contenedora>
 * ```
 */
@Component({
  selector: 'app-pago-de-derechos-contenedora',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-de-derechos-contenedora.component.html',
  styleUrl: './pago-de-derechos-contenedora.component.scss',
})
export class PagoDeDerechosContenedoraComponent implements OnDestroy{

  /**
       * @property {number} idProcedimiento
       * @description
       * Identificador del procedimiento actual.
       */
        idProcedimiento: number = ID_PROCEDIMIENTO;

        /**
   * @property {boolean} esFormularioSoloLectura
   * @description
   * Indica si el formulario está en modo solo lectura. Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * @property pagoDerechos
   * @description Propiedad pública que mantiene el estado actual del formulario de pago de derechos.
   * Esta propiedad actúa como una representación local del estado almacenado en el store del trámite,
   * facilitando el acceso y la manipulación de los datos relacionados con el pago de derechos.
   * 
   * El estado incluye información como montos, conceptos de pago, métodos de pago seleccionados,
   * y otros datos relevantes para el proceso de pago de derechos del trámite 260301.
   * 
   * @type {PagoDerechosFormState}
   * @memberof PagoDeDerechosContenedoraComponent
   * @readonly Esta propiedad se actualiza automáticamente a través del store
   * 
   * @see {@link PagoDerechosFormState} Para más detalles sobre la estructura del estado
   * @see {@link Tramite260301Store} Para información sobre el store que gestiona este estado
   */

  public pagoDerechos: PagoDerechosFormState;


  /**
   * @property {Subject<void>} destroyNotifier$
   * @description
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa para limpiar suscripciones cuando el componente es destruido.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @constructor
   * @description Constructor del componente que realiza la inyección de dependencias del store
   * del trámite 260301 y establece la configuración inicial del componente. Durante la 
   * inicialización, se obtiene el estado actual del pago de derechos desde el store y se
   * asigna a la propiedad local correspondiente para su uso en el template.
   * 
   * El constructor implementa el patrón de inyección de dependencias de Angular, donde el
   * store se declara como público para permitir su acceso desde el template si fuera necesario.
   * 
   * @param {Tramite260301Store} tramiteStore - Instancia del store que administra el estado 
   * global del trámite 260301. Este store centraliza toda la información relacionada con el
   * trámite, incluyendo los datos del pago de derechos, y proporciona métodos para actualizar
   * y consultar dicha información.
   * 
   * @memberof PagoDeDerechosContenedoraComponent
   * 
   * @throws {Error} Lanza una excepción si el store no puede ser inyectado correctamente
   * 
   * @example
   * ```typescript
   * // Angular se encarga automáticamente de la inyección
   * const component = new PagoDeDerechosContenedoraComponent(tramiteStore);
   * ```
   */
  constructor(
    public tramiteStore: Tramite260301Store,
    private consultaQuery: ConsultaioQuery,
    private cdr: ChangeDetectorRef

  ) {
    this.consultaQuery.selectConsultaioState$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.esFormularioSoloLectura = seccionState.readonly;
              this.cdr.detectChanges();
            })
          )
          .subscribe();
        this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
  }

  /**
   * @method updatePagoDerechos
   * @description Método público responsable de actualizar los datos del formulario de pago 
   * de derechos en el store centralizado del trámite. Este método actúa como un puente entre
   * el componente hijo (`PagoDeDerechosComponent`) y el store, propagando los cambios realizados
   * en el formulario hacia el estado global de la aplicación.
   * 
   * Cuando el usuario modifica cualquier campo del formulario de pago de derechos, este método
   * se ejecuta para sincronizar los cambios con el store, asegurando que el estado se mantenga
   * consistente a lo largo de toda la aplicación. La actualización es inmediata y se refleja
   * en todos los componentes que consumen este estado.
   * 
   * @param {PagoDerechosFormState} event - Objeto que contiene el estado actualizado del 
   * formulario de pago de derechos. Este parámetro incluye todos los campos modificados
   * del formulario, como montos, conceptos de pago, métodos de pago seleccionados, y
   * cualquier otra información relevante para el proceso de pago.
   * 
   * @returns {void} Este método no retorna ningún valor, ya que su única responsabilidad
   * es actualizar el estado en el store.
   * 
   * @memberof PagoDeDerechosContenedoraComponent
   * @public
   * 
   * @example
   * ```typescript
   * // Ejemplo de uso desde el template
   * onPagoDerechosChange(newState: PagoDerechosFormState) {
   *   this.updatePagoDerechos(newState);
   * }
   * ```
   * 
   * ```html
   * <!-- En el template del componente -->
   * <app-pago-de-derechos 
   *   [formState]="pagoDerechos"
   *   (stateChange)="updatePagoDerechos($event)">
   * </app-pago-de-derechos>
   * ```
   * 
   * @see {@link PagoDerechosFormState} Para detalles sobre la estructura del estado
   * @see {@link Tramite260301Store.updatePagoDerechos} Para información sobre el método del store
   */
  updatePagoDerechos(event: PagoDerechosFormState): void {
    this.tramiteStore.updatePagoDerechos(event);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
