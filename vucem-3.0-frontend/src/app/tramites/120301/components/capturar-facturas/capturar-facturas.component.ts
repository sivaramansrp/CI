/**
 * @component CapturarFacturasComponent
 * @description Este componente es responsable de capturar los detalles de las facturas.
 * Incluye un formulario para capturar los datos de las facturas y una tabla para mostrar las facturas capturadas.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormGroup, Validators } from '@angular/forms';
 * @import { TableComponent } from '../../../../shared/components/table/table.component';
 */

import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CapturarFacturasService } from '../../../../core/services/120301/capturar-facturas/capturar-facturas.service';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

@Component({
  selector: 'app-capturar-facturas',
  templateUrl: './capturar-facturas.component.html',
  styleUrl: './capturar-facturas.component.scss',
  standalone: true,
  imports: [
    TableComponent,
    TituloComponent,
    ReactiveFormsModule
  ]
})
export class CapturarFacturasComponent implements OnInit {
  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos de las facturas.
   */
  forma!: FormGroup;

  /**
   * @property {string[]} selectRangoDias - Array de rangos de días seleccionables.
   */
  selectRangoDias: string[] = [];

  /**
   * @property {boolean} colapsable - Booleano para controlar el estado colapsable.
   */
  colapsable: boolean = false;

  /**
   * @property {FormGroup} ConstanciaDelRegistro - El grupo de formularios para datos de la constancia de registro.
   */
  ConstanciaDelRegistro!: FormGroup;

  /**
   * @property {string[]} tableColumns - Array de encabezados de columnas de la tabla.
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
   * @property {Array} facturas - Array de datos de facturas para mostrar en la tabla.
   */
  facturas: any[] = [];
  constructor(
    private fb: FormBuilder,
    private capturarFacturasService: CapturarFacturasService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(): void {
    this.capturarFacturasService.getDatos().subscribe({
      next: (response: any) => {
        // console.log('Received data:', response);

        if (response && Array.isArray(response.facturas)) {

          this.facturas = response.facturas.map((item) => {
            var data = {
              tbodyData: item.tbodyData
            }
            return data;
          }
          );

          //console.log(this.facturas);
          this.facturas = [...this.facturas]

        } else {
          console.error('API response is not in expected format:', response);
          this.facturas = [];
        }
      },
      error: (error: any) => {
        console.error('Error while fetching the data:', error);
        this.facturas = [];
      }
    });
  }

  // facturas = [
  //   {
  //     tbodyData: ['prueba107112024', 'RAZON SOCIAL CONSIGNATARIO CONSIGNATARIO', 'CALLE', '2024-11-07 00:00:00.0', '100', '9', 'Kilogramo', '100.0']
  //   },
  //   {
  //     tbodyData: ['3434324', 'FACTURA', 'CALLE', '2024-10-14 00:00:00.0', '999999', '999990', 'Kilogramo', '3213.0']
  //   }
  // ];
}