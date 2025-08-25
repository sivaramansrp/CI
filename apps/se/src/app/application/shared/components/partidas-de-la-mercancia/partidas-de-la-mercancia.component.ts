
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ConfiguracionColumna, Notificacion } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PARTIDASDELAMERCANCIA_TABLA, TEXTOS } from '../../constantes/partidas-de-la-mercancia.enum';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { PartidasDeLaMercanciaModelo } from '../../models/partidas-de-la-mercancia.model';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TituloComponent } from '@ng-mf/data-access-user';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/**
 * PartidasDeLaMercanciaComponent
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
    TooltipModule
  ],
  templateUrl: './partidas-de-la-mercancia.component.html',
  styleUrl: './partidas-de-la-mercancia.component.scss',
})
export class PartidasDeLaMercanciaComponent implements OnChanges{
  /**
   * Textos utilizados en el componente.
   * @type {typeof TEXTOS}
   */
  TEXTOS = TEXTOS;

  /*
   * @descripcion Indica si se debe mostrar una notificación.
   */
  mostrarNotificacion = false;
  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @description Referencia al elemento de la partida que se va a modificar.
   */
  @ViewChild('modificarPartidaModal') modificarPartidaElemento!: ElementRef;
  /**
  * @description Indica si el formulario debe mostrarse en modo solo lectura.
  */
  @Input() esFormularioSoloLectura!: boolean;
  /**
   * form
   * Formulario reactivo principal para capturar los datos de las partidas.
   */
  @Input() partidasDelaMercanciaForm!: FormGroup;

  /**
   * formForTotalCount
   * Formulario reactivo para capturar los totales de las partidas.
   */
  @Input() formForTotalCount!: FormGroup;

  /**
   * mostrarTabla
   * Bandera para mostrar u ocultar la tabla dinámica.
   */
  @Input() mostrarTabla = false;
  /**
   * filaSeleccionadaChange
   * Evento que emite las filas seleccionadas en la tabla dinámica.
   */
  @Output() filaSeleccionadaChange = new EventEmitter<PartidasDeLaMercanciaModelo[]>();

  /**
   * validarYEnviarFormularioEvent
   * Evento que se emite cuando se valida y envía el formulario.
   */
  @Output() validarYEnviarFormularioEvent = new EventEmitter<void>();

  /**
   * navegarParaModificarPartidaEvent
   * Evento que se emite para navegar y modificar una partida específica.
   */
  @Output() navegarParaModificarPartidaEvent = new EventEmitter<void>();

  /**
   * setValoresStoreEvent
   * Evento que emite los valores del formulario para almacenarlos en el store.
   * Formulario reactivo.
   * Nombre del campo que se está actualizando.
   * Nombre del método que realiza la actualización.
   */
  @Output() setValoresStoreEvent = new EventEmitter<{ form: FormGroup; campo: string }>();

    /**
   * Tipo de selección de la tabla dinámica.
   * Define el tipo de selección que se utilizará en la tabla dinámica (por ejemplo, checkbox).
   */
    CHECKBOX: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla dinámica.
   * Este campo define las columnas que se mostrarán en la tabla, incluyendo encabezados y claves.
   */
  @Input() tableHeaderData: ConfiguracionColumna<PartidasDeLaMercanciaModelo>[] =
    PARTIDASDELAMERCANCIA_TABLA;

  /**
   * Datos que se mostrarán en la tabla dinámica.
   * Este campo contiene las filas de datos que se renderizarán en el cuerpo de la tabla.
   */
  @Input() tableBodyData: PartidasDeLaMercanciaModelo[] = [];

  /**
   * Bandera para deshabilitar la tabla dinámica.
   * Si está configurada como `true`, la tabla estará deshabilitada.
   */
  @Input() disabled: boolean = false;
  /**
   * Referencia al elemento del DOM asociado con el archivo de nacionales.
   * Utilizado para acceder y manipular directamente el elemento en la plantilla.
   */
  @ViewChild('archivoNacionales') archivoNacionalesElemento!: ElementRef;
 
  /**
   * Nombre del archivo seleccionado por el usuario.
   */
  nombreArchivoSeleccionado: string = '';
  
  /**
   * Constructor para inicializar el componente e inyectar dependencias.
   * FormBuilder para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder) {
    //  Constructor del componente
  }

  /**
     * Método del ciclo de vida que se ejecuta cuando cambian las propiedades de entrada del componente.
     *
     * Si la propiedad `esFormularioSoloLectura` cambia, habilita o deshabilita el formulario según su valor.
     * Esto permite que el formulario se muestre en modo solo lectura o editable dinámicamente.
     *
     * @param changes - Objeto que contiene los cambios detectados en las propiedades de entrada.
     */
    ngOnChanges(changes: SimpleChanges): void {
      // Verifica si el formulario ha cambiado y actualiza su estado
      if (changes['esFormularioSoloLectura']) {
        if (this.esFormularioSoloLectura) {
        this.partidasDelaMercanciaForm.disable();
    }else if (!this.esFormularioSoloLectura) {
       this.partidasDelaMercanciaForm.enable();
    }
      }
    }

  /**
   * Verifica si un control del formulario es inválido.
   * Nombre del control en el formulario.
   * boolean Verdadero si el control es inválido, falso en caso contrario.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.partidasDelaMercanciaForm.get(nombreControl);
    return CONTROL ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) : false;
  }

  /**
   * Maneja las filas seleccionadas en la tabla dinámica y emite un evento.
   * Lista de filas seleccionadas.
   */
  handleListaDeFilaSeleccionada(event: PartidasDeLaMercanciaModelo[]): void {
    this.filaSeleccionadaChange.emit(event);
  }

  /**
   * Valida y envía el formulario, emitiendo un evento.
   */
  validarYEnviarFormulario(): void {
    this.validarYEnviarFormularioEvent.emit();
  }

  /**
   * Navega para modificar una partida específica, emitiendo un evento.
   */
  navegarParaModificarPartida(): void {
       if (this.modificarPartidaElemento) {
      const MODAL_INSTANCIA = new Modal(
        this.modificarPartidaElemento?.nativeElement,
        { backdrop: false }
      );
      MODAL_INSTANCIA.show();
    }
  }

  /**
   * Cancela la modificación de una partida específica, cerrando el modal.
   */
  modalCancelar(): void {
  if (this.modificarPartidaElemento && this.modificarPartidaElemento.nativeElement) {
    const MODAL_INSTANCIA = Modal.getInstance(
      this.modificarPartidaElemento.nativeElement
    );
    if (MODAL_INSTANCIA) {
      MODAL_INSTANCIA.hide();
    }
  }
  Object.values(this.partidasDelaMercanciaForm.controls).forEach(control => {
    control.markAsUntouched();
    control.markAsPristine();
  });
}
/**
 * Emite un evento para almacenar valores en el store.
 */
