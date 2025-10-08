/**
 * Componente para la gestión de terceros relacionados en el trámite 32604.
 *
 * Este archivo contiene el componente que maneja la información de terceros relacionados
 * que pueden recibir notificaciones, incluyendo enlaces operativos, representantes legales
 * y configuración de notificaciones. Utiliza tablas dinámicas para mostrar y gestionar
 * los datos obtenidos de servicios especializados.
 */

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionColumna, Notificacion, NotificacionesComponent, Pedimento, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { ENLACE_OPERATIVO_CONFIGURACION, RECIBIR_NOTIFICACIONES_CONFIGURACION } from '../../constants/empresas-comercializadoras.enum';
import { EnlaceOperativo, RecibirNotificaciones, RepresentanteLegal } from '../../models/empresas-comercializadoras.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud32604State, Solicitud32604Store } from '../../estados/solicitud32604.store';
import { Subject, map, takeUntil } from 'rxjs';
import { AgregarEnlaceOperativoComponent } from '../agregar-enlace-operativo/agregar-enlace-operativo.component';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';
import { HttpClientModule } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';

/**
 * Componente para la gestión de terceros relacionados que pueden recibir notificaciones.
 * 
 * Maneja la visualización y administración de enlaces operativos, representantes legales
 * y configuraciones de notificaciones mediante tablas dinámicas y formularios reactivos.
 * Incluye funcionalidades para búsqueda, agregado, modificación y eliminación de terceros.
 * 
 * @component
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent,
    HttpClientModule,
    AgregarEnlaceOperativoComponent,
    NotificacionesComponent,
  ],
  providers: [EmpresasComercializadorasService],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
/**
 * Componente encargado de mostrar la lista de terceros relacionados
 * que pueden recibir notificaciones. Utiliza una tabla dinámica para
 * mostrar los datos obtenidos del servicio `empresasComercializadorasService`.
 */
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  /**
   * Notificación que se mostrará al usuario.
   * 
   * Contiene la configuración y contenido de las notificaciones
   * que se despliegan en la interfaz de usuario.
   * 
   * @public
   * @property {Notificacion} nuevaNotificacion
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Elemento para eliminar de la tabla de pedimentos.
   * 
   * Almacena el índice del elemento seleccionado
   * para operaciones de eliminación.
   * 
   * @property {number} elementoParaEliminar
   */
  elementoParaEliminar!: number;

  /**
   * Formulario reactivo para gestionar la información de los terceros relacionados.
   * 
   * Contiene campos para RFC, datos personales, teléfono y correo electrónico
   * con validaciones específicas para cada campo.
   * 
   * @property {FormGroup} tercerosRelacionadosForm
   */
  tercerosRelacionadosForm!: FormGroup;

  /**
   * Tipo de selección para la tabla principal (por defecto: UNDEFINED).
   * 
   * Define el comportamiento de selección de la tabla principal
   * sin permitir selecciones múltiples o individuales.
   * 
   * @property {TablaSeleccion} tipoSeleccionTabla
   */
  tipoSeleccionTabla = TablaSeleccion.UNDEFINED;

  /**
   * Tipo de selección para la tabla de enlace operativo (por defecto: CHECKBOX).
   * 
   * Define el comportamiento de selección de la tabla como tipo checkbox
   * para permitir selecciones múltiples de enlaces operativos.
   * 
   * @property {TablaSeleccion} enlaceOperativoTabla
   */
  enlaceOperativoTabla = TablaSeleccion.CHECKBOX;

  /**
   * Lista de pedimentos asociados al componente.
   * 
   * Array que contiene todos los pedimentos registrados
   * relacionados con los terceros.
   * 
   * @property {Array<Pedimento>} pedimentos
   */
  pedimentos: Array<Pedimento> = [];

  /**
   * Datos seleccionados para el enlace operativo.
   * 
   * Almacena los enlaces operativos que el usuario ha seleccionado
   * en la tabla para operaciones posteriores.
   * 
   * @property {EnlaceOperativo[]} seleccionEnlaceOperativoDatos
   */
  seleccionEnlaceOperativoDatos: EnlaceOperativo[] = [] as EnlaceOperativo[];

  /**
   * Configuración de las columnas de la tabla de enlace operativo.
   * 
   * Define la estructura, formato y comportamiento de las columnas
   * que se mostrarán en la tabla de enlaces operativos.
   * 
   * @property {ConfiguracionColumna<EnlaceOperativo>[]} enlaceOperativoConfiguracionColumnas
   */
  enlaceOperativoConfiguracionColumnas: ConfiguracionColumna<EnlaceOperativo>[] =
    ENLACE_OPERATIVO_CONFIGURACION;

  /**
   * Lista de enlaces operativos registrados.
   * 
   * Contiene todos los enlaces operativos disponibles
   * para mostrar en la tabla correspondiente.
   * 
   * @property {EnlaceOperativo[]} enlaceOperativosLista
   */
  enlaceOperativosLista: EnlaceOperativo[] = [] as EnlaceOperativo[];

  /**
   * Referencia al componente de enlace operativo para abrir el modal.
   * 
   * ViewChild que permite acceder al elemento DOM del modal
   * utilizado para agregar o modificar enlaces operativos.
   * 
   * @property {ElementRef} modificacionEnlaceOperativoElement
   */
  @ViewChild('agregarEnlaceOperativo', { static: false })
  modificacionEnlaceOperativoElement!: ElementRef;

  /**
   * Configuración de las columnas para la tabla de notificaciones.
   * 
   * Define la estructura de las columnas para mostrar
   * información de notificaciones que pueden recibir los terceros.
   * 
   * @property {ConfiguracionColumna<RecibirNotificaciones>[]} configuracionColumnas
   */
  configuracionColumnas: ConfiguracionColumna<RecibirNotificaciones>[] =
    RECIBIR_NOTIFICACIONES_CONFIGURACION;

  /**
   * Lista de notificaciones que el tercero puede recibir.
   * 
   * Contiene todos los tipos de notificaciones disponibles
   * que pueden ser configuradas para los terceros relacionados.
   * 
   * @property {RecibirNotificaciones[]} orecibirNotificacionesLista
   */
  orecibirNotificacionesLista: RecibirNotificaciones[] =
    [] as RecibirNotificaciones[];

  /**
   * Subject que controla la destrucción de las suscripciones.
   * 
   * Utilizado con el operador `takeUntil` para cancelar automáticamente
   * todas las suscripciones activas cuando el componente se destruye.
   * 
   * @private
   * @property {Subject<void>} destroy$
   */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Estado de la solicitud 32604 actual.
   * 
   * Contiene toda la información del estado actual del formulario
   * y datos relacionados con los terceros relacionados.
   * 
   * @property {Solicitud32604State} solicitud32604State
   */
  solicitud32604State: Solicitud32604State = {} as Solicitud32604State;

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
   * Constructor del componente que inicializa las dependencias y carga los datos iniciales.
   *
   * Configura las dependencias del componente, establece suscripción al estado de consulta
   * para manejar el modo de solo lectura y realiza la carga inicial de datos de enlaces
   * operativos y notificaciones.
   *
   * @param {FormBuilder} fb - Constructor de formularios reactivos de Angular
   * @param {EmpresasComercializadorasService} empresasComercializadorasService - Servicio para gestión de datos de empresas comercializadoras
   * @param {Solicitud32604Store} solicitud32604Store - Store para manejo del estado de la solicitud 32604
   * @param {Solicitud32604Query} solicitud32604Query - Query para consultas del estado de la solicitud 32604
   * @param {ConsultaioQuery} consultaioQuery - Query para el estado de consulta de la aplicación
   */
  constructor(
    private fb: FormBuilder,
    public empresasComercializadorasService: EmpresasComercializadorasService,
    public solicitud32604Store: Solicitud32604Store,
    public solicitud32604Query: Solicitud32604Query,
    public consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.conseguirEnlaceOperativoDatos();
    this.conseguirRecibirNotificaciones();
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * 
   * Configura el estado inicial del formulario llamando al método
   * de inicialización correspondiente según el modo de operación.
   * 
   * @memberof TercerosRelacionadosComponent
   * @implements {OnInit}
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * 
   * Determina el modo de operación del formulario basado en el estado
   * de solo lectura y ejecuta la acción correspondiente.
   * 
   * @memberof TercerosRelacionadosComponent
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Carga datos del estado y configura el formulario según el modo de operación.
   * 
   * Inicializa el formulario y luego aplica el estado de solo lectura
   * habilitando o deshabilitando los controles según corresponda.
   * 
   * @memberof TercerosRelacionadosComponent
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.tercerosRelacionadosForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.tercerosRelacionadosForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
 * Método que elimina un pedimento de la lista de pedimentos.
 *
 * Verifica si debe proceder con la eliminación y remueve el elemento
 * de la lista utilizando el índice almacenado en elementoParaEliminar.
 *
 * @param {boolean} borrar - Indica si se debe proceder con la eliminación del pedimento.
 *                          Si es `true`, se elimina el pedimento en el índice especificado
 * @memberof TercerosRelacionadosComponent
 */
eliminarPedimento(borrar: boolean): void {
  if (borrar) {
    this.pedimentos.splice(this.elementoParaEliminar, 1);
  }
}

  /**
   * Inicializa el formulario `tercerosRelacionadosForm` con los datos del estado actual.
   *
   * Configura un formulario reactivo que recopila información detallada sobre terceros
   * relacionados, incluyendo RFC, datos personales, teléfono y correo electrónico.
   * Algunos campos están deshabilitados para mostrar información de solo lectura
   * obtenida del servicio. También establece suscripción al estado para mantener
   * sincronización automática.
   *
   * @memberof TercerosRelacionadosComponent
   */
  inicializarFormulario(): void {
    this.tercerosRelacionadosForm = this.fb.group({
      idPersonaSolicitud: [this.solicitud32604State.idPersonaSolicitud],
      rfcTercero: [this.solicitud32604State.rfcTercero, [Validators.required]],
      rfc: [{ value: this.solicitud32604State.rfc, disabled: true }],
      nombre: [{ value: this.solicitud32604State.nombre, disabled: true }],
      apellidoPaterno: [
        { value: this.solicitud32604State.apellidoPaterno, disabled: true },
      ],
      apellidoMaterno: [
        { value: this.solicitud32604State.apellidoMaterno, disabled: true },
      ],
      telefono: [this.solicitud32604State.telefono, [Validators.required]],
      correoElectronico: [
        this.solicitud32604State.correoElectronico,
        [Validators.required, Validators.email],
      ],
    });

    this.solicitud32604Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32604State) => {
          this.solicitud32604State = respuesta;
          this.tercerosRelacionadosForm.patchValue({
            idPersonaSolicitud: this.solicitud32604State.idPersonaSolicitud,
            rfcTercero: this.solicitud32604State.rfcTercero,
            rfc: this.solicitud32604State.rfc,
            nombre: this.solicitud32604State.nombre,
            apellidoPaterno: this.solicitud32604State.apellidoPaterno,
            apellidoMaterno: this.solicitud32604State.apellidoMaterno,
            telefono: this.solicitud32604State.telefono,
            correoElectronico: this.solicitud32604State.correoElectronico,
          });
          this.enlaceOperativosLista =
            this.solicitud32604State.enlaceOperativosLista;
        })
      )
      .subscribe();
  }

  /**
   * Método que obtiene la lista de notificaciones que puede recibir el tercero.
   * 
   * Se suscribe al servicio para obtener los tipos de notificaciones disponibles
   * y los asigna a la propiedad correspondiente para su visualización en la tabla.
   * 
   * @memberof TercerosRelacionadosComponent
   */
  conseguirRecibirNotificaciones(): void {
    this.empresasComercializadorasService
      .conseguirRecibirNotificaciones()
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: RecibirNotificaciones[]) => {
        this.orecibirNotificacionesLista = respuesta;
      });
  }

  /**
   * Método que obtiene los datos de enlace operativo para ser mostrados en la tabla.
   * 
   * Se suscribe al servicio para cargar la información de enlaces operativos
   * disponibles y los asigna a la lista correspondiente para su visualización.
   * 
   * @memberof TercerosRelacionadosComponent
   */
  conseguirEnlaceOperativoDatos(): void {
    this.empresasComercializadorasService
      .conseguirEnlaceOperativoDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: EnlaceOperativo[]) => {
        this.enlaceOperativosLista = respuesta;
      });
  }

  /**
   * Método que busca los datos de un tercero por su RFC.
   * 
   * Realiza una consulta al servicio para obtener información del representante legal
   * utilizando el RFC ingresado y actualiza el estado con los datos recibidos.
   * Muestra un modal informativo al finalizar la operación.
   * 
   * @memberof TercerosRelacionadosComponent
   */
  buscarTerceroNacionalIDC(): void {
    if (this.tercerosRelacionadosForm.get('rfcTercero')?.value) {
      this.empresasComercializadorasService
        .conseguirRepresentanteLegalDatos()
        .pipe(takeUntil(this.destroy$))
        .subscribe((respuesta: RepresentanteLegal) => {
          this.solicitud32604Store.actualizarRfc(respuesta.rfc);
          this.solicitud32604Store.actualizarNombre(respuesta.nombre);
          this.solicitud32604Store.actualizarApellidoPaterno(
            respuesta.apellidoPaterno
          );
          this.solicitud32604Store.actualizarApellidoMaterno(
            respuesta.apellidoMaterno
          );
          this.solicitud32604Store.actualizarTelefono(respuesta.telefono);
          this.solicitud32604Store.actualizarCorreoElectronico(
            respuesta.correoElectronico
          );
        });
    }
    this.abrirModal(
      'No se ha proporcionado información que es requerida.'
    );
  }

  /**
   * Actualiza el RFC del tercero en el store.
   * 
   * Extrae el valor del input desde el evento y lo almacena
   * en el estado global para el campo RFC del tercero.
   * 
   * @param {Event} evento - Evento de cambio del input con el RFC del tercero
   * @memberof TercerosRelacionadosComponent
   */
  actualizarRfcTercero(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarRfcTercero(VALOR);
  }

  /**
   * Actualiza el teléfono en el store.
   * 
   * Extrae el valor del input desde el evento y lo almacena
   * en el estado global para el campo de teléfono.
   * 
   * @param {Event} evento - Evento de cambio del input con el teléfono
   * @memberof TercerosRelacionadosComponent
   */
  actualizarTelefono(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarTelefono(VALOR);
  }

  /**
   * Actualiza el correo electrónico en el store.
   * 
   * Extrae el valor del input desde el evento y lo almacena
   * en el estado global para el campo de correo electrónico.
   * 
   * @param {Event} evento - Evento de cambio del input con el correo electrónico
   * @memberof TercerosRelacionadosComponent
   */
  actualizarCorreoElectronico(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarCorreoElectronico(VALOR);
  }

  /**
   * Abre el modal para guardar datos del enlace operativo.
   * 
   * Crea una instancia de modal de Bootstrap utilizando el elemento
   * referenciado y lo muestra para capturar datos del enlace operativo.
   * 
   * @memberof TercerosRelacionadosComponent
   */
  guardarDatosEnlaceOperativo(): void {
    if (this.modificacionEnlaceOperativoElement) {
      const MODAL_INSTANCE = new Modal(
        this.modificacionEnlaceOperativoElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Guarda la modificación del enlace operativo en el modal.
   * 
   * Abre el modal de modificación para permitir la edición
   * de los datos del enlace operativo seleccionado.
   * 
   * @memberof TercerosRelacionadosComponent
   */
  guardarModificacionEnlaceOperativo(): void {
    if (this.modificacionEnlaceOperativoElement) {
      const MODAL_INSTANCE = new Modal(
        this.modificacionEnlaceOperativoElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Selecciona un enlace operativo para su modificación.
   * 
   * Almacena los enlaces operativos seleccionados desde la tabla
   * en la propiedad correspondiente para operaciones posteriores.
   * 
   * @param {EnlaceOperativo[]} evento - Array de enlaces operativos seleccionados
   * @memberof TercerosRelacionadosComponent
   */
  seleccionEnlaceOperativo(evento: EnlaceOperativo[]): void {
    this.seleccionEnlaceOperativoDatos = evento;
  }

  /**
   * Elimina el enlace operativo seleccionado de la lista.
   * 
   * Filtra la lista de enlaces operativos para remover el elemento
   * seleccionado utilizando el RFC como identificador único.
   * 
   * @memberof TercerosRelacionadosComponent
   */
  cerrarDialogoEnlaceOperativo(): void {
    if (this.seleccionEnlaceOperativoDatos.length > 0) {
      this.enlaceOperativosLista = this.enlaceOperativosLista.filter(
        (element) => element.rfc !== this.seleccionEnlaceOperativoDatos[0].rfc
      );
    }
  }

  /**
   * Agrega un enlace operativo y un pedimento a las listas correspondientes.
   * 
   * Crea un pedimento por defecto, agrega el enlace operativo recibido a la lista,
   * actualiza el estado en el store y muestra un modal de notificación con
   * información sobre datos obligatorios.
   *
   * @param {EnlaceOperativo} evento - El objeto de tipo EnlaceOperativo que se va a agregar a la lista
   * @memberof TercerosRelacionadosComponent
   */
  agregarEnlaceOperativo(evento: EnlaceOperativo): void {
    const PEDIMENTO = {
      patente: 0,
      pedimento: 0,
      aduana: 0,
      idTipoPedimento: 0,
      descTipoPedimento: 'Por evaluar',
      numero: '',
      comprobanteValor: '',
      pedimentoValidado: false,
    };
    this.abrirModal(
      'Debe capturar todos los datos marcados como obligatorios.'
    );
    this.pedimentos.push(PEDIMENTO);
    this.enlaceOperativosLista = [...this.enlaceOperativosLista, evento];
    this.solicitud32604Store.actualizarEnlaceOperativosLista(
      this.enlaceOperativosLista
    );
  }

  /**
   * Método que abre un modal para mostrar una notificación con el mensaje proporcionado.
   *
   * Configura y muestra un modal de notificación de alerta con el mensaje especificado.
   * También almacena el índice del elemento para operaciones posteriores de eliminación.
   *
   * @param {string} mensaje - El mensaje que se mostrará en la notificación
   * @param {number} [i=0] - Índice opcional para indicar qué elemento se eliminará (por defecto 0)
   * @memberof TercerosRelacionadosComponent
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
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * 
   * Limpia y completa la señal de destrucción para evitar fugas de memoria.
   * Emite un valor en el Subject destroy$ y lo completa para cancelar
   * automáticamente todas las suscripciones activas.
   * 
   * @memberof TercerosRelacionadosComponent
   * @implements {OnDestroy}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
