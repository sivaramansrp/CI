/**
 * Componente para gestionar las partidas de la mercancía en el trámite 130113.
 * Proporciona funcionalidades para capturar, modificar y eliminar partidas, así como mostrar notificaciones y manejar formularios reactivos.
 * @export
 * @class PartidasDeLaMercanciaComponent
 */
import { Catalogo, ConfiguracionColumna } from '@ng-mf/data-access-user';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import { CatalogoSelectComponent, Notificacion, NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { AlertComponent } from '@ng-mf/data-access-user';

import { TituloComponent } from '@ng-mf/data-access-user';

import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { PARTIDASDELAMERCANCIA_TABLA } from '../../../../shared/constantes/partidas-de-la-mercancia.enum';
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
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    AlertComponent,
    NotificacionesComponent
  ],
  templateUrl: './partidas-de-la-mercancia.component.html',
  styleUrl: './partidas-de-la-mercancia.component.scss',
})
/**
 * Componente para gestionar partidas de la mercancía.
 * @export
 */
export class PartidasDeLaMercanciaComponent implements OnChanges {
  /**
   * Notificación de alerta para mostrar mensajes de éxito.
   * 
   * @public
   * @property {Notificacion} alertaNotificacion
   */

  /**
   * Notificación de alerta para mostrar mensajes de éxito o advertencia.
   * @type {Notificacion}
   */
  public alertaNotificacion!: Notificacion;

  /**
   * Bandera para mostrar/ocultar la notificación modal.
   */
  /**
   * Bandera para mostrar/ocultar la notificación modal.
   * @type {boolean}
   */
  mostrarNotificacion: boolean = false;
  /**
   * @description Referencia al input de archivo para nacionales.
   */
  /**
   * Referencia al input de archivo para nacionales.
   * @type {ElementRef}
   */
  @ViewChild('archivoNacionales') archivoNacionalesElemento!: ElementRef;

  /**
   * @description Indica si el formulario debe mostrarse en modo solo lectura.
   */
  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * @type {boolean}
   */
  @Input() esFormularioSoloLectura!: boolean;
  /**
   * form
   * Formulario reactivo principal para capturar los datos de las partidas.
   */
  /**
   * Formulario reactivo principal para capturar los datos de las partidas.
   * @type {FormGroup}
   */
  @Input() partidasDelaMercanciaForm!: FormGroup;

  /**
   * formForTotalCount
   * Formulario reactivo para capturar los totales de las partidas.
   */
  /**
   * Formulario reactivo para capturar los totales de las partidas.
   * @type {FormGroup}
   */
  @Input() formForTotalCount!: FormGroup;

  /**
   * tableHeaderData
   * Configuración de las columnas de la tabla dinámica.
   */
  /**
   * Configuración de las columnas de la tabla dinámica.
   * @type {ConfiguracionColumna<PartidasDeLaMercanciaModelo>[]}
   */
  @Input()
  tableHeaderData: ConfiguracionColumna<PartidasDeLaMercanciaModelo>[] = PARTIDASDELAMERCANCIA_TABLA;

  /**
     * tableBodyData
     * Datos que se mostrarán en el cuerpo de la tabla dinámica.
     */
  /**
   * Datos que se mostrarán en el cuerpo de la tabla dinámica.
   * @type {PartidasDeLaMercanciaModelo[]}
   */
  @Input() tableBodyData: PartidasDeLaMercanciaModelo[] = [];
  
    /**
     * tableBodyDataChange
     * Evento que emite los cambios en los datos del cuerpo de la tabla.
     */
  /**
   * Evento que emite los cambios en los datos del cuerpo de la tabla.
   * @type {EventEmitter<PartidasDeLaMercanciaModelo[]>}
   */
  @Output() tableBodyDataChange = new EventEmitter<PartidasDeLaMercanciaModelo[]>();

  /**
   * Lista de elementos del catálogo de fracciones arancelarias.
   */
  /**
   * Lista de elementos del catálogo de fracciones arancelarias.
   * @type {Catalogo[]}
   */
  @Input() fraccionDescripcionPartidasDeLaMercancia: Catalogo[] = [];

