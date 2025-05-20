import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { PARTIDASDELAMERCANCIA_TABLA } from '../../constantes/partidas-de-la-mercancia.enum';

import { PartidasDeLaMercanciaModelo } from '../../models/partidas-de-la-mercancia.model';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import { TituloComponent } from '@ng-mf/data-access-user';

import { TablaDinamicaComponent } from '@ng-mf/data-access-user'; 
/**
 * @component
 * @name PartidasDeLaMercanciaComponent
 * @description
 * Este componente es responsable de gestionar las partidas de la mercancía.
 * Proporciona un formulario para capturar datos, una tabla dinámica para mostrar información
 * y eventos para interactuar con otros componentes o servicios.
 */
@Component({
  selector: 'app-partidas-de-la-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './partidas-de-la-mercancia.component.html',
  styleUrl: './partidas-de-la-mercancia.component.scss',
})
export class PartidasDeLaMercanciaComponent {

/**
 * Referencia al elemento del modal de modificación de partida.
 * Se utiliza para controlar la apertura y cierre del modal mediante la API de Bootstrap.
 * 
 * @type {ElementRef}
 * @memberof PartidasDeLaMercanciaComponent
 */
   @ViewChild('modalModificarPartidaRef', { static: false }) modalModificarPartidaRef!: ElementRef;

  /**
   * @property {FormGroup} partidasDelaMercanciaForm
   * @description Formulario reactivo principal para capturar los datos de las partidas.
   */
  @Input() partidasDelaMercanciaForm!: FormGroup;

  /**
   * @property {FormGroup} formForTotalCount
   * @description Formulario reactivo para capturar los totales de las partidas.
   */
  @Input() formForTotalCount!: FormGroup;

  /**
   * @property {ConfiguracionColumna<any>[]} tableHeaderData
   * @description Configuración de las columnas de la tabla dinámica.
   */
  @Input() tableHeaderData: ConfiguracionColumna<PartidasDeLaMercanciaModelo>[] =
    PARTIDASDELAMERCANCIA_TABLA;
  /**
   * @property {any[]} tableBodyData
   * @description Datos que se mostrarán en el cuerpo de la tabla dinámica.
   */
  @Input() tableBodyData: PartidasDeLaMercanciaModelo[] = [];

  /**
   * @property {boolean} mostrarTabla
   * @description Bandera para mostrar u ocultar la tabla dinámica.
   */
  @Input() mostrarTabla = false;

  /**
 * Indica si el formulario ha sido enviado.
 * Esta bandera se utiliza para mostrar mensajes de validación o controlar el flujo
 * después de que el usuario intenta enviar el formulario.
 *
 * @type {boolean}
 * @default false
 */
  @Input() formularioEnviado = false;


  /**
   * @event filaSeleccionadaChange
   * @description Evento que emite las filas seleccionadas en la tabla dinámica.
   */
  @Output() filaSeleccionadaChange = new EventEmitter<PartidasDeLaMercanciaModelo[]>();

  /**
   * @event validarYEnviarFormularioEvent
   * @description Evento que se emite cuando se valida y envía el formulario.
   */
  @Output() validarYEnviarFormularioEvent = new EventEmitter<void>();

  /**
 * @event eliminarTablaEvent
 * @description
 * Evento que se emite cuando el usuario solicita eliminar todos los datos de la tabla dinámica.
 * Permite que el componente padre realice la acción correspondiente de limpieza o eliminación.
 */
  @Output() eliminarTablaEvent = new EventEmitter<void>();

  /**
   * @event navegarParaModificarPartidaEvent
   * @description Evento que se emite para navegar y modificar una partida específica.
   */
  @Output() navegarParaModificarPartidaEvent = new EventEmitter<void>();

  /**
   * @event setValoresStoreEvent
   * @description
   * Evento que emite los valores del formulario para almacenarlos en el store.
   * Incluye el formulario reactivo, el nombre del campo que se está actualizando
   * y el nombre del método que realiza la actualización.
   */
  @Output() setValoresStoreEvent = new EventEmitter<{ form: FormGroup; campo: string }>();

