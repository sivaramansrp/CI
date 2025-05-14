import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ESTADO_REGISTRO, TEXTO_FILA_REGISTRO } from '../../../tramites/constantes/constantes';
import { TablaAcciones, TablaSeleccion } from '../../../core/enums/tabla-seleccion.enum';
import { ConfiguracionColumna } from '../../../core/models/shared/configuracion-columna.model';

@Component({
  selector: 'app-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrl: './tabla-dinamica.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
  host: {},
})
export class TablaDinamicaComponent<T> {
  /**
   * indice el tipo de selección para la tabla.
   * Puede ser 'RADIO' para seleccionar una fila con un botón de radio.
   *
   * @type { TablaSeleccion}
   */
  @Output() filaClic = new EventEmitter<T>();

  @Input() tipoSeleccionTabla!: TablaSeleccion;
  /*
     * Este valor es necesario para que la plantilla pueda acceder a los diferentes tipos de selección como "CHECKBOX", "RADIO", etc., que definen el comportamiento de la tabla.
     *
     * @type {typeof TablaSeleccion}
     */
  TablaSeleccion = TablaSeleccion;

  /**
   * Configuración de las columnas de la tabla.
   * Contiene la información sobre cómo se deben mostrar las columnas, incluyendo el nombre, el orden,
   * el campo de datos y otras configuraciones específicas.
   *
   * @type {ConfiguracionColumna<T>[]}
   */
  @Input() configuracionTabla: ConfiguracionColumna<T>[] = [];

  /**
   * Array de datos a mostrar en la tabla.
   * Cada elemento de este array representa una fila de la tabla.
   *
   * @type {T[]}
   */
  @Input() datos: T[] = [];


  /**
   * Identificador único para la tabla dinámica.
   * Este identificador se utiliza para diferenciar y manejar múltiples tablas dinámicas en la aplicación.
   */
  @Input() tableId!: string;

  /**
  * Propiedad privada que almacena un valor numérico relacionado con la selección de entrada.
  * 
  * @private
  * @type {number}
  */
  private _inputSelection!: number;
  /**
   * Setter para la propiedad `inputSelection`.
   * Este método se utiliza para actualizar el valor de `_inputSelection` y sincronizarlo con `idFilaSeleccionada`.
   *
   * @param {number} value - El nuevo valor que se asignará a `inputSelection` y `idFilaSeleccionada`.
   */
  @Input()
  get inputSelection(): number {
    return this._inputSelection; // Devuelve el valor interno de `_inputSelection`
  }
  set inputSelection(value: number) {
    this._inputSelection = value; // Actualiza el valor interno de `_inputSelection`
    this.idFilaSeleccionada = value; // Sincroniza el valor con `idFilaSeleccionada`
  }
  /**
   *   Array que recibe que acciones va a tener la tabla
   */
  @Input() acciones: TablaAcciones[] = [];

  /**
   * Evento que se emite cuando el usuario selecciona una fila de la tabla.
   * Este evento envía la fila seleccionada (objeto completo) al componente padre.
   *
   * @type {EventEmitter<T>}
   */
  @Output() filaSeleccionada: EventEmitter<T> = new EventEmitter<T>(true);

  /**
   * Evento que se emite cuando el usuario selecciona o deselecciona una fila de la tabla.
   * Este evento envía un array con todas las filas seleccionadas (objetos completos) al componente padre.
   *
   * @type {EventEmitter<T[]>}
   */
  @Output() listaDeFilaSeleccionada: EventEmitter<T[]> = new EventEmitter<T[]>(
    true
  );


  /**
   * Evento de salida que emite un objeto con información sobre una fila y una columna.
   * 
   * Este evento se utiliza para alternar o cambiar un valor asociado a una fila y columna específica
   * en una tabla dinámica. El objeto emitido contiene:
   * - `row`: La fila afectada.
   * - `column`: El nombre de la columna afectada.
   * 
   * @event
   */
  @Output() alternarValor: EventEmitter<T> = new EventEmitter();


  /**
   * Almacena el ID de la fila seleccionada.
   * Este valor se establece cuando el usuario selecciona una fila en la tabla.
   *
   * @type {number}
   */
  idFilaSeleccionada!: number;

  /**
   * Almacena un array de los índices de las filas seleccionadas.
   * Cada índice corresponde a una fila que ha sido seleccionada por el usuario.
   *
   * @type {number[]}
   */
  filasSeleccionadas: number[] = [];

  /**
   * Almacena un array de los indices de las acciones para la tabla definidos en el enum TablaAcciones
   */
  public accionesEnum = TablaAcciones;

