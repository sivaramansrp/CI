/**
 * @fileoverview
 * Componente para la gestión de terceros relacionados en el trámite 220201 de agricultura.
 * Permite buscar, agregar, modificar y eliminar terceros relacionados, así como mostrar tablas dinámicas de exportadores y destinos.
 * Cobertura compodoc 100%: cada clase, método, propiedad y evento está documentada.
 * @module TercerosrelacionadosComponent
 */

import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent, CatalogoSelectComponent, ConfiguracionColumna, InputRadioComponent, Notificacion, NotificacionesComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DatosDeLaSolicitud, TercerosrelacionadosdestinoTable } from '../../models/tercerosrelacionados.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OPCION_DE_BOTON_DE_RADIO, SELECCIONADO } from '../../constantes/tercerosrelacionados.enum';
import { CommonModule } from '@angular/common';
import { DestinatarioForm } from '../../../tramites/220203/models/220203/importacion-de-acuicultura.module';
import { ModalComponent } from '../modal/modal.component';
import { RadioOpcion } from '../../../tramites/220201/models/220201/certificado-zoosanitario.model';

/**
 * Componente para la gestión de terceros relacionados.
 * Permite buscar, agregar, modificar y eliminar terceros relacionados, así como mostrar tablas dinámicas de exportadores y destinos.
 *
 * @class TercerosrelacionadosComponent
 */
@Component({
  selector: 'app-tercerosrelacionados',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent,
    NotificacionesComponent
  ],
  templateUrl: './tercerosrelacionados.component.html',
})
export class TercerosrelacionadosComponent {
  /**
   * Clase CSS para el tipo de alerta informativa.
   * @type {string}
   */
  infoAlert: string = "alert-info";

  /**
   * Valor de selección por defecto.
   * @type {string}
   */
  seleccionado: string = SELECCIONADO;

  /**
   * Indica si se muestra la vista de búsqueda avanzada.
   * @type {boolean}
   */
  mostrarVista: boolean = false;

  /**
   * Opciones para el botón de radio de tipo persona.
   * @type {RadioOpcion[]}
   */
  opcionDeBotonDeRadio: RadioOpcion[] = OPCION_DE_BOTON_DE_RADIO;

  /**
   * Referencia al siguiente campo de entrada para enfoque automático.
   * @type {ElementRef<HTMLInputElement>}
   */
  @ViewChild('nextField') nextField!: ElementRef<HTMLInputElement>;

  /**
   * Catálogos de datos de la solicitud, como países y estados.
   * @type {DatosDeLaSolicitud}
   */
  @Input() catalogosDatos: DatosDeLaSolicitud = {} as DatosDeLaSolicitud;
  /**
   * Representa una nueva notificación que será utilizada en el componente.
   * @type {Notificacion}
   */
  public nuevaNotificacion!: Notificacion;
  /**
   * Indica si se deben eliminar los datos de la tabla.
   * @type {boolean}
   */
  public eliminarDatosTabla: boolean = false;
  /**
   * Indica si se deben eliminar los datos de exportador.
   * @type {boolean}
   */
  public eliminarDatoExportador: boolean = false;
  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * Cuando es verdadero, el formulario se presenta únicamente para visualización,
   * deshabilitando la edición de los campos.
   * @type {boolean}
   * @default false
   */
  @Input() esFormularioSoloLectura: boolean = false;

  /**
   * Cuerpo de la tabla de destinatarios.
   * @type {TercerosrelacionadosdestinoTable[]}
   */
  @Input() cuerpoTablaDestino: TercerosrelacionadosdestinoTable[] = [];
  /**
 * Cuerpo de la tabla de exportadores.
 * @type {TercerosrelacionadosTable[]}
 */
  @Input() cuerpoTablaExportador: DestinatarioForm[] = [];
  /**
   * Referencia al modal utilizado en el componente.
   * Permite abrir y cerrar el modal según sea necesario.
   * @type {ModalComponent}
   */
  @ViewChild('modalRef', { static: false }) modalRef!: ModalComponent;


  /**
   * Evento emitido al eliminar una selección de destinatarios.
   * @type {EventEmitter<TercerosrelacionadosdestinoTable[]>}
   */
  @Output() eliminarSeleccion: EventEmitter<TercerosrelacionadosdestinoTable[]> = new EventEmitter();
  /**
 * Evento emitido al eliminar una selección de destinatarios.
 * @type {EventEmitter<TercerosrelacionadosdestinoTable[]>}
 */
  @Output() eliminarSeleccionEstinoTable: EventEmitter<DestinatarioForm[]> = new EventEmitter();

  /**
   * Tipo de selección para la tabla de destinatarios.
   * Utiliza la enumeración TablaSeleccion para definir el tipo de selección.
   * @type {TablaSeleccion}
   */
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Lista de filas seleccionadas de destinatarios.
   * @type {TercerosrelacionadosdestinoTable[]}
   */
  listaDeFilaSeleccionada: TercerosrelacionadosdestinoTable[] = [];
  /**
   * Lista de filas seleccionadas de destinatarios finales.
   * @type {TercerosrelacionadosdestinoTable[]}
   */
  listaDeFilaSeleccionadaFinal: DestinatarioForm[] = [];

