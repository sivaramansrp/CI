/**
 * @component ImportadorEnDestinoComponent
 * @description This component is responsible for handling the importer at destination form.
 * It includes a form for capturing importer data and additional functionalities.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormGroup } from '@angular/forms';
 */

import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'importador-en-destino',
  templateUrl: './importador-en-destino.component.html',
  styleUrl: './importador-en-destino.component.scss'
})
export class ImportadorEnDestinoComponent {
  /**
   * @property {FormGroup} forma - The form group for capturing importer data.
   */
  forma!: FormGroup;

  /**
   * @property {FormGroup} ConstanciaDelRegistro - The form group for registration certificate data.
   */
  ConstanciaDelRegistro!: FormGroup;
}