import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ID_PROCEDIMIENTO } from '../../constants/agregar-destinatario.enum';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../shared/models/pago-de-derechos.model';
import { Tramite240112Query } from '../../estados/tramite240112Query.query';
import { Tramite240112Store } from '../../estados/tramite240112Store.store';


@Component({
  selector: 'app-pago-de-derechoc',
  templateUrl: './pago-de-derechoc.component.html',
  styleUrl: './pago-de-derechoc.component.scss',
  standalone: true,
  imports: [PagoDeDerechosComponent]
})
export class PagoDeDerechocComponent implements OnInit, OnDestroy {

  /**
   * @input
   * @description
   * Indica si el formulario debe estar deshabilitado. Cuando es `true`, los controles del formulario estarán inactivos y no permitirán la edición por parte del usuario.
   * @type {boolean}
   */
   @Input() formularioDeshabilitado: boolean = false;

   
  /**
     * @var {number} idProcedimiento
     * @description Identificador único del procedimiento asociado.
     * @access Público
     * @readonly
     * @since Versión 1.0.0
     */
    public readonly idProcedimiento = ID_PROCEDIMIENTO;
  
    /**
     * Estado actual del formulario de pago de derechos.
     * @property {PagoDerechosFormState} pagoDerechoFormState
     */
    public pagoDerechoFormState!: PagoDerechosFormState;
  
    /**
     * Observable adicional para limpieza de suscripciones.
     * @property {Subject<void>} destroy$
     */
    private destroy$ = new Subject<void>();
  
    /**
     * Constructor del componente.
     *
     * @method constructor
     * @param {Tramite240111Query} tramiteQuery - Query para obtener el estado actual del pago de derechos.
     * @param {Tramite240111Store} tramiteStore - Store que administra el estado del pago de derechos.
     * @returns {void}
     */
    constructor(
          private tramiteQuery: Tramite240112Query,
          private tramiteStore: Tramite240112Store
    ) // eslint-disable-next-line no-empty-function
    {}
  
    /**
     * Hook del ciclo de vida que se ejecuta al inicializar el componente.
     * Suscribe a los observables del query para reflejar los datos en la vista.
     *
     * @method ngOnInit
     * @returns {void}
     */
    ngOnInit(): void {
      this.tramiteQuery.getPagoDerechos$
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.pagoDerechoFormState = data;
        });
    }
  
    /**
     * Hook del ciclo de vida que se ejecuta al destruir el componente.
     * Libera las suscripciones para evitar fugas de memoria.
     *
     * @method ngOnDestroy
     * @returns {void}
     */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  
    /**
     * Actualiza el estado del formulario de pago de derechos en el store.
     *
     * @method updatePagoDerechos
     * @param {PagoDerechosFormState} event - Estado actualizado del formulario.
     * @returns {void}
     */
    updatePagoDerechos(event: PagoDerechosFormState): void {
      this.tramiteStore.updatePagoDerechosFormState(event);
    }
}
