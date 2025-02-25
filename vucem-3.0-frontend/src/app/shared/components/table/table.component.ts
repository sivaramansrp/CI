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
   * enableScrollbar se utiliza para habilitar o deshabilitar la barra de desplazamiento de la tabla de la componente
   */
  @Input() enableScrollbar: boolean = false;
  /**
   * @description
   * commonTableHeader se utiliza para obtener datos de encabezado de tabla del componente
   */
  @Input() commonTableHeader: string[] = [];
  /**
   * @description
   * commonTableBody se utiliza para obtener datos del cuerpo de la tabla de la componente
   */
  @Input() commonTableBody: any = [];
  /**
   * @description
   * tableData se utiliza para obtener datos de la tabla de la componente
   */
  public tableData: TableData = {
    tableHeader: [],
    tableBody: [],
  };

  /**
   * @description
   * ngOnInit se utiliza para inicializar la tabla de la componente
   */
  ngOnInit(): void {
    this.tableData = {
      tableHeader: this.commonTableHeader,
      tableBody: this.commonTableBody,
    };
  }

  /** 
   * @description
   * ngOnChanges se utiliza para detectar cambios en la tabla de la componente
   * @param changes
   * */
  ngOnChanges(changes: SimpleChanges): void {
    const tbodyKey = 'commonTableHeader';
    const tbodyData = 'commonTableBody';
    if (changes[tbodyKey]?.currentValue) {
      this.tableData.tableHeader = changes[tbodyKey]?.currentValue;
    }
    if (changes[tbodyData]?.currentValue) {
      this.tableData.tableBody = changes[tbodyData]?.currentValue;
    }
  }
}
