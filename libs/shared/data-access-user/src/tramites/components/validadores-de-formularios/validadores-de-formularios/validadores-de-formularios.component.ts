import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Validadores } from '../../../../core/models/shared/forms-model';

/**
 * ValidadoresDeFormulariosComponent es un componente que permite la validación
 * de formularios en el contexto de trámites. Este componente utiliza formularios
 * reactivos de Angular para manejar y validar los datos de manera eficiente.
 * Además, soporta la integración con validadores personalizados para proporcionar
 * mensajes de error dinámicos y configurables.
 * 
 * @component
 * @selector validadores-de-formularios
 * @standalone true
 * @imports [CommonModule]
 * @templateUrl ./validadores-de-formularios.component.html
 * @styleUrl ./validadores-de-formularios.component.scss
 */
@Component({
  selector: 'validadores-de-formularios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validadores-de-formularios.component.html',
  styleUrl: './validadores-de-formularios.component.scss',
})

export class ValidadoresDeFormulariosComponent {

  /**
   * compo doc
   * @input forma
   * @type {FormGroup}
   * @memberof ValidadoresDeFormulariosComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  @Input () forma!: FormGroup;

  /**
   * compo doc
   * @input controlDeFormulario
   * @type {string}
   * @memberof ValidadoresDeFormulariosComponent
   * @description
   * entrada de control de formulario
   */
  @Input() controlDeFormulario!: string;

  /**
   * compo doc
   * @input validadores
   * @type {Validadores[]}
   * @memberof ValidadoresDeFormulariosComponent
   * @description
   * entrada de matriz de validadores de tipo Validadaores que 
   * consta de una colección de objetos de tipo tipo, valor y mensaje
   */
  @Input() validadores!: Validadores[];

  /**
  * @input setMinHeight
  * @type {boolean}
  * @memberof ValidadoresDeFormulariosComponent
  * @description
  * Esta propiedad de entrada permite establecer si el componente debe aplicar 
  * una altura mínima. Por defecto, está configurada como `true`.
  */
@Input() setMinHeight: boolean = false;
}
