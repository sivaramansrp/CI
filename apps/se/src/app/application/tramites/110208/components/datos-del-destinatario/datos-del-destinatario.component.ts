import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-del-destinatario',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TituloComponent
  ],
  templateUrl: './datos-del-destinatario.component.html',
  styleUrl: './datos-del-destinatario.component.css',
})
export class DatosDelDestinatarioComponent implements OnInit{

  datosDestinatario!:FormGroup

  constructor(
        private fb: FormBuilder
      ) {
        // Dependencia inyectada para uso posterior
      }

  ngOnInit(): void {
    this.datosDestinatario = this.fb.group({
      nombres:[],
      primerApellido:[],
      segundoApellido:[],
      numeroFiscal:['',Validators.required],
      razonSocial:[{value:'',disabled:true}]
    })
  }
}
