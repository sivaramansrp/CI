import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import tratadosDropdown from '../../../../../assets/json/110101/tratdos-dropdown.json';
import tratadosTable from '../../../../../assets/json/110101/tratados-table.json';

@Component({
  selector: 'app-tratados',
  templateUrl: './tratados.component.html',
  styleUrl: './tratados.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    SelectCatalogosComponent,
    CommonModule,
    TableComponent,
    AlertComponent
  ]
})
export class TratadosComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedValues: any = {};

/**
 * Configuración para menús desplegables.
 * 
 * @property {Object[]} dropdownConfigs - Array de configuraciones de menús desplegables.
 * @property {string} dropdownConfigs[].labelNombre - Etiqueta para el menú desplegable.
 * @property {boolean} dropdownConfigs[].required - Indica si el menú desplegable es obligatorio.
 * @property {Object[]} dropdownConfigs[].catalogos - Catálogo de opciones para el menú desplegable.
 * @property {string} dropdownConfigs[].primerOpcion - Primera opción en el menú desplegable.
 */
  dropdownConfigs = [
    { labelNombre: 'Pais o bloque', required: true, catalogos: tratadosDropdown.pais, primerOpcion: '' },
    { labelNombre: 'Tratado o Acuerdo', required: true, catalogos: tratadosDropdown.tratado, primerOpcion: '' },
    { labelNombre: 'Criterio de origen', required: true, catalogos: tratadosDropdown.origen, primerOpcion: '' }
  ];

  /**
    * Maneja la selección de los menús desplegables.
    * 
    * @param {Catalogo} event - El elemento seleccionado del catálogo.
    * @param {number} index - El índice del menú desplegable.
    */
  seleccionar(event: Catalogo, index: number) {
    if (index === 0) this.selectedValues.pais = event;
    if (index === 1) this.selectedValues.tratado = event;
    if (index === 2) this.selectedValues.origen = event;
  }

  /**
   * Encabezados comunes de la tabla de tratados.
   * 
   * @property {string[]} commonTableHeaders - Array de cadenas de encabezados de tabla.
   */
  commonTableHeaders = tratadosTable.tableHeader;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableBody:any[] = tratadosTable.tableBody

 /**
  * Agrega un nuevo tratado al array mercanciasData.
  */
  agregarTratado() {
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

  /**
   * A string containing HTML markup for an alert message.
   * The message provides instructions for selecting a treaty and criteria.
   * 
   * Instructions:
   * - First, select a country or block.
   * - Then, select a treaty or agreement.
   * - Select the criteria to confer origin.
   * - Finally, add your selection to the list of treaties.
   */
  mensajeAlerta: string = `
  <ul>
    Para seleccionar un tratado y criterio, siga los siguientes pasos:
    <li>Primero seleccione un país o bloque</li>
    <li>Después seleccione un tratado o acuerdo</li>
    <li>Seleccione el criterio para conferir origen</li>
    <li>Finalmente, agregue su selección a la lista de tratados</li>
  </ul>
`;
}
