/**
 * Componente contenedor encargado de gestionar y mostrar la información relacionada
 * con terceros relacionados en el trámite, incluyendo destinatarios finales y proveedores.
 * 
 * @component
 * 
 * @remarks
 * Este componente utiliza servicios de estado para obtener datos en tiempo real y controla
 * la apertura de modales para agregar nuevos destinatarios finales o proveedores.
 * 
 * @example
 * ```html
 * <app-terceros-relacionados-contenedora
 *   [formularioDeshabilitado]="false"
 * ></app-terceros-relacionados-contenedora>
 * ```
 */
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DestinoFinal, Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Subject, takeUntil } from 'rxjs';
import { AgregarDestinatarioFinalContenedoraComponent } from '../agregar-destinatario-final-contenedora/agregar-destinatario-final-contenedora.component';
import { AgregarProveedorContenedoraComponent } from '../agregar-proveedor-contenedora/agregar-proveedor-contenedora.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { Tramite240112Query } from '../../estados/tramite240112Query.query';

@Component({
  /**
   * Selector que identifica el componente para su uso en plantillas.
   * 
   * @example
   * <app-terceros-relacionados-contenedora></app-terceros-relacionados-contenedora>
   */
  selector: 'app-terceros-relacionados-contenedora',

  /**
   * Archivo HTML que define la estructura visual del componente.
   */
  templateUrl: './terceros-relacionados-contenedora.component.html',

  /**
   * Archivo SCSS que contiene los estilos del componente.
   */
  styleUrl: './terceros-relacionados-contenedora.component.scss',

  /**
   * Componentes independientes importados para uso en la plantilla.
   */
  standalone: true,
  imports: [TercerosRelacionadosComponent, ModalComponent],
})
export class TercerosRelacionadosContenedoraComponent implements OnInit, OnDestroy {
  /**
   * Referencia al componente ModalComponent dentro de la plantilla.
   * Permite controlar la apertura y cierre del modal dinámico.
   * 
   * @example
   * this.modalComponent.abrir(...);
   * this.modalComponent.cerrar();
   * 
   * @see ModalComponent
   */
  @ViewChild('modal', { static: false }) modalComponent!: ModalComponent;

  /**
   * Indica si el formulario debe estar deshabilitado (modo solo lectura).
   * Cuando es `true`, los controles no podrán ser editados.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Subject para controlar la limpieza de suscripciones al destruir el componente.
   */
  private destroy$ = new Subject<void>();

  /**
   * Datos de la tabla que contienen los destinatarios finales.
   */
  destinatarioFinalTablaDatos: DestinoFinal[] = [];

  /**
   * Datos de la tabla que contienen los proveedores.
   */
  proveedorTablaDatos: Proveedor[] = [];

  /**
   * Constructor que inyecta el servicio para consultar el estado del trámite.
   * 
   * @param tramiteQuery - Query para obtener datos relacionados con terceros.
   */
  constructor(
    private tramiteQuery: Tramite240112Query
  ) {}

  /**
   * Hook de Angular que se ejecuta al inicializar el componente.
   * Suscribe a los observables para obtener datos de destinatarios finales y proveedores.
   */
  ngOnInit(): void {
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
  }

  /**
   * Hook que se ejecuta al destruir el componente.
   * Realiza la limpieza de suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Abre el modal correspondiente según el evento recibido.
   * 
   * - Si el evento es `'agregar-destino-final'`, abre el modal con el componente
   *   `AgregarDestinatarioFinalContenedoraComponent`.
   * - Si el evento es `'agregar-proveedor'`, abre el modal con el componente
   *   `AgregarProveedorContenedoraComponent`.
   * 
   * @param event - Nombre del evento que indica qué modal abrir.
   */
  openModal(event: string): void {
    if (event === 'agregar-destino-final') {
      this.modalComponent.abrir(AgregarDestinatarioFinalContenedoraComponent, {
        cerrarModal: this.cerrarModal.bind(this),
      });
    } else if (event === 'agregar-proveedor') {
      this.modalComponent.abrir(AgregarProveedorContenedoraComponent, {
        cerrarModal: this.cerrarModal.bind(this),
      });
    }
  }
  /**
   * Cierra el modal dinámico que esté abierto en el momento.
   */
  cerrarModal(): void {
    this.modalComponent.cerrar();
  }
}
