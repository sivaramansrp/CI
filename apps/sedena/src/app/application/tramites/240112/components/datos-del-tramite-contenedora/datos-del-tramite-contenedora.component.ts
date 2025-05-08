import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatosDelTramiteFormState, MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { ID_PROCEDIMIENTO } from '../../constants/agregar-destinatario.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datos-del-tramite-contenedora',
  templateUrl: './datos-del-tramite-contenedora.component.html',
  styleUrl: './datos-del-tramite-contenedora.component.scss',
})
export class DatosDelTramiteContenedoraComponent implements OnInit,OnDestroy {

    /**
     * Datos de la tabla de mercancías que se muestran en el formulario.
     * @property {MercanciaDetalle[]} datosMercanciaTabla
     */
    public datosMercanciaTabla: MercanciaDetalle[] = [];
  
    /**
     * Estado actual del formulario de datos del trámite.
     * @property {DatosDelTramiteFormState} datosDelTramiteFormState
     */
    public datosDelTramiteFormState!: DatosDelTramiteFormState;
  
    /**
     * Observable adicional para limpieza de suscripciones.
     * @property {Subject<void>} destroy$
     */
    private destroy$ = new Subject<void>();
  
    public readonly idProcedimiento = ID_PROCEDIMIENTO;
  
    /**
     * Constructor del componente.
     *
     * @method constructor
     * @param {Tramite240111Query} tramiteQuery - Query de Akita para obtener el estado actual del trámite.
     * @param {Tramite240111Store} tramiteStore - Store de Akita para actualizar el estado del trámite.
     * @returns {void}
     */
    constructor(
      // private tramiteQuery: Tramite240111Query,
      // private tramiteStore: Tramite240111Store
    ) // eslint-disable-next-line no-empty-function
    {}
  
    /**
     * Hook del ciclo de vida que se ejecuta al inicializar el componente.
     * Suscribe a los observables del estado para mostrar los datos en la vista.
     *
     * @method ngOnInit
     * @returns {void}
     */
    ngOnInit(): void {
      // this.tramiteQuery.getMercanciaTablaDatos$
      //   .pipe(takeUntil(this.destroy$))
      //   .subscribe((data) => {
      //     this.datosMercanciaTabla = data;
      //   });
  
      // this.tramiteQuery.getDatosDelTramite$
      //   .pipe(takeUntil(this.destroy$))
      //   .subscribe((data) => {
      //     this.datosDelTramiteFormState = data;
      //   });
    }
  
    /**
     * Hook del ciclo de vida que se ejecuta al destruir el componente.
     * Libera las suscripciones activas para evitar fugas de memoria.
     *
     * @method ngOnDestroy
     * @returns {void}
     */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  
    /**
     * Actualiza el estado del formulario de datos del trámite en el store.
     *
     * @method updateDatosDelTramiteFormulario
     * @param {DatosDelTramiteFormState} event - Estado actualizado del formulario.
     * @returns {void}
     */
    updateDatosDelTramiteFormulario(event: DatosDelTramiteFormState): void {
      // this.tramiteStore.updateDatosDelTramiteFormState(event);
    }
}
