import { Component } from '@angular/core';
import { ADUANA_DE_INGRESO, TEXTOS } from '../../../../shared/constantes/issuance-extension-modification.enum';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent {
  TEXTOS: string = TEXTOS;
  selectRangoDias: Array<string> = [];
  colapsable: boolean = false;
  despachoLDA: any = ADUANA_DE_INGRESO;
  constructor(private readonly fb: FormBuilder) {

  }

  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }
}
