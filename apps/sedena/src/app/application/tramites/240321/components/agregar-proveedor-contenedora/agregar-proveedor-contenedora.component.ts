import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AgregarProveedorCustomComponent } from '../../../../shared/components/agregar-proveedor-custom/agregar-proveedor-custom.component';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240321Query } from '../../estados/tramite240321Query.query';
import { Tramite240321Store } from '../../estados/tramite240321Store.store';

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorCustomComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent implements OnInit, OnDestroy,AfterViewInit {
    /**
   * @event cerrar
   * @description Evento emitido para indicar que se debe cerrar el componente.
   * @remarks
   * Este evento no envía ningún valor, simplemente notifica a los componentes padres que se debe realizar la acción de cierre.
   * 
   * @eventType void
   * @es
   * Evento que se dispara para cerrar el componente actual.
   */
  @Output() cerrar = new EventEmitter<void>();
  /**
       * Subject utilizado para gestionar la desuscripción de observables.
       * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
       * @property {Subject<void>} unsubscribe$
       * @private
       */
  private unsubscribe$ = new Subject<void>();
  /**
   * Datos de la tabla de proveedores.
   * @property {Proveedor[]} proveedorTablaDatos
   */

  proveedorTablaDatos: Proveedor[] = [];
  /**
   * Índice del proveedor seleccionado.
   * @property {string} proveedorIndice
   */
  proveedorIndice: string = '';

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
   * @param {Tramite240321Store} tramite240321Store - Store que administra el estado del trámite.
   * @param {ActivatedRoute} route - Servicio de Angular para acceder a los parámetros de la ruta.
   * @param {Tramite240321Query} tramiteQuery - Query para obtener datos del store del trámite.
   * @param {ConsultaioQuery} consultaioQuery - Query para obtener el estado de la sección de consulta.
   * @returns {void}
   */
  constructor(public tramite240321Store: Tramite240321Store,private route: ActivatedRoute,
    private tramiteQuery: Tramite240321Query,private readonly consultaioQuery:ConsultaioQuery
  ) {}

  /**
   * @method updateProveedorTablaDatos
   * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite240321Store.updateProveedorTablaDatos(event);
      this.cerrar.emit();
  }
  /**
   * @method actualizaExistenteEnProveedorDatos
   * @description Actualiza la existencia de datos en el proveedor.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  actualizaExistenteEnProveedorDatos(event: Proveedor[]): void {
    this.tramite240321Store.actualizaExistenteEnProveedorDatos(event);
  }
  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe a los parámetros de la ruta para obtener el índice del proveedor.
   *
   * @method ngOnInit
   * @returns {void}
   */

  ngOnInit(): void {
      this.route.queryParams
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(params => {
            const INDICE = String(params['proveedor']);
            this.proveedorIndice= INDICE;
            this.tramiteQuery.getProveedorTablaDatos$.pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.proveedorTablaDatos= data;
        });
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
       * 
       * @memberof AgregarDestinatarioFinalContenedoraComponent
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
     * Hook del ciclo de vida que se ejecuta al destruir el componente.
     * Libera las suscripciones activas para evitar fugas de memoria.
     *
     * @method ngOnDestroy
     * @returns {void}
     */
    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }

}
