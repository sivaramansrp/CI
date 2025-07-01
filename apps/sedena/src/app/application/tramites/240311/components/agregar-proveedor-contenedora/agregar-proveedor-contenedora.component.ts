import { Component, EventEmitter, Output } from '@angular/core';
import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite240311Store } from '../../estados/tramite240311Store.store';

/**
 * Componente que encapsula la lógica para manejar la adición de proveedores y su interacción con el store del trámite.
 */
@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
/**
 * Clase que utiliza el store Tramite240311Store para gestionar el estado del trámite y actualizar la lista de proveedores.
 */
export class AgregarProveedorContenedoraComponent {
  /**
   * Evento que se emite para cerrar el componente contenedor.
   * Se utiliza para notificar al componente padre que se debe cerrar la ventana/modal de agregar proveedores.
   */
  @Output() cerrar = new EventEmitter<void>();

  /**
   * Constructor que inyecta el store Tramite240311Store para gestionar el estado del trámite.
   * El store administra el estado del trámite 240311.
   * @param tramite240311Store Instancia del store para manipular el estado de proveedores.
   */
  constructor(public tramite240311Store: Tramite240311Store) {}

  /**
   * Método que actualiza los datos de la tabla de proveedores en el store del trámite.
   * Recibe una lista de proveedores y la envía al store para su actualización.
   * @param event Lista de proveedores a actualizar en el store.
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite240311Store.updateProveedorTablaDatos(event);
  }
}