  /**
   * filaSeleccionadaChange
   * Evento que emite las filas seleccionadas en la tabla dinámica.
   */
  /**
   * Evento que emite las filas seleccionadas en la tabla dinámica.
   * @type {EventEmitter<PartidasDeLaMercanciaModelo[]>}
   */
  @Output() filaSeleccionadaChange = new EventEmitter<PartidasDeLaMercanciaModelo[]>();

  /**
   * filaSeleccionada
   * Fila(s) seleccionada(s) en la tabla dinámica, recibida del padre.
   */
  /**
   * Fila(s) seleccionada(s) en la tabla dinámica, recibida del padre.
   * @type {PartidasDeLaMercanciaModelo[]}
   */
  @Input() filaSeleccionada: PartidasDeLaMercanciaModelo[] = [];
  /**
   * eliminarPartidaEvent
   * Evento que se emite para eliminar una partida específica.
   */
  /**
   * Evento que se emite para eliminar una partida específica.
   * @type {EventEmitter<void>}
   */
  @Output() eliminarPartidaEvent = new EventEmitter<void>();

  /**
   * validarYEnviarFormularioEvent
   * Evento que se emite cuando se valida y envía el formulario.
   */
  /**
   * Evento que se emite cuando se valida y envía el formulario.
   * @type {EventEmitter<void>}
   */
  @Output() validarYEnviarFormularioEvent = new EventEmitter<void>();

  /**
   * navegarParaModificarPartidaEvent
   * Evento que se emite para navegar y modificar una partida específica.
   */
  /**
   * Evento que se emite para navegar y modificar una partida específica.
   * @type {EventEmitter<void>}
   */
  @Output() navegarParaModificarPartidaEvent = new EventEmitter<void>();

  /**
   * setValoresStoreEvent
   * Evento que emite los valores del formulario para almacenarlos en el store.
   * Formulario reactivo.
   * Nombre del campo que se está actualizando.
   * Nombre del método que realiza la actualización.
   */
  /**
   * Evento que emite los valores del formulario para almacenarlos en el store.
   * @type {EventEmitter<{form: FormGroup; campo: string;} >}
   */
  @Output() setValoresStoreEvent = new EventEmitter<{ form: FormGroup; campo: string }>();

  /**
   * Tipo de selección de la tabla dinámica (checkbox).
   */
  /**
   * Tipo de selección de la tabla dinámica (checkbox).
   * @type {TablaSeleccion}
   */
  CHECKBOX = TablaSeleccion.CHECKBOX;

  /**
   * Nombre del archivo seleccionado por el usuario.
   */
  /**
   * Nombre del archivo seleccionado por el usuario.
   * @type {string}
   */
  nombreArchivoSeleccionado: string = '';

  /**
   * Constructor para inicializar el componente e inyectar dependencias.
   * FormBuilder para crear formularios reactivos.
   */
  /**
   * Constructor para inicializar el componente e inyectar dependencias.
   * @param {FormBuilder} fb - Servicio para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder) {
    //  Constructor del componente
  }
  /**
   * Habilita o deshabilita el formulario según el modo de solo lectura.
   * Controla el estado del formulario al iniciar el componente.
   */
  /**
   * Método del ciclo de vida que se ejecuta cuando cambian las propiedades de entrada del componente.
   *
   * Si la propiedad `esFormularioSoloLectura` cambia, habilita o deshabilita el formulario según su valor.
   * Esto permite que el formulario se muestre en modo solo lectura o editable dinámicamente.
   *
   * @param changes - Objeto que contiene los cambios detectados en las propiedades de entrada.
   */
  /**
   * Método del ciclo de vida que se ejecuta cuando cambian las propiedades de entrada del componente.
   * Si la propiedad `esFormularioSoloLectura` cambia, habilita o deshabilita el formulario según su valor.
   * @param {SimpleChanges} changes - Objeto que contiene los cambios detectados en las propiedades de entrada.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si el formulario ha cambiado y actualiza su estado
    if (changes['esFormularioSoloLectura']) {
      if (this.esFormularioSoloLectura) {
        this.partidasDelaMercanciaForm.disable();
      } else {
        this.partidasDelaMercanciaForm.enable();
      }
    }
  }
  /**
   * Verifica si un control del formulario es inválido.
   * Nombre del control en el formulario.
   * boolean Verdadero si el control es inválido, falso en caso contrario.
   */
  /**
   * Verifica si un control del formulario es inválido.
   * @param {string} nombreControl - Nombre del control en el formulario.
   * @returns {boolean} Verdadero si el control es inválido, falso en caso contrario.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.partidasDelaMercanciaForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Maneja las filas seleccionadas en la tabla dinámica y emite un evento.
   * Lista de filas seleccionadas.
   */
  /**
   * Maneja las filas seleccionadas en la tabla dinámica y emite un evento.
   * @param {PartidasDeLaMercanciaModelo[]} filasSeleccionadas - Lista de filas seleccionadas.
   */
  handleListaDeFilaSeleccionada(
    filasSeleccionadas: PartidasDeLaMercanciaModelo[]
  ): void {
    this.filaSeleccionada = filasSeleccionadas;
    this.filaSeleccionadaChange.emit(filasSeleccionadas);
  }

