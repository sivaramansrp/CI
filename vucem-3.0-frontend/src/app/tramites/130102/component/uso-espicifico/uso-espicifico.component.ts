import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule,Validators } from '@angular/forms';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from "../../../../shared/components/titulo/titulo.component";


import { CatalogosSelect } from '../../../../core/models/shared/components.model';

import fraccionOptionJson from '../../../../../assets/json/130102/fracciónarancelaria-options.json'

import { CommonModule } from '@angular/common';

/**
 * @description Componente para el formulario de Uso Específico.
 * Este componente permite al usuario ingresar información sobre el uso específico
 * de un producto, incluyendo la fracción arancelaria y una descripción.
 * Utiliza componentes compartidos como `SelectCatalogosComponent`, `TituloComponent`,
 * `BtnContinuarComponent` y `TableComponent` para la interfaz de usuario.
 *
 * @selector app-uso-espicifico
 * @templateUrl ./uso-espicifico.component.html
 * @styleUrl ./uso-espicifico.component.scss
 */
@Component({
  selector: 'app-uso-espicifico',
  standalone: true,
  imports: [TituloComponent, SelectCatalogosComponent, TableComponent,ReactiveFormsModule,CommonModule],
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
        'Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizara ta mercancia a importar) ',
      ]
       
    },
    {
    tbodyData: [
      '01039101',
      'Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizara ta mercancia a importar) ',
    ]
     }
  ]

    /**
     * @description Opciones para el selector de fracción arancelaria.
     * @type {CatalogosSelect}
     */
    fraccionOption: CatalogosSelect = {
    labelNombre: 'Fracción arancelaria PROSEC (Especificar la fracción arancelaria del producto en el que se utilizará la mercancía a importar)',
    required: true,
    primerOpcion: '',
    catalogos: fraccionOptionJson.map(item => ({ id: item.id, descripcion: item.descripcion }))
  }

  /**
   * @constructor
   * @param {FormBuilder} formbuilt Servicio para construir el formulario.
   */
  constructor(private formbuilt: FormBuilder) { }

  /**
   * @description Método OnInit del componente.
   * Inicializa el formulario `usoEspicificoForm` con los campos
   * `fracciónarancelaria` y `descripción`.
   */
  ngOnInit(): void {
    this.usoEspicificoForm = this.formbuilt.group({
      fracciónarancelaria: ['', Validators.required],
      descripción: ['Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizara ta mercancia a importar) ', Validators.required]
    });
  }

  /**
   * @description Método para obtener el valor seleccionado del componente SelectCatalogosComponent.
   * @param {Catalogo} valor Valor seleccionado del catálogo.
   */
  valorseleccionado(valor: Catalogo) {
    console.log(valor)
    }

}