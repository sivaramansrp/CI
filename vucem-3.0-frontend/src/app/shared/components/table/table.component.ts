/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TableData } from '../../../core/models/shared/components.model';

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
})
export class TableComponent implements OnInit, OnChanges {

  /**
   * @description 
   * commonTableHeader se utiliza para obtener datos de encabezado de tabla del componente 
   * commonTableBody se utiliza para obtener datos del cuerpo de la tabla de la componente
   */
  @Input() commonTableHeader: string[] = [];
  @Input() commonTableBody: any = [];

  public tableData: TableData = {
    tableHeader: [],
    tableBody: []
  };

  constructor() {}

  ngOnInit(): void {
    this.updateTableData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['commonTableHeader'] || changes['commonTableBody']) {
      this.updateTableData();
    }
  }

  private updateTableData(): void {
    this.tableData = {
      tableHeader: this.commonTableHeader,
      tableBody: this.commonTableBody
    };
  }
}