  /**
   * Valida y envía el formulario, emitiendo un evento.
   */
  /**
   * Valida y envía el formulario, emitiendo un evento.
   */
  validarYEnviarFormulario(): void {
  this.validarYEnviarFormularioEvent.emit();
  }

  /**
   * Navega para modificar una partida específica, emitiendo un evento.
   */
  /**
   * Navega para modificar una partida específica, emitiendo un evento.
   */
  navegarParaModificarPartida(): void {
    this.navegarParaModificarPartidaEvent.emit();
  }

  /**
   * Emite un evento para almacenar valores en el store.
   */
  /**
   * Emite un evento para almacenar valores en el store.
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Nombre del campo que se está actualizando.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    this.setValoresStoreEvent.emit({ form, campo });
  }

  /**
   * Maneja el evento de selección de archivo y actualiza el nombre del archivo seleccionado.
   * @param evento Evento de cambio del input de archivo.
   */
  /**
   * Maneja el evento de selección de archivo y actualiza el nombre del archivo seleccionado.
   * @param {Event} evento - Evento de cambio del input de archivo.
   */
  archivoSeleccionado(evento: Event): void {
    const INPUT = evento.target as HTMLInputElement;
    if (INPUT.files && INPUT.files.length > 0) {
      this.nombreArchivoSeleccionado = INPUT.files[0].name;
    } else {
      this.nombreArchivoSeleccionado = '';
    }
  }

  /**
   * Maneja el evento de clic para el botón Agregar.
   * Verifica si el campo Fracción arancelaria está seleccionado antes de continuar.
   * Muestra una alerta modal si no está seleccionado.
   */
  /**
   * Maneja el evento de clic para el botón Agregar.
   * Verifica si el campo Fracción arancelaria está seleccionado antes de continuar.
   * Muestra una alerta modal si no está seleccionado.
   */
  agregarPartidaClick(): void {
    // Marcar todos los campos como tocados para mostrar errores en el template
    this.partidasDelaMercanciaForm.markAllAsTouched();
    // Si el formulario no es válido, los mensajes de error se mostrarán en el HTML
    if (this.partidasDelaMercanciaForm.invalid) {
      return;
    }
    // Crear nueva partida desde el formulario
    const NUEVA_PARTIDA: PartidasDeLaMercanciaModelo = {
      id: Date.now().toString(),
      cantidad: this.partidasDelaMercanciaForm.get('cantidadPartidasDeLaMercancia')?.value ?? '',
      unidadDeMedida: this.partidasDelaMercanciaForm.get('unidadDeMedida')?.value ?? '',
      fraccionFrancelaria: this.partidasDelaMercanciaForm.get('fraccionFrancelaria')?.value ?? '',
      descripcion: this.partidasDelaMercanciaForm.get('descripcionPartidasDeLaMercancia')?.value ?? '',
      precioUnitarioUSD: this.partidasDelaMercanciaForm.get('precioUnitarioUSD')?.value ?? '',
      totalUSD: this.partidasDelaMercanciaForm.get('valorPartidaUSDPartidasDeLaMercancia')?.value ?? '',
      fraccionTigiePartidasDeLaMercancia: this.partidasDelaMercanciaForm.get('fraccionTigiePartidasDeLaMercancia')?.value ?? '',
      fraccionDescripcionPartidasDeLaMercancia: this.partidasDelaMercanciaForm.get('fraccionDescripcionPartidasDeLaMercancia')?.value ?? ''
    };
    // Actualizar localmente y emitir al padre
    const NUEVO_ARRAY = [...this.tableBodyData, NUEVA_PARTIDA];
    this.tableBodyData = NUEVO_ARRAY;
    this.tableBodyDataChange.emit(NUEVO_ARRAY);
    // Calcular totales y actualizar formulario de totales si existe
    this.actualizarTotales();
    // Limpiar selección y formulario si es necesario
    this.filaSeleccionada = [];
    this.filaSeleccionadaChange.emit([]);
  }

