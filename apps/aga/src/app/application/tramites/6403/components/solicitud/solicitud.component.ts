import { Catalogo, CatalogoLista, SolicitudTabla, SolicitudTablaDatos } from "../../models/retorno-de-partes.model";
import {
  CatalogoSelectComponent,
  InputFecha,
  InputFechaComponent,
  Notificacion,
  REG_X,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService
} from "@libs/shared/data-access-user/src";
import { Component, ElementRef, OnDestroy, OnInit,ViewChild} from "@angular/core";
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FECHA_CARTAPORTE, FECHA_DESTINO, FECHA_IMPORTACION, FECHA_VENCIMIENTO, TABLA_DE_DATOS, TEXTOS } from "../../constants/retorno-de-partes.enum";
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { ReplaySubject, map, takeUntil } from "rxjs";
import { Tramite6403State,Tramite6403Store } from "../../estados/tramite6403.store";
import { CommonModule } from "@angular/common";
import { Modal } from 'bootstrap';
import { RetornoDePartesService } from "../../services/retorno-de-partes.service";
import { Tramite6403Query } from "../../estados/tramite6403.query";
/**
 * Componente para gestionar el aviso de traslado.
 * 
 * Este componente permite al usuario capturar, editar y gestionar la información
 * relacionada con el aviso de traslado, incluyendo datos de la empresa, mercancías,
 * Mercancias y otros detalles necesarios para el trámite 6403.
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputFechaComponent, 
    CatalogoSelectComponent, TablaDinamicaComponent],
  standalone: true,
})
export class SolicitudComponent implements OnInit, OnDestroy {
   /**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
   /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;
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
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * @property {Tramite6403State} tramiteState
   * @description Estado actual del trámite 6403, que contiene toda la información relevante del proceso.
  */
  public tramiteState!: Tramite6403State;

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
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {Tramite6403Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite6403Query} tramiteQuery - Query para obtener el estado del trámite.
   * @param {retornoDePartesService} retornoDePartesService - Servicio para obtener datos relacionados con el aviso.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
  */
  constructor(
    public fb: FormBuilder,
    public store: Tramite6403Store,
    public tramiteQuery: Tramite6403Query,
    public retornoDePartesService: RetornoDePartesService,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {
   this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }
  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Configura los formularios, carga los datos iniciales y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.tramiteState = seccionState;
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
    this.inicializarMercanciaFormulario();
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.soloLectura) {
  this.solicitudFormulario.disable();
  this.mercanciaFormulario.disable();
} else {
  this.solicitudFormulario.enable();
  this.mercanciaFormulario.enable();
}
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
   * @param {keyof Tramite6403Store} metodoNombre - Nombre del método del store donde se asignará el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite6403Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * @method cargarAduaneras
   * @description Método para cargar la lista de aduaneras desde el servicio `retornoDePartesService`.
   * Los datos obtenidos se asignan a la propiedad `aduaneras`.
   *
   * @returns {void}
   */
  public cargarAduaneras(): void {
    this.retornoDePartesService
      .obtenerAduaneras()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.aduaneras = datos.datos;
        }
      );
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
    this.retornoDePartesService
      .obtenerAduanas()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.aduanas = datos.datos;
        }
      );
  }

  /**
   * @method cargarRecintoFiscalizado
   * @description Método para cargar la lista de recintos fiscalizados desde el servicio `retornoDePartesService`.
   * Los datos obtenidos se asignan a la propiedad `recintoFiscalizado`.
   *
   * @returns {void}
   */
  public cargarRecintoFiscalizado(): void {
    this.retornoDePartesService
      .obtenerRecintoFiscalizado()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.recintoFiscalizado = datos.datos;
        }
      );
  }

  /**
   * @method cargarTipoDeDocumento
   * @description Método para cargar la lista de tipos de documentos desde el servicio `retornoDePartesService`.
   * Los datos obtenidos se asignan a la propiedad `tipoDeDocumento`.
   *
   * @returns {void}
   */
  public cargarTipoDeDocumento(): void {
    this.retornoDePartesService
      .obtenerTipoDeDocumento()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.tipoDeDocumento = datos.datos;
        }
      );
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
    this.retornoDePartesService
      .obtenerMedioDeTransporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.medioDeTransporte = datos.datos;
        }
      );
  }

  /**
   * Carga el país de procedencia desde el servicio de autorización de importación.
   * 
   * Este método realiza una solicitud al servicio `retornoDePartesService` 
   * para obtener el catálogo de países de procedencia. Los datos obtenidos se asignan 
   * a la propiedad `paisDeProcedencia` del componente.
   * 
   * @remarks
   * Utiliza el operador `takeUntil` para gestionar la suscripción y evitar fugas de memoria.
   * 
   * @see {@link retornoDePartesService.obtenerPaisDeProcedencia}
   */
  public cargarPaisDeProcedencia(): void {
    this.retornoDePartesService
      .obtenerPaisDeProcedencia()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.paisDeProcedencia = datos.datos;
        }
      );
  }


  /**
   * @method cargarFederativa
   * @description Método para cargar la lista de entidades federativas desde el servicio `retornoDePartesService`.
   * Los datos obtenidos se asignan a la propiedad `entidadFederativa`.
   *
   * @returns {void}
   */
  public cargarFederativa(): void {
    this.retornoDePartesService
      .obtenerFederativa()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.entidadFederativa = datos.datos;
        }
      );
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
      cveAduana: [{ value: this.tramiteState?.solicitudFormulario?.cveAduana, disabled: this.soloLectura }, [Validators.required]],
      cveSeccionAduanal: [{ value: this.tramiteState?.solicitudFormulario?.cveSeccionAduanal, disabled: this.soloLectura }],
      cveRecintoFiscalizado: [{ value: this.tramiteState?.solicitudFormulario?.cveRecintoFiscalizado, disabled: this.soloLectura }],
    }),
    datosPedimento: this.fb.group({
      cveTipoDocumento: [{ value: this.tramiteState?.solicitudFormulario?.cveTipoDocumento, disabled: this.soloLectura }, [Validators.required]],
      estadoTipoDocumento: [{ value: this.tramiteState?.solicitudFormulario?.estadoTipoDocumento, disabled: true }],
      aduana: [{ value: this.tramiteState?.solicitudFormulario?.aduana, disabled: this.soloLectura }, [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)]],
      patente: [{ value: this.tramiteState?.solicitudFormulario?.patente, disabled: this.soloLectura }, [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)]],
      pedimento: [{ value: this.tramiteState?.solicitudFormulario?.pedimento, disabled: this.soloLectura }, [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)]],
      folioImportacionTemporal: [{ value: this.tramiteState?.solicitudFormulario?.folioImportacionTemporal, disabled: this.soloLectura }, [Validators.required]],
      folioFormatoOficial: [{ value: this.tramiteState?.solicitudFormulario?.folioFormatoOficial, disabled: this.soloLectura }, [Validators.required]],
      checkProrroga: [{ value: this.tramiteState?.solicitudFormulario?.checkProrroga, disabled: this.soloLectura }, [Validators.required]],
      folioOficialProrroga: [{ value: this.tramiteState?.solicitudFormulario?.folioOficialProrroga, disabled: true }, [Validators.required]],
      fechaImportacionTemporal: [{ value: this.tramiteState?.solicitudFormulario?.fechaImportacionTemporal, disabled: this.soloLectura }, [Validators.required]],
      fechaVencimiento: [{ value: this.tramiteState?.solicitudFormulario?.fechaVencimiento, disabled: this.soloLectura }, [Validators.required]],
      descMercancia: [{ value: this.tramiteState?.solicitudFormulario?.descMercancia, disabled: this.soloLectura }, [Validators.required]],
      marca: [{ value: this.tramiteState?.solicitudFormulario?.marca, disabled: this.soloLectura }, [Validators.required]],
      modelo: [{ value: this.tramiteState?.solicitudFormulario?.modelo, disabled: this.soloLectura }, [Validators.required]],
      numeroSerie: [{ value: this.tramiteState?.solicitudFormulario?.numeroSerie, disabled: this.soloLectura }, [Validators.required]],
      tipo: [{ value: this.tramiteState?.solicitudFormulario?.tipo, disabled: this.soloLectura }, [Validators.required]],
    }),
    datosMedioTransporte: this.fb.group({
      cveMedioTrasporte: [{ value: this.tramiteState?.solicitudFormulario?.cveMedioTrasporte, disabled: this.soloLectura }, [Validators.required]],
      guiaMaster: [{ value: this.tramiteState?.solicitudFormulario?.guiaMaster, disabled: this.soloLectura }, [Validators.required]],
      guiaBl: [{ value: this.tramiteState?.solicitudFormulario?.guiaBl, disabled: this.soloLectura }, [Validators.required]],
      numeroBl: [{ value: this.tramiteState?.solicitudFormulario?.numeroBl, disabled: this.soloLectura }, [Validators.required]],
      rfcEmpresaTransportista: [{ value: this.tramiteState?.solicitudFormulario?.rfcEmpresaTransportista, disabled: this.soloLectura }],
      estadoMedioTransporte: [{ value: this.tramiteState?.solicitudFormulario?.estadoMedioTransporte, disabled: true }],
      cartaPorte: [{ value: this.tramiteState?.solicitudFormulario?.cartaPorte, disabled: this.soloLectura }, [Validators.required]],
      cvePaisProcedencia: [{ value: this.tramiteState?.solicitudFormulario?.cvePaisProcedencia, disabled: this.soloLectura }, [Validators.required]],
      guiaHouse: [{ value: this.tramiteState?.solicitudFormulario?.guiaHouse, disabled: this.soloLectura }],
      numeroBuque: [{ value: this.tramiteState?.solicitudFormulario?.numeroBuque, disabled: this.soloLectura }],
      numeroEquipo: [{ value: this.tramiteState?.solicitudFormulario?.numeroEquipo, disabled: this.soloLectura }],
      fechaCartaPorte: [{ value: this.tramiteState?.solicitudFormulario?.fechaCartaPorte, disabled: this.soloLectura }, [Validators.required]],
      tipContenedor: [{ value: this.tramiteState?.solicitudFormulario?.tipContenedor, disabled: this.soloLectura }, [Validators.required]],
      tranporteMarca: [{ value: this.tramiteState?.solicitudFormulario?.tranporteMarca, disabled: this.soloLectura }, [Validators.required]],
      tranporteModelo: [{ value: this.tramiteState?.solicitudFormulario?.tranporteModelo, disabled: this.soloLectura }, [Validators.required]],
      tranportePlaca: [{ value: this.tramiteState?.solicitudFormulario?.tranportePlaca, disabled: this.soloLectura }, [Validators.required]],
      observaciones: [{ value: this.tramiteState?.solicitudFormulario?.observaciones, disabled: this.soloLectura }, [Validators.required]],
    }),
    datosDestinoMercancia: this.fb.group({
      conDestino: [{ value: this.tramiteState?.solicitudFormulario?.conDestino, disabled: this.soloLectura }, [Validators.required]],
      cveTipoDestino: [{ value: this.tramiteState?.solicitudFormulario?.cveTipoDestino, disabled: this.soloLectura }, [Validators.required]],
      cveTipoDocumentoReemplazada: [{ value: this.tramiteState?.solicitudFormulario?.cveTipoDocumentoReemplazada, disabled: this.soloLectura }, [Validators.required]],
      numeroActaDescruccion: [{ value: this.tramiteState?.solicitudFormulario?.numeroActaDescruccion, disabled: this.soloLectura }, [Validators.required]],
      cveAduanaDestino: [{ value: this.tramiteState?.solicitudFormulario?.cveAduanaDestino, disabled: this.soloLectura }, [Validators.required]],
      cvePatenteDestino: [{ value: this.tramiteState?.solicitudFormulario?.cvePatenteDestino, disabled: this.soloLectura }, [Validators.required]],
      cvePedimentoDestino: [{ value: this.tramiteState?.solicitudFormulario?.cvePedimentoDestino, disabled: this.soloLectura }, [Validators.required]],
      folioVucemRetorno: [{ value: this.tramiteState?.solicitudFormulario?.folioVucemRetorno, disabled: this.soloLectura }, [Validators.required]],
      folioFormatoOficialDestino: [{ value: this.tramiteState?.solicitudFormulario?.folioFormatoOficialDestino, disabled: this.soloLectura }, [Validators.required]],
      fechaDescruccionDestino: [{ value: this.tramiteState?.solicitudFormulario?.fechaDescruccionDestino, disabled: this.soloLectura }, [Validators.required]],
      estadoTipoDocumentoDestino: [{ value: this.tramiteState?.solicitudFormulario?.estadoTipoDocumentoDestino, disabled: this.soloLectura }, [Validators.required]],
      autoridadPresentoAvisoDestruccion: [{ value: this.tramiteState?.solicitudFormulario?.autoridadPresentoAvisoDestruccion, disabled: this.soloLectura }, [Validators.required]],
    }),
  });
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
      modalDescMercancia: [this.tramiteState?.mercanciaFormulario?.modalDescMercancia, [Validators.required]],
      espeMercancia: [this.tramiteState?.mercanciaFormulario?.espeMercancia, [Validators.required]],
      marcaMercancia: [this.tramiteState?.mercanciaFormulario?.marcaMercancia, [Validators.required]],
      modeloMercancia: [this.tramiteState?.mercanciaFormulario?.modeloMercancia, [Validators.required]],
      numSerieMercancia: [this.tramiteState?.mercanciaFormulario?.numSerieMercancia, [Validators.required]],
      numParteMercancia: [this.tramiteState?.mercanciaFormulario?.numParteMercancia, [Validators.required]],
      tipoMercancia: [this.tramiteState?.mercanciaFormulario?.tipoMercancia, [Validators.required]],
    })
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
    this.tablaDeDatos.datos = this.tablaDeDatos.datos.filter((ele) => !this.filaSeleccionadaLista.includes(ele));
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

  /**
   * @method cargarMercanciaTabla
   * @description Método para cargar los datos de la tabla de mercancias desde el servicio `retornoDePartesService`.
   * Los datos obtenidos se asignan a la propiedad `tablaDeDatos.datos`.
   *
   * @returns {void}
   */
  public cargarMercanciaTabla(): void {
    this.retornoDePartesService
      .obtenerSolicitudTabla()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (datos: SolicitudTablaDatos) => {
          this.tablaDeDatos.datos = datos.datos;
        }
      );
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
    this.cargarMercanciaTabla();
    this.closeMercancia.nativeElement.click();
    this.abrirModal();
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
  public abrirModal(): void {
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
    }
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
    if (this.datosPedimento.get('cveTipoDocumento')?.value === 'Folio VUCEM') {
      this.datosPedimento.get('checkProrroga')?.setValue('');
      this.datosPedimento.get('checkProrroga')?.disable();
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
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * 
   * - Completa el `Subject` `destroyed$` para cancelar todas las suscripciones activas y evitar fugas de memoria.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
   
  }
}