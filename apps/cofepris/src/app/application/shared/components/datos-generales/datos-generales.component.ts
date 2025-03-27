import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import TipoPersonaBtn from 'libs/shared/theme/assets/json/260402/tipoPersonaBtn.json'
@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [TituloComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss'
})
export class DatosGeneralesComponent implements OnInit {
  @Output() formularioGuardar = new EventEmitter<any>();
  @Output() cancelDatosGenerales = new EventEmitter<void>();
  radioBtn = TipoPersonaBtn
  datosGeneralesForm!: FormGroup;

  closeDatosGenerales(): void {
    this.cancelDatosGenerales.emit();
  }


  ngOnInit(): void {
    this.informacionProcedencia()
  }

  informacionProcedencia(): void {
    this.datosGeneralesForm = new FormGroup({
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
      correoElectronico: new FormControl('', [Validators.email]),
      nombre: new FormControl(''),
      primerApellido: new FormControl(''),
      segundoApellido: new FormControl(''),
    });
  }

  enviarFormulario(): void {
    if (this.datosGeneralesForm.valid) {
      this.formularioGuardar.emit(this.datosGeneralesForm.value);
    }
  }
}