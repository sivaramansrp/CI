import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { MENSAJE_ALERTA_TRATADOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import tratadosDropdown from '../../../../../assets/json/110101/tratdos-dropdown.json';
import tratadosTable from '../../../../../assets/json/110101/tratados-table.json';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * Componente Tratados que se utiliza para mostrar y gestionar los tratados.
 * 
 * Este componente utiliza varios subcomponentes como TituloComponent, SelectCatalogosComponent, CommonModule,
 * TableComponent y AlertComponent para mostrar información y permitir al usuario seleccionar y agregar tratados.
 * 
 * @component
 */
@Component({
  selector: 'app-tratados',
  templateUrl: './tratados.component.html',
  styleUrl: './tratados.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    TableComponent,
    AlertComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ]
})
export class TratadosComponent implements OnInit {
  tratadosForm: FormGroup;

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.initializeTratadosForm();
  }

  initializeTratadosForm(): void {
    this.tratadosForm = this.fb.group({
      pais: ['', Validators.required],
      tratado: ['', Validators.required],
      origen: ['', Validators.required]
    });
  }

  /**
   * Mensaje de alerta para tratados.
   * 
   * @property {string} alert - El mensaje de alerta que se mostrará en el componente.
   */
  alert = MENSAJE_ALERTA_TRATADOS;
  /**
  * Valores seleccionados de los menús desplegables.
  * @property {Object} selectedValues - Objeto que contiene los valores seleccionados.
  * @property {Catalogo} selectedValues.pais - El país seleccionado del catálogo.
  * @property {Catalogo} selectedValues.tratado - El tratado seleccionado del catálogo.
  * @property {Catalogo} selectedValues.origen - El origen seleccionado del catálogo.
  */
  selectedValues: { pais?: Catalogo; tratado?: Catalogo; origen?: Catalogo } = {};

  dropdownConfigs = [
    { catalogos: tratadosDropdown.pais },
    { catalogos: tratadosDropdown.tratado, },
    { catalogos: tratadosDropdown.origen, }
  ];

  /**
    * Maneja la selección de los menús desplegables.
    * 
    * @param {Catalogo} event - El elemento seleccionado del catálogo.
    * @param {number} index - El índice del menú desplegable.
    */
  seleccionar(event: Catalogo, index: number): void {
    if (index === 0) { this.selectedValues.pais = event; }
    if (index === 1) { this.selectedValues.tratado = event; }
    if (index === 2) { this.selectedValues.origen = event; }
  }

  /**
   * Encabezados comunes de la tabla de tratados.
   * 
   * @property {string[]} commonTableHeaders - Array de cadenas de encabezados de tabla.
   */
  commonTableHeaders = tratadosTable.tableHeader;

  /**
   * Cuerpo de la tabla de tratados.
   * 
   * @property {any[]} tableBody - Array de datos del cuerpo de la tabla.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableBody: any[] = tratadosTable.tableBody;


  /**
  * Agrega un nuevo tratado al array `tableBody`.
  * 
  * Este método se invoca cuando el usuario hace clic en el botón para agregar un nuevo tratado.
  * Verifica que los valores seleccionados no estén vacíos antes de agregar el tratado a la tabla.
  * Luego, limpia los valores seleccionados para que el usuario pueda agregar un nuevo tratado.
  * 
  * @method agregarTratado
  */
  agregarTratado(): void {
    if (this.selectedValues.pais && this.selectedValues.tratado && this.selectedValues.origen) {
      this.tableBody.push({
        tbodyData: [
          this.selectedValues.pais.descripcion,
          this.selectedValues.tratado.descripcion,
          this.selectedValues.origen.descripcion
        ]
      });

      this.selectedValues = {};
    }
  }

}
