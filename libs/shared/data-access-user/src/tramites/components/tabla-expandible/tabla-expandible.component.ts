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
   * Evento de salida emitido cuando se hace clic en una fila.
   */
  @Output() filaClic = new EventEmitter<T>();

  /**
   * Tipo de selección para la tabla (CHECKBOX, RADIO, etc.)
   */
  @Input() tipoSeleccionTabla!: TablaSeleccion;
  
  /**
   * Referencia al enum TablaSeleccion para usar en la plantilla
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Configuración para las columnas de la tabla principal
   */
  @Input() configuracionTabla: ConfiguracionColumna<T>[] = [];

  /**
   * Configuración para las columnas de la tabla anidada
   */
  @Input() configuracionTablaAnidada: ConfiguracionColumna<N>[] = [];

  /**
   * Datos para la tabla principal
   */
  @Input() datos: T[] = [];

  /**
   * Función para obtener datos anidados para una fila específica
   */
  @Input() obtenerDatosAnidados!: (item: T) => N[];

  /**
   * Identificador único para la tabla
   */
  @Input() tableId!: string;

  /**
   * Valor de selección de entrada
   */
  private _seleccionEntrada!: number;
  
  @Input()
  set inputSelection(valor: number) {
    this._seleccionEntrada = valor;
    this.idFilaSeleccionada = valor;
  }

  /**
   * Evento emitido cuando se selecciona una fila
   */
  @Output() filaSeleccionada: EventEmitter<T> = new EventEmitter<T>(true);

  /**
   * Evento emitido cuando se seleccionan múltiples filas
   */
  @Output() listaDeFilaSeleccionada: EventEmitter<T[]> = new EventEmitter<T[]>(true);

  /**
   * Evento emitido cuando se alterna un valor
   */
  @Output() alternarValor: EventEmitter<{ row: any; column: string }> = new EventEmitter();

  /**
   * ID de la fila seleccionada
   */
  idFilaSeleccionada!: number;

  /**
   * Array de índices de filas seleccionadas
   */
  filasSeleccionadas: number[] = [];

  /**
   * Rastrea qué filas están expandidas
   */
  filasExpandidas: Set<number> = new Set();

  /**
   * Obtiene la configuración ordenada para las columnas
   */
  obtenerConfiguracionOrdenada(): ConfiguracionColumna<T>[] {
    return this.configuracionTabla.sort((a, b) => a.orden - b.orden);
  }

  /**
   * Obtiene la configuración ordenada para las columnas anidadas
   */
  obtenerConfiguracionAnidadaOrdenada(): ConfiguracionColumna<N>[] {
    return this.configuracionTablaAnidada.sort((a, b) => a.orden - b.orden);
  }

  /**
   * Maneja la selección de filas
   */
  seleccionarFila(id: number, fila: T): void {
    this.idFilaSeleccionada = id;
    this.filaSeleccionada.emit(fila);
  }

  /**
   * Maneja los cambios de estado de los checkboxes
   */
  cambiarEstadoCheckbox(evento: Event, indice: number): void {
    const CHECKBOX = evento.target as HTMLInputElement;
    const FILA = this.datos[indice];
    
    if (CHECKBOX?.checked) {
      if (!this.filasSeleccionadas.includes(indice)) {
        this.filasSeleccionadas.push(indice);
      }
      this.filaSeleccionada.emit(FILA);
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
   * Maneja el checkbox de seleccionar/deseleccionar todos
   */
  seleccionarDeseleccionarTodos(evento: Event): void {
    const CHECKBOX = evento.target as HTMLInputElement;

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
   * Maneja el evento de clic en una fila
   */
  onFilaClic(datos: T): void {
    this.filaClic.emit(datos);
  }

  /**
   * Alterna un valor en una fila
   */
  cambiarValor(fila: any): void {
    this.alternarValor.emit(fila);
  }

  /**
   * Alterna la expansión de una fila
   */
  alternarExpandirFila(indice: number, evento: Event): void {
    evento.stopPropagation();
    
    if (this.filasExpandidas.has(indice)) {
      this.filasExpandidas.delete(indice);
    } else {
      this.filasExpandidas.add(indice);
    }
  }

  /**
   * Verifica si una fila está expandida
   */
  estaFilaExpandida(indice: number): boolean {
    return this.filasExpandidas.has(indice);
  }
}
