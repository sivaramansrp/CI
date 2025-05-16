import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TABLA_ORDEN } from '../../constantes/permiso-vegetales-nutrientes.enum';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-fabricante/terceros-fabricante.component';

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
  /**
   * Constante que define el orden de la tabla para los terceros relacionados.
   * Se utiliza para mostrar la tabla en el componente TercerosRelacionadosComponent.
   */
  tablaOrden = TABLA_ORDEN;
}
