import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Destinatario,
  Fabricante,
  Facturador,
  Proveedor,
} from '../../../../shared/models/terceros-relacionados.model';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { Tramite260204Query } from '../../estados/queries/tramite260204Query.query';
import { Tramite260204Store } from '../../estados/stores/tramite260204Store.store';
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
  styleUrl: './terceros-relacionados-vista.component.css',
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
    * @property {Subject<void>} destroy$
    * Subject para cancelar suscripciones y evitar fugas de memoria.
    * @private
    */
   private destroy$ = new Subject<void>();

   /**
    * Observable que indica si el formulario está en modo solo lectura.
    * Cuando es `true`, el formulario no permite modificaciones por parte del usuario.
    *
    * @type {Observable<boolean>}
    */
   esFormularioSoloLectura!: Observable<boolean>;
 
   /**
    * @constructor
    * Inyecta los servicios necesarios para consultar y actualizar el estado del trámite.
    *
    * @param tramiteStore - Store que gestiona el estado de los datos del trámite.
    * @param tramiteQuery - Servicio de consulta que expone observables para leer los datos del store.
    */
   constructor(
     private tramiteStore: Tramite260204Store,
     private tramiteQuery: Tramite260204Query,
     private consultaQuery: ConsultaioQuery  
   ) { }
 
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
       
    this.esFormularioSoloLectura = this.consultaQuery.selectConsultaioState$
    .pipe(
      map((seccionState) => {
        if(!seccionState.create && seccionState.procedureId === '260204') {
          return seccionState.readonly;
        } 
        return false;
      })
    );
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

  ngOnDestroy(): void{
    this.destroy$.next();
  }
}
