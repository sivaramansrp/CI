import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-fabricante/terceros-fabricante.component';

@Component({
  selector: 'app-terceros-fabricante',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-fabricante.component.html',
  styleUrl: './terceros-fabricante.component.scss',
})
export class TercerosFabricanteComponent {}
