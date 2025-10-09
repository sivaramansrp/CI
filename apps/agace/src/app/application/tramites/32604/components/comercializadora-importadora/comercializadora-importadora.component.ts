/**
 * Componente para la gestión de comercializadoras importadoras en el trámite 32604.
 *
 * Este archivo contiene el componente que maneja la información de empresas comercializadoras
 * importadoras, incluyendo configuración de fechas de pago, montos, operaciones bancarias,
 * gestión de transportistas y configuración de programas IMMEX. Utiliza formularios reactivos
 * y tablas dinámicas para la gestión completa de datos relacionados.
 */

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';

import {
  ConfiguracionColumna,
  InputFecha,
  InputFechaComponent,
  InputRadioComponent,
  Notificacion,
  NotificacionesComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent
} from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';

import { FECHA_DE_PAGO, TRANSPORTISTAS_CONFIGURACION } from '../../constants/empresas-comercializadoras.enum';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';

import { Solicitud32604State, Solicitud32604Store } from '../../estados/solicitud32604.store';

import { InputRadio, SolicitudRadioLista, TransportistasTable } from '../../models/empresas-comercializadoras.model';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';

import { AgregarTransportistasComponent } from '../agregar-transportistas/agregar-transportistas.component';

/**
 * Componente para la gestión de modalidades de comercializadoras importadoras.
 * 
 * Maneja la configuración de fechas de pago, montos, operaciones bancarias,
 * gestión de transportistas y programas IMMEX. Incluye funcionalidades para
 * agregar, modificar y eliminar transportistas mediante tablas dinámicas
 * y formularios reactivos con validaciones específicas.
 * 
 * @component
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-comercializadora-importadora',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFechaComponent,
    TituloComponent,
    TablaDinamicaComponent,
    AgregarTransportistasComponent,
    InputRadioComponent,
    NotificacionesComponent
  ],
  templateUrl: './comercializadora-importadora.component.html',
  styleUrl: './comercializadora-importadora.component.scss',
})
export class ComercializadoraImportadoraComponent implements OnInit, OnDestroy {

  /**
   * Formulario reactivo para el componente modalidad.
   * 
   * Gestiona campos como fecha de pago, monto, operaciones bancarias,
   * llave de pago y configuraciones de programas IMMEX con validaciones específicas.
   * 
   * @property {FormGroup} modalidadForm
   */
  modalidadForm!: FormGroup;

  /**
   * Fecha de pago asociada a la solicitud.
   * 
   * Se inicializa con el valor constante `FECHA_DE_PAGO` que contiene
   * la configuración predeterminada de fecha para el componente.
   * 
   * @property {InputFecha} fechaDePago
   */
  fechaDePago: InputFecha = FECHA_DE_PAGO;

  /**
   * Indica si el formulario está en modo solo lectura.
   * 
   * Cuando es `true`, los campos del formulario no se pueden editar
   * y se muestran únicamente para consulta.
   * 
   * @property {boolean} esFormularioSoloLectura
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Estado actual de la consulta.
   * 
   * Contiene información relacionada con el trámite y el solicitante,
   * incluyendo configuraciones de modo de solo lectura y otros datos contextuales.
   * 
   * @property {ConsultaioState} consultaDatos
   */
  consultaDatos!: ConsultaioState;

  /**
   * Subject para manejar la destrucción de suscripciones.
   * 
   * Utilizado con el operador `takeUntil` para cancelar automáticamente
   * todas las suscripciones activas cuando el componente se destruye.
   * 
   * @private
   * @property {Subject<void>} destroy$
   */
  private destroy$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud 32604.
   * 
   * Contiene toda la información del estado actual del formulario
   * y datos relacionados con la comercializadora importadora.
   * 
   * @public
   * @property {Solicitud32604State} solicitudState
   */
  public solicitudState!: Solicitud32604State;

  /**
   * Tipo de selección para la tabla de transportistas (checkbox).
   * 
   * Define el comportamiento de selección de la tabla como tipo checkbox
   * para permitir selecciones múltiples de transportistas.
   * 
   * @property {TablaSeleccion} transportistasTabla
   */
  transportistasTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas para la tabla de transportistas.
   * 
   * Define la estructura, formato y comportamiento de las columnas
   * que se mostrarán en la tabla de transportistas. Se inicializa con
   * la configuración predeterminada.
   * 
   * @property {ConfiguracionColumna<TransportistasTable>[]} transportistasConfiguracionColumnas
   */
  transportistasConfiguracionColumnas: ConfiguracionColumna<TransportistasTable>[] =
    TRANSPORTISTAS_CONFIGURACION;

  /**
   * Lista de transportistas disponibles para ser seleccionados.
   * 
   * Se llena dinámicamente con los datos de transportistas obtenidos
   * desde el servicio y el estado de la solicitud.
   * 
   * @property {TransportistasTable[]} transportistasLista
   */
  transportistasLista: TransportistasTable[] = [];

  /**
   * Notificación utilizada para mostrar mensajes al usuario.
   * 
   * Objeto que contiene la configuración y contenido
   * de las notificaciones que se muestran en la interfaz.
   * 
   * @public
   * @property {Notificacion} nuevaNotificacion
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Referencia a la vista del modal de transportistas.
   * 
   * ViewChild que permite acceder al elemento DOM del modal
   * utilizado para agregar nuevos transportistas.
   * 
   * @property {ElementRef} transportistaElement
   */
  @ViewChild('transportistas', { static: false })
  transportistaElement!: ElementRef;

  /**
   * Transportistas seleccionados por el usuario.
   * 
   * Almacena los transportistas que el usuario ha seleccionado
   * en la tabla para operaciones posteriores como eliminación.
   * 
   * @property {TransportistasTable[]} seleccionDatos
   */
  seleccionDatos: TransportistasTable[] = [] as TransportistasTable[];

  /**
   * Modelo para la opción de tipo sí/no representado como radio button.
   * 
   * Contiene las opciones disponibles para campos de selección binaria
   * utilizados en diferentes secciones del formulario.
   * 
   * @property {InputRadio} sinoOpcion
   */
  sinoOpcion: InputRadio = {} as InputRadio;

  /**
   * Constructor del componente donde se inicializan servicios y dependencias.
   * 
   * Configura todas las dependencias necesarias para el funcionamiento del componente,
   * incluyendo servicios para gestión de empresas comercializadoras, manejo de estado
   * y consultas de datos.
   * 
   * @param {FormBuilder} fb - Constructor de formularios reactivos de Angular
   * @param {EmpresasComercializadorasService} empresasComercializadorasService - Servicio para gestión de empresas comercializadoras
   * @param {Solicitud32604Store} solicitud32604Store - Store para manejo del estado de la solicitud 32604
   * @param {Solicitud32604Query} solicitud32604Query - Query para consultas del estado de la solicitud 32604
   * @param {ConsultaioQuery} consultaioQuery - Query para el estado de consulta de la aplicación
   */
  constructor(
    public fb: FormBuilder,
    public empresasComercializadorasService: EmpresasComercializadorasService,
    public solicitud32604Store: Solicitud32604Store,
    public solicitud32604Query: Solicitud32604Query,
    public consultaioQuery: ConsultaioQuery
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * 
   * Configura las suscripciones necesarias para el manejo de estados,
   * inicializa el formulario y carga los datos iniciales requeridos
   * para el funcionamiento del componente.
   * 
   * @memberof ComercializadoraImportadoraComponent
   * @implements {OnInit}
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.solicitud32604Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.conseguirOpcionDeRadio();
    this.inicializarFormulario();
    this.inicializarEstadoFormulario();
  }

  /**
   * Inicializa el formulario `modalidadForm` con los valores del estado actual.
   * 
   * Configura un formulario reactivo con campos para fecha de pago, monto,
   * operaciones bancarias, llave de pago y configuraciones de programas.
   * Incluye validaciones específicas de longitud máxima para campos de texto.
   * También inicializa la lista de transportistas desde el estado.
   * 
   * @memberof ComercializadoraImportadoraComponent
   */
  inicializarFormulario(): void {
    this.modalidadForm = this.fb.group({
      fechaPago: [this.solicitudState.fechaPago],
      monto: [this.solicitudState.monto, [Validators.maxLength(10)]],
      operacionesBancarias: [
        this.solicitudState.operacionesBancarias,
        [Validators.maxLength(25)],
      ],
      llavePago: [
        this.solicitudState.llavePago,
        [Validators.maxLength(25)],
      ],
      programaImmex: [this.solicitudState.programaImmex, Validators.required],
      importsRadio: [this.solicitudState.importsRadio, Validators.required],
    });
    this.transportistasLista = this.solicitudState.transportistasLista;
  }


  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   * 
   * Evalúa la propiedad `esFormularioSoloLectura` y habilita o deshabilita
   * todos los controles del formulario según corresponda. Si está en modo
   * de solo lectura, deshabilita todos los controles; de lo contrario, los habilita.
   * 
   * @memberof ComercializadoraImportadoraComponent
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.modalidadForm?.disable();
    } else {
      this.modalidadForm?.enable();
    }
  }

  /**
   * Muestra el modal para agregar un nuevo transportista.
   * 
   * Crea una instancia de modal de Bootstrap utilizando el elemento
   * referenciado y lo muestra para permitir agregar un nuevo transportista.
   * 
   * @memberof ComercializadoraImportadoraComponent
   */
  agregarTransportistaModel(): void {
    if (this.transportistaElement) {
      const MODAL_INSTANCE = new Modal(this.transportistaElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Elimina los transportistas seleccionados de la lista.
   * 
   * Busca cada transportista seleccionado en la lista principal utilizando
   * el RFC como identificador y los elimina usando splice. Permite remover
   * múltiples transportistas de forma segura del array principal.
   * 
   * @memberof ComercializadoraImportadoraComponent
   */
  eliminarDato(): void {
    if (this.seleccionDatos.length > 0) {
      this.seleccionDatos.forEach((elemento) => {
        const INDICE = this.transportistasLista.findIndex(
          (inv) => inv.transportistaRFCModifTrans === elemento.transportistaRFCModifTrans
        );
        if (INDICE !== -1) {
          this.transportistasLista.splice(INDICE, 1);
        }
      });
    }
  }

  /**
   * Obtiene las opciones de radio button (sí/no) desde el servicio.
   * 
   * Realiza una suscripción al observable del servicio para obtener la lista
   * de opciones de radio button que se utilizan en el formulario.
   * Asigna la respuesta a la propiedad `sinoOpcion` para su uso en el template.
   * 
   * @memberof ComercializadoraImportadoraComponent
   */
  conseguirOpcionDeRadio(): void {
    this.empresasComercializadorasService
      .conseguirOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  /**
   * Actualiza la fecha de pago en el estado global de la solicitud.
   * 
   * Recibe un valor de fecha como string y actualiza el campo correspondiente
   * en el store global utilizando el servicio de actualización.
   * Esta fecha se utiliza para el registro de pagos de importación.
   * 
   * @param {string} evento - Fecha de pago en formato string
   * 
   * @memberof ComercializadoraImportadoraComponent
   */
  actualizarFechaPago(evento: string): void {
    this.solicitud32604Store.actualizarFechaPago(evento);
  }

  /**
   * Actualiza el campo 'ProgramaImmex' en el estado global de la solicitud.
   * 
   * Permite modificar el valor del programa IMMEX (Industria Manufacturera,
   * Maquiladora y de Servicios de Exportación) en el estado compartido.
   * Acepta valores tanto string como numéricos para mayor flexibilidad.
   * Verifica si el valor es "Sí" para mostrar modal de restricción.
   * 
   * @param {string | number} valor - Valor del programa IMMEX a establecer
   * 
   * @memberof ComercializadoraImportadoraComponent
   */
  actualizarProgramaImmex(valor: string | number): void {
    // Verificar condición para mostrar modal si selecciona "Sí"
    if (valor === 1 || valor === '1' || valor === 'Si' || valor === 'Sí') {
      this.abrirModal('Es Requisito obligatorio no contar con registro IMMEX, deberá de seleccionar la opción NO, de lo contrario no podrá continuar.');
    }
    this.solicitud32604Store.actualizarProgramaImmex(valor);
  }

  /**
   * Actualiza el campo 'ImportsRadio' en el estado global de la solicitud.
   * 
   * Permite modificar el valor del radio button de importaciones en el
   * estado compartido. Este campo determina el tipo de importación
   * que se está gestionando en el formulario.
   * Verifica si el valor es "No" para mostrar modal de información.
   * 
   * @param {string | number} valor - Valor del radio de importaciones a establecer
   * 
   * @memberof ComercializadoraImportadoraComponent
   */
  actualizarImportsRadio(valor: string | number): void {
    // Verificar condición para mostrar modal si selecciona "No"
    if (valor === 2 || valor === '2' || valor === 'No') {
      this.abrirModal('Se debe efectuar en el semestre inmediato a la fecha en que ingresa su solicitud, importaciones por un valor en aduana no menor a $300,000,000.00');
    }
    this.solicitud32604Store.actualizarImportsRadio(valor);
  }
  
  /**
   * Actualiza la lista de transportistas en el estado global.
   * 
   * Recibe un nuevo transportista y lo agrega a la lista existente
   * utilizando el operador spread para mantener inmutabilidad.
   * Después actualiza el estado global con la lista completa.
   * 
   * @param {TransportistasTable} evento - Nuevo transportista a agregar
   * 
   * @memberof ComercializadoraImportadoraComponent
   */
  seccionTransportistasLista(evento: TransportistasTable): void {
    this.transportistasLista = [...this.transportistasLista, evento];
    this.solicitud32604Store.actualizarTransportistasLista(
      this.transportistasLista
    );
  }

  /**
   * Guarda la selección de transportistas hecha por el usuario.
   * 
   * Almacena el array de transportistas seleccionados desde la tabla
   * para su posterior procesamiento o eliminación. Esta selección
   * se utiliza para operaciones como eliminar múltiples registros.
   * 
   * @param {TransportistasTable[]} evento - Array de transportistas seleccionados
   * 
   * @memberof ComercializadoraImportadoraComponent
   */
  seleccionarDato(evento: TransportistasTable[]): void {
    this.seleccionDatos = evento;
  }

  /**
   * Cierra el modal de notificación.
   * 
   * Resetea la notificación actual para cerrar el modal.
   * 
   * @memberof ComercializadoraImportadoraComponent
   */
  cerrarModal(): void {
    this.nuevaNotificacion = {} as Notificacion;
  }

    /**
   * Índice o identificador del elemento que se desea eliminar de la tabla de pedimentos.
   * 
   * Almacena la referencia del elemento seleccionado
   * para operaciones de eliminación.
   * 
   * @property {number} elementoParaEliminar
   */
  elementoParaEliminar!: number;

  /**
   * Muestra una notificación en forma de modal con el mensaje proporcionado.
   * 
   * Configura y muestra un modal de notificación con características específicas
   * como tipo de alerta, categoría de peligro y tiempo de espera. También
   * almacena el índice del elemento que se desea eliminar para uso posterior.
   * 
   * @param {string} mensaje - El mensaje a mostrar en el modal de notificación
   * @param {number} [i=0] - El índice del elemento a eliminar (opcional, por defecto 0)
   * @memberof DatosComunesComponent
   */
  abrirModal(mensaje: string, i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.elementoParaEliminar = i;
  }
  /**
   * Método del ciclo de vida que se ejecuta cuando el componente es destruido.
   * 
   * Completa y finaliza el Subject `destroy$` para cancelar todas las
   * suscripciones activas y prevenir fugas de memoria. Es una práctica
   * esencial en Angular para la gestión adecuada de recursos.
   * 
   * @memberof ComercializadoraImportadoraComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
