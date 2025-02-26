

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * Componente `PagoDeDerechosComponent`
 * 
 * Este componente se encarga de gestionar un formulario para la solicitud de pago de derechos.
 * El formulario contiene campos como la línea y el monto del pago. Al inicializarse, se configura el formulario
 * y se establece un valor predeterminado para el campo 'monto', deshabilitándolo.
 * 
 * @component
 * @example
 * <app-pago-de-derechos></app-pago-de-derechos>
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  standalone: true,
  imports: [TituloComponent, SelectCatalogosComponent, ReactiveFormsModule]
})
export class PagoDeDerechosComponent implements OnInit {

  /** 
   * Formulario reactivo que contiene los campos de datos del importador/exportador.
   * El formulario incluye un campo 'Linea' y un campo 'monto' con validaciones de 'required'.
   * 
   * @type {FormGroup}
   */
  FormSolicitud!: FormGroup;

  /**
   * Constructor del componente `PagoDeDerechosComponent`.
   * 
   * Inicializa la instancia de `FormBuilder` para crear formularios reactivos.
   * 
   * @param {FormBuilder} fb - Instancia de FormBuilder utilizada para construir formularios reactivos.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Método del ciclo de vida `ngOnInit()`.
   * Este método se ejecuta cuando el componente se inicializa y realiza las siguientes acciones:
   * - Inicializa el formulario reactivo `FormSolicitud` con dos campos: `Linea` y `monto`.
   * - Llama al método `updateformfied()` para configurar el campo 'monto', deshabilitándolo y estableciendo un valor predeterminado.
   * 
   * @memberof PagoDeDerechosComponent
   */
  ngOnInit(): void {
    // Inicializa el formulario con validaciones requeridas
    this.FormSolicitud = this.fb.group({
      pagodederechos: this.fb.group({
        Linea: ['', Validators.required],
        monto: ['', Validators.required]
      })
    });

    // Llama al método para actualizar el campo 'monto'
    this.updateformfied();
  }

  /**
   * Método `updateformfied()`.
   * Este método se encarga de actualizar el campo 'monto' dentro del formulario:
   * - Deshabilita el campo 'monto'.
   * - Establece el valor predeterminado de 'monto' a '4845'.
   * 
   * @memberof PagoDeDerechosComponent
   */
  updateformfied(): void {
    // Deshabilita el campo 'monto' y asigna el valor '4845'
    this.FormSolicitud.get('pagodederechos.monto')?.disable();
    this.FormSolicitud.get('pagodederechos.monto')?.setValue('4845');
  }
}
