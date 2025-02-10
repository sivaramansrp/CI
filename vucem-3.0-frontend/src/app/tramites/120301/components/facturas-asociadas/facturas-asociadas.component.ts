import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-facturas-asociadas',
  templateUrl: './facturas-asociadas.component.html',
  styleUrl: './facturas-asociadas.component.scss'
})
export class FacturasAsociadasComponent {
  forma!: FormGroup;
  selectRangoDias: string[] = [];
  colapsable: boolean = false;
  ConstanciaDelRegistro!: FormGroup;
}