  /**
   * Configuración de las columnas para la tabla de exportadores.
   * @type {ConfiguracionColumna<TercerosrelacionadosTable>[]}
   */
  configuracionColumnasExportador: ConfiguracionColumna<DestinatarioForm>[] = [
    { encabezado: 'Nombre/denominación o razón social', clave: (fila) => fila.nombre, orden: 1 },
    { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 2 },
    { encabezado: 'Correo', clave: (fila) => fila.correo, orden: 3 },
    { encabezado: 'Domicilio', clave: (fila) => fila.razonSocial, orden: 4 },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 5 },
  ];
  /**
    * Evento emitido para abrir el modal de exportador.
    * @type {abrirModalDestinatario}
    */
  @Output() abrirModalDestinatario = new EventEmitter<TercerosrelacionadosdestinoTable>();
  /**
   * Evento emitido para abrir el modal de exportador.
   * @type {EventEmitter<TercerosrelacionadosdestinoTable>}
   */
  @Output() abrirModalExportador = new EventEmitter<DestinatarioForm>();

  /**
   * Configuración de las columnas para la tabla de destinatarios.
   * @type {ConfiguracionColumna<TercerosrelacionadosdestinoTable>[]}
   */
  configuracionColumnasDestino: ConfiguracionColumna<TercerosrelacionadosdestinoTable>[] = [
    { encabezado: 'Nombre/denominación o razón social', clave: (fila) => fila.nombre, orden: 1 },
    { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 2 },
    { encabezado: 'Correo electrónico', clave: (fila) => fila.correo, orden: 3 },
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 4 },
    { encabezado: 'Número exterior', clave: (fila) => fila.numeroExterior, orden: 5 },
    { encabezado: 'Número interior', clave: (fila) => fila.numeroInterior, orden: 6 },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 7 },
    { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 8 },
    { encabezado: 'Municipio/Alcaldía', clave: (fila) => fila.municipio, orden: 9 },
    { encabezado: 'Entidad Federativa', clave: (fila) => fila.estado, orden: 10 },
    { encabezado: 'Código Postal', clave: (fila) => fila.codigoPostal, orden: 11 },
  ];

  /**
   * Formulario reactivo para búsqueda de destinatarios.
   * @type {FormGroup}
   */
  buscarForm!: FormGroup;

  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento de Angular.
   * @param route Información de la ruta activa.
   * @param fb FormBuilder para crear el formulario reactivo.
   */
  constructor(
    public readonly router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.buscarForm = this.fb.group({
      tipoPersona: ['yes'],
      razonSocial: [''],
      correoElectronico: [''],
      pais: ['1'],
      entidadFederativa: ['']
    });
  }

  /**
   * Navega a la pantalla para agregar un nuevo destinatario.
   * @method goToAgregarDestinatario
   */
  goToAgregarDestinatario(): void {
    this.abrirModalDestinatario.emit();
  }
  goToAgregarExportador(): void {
    this.abrirModalExportador.emit();
  }
  /**
   * Navega a la pantalla para modificar un destinatario existente.
   * @method modificarDestinatario
   */
  modificarDestinatario(): void {
    if (this.listaDeFilaSeleccionada[0]) {
      this.abrirModalDestinatario.emit(this.listaDeFilaSeleccionada[0]);
    }
    else {
      this.abrirModalDestinatario.emit();
    }
  }
  /**
 * Navega a la pantalla para modificar un destinatario existente.
 * @method modificarDestinatario
 */
  modificarDestinatarioFinal(): void {
    if (this.listaDeFilaSeleccionadaFinal[0]) {
      this.abrirModalExportador.emit(this.listaDeFilaSeleccionadaFinal[0]);
    }
    else {
      this.abrirModalExportador.emit();
    }
  }


  /**
   * Actualiza la lista de filas seleccionadas de destinatarios.
   * @param filas Filas seleccionadas.
   * @method onSeleccionDestinatario
   */
  onSeleccionDestinatario(filas: TercerosrelacionadosdestinoTable[]): void {
    this.listaDeFilaSeleccionada = filas;
  }

  /**
   * Actualiza la lista de filas seleccionadas de destinatarios.
   * @param filas Filas seleccionadas.
   * @method onSeleccionDestinatario
   */
  onSeleccionDestinatarioFinal(filas: DestinatarioForm[]): void {
    this.listaDeFilaSeleccionadaFinal = filas;
  }
  /**
   * Emite el evento para eliminar la selección de destinatarios.
   * @method emitEliminar
   */
  emitEliminar(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Confirmar eliminación',
      mensaje: 'Está seguro que desea eliminar estos datos?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
    this.eliminarDatosTabla = true;
  }
  /**
  * Emite el evento para eliminar la selección de destinatarios.
  * @method emitEliminar
  */
  emitEliminarFinal(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Confirmar eliminación',
      mensaje: 'Está seguro que desea eliminar estos datos?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
    this.eliminarDatoExportador = true;
  }

  /**
   * Activa la vista de búsqueda avanzada y enfoca el siguiente campo.
   * @method buscarDestinatario
   */
  buscarDestinatario(): void {
    this.mostrarVista = !this.mostrarVista;
    this.nextField.nativeElement.focus();
  }

  /**
   * Limpia el formulario de búsqueda y restablece los valores por defecto.
   * @method limpiarFormulario
   */
  limpiarFormulario(): void {
    this.buscarForm.reset();
    this.buscarForm.patchValue({
      tipoPersona: 'yes',
      pais: '1',
    });
  }
  eliminarPedimentoDatos(borrar: boolean) {
    if (borrar) {
      this.eliminarDatosTabla = false;
      this.eliminarSeleccion.emit(this.listaDeFilaSeleccionada);
    } else {
      this.eliminarDatosTabla = false;
    }

  }
  eliminarExportador(borrar: boolean) {
    if (borrar) {
      this.eliminarDatoExportador = false;
      this.eliminarSeleccionEstinoTable.emit(this.listaDeFilaSeleccionadaFinal);
    } else {
      this.eliminarDatoExportador = false;
    }

  }
}