import { ActivatedRoute, Router } from '@angular/router';
import { Component,OnDestroy,OnInit } from '@angular/core';
import { Subject,takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { DatosDelTramiteFormState } from '../../../../shared/models/datos-del-tramite.model';
import { ID_PROCEDIMIENTO } from '../../../240118/constants/solicitud-permiso-extraordinario-exportacion';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { Tramite240118Query } from '../../estados/tramite240118Query.query';
import { Tramite240118Store } from '../../estados/tramite240118Store.store';

/**
 * @title Datos del Trámite Contenedora
 * @description Componente contenedor que se encarga de enlazar el estado del trámite con el componente de datos del trámite.
 * @summary Maneja la suscripción al estado y propaga los cambios a través del store.
 */

@Component({
  selector: 'app-datos-del-tramite-contenedora',
  standalone: true,
  imports: [CommonModule, DatosDelTramiteComponent],
  templateUrl: './datos-del-tramite-contenedora.component.html',
  styleUrl: './datos-del-tramite-contenedora.component.scss',
})
export class DatosDelTramiteContenedoraComponent implements OnInit, OnDestroy {
  
  /**
   * @constant {number} ID_PROCEDIMIENTO
   * @property {number} idProcedimiento - Indica si el elemento está oculto o visible.
   * @remarks Este valor determina la visibilidad del componente en la interfaz de usuario.
   * @command Cambiar el valor de esta propiedad para alternar la visibilidad.
   */
  public readonly idProcedimiento:number = ID_PROCEDIMIENTO;

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

  /** @private Sujeto para manejar la destrucción de suscripciones y evitar fugas de memoria. */ 
  private destroy$ = new Subject<void>();

  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240118Query} tramiteQuery - Query de Akita para obtener el estado actual del trámite.
   * @param {Tramite240118Store} tramiteStore - Store de Akita para actualizar el estado del trámite.
   * @returns {void}
   */
  constructor(
    private tramiteQuery: Tramite240118Query,
    private tramiteStore: Tramite240118Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  )
  {
     // No hacer nada
  }

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe a los observables del estado para mostrar los datos en la vista.
   *
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramiteQuery.getMercanciaTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
      let necesitaActualizar = false;
      const DATOS_ACTUALIZADOS = data.map((item, index) => {
        if (Object.prototype.hasOwnProperty.call(item, 'tableIndex')) {
        return item;
        }
        necesitaActualizar = true;
        return {
        ...item,
        tableIndex: index
        };
      });
      this.datosMercanciaTabla = DATOS_ACTUALIZADOS;
      if (necesitaActualizar) {
        this.tramiteStore.setMercanciasDatosTabla(DATOS_ACTUALIZADOS);
      }
      });

    this.tramiteQuery.getDatosDelTramite$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.datosDelTramiteFormState = data;
      });
  }

      /**
     * Actualiza la lista de destinatarios finales en el store del trámite.
     *
     * @method modificarMercanciasDatos
     * @param {MercanciaDetalle[]} event - Lista de destinatarios finales actualizada.
     * @returns {void}
     */
      modificarMercanciasDatos(datos: MercanciaDetalle): void {
        this.tramiteStore.actualizarMercancias(datos);
        this.irAAcciones();
      }

      /**
       * Elimina los datos de una mercancía específica del trámite actual.
       *
       * @param datos - Objeto de tipo `MercanciaDetalle` que contiene la información de la mercancía a eliminar.
       *
       * @remarks
       * Este método verifica si el objeto `datos` es válido y, en caso afirmativo,
       * llama al método `eliminarMercancias` del store para eliminar la mercancía correspondiente.
       *
       * @see TramiteStore.eliminarMercancias
       */
      eliminarMercanciasDatos(datos: MercanciaDetalle): void {
        if (datos) {
          this.tramiteStore.eliminarMercancias(datos);
        }
      }

    /**
     * Navega a una ruta relativa dentro del flujo actual.
     * @method irAAcciones
     * @param {string} accionesPath - Ruta relativa a la que se desea navegar.
     * @returns {void}
     */
    irAAcciones(): void {
      this.router.navigate(['../agregar-datos-mercancia'], {
        relativeTo: this.activatedRoute,
      });
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
    this.tramiteStore.updateDatosDelTramiteFormState(event);
  }
}
