import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-constancia-del-registro',
  templateUrl: './constancia-del-registro.component.html',
  styleUrl: './constancia-del-registro.component.scss'
})
export class ConstanciaDelRegistroComponent {
  forma!: FormGroup;
  selectRangoDias: string[] = [];
  colapsable: boolean = false;
  ConstanciaDelRegistro!: FormGroup;

}
