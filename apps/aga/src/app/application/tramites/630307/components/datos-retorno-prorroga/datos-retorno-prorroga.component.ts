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
export class DatosRetornoProrrogaComponent {
  /**
   * Configuración para el campo de fecha de inicio de la prórroga.
   */
  inputFechaInicioProrroga: InputFecha = FECHA_INICIO_PRORROGA;

  /**
   * Configuración para el campo de fecha de vencimiento de la prórroga.
   */
  inputFechaVencimientoProrroga: InputFecha = FECHA_VENCIMIENTO_PRORROGA;

  /**
   * Formulario reactivo para capturar los datos generales de la prórroga.
   */
  datosImportacionRetornoProrrogaGeneralFormulario!: FormGroup;

  /**
   * Constructor del componente.
   * Inicializa el formulario reactivo con validaciones para los campos requeridos.
   */
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

  /**
   * Maneja el cambio en la fecha de vencimiento de la prórroga.
   * Actualiza el valor del campo `fechaVencimientoProrroga` en el formulario.
   */
  cambioFechaVencimientoProrroga(nuevo_valor: string): void {
    this.datosImportacionRetornoProrrogaGeneralFormulario.patchValue({
      fechaVencimientoProrroga: nuevo_valor,
    });
  }

  /**
   * Maneja el cambio en la fecha de inicio de la prórroga.
   * Actualiza el valor del campo `fechaInicioProrroga` en el formulario.
   */
  cambioFechaInicioProrroga(nuevo_valor: string): void {
    this.datosImportacionRetornoProrrogaGeneralFormulario.patchValue({
      fechaInicioProrroga: nuevo_valor,
    });
  }
}
