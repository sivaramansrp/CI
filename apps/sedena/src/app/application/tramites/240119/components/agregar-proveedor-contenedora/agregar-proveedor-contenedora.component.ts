import { Component, EventEmitter, Output } from '@angular/core';
import {
  DestinoFinal,
  Proveedor,
} from '../../../../shared/models/terceros-relacionados.model';
import { AgregarProveedorCustomComponent } from '../../../../shared/components/agregar-proveedor-custom/agregar-proveedor-custom.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Tramite240119Query } from '../../estados/tramite240119Query.query';
import { Tramite240119Store } from '../../estados/tramite240119Store.store';

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorCustomComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {
  @Output() cerrar = new EventEmitter<void>();
  /**
   * Observable que emite información sobre el destino final, proveedor o un valor nulo/indefinido.
   *
   * @type {Observable<DestinoFinal | Proveedor | null | undefined>}
   *
   * @remarks
   * Este observable se utiliza para gestionar los datos relacionados con los derechos
   * y destinatarios finales en el contexto de la aplicación.
   */
  public terechosDatos$!: Observable<
    DestinoFinal | Proveedor | null | undefined
  >;

  /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite260214Store` para gestionar el estado del trámite.
   *
   * @param tramite260214Store - Store que administra el estado del trámite 260214.
   */

  constructor(
    public tramite240119Store: Tramite240119Store,
    public tramiteQuery: Tramite240119Query
  ) {
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
    this.tramite240119Store.updateProveedorTablaDatos(event);
  }
}
