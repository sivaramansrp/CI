import { Component } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/issuance-extension-modification.enum';
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
  constructor(private readonly fb: FormBuilder) {

  }

  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }
}
