
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { TableComponent } from '@ng-mf/data-access-user';
/**
 * Componente que gestiona el pago de derechos en el sistema.
 * 
 * Este componente permite gestionar el proceso de pago de derechos, incluyendo la captura de datos relacionados
 * con la clave de referencia, la dependencia, el banco, la llave de pago, la fecha de pago y el importe.
 * 
 * @component PagoDeDerechosComponent
 * @description Componente para gestionar el pago de derechos en el sistema.
 * 
 * @example
 * ```ts
 * const componente = new PagoDeDerechosComponent(formBuilder);
 * componente.submitPagoDeDerechos();
 * ```
 */
@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, TituloComponent, TableComponent, ReactiveFormsModule],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent {
  
  /**
   * Formulario para gestionar el pago de derechos.
   * 
   * Este formulario incluye los campos necesarios para realizar un pago de derechos, como la clave de referencia,
   * la cadena de la dependencia, el banco, la llave de pago, la fecha de pago y el importe de pago.
   * 
   * @property {FormGroup} pagoDerechos
   * @public
   * @type {FormGroup}
   */
  public pagoDerechos: FormGroup = this.fb.group({
    claveDeReferncia: ['', [Validators.required]],
    cadenaDeLaDependencia: ['', [Validators.required]],
    banco: ['', [Validators.required]],
    llaveDePago: ['', [Validators.required]],
    fechaDePago: ['', [Validators.required]],
    importeDePago: ['', [Validators.required]],
  });

  /**
   * Constructor para inicializar el formulario.
   * 
   * @constructor
   * @param {FormBuilder} fb - Constructor que se utiliza para inicializar el formulario de pago de derechos.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Envía el formulario de pago de derechos y muestra los valores en la consola.
   * 
   * Este método se ejecuta cuando el formulario es enviado. Muestra los valores del formulario en la consola
   * para su verificación.
   * 
   * @method submitPagoDeDerechos
   * @description Envía el formulario de pago de derechos y muestra los valores en la consola.
   */
  submitPagoDeDerechos() {
    console.log(this.pagoDerechos.value);
  }
}