  /**
   * @property {TablaSeleccion} CHECKBOX
   * @description Tipo de selección de la tabla dinámica (checkbox).
   */
  CHECKBOX = TablaSeleccion.CHECKBOX;

  /**
   * @constructor
   * @description Constructor para inicializar el componente e inyectar dependencias.
   * @param {FormBuilder} fb FormBuilder para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder) {
    // Constructor del componente
  }

  /**
   * @method esInvalido
   * @description Verifica si un control del formulario es inválido.
   * @param {string} nombreControl Nombre del control en el formulario.
   * @returns {boolean} Verdadero si el control es inválido, falso en caso contrario.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.partidasDelaMercanciaForm.get(nombreControl);
    return CONTROL ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) : false;
  }

  /**
   * @method handleListaDeFilaSeleccionada
   * @description Maneja las filas seleccionadas en la tabla dinámica y emite un evento.
   * @param {any[]} filasSeleccionadas Lista de filas seleccionadas.
   */
  handleListaDeFilaSeleccionada(event: PartidasDeLaMercanciaModelo[]): void {
    this.filaSeleccionadaChange.emit(event);
  }

  /**
   * @method validarYEnviarFormulario
   * @description Valida y envía el formulario, emitiendo un evento.
   */
  validarYEnviarFormulario(): void {
    this.validarYEnviarFormularioEvent.emit();
  }

  /**
 * @method onclickEliminar
 * @description
 * Método que emite el evento `eliminarTablaEvent` cuando el usuario solicita eliminar todos los datos de la tabla dinámica.
 * Permite que el componente padre realice la acción correspondiente de limpieza o eliminación.
 *
 * @returns {void}
 */
  onclickEliminar(): void {
    this.eliminarTablaEvent.emit();
  }

  /**
   * @method navegarParaModificarPartida
   * @description Navega para modificar una partida específica, emitiendo un evento.
   */
  navegarParaModificarPartida(): void {
    this.navegarParaModificarPartidaEvent.emit();
    const MODALELEMENT = this.modalModificarPartidaRef.nativeElement;
    const MODALINSTANCE = new Modal(MODALELEMENT);
    MODALINSTANCE.show();
  }

  /**
   * @method setValoresStore
   * @description Emite un evento para almacenar valores en el store.
   * @param {FormGroup} form Formulario reactivo.
   * @param {string} campo Nombre del campo que se está actualizando.
   * @param {string} metodoNombre Nombre del método que realiza la actualización.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    this.setValoresStoreEvent.emit({ form, campo });
  }

  /**
 * @method onModificarPartida
 * @description
 * Método encargado de validar el formulario de modificación de partida y, si es válido,
 * ejecutar la lógica de guardado/actualización y cerrar el modal correspondiente utilizando la API de Bootstrap.
 * Además, elimina manualmente el backdrop y limpia los estilos del body para evitar que la pantalla quede oscura.
 * Si el formulario no es válido, marca todos los campos como tocados para mostrar los errores.
 
 * - Valida el formulario reactivo de la partida.
 * - Ejecuta la lógica de guardado/actualización (debe implementarse según la necesidad).
 * - Cierra el modal de modificación de partida usando la instancia de Bootstrap Modal.
 * - Elimina manualmente cualquier backdrop restante y limpia las clases/estilos del body.
 * - Si el formulario es inválido, marca todos los campos como tocados para mostrar los mensajes de error.
 *
 * @returns {void}
 */

  onModificarPartida() {
    if (this.partidasDelaMercanciaForm.valid) {
      const MODALELEMENT = this.modalModificarPartidaRef.nativeElement;
      const MODALINSTANCE = Modal.getOrCreateInstance(MODALELEMENT);
      MODALINSTANCE.hide();

      setTimeout(() => {
      const BACKDROPS = document.querySelectorAll('.modal-backdrop');
      BACKDROPS.forEach(bd => bd.parentNode?.removeChild(bd));
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }, 500);
    } else {
      this.partidasDelaMercanciaForm.markAllAsTouched();
    }
  }
}