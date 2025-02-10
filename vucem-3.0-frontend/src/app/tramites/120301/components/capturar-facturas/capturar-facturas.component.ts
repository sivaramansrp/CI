import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-capturar-facturas',
  templateUrl: './capturar-facturas.component.html',
  styleUrl: './capturar-facturas.component.scss',
})
export class CapturarFacturasComponent {
  forma!: FormGroup;
  selectRangoDias: string[] = [];
  colapsable: boolean = false;
  ConstanciaDelRegistro!: FormGroup;

  tableColumns = [
    'Número de la factura',
    'Razón social',
    'Domicilio',
    'Fecha de expedición de la factura',
    'Cantidad total',
    'Cantidad disponible',
    'Unidad de medida',
    'Valor en dólares',
  ]

  facturas =[
    {
      tbodyData: ['prueba107112024','RAZON SOCIAL CONSIGNATARIO CONSIGNATARIO','CALLE','2024-11-07 00:00:00.0','100','9','Kilogramo','100.0']
    },
    {
      tbodyData: ['3434324','FACTURA','CALLE','2024-10-14 00:00:00.0','999999','999990','Kilogramo','3213.0']
    }
]
  

}
