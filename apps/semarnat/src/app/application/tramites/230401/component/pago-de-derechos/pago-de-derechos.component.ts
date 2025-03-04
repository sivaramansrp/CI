/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PantallasActionService } from '../../services/pantallas-action.service';
import { REGEX_FECHA_VALIDA } from '@libs/shared/data-access-user/src';
/**
 * Validador de fecha que verifica si el valor del control sigue el formato dd/mm/yyyy.
 * 
 * @returns {ValidatorFn} Una función de validador que toma un AbstractControl y devuelve un objeto de error o null.
 */
export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string] : any } | null => {
    const IS_VALID = REGEX_FECHA_VALIDA.test(control.value);
    return IS_VALID ? null : { 'invalidDate': { value: control.value } };
  };
}

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss'
})
export class PagoDeDerechosComponent implements OnInit {
  public pagoDerechos!: FormGroup;
  public clasificacion: string = '';
  constructor(public pantallasService: PantallasActionService, private fb: FormBuilder) {
    this.createPagoDerechos();
    this.pantallasService.inicializaPagoDerechosCatalogo();
  }

  /**
   * Crea y configura el formulario de pago de derechos.
   * Los campos 'clave', 'dependencia', 'llavePago' e 'importePago' están deshabilitados por defecto.
   * Los campos 'banco' y 'fecha' son obligatorios.
   */
  ngOnInit(): void {
    this.createPagoDerechos();
  }
  /**
   * Este método inicializa el formulario `pagoDerechos` con varios campos predefinidos
   * y sus respectivas validaciones. Algunos campos están deshabilitados y tienen valores
   * predeterminados.
   * Campos del formulario:
   * - clave: Clave del trámite, deshabilitado y con valor predeterminado.
   * - dependencia: Dependencia correspondiente, deshabilitado y con valor predeterminado.
   * - banco: Banco donde se realizará el pago, requerido.
   * - llavePago: Llave de pago, deshabilitado y con valor predeterminado.
   * - fecha: Fecha del pago, requerido y validado con `dateValidator`.
   * - importePago: Importe del pago, deshabilitado y con valor predeterminado.
    */
  createPagoDerechos(): void {
    this.pagoDerechos = this.fb.group({
      clave: [{ value: '084001963', disabled: true }],
      dependencia: [{ value: '0100160910791', disabled: true }],
      banco: ['', [Validators.required]],
      llavePago: [{ value: '12345LLPCI', disabled: true }],
      fecha: ['', [Validators.required, dateValidator()]],
      importePago: [{ value: '1842', disabled: true }],
    });
  }

  /**
   * Método para manejar la selección de clasificación.
   */
  clasificacionSeleccione(): void {
    this.clasificacion = this.pagoDerechos.get('banco')?.value;
  }

}
