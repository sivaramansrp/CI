/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TableBodyData, TableData } from '../../../core/models/shared/components.model';

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
  @Input() commonTableBody: TableBodyData[] = [];
  /**
  * @description
  * Si no se pasa ningún valor desde el componente padre, tomará el valor predeterminado como verdadero
  */
  @Output() seleccionCambio = new EventEmitter<boolean>(); 
  

  /**
   * @description
   * Si es verdadero, deshabilita el checkbox de selección de la tabla.
   */
  @Input() disableSeleccionTablaCheckBox: boolean = false;
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

 
  /**
   * Detecta los cambios en las propiedades de entrada del componente y actualiza los datos de la tabla.
   * Si cambian los encabezados o el cuerpo de la tabla, se actualizan respectivamente en la variable local.
   *
   * @param changes Objeto que contiene los cambios detectados en los inputs del componente.
   */
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

  /**
   * Agrega la propiedad `selected` a cada elemento del arreglo si no está definida,
   * asignándole `false` como valor predeterminado. Además, inicializa la estructuraf
   * de `tableData` si aún no existe.
   *
   * @param data - Arreglo de elementos a los que se desea asegurar la propiedad `selected`.
   * @returns Un nuevo arreglo con los elementos actualizados.
   */
  private agregarSeleccion(data: TableBodyData[]): TableBodyData[] {
    if (!this.tableData) {
      this.tableData = { tableHeader: [], tableBody: [] };
    }
    return (data || [])
      .filter(item => item !== undefined && item !== null)
      .map(item => ({ ...item, selected: item.selected ?? false }));
  }
  /**
 * Verifica si todos los elementos del cuerpo de la tabla están seleccionados.
 *
 * @returns `true` si todos los elementos tienen `selected` en `true` y hay al menos uno, de lo contrario `false`.
 */
  todasSeleccionadas(): boolean {
  return (
    Array.isArray(this.tableData.tableBody) &&
    this.tableData.tableBody.length > 0 &&
    this.tableData.tableBody.every(item => item && item.selected)
  );
}

  /**
 * Marca o desmarca todos los elementos del cuerpo de la tabla según el estado del checkbox general.
 *
 * @param event Evento del checkbox que indica si se deben seleccionar o deseleccionar todos los elementos.
 */
  alternarSeleccionTodo(event: Event): void {
  const CHECKED = (event.target as HTMLInputElement).checked;
  this.tableData.tableBody = (this.tableData.tableBody || []).map(item =>
    item ? { ...item, selected: CHECKED } : item
  );
  this.seleccionCambio.emit(CHECKED);
}
 
}
