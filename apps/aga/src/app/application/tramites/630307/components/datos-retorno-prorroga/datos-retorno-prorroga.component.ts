import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFecha, REGEX_PATRON_ALFANUMERICO, TituloComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';

import { FECHA_INICIO_PRORROGA, FECHA_VENCIMIENTO_PRORROGA } from '../../enum/retorno-importacion-temporal.enum';
@Component({
  selector: 'app-datos-retorno-prorroga',
  standalone: true,
  imports: [CommonModule, TituloComponent, InputFechaComponent, ReactiveFormsModule],
  templateUrl: './datos-retorno-prorroga.component.html',
  styleUrl: './datos-retorno-prorroga.component.scss',
})
export class DatosRetornoProrrogaComponent{

  inputFechaInicioProrroga: InputFecha = FECHA_INICIO_PRORROGA
  inputFechaVencimientoProrroga: InputFecha = FECHA_VENCIMIENTO_PRORROGA

  cambioFechaVencimientoProrroga(nuevo_valor: string): void {
    this.datosImportacionRetornoProrrogaGeneralFormulario.patchValue({
      fechaVencimientoProrroga: nuevo_valor,
    });
  }
  cambioFechaInicioProrroga(nuevo_valor: string): void {
    this.datosImportacionRetornoProrrogaGeneralFormulario.patchValue({
      fechaInicioProrroga: nuevo_valor,
    });
  }

  datosImportacionRetornoProrrogaGeneralFormulario!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.datosImportacionRetornoProrrogaGeneralFormulario = this.fb.group({
      folioInformacionGeneralProrroga: [
        '',
        [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO)],
      ],
      fechaInicioProrroga: ['', Validators.required],
      fechaVencimientoProrroga: ['', Validators.required],
    });
  }
}
