/**
 * @component ConstanciaDelRegistroComponent
 * @description This component is responsible for handling the registration certificate form.
 * It includes a form for capturing registration certificate data and additional functionalities.
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
   * @property {FormGroup} forma - The form group for capturing registration certificate data.
   */
  forma!: FormGroup;

  /**
   * @property {string[]} selectRangoDias - Array of selectable day ranges.
   */
  selectRangoDias: string[] = [];

  /**
   * @property {boolean} colapsable - Boolean to control collapsible state.
   */
  colapsable: boolean = false;

  /**
   * @property {FormGroup} ConstanciaDelRegistro - The form group for registration certificate data.
   */
  ConstanciaDelRegistro!: FormGroup;
}