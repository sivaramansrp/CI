import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'pago-derechos',
  templateUrl: './pago-derechos.component.html',
  styleUrls: ['./pago-derechos.component.scss']
})
export class PagoDerechosComponent {
  public pagoDerechos!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearPagoDerechosForm();
  }

  /**
   * Crea el formulario para la captura de pago de derechos
   */
  crearPagoDerechosForm() {
    this.pagoDerechos = this.fb.group({
      claveReferencia: ['', Validators.required],
      cadenaDependencia: [''],
      banco: [''],
      llavePago: [''],
      fechaPago: ['', Validators.required],
      importePago: [
        '',
        [Validators.required, Validators.min(0.01)]
      ]
    });
  }

  /**
   * Borra los datos del formulario de pago de derechos
   */
  borrarDatosPago() {
    this.pagoDerechos.reset();
  }
}