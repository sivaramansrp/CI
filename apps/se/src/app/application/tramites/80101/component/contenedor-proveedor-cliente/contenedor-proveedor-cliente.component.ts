import { AnexoUnoEncabezado, ProveedorClienteTabla } from '../../../../shared/models/nuevo-programa-industrial.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProveedorClienteComponent } from '../../../../shared/components/proveedor-cliente/proveedor-cliente.component';

@Component({
  selector: 'app-contenedor-proveedor-cliente',
  standalone: true,
  imports: [CommonModule,ProveedorClienteComponent],
  templateUrl: './contenedor-proveedor-cliente.component.html',
  styleUrl: './contenedor-proveedor-cliente.component.scss',
})
export class ContenedorProveedorClienteComponent {
  /**
   * Propiedad que representa los datos de la tabla de fracciones 
   * asociados al encabezado del Anexo Uno.
   * 
   * @type {AnexoUnoEncabezado}
   */
  fraccionTablaDatos!:AnexoUnoEncabezado;
  /**
   * Arreglo que almacena los datos del proveedor en forma de objetos de tipo ProveedorClienteTabla.
   * Este arreglo se utiliza para gestionar y mostrar la información relacionada con los proveedores.
   */
  datosDelProveedor:ProveedorClienteTabla[]=[];

  /**
   * Método que actualiza los datos del proveedor o cliente con la información proporcionada.
   * 
   * @param $event - Arreglo de objetos de tipo `ProveedorClienteTabla` que contiene los datos actualizados.
   */
  public datosActualizadosProveedorCliente($event: ProveedorClienteTabla[]): void {
    this.datosDelProveedor = $event;
  }

}
