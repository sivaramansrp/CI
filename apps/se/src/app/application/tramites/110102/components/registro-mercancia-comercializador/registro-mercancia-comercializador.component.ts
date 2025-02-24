import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosTratadosAcuerdosComponent } from "../datos-tratados-acuerdos/datos-tratados-acuerdos.component";

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";




@Component({
  selector: 'app-registro-mercancia-comercializador',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, DatosTratadosAcuerdosComponent],
  templateUrl: './registro-mercancia-comercializador.component.html',
  styleUrl: './registro-mercancia-comercializador.component.scss',
})
export class RegistroMercanciaComercializadorComponent {
  mercanciaAsociada:FormGroup;

  constructor(private fb:FormBuilder){

  this.mercanciaAsociada= this.fb.group({
      nombreComercial: [{ value: '', disabled: true }],
      nombreIngles: [{ value: '', disabled: true }],
      nombreTecnico: [{ value:'',
        disabled: true},Validators.maxLength(256)],
      fraccionArancelaria: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      })
      
    })
 
}
}