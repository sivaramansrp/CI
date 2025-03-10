/**
 * @component formularioAsociacionFactura
 * @description Este componente es responsable de manejar las facturas asociadas.
 * Incluye un formulario para capturar los datos de las facturas y tablas para mostrar las facturas disponibles y asociadas.
 * 
 * @import { Component, OnInit } from '@angular/core';
 * @import { CommonModule } from '@angular/common';
 * @import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
 * @import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
 * @import { TableComponent } from '../../../../shared/components/table/table.component';
 * @import { FacturasAsociadasService } from '../../../../core/services/120301/facturas-asociadas/facturas-asociadas.service';
 */

import { ASOCIADAS_TBCOl, FACTUS_TBCOL } from 'apps/se/src/app/application/tramites/120301/constantes/elegibilidad-de-textiles.enums'
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FacturasAsociadasService } from '../../services/facturas-asociadas/facturas-asociadas.service';
import { TituloComponent } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';


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
export class formularioAsociacionFactura implements OnInit {
  
  formularioAsociacionFactura!: FormGroup;
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
  tableColumns = FACTUS_TBCOL

  /**
   * @property {string[]} asociadastableColumns - Array de encabezados de columnas de la tabla de facturas asociadas.
   */
  asociadastableColumns = ASOCIADAS_TBCOl;

  /**
   * @property {any[]} facturasDisponible - Array de datos de facturas disponibles.
   */
  facturasDisponible: any[] = [];

  /**
   * @property {any[]} facturasAsociadas - Array de datos de facturas asociadas.
   */
  facturasAsociadas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private facturasAsociadasService: FacturasAsociadasService
  ) { }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene los datos de las facturas.
   */
  ngOnInit(): void {
    this.formularioAsociacionFactura = this.fb.group({
      cantidad: ['', [Validators.required]],
    });
    this.fetchData();
  }

  /**
   * @method fetchData
   * @description Obtiene los datos de las facturas disponibles y asociadas desde el servicio.
   */
  fetchData(): void {
    this.facturasAsociadasService.getDatos().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.facturasDisponible) && Array.isArray(response.facturasAsociadas)) {
          this.facturasDisponible = response.facturasDisponible.map((item: any) => {
            return { tbodyData: item.tbodyData };
          });

          this.facturasAsociadas = response.facturasAsociadas.map((item: any) => {
            return { tbodyData: item.tbodyData };
          });
        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response);
          this.facturasDisponible = [];
          this.facturasAsociadas = [];
        }
      },
      error: (error: any) => {
        console.error('Error al obtener los datos:', error);
        this.facturasDisponible = [];
        this.facturasAsociadas = [];
      }
    });
  }
}