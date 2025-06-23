import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONSTANTES } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';


@Component({
  selector: 'pago-derechos',
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss'
})
export class PagoDerechosComponent {
  public pagoDerechos: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.pattern(CONSTANTES.EXP_CORREO)]]
  })
  constructor( private fb: FormBuilder) {}
}
