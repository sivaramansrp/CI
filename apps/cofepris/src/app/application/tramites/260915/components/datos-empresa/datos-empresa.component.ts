import { Component } from '@angular/core';
import { ALERT } from '../../constants/constantes.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { TituloComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente que representa los datos de la empresa en un proceso de múltiples pasos.
 * 
 * @selector app-datos-empresa
 * @standalone true
 * @imports [
 *   CommonModule,
 *   AlertComponent,
 *   InputRadioComponent,
 *   ReactiveFormsModule,
 *   TituloComponent
 * ]
 * @templateUrl ./datos-empresa.component.html
 * @styleUrl ./datos-empresa.component.scss
 */

/**
 * Componente que representa los datos de la empresa en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    TituloComponent,
  ],
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss'],
})
export class DatosEmpresaComponent {
  /**
   * Indica si el formulario es colapsable.
   */
  colapsable: boolean = true;

  /**
   * Textos de alerta.
   */
  TEXTOS = ALERT;
  
  /**
   * Método para mostrar u ocultar el formulario colapsable.
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

}
