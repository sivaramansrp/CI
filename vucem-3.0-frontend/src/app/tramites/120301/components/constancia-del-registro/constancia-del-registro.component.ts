/**
 * @component ConstanciaDelRegistroComponent
 * @description Este componente es responsable de manejar el formulario del certificado de registro.
 * Incluye un formulario para capturar los datos del certificado de registro y funcionalidades adicionales.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-constancia-del-registro',
  templateUrl: './constancia-del-registro.component.html',
  styleUrl: './constancia-del-registro.component.scss'
})
export class ConstanciaDelRegistroComponent {
  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos del certificado de registro.
   */
  forma!: FormGroup;

  /**
   * @property {string[]} selectRangoDias - Array de rangos de días seleccionables.
   */
  selectRangoDias: string[] = [];

  /**
   * @property {boolean} colapsable - Booleano para controlar el estado colapsable.
   */
  colapsable: boolean = false;

  /**
   * @property {FormGroup} ConstanciaDelRegistro - El grupo de formularios para los datos del certificado de registro.
   */
  ConstanciaDelRegistro!: FormGroup;
}