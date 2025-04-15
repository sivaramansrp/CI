import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-fabricante/terceros-fabricante.component';
import { TABLA_ORDEN } from '../../constantes/permiso-sujetos.enum';

@Component({
  selector: 'app-terceros-relacionados-fabricante',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-relacionados-fabricante.component.html',
  styleUrl: './terceros-relacionados-fabricante.component.scss',
})
export class TercerosRelacionadosFabricanteComponent {
  tablaOrden = TABLA_ORDEN;
}
