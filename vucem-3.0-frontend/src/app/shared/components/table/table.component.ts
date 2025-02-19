/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TableData } from '../../../core/models/shared/components.model';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class TableComponent implements OnInit, OnChanges {

  /**
   * @description 
   * commonTableHeader se utiliza para obtener datos de encabezado de tabla del componente 
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