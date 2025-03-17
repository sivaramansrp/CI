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
export class ContenedorProveedorClienteComponent {}
