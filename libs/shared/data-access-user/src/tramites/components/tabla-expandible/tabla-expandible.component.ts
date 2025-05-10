import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfiguracionColumna, TablaSeleccion } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla-expandible',
  templateUrl: './tabla-expandible.component.html',
  styleUrl: './tabla-expandible.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TablaExpandibleComponent<T, N> {
  /**
   * Output event emitted when a row is clicked.
   */
  @Output() filaClic = new EventEmitter<T>();

  /**
   * Type of selection for the table (CHECKBOX, RADIO, etc.)
   */
  @Input() tipoSeleccionTabla!: TablaSeleccion;
  
  /**
   * Reference to the TablaSeleccion enum for use in the template
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Configuration for the main table columns
   */
  @Input() configuracionTabla: ConfiguracionColumna<T>[] = [];

  /**
   * Configuration for the nested table columns
   */
  @Input() configuracionTablaAnidada: ConfiguracionColumna<N>[] = [];

  /**
   * Data for the main table
   */
  @Input() datos: T[] = [];

  /**
   * Function to get nested data for a specific row
   */
  @Input() obtenerDatosAnidados!: (item: T) => N[];

  /**
   * Unique identifier for the table
   */
  @Input() tableId!: string;

  /**
   * Input selection value
   */
  private _inputSelection!: number;
  
  @Input()
  set inputSelection(value: number) {
    this._inputSelection = value;
    this.idFilaSeleccionada = value;
  }

  /**
   * Event emitted when a row is selected
   */
  @Output() filaSeleccionada: EventEmitter<T> = new EventEmitter<T>(true);

  /**
   * Event emitted when multiple rows are selected
   */
  @Output() listaDeFilaSeleccionada: EventEmitter<T[]> = new EventEmitter<T[]>(true);

  /**
   * Event emitted when a value is toggled
   */
  @Output() alternarValor: EventEmitter<{ row: any; column: string }> = new EventEmitter();

  /**
   * ID of the selected row
   */
  idFilaSeleccionada!: number;

  /**
   * Array of selected row indices
   */
  filasSeleccionadas: number[] = [];

  /**
   * Tracks which rows are expanded
   */
  expandedRows: Set<number> = new Set();

  /**
   * Gets the ordered configuration for the columns
   */
  obtenerConfiguracionOrdenada(): ConfiguracionColumna<T>[] {
    return this.configuracionTabla.sort((a, b) => a.orden - b.orden);
  }

  /**
   * Gets the ordered configuration for the nested columns
   */
  obtenerConfiguracionAnidadaOrdenada(): ConfiguracionColumna<N>[] {
    return this.configuracionTablaAnidada.sort((a, b) => a.orden - b.orden);
  }

  /**
   * Handles row selection
   */
  seleccionarFila(id: number, fila: T): void {
    this.idFilaSeleccionada = id;
    this.filaSeleccionada.emit(fila);
  }

  /**
   * Handles checkbox state changes
   */
  cambiarEstadoCheckbox(event: Event, indice: number): void {
    const CHECKBOX = event.target as HTMLInputElement;
    const ROW = this.datos[indice];
    
    if (CHECKBOX?.checked) {
      if (!this.filasSeleccionadas.includes(indice)) {
        this.filasSeleccionadas.push(indice);
      }
      this.filaSeleccionada.emit(ROW);
    } else {
      const IDX = this.filasSeleccionadas.indexOf(indice);
      if (IDX > -1) {
        this.filasSeleccionadas.splice(IDX, 1);
      }
    }
    
    this.listaDeFilaSeleccionada.emit(
      this.datos.filter((_, indice) => this.filasSeleccionadas.includes(indice))
    );
  }

  /**
   * Handles select/deselect all checkbox
   */
  seleccionarDeseleccionarTodos(event: Event): void {
    const CHECKBOX = event.target as HTMLInputElement;

    if (CHECKBOX.checked) {
      this.filasSeleccionadas = this.datos.map((_, indice) => indice);
      this.listaDeFilaSeleccionada.emit(
        this.datos.filter((_, indice) => this.filasSeleccionadas.includes(indice))
      );
    } else {
      this.filasSeleccionadas = [];
      this.listaDeFilaSeleccionada.emit([]);
    }
  }

  /**
   * Handles row click event
   */
  onFilaClic(data: T): void {
    this.filaClic.emit(data);
  }

  /**
   * Toggles a value in a row
   */
  cambiarValor(row: any): void {
    this.alternarValor.emit(row);
  }

  /**
   * Toggles row expansion
   */
  toggleExpandRow(index: number, event: Event): void {
    event.stopPropagation();
    
    if (this.expandedRows.has(index)) {
      this.expandedRows.delete(index);
    } else {
      this.expandedRows.add(index);
    }
  }

  /**
   * Checks if a row is expanded
   */
  isRowExpanded(index: number): boolean {
    return this.expandedRows.has(index);
  }
}
