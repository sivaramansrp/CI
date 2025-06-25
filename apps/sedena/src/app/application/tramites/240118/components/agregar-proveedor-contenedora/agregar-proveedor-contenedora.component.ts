import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  DestinoFinal,
  Proveedor,
} from '../../../../shared/models/terceros-relacionados.model';
import { AgregarProveedorCustomComponent } from '../../../../shared/components/agregar-proveedor-custom/agregar-proveedor-custom.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Tramite240118Query } from '../../estados/tramite240118Query.query';
import { Tramite240118Store } from '../../estados/tramite240118Store.store';

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorCustomComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent implements OnInit {
  /**
   * Evento que se emite cuando se cierra el componente.
   * Permite a los componentes padres reaccionar al cierre del modal.
   *
   * @type {EventEmitter<void>}
   */
  @Output() cerrar = new EventEmitter<void>();
  /**
   * @property terechosDatos$
   * @type {Observable<DestinoFinal | Proveedor | null | undefined>}
   * @description Observable que emite datos relacionados con el destino final o proveedor.
   * Puede ser un objeto de tipo `DestinoFinal`, `Proveedor`, `null` o `undefined`.
   * @command Este observable se utiliza para gestionar y observar los datos de los proveedores o destinos finales en el componente.
   */
  terechosDatos$!: Observable<DestinoFinal | Proveedor | null | undefined>;
  /**
   * @property {number} idProcedimiento
   * Identificador del procedimiento actual.
   */
  public readonly idProcedimiento: number = 240118;

  /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite240118Store` para gestionar el estado del trámite.
   *
   * @param tramite240118Store - Store que administra el estado del trámite 240118.
   * @param tramite240118Query - Consulta que proporciona acceso a los datos del trámite 240118.
   * @returns {void}
   */

  constructor(
    public tramiteStore: Tramite240118Store,
    public tramiteQuery: Tramite240118Query
  ) {
    this.terechosDatos$ = this.tramiteQuery.obtenerTercerosDatos$;
  }

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * @command Este método asigna un observable `terechosDatos$` con los datos obtenidos desde `tramiteQuery`.
   */
  ngOnInit(): void {
    this.terechosDatos$ = this.tramiteQuery.obtenerTercerosDatos$;
  }

  /**
   * @method updateProveedorTablaDatos
   * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramiteStore.updateProveedorTablaDatos(event);
    this.cerrar.emit();
  }
}
