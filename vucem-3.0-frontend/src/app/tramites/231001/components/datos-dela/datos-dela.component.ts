/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @file datos-dela.component.ts
 * @brief Componente Angular para el formulario de datos de la solicitud.
 */

@Component({
  selector: 'app-datos-dela',
  templateUrl: './datos-dela.component.html',
  styleUrls: ['./datos-dela.component.scss'],
})
export class DatosDelaComponent {

  /**
   * @property comboAutorizacionIMMEX
   * @type any[]
   * @description Arreglo para almacenar las opciones del combo de autorización IMMEX. Actualmente no se utiliza en el código proporcionado, pero se declara.
   */
  comboAutorizacionIMMEX: any[] = [];

  /**
   * @property solicitudForm
   * @type {FormGroup}
   * @description FormGroup que contiene el formulario de solicitud.
   */
  solicitudForm: FormGroup;

  /**
   * @constructor
   * @param {FormBuilder} fb - Servicio FormBuilder para la creación de formularios.
   */
  constructor(private fb: FormBuilder) {
    /**
     * @description Inicialización del formulario de solicitud con validadores requeridos.
     */
    this.solicitudForm = this.fb.group({
      datosdelForm: this.fb.group({
        /**
         * @property numeroRegistroAmbiental
         * @type {FormControl}
         * @description Control para el número de registro ambiental.
         * @required
         */
        numeroRegistroAmbiental: ['', Validators.required],
        /**
         * @property descripcionGenerica1
         * @type {FormControl}
         * @description Control para la descripción genérica 1.
         * @required
         */
        descripcionGenerica1: ['', Validators.required],
        /**
         * @property numeroProgramaImmex
         * @type {FormControl}
         * @description Control para el número de programa IMMEX.
         * @required
         */
        numeroProgramaImmex: ['', Validators.required],
      })
    });
  }

  /**
   * @method isInvalid
   * @param {string} id - Identificador del control del formulario.
   * @returns {boolean | null} Verdadero si el control es inválido y ha sido tocado, falso en caso contrario.
   * @description Verifica si un control del formulario es inválido y ha sido interactuado por el usuario.
   */
  isInvalid(id: string): boolean | null {
    const control = this.solicitudForm.get('datosdelForm').get(id);
    return control?.invalid && control?.touched;
  }

  /**
   * @method onSubmit
   * @description Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.solicitudForm.valid) {
      console.log('Formulario Enviado!', this.solicitudForm.value);
    } else {
      console.log('El formulario es inválido');
    }
  }
}