import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FederatariosYPlantasComponent } from '../../../../shared/components/federatarios-y-plantas/federatarios-y-plantas.component';

@Component({
  selector: 'app-federatarios-y-plantas-vista',
  standalone: true,
  imports: [CommonModule, FederatariosYPlantasComponent],
  templateUrl: './federatarios-y-plantas-vista.component.html',
  styleUrl: './federatarios-y-plantas-vista.component.css',
})
export class FederatariosYPlantasVistaComponent {}
