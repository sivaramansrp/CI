import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONSTANTES } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';


@Component({
  selector: 'despacho-mercancias-solicitud',
  templateUrl: './despacho-mercancias-solicitud.component.html',
  styleUrl: './despacho-mercancias-solicitud.component.scss'
})
export class DespachoMercanciasSolicitudComponent {
  public formDespacho: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.pattern(CONSTANTES.EXP_CORREO)]]
  })


  constructor( private fb: FormBuilder) {}
}
