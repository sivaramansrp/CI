import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";


@Component({
  selector: 'app-datos-de-la-mercancia',
  standalone: true,
  imports: [CommonModule, TituloComponent,ReactiveFormsModule],
  templateUrl: './datos-de-la-mercancia.component.html',
  styleUrl: './datos-de-la-mercancia.component.scss',
})
export class DatosDeLaMercanciaComponent {


registroMercanciaComercializadorFrom: FormGroup;

  constructor(private fb: FormBuilder)
  {
    this.registroMercanciaComercializadorFrom = this.fb.group({
      cveRegistroProductor: ['', [Validators.required, Validators.maxLength(12)]],
    });
       
  }
  actualizaGridComercializadoresProductos():void{
    // use service logic
 }

}


