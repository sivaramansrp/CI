import { DestinoFinal, Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { AgregarProveedorCustomComponent } from "../../../../shared/components/agregar-proveedor-custom/agregar-proveedor-custom.component";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { Tramite240118Store } from '../../estados/tramite240118Store.store';

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorCustomComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {
  
  /**
   * @property terechosDatos$
   * @type {Observable<DestinoFinal | Proveedor | null | undefined>}
   * @description Observable que emite datos relacionados con el destino final o proveedor.
   * Puede ser un objeto de tipo `DestinoFinal`, `Proveedor`, `null` o `undefined`.
   * @command Este observable se utiliza para gestionar y observar los datos de los proveedores o destinos finales en el componente.
   */
  terechosDatos$!: Observable<DestinoFinal | Proveedor | null | undefined>;

  /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite260214Store` para gestionar el estado del trámite.
   *
   * @param tramite260214Store - Store que administra el estado del trámite 260214.
   */

  constructor(public tramite240118Store: Tramite240118Store) {
     // No hacer nada
  }

  /**
   * @method updateProveedorTablaDatos
   * @description Actualiza los datos de la tabla de proveedores en el store del trámite.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite240118Store.updateProveedorTablaDatos(event);
  }
}
