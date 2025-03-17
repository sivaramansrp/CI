import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProyectoImmexComponent } from '../../../../shared/components/proyecto-immex/proyecto-immex.component';

@Component({
  selector: 'app-proyecto-immex-vista',
  standalone: true,
  imports: [CommonModule, ProyectoImmexComponent],
  templateUrl: './proyecto-immex-vista.component.html',
  styleUrl: './proyecto-immex-vista.component.scss',
})
export class ProyectoImmexVistaComponent {}
