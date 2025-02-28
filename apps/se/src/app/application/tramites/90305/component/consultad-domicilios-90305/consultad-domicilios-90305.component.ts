/**
 * component ConsultadDomicilios90305Component
 * @description
 * Este componente permite la consulta de domicilios relacionados con Prosec.
 * Utiliza un formulario reactivo con un campo de selección de estado basado en un catálogo.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { CatalogoSelectComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Catalogo } from '@ng-mf/data-access-user';
import estado from '../../../../../../../../../libs/shared/theme/assets/json/90305/estado.json';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @selector app-consultad-domicilios-90305
 * @standalone true
 */
@Component({
  selector: 'app-consultad-domicilios-90305',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './consultad-domicilios-90305.component.html',
  styleUrl: './consultad-domicilios-90305.component.scss',
})
export class ConsultadDomicilios90305Component implements OnInit {
  /** Catálogo de estados cargado desde un archivo JSON */
  estadoJson: Catalogo[] = estado;

  /** Formulario reactivo para la consulta de domicilios */
  formConsulta!: FormGroup;

  /**
   * constructor
   * @param {FormBuilder} fb - Constructor de formularios reactivos
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Método del ciclo de vida de Angular - inicializa el componente y configura el formulario
   */
  ngOnInit(): void {
    this.formConsulta = this.fb.group({
      estadoControl: [
        {
          disabled: false,
        },
        Validators.required,
      ],
    });
  }
}
