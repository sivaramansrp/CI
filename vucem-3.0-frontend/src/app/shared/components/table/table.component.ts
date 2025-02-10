/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { TableData } from '../../../core/models/shared/components.model';

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
})
export class TableComponent implements OnInit {

  /**
   * @description 
   * commonTableHeader se utiliza para obtener datos de encabezado de tabla del componente.
   */
  @Input() commonTableHeader: string[] = [];
  /**
   * @description 
   * commonTableBody se utiliza para obtener datos del cuerpo de la tabla de la componente.
   */
  @Input() commonTableBody: any = [];

  /**
   * Variable para indicar si la tabla debe mostrar o no el elemento checkbox.
   */
  @Input()
  public muestraCheckbox: boolean = false;

  public tableData: TableData = {
    tableHeader: [],
    tableBody: []
  };

  constructor() {
  }

  ngOnInit(): void {
    this.tableData = {
      tableHeader: this.commonTableHeader,
      tableBody: this.commonTableBody
    }
  }
}
