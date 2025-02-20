/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { TableData } from '../../../core/models/shared/components.model';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports:[
    CommonModule,
   
  ]
})
export class TableComponent implements OnInit{
 
  /**
   * @description 
   * commonTableHeader se utiliza para obtener datos de encabezado de tabla del componente 
   */
  @Input() commonTableHeader: string[] = [];
  /**
   * @description 
   * commonTableBody se utiliza para obtener datos del cuerpo de la tabla de la componente
   */
  @Input() commonTableBody: any =[];
  /**
   * @description
   * tableData se utiliza para obtener datos de la tabla de la componente
   */
  public tableData: TableData = {
    tableHeader: [],
    tableBody: []
  };
  
  /**
   * @description
   * ngOnInit se utiliza para inicializar la tabla de la componente
   */
  ngOnInit(): void {
    this.tableData = {
      tableHeader: this.commonTableHeader,
      tableBody: this.commonTableBody
    }
    
  }

}
