import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-proveedor-por-archivo-vista',
  standalone: true,
  imports: [CommonModule, AnexarDocumentosComponent],
  templateUrl: './proveedor-por-archivo-vista.component.html',
  styleUrl: './proveedor-por-archivo-vista.component.scss',
})
export class ProveedorPorArchivoVistaComponent {}
