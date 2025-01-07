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

  public FormPersona: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.pattern(CONSTANTES.EXP_CORREO)]]
  })

  personas: Array<PersonaTerceros> = [];

  constructor( private fb: FormBuilder) {}

  agregaPersona(): void{
    if (this.personas.length < 5 && this.FormPersona.valid) {
      const datos = this.FormPersona.value;
      this.personas.push(datos);
      this.FormPersona.reset();
    } else {
      console.log('No puede agregar mas de cinco personas o el formato de la dirección correo no es valido');
    }
  }

  eliminar(i: number) {
    this.personas.splice(i, 1);
  }





}
