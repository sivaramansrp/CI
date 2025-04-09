import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';

@Component({
  selector: 'app-terceros-relacionados-contenedora',
  standalone: true,
  imports: [CommonModule, TercerosRelacionadosComponent],
  templateUrl: './terceros-relacionados-contenedora.component.html',
  styleUrl: './terceros-relacionados-contenedora.component.css',
})
export class TercerosRelacionadosContenedoraComponent {}
