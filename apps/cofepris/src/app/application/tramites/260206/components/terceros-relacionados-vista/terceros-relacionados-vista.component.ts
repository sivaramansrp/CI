import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Destinatario,
  Fabricante,
  Facturador,
  Proveedor,
} from '../../../../shared/models/terceros-relacionados.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TIPO_ACTUALIZACION } from '../../../../shared/constantes/datos-solicitud.enum';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { Tramite260206Query } from '../../estados/queries/tramite260206Query.query';
import { Tramite260206Store } from '../../estados/stores/tramite260206Store.store';

/**
 * @component TercerosRelacionadosVistaComponent
 * @description Componente de solo lectura que muestra las tablas de terceros relacionados
 * (fabricantes, destinatarios finales, proveedores y facturadores).
 * Consume observables del store para renderizar los datos en la vista mediante el componente
 * `TercerosRelacionadosComponent`.
 */
@Component({
  selector: 'app-terceros-relacionados-vista',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-relacionados-vista.component.html',
  styleUrl: './terceros-relacionados-vista.component.scss',
})
export class TercerosRelacionadosVistaComponent implements OnInit, OnDestroy {

  /**
   * que indica si el formulario está en modo solo lectura.
   * Cuando es `true`, el formulario no permite modificaciones por parte del usuario.
   *
   * @type {boolean}
   */
  esFormularioSoloLectura!: boolean; 

  /**
   * @property {Fabricante[]} fabricanteTablaDatos
   * Datos de la tabla de fabricantes.
   */
  fabricanteTablaDatos: Fabricante[] = [];

  /**
   * @property {Destinatario[]} destinatarioFinalTablaDatos
   * Datos de la tabla de destinatarios finales.
   */
  destinatarioFinalTablaDatos: Destinatario[] = [];

  /**
   * @property {Proveedor[]} proveedorTablaDatos
   * Datos de la tabla de proveedores.
   */
  proveedorTablaDatos: Proveedor[] = [];

  /**
   * @property {Facturador[]} facturadorTablaDatos
   * Datos de la tabla de facturadores.
   */
  facturadorTablaDatos: Facturador[] = [];

