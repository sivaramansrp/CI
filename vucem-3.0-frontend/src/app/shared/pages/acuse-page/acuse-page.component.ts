import { Component } from '@angular/core';
import {
  ACUSE_SERVICIOS_EXTRAORDINARIOS,
} from '../../constantes/servicios-extraordinarios.enum';
import { DatosPageAcuse } from '../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { AcuseComponent } from '../../components/acuse/acuse.component';

@Component({
  templateUrl: './acuse-page.component.html',
  styles: ``,
  standalone: true,
  imports: [
    CommonModule,
    AcuseComponent,
  ],
})
export class AcusePageComponent {
  datosPageAcuse: DatosPageAcuse = ACUSE_SERVICIOS_EXTRAORDINARIOS;

  folio = '123456'; // Lo traemos de los estados
}
