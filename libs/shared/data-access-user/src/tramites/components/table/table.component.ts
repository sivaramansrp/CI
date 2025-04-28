/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TableData} from '../../../core/models/shared/components.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  host: {}
})
export class TableComponent implements OnInit, OnChanges {
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
  * Si no se pasa ningún valor desde el componente padre, tomará el valor predeterminado como verdadero
  */

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
      tableBody: this.agregarSeleccion(this.commonTableBody)
    };
  }

 

  ngOnChanges(changes: SimpleChanges): void {
    const TBODYKEY = 'commonTableHeader';
    const TBODYDATA = 'commonTableBody';
    
    if (changes[TBODYKEY]?.currentValue) {
      this.tableData.tableHeader = changes[TBODYKEY]?.currentValue;
    }
    if (changes[TBODYDATA]?.currentValue) {
      this.tableData.tableBody = this.agregarSeleccion(changes[TBODYDATA]?.currentValue);
    }
  }

  private agregarSeleccion(data: any[]): any[] {
    if (!this.tableData) {
      this.tableData = { tableHeader: [], tableBody: [] };
    }
    
    return data?.map(item => ({ ...item, selected: item.selected ?? false })) || [];
  }

  todasSeleccionadas(): boolean {
    return this.tableData.tableBody?.length > 0 && this.tableData.tableBody.every(item => item.selected);
  }

  alternarSeleccionTodo(event: Event): void {
    const CHECKED = (event.target as HTMLInputElement).checked;
    this.tableData.tableBody = this.tableData.tableBody.map(item => ({
      ...item,
      selected: CHECKED,
    }));
  }
}
