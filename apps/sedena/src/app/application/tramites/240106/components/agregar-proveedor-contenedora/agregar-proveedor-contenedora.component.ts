import { DestinoFinal, Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Tramite240106Query } from '../../estados/tramite240106Query.query';
import { Tramite240106Store } from '../../estados/tramite240106Store.store';

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {
  /**
   * Observable que emite información sobre el destino final, proveedor o un valor nulo/indefinido.
   * 
   * @type {Observable<DestinoFinal | Proveedor | null | undefined>}
   * 
   * @remarks
   * Este observable se utiliza para gestionar los datos relacionados con los derechos
   * y destinatarios finales en el contexto de la aplicación.
   */
  public terechosDatos$!: Observable<DestinoFinal | Proveedor | null | undefined>;

  /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite260214Store` para gestionar el estado del trámite.
   *
   * @param tramite260106Store - Store que administra el estado del trámite 260214.
   */
  // eslint-disable-next-line no-empty-function
  constructor(public tramite240106Store: Tramite240106Store, public tramiteQuery: Tramite240106Query) {
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
    this.tramite240106Store.updateProveedorTablaDatos(event);
  }
}
