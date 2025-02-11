/**
 * @component ConstanciaDelRegistroComponent
 * @description Este componente es responsable de manejar el formulario del certificado de registro.
 * Incluye un formulario para capturar los datos del certificado de registro y funcionalidades adicionales.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 */
import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-constancia-del-registro',
  templateUrl: './constancia-del-registro.component.html',
  styleUrl: './constancia-del-registro.component.scss'
})
export class ConstanciaDelRegistroComponent {
  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos del certificado de registro.
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
   * @property {FormGroup} ConstanciaDelRegistro - El grupo de formularios para los datos del certificado de registro.
   */
  ConstanciaDelRegistro!: FormGroup;

  /**
   * @property {string[]} tableColumns - Array de encabezados de columnas de la tabla.
   */
  tableColumns = [
    'Número de constancia de registro',
    'Fracción arancelaria',
    'Classificación del regimen',
    'País destino/origen',
    'Fetcha inicio vigencia',
    'Fetcha fin vigencia',
  ];

  /**
   * @property {Array} facturas - Array de datos de facturas para mostrar en la tabla.
   */
  facturas = [
    {
      tbodyData: ['prueba107112024', 'RAZON SOCIAL CONSIGNATARIO CONSIGNATARIO', 'CALLE', 'SAN GABRIEL 144 DURANGO', 'SAN GABRIEL', '2024-11-07 00:00:00.0']
    },
    {
      tbodyData: ['3434324', 'FACTURA', 'CALLE', 'SAN GABRIEL 144 DURANGO', 'SAN GABRIEL', '2024-11-07 00:00:00.0']
    }
  ];
}
