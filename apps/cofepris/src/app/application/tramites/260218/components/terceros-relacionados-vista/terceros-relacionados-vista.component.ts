import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Destinatario,
  Fabricante,
  Facturador,
  Proveedor,
} from '../../../../shared/models/terceros-relacionados.model';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { Tramite260218Query } from '../../estados/tramite260218Query.query'; 
import { Tramite260218Store } from '../../estados/tramite260218Store.store';

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
   * @property {boolean} estaOculto
   * Variable booleana que controla si el componente debe estar oculto o no.
   */
  estaOculto: boolean = true;

 /**
   * Subject para gestionar el ciclo de vida del componente.
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false; 

  /**
   * @constructor
   * Inyecta los servicios necesarios para consultar y actualizar el estado del trámite.
   *
   * @param tramiteStore - Store que gestiona el estado de los datos del trámite.
   * @param tramiteQuery - Servicio de consulta que expone observables para leer los datos del store.
   * @param consultaQuery - Servicio de consulta para acceder al estado de la consulta.
   */
  constructor(
    private tramiteStore: Tramite260218Store,
    private tramiteQuery: Tramite260218Query,
    private consultaQuery: ConsultaioQuery
  ) {
      this.consultaQuery.selectConsultaioState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.esFormularioSoloLectura = seccionState.readonly;
          })
        )
        .subscribe();
  }


  /**
   * @method ngOnInit
   * @description Este método se ejecuta al inicializar el componente. 
   * Suscribe a varios observables para obtener datos relacionados con 
   * fabricantes, destinatarios finales, proveedores y facturadores, 
   * y los asigna a las propiedades correspondientes del componente.
   * 
   * @remarks
   * Utiliza el operador `takeUntil` para gestionar la suscripción y 
   * evitar fugas de memoria al destruir el componente.
   */
  ngOnInit(): void {
    this.tramiteQuery.getFabricanteTablaDatos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.fabricanteTablaDatos = data;
      });

    this.tramiteQuery.getDestinatarioFinalTablaDatos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.destinatarioFinalTablaDatos = data;
      });

    this.tramiteQuery.getProveedorTablaDatos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.proveedorTablaDatos = data;
      });

    this.tramiteQuery.getFacturadorTablaDatos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.facturadorTablaDatos = data;
      });
  }

  /**
   * @method addFabricantes
   * @description Agrega nuevos fabricantes a la tabla de datos del trámite.
   * 
   * Este método llama al store para actualizar los datos de la tabla de fabricantes
   * con la lista de nuevos fabricantes proporcionados.
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
   * Este método llama al store para actualizar los datos de la tabla de destinatarios
   * con la lista de nuevos destinatarios proporcionados.
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
   * Este método llama al store para actualizar los datos de la tabla de proveedores
   * con la lista de nuevos proveedores proporcionados.
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
   * Este método llama al store para actualizar los datos de la tabla de facturadores
   * con la lista de nuevos facturadores proporcionados.
   *
   * @param newFacturadores - Lista de objetos `Facturador` a agregar.
   */
  addFacturadores(newFacturadores: Facturador[]): void {
    this.tramiteStore.updateFacturadorTablaDatos(newFacturadores);
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
