import { ALERT } from '../../enums/datos-de-la-solicitud-260904.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/datos-de-la-solicitud-260904.enum';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-de-la-solicitud-260904',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './datos-de-la-solicitud-260904.component.html',
  styleUrl: './datos-de-la-solicitud-260904.component.scss',
})
export class DatosDeLaSolicitud260904Component implements OnInit {
  colapsable: boolean = true;
  TEXTOS = ALERT;
  btonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
  form!: FormGroup;
  datosDelEstablecimiento!: FormGroup;

  constructor(private fb: FormBuilder) {
    // Constructor
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      btonDeRadio: ['', [Validators.required]],
      justificación: ['', [Validators.required]],
    });

    this.datosDelEstablecimiento = this.fb.group({
      rfcDel:  ['', Validators.required],
      denominacion: ['', Validators.required],
      correo: ['', Validators.required],
    });
  }

  toggleFormControls() {
    Object.keys(this.datosDelEstablecimiento.controls).forEach(
      (controlName) => {
        const CONTROL = this.datosDelEstablecimiento.get(controlName);
        if (CONTROL?.disabled) {
          CONTROL.enable();
        }
      }
    );
  }
}