  public batonValor:string=ESTADO_REGISTRO.BAJA
  /**
   * Método para obtener la configuración de las columnas ordenada según el campo "orden".
   *
   * @returns {ConfiguracionColumna<T>[]} La configuración de las columnas ordenada.
   * 
   */
  obtenerConfiguracionOrdenada(): ConfiguracionColumna<T>[] {
    return this.configuracionTabla.sort((a, b) => a.orden - b.orden);
  }
  /**
   * Maneja la selección de una fila.
   * Actualiza el valor de `idFilaSeleccionada` con el ID de la fila seleccionada y emite el evento con la fila completa seleccionada.
   *
   * @param {number} id - El índice de la fila seleccionada. Este índice se usa para identificar la fila seleccionada en la tabla.
   * @param {T} fila - La fila seleccionada. Este parámetro es el objeto completo de la fila que ha sido seleccionada por el usuario.
   *
   * @returns {void} - No retorna nada, solo emite el evento con la fila seleccionada.
   */
  seleccionarFila(id: number, fila: T): void {
    this.idFilaSeleccionada = id;
    this.filaSeleccionada.emit(fila); // Emite la fila seleccionada al componente padre
  }

  /**
   * Este método se llama cada vez que cambia el estado del checkbox.
   * Verifica si el checkbox está seleccionado o no.
   *
   * @param event - El evento que contiene el elemento del checkbox que activó el cambio.
   * @param {number} indice - El índice de la fila que se está seleccionando o deseleccionando.
   * Este índice se usa para identificar la fila correspondiente en la lista de filas seleccionadas.
   *
   * @returns {void} - No retorna nada,
   */
  cambiarEstadoCheckbox(event: Event, indice: number): void {
    // Obtener el checkbox desde el evento
    const CHECKBOX = event.target as HTMLInputElement;
    const ROW = this.datos[indice];
    // Verificamos si el checkbox está seleccionado
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
   * Este método se llama cuando el usuario selecciona o deselecciona el checkbox de "seleccionar/desmarcar todo".
   * Si el checkbox está marcado, se seleccionan todos los índices. Si está desmarcado, se deseleccionan todos.
   *
   * @param event - El evento que contiene el checkbox de "seleccionar/desmarcar todo".
   * @returns {void} - No retorna nada,
   */
  seleccionarDeseleccionarTodos(event: Event): void {
    const CHECKBOX = event.target as HTMLInputElement; // Obtener el checkbox desde el evento

    if (CHECKBOX.checked) {
      // Si el checkbox de "seleccionar todo" está marcado, agregamos todos los índices al array
      this.filasSeleccionadas = this.datos.map((_, indice) => indice);
      this.listaDeFilaSeleccionada.emit(
        this.datos.filter((_, indice) =>
          this.filasSeleccionadas.includes(indice)
        )
      );
    } else {
      // Si el checkbox de "seleccionar todo" está desmarcado, limpiamos el array de índices seleccionados
      this.filasSeleccionadas = [];
      this.listaDeFilaSeleccionada.emit([]);
    }
  }

  /**
   * Maneja el evento de clic en una fila de la tabla.
   * 
   * @param data - Los datos de la fila que fue clickeada.
   */
  onFilaClic(data: T): void {
    this.filaClic.emit(data);
  }

  /**
   * Cambia el valor de una fila específica y emite un evento con la fila modificada.
   *
   * @param row - La fila cuyos valores se desean cambiar.
   */
  cambiarValor(row: T): void {
    this.alternarValor.emit(row);
  }


/**
 * Obtiene el texto del botón basado en el estado de la fila proporcionada.
 *
 * @param fila - Objeto que representa una fila, el cual puede contener la propiedad `desEstatus`.
 * @returns El valor del botón (`batonValor`) basado en el estado de la fila.
 *
 * @remarks
 * Si la propiedad `desEstatus` de la fila es igual a `TEXTO_FILA_REGISTRO.BAJA`,
 * el valor del botón (`batonValor`) se establece en `ESTADO_REGISTRO.ACTIVAR`.
 */
// 'fila' proviene de tablas con tipos de fila variables; solo algunas tienen 'desEstatus'.
// Se usa 'any' para permitir acceso flexible en este componente compartido.
// El encadenamiento opcional garantiza seguridad en tiempo de ejecución.
// El uso de 'any' es intencional y limitado a este método.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
obtenerTextoBoton(fila:any):string{
 if(fila?.desEstatus && fila?.desEstatus===TEXTO_FILA_REGISTRO.BAJA){
     this.batonValor=ESTADO_REGISTRO.ACTIVAR
  }
  return this.batonValor
 
  }
}