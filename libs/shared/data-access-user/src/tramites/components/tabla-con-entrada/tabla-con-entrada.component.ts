import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionAporteColumna } from '@ng-mf/data-access-user';
import { EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { TablaCampoSeleccion } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-tabla-con-entrada',
  templateUrl: './tabla-con-entrada.component.html',
  styleUrl: './tabla-con-entrada.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
  host: {},
})
export class TablaConEntradaComponent<T> {
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
   * @description Propiedad que asigna la enumeración `TablaCampoSeleccion` para su uso en el componente.
   * Esta enumeración permite definir los diferentes tipos de selección disponibles en una tabla.
   */
  tablaCampoSeleccion = TablaCampoSeleccion;

  /**
   * Configuración de las columnas de la tabla.
   * Contiene la información sobre cómo se deben mostrar las columnas, incluyendo el nombre, el orden,
   * el campo de datos y otras configuraciones específicas.
   *
   * @type {ConfiguracionAporteColumna<T>[]}
   */
  @Input() configuracionTabla: ConfiguracionAporteColumna<T>[] = [];

  /**
   * Array de datos a mostrar en la tabla.
   * Cada elemento de este array representa una fila de la tabla.
   *
   * @type {T[]}
   */
  @Input() datos: T[] = [];

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
   * @description Emisor de eventos que permite notificar cuando se selecciona una fila de entrada.
   * El evento emite un valor genérico de tipo `T` y utiliza la configuración de emisión en modo `async`.
   *
   * @type {EventEmitter<T>}
   * @property {boolean} async - Indica que el EventEmitter opera en modo asíncrono (`true`).
   */
  @Output() seleccionarFilaDeEntrada: EventEmitter<T> = new EventEmitter<T>(
    true
  );

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
   * Método para obtener la configuración de las columnas ordenada según el campo "orden".
   *
   * @returns {ConfiguracionAporteColumna<T>[]} La configuración de las columnas ordenada.
   *
   */
  obtenerConfiguracionOrdenada(): ConfiguracionAporteColumna<T>[] {
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
    // Verificamos si el checkbox está seleccionado
    if (CHECKBOX?.checked) {
      if (!this.filasSeleccionadas.includes(indice)) {
        this.filasSeleccionadas.push(indice);
      }
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
   * @description Método para actualizar dinámicamente el valor de un campo específico en la fila de datos.
   * Captura el valor introducido por el usuario y lo asigna al objeto correspondiente dentro del arreglo `datos`.
   * Posteriormente, emite un evento con la fila actualizada.
   *
   * @param {Event} evento - Evento que contiene el valor del campo ingresado por el usuario.
   * @param {number} i - Índice de la fila dentro del arreglo `datos` que se va a actualizar.
   * @param {string} llave - Clave del campo que se actualizará en la fila correspondiente.
   */
  changeInputValue(evento: Event, i: number, llave: string): void {
    const VALUE = (evento.target as HTMLInputElement).value; // Captura el valor ingresado
    (this.datos[i] as Record<string, any>)[llave] = VALUE; // Actualiza el campo de la fila correspondiente
    this.seleccionarFilaDeEntrada.emit(this.datos[i]); // Emite la fila actualizada
  }

  changeCheckBoxValue(evento: Event, i: number, llave: string): void {
    const VALUE = (evento.target as HTMLInputElement).value; // Captura el valor ingresado
    (this.datos[i] as Record<string, any>)[llave] = VALUE; // Actualiza el campo de la fila correspondiente
    this.seleccionarFilaDeEntrada.emit(this.datos[i]); // Emite la fila actualizada
  }

  /**
   * Maneja el evento de clic en una fila de la tabla.
   *
   * @param data - Los datos de la fila que fue clickeada.
   */
  onFilaClic(data: T): void {
    this.filaClic.emit(data);
  }
}
