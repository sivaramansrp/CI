/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableData } from '../../../core/models/shared/components.model';

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class TableComponent {

  /**
   * @description 
   * commonTableHeader se utiliza para obtener datos de encabezado de tabla del componente 
   * commonTableBody se utiliza para obtener datos del cuerpo de la tabla de la componente
   */
  @Input() commonTableHeader: string[] = [];
  @Input() commonTableBody: any =[];
  @Input() enableScrollbar: boolean = false;


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
