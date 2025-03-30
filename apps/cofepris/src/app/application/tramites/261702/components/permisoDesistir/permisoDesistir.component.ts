import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormularioDinamicoComponent } from '../formularioDinamico/formularioDinamico.component';
import { PERMISO_A_DESISTIR } from '../../constantes/retiros-cofepris.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';
/**
 * PermisoDesistirComponent es un componente que muestra alertas y títulos
 * relacionados con los manifiestos y declaraciones en el contexto de trámites.
 * 
 * @component
 */
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
  /**
   * compo doc
   * Constantes importadas desde el archivo de enumeración que contienen textos clave y mensajes de advertencia
   * utilizados en el contexto de los trámites relacionados con permisos a desistir.
   * @memberof PermisoDesistirComponent
   */
  public permisoDesistirFormData = PERMISO_A_DESISTIR;
  
}
