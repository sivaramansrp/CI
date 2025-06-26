import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { AgregarProveedorCustomComponent } from '../../../../shared/components/agregar-proveedor-custom/agregar-proveedor-custom.component';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { NUMERO_TRAMITE } from '../../../../shared/constants/datos-solicitud.enum';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240122Store } from '../../estados/tramite240122Store.store';

/**
 * @component
 * @name AgregarProveedorContenedoraComponent
 * @description Componente encargado de gestionar la funcionalidad relacionada con la adición de proveedores 
 * en el trámite 240122. Este componente es independiente y utiliza el `Tramite240122Store` para manejar 
 * el estado del trámite.
 * 
 * @selector app-agregar-proveedor-contenedora
 * @standalone true
 * @imports CommonModule, AgregarProveedorCustomComponent
 * @templateUrl ./agregar-proveedor-contenedora.component.html
 * @styleUrl ./agregar-proveedor-contenedora.component.scss
 * 
 * @property {number} idProcedimiento - Identificador único del procedimiento asociado al trámite 240122.
 * @remarks Este valor se utiliza para identificar el trámite 240122.
 * 
 * @constructor
 * @param {Tramite240122Store} tramite240122Store - Store que administra el estado del trámite 240122.
 * 
 * @method updateProveedorTablaDatos
 * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
 * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
 * @returns {void} Este método no retorna ningún valor.
 */
@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorCustomComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent implements OnInit, OnDestroy {
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
   * @property {number} idProcedimiento - Identificador único del procedimiento asociado al trámite 240122.
   * @remarks Este valor se utiliza para identificar el trámite 240122.
   */
  public readonly idProcedimiento: number = NUMERO_TRAMITE.TRAMITE_240122;
  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * 
   * @remarks
   * Cuando esta propiedad es `true`, los campos del formulario no serán editables.
   * 
   * @defaultValue false
   * 
   * @example
   * // Para activar el modo solo lectura:
   * this.esFormularioSoloLectura = true;
   * 
   * @es
   * Indica si el formulario es solo de lectura.
   */
  public esFormularioSoloLectura: boolean = false;
  /**
 * Subject para notificar la destrucción del componente.
 */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite240122Store` para gestionar el estado del trámite.
   *
   * @param {Tramite240122Store} tramite240122Store - Store que administra el estado del trámite 240122.
   */
  constructor(public tramite240122Store: Tramite240122Store, private readonly consultaioQuery: ConsultaioQuery) { }

  /**
   * @inheritdoc
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al observable `selectConsultaioState$` para actualizar la propiedad
   * `esFormularioSoloLectura` según el estado de la sección. La suscripción se
   * cancela automáticamente cuando se emite un valor en `destroyNotifier$`.
   *
   * @memberof AgregarProveedorContenedoraComponent
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe()
  }

  /**
   * @method updateProveedorTablaDatos
   * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite240122Store.updateProveedorTablaDatos(event);
    this.cerrar.emit();
  }
  /**
* Hook del ciclo de vida que se ejecuta al destruir el componente.
* Libera las suscripciones activas para evitar fugas de memoria.
*
* @method ngOnDestroy
* @returns {void}
*/
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