setValoresStore(form: FormGroup, campo: string): void {
  this.setValoresStoreEvent.emit({ form, campo });
}

/**
 * Valida los campos del formulario antes de modificar una partida.
 */
validarModificarPartida(): void {
  
  if (this.partidasDelaMercanciaForm.invalid) {
    this.partidasDelaMercanciaForm.markAllAsTouched();
    return;
  }
  if (this.modificarPartidaElemento && this.modificarPartidaElemento.nativeElement) {
    const MODAL_INSTANCIA = Modal.getInstance(this.modificarPartidaElemento.nativeElement);
    if (MODAL_INSTANCIA) {
      MODAL_INSTANCIA.hide();
    }
  }
}

enviarArchivo(): void {
  const INPUT_FILE = document.getElementById('archivoNacionales') as HTMLInputElement;
  if (!INPUT_FILE || !INPUT_FILE.files || INPUT_FILE.files.length === 0) {
    return;
  }
  const FILE = INPUT_FILE.files[0];
  const EXTENSION = FILE.name.split('.').pop()?.toLowerCase();
  if (EXTENSION !== 'csv') {
    this.mostrarNotificacion = true;
    return;
  }
  this.mostrarNotificacion = false;
  const MODAL = document.getElementById('modalCargarArchivo');
  if (MODAL) {
    const MODAL_INSTANCE = window['bootstrap']?.Modal?.getInstance(MODAL);
    if (MODAL_INSTANCE) {
      MODAL_INSTANCE.hide();
    } else {
      (MODAL).classList.remove('show');
      (MODAL).style.display = 'none';
      document.body.classList.remove('modal-open');
    }
    const BACKDROPS = document.querySelectorAll('.modal-backdrop');
    BACKDROPS.forEach(backdrop => backdrop.parentNode?.removeChild(backdrop));
  }
}
  /**
   * Maneja el evento de selección de archivo y actualiza el nombre del archivo seleccionado.
   * @param evento Evento de cambio del input de archivo.
   */
  archivoSeleccionado(evento: Event): void {
    const INPUT = evento.target as HTMLInputElement;
    if (INPUT.files && INPUT.files.length > 0) {
      this.nombreArchivoSeleccionado = INPUT.files[0].name;
    } else {
      this.nombreArchivoSeleccionado = '';
    }
  }
}