  /**
   * Muestra la alerta modal cuando no se ha seleccionado la Fracción arancelaria.
   */
  mostrarAlertaFraccionArancelaria(): void {
    const MENSAJE_ELIMINADO = 'Por favor verifique los campos obligatorios.';
    this.alertaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'warning',
      mensaje: MENSAJE_ELIMINADO,
      cerrar: true,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
      titulo: '',
      modo: ''
    };
    this.mostrarNotificacion = true;
  }

    /**
   * Método para mostrar la confirmación de eliminación de partidas seleccionadas.
   * Este método debe emitir un evento al componente padre para mostrar la alerta.
   */
  /**
   * Método para mostrar la confirmación de eliminación de partidas seleccionadas.
   * Este método debe emitir un evento al componente padre para mostrar la alerta.
   */
  mostrarConfirmacionEliminar(): void {
    // Siempre mostrar la notificación si no hay selección
    if (!this.filaSeleccionada || this.filaSeleccionada.length === 0) {
      this.mostrarNotificacion = false;
      setTimeout(() => {
        this.alertaNotificacion = {
          tipoNotificacion: 'alert',
          categoria: 'warning',
          mensaje: 'Selecciona un registro a eliminar.',
          cerrar: true,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
          titulo: '',
          modo: ''
        };
        this.mostrarNotificacion = true;
      }, 0);
      return;
    }
    // Mostrar modal de confirmación para eliminar
    this.alertaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'warning',
      mensaje: '¿Está seguro que desea eliminar los registros marcados?',
      cerrar: true,
      txtBtnCancelar: 'Cancelar',
      txtBtnAceptar: 'Aceptar',
      titulo: '',
      modo: 'eliminar'
    };
    this.mostrarNotificacion = true;
  }

  /**
   * Maneja la confirmación del modal de notificación para eliminar partidas.
   * Si confirmado es true y el modo es 'eliminar', elimina las partidas seleccionadas.
   * Si confirmado es false, solo cierra el modal.
   */
  /**
   * Maneja la confirmación del modal de notificación para eliminar partidas.
   * Si confirmado es true y el modo es 'eliminar', elimina las partidas seleccionadas.
   * Si confirmado es false, solo cierra el modal.
   * @param {boolean} confirmado - Indica si el usuario confirmó la eliminación.
   */
  onConfirmacionEliminar(confirmado: boolean): void {
    if (confirmado && this.alertaNotificacion?.modo === 'eliminar') {
      if (this.filaSeleccionada && this.filaSeleccionada.length > 0) {
        const IDS_A_ELIMINAR = this.filaSeleccionada.map((f: PartidasDeLaMercanciaModelo) => f.id);
        const NUEVO_ARRAY = this.tableBodyData.filter((row: PartidasDeLaMercanciaModelo) => !IDS_A_ELIMINAR.includes(row.id));
        this.tableBodyData = NUEVO_ARRAY;
        this.tableBodyDataChange.emit(NUEVO_ARRAY);
        this.filaSeleccionada = [];
        this.filaSeleccionadaChange.emit([]);
      }
    }
    // Solo cerrar el modal si no se elimina
    this.mostrarNotificacion = false;
  }
  /**
   * Abre el modal de modificar partida si hay una fila seleccionada, si no muestra alerta.
   */
  /**
   * Abre el modal de modificar partida si hay una fila seleccionada, si no muestra alerta.
   */
  abrirModalModificarPartida(): void {
  if (!this.filaSeleccionada || this.filaSeleccionada.length !== 1) {
      const ELEMENTO_MODAL = document.getElementById('modalModificarPartida');
      if (ELEMENTO_MODAL && ELEMENTO_MODAL.classList.contains('show')) {
        try {
          type BootstrapModalInstance = { hide: () => void };
          const WIN = window as Window & typeof globalThis & { bootstrap?: { Modal?: { getInstance?: (el: HTMLElement) => BootstrapModalInstance | null } } };
          const BS_MODAL = WIN.bootstrap?.Modal?.getInstance
            ? WIN.bootstrap.Modal.getInstance(ELEMENTO_MODAL)
            : null;
          if (BS_MODAL && typeof BS_MODAL.hide === 'function') {
            BS_MODAL.hide();
          } else {
            ELEMENTO_MODAL.classList.remove('show');
            ELEMENTO_MODAL.setAttribute('aria-hidden', 'true');
            ELEMENTO_MODAL.style.display = 'none';
            const BACKDROP = document.querySelector('.modal-backdrop');
            if (BACKDROP) {
              BACKDROP.parentNode?.removeChild(BACKDROP);
            }
          }
        } catch (e) {
          ELEMENTO_MODAL.classList.remove('show');
          ELEMENTO_MODAL.setAttribute('aria-hidden', 'true');
          ELEMENTO_MODAL.style.display = 'none';
          const BACKDROP = document.querySelector('.modal-backdrop');
          if (BACKDROP) {
            BACKDROP.parentNode?.removeChild(BACKDROP);
          }
        }
      }

      this.alertaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        mensaje: 'Debe seleccionar un elemento para modificar.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
        titulo: '',
        modo: ''
      };
      this.mostrarNotificacion = true;
      return;
    }

    const ELEMENTO_MODAL = document.getElementById('modalModificarPartida');
    if (ELEMENTO_MODAL) {
      try {
        type BootstrapModalInstance = { show: () => void };
        const WIN = window as Window & typeof globalThis & { bootstrap?: { Modal?: { new?: (el: HTMLElement) => BootstrapModalInstance } } };
        if (WIN.bootstrap && WIN.bootstrap.Modal && WIN.bootstrap.Modal.new) {
          const BS_MODAL: BootstrapModalInstance = new WIN.bootstrap.Modal(ELEMENTO_MODAL);
          BS_MODAL.show();
        } else {
          ELEMENTO_MODAL.classList.add('show');
          ELEMENTO_MODAL.setAttribute('aria-hidden', 'false');
          ELEMENTO_MODAL.style.display = 'block';
        }
      } catch (e) {
        ELEMENTO_MODAL.classList.add('show');
        ELEMENTO_MODAL.setAttribute('aria-hidden', 'false');
        ELEMENTO_MODAL.style.display = 'block';
      }
    }
    this.navegarParaModificarPartida();
  }

  /**
   * Modifica la partida seleccionada usando los valores del formulario modal.
   * Actualiza el registro en tableBodyData y cierra el modal.
   */
  modificarPartida(): void {
  if (!this.filaSeleccionada || this.filaSeleccionada.length !== 1) {
      this.alertaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        mensaje: 'Debe seleccionar un elemento para modificar.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
        titulo: '',
        modo: ''
      };
      this.mostrarNotificacion = true;
      return;
    }
    // Marcar todos los campos como tocados para mostrar errores
    this.partidasDelaMercanciaForm.markAllAsTouched();
    // Validar el formulario antes de modificar
    if (this.partidasDelaMercanciaForm.invalid) {
      this.alertaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        mensaje: 'Complete todos los campos obligatorios para modificar.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
        titulo: '',
        modo: ''
      };
      this.mostrarNotificacion = true;
      return;
    }
    const SELECCIONADA = this.filaSeleccionada[0];
    const INDICE = this.tableBodyData.findIndex((FILA: PartidasDeLaMercanciaModelo) => FILA.id === SELECCIONADA.id);
    // Actualizar el registro con los valores del formulario
    const PARTIDA_MODIFICADA: PartidasDeLaMercanciaModelo = {
      ...SELECCIONADA,
      cantidad: this.partidasDelaMercanciaForm.get('cantidadPartidasDeLaMercancia')?.value ?? '',
      unidadDeMedida: this.partidasDelaMercanciaForm.get('unidadDeMedida')?.value ?? '',
      fraccionFrancelaria: this.partidasDelaMercanciaForm.get('fraccionFrancelaria')?.value ?? '',
      descripcion: this.partidasDelaMercanciaForm.get('descripcionPartidasDeLaMercancia')?.value ?? '',
      precioUnitarioUSD: this.partidasDelaMercanciaForm.get('precioUnitarioUSD')?.value ?? '',
      totalUSD: this.partidasDelaMercanciaForm.get('valorPartidaUSDPartidasDeLaMercancia')?.value ?? '',
      fraccionTigiePartidasDeLaMercancia: this.partidasDelaMercanciaForm.get('fraccionTigiePartidasDeLaMercancia')?.value ?? '',
      fraccionDescripcionPartidasDeLaMercancia: this.partidasDelaMercanciaForm.get('fraccionDescripcionPartidasDeLaMercancia')?.value ?? '',
      id: SELECCIONADA.id
    };
    const NUEVO_ARRAY = [
      ...this.tableBodyData.slice(0, INDICE),
      PARTIDA_MODIFICADA,
      ...this.tableBodyData.slice(INDICE + 1)
    ];
    this.tableBodyData = NUEVO_ARRAY;
    this.tableBodyDataChange.emit(NUEVO_ARRAY);
    // Calcular totales y actualizar formulario de totales si existe
    this.actualizarTotales();
    // Limpiar selección
    this.filaSeleccionada = [];
    this.filaSeleccionadaChange.emit([]);
    // Cerrar el modal de modificar partida
    const ELEMENTO_MODAL = document.getElementById('modalModificarPartida');
    if (ELEMENTO_MODAL && ELEMENTO_MODAL.classList.contains('show')) {
      try {
        type BootstrapModalInstance = { hide: () => void };
        const WIN = window as Window & typeof globalThis & { bootstrap?: { Modal?: { getInstance?: (el: HTMLElement) => BootstrapModalInstance | null } } };
        const BS_MODAL = WIN.bootstrap?.Modal?.getInstance
          ? WIN.bootstrap.Modal.getInstance(ELEMENTO_MODAL)
          : null;
        if (BS_MODAL && typeof BS_MODAL.hide === 'function') {
          BS_MODAL.hide();
        } else {
          ELEMENTO_MODAL.classList.remove('show');
          ELEMENTO_MODAL.setAttribute('aria-hidden', 'true');
          ELEMENTO_MODAL.style.display = 'none';
          const BACKDROP = document.querySelector('.modal-backdrop');
          if (BACKDROP) {
            BACKDROP.parentNode?.removeChild(BACKDROP);
          }
        }
      } catch (e) {
        ELEMENTO_MODAL.classList.remove('show');
        ELEMENTO_MODAL.setAttribute('aria-hidden', 'true');
        ELEMENTO_MODAL.style.display = 'none';
        const BACKDROP = document.querySelector('.modal-backdrop');
        if (BACKDROP) {
          BACKDROP.parentNode?.removeChild(BACKDROP);
        }
      }
    }
  }
  
  /**
   * Calcula y actualiza los totales en el formulario de totales si está presente.
   */
  actualizarTotales(): void {
    if (!this.formForTotalCount) { return; }
    let cantidadTotal = 0;
    let valorTotalUSD = 0;
    for (const PARTIDA of this.tableBodyData) {
      cantidadTotal += Number(PARTIDA.cantidad) || 0;
      valorTotalUSD += Number(PARTIDA.totalUSD) || 0;
    }
    this.formForTotalCount.get('cantidadTotal')?.setValue(cantidadTotal);
    this.formForTotalCount.get('valorTotalUSD')?.setValue(valorTotalUSD);
  }
}
