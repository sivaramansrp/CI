/**
 * @component CapturarFacturasComponent
 * @description This component is responsible for capturing invoice details.
 * It includes a form for capturing invoice data and a table for displaying the captured invoices.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormGroup, Validators } from '@angular/forms';
 * @import { TableComponent } from '../../../../shared/components/table/table.component';
 */

import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-capturar-facturas',
  templateUrl: './capturar-facturas.component.html',
  styleUrl: './capturar-facturas.component.scss',
})
export class CapturarFacturasComponent {
  /**
   * @property {FormGroup} forma - The form group for capturing invoice data.
   */
  forma!: FormGroup;

  /**
   * @property {string[]} selectRangoDias - Array of selectable day ranges.
   */
  selectRangoDias: string[] = [];

  /**
   * @property {boolean} colapsable - Boolean to control collapsible state.
   */
  colapsable: boolean = false;

  /**
   * @property {FormGroup} ConstanciaDelRegistro - The form group for registration certificate data.
   */
  ConstanciaDelRegistro!: FormGroup;

  /**
   * @property {string[]} tableColumns - Array of table column headers.
   */
  tableColumns = [
    'Número de la factura',
    'Razón social',
    'Domicilio',
    'Fecha de expedición de la factura',
    'Cantidad total',
    'Cantidad disponible',
    'Unidad de medida',
    'Valor en dólares',
  ];

  /**
   * @property {Array} facturas - Array of invoice data to be displayed in the table.
   */
  facturas = [
    {
      tbodyData: ['prueba107112024', 'RAZON SOCIAL CONSIGNATARIO CONSIGNATARIO', 'CALLE', '2024-11-07 00:00:00.0', '100', '9', 'Kilogramo', '100.0']
    },
    {
      tbodyData: ['3434324', 'FACTURA', 'CALLE', '2024-10-14 00:00:00.0', '999999', '999990', 'Kilogramo', '3213.0']
    }
  ];
}