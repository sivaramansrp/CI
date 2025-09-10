import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ESTADO_REGISTRO,
  TEXTO_FILA_REGISTRO,
} from '../../../tramites/constantes/constantes';
import {
  PAGINATION_MODE,
  TablaAcciones,
  TablaSeleccion,
} from '../../../core/enums/tabla-seleccion.enum';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ConfiguracionColumna } from '../../../core/models/shared/configuracion-columna.model';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';

@Component({
  selector: 'app-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrl: './tabla-dinamica.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, TablePaginationComponent],
  host: {},
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TablaDinamicaComponent<T> implements OnChanges, OnInit, OnDestroy {

  /** Modo de paginación: 'client' o 'server' */
  @Input() mode: string = PAGINATION_MODE.SERVER;

  /**
   * indice el tipo de selección para la tabla.
   * Puede ser 'RADIO' para seleccionar una fila con un botón de radio.
   *
   * @type { TablaSeleccion}
   */
  @Output() filaClic = new EventEmitter<T>();

  /**
   * Este input define el tipo de selección que se utilizará en la tabla dinámica.
   */
  @Input() tipoSeleccionTabla!: TablaSeleccion;

  /**
   * Este input permite deshabilitar la selección de filas mediante checkboxes en la tabla.
   * Si se establece en `true`, los checkboxes de selección estarán deshabilitados.
   */
  @Input() disableSeleccionTablaCheckBox: boolean = false;

  /**
   * Este input permite deshabilitar la selección de filas mediante botones de radio en la tabla.
   * Si se establece en `true`, los botones de radio de selección estarán deshabilitados.
   */
  @Input() disableSeleccionTablaRadio: boolean = false;

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

  /** Almacena los datos paginados que se mostrarán en la tabla según la página actual y los filtros aplicados. */
  public paginatedDatos: T[] = [];

  /** Almacena los datos filtrados localmente según el término de búsqueda ingresado por el usuario. */
  private datosFiltrados: T[] = [];

  /** Almacena el conjunto original de datos antes de aplicar filtros o búsquedas, para restaurar el estado inicial si es necesario. */
  private originalDatos: T[] = [];

  /**
   * Identificador único para la tabla dinámica.
   * Este identificador se utiliza para diferenciar y manejar múltiples tablas dinámicas en la aplicación.
   */
  @Input() tableId!: string;

  /**
   * Indica si el estado actual es inválido.
   * Cuando se establece en `true`, el componente reflejará un estado inválido.
   * Este input puede utilizarse para activar estilos o mensajes de validación.
   */
  @Input() isInvalida: boolean = false;

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

  /**
   * Establece el valor de la selección de entrada y sincroniza el identificador de la fila seleccionada.
   *
   * @param value - El nuevo valor numérico que representa la fila seleccionada.
   *
   * Al asignar un valor a esta propiedad, se actualiza tanto la variable interna `_inputSelection`
   * como la propiedad `idFilaSeleccionada`, asegurando que ambas estén sincronizadas.
   */
  set inputSelection(value: number) {
    this._inputSelection = value; // Actualiza el valor interno de `_inputSelection`
    this.idFilaSeleccionada = value; // Sincroniza el valor con `idFilaSeleccionada`
  }
  /**
   *   Array que recibe que acciones va a tener la tabla
   */
  @Input() acciones: TablaAcciones[] = [];

  /**
 * @input desactivarEmitirEvento
 * @description
 * Indica si se debe desactivar la emisión del evento al hacer clic en una fila de la tabla.
 * @type {boolean}
 * @default true
 */
  @Input() desactivarEmitirEvento: boolean = true;

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
  @Output() alternarValor = new EventEmitter<{ row: T; column: string }>();

  /**
   * Almacena el ID de la fila seleccionada.
   * Este valor se establece cuando el usuario selecciona una fila en la tabla.
   *
   * @type {number}
   */
  idFilaSeleccionada: number | null = null;

  /**
   * Almacena un array de los índices de las filas seleccionadas.
   * Cada índice corresponde a una fila que ha sido seleccionada por el usuario.
   *
   * @type {number[]}
   */
  @Input() filasSeleccionadas: number[] = [];

  /**
   * Almacena un array de los indices de las acciones para la tabla definidos en el enum TablaAcciones
   */
  public accionesEnum = TablaAcciones;

  /**
   * Almacena el valor del botón que se mostrará en la tabla.
   * Este valor se utiliza para determinar el estado del registro y el texto del botón.
   */
  public batonValor: string = ESTADO_REGISTRO.BAJA;

  @Input() desactivarButton: boolean = false;

  /**
   * Número total de elementos en la tabla.
  */
  @Input() totalItems: number = 0;

  /**
   * Cantidad de elementos por página en la paginación.
  */
  @Input() itemsPerPage: number = 5;

  /**
   * Página actual de la paginación.
  */
  @Input() currentPage: number = 1;

  /** Indica si se muestra la opción de ordenamiento de columnas en la tabla. */
  @Input() showSort: boolean = false;

  /** Indica si se muestra la opción de búsqueda en la tabla. */
  @Input() showSearch: boolean = false;

  /** Indica si se muestra la paginación en la tabla dinámica. */
  @Input() showPagination: boolean = false;

  /** Evento que se emite cuando el usuario cambia de página en la tabla. */
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  /** Evento que se emite cuando el usuario cambia la cantidad de elementos por página en la tabla. */
  @Output() itemsPerPageChange: EventEmitter<number> = new EventEmitter<number>(); 

  /** Evento que se emite cuando el usuario ordena una columna de la tabla. */
  @Output() sortEvent = new EventEmitter<{ column: ConfiguracionColumna<T>; direction: 'asc' | 'desc' }>();

  /** Evento que se emite cuando el usuario realiza una búsqueda en la tabla. */
  @Output() searchChanged = new EventEmitter<string>();
  
  /** Subject utilizado para gestionar y emitir los términos de búsqueda ingresados por el usuario. */
  private searchSubject = new Subject<string>();

  /** Columna actualmente seleccionada para aplicar el ordenamiento en la tabla. */
  public sortColumn: ConfiguracionColumna<T> | null = null;

  /** Dirección actual del ordenamiento aplicado en la tabla: ascendente o descendente. */
  public sortDirection: 'asc' | 'desc' = 'asc';
  
  /**
 * Método del ciclo de vida que se ejecuta al inicializar el componente.
 * Suscribe al Subject de búsqueda para manejar los términos ingresados por el usuario,
 * aplicando un debounce y evitando búsquedas repetidas.
 */
  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      const SEARCH_VALOR = searchTerm.trim().toLowerCase();
      if (this.mode === PAGINATION_MODE.SERVER) {
        this.searchChanged.emit(SEARCH_VALOR);
      } else {
        this.filtrarDatosLocal(SEARCH_VALOR);
      }
    });
    // Si no se ha proporcionado un ID de tabla, se genera uno aleatorio.
    this.tableId = this.tableId ? this.tableId : 'tabla_' + Math.floor(Math.random() * 1000000);
    this.getUpdatePagination();
  }

  /**
   * Método que se ejecuta cuando se ingresa un valor en el campo de búsqueda.
   * Este método emite el valor ingresado al observable `searchSubject` para su procesamiento.
   *
   * @param valor - El valor ingresado por el usuario.
   */
  filtrarDatosLocal(valor: string): void {
    if (!valor) {
      this.datosFiltrados = [];
      this.getUpdatePagination();
    } else {
      this.paginatedDatos = this.originalDatos;
      this.datosFiltrados = this.paginatedDatos.filter(item =>
        this.configuracionTabla.some(col =>
          col.clave(item)?.toString().toLowerCase().includes(valor)
        )
      );
      if (this.datosFiltrados.length) {
        this.getUpdatePagination();
      } else {
        this.paginatedDatos = this.datosFiltrados;
      }
    }
  }



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
  seleccionarFila(event: Event, id: number, fila: T): void {
    const RADIO = event.target as HTMLInputElement;
    if (RADIO.checked) {
      this.idFilaSeleccionada = id;
      this.filaSeleccionada.emit(fila); // Emite la fila seleccionada al componente padre
    }
    else {
      this.idFilaSeleccionada = null; // Si se deselecciona, se limpia el idFilaSeleccionada
    }
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
    if (this.desactivarEmitirEvento) {
      this.filaClic.emit(data);
    }
  }

  /**
   * Cambia el valor de una fila específica y emite un evento con la fila modificada.
   *
   * @param row - La fila cuyos valores se desean cambiar.
   */
  cambiarValor(row: { row: T; column: string }): void {
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
  obtenerTextoBoton(fila: any): string {
    if (fila?.desEstatus && fila?.desEstatus === TEXTO_FILA_REGISTRO.BAJA) {
      this.batonValor = ESTADO_REGISTRO.ACTIVAR;
    }
    return this.batonValor;
  }

  /**
   * Método que se ejecuta cuando se cambia de página en la paginación.
   * @param {number} page - Número de la página seleccionada.
   */
  onPageChange(page: number):void {
    this.currentPage = page;
    if (this.mode === PAGINATION_MODE.CLIENT) {
      this.getUpdatePagination();
    } else {
      this.pageChange.emit(page);
    }
  }

  /**
   * Actualiza la paginación de la tabla de establecimientos.
   * Corta los datos de la tabla según la página actual y el número de elementos por página.
   */
  getUpdatePagination(): void {
    const SOURCE = this.datosFiltrados.length ? this.datosFiltrados : this.datos;
    this.paginatedDatos = [];
    if (this.showPagination) {
      if (this.mode !== PAGINATION_MODE.CLIENT) {
      this.paginatedDatos = [...SOURCE];
      } else {
        const STARTINDEX = (this.currentPage - 1) * this.itemsPerPage;
        this.paginatedDatos = SOURCE.slice(STARTINDEX, STARTINDEX + this.itemsPerPage);
        this.originalDatos = SOURCE.slice(STARTINDEX, STARTINDEX + this.itemsPerPage);
      }
    } else {
      this.paginatedDatos = [...SOURCE];
    }
  }


  /**
   * Método que se ejecuta cuando cambia el número de elementos por página.
   * @param {number} itemsPerPage - Número de elementos a mostrar por página.
   */
  onItemsPerPageChange(itemsPerPage: number):void{
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    if (this.mode === PAGINATION_MODE.CLIENT) {
      this.getUpdatePagination();
    } else {
      this.itemsPerPageChange.emit(itemsPerPage)
    }
    
  }

  /**
   * Se ejecuta cuando cambia alguna de las propiedades @Input del componente.
   * En este caso, si cambia el arreglo de datos, se limpia la selección actual de filas.
   *
   * @param cambios - Objeto que contiene los cambios en las propiedades @Input
   */
  ngOnChanges(cambios: SimpleChanges): void {
    if(cambios['datos']) {
      this.filasSeleccionadas = [];
    }
    if (
      this.idFilaSeleccionada !== null &&
      this.idFilaSeleccionada >= this.datos.length
    ) {
      this.idFilaSeleccionada = null;
    }
    this.getUpdatePagination();
  }

  /**
 * Maneja el evento de ordenamiento cuando el usuario hace clic en el encabezado de una columna.
 * Cambia la dirección del ordenamiento si la columna ya está seleccionada, o selecciona una nueva columna para ordenar.
 * Si el modo es CLIENT, ordena y actualiza los datos localmente; si es SERVER, emite el evento para que el padre procese el ordenamiento.
 *
 * @param column - Columna sobre la que se aplicará el ordenamiento.
 */
  onSort(column: ConfiguracionColumna<T>): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    if (this.mode === PAGINATION_MODE.CLIENT) {
      this.sortData();
      this.getUpdatePagination();
    } else {
      this.sortEvent.emit({ column: column, direction: this.sortDirection });
    }
  }

  /**
 * Ordena los datos de la tabla según la columna y dirección seleccionadas.
 * Si la columna es de tipo string, utiliza localeCompare; si es numérica, compara valores numéricos.
 */
  private sortData(): void {
    if (!this.sortColumn) {
      return;
    }
    const CLAVE_FN = this.sortColumn.clave;
    this.datos.sort((a, b) => {
      const VAL_A = CLAVE_FN(a);
      const VAL_B = CLAVE_FN(b);

      if (VAL_A === null) {
        return 1;
      }
      if (VAL_B === null) {
        return -1;
      }
      const RESULT = typeof VAL_A === 'string'
        ? VAL_A.localeCompare(VAL_B as string)
        : (VAL_A as number) > (VAL_B as number)
          ? 1
          : (VAL_A as number) < (VAL_B as number)
            ? -1
            : 0;

      return this.sortDirection === 'asc' ? RESULT : -RESULT;
    });
  }

  /**
 * Maneja el evento de entrada en el campo de búsqueda.
 * Envía el valor ingresado al Subject para procesar el filtrado o búsqueda.
 *
 * @param event - Evento de entrada del usuario en el campo de búsqueda.
 */
  onSearchInput(event: Event): void {
    const VALOR = (event.target as HTMLInputElement).value;
    this.searchSubject.next(VALOR);
  }

  /**
 * Método del ciclo de vida que se ejecuta al destruir el componente.
 * Completa el Subject de búsqueda para evitar fugas de memoria.
 */
  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

}
