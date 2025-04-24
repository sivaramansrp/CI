import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { FORMULARIO_DATOS_GENERALES } from '../../enums/retorno-importacion-temporal.enum';

import { ModeloDeFormaDinamica, TituloComponent } from '@ng-mf/data-access-user';


@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, TituloComponent],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss',
})
export class DatosGeneralesComponent implements OnInit {
  datosGeneralesFormulario!: FormGroup;
  formularioDatosGenerales: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_GENERALES;
  constructor(private fb: FormBuilder) {//
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.datosGeneralesFormulario = this.fb.group({
    });
  }

}
