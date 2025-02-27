import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { InvocarActionService } from 'libs/shared/data-access-user/src/core/services/230401/invocar-action.service';

/**
 * Validador de fecha que verifica si el valor del control sigue el formato dd/mm/yyyy.
 * 
 * @returns {ValidatorFn} Una función de validador que toma un AbstractControl y devuelve un objeto de error o null.
 */
export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = /^\d{2}\/\d{2}\/\d{4}$/.test(control.value);
    return isValid ? null : { 'invalidDate': { value: control.value } };
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
  constructor(public invocarService: InvocarActionService, private fb: FormBuilder) {
    this.createPagoDerechos();
    this.invocarService.initicializaPagoDerechosCatalogo();
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
