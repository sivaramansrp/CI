import { AbstractControl, FormBuilder, ValidationErrors } from "@angular/forms";
import { Catalogo, CatalogoLista, SolicitudTabla, SolicitudTablaDatos } from "../../models/autorizacion-importacion.model";
import { CatalogoSelectComponent,InputFecha,InputFechaComponent,NotificacionesComponent,Pedimento,TablaDinamicaComponent,TablaSeleccion,TituloComponent,ValidacionesFormularioService} from "@libs/shared/data-access-user/src";
import { ConsultaioQuery, ConsultaioState } from "@ng-mf/data-access-user";
import { FECHA_CARTAPORTE, FECHA_DESTINO, FECHA_IMPORTACION, FECHA_VENCIMIENTO, TABLA_DE_DATOS, TEXTOS } from "../../constants/autorizacion-importacion.enum";
import { AutorizacionImportacionService } from "../../services/autorizacion-importacion.service";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Modal } from 'bootstrap';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Subject } from "rxjs";
import { Tramite6402Query } from "../../estados/tramite6402.query";
import { Tramite6402State } from "../../estados/tramite6402.store";
import { Tramite6402Store } from "../../estados/tramite6402.store";
import { Validators } from "@angular/forms";
import { ViewChild } from "@angular/core";
import { map } from "rxjs";
import { takeUntil } from "rxjs";
/**
 * Componente para gestionar el aviso de traslado.
 * 
 * Este componente permite al usuario capturar, editar y gestionar la información
 * relacionada con el aviso de traslado, incluyendo datos de la empresa, mercancías,
 * Mercancias y otros detalles necesarios para el trámite 6402.
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    NotificacionesComponent
  ],
  standalone: true,
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} solicitudFormulario
   * @description Formulario reactivo que contiene los datos del solicitudFormulario en el trámite.
  */
  solicitudFormulario!: FormGroup;

  /**
   * @property {FormGroup} mercanciaFormulario
   * @description Formulario reactivo que contiene los datos del mercanciaFormulario en el trámite.
  */
  mercanciaFormulario!: FormGroup;

  /**
   * Representa una nueva instancia de notificación asociada con el componente.
   * Esta propiedad se utiliza para gestionar y almacenar datos de notificaciones.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Sujeto utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
  */
  public destroyNotifier$: Subject<void> = new Subject();
  /**
   * @property {Tramite6402State} tramiteState
   * @description Estado actual del trámite 6402, que contiene toda la información relevante del proceso.
  */
  public tramiteState!: Tramite6402State;

  /**
   * @property {InputFecha} fechaImportacion
   * @description Fecha de importación utilizada en el trámite.
   */
  public fechaImportacion: InputFecha = FECHA_IMPORTACION;

  /**
   * @property {InputFecha} fechaVencimiento
   * @description Fecha de vencimiento utilizada en el trámite.
   */
  public fechaVencimiento: InputFecha = FECHA_VENCIMIENTO;

  /**
   * @property {InputFecha} fechaCartaPorte
   * @description Fecha de la carta porte utilizada en el trámite.
   */
  public fechaCartaPorte: InputFecha = FECHA_CARTAPORTE;

  /**
   * @property {InputFecha} fechaDestino
   * @description Fecha de destino utilizada en el trámite.
   */
  public fechaDestino: InputFecha = FECHA_DESTINO;
  /**
   * @property {Catalogo[]} entidadFederativa
   * @description Lista de entidades federativas cargadas desde un catálogo.
  */
  entidadFederativa: Catalogo[] = [];

  /**
   * @property {Catalogo[]} aduanas
   * @description Lista de aduanas cargadas desde un catálogo.
   */
  aduanas: Catalogo[] = [];
  /**
   * @property {Catalogo[]} aduaneras
   * @description Lista de aduaneras cargadas desde un catálogo.
   */
  aduaneras: Catalogo[] = [];
  /**
   * @property {Catalogo[]} recintoFiscalizado
   * @description Lista de recintos fiscalizados cargados desde un catálogo.
   */
  recintoFiscalizado: Catalogo[] = [];
  /**
   * @property {Catalogo[]} tipoDeDocumento
   * @description Lista de tipos de documentos cargados desde un catálogo.
   */
  tipoDeDocumento: Catalogo[] = [];
  /**
   * @property {Catalogo[]} medioDeTransporte
   * @description Lista de medios de transporte cargados desde un catálogo.
   */
  medioDeTransporte: Catalogo[] = [];
  /**
   * @property {Catalogo[]} paisDeProcedencia
   * @description Lista de países de procedencia cargados desde un catálogo.
   */
  paisDeProcedencia: Catalogo[] = [];
  /**
   * @property {Catalogo[]} siNo
   * @description Lista de opciones "Sí" o "No" cargadas desde un catálogo.
   */
  siNo: Catalogo[] = [];
  /**
   * @property {Catalogo[]} tipoDeDestino
   * @description Lista de tipos de destino cargados desde un catálogo.
   */
  tipoDeDestino: Catalogo[] = [];

  /**
   * @property {TablaSeleccion} tablaSeleccion
   * @description Propiedad que representa la tabla de selección utilizada en el componente.
  */
  /**
   * @property {string} INPUT
   * @description Cadena de texto utilizada como entrada en el componente.
   * 
   * Esta propiedad puede ser utilizada para almacenar valores temporales
   * o como referencia en diferentes métodos del componente.
   */
  INPUT: HTMLInputElement = document.createElement('input');

  /**
   * @property {TablaSeleccion} tablaSeleccion
   * @description Propiedad que representa la tabla de selección utilizada en el componente.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * @property {object} tablaDeDatos
   * @description Configuración de la tabla de datos utilizada en el componente.
   * Contiene las definiciones de las columnas (encabezados) y los datos que se mostrarán en la tabla.
   */
  tablaDeDatos = TABLA_DE_DATOS;

  /**
   * @property {SolicitudTabla[]} filaSeleccionadaLista
   * @description Lista de filas seleccionadas en la tabla de avisos. 
   * Contiene los datos de las filas seleccionadas por el usuario.
  */
  filaSeleccionadaLista: SolicitudTabla[] = [];
  /**
   * @property {ElementRef} modalMercancia
   * @description Referencia al elemento del modal de Mercancia en la plantilla HTML.
   * Utilizado para abrir o manipular el modal de Mercancia.
  */
  @ViewChild('modalMercancia') modalMercancia!: ElementRef;
  /**
   * @property {ElementRef} closeMercancia
   * @description Referencia al botón o elemento que cierra el modal de Mercancia.
   * Utilizado para cerrar el modal de manera programática.
  */
  @ViewChild('closeMercancia') public closeMercancia!: ElementRef;

  /**
   * @property {any} TEXTOS
   * @description Constante que contiene textos o mensajes utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
 * @property {ConsultaioState} consultaDatos
 * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
 */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

    /** 
  * Arreglo que contiene los pedimentos registrados.
  */
  public pedimentos: Array<Pedimento> = [];

  /**
   * Propiedad para almacenar el identificador del elemento que se va a eliminar o editar.
   * Se utiliza en la edición y eliminación de mercancías y pedimentos.
   */
  public elementoParaEliminar?: number;

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {Tramite6402Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite6402Query} tramiteQuery - Query para obtener el estado del trámite.
   * @param {autorizacionImportacionService} autorizacionImportacionService - Servicio para obtener datos relacionados con el aviso.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
  */
  constructor(
    public fb: FormBuilder,
    public store: Tramite6402Store,
    public tramiteQuery: Tramite6402Query,
    public autorizacionImportacionService: AutorizacionImportacionService,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Configura los formularios, carga los datos iniciales y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
      this.consultaioQuery.selectConsultaioState$.pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.cargarFederativa();
    this.cargarAduanas();
    this.cargarAduaneras();
    this.cargarRecintoFiscalizado();
    this.cargarTipoDeDocumento();
    this.cargarMedioDeTransporte();
    this.cargarPaisDeProcedencia();
    this.cargarSiNo();
    this.cargarTipoDeDestino();
    this.inicializarMercanciaFormulario();
  }

  /**
   * @method cambioImportacionTemporal
   * @description Método para manejar el cambio de la fecha de importación temporal.
   *
   * - Actualiza el valor del campo `fechaImportacionTemporal` en el formulario `datosPedimento`.
   * - Marca el campo como no modificado (`markAsUntouched`).
   * - Establece el nuevo valor en el store del trámite.
   *
   * @param {string} nuevo_valor - Nuevo valor de la fecha de importación temporal.
   * @returns {void}
   */
  public cambioImportacionTemporal(nuevo_valor: string): void {
    this.datosPedimento.get('fechaImportacionTemporal')?.setValue(nuevo_valor);
    this.datosPedimento.get('fechaImportacionTemporal')?.markAsUntouched();
    this.store.setFechaImportacionTemporal(nuevo_valor);
  }

  /**
   * @method cambioVencimiento
   * @description Método para manejar el cambio de la fecha de vencimiento.
   *
   * - Actualiza el valor del campo `fechaVencimiento` en el formulario `datosPedimento`.
   * - Marca el campo como no modificado (`markAsUntouched`).
   * - Establece el nuevo valor en el store del trámite.
   *
   * @param {string} nuevo_valor - Nuevo valor de la fecha de vencimiento.
   * @returns {void}
   */
  public cambioVencimiento(nuevo_valor: string): void {
    this.datosPedimento.get('fechaVencimiento')?.setValue(nuevo_valor);
    this.datosPedimento.get('fechaVencimiento')?.markAsUntouched();
    this.store.setFechaVencimiento(nuevo_valor);
  }

  /**
   * @method cambioFechaCartaPorte
   * @description Método para manejar el cambio de la fecha de la carta porte.
   *
   * - Actualiza el valor del campo `fechaCartaPorte` en el formulario `datosPedimento`.
   * - Marca el campo como no modificado (`markAsUntouched`).
   * - Establece el nuevo valor en el store del trámite.
   *
   * @param {string} nuevo_valor - Nuevo valor de la fecha de la carta porte.
   * @returns {void}
   */
  public cambioFechaCartaPorte(nuevo_valor: string): void {
    this.datosPedimento.get('fechaCartaPorte')?.setValue(nuevo_valor);
    this.datosPedimento.get('fechaCartaPorte')?.markAsUntouched();
    this.store.setFechaCartaPorte(nuevo_valor);
  }

  /**
   * Cambia la fecha de destrucción del destino en el formulario y actualiza el estado correspondiente.
   *
   * @param nuevo_valor - La nueva fecha que se establecerá como valor en el campo `fechaDescruccionDestino`.
   *
   * Este método realiza las siguientes acciones:
   * - Actualiza el valor del campo `fechaDescruccionDestino` en el formulario `datosPedimento`.
   * - Marca el campo como no modificado (`untouched`).
   * - Actualiza el estado global con la nueva fecha utilizando el método `setFechaCartaPorte` del store.
   */
  public cambioFechaDestino(nuevo_valor: string): void {
    this.datosPedimento.get('fechaDescruccionDestino')?.setValue(nuevo_valor);
    this.datosPedimento.get('fechaDescruccionDestino')?.markAsUntouched();
    this.store.setFechaCartaPorte(nuevo_valor);
  }

  /**
   * @method setValoresStore
   * @description Método para establecer valores en el store del trámite.
   * Obtiene el valor de un campo específico de un formulario y lo asigna al método correspondiente del store.
   *
   * @param {FormGroup} form - Formulario reactivo del cual se obtiene el valor.
   * @param {string} campo - Nombre del campo dentro del formulario.
   * @param {keyof Tramite6402Store} metodoNombre - Nombre del método del store donde se asignará el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite6402Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * @method cargarAduaneras
   * @description Método para cargar la lista de aduaneras desde el servicio `autorizacionImportacionService`.
   * Los datos obtenidos se asignan a la propiedad `aduaneras`.
   *
   * @returns {void}
   */
  public cargarAduaneras(): void {
    this.autorizacionImportacionService
      .obtenerAduaneras()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.aduaneras = datos.datos;
      });
  }

  /**
   * @method cargarAduanas
   * @description Este método se encarga de cargar la lista de aduanas desde el servicio de autorización de importación.
   * Obtiene los datos mediante una suscripción al observable proporcionado por el servicio y los asigna a la propiedad `aduanas`.
   * La suscripción se gestiona utilizando el operador `takeUntil` para evitar fugas de memoria.
   *
   * @returns {void} No retorna ningún valor.
   */
  public cargarAduanas(): void {
    this.autorizacionImportacionService
      .obtenerAduanas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.aduanas = datos.datos;
      });
  }

  /**
   * @method cargarRecintoFiscalizado
   * @description Método para cargar la lista de recintos fiscalizados desde el servicio `autorizacionImportacionService`.
   * Los datos obtenidos se asignan a la propiedad `recintoFiscalizado`.
   *
   * @returns {void}
   */
  public cargarRecintoFiscalizado(): void {
    this.autorizacionImportacionService
      .obtenerRecintoFiscalizado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.recintoFiscalizado = datos.datos;
      });
  }

  /**
   * @method cargarTipoDeDocumento
   * @description Método para cargar la lista de tipos de documentos desde el servicio `autorizacionImportacionService`.
   * Los datos obtenidos se asignan a la propiedad `tipoDeDocumento`.
   *
   * @returns {void}
   */
  public cargarTipoDeDocumento(): void {
    this.autorizacionImportacionService
      .obtenerTipoDeDocumento()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.tipoDeDocumento = datos.datos;
      });
  }

  /**
   * @method cargarMedioDeTransporte
   * @description Carga los datos del medio de transporte desde el servicio de autorización de importación.
   * Suscribe a los datos obtenidos y los asigna a la propiedad `medioDeTransporte`.
   * Utiliza un observable para manejar la suscripción y asegura la limpieza con `takeUntil`.
   *
   * @returns {void} No retorna ningún valor.
   */
  public cargarMedioDeTransporte(): void {
    this.autorizacionImportacionService
      .obtenerMedioDeTransporte()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.medioDeTransporte = datos.datos;
      });
  }

  /**
   * Carga el país de procedencia desde el servicio de autorización de importación.
   *
   * Este método realiza una solicitud al servicio `autorizacionImportacionService`
   * para obtener el catálogo de países de procedencia. Los datos obtenidos se asignan
   * a la propiedad `paisDeProcedencia` del componente.
   *
   * @remarks
   * Utiliza el operador `takeUntil` para gestionar la suscripción y evitar fugas de memoria.
   *
   * @see {@link autorizacionImportacionService.obtenerPaisDeProcedencia}
   */
  public cargarPaisDeProcedencia(): void {
    this.autorizacionImportacionService
      .obtenerPaisDeProcedencia()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.paisDeProcedencia = datos.datos;
      });
  }

  /**
   * @method cargarSiNo
   * @description Método para cargar la lista de opciones "Sí" o "No" desde el servicio `autorizacionImportacionService`.
   * Los datos obtenidos se asignan a la propiedad `siNo`.
   *
   * @returns {void}
   */
  public cargarSiNo(): void {
    this.autorizacionImportacionService
      .obtenerSiNo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.siNo = datos.datos;
      });
  }

  /**
   * @method cargarTipoDeDestino
   * @description Este método se encarga de cargar los tipos de destino desde el servicio de autorización de importación.
   * Utiliza un observable para suscribirse a los datos obtenidos y asignarlos a la propiedad `tipoDeDestino`.
   *
   * @returns {void} No retorna ningún valor.
   *
   * @example
   * // Ejemplo de uso:
   * this.cargarTipoDeDestino();
   *
   * @memberof SolicitudComponent
   */
  public cargarTipoDeDestino(): void {
    this.autorizacionImportacionService
      .obtenerTipoDeDestino()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.tipoDeDestino = datos.datos;
      });
  }

  /**
   * @method cargarFederativa
   * @description Método para cargar la lista de entidades federativas desde el servicio `autorizacionImportacionService`.
   * Los datos obtenidos se asignan a la propiedad `entidadFederativa`.
   *
   * @returns {void}
   */
  public cargarFederativa(): void {
    this.autorizacionImportacionService
      .obtenerFederativa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.entidadFederativa = datos.datos;
      });
  }

  /**
   * @method inicializarFormulario
   * @description Método para inicializar el formulario reactivo `solicitudFormulario` con los datos del estado actual del trámite.
   *
   * - Agrupa diferentes secciones del formulario como `datosAduana`, `datosPedimento`, `datosMedioTransporte`, `datosDestinoMercancia` entre otros.
   * - Aplica validaciones específicas a cada campo, como longitud máxima, patrones y campos obligatorios.
   *
   * @returns {void}
   */
  inicializarFormulario(): void {
    this.solicitudFormulario = this.fb.group({
      datosAduana: this.fb.group({
        cveAduana: [
          this.tramiteState?.solicitudFormulario?.cveAduana,
          [Validators.required],
        ],
        cveSeccionAduanal: [
          this.tramiteState?.solicitudFormulario?.cveSeccionAduanal,
        ],
        cveRecintoFiscalizado: [
          this.tramiteState?.solicitudFormulario?.cveRecintoFiscalizado,
        ],
      }),
      datosPedimento: this.fb.group({
        cveTipoDocumento: [
          this.tramiteState?.solicitudFormulario?.cveTipoDocumento,
          [Validators.required],
        ],
        estadoTipoDocumento: [
          {
            value: this.tramiteState?.solicitudFormulario?.estadoTipoDocumento,
            disabled: true,
          },
        ],
        aduana: [
          this.tramiteState?.solicitudFormulario?.aduana,
          [
            Validators.required,
            Validators.maxLength(3),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
        patente: [
          this.tramiteState?.solicitudFormulario?.patente,
          [Validators.required],
        ],
        pedimento: [
          this.tramiteState?.solicitudFormulario?.pedimento,
          [Validators.required],
        ],
        folioImportacionTemporal: [
          this.tramiteState?.solicitudFormulario?.folioImportacionTemporal,
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
        folioFormatoOficial: [
          this.tramiteState?.solicitudFormulario?.folioFormatoOficial,
          [Validators.required],
        ],
        checkProrroga: [
          this.tramiteState?.solicitudFormulario?.checkProrroga,
          [Validators.required],
        ],
        folioOficialProrroga: [
          {
            value: this.tramiteState?.solicitudFormulario?.folioOficialProrroga,
            disabled: true,
          },
          [Validators.required],
        ],
        fechaImportacionTemporal: [
          this.tramiteState?.solicitudFormulario?.fechaImportacionTemporal,
          [Validators.required, SolicitudComponent.validateFechaMenorIgualHoy],
        ],
        fechaVencimiento: [
          this.tramiteState?.solicitudFormulario?.fechaVencimiento,
          [Validators.required, SolicitudComponent.validateFechaMenorIgualHoy],
        ],
        descMercancia: [
          this.tramiteState?.solicitudFormulario?.descMercancia,
          [Validators.required],
        ],
        marca: [
          this.tramiteState?.solicitudFormulario?.marca,
          [Validators.required],
        ],
        modelo: [
          this.tramiteState?.solicitudFormulario?.modelo,
          [Validators.required],
        ],
        numeroSerie: [
          this.tramiteState?.solicitudFormulario?.numeroSerie,
          [Validators.required],
        ],
        tipo: [
          this.tramiteState?.solicitudFormulario?.tipo,
          [Validators.required],
        ],
      }),
      datosMedioTransporte: this.fb.group({
        cveMedioTrasporte: [
          this.tramiteState?.solicitudFormulario?.cveMedioTrasporte,
          [Validators.required],
        ],
        guiaMaster: [
          this.tramiteState?.solicitudFormulario?.guiaMaster,
          [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$')],
        ],
        guiaBl: [
          this.tramiteState?.solicitudFormulario?.guiaBl,
          [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$')],
        ],
        numeroBl: [
          this.tramiteState?.solicitudFormulario?.numeroBl,
          [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
        ],
        rfcEmpresaTransportista: [
          this.tramiteState?.solicitudFormulario?.rfcEmpresaTransportista, [Validators.pattern('^[a-zA-Z0-9]+$')]
        ],
        estadoMedioTransporte: [
          {
            value:
              this.tramiteState?.solicitudFormulario?.estadoMedioTransporte,
            disabled: true,
          },
        ],
        cartaPorte: [
          this.tramiteState?.solicitudFormulario?.cartaPorte,
          [Validators.required],
        ],
        cvePaisProcedencia: [
          this.tramiteState?.solicitudFormulario?.cvePaisProcedencia,
          [Validators.required],
        ],
        guiaHouse: [this.tramiteState?.solicitudFormulario?.guiaHouse, [Validators.pattern('^[a-zA-Z0-9]+$')]],
        numeroBuque: [this.tramiteState?.solicitudFormulario?.numeroBuque, [Validators.pattern('^[a-zA-Z0-9]+$')]],
        numeroEquipo: [this.tramiteState?.solicitudFormulario?.numeroEquipo, [Validators.pattern('^[a-zA-Z0-9]+$')]],
        fechaCartaPorte: [
          this.tramiteState?.solicitudFormulario?.fechaCartaPorte,
          [Validators.required],
        ],
        tipContenedor: [
          this.tramiteState?.solicitudFormulario?.tipContenedor,
          [Validators.required],
        ],
        tranporteMarca: [
          this.tramiteState?.solicitudFormulario?.tranporteMarca,
          [Validators.required],
        ],
        tranporteModelo: [
          this.tramiteState?.solicitudFormulario?.tranporteModelo,
          [Validators.required],
        ],
        tranportePlaca: [
          this.tramiteState?.solicitudFormulario?.tranportePlaca,
          [Validators.required],
        ],
        observaciones: [
          {
            value: this.tramiteState?.solicitudFormulario?.observaciones,
            disabled: this.soloLectura,
          },
          Validators.required,
        ],
      }),
      datosDestinoMercancia: this.fb.group({
        conDestino: [
          this.tramiteState?.solicitudFormulario?.conDestino,
          [Validators.required],
        ],
        cveTipoDestino: [
          this.tramiteState?.solicitudFormulario?.cveTipoDestino,
          [Validators.required],
        ],
        cveTipoDocumentoReemplazada: [
          this.tramiteState?.solicitudFormulario?.cveTipoDocumentoReemplazada,
          [Validators.required],
        ],
        numeroActaDescruccion: [
          this.tramiteState?.solicitudFormulario?.numeroActaDescruccion,
          [Validators.required],
        ],
        cveAduanaDestino: [
          this.tramiteState?.solicitudFormulario?.cveAduanaDestino,
          [Validators.required],
        ],
        cvePatenteDestino: [
          this.tramiteState?.solicitudFormulario?.cvePatenteDestino,
          [Validators.required],
        ],
        cvePedimentoDestino: [
          this.tramiteState?.solicitudFormulario?.cvePedimentoDestino,
          [Validators.required],
        ],
        folioVucemRetorno: [
          this.tramiteState?.solicitudFormulario?.folioVucemRetorno,
          [Validators.required],
        ],
        folioFormatoOficialDestino: [
          this.tramiteState?.solicitudFormulario?.folioFormatoOficialDestino,
          [Validators.required],
        ],
        fechaDescruccionDestino: [
          this.tramiteState?.solicitudFormulario?.fechaDescruccionDestino,
          [Validators.required],
        ],
        estadoTipoDocumentoDestino: [
          this.tramiteState?.solicitudFormulario?.estadoTipoDocumentoDestino,
          [Validators.required],
        ],
        autoridadPresentoAvisoDestruccion: [
          this.tramiteState?.solicitudFormulario
            ?.autoridadPresentoAvisoDestruccion,
          [Validators.required],
        ],
      }),
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * @method inicializarEstadoFormulario
   * @description Inicializa el estado del formulario según el modo de solo lectura.
   *
   * Si la propiedad `soloLectura` es verdadera, deshabilita todos los controles del formulario.
   * En caso contrario, habilita los controles del formulario.
   *
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.solicitudFormulario?.disable();
    } else {
      this.solicitudFormulario?.enable();
    }
  }

  /**
   * @method inicializarMercanciaFormulario
   * @description Inicializa el formulario reactivo para la gestión de la mercancía en el componente.
   * Este formulario contiene campos relacionados con la descripción, especificaciones, marca, modelo,
   * número de serie, número de parte y tipo de la mercancía. Los valores iniciales se obtienen del estado
   * actual del trámite (`tramiteState`) y todos los campos son obligatorios.
   *
   * @returns {void} No retorna ningún valor.
   */
  inicializarMercanciaFormulario(): void {
    this.mercanciaFormulario = this.fb.group({
      modalDescMercancia: ['', [Validators.required]],
      espeMercancia: [
        this.tramiteState?.mercanciaFormulario?.espeMercancia,
        [Validators.required],
      ],
      marcaMercancia: [
        {
          value: this.tramiteState?.mercanciaFormulario?.marcaMercancia,
          disabled: this.soloLectura,
        },
        Validators.required,
      ],
      modeloMercancia: [
        this.tramiteState?.mercanciaFormulario?.modeloMercancia,
        [Validators.required],
      ],
      numSerieMercancia: [
        this.tramiteState?.mercanciaFormulario?.numSerieMercancia,
        [Validators.required],
      ],
      numParteMercancia: [
        this.tramiteState?.mercanciaFormulario?.numParteMercancia,
        [Validators.required],
      ],
      tipoMercancia: [
        this.tramiteState?.mercanciaFormulario?.tipoMercancia,
        [Validators.required],
      ],
    });
  }

  /**
   * @method datosPedimento
   * @description Getter para obtener el grupo de controles `datosPedimento` del formulario `solicitudFormulario`.
   *
   * @returns {FormGroup} El grupo de controles `datosPedimento`.
   */
  get datosPedimento(): FormGroup {
    return this.solicitudFormulario.get('datosPedimento') as FormGroup;
  }

  /**
   * @method datosMedioTransporte
   * @description Getter para obtener el grupo de controles `datosMedioTransporte` del formulario `solicitudFormulario`.
   *
   * @returns {FormGroup} El grupo de controles `datosMedioTransporte`.
   */
  get datosMedioTransporte(): FormGroup {
    return this.solicitudFormulario.get('datosMedioTransporte') as FormGroup;
  }

  /**
   * @method datosDestinoMercancia
   * @description Getter para obtener el grupo de controles `datosDestinoMercancia` del formulario `solicitudFormulario`.
   *
   * @returns {FormGroup} El grupo de controles `datosDestinoMercancia`.
   */
  get datosDestinoMercancia(): FormGroup {
    return this.solicitudFormulario.get('datosDestinoMercancia') as FormGroup;
  }

  /**
   * @method datosAduana
   * @description Getter para obtener el grupo de controles `datosAduana` del formulario `solicitudFormulario`.
   *
   * @returns {FormGroup} El grupo de controles `datosAduana`.
   */
  get datosAduana(): FormGroup {
    return this.solicitudFormulario.get('datosAduana') as FormGroup;
  }

  /**
   * @method isValid
   * @description Método para verificar si un campo específico de un formulario es válido.
   *
   * - Utiliza el servicio `validacionesService` para realizar la validación.
   *
   * @param {FormGroup} form - Formulario reactivo que contiene el campo a validar.
   * @param {string} field - Nombre del campo a validar.
   * @returns {boolean | null} Retorna `true` si el campo es válido, `false` si no lo es, o `null` si no se puede determinar.
   */
  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }

  /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param nombreControl - Nombre del control a verificar.
   * @returns True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.solicitudFormulario.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Maneja el evento blur (pérdida de foco) en los campos del formulario
   * para activar la validación visual.
   *
   * @param fieldName - Nombre del campo que perdió el foco.
   */
  public onFieldBlur(fieldName: string): void {
    const CONTROL = this.solicitudFormulario.get(fieldName);
    if (CONTROL) {
      CONTROL.markAsTouched();
      CONTROL.markAsDirty();
    }
  }

  /**
   * @method filaSeleccionada
   * @description Método para manejar las filas seleccionadas en la tabla de avisos.
   *
   * - Actualiza la propiedad `filaSeleccionadaLista` con las filas seleccionadas.
   *
   * @param {AvisoTabla[]} evento - Lista de filas seleccionadas en la tabla de avisos.
   * @returns {void}
   */
  filaSeleccionada(evento: SolicitudTabla[]): void {
    this.filaSeleccionadaLista = evento;
  }

  /**
   * @method eliminarMercancia
   * @description Método para eliminar las filas seleccionadas de la tabla de Mercancias.
   *
   * - Filtra los datos de la tabla para excluir las filas seleccionadas.
   * - Limpia la lista de filas seleccionadas.
   *
   * @returns {void}
   */
  eliminarMercancia(): void {
    this.tablaDeDatos.datos = this.tablaDeDatos.datos.filter(
      (ele) => !this.filaSeleccionadaLista.includes(ele)
    );
    this.filaSeleccionadaLista = [];
  }

  /**
   * @method abiertoMercancia
   * @description Método para abrir el modal de Mercancia.
   *
   * - Utiliza la referencia al modal de Mercancia para mostrarlo en la interfaz.
   *
   * @returns {void}
   */
  abiertoMercancia(): void {
    if (this.modalMercancia) {
      const MODAL_INSTANCE = new Modal(this.modalMercancia.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  // Edita la mercancía seleccionada
  modificarMercancia(): void {
    if (!this.filaSeleccionadaLista.length) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Edición',
        mensaje: 'Seleccione una fila para modificar.',
        cerrar: true,
        tiempoDeEspera: 3000,
        txtBtnAceptar: 'De acuerdo',
        txtBtnCancelar: '',
      };
      return;
    }
    // Solo permite editar la primera seleccionada
    const SELECTED_ROW = this.filaSeleccionadaLista[0];
    // Llena el formulario con los datos de la fila seleccionada
    this.mercanciaFormulario.patchValue({
      modalDescMercancia: SELECTED_ROW.modalDescMercancia || '',
      // espeMercancia: not available in SolicitudTabla, leave blank or handle as needed
      espeMercancia: '',
      marcaMercancia: SELECTED_ROW.marca || '',
      modeloMercancia: SELECTED_ROW.modelo || '',
      numSerieMercancia: SELECTED_ROW.numeroDeSerie || '',
      // numParteMercancia: not available in SolicitudTabla, leave blank or handle as needed
      numParteMercancia: '',
      tipoMercancia: SELECTED_ROW.tipo || '',
    });
    // Guarda el id de la fila editada
    this.elementoParaEliminar = SELECTED_ROW.id;
    // Abre el modal de edición
    if (this.modalMercancia) {
      const MODAL_INSTANCE = new Modal(this.modalMercancia.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  consultarMercancia(): void {
    if (!this.filaSeleccionadaLista.length) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Consulta',
        mensaje: 'Debe seleccionar un registro a consultar.',
        cerrar: true,
        tiempoDeEspera: 3000,
        txtBtnAceptar: 'De acuerdo',
        txtBtnCancelar: '',
      };
    }
  }

  /**
   * @method cargarMercanciaTabla
   * @description Método para cargar los datos de la tabla de mercancias desde el servicio `autorizacionImportacionService`.
   * Los datos obtenidos se asignan a la propiedad `tablaDeDatos.datos`.
   *
   * @returns {void}
   */
  public cargarMercanciaTabla(): void {
    if (this.mercanciaFormulario.valid) {
      const REQUIRED_FIELDS = [
        'modalDescMercancia',
        'espeMercancia',
        'marcaMercancia',
        'modeloMercancia',
        'numSerieMercancia',
        'numParteMercancia',
        'tipoMercancia',
      ];
      const INVALID_FIELDS: string[] = [];

      // Verificar si los campos requeridos están vacíos o son inválidos
      REQUIRED_FIELDS.forEach((field) => {
        const CONTROL = this.mercanciaFormulario.get(field);
        if (!CONTROL?.value || CONTROL.invalid) {
          INVALID_FIELDS.push(field);
        }
      });

      // Si algún campo requerido es inválido, mostrar error y salir
    if (INVALID_FIELDS.length > 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Error de validación',
        mensaje: 'Por favor, complete todos los campos requeridos antes de agregar.',
        cerrar: true,
        tiempoDeEspera: 3000,
        txtBtnAceptar: 'De acuerdo',
        txtBtnCancelar: '',
      };
      
      // Marcar todos los controles del formulario como tocados para mostrar errores de validación
      this.mercanciaFormulario.markAllAsTouched();
      return;
    }

      const FORM_VALUES = this.mercanciaFormulario.value;
      const NEW_ROW: SolicitudTabla = {
        id: this.tablaDeDatos.datos.length + 1,
        marca: FORM_VALUES.marcaMercancia,
        modelo: FORM_VALUES.modeloMercancia,
        numeroDeSerie: FORM_VALUES.numSerieMercancia,
        tipo: FORM_VALUES.tipoMercancia,
        modalDescMercancia: FORM_VALUES.modalDescMercancia,
      };

      this.tablaDeDatos.datos = [...this.tablaDeDatos.datos, NEW_ROW];
      this.abrirModal();
      this.mercanciaFormulario.reset();
      this.mercanciaFormulario.markAsUntouched();
      this.mercanciaFormulario.markAsPristine();
    }
  }

  /**
   * Obtiene la etiqueta de un elemento seleccionado en un catálogo desplegable.
   *
   * @param selectedId - El ID del elemento seleccionado.
   * @param catalog - Una lista de objetos del catálogo que contiene descripciones.
   * @returns La descripción del elemento seleccionado si se encuentra, de lo contrario, 'N/A'.
   */
  static getDropdownLabel(
    selectedId: string | number,
    catalog: Catalogo[]
  ): string {
    const NUMERIC_ID =
      typeof selectedId === 'string' ? parseInt(selectedId, 10) : selectedId;
    const SELECTED_ITEMS = catalog.find((item) => {
      return item.id === NUMERIC_ID;
    });
    return SELECTED_ITEMS ? SELECTED_ITEMS.descripcion : 'N/A';
  }

  /**
   * @method agregarMercancia
   * @description Método para agregar Mercancias a la tabla de avisos.
   *
   * - Carga los datos de la tabla de avisos y cierra el modal de Mercancia.
   *
   * @returns {void}
   */
  agregarMercancia(): void {
    if (this.mercanciaFormulario.invalid) {
      Object.values(this.mercanciaFormulario.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
      return;
    }
    // Si estamos editando (elementoParaEliminar tiene valor), actualiza la fila
    if (this.elementoParaEliminar) {
      const IDX = this.tablaDeDatos.datos.findIndex(
        (ROW: SolicitudTabla) => ROW.id === this.elementoParaEliminar
      );
      if (IDX !== -1) {
        const FORM_VALUES = this.mercanciaFormulario.value;
        this.tablaDeDatos.datos[IDX] = {
          ...this.tablaDeDatos.datos[IDX],
          modalDescMercancia: FORM_VALUES.modalDescMercancia,
          marca: FORM_VALUES.marcaMercancia,
          modelo: FORM_VALUES.modeloMercancia,
          numeroDeSerie: FORM_VALUES.numParteMercancia,
          tipo: FORM_VALUES.tipoMercancia,
        };
      }
      this.elementoParaEliminar = undefined;
      this.filaSeleccionadaLista = [];
    } else {
      this.cargarMercanciaTabla();
    }
    this.closeMercancia.nativeElement.click();
  }

  /**
   * @method abrirModal
   * @description Método para abrir un modal de notificación.
   *
   * Este método configura una nueva notificación con los siguientes parámetros:
   * - `tipoNotificacion`: Tipo de notificación (en este caso, "alerta").
   * - `categoria`: Categoría de la notificación (en este caso, "peligro").
   * - `modo`: Modo de la notificación (en este caso, "acción").
   * - `titulo`: Título de la notificación (en este caso, vacío).
   * - `mensaje`: Mensaje de la notificación (en este caso, "El registro fue agregado correctamente.").
   * - `cerrar`: Indica si la notificación se puede cerrar manualmente (en este caso, `false`).
   * - `tiempoDeEspera`: Tiempo en milisegundos antes de que la notificación desaparezca automáticamente (en este caso, 2000 ms).
   * - `txtBtnAceptar`: Texto del botón de aceptación (en este caso, "Aceptar").
   * - `txtBtnCancelar`: Texto del botón de cancelación (en este caso, vacío).
   *
   * @example
   * // Llamar al método para abrir el modal de notificación
   * this.abrirModal();
   */
  public abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'El registro fue agregado correctamente.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    this.elementoParaEliminar = i;
  }

  /**
   * @method cambiarTipoDocumento
   * @description Método para manejar el cambio del tipo de documento en el formulario.
   *
   * - Si el tipo de documento seleccionado es "Folio VUCEM", desactiva el campo `checkProrroga` y limpia su valor.
   * - En caso contrario, habilita el campo `checkProrroga`.
   *
   * @returns {void}
   */
  cambiarTipoDocumento(): void {
    const FIELDS = ['descMercancia', 'marca', 'modelo', 'numeroSerie', 'tipo'];
    FIELDS.forEach((field) => {
      this.datosPedimento.get(field)?.reset('');
    });
    if (this.datosPedimento.get('cveTipoDocumento')?.value === 'Folio VUCEM') {
      this.datosPedimento.get('checkProrroga')?.setValue('');
      this.datosPedimento.get('checkProrroga')?.disable();
      this.datosPedimento.get('folioOficialProrroga')?.disable();
    } else {
      this.datosPedimento.get('checkProrroga')?.enable();
    }
  }

  /**
   * @method cambiarCheckProrroga
   * @description Método para manejar el cambio del estado del checkbox `checkProrroga`.
   *
   * - Si el checkbox está seleccionado (`true`), habilita el campo `folioOficialProrroga`.
   * - Si el checkbox no está seleccionado (`false`), deshabilita el campo `folioOficialProrroga` y limpia su valor.
   *
   * @returns {void}
   */
  cambiarCheckProrroga(): void {
    if (this.datosPedimento.get('checkProrroga')?.value === true) {
      this.datosPedimento.get('folioOficialProrroga')?.enable();
    } else {
      this.datosPedimento.get('folioOficialProrroga')?.setValue('');
      this.datosPedimento.get('folioOficialProrroga')?.disable();
    }
  }

  /**
   * @method cambiarMedioDeTransporte
   * @description Cambia el estado del medio de transporte basado en el valor del campo 'cveTipoDocumento'.
   * Si el valor es 'Folio VUCEM', desactiva y limpia el campo 'checkProrroga'.
   * En caso contrario, habilita el campo 'checkProrroga'.
   *
   * @returns {void} No retorna ningún valor.
   */
  cambiarMedioDeTransporte(): void {
    if (this.datosPedimento.get('cveTipoDocumento')?.value === 'Folio VUCEM') {
      this.datosPedimento.get('checkProrroga')?.setValue('');
      this.datosPedimento.get('checkProrroga')?.disable();
    } else {
      this.datosPedimento.get('checkProrroga')?.enable();
    }
  }

  /**
   * Validador personalizado para verificar si la fecha es menor o igual a la fecha actual
   */
  static validateFechaMenorIgualHoy(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    let fechaSeleccionada: Date;
    if (typeof control.value === 'string' && control.value.includes('/')) {
      const PARTES = control.value.split('/');
      if (PARTES.length === 3) {
        const DIA = parseInt(PARTES[0], 10);
        const MES = parseInt(PARTES[1], 10);
        const ANIO = parseInt(PARTES[2], 10);
        fechaSeleccionada = new Date(ANIO, MES - 1, DIA);
      } else {
        fechaSeleccionada = new Date(control.value);
      }
    } else {
      fechaSeleccionada = new Date(control.value);
    }

    // Verificar si la fecha es válida
    if (isNaN(fechaSeleccionada.getTime())) {
      return { fechaInvalida: true }; // Retorna error para fechas inválidas
    }

    const FECHA_ACTUAL = new Date();

    // Restablecer la hora para comparar solo las fechas
    fechaSeleccionada.setHours(0, 0, 0, 0);
    FECHA_ACTUAL.setHours(0, 0, 0, 0);

    if (fechaSeleccionada > FECHA_ACTUAL) {
      return { fechaInvalida: true }; // Retorna un objeto de error para fechas futuras
    }

    return null; // Retorna null si la fecha es válida (hoy o pasada)
  }

    /**
  * Elimina un pedimento si se confirma la acción. 
  */
  eliminarPedimento(borrar: boolean): void {
    if (borrar && typeof this.elementoParaEliminar === 'number') {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   *
   * - Completa el `Subject` `destroyNotifier$` para cancelar todas las suscripciones activas y evitar fugas de memoria.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}