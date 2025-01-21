import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaTerceros } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { CONSTANTES } from '../../../../shared/constantes/servicios-extraordinarios.enum';

@Component({
  selector: 'terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.scss'
})
export class TercerosComponent {

  public FormTercero: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.pattern(CONSTANTES.EXP_CORREO)]]
  })


  constructor( private fb: FormBuilder) {}

  agregaPersona(): void{

  }





}