  /**
   * @property {Subject<void>} destroy$
   * Subject para cancelar suscripciones y evitar fugas de memoria.
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * @constructor
   * Inyecta los servicios necesarios para consultar y actualizar el estado del trámite.
   *
   * @param tramiteStore - Store que gestiona el estado de los datos del trámite.
   * @param tramiteQuery - Servicio de consulta que expone observables para leer los datos del store.
   */
  constructor(
    private tramiteStore: Tramite260206Store,
    private tramiteQuery: Tramite260206Query,
    private consultaQuery: ConsultaioQuery
  ) { 
    this.consultaQuery.selectConsultaioState$
        .pipe(
          takeUntil(this.destroy$),
        )
        .subscribe((seccionState) => {
          if(!seccionState.create && seccionState.procedureId === '260206') {
            this.esFormularioSoloLectura = seccionState.readonly;
          } 
        });
  }

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe los observables para mostrar los datos en la vista.
   */
  ngOnInit(): void {
    this.tramiteQuery.getFabricanteTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.fabricanteTablaDatos = data;
      });

    this.tramiteQuery.getDestinatarioFinalTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.destinatarioFinalTablaDatos = data;
      });

    this.tramiteQuery.getProveedorTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.proveedorTablaDatos = data;
      });

    this.tramiteQuery.getFacturadorTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.facturadorTablaDatos = data;
      });
  }

  /**
   * @method addFabricantes
   * @description Agrega nuevos fabricantes a la tabla de datos del trámite.
   *
   * @param newFabricantes - Lista de objetos `Fabricante` a agregar.
   */
  addFabricantes(newFabricantes: Fabricante[]): void {
    this.tramiteStore.updateFabricanteTablaDatos(newFabricantes);
  }

  /**
   * @method addDestinatarios
   * @description Agrega nuevos destinatarios a la tabla de datos del destinatario final.
   *
   * @param newDestinatarios - Lista de objetos `Destinatario` a agregar.
   */
  addDestinatarios(newDestinatarios: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(newDestinatarios);
  }

  /**
   * @method addProveedores
   * @description Agrega nuevos proveedores a la tabla de datos del trámite.
   *
   * @param newProveedores - Lista de objetos `Proveedor` a agregar.
   */
  addProveedores(newProveedores: Proveedor[]): void {
    this.tramiteStore.updateProveedorTablaDatos(newProveedores);
  }

  /**
   * @method addFacturadores
   * @description Agrega nuevos facturadores a la tabla de datos del trámite.
   *
   * @param newFacturadores - Lista de objetos `Facturador` a agregar.
   */
  addFacturadores(newFacturadores: Facturador[]): void {
    this.tramiteStore.updateFacturadorTablaDatos(newFacturadores);
  }


  /**
   * @method fabricanteEventoModificar
   * @description Actualiza la tabla de fabricantes en el store con el fabricante seleccionado.
   *
   * @param {Fabricante} seleccionadaFabricante - Objeto fabricante seleccionado.
   * @returns {void}
   */
  fabricanteEventoModificar(seleccionadaFabricante: Fabricante[]): void {
    this.tramiteStore.updateSeleccionadoTablaFabricanteDatos(seleccionadaFabricante);
  }

  /**
   * @method destinatarioEventoModificar
   * @description Actualiza la tabla de destinatarios finales en el store con el destinatario seleccionado.
   *
   * @param {Destinatario} seleccionadaDestinatario - Objeto destinatario seleccionado.
   * @returns {void}
   */
  destinatarioEventoModificar(seleccionadaDestinatario: Destinatario[]): void {
    this.tramiteStore.updateSeleccionadoTablaDestinatarioDatos(
      seleccionadaDestinatario,
    );
  }

  /**
   * @method proveedorEventoModificar
   * @description Actualiza la tabla de proveedores en el store con el proveedor seleccionado.
   *
   * @param {Proveedor} seleccionadaProveedor - Objeto proveedor seleccionado.
   * @returns {void}
   */
  proveedorEventoModificar(seleccionadaProveedor: Proveedor[]): void {
    this.tramiteStore.updateSeleccionadoTablaProveedorDatos(seleccionadaProveedor);
  }

  /**
   * @method facturadorEventoModificar
   * @description Actualiza la tabla de facturadores en el store con el facturador seleccionado.
   *
   * @param {Facturador} seleccionadaFacturador - Objeto facturador seleccionado.
   * @returns {void}
   */
  facturadorEventoModificar(seleccionadaFacturador: Facturador[]): void {
    this.tramiteStore.updateSeleccionadoTablaFacturadorDatos(seleccionadaFacturador);
  }

  /**
 * @method eliminarFabricante
 * @description Elimina los fabricantes recibidos como parámetro y actualiza la tabla de fabricantes en el store.
 *
 * @param {Fabricante[]} fabricante - Lista de fabricantes actualizada después de la eliminación.
 * @returns {void}
 */
  eliminarFabricante(fabricante:Fabricante[]):void{
      this.tramiteStore.updateFabricanteTablaDatos(fabricante,TIPO_ACTUALIZACION.ELIMINAR);
  }

  /**
   * @method eliminarDestinatario
   * @description Elimina los destinatarios recibidos como parámetro y actualiza la tabla de destinatarios finales en el store.
   *
   * @param {Destinatario[]} destinatario - Lista de destinatarios actualizada después de la eliminación.
   * @returns {void}
   */
  eliminarDestinatario(destinatario:Destinatario[]):void{
      this.tramiteStore.updateDestinatarioFinalTablaDatos(destinatario,TIPO_ACTUALIZACION.ELIMINAR);
  }

  /**
   * @method eliminarProveedor
   * @description Elimina los proveedores recibidos como parámetro y actualiza la tabla de proveedores en el store.
   *
   * @param {Proveedor[]} proveedor - Lista de proveedores actualizada después de la eliminación.
   * @returns {void}
   */
  eliminarProveedor(proveedor:Proveedor[]):void{
      this.tramiteStore.updateProveedorTablaDatos(proveedor,TIPO_ACTUALIZACION.ELIMINAR);
  }

  /**
   * @method eliminarFacturador
   * @description Elimina los facturadores recibidos como parámetro y actualiza la tabla de facturadores en el store.
   *
   * @param {Facturador[]} facturador - Lista de facturadores actualizada después de la eliminación.
   * @returns {void}
   */
  eliminarFacturador(facturador:Facturador[]):void{
      this.tramiteStore.updateFacturadorTablaDatos(facturador,TIPO_ACTUALIZACION.ELIMINAR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   * Aquí se emiten señales para completar y limpiar cualquier suscripción o recurso que el componente
   * haya estado utilizando, evitando posibles fugas de memoria.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
