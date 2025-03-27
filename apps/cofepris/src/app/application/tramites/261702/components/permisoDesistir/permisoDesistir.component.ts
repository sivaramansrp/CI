import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormularioDinamicoComponent } from '../formularioDinamico/formularioDinamico.component';
import { PERMISO_A_DESISTIR } from '../../constantes/retiros-cofepris.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'permiso-desistir',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    FormularioDinamicoComponent
  ],
  templateUrl: './permisoDesistir.component.html',
  styleUrl: './permisoDesistir.component.scss',
})
export class PermisoDesistirComponent {
  public permisoDesistirFormData = PERMISO_A_DESISTIR;
}
