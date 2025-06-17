
import { Catalogo, CatalogoLista, SolicitudTabla, SolicitudTablaDatos } from "../../models/retorno-de-partes.model";
import {
  CatalogoSelectComponent,
  InputFecha,
  InputFechaComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService
} from "@libs/shared/data-access-user/src";
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FECHA_CARTAPORTE, FECHA_DESTINO, FECHA_IMPORTACION, FECHA_VENCIMIENTO, TABLA_DE_DATOS, TEXTOS } from "../../constants/retorno-de-partes.enum";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Modal } from 'bootstrap';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RetornoDePartesService } from "../../services/retorno-de-partes.service";
import { Subject } from "rxjs";
import { Tramite6403Query } from "../../estados/tramite6403.query";
import { Tramite6403State } from "../../estados/tramite6403.store";
import { Tramite6403Store } from "../../estados/tramite6403.store";
import { Validators } from "@angular/forms";
import { ViewChild } from "@angular/core";
import { map } from "rxjs";
import { takeUntil ,ReplaySubject } from "rxjs";
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
    } else {
      this.solicitudFormulario.enable();
    }
    if (this.soloLectura) {
      this.mercanciaFormulario.disable();
    } else {
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
        cveAduana: [this.tramiteState?.solicitudFormulario?.cveAduana, [Validators.required]],
        cveSeccionAduanal: [this.tramiteState?.solicitudFormulario?.cveSeccionAduanal, [Validators.required]],
        cveRecintoFiscalizado: [this.tramiteState?.solicitudFormulario?.cveRecintoFiscalizado, [Validators.required]],
      }),
      datosPedimento: this.fb.group({
        cveTipoDocumento: [this.tramiteState?.solicitudFormulario?.cveTipoDocumento, [Validators.required]],
        estadoTipoDocumento: [{ value: this.tramiteState?.solicitudFormulario?.estadoTipoDocumento, disabled: true }],
        aduana: [this.tramiteState?.solicitudFormulario?.aduana, [Validators.required]],
        patente: [this.tramiteState?.solicitudFormulario?.patente, [Validators.required]],
        pedimento: [this.tramiteState?.solicitudFormulario?.pedimento, [Validators.required]],
        folioImportacionTemporal: [this.tramiteState?.solicitudFormulario?.folioImportacionTemporal, [Validators.required]],
        folioFormatoOficial: [this.tramiteState?.solicitudFormulario?.folioFormatoOficial, [Validators.required]],
        checkProrroga: [this.tramiteState?.solicitudFormulario?.checkProrroga, [Validators.required]],
        folioOficialProrroga: [{ value: this.tramiteState?.solicitudFormulario?.folioOficialProrroga, disabled: true}, [Validators.required]],
        fechaImportacionTemporal: [this.tramiteState?.solicitudFormulario?.fechaImportacionTemporal, [Validators.required]],
        fechaVencimiento: [this.tramiteState?.solicitudFormulario?.fechaVencimiento, [Validators.required]],
        descMercancia: [this.tramiteState?.solicitudFormulario?.descMercancia, [Validators.required]],
        marca: [this.tramiteState?.solicitudFormulario?.marca, [Validators.required]],
        modelo: [this.tramiteState?.solicitudFormulario?.modelo, [Validators.required]],
        numeroSerie: [this.tramiteState?.solicitudFormulario?.numeroSerie, [Validators.required]],
        tipo: [this.tramiteState?.solicitudFormulario?.tipo, [Validators.required]],
      }),
      datosMedioTransporte: this.fb.group({
        cveMedioTrasporte: [this.tramiteState?.solicitudFormulario?.cveMedioTrasporte, [Validators.required]],
        guiaMaster: [this.tramiteState?.solicitudFormulario?.guiaMaster, [Validators.required]],
        guiaBl: [this.tramiteState?.solicitudFormulario?.guiaBl, [Validators.required]],
        numeroBl: [this.tramiteState?.solicitudFormulario?.numeroBl, [Validators.required]],
        rfcEmpresaTransportista: [this.tramiteState?.solicitudFormulario?.rfcEmpresaTransportista],
        estadoMedioTransporte: [{ value: this.tramiteState?.solicitudFormulario?.estadoMedioTransporte, disabled: true }],
        cartaPorte: [this.tramiteState?.solicitudFormulario?.cartaPorte, [Validators.required]],
        cvePaisProcedencia: [this.tramiteState?.solicitudFormulario?.cvePaisProcedencia, [Validators.required]],
        guiaHouse: [this.tramiteState?.solicitudFormulario?.guiaHouse],
        numeroBuque: [this.tramiteState?.solicitudFormulario?.numeroBuque],
        numeroEquipo: [this.tramiteState?.solicitudFormulario?.numeroEquipo],
        fechaCartaPorte: [this.tramiteState?.solicitudFormulario?.fechaCartaPorte, [Validators.required]],
        tipContenedor: [this.tramiteState?.solicitudFormulario?.tipContenedor, [Validators.required]],
        tranporteMarca: [this.tramiteState?.solicitudFormulario?.tranporteMarca, [Validators.required]],
        tranporteModelo: [this.tramiteState?.solicitudFormulario?.tranporteModelo, [Validators.required]],
        tranportePlaca: [this.tramiteState?.solicitudFormulario?.tranportePlaca, [Validators.required]],
        observaciones: [this.tramiteState?.solicitudFormulario?.observaciones, [Validators.required]],
      }),
      datosDestinoMercancia: this.fb.group({
        conDestino: [this.tramiteState?.solicitudFormulario?.conDestino, [Validators.required]],
        cveTipoDestino: [this.tramiteState?.solicitudFormulario?.cveTipoDestino, [Validators.required]],
        cveTipoDocumentoReemplazada: [this.tramiteState?.solicitudFormulario?.cveTipoDocumentoReemplazada, [Validators.required]],
        numeroActaDescruccion: [this.tramiteState?.solicitudFormulario?.numeroActaDescruccion, [Validators.required]],
        cveAduanaDestino: [this.tramiteState?.solicitudFormulario?.cveAduanaDestino, [Validators.required]],
        cvePatenteDestino: [this.tramiteState?.solicitudFormulario?.cvePatenteDestino, [Validators.required]],
        cvePedimentoDestino: [this.tramiteState?.solicitudFormulario?.cvePedimentoDestino, [Validators.required]],
        folioVucemRetorno: [this.tramiteState?.solicitudFormulario?.folioVucemRetorno, [Validators.required]],
        folioFormatoOficialDestino: [this.tramiteState?.solicitudFormulario?.folioFormatoOficialDestino, [Validators.required]],
        fechaDescruccionDestino: [this.tramiteState?.solicitudFormulario?.fechaDescruccionDestino, [Validators.required]],
        estadoTipoDocumentoDestino: [this.tramiteState?.solicitudFormulario?.estadoTipoDocumentoDestino, [Validators.required]],
        autoridadPresentoAvisoDestruccion: [this.tramiteState?.solicitudFormulario?.autoridadPresentoAvisoDestruccion, [Validators.required]],
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