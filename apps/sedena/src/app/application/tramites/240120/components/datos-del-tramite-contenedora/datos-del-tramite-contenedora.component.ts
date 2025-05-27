import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { DatosDelTramiteFormState } from '../../../../shared/models/datos-del-tramite.model';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { NUMERO_TRAMITE } from '../../../../shared/constants/datos-solicitud.enum';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Tramite240120Query } from '../../estados/tramite240120Query.query';
import { Tramite240120Store } from '../../estados/tramite240120Store.store';
import { takeUntil } from 'rxjs';

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

  /**
   * @constant {number} ID_PROCEDIMIENTO
   * @property {number} idProcedimiento - Indica si el elemento está oculto o visible.
   * @remarks Este valor determina la visibilidad del componente en la interfaz de usuario.
   * @command Cambiar el valor de esta propiedad para alternar la visibilidad.
   */
  public readonly idProcedimiento: number = NUMERO_TRAMITE.TRAMITE_240120;

  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240120Query} tramiteQuery - Query de Akita para obtener el estado actual del trámite.
   * @param {Tramite240120Store} tramiteStore - Store de Akita para actualizar el estado del trámite.
   * @returns {void}
   */
  constructor(
    private tramiteQuery: Tramite240120Query,
    private tramiteStore: Tramite240120Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
