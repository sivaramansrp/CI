/**
 * @module UsoEspicificoComponent
 * @description Componente para el formulario de Uso Específico, permitiendo al usuario ingresar información sobre el uso específico de un producto, incluyendo la fracción arancelaria y una descripción.
 */

import { Component, OnInit } from '@angular/core';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from "libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";

import fraccionOptionJson from 'libs/shared/theme/assets/json/130102/fracciónarancelaria-options.json';

import { CommonModule } from '@angular/common';

import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';

@Component({
  selector: 'app-uso-espicifico',
  standalone: true,
  imports: [TituloComponent, CatalogoSelectComponent, TableComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './uso-espicifico.component.html',
  styleUrl: './uso-espicifico.component.scss'
})
export class UsoEspicificoComponent implements OnInit {

  /**
   * @description Formulario para el uso específico.
   * @type {FormGroup}
   */
  usoEspicificoForm!: FormGroup;

  /**
   * @description Columnas para la tabla de fracciones arancelarias.
   * @type {string[]}
   */
  tableColumns = [
    'Fracción arancelaria',
    'Descripción'
  ];

  /**
   * @description Datos de ejemplo para la tabla.
   * @type {any[]}
   */
  tableData = [
    {
      tbodyData: [
        '980200011',
        'Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizará la mercancía a importar) ',
      ]
    },
    {
      tbodyData: [
        '01039101',
        'Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizara ta mercancia a importar) ',
      ]
    }
  ];

  /**
   * @description Opciones del catálogo de fracción arancelaria.
   * @type {Catalogo[]}
   */
  catalogos: Catalogo[] = fraccionOptionJson;

  /**
   * @constructor
   * @param {FormBuilder} formbuilt Servicio para construir el formulario.
   */
  constructor(private formbuilt: FormBuilder) { }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y configura el formulario con reglas de validación.
   * @memberof UsoEspicificoComponent
   */
  ngOnInit(): void {
    this.usoEspicificoForm = this.formbuilt.group({
      fracciónarancelaria: ['', Validators.required],
      descripción: [{ value: '', disabled: true }]
    });
  }

  /**
   * @method obtenerRequisitosFraccionArancelariaEsquema
   * @description Actualiza el formulario con el ID y la descripción de la fracción arancelaria seleccionada.
   * @memberof UsoEspicificoComponent
   */
  obtenerRequisitosFraccionArancelariaEsquema() {
    this.usoEspicificoForm.get('descripción')?.setValue('Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizará la mercancía a importar) ');
  }
}