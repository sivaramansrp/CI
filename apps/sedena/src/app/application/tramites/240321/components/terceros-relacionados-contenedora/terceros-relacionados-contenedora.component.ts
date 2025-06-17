import { AfterViewInit, Component } from '@angular/core';
import {Subject, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { ModificacionService } from '../../services/modificacion.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { Tramite240321Query } from '../../estados/tramite240321Query.query';
import { Tramite240321Store } from '../../estados/tramite240321Store.store';
import { takeUntil } from 'rxjs';

/**
 * @title Terceros Relacionados Contenedora
 * @description Componente contenedor encargado de suscribirse a los datos de destinatarios finales y proveedores del trámite.
 * @summary Conecta el estado global del store con el componente visual de terceros relacionados.
 */

@Component({
  selector: 'app-terceros-relacionados-contenedora',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-relacionados-contenedora.component.html',
  styleUrl: './terceros-relacionados-contenedora.component.scss',
})
export class TercerosRelacionadosContenedoraComponent
  implements OnInit, OnDestroy,AfterViewInit
{
  /**
   * Observable para limpiar las suscripciones activas al destruir el componente.
   * @property {Subject<void>} destroy$
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Datos de la tabla de destinatarios finales.
   * @property {DestinoFinal[]} destinatarioFinalTablaDatos
   */
  destinatarioFinalTablaDatos: DestinoFinal[] = [];

  /**
   * Datos de la tabla de proveedores.
   * @property {Proveedor[]} proveedorTablaDatos
   */
  proveedorTablaDatos: Proveedor[] = [];
   /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   *
   * @type {boolean}
   * @memberof AgregarDestinatarioFinalContenedoraComponent
   * @see https://compodoc.app/
   */
  esFormularioSoloLectura:boolean=false;
  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240321Store} tramiteStore - Store de Akita que maneja el estado del trámite.
   * @param {Tramite240321Query} tramiteQuery - Query de Akita para obtener datos del trámite.
   * @returns {void}
   */
  constructor(
    private tramiteStore: Tramite240321Store,
    private tramiteQuery: Tramite240321Query,
    private modificacionService: ModificacionService,
    private readonly consultaioQuery:ConsultaioQuery
  
  ) {
    // 
  }

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe a los observables de destinatarios y proveedores para mostrarlos en la vista.
   *
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramiteQuery.getDestinatarioFinalTablaDatos$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.destinatarioFinalTablaDatos = data;
        this.getDestinatariosFinales();
      });

    this.tramiteQuery.getProveedorTablaDatos$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.proveedorTablaDatos = data;
        this.getProveedores();
      });
    
  }


  /**
     * @inheritdoc
     * @description
     * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
     * 
     * Suscribe al observable `selectConsultaioState$` para escuchar cambios en el estado de la sección y actualizar
     * la propiedad `esFormularioSoloLectura` según el valor de `readonly` en el estado.
     * 
     * La suscripción se mantiene activa hasta que se emite un valor en `unsubscribe$`, lo que previene fugas de memoria.
     * 
     * @see https://angular.io/api/core/AfterViewInit
     */
    ngAfterViewInit(): void {
          this.consultaioQuery.selectConsultaioState$
                                    .pipe(
                                      takeUntil(this.unsubscribe$),
                                      map((seccionState)=>{
                                        this.esFormularioSoloLectura = seccionState.readonly; 
                                      })
                                    )
                                    .subscribe();
    }

  /**
   * Método que obtiene los destinatarios finales desde el servicio de modificación.
   * Actualiza el store con los datos obtenidos si la tabla está vacía.
   *
   * @method getDestinatariosFinales
   * @returns {void}
   */


  getDestinatariosFinales():void {
    this.modificacionService.getDestinatariosFinales().pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      const DESTINATARIODATOS = resp.data;
      if(this.destinatarioFinalTablaDatos.length===0){
        this.destinatarioFinalTablaDatos = DESTINATARIODATOS;
        this.tramiteStore.updateDestinatarioFinalTablaDatos(this.destinatarioFinalTablaDatos);


      }
      
    });
  }

  /**
   * Método que obtiene los proveedores desde el servicio de modificación.
   * Actualiza el store con los datos obtenidos si la tabla está vacía.
   *
   * @method getProveedores
   * @returns {void}
   */

  getProveedores():void {
    this.modificacionService.getProveedores().pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      const PROVEEDOR_DATOS = resp.data;
      if(this.proveedorTablaDatos.length===0){
        this.proveedorTablaDatos = PROVEEDOR_DATOS;
        this.tramiteStore.updateProveedorTablaDatos(this.proveedorTablaDatos);
      }
      
    });
  }

  /**
   * Hook que se ejecuta al destruir el componente.
   * Envía un valor al Subject `unsubscribe$` y lo completa para liberar suscripciones.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
