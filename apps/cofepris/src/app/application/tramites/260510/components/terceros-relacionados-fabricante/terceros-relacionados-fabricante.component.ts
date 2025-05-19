import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-fabricante/terceros-fabricante.component';
import { TABLA_ORDEN } from '../../constantes/permiso-pruebas-nutrientes.enum';

/**
 * Componente que muestra la sección de Terceros Relacionados.
 * Esta sección es común para todos los trámites.
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
