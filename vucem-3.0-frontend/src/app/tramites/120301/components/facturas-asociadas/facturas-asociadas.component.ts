import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FacturasAsociadasService } from '../../../../core/services/120301/facturas-asociadas/facturas-asociadas.service';

@Component({
  selector: 'app-facturas-asociadas',
  templateUrl: './facturas-asociadas.component.html',
  styleUrls: ['./facturas-asociadas.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    TableComponent
  ]
})
export class FacturasAsociadasComponent implements OnInit {
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
  ];

  asociadastableColumns = [
    'Candidad asociada',
    'número de la factura',
    'razón social',
    'Domicilio',
    'Fecha de emisión/expedición de la factura',
    'Cantidad total',
    'Cantidad disponible',
  ];

  facturasDisponible: any[] = [];
  facturasAsociadas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private facturasAsociadasService: FacturasAsociadasService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.facturasAsociadasService.getDatos().subscribe({
      next: (response: any) => {
        console.log('Received data:', response);

        if (response && Array.isArray(response.facturasDisponible) && Array.isArray(response.facturasAsociadas)) {
          this.facturasDisponible = response.facturasDisponible.map((item) => {
            return { tbodyData: item.tbodyData };
          });

          this.facturasAsociadas = response.facturasAsociadas.map((item) => {
            return { tbodyData: item.tbodyData };
          });

          console.log('facturasDisponible:', this.facturasDisponible);
          console.log('facturasAsociadas:', this.facturasAsociadas);
        } else {
          console.error('API response is not in expected format:', response);
          this.facturasDisponible = [];
          this.facturasAsociadas = [];
        }
      },
      error: (error: any) => {
        console.error('Error while fetching the data:', error);
        this.facturasDisponible = [];
        this.facturasAsociadas = [];
      }
    });
  }
}