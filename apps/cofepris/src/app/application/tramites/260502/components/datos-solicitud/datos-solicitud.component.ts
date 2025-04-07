import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDeLaComponent } from '../../../../shared/components/datos-solicitud/datos-solicitud.component';

@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule, DatosDeLaComponent],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss',
})
export class DatosSolicitudComponent {
  isAvisoLicenciaVisible: boolean = false;
  isAduanasEntradaVisible: boolean = true;

}
