import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";




@Component({
  selector: 'app-registro-mercancia-comercializador',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './registro-mercancia-comercializador.component.html',
  styleUrl: './registro-mercancia-comercializador.component.scss',
})
export class RegistroMercanciaComercializadorComponent {
  mercanciaAsociada:FormGroup;

  constructor(private fb:FormBuilder){

  this.mercanciaAsociada= this.fb.group({
      nombreComercial: [{ value: '', disabled: true }],
      nombreIngles: [{ value: '', disabled: true }],
      nombreTecnico: [{ value:'',disabled: true}],
      fraccionArancelaria: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      })
      
    })
 
}
}