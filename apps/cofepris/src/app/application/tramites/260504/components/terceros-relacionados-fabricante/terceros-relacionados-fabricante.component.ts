import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TABLA_ORDEN } from '../../constantes/permiso-sujetos.enum';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-fabricante/terceros-fabricante.component';

/**
 * Componente `TercerosRelacionadosFabricanteComponent`
 *
 * Este componente es responsable de gestionar la interfaz de usuario para mostrar y manejar
 * los datos relacionados con los terceros fabricantes asociados a un trámite.
 *
 * Es un componente independiente (`standalone`) que utiliza el módulo común de Angular (`CommonModule`)
 * y el componente `TercerosRelacionadosComponent` para mostrar información específica de los terceros.
 */
@Component({
  selector: 'app-terceros-relacionados-fabricante',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-relacionados-fabricante.component.html',
  styleUrl: './terceros-relacionados-fabricante.component.scss',
})
export class TercerosRelacionadosFabricanteComponent {
  // Propiedad que almacena la constante TABLA_ORDEN para definir el orden de la tabla.
  tablaOrden = TABLA_ORDEN;
}
