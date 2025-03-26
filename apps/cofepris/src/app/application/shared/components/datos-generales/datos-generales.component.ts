import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
 import TipoPersonaBtn from 'libs/shared/theme/assets/json/260402/tipoPersonaBtn.json'
@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [TituloComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    ReactiveFormsModule
  ],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss'
})
export class DatosGeneralesComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  modalForm!: FormGroup;
  closeModal() {
    this.close.emit(); // Notify the parent component to close the datos-generales
  }

  clearFields() {
  }
  
  radioBtn = TipoPersonaBtn

  ngOnInit():void{
    this.modalForm = new FormGroup({
      tipoPersona: new FormControl('', Validators.required),
      razonSocial: new FormControl('', Validators.required),
      pais: new FormControl('', Validators.required),
      estado: new FormControl(''),
      codigoPostal: new FormControl(''),
      calle: new FormControl('', Validators.required),
      numeroExterior: new FormControl('', Validators.required),
      numeroInterior: new FormControl(''),
      lada: new FormControl(''),
      telefono: new FormControl(''),
      correoElectronico: new FormControl('', [Validators.email])
    });
  }
}