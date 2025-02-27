import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { InvocarActionService } from 'libs/shared/data-access-user/src/core/services/230401/invocar-action.service';

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
