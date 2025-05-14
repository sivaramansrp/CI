import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-proveedor-por-archivo-vista',
  standalone: true,
  imports: [CommonModule, AnexarDocumentosComponent],
  templateUrl: './proveedor-por-archivo-vista.component.html',
  styleUrl: './proveedor-por-archivo-vista.component.scss',
})
/**
 * Componente para la vista de proveedores por archivo.
 * Este componente permite gestionar la visualización y anexar documentos relacionados con los proveedores.
 *
 * @export ProveedorPorArchivoVistaComponent
 */
export class ProveedorPorArchivoVistaComponent {

  /**
   * Constructor del componente.
   * @param ubicaccion Servicio de ubicación para navegación.
   */
  constructor( private ubicaccion: Location){
    //El constructor requiere inyección de dependencias, pero se ha mantenido vacío debido a una regla de ESLint.
  }

  /**
   * Método para regresar al anexo I.
   */
  regrsarAnnexoI(): void {
    this.ubicaccion.back();
  }
}
