import {
  AlertComponent,
  CatalogoSelectComponent,
  InputFecha,
  InputFechaComponent,
  InputHoraComponent,
  InputRadioComponent,
  REGEX_ALFANUMERICO_CON_ESPACIOS,
  REGEX_ALFANUMERICO_CON_ESPACIOS_REEMPLAZAR,
  REGEX_IMPORTE_PAGO,
  REGEX_NUMEROS,
  REGEX_REEMPLAZAR,
  REGEX_SOLO_NUMEROS,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService
} from "@libs/shared/data-access-user/src";
import { AvisoTabla, AvisoTablaDatos, Catalogo, CatalogoLista, DesperdicioTabla, DesperdicioTablaDatos, PedimentoTabla, PedimentoTablaDatos, ProcesoTabla, ProcesoTablaDatos } from "../../models/aviso-destruccion.model";
import { FECHA_INGRESO, TEXTOS, TIPACA, TIPAVI } from "../../constants/aviso-destruccion.enum";
import { AvisoDestruccionService } from "../../services/aviso-destruccion.service";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Modal } from 'bootstrap';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Subject } from "rxjs";
import { Tramite32506Query } from "../../estados/tramite32506.query";
import { Tramite32506State } from "../../estados/tramite32506.store";
import { Tramite32506Store } from "../../estados/tramite32506.store";
import { Validators } from "@angular/forms";
import { ViewChild } from "@angular/core";
import { map } from "rxjs";
import { takeUntil } from "rxjs";
/**
 * Componente para gestionar el aviso de traslado.
 * 
 * Este componente permite al usuario capturar, editar y gestionar la información
 * relacionada con el aviso de traslado, incluyendo datos de la empresa, mercancías,
 * domicilios y otros detalles necesarios para el trámite 32506.
 */
@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputFechaComponent, InputHoraComponent,
    CatalogoSelectComponent, TablaDinamicaComponent, AlertComponent, NotificacionesComponent,
    InputRadioComponent
  ],
  standalone: true,
})
export class AvisoComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} avisoFormulario
   * @description Formulario reactivo que contiene los datos del aviso en el trámite.
  */
  avisoFormulario!: FormGroup;

  procesoFormulario!: FormGroup;

  desperdicioFormulario!: FormGroup;
  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Sujeto utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
  */
  public destroyNotifier$: Subject<void> = new Subject();
  /**
   * @property {Tramite32506State} tramiteState
   * @description Estado actual del trámite 32506, que contiene toda la información relevante del proceso.
  */
  public tramiteState!: Tramite32506State;
  /**
   * @property {InputFecha} fechaInicioInput
   * @description Representa la fecha de inicio predefinida para el formulario. 
   * Por defecto, se inicializa con el valor de `FECHA_INGRESO`.
  */
  public fechaInicioInput: InputFecha = FECHA_INGRESO;
  /**
   * @property {Catalogo[]} entidadFederativa
   * @description Lista de entidades federativas cargadas desde un catálogo.
  */
  entidadFederativa: Catalogo[] = [];
  /**
   * @property {Catalogo[]} delegacionMunicipio
   * @description Lista de delegaciones o municipios cargados desde un catálogo.
  */
  delegacionMunicipio: Catalogo[] = [];
  /**
   * @property {Catalogo[]} colonia
   * @description Lista de colonias cargadas desde un catálogo.
  */
  colonia: Catalogo[] = [];
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
  tablaDeDatos: {
    encabezadas: {
      encabezado: string,
      clave: (ele: AvisoTabla) => string,
      orden: number
    }[],
    datos: AvisoTabla[],
  } = {
      encabezadas: [
        {
          encabezado: 'Nombre comercial',
          clave: (ele: AvisoTabla) => ele.nombreComercial,
          orden: 1,
        },
        {
          encabezado: 'Entidad federativa',
          clave: (ele: AvisoTabla) => ele.entidadFederativa,
          orden: 2
        },
        {
          encabezado: 'Alcaldía o Municipio',
          clave: (ele: AvisoTabla) => ele.alcaldioOMuncipio,
          orden: 3
        },
        {
          encabezado: 'Colonia',
          clave: (ele: AvisoTabla) => ele.colonia,
          orden: 4
        },
        {
          encabezado: 'Hora Destrucción',
          clave: (ele: AvisoTabla) => ele.horaDestruccion,
          orden: 5
        },
        {
          encabezado: 'Fecha Destrucción',
          clave: (ele: AvisoTabla) => ele.fechaDestruccion,
          orden: 5
        }
      ],
      datos: []
    };
  /**
   * @property {AvisoTabla[]} filaSeleccionadaLista
   * @description Lista de filas seleccionadas en la tabla de avisos. 
   * Contiene los datos de las filas seleccionadas por el usuario.
  */
  filaSeleccionadaLista: AvisoTabla[] = [];
  /**
   * @property {ElementRef} modalDomicilio
   * @description Referencia al elemento del modal de domicilio en la plantilla HTML.
   * Utilizado para abrir o manipular el modal de domicilio.
  */
  @ViewChild('modalDomicilio') modalDomicilio!: ElementRef;
  /**
   * @property {ElementRef} closeDomicilio
   * @description Referencia al botón o elemento que cierra el modal de domicilio.
   * Utilizado para cerrar el modal de manera programática.
  */
  @ViewChild('closeDomicilio') public closeDomicilio!: ElementRef;

  @ViewChild('modalProceso') modalProceso!: ElementRef;

  @ViewChild('closeProceso') public closeProceso!: ElementRef;

  @ViewChild('modalDesperdicio') modalDesperdicio!: ElementRef;

  @ViewChild('closeDesperdicio') public closeDesperdicio!: ElementRef;

  @ViewChild('modalPedimento') modalPedimento!: ElementRef;

  @ViewChild('closePedimento') public closePedimento!: ElementRef;


  domicilioFormulario!: FormGroup;
  /**
   * @property {object} tablaPedimento
   * @description Configuración de la tabla de mercancías utilizada en el componente.
   * Contiene las definiciones de las columnas (encabezados) y los datos que se mostrarán en la tabla.
   */
  tablaPedimento: {
    encabezadas: {
      encabezado: string,
      clave: (ele: PedimentoTabla) => string,
      orden: number
    }[],
    datos: PedimentoTabla[],
  } = {
      encabezadas: [
        {
          encabezado: 'Número de patente',
          clave: (ele: PedimentoTabla) => ele.patenteAutorizacion,
          orden: 1
        },
        {
          encabezado: 'Número de pedimento',
          clave: (ele: PedimentoTabla) => ele.pedimento,
          orden: 2,
        },
        {
          encabezado: 'Aduana del pedimento',
          clave: (ele: PedimentoTabla) => ele.claveAduanaPedimento,
          orden: 3,
        },
        {
          encabezado: 'Fracción de la mercancía',
          clave: (ele: PedimentoTabla) => ele.claveFraccionArancelariaPedimento,
          orden: 4,
        },
        {
          encabezado: 'NICO de la mercancía',
          clave: (ele: PedimentoTabla) => ele.nicoPedimento,
          orden: 5,
        },
        {
          encabezado: 'Cantidad de la mercancía',
          clave: (ele: PedimentoTabla) => ele.cantidadPedimento,
          orden: 6,
        },
        {
          encabezado: 'Unidad de medida de la mercancía',
          clave: (ele: PedimentoTabla) => ele.claveUnidadMedidaPedimento,
          orden: 6,
        }
      ],
      datos: []
    };

  tablaProceso: {
    encabezadas: {
      encabezado: string,
      clave: (ele: ProcesoTabla) => string,
      orden: number
    }[],
    datos: ProcesoTabla[],
  } = {
      encabezadas: [
        { encabezado: 'Descripción del proceso destructivo', clave: (ele: ProcesoTabla) => ele.descripcionProcesoDestruccion, orden: 1 }
      ],
      datos: []
    };

  tablaDesperdicio: {
    encabezadas: {
      encabezado: string,
      clave: (ele: DesperdicioTabla) => string,
      orden: number
    }[],
    datos: DesperdicioTabla[],
  } = {
      encabezadas: [
        { encabezado: 'Datos de los desperdicios a destruir', clave: (ele: DesperdicioTabla) => ele.descripcionProcesoDestruccion, orden: 1 }
      ],
      datos: []
    };

  /**
   * @property {MercanciaTabla[]} filaSeleccionadaMercanciaLista
   * @description Lista de filas seleccionadas en la tabla de mercancías.
   * Contiene los datos de las filas seleccionadas por el usuario en la tabla de mercancías.
   */
  filaSeleccionadaPedimentoLista: PedimentoTabla[] = [];

  filaSeleccionadaProcesoLista: ProcesoTabla[] = [];

  filaSeleccionadaDesperdicioLista: DesperdicioTabla[] = [];
  /**
   * @property {FormGroup} pedimentoFormulario
   * @description Formulario reactivo que contiene los datos relacionados con la mercancía.
   */
  pedimentoFormulario!: FormGroup;
  /**
   * @property {Catalogo[]} fraccionArancelaria
   * @description Lista de fracciones arancelarias cargadas desde un catálogo.
   * Utilizadas para seleccionar la fracción arancelaria correspondiente a la mercancía.
   */
  fraccionArancelaria: Catalogo[] = [];
  /**
   * @property {Catalogo[]} unidadMedida
   * @description Lista de unidades de medida cargadas desde un catálogo.
   * Utilizadas para seleccionar la unidad de medida correspondiente a la mercancía.
   */
  unidadMedida: Catalogo[] = [];
  /**
   * @property {any} TIPAVI
   * @description Constante que representa los tipos de aviso disponibles en el sistema.
   */
  TIPAVI = TIPAVI;
  /**
   * @property {any} TIPACA
   * @description Constante que representa los tipos de catálogo disponibles en el sistema.
   */
  TIPACA = TIPACA;
  /**
   * @property {any} TEXTOS
   * @description Constante que contiene textos o mensajes utilizados en el componente.
   */
  TEXTOS = TEXTOS;
  /**
   * Representa una nueva instancia de notificación asociada con el componente.
   * Esta propiedad se utiliza para gestionar y almacenar datos de notificaciones.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {Tramite32506Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite32506Query} tramiteQuery - Query para obtener el estado del trámite.
   * @param {avisoDestruccionService} avisoDestruccionService - Servicio para obtener datos relacionados con el aviso.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
  */
  constructor(
    public fb: FormBuilder,
    public store: Tramite32506Store,
    public tramiteQuery: Tramite32506Query,
    public avisoDestruccionService: AvisoDestruccionService,
    private validacionesService: ValidacionesFormularioService,
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
    this.inicializarFormulario();
    this.inicializarDomicilioFormulario();
    this.cargarFederativa();
    this.cargarMunicipio();
    this.cargarColonias();
    this.inicializarPedimentoFormulario();
    this.inicializarProcesoFormulario();
    this.inicializarDesperdicioFormulario();
    this.cargarFraccionArancelaria();
    this.cargarUnidadMedida();
  }
  /**
   * @method setValoresStore
   * @description Método para establecer valores en el store del trámite.
   * Obtiene el valor de un campo específico de un formulario y lo asigna al método correspondiente del store.
   *
   * @param {FormGroup} form - Formulario reactivo del cual se obtiene el valor.
   * @param {string} campo - Nombre del campo dentro del formulario.
   * @param {keyof Tramite32506Store} metodoNombre - Nombre del método del store donde se asignará el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite32506Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
   * @method cargarFraccionArancelaria
   * @description Método para cargar la lista de fracciones arancelarias desde el servicio `avisoDestruccionService`.
   * Los datos obtenidos se asignan a la propiedad `fraccionArancelaria`.
   *
   * @returns {void}
   */
  public cargarFraccionArancelaria(): void {
    this.avisoDestruccionService
      .obtenerFraccionArancelaria()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.fraccionArancelaria = datos.datos;
        }
      );
  }
  /**
   * @method cargarUnidadMedida
   * @description Método para cargar la lista de unidades de medida desde el servicio `avisoDestruccionService`.
   * Los datos obtenidos se asignan a la propiedad `unidadMedida`.
   *
   * @returns {void}
   */
  public cargarUnidadMedida(): void {
    this.avisoDestruccionService
      .obtenerUnidadMedida()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.unidadMedida = datos.datos;
        }
      );
  }
  /**
   * @method cargarFederativa
   * @description Método para cargar la lista de entidades federativas desde el servicio `avisoDestruccionService`.
   * Los datos obtenidos se asignan a la propiedad `entidadFederativa`.
   *
   * @returns {void}
   */
  public cargarFederativa(): void {
    this.avisoDestruccionService
      .obtenerFederativa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.entidadFederativa = datos.datos;
        }
      );
  }
  /**
   * @method cargarMunicipio
   * @description Método para cargar la lista de municipios desde el servicio `avisoDestruccionService`.
   * Los datos obtenidos se asignan a la propiedad `delegacionMunicipio`.
   *
   * @returns {void}
   */
  public cargarMunicipio(): void {
    this.avisoDestruccionService
      .obtenerMunicipio()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.delegacionMunicipio = datos.datos;
        }
      );
  }
  /**
   * @method cargarColonias
   * @description Método para cargar la lista de colonias desde el servicio `avisoDestruccionService`.
   * Los datos obtenidos se asignan a la propiedad `colonia`.
   *
   * @returns {void}
   */
  public cargarColonias(): void {
    this.avisoDestruccionService
      .obtenerColonias()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.colonia = datos.datos;
        }
      );
  }
  /**
   * @method cargarAvisoTabla
   * @description Método para cargar los datos de la tabla de avisos desde el servicio `avisoDestruccionService`.
   * Los datos obtenidos se asignan a la propiedad `tablaDeDatos.datos`.
   *
   * @returns {void}
   */
  public cargarAvisoTabla(): void {
    this.avisoDestruccionService
      .obtenerAvisoTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: AvisoTablaDatos) => {
          this.tablaDeDatos.datos = datos.datos;
        }
      );
  }


  public cargarProcesoTabla(): void {
    this.avisoDestruccionService
      .obtenerProcesoTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: ProcesoTablaDatos) => {
          this.tablaProceso.datos = datos.datos;
        }
      );
  }

  public cargarDesperdicioTabla(): void {
    this.avisoDestruccionService
      .obtenerDesperdicioTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: DesperdicioTablaDatos) => {
          this.tablaDesperdicio.datos = datos.datos;
        }
      );
  }

  public cargarPedimentoTabla(): void {
    this.avisoDestruccionService
      .obtenerPedimentoTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: PedimentoTablaDatos) => {
          this.tablaPedimento.datos = datos.datos;
        }
      );
  }

  /**
   * @method inicializarFormulario
   * @description Método para inicializar el formulario reactivo `avisoFormulario` con los datos del estado actual del trámite.
   * 
   * - Agrupa diferentes secciones del formulario como `adaceFormulario`, `datosEmpresa`, `datosAviso`, `direccionOrigen`, entre otros.
   * - Aplica validaciones específicas a cada campo, como longitud máxima, patrones y campos obligatorios.
   * - Llama al método `verificaTipoAviso` para realizar validaciones adicionales según el tipo de aviso seleccionado.
   *
   * @returns {void}
   */
  inicializarFormulario(): void {
    this.avisoFormulario = this.fb.group({
      adaceFormulario: this.fb.group({
        adace: [{ value: this.tramiteState?.avisoFormulario?.adace, disabled: true }, [Validators.required]]
      }),
      datosEmpresa: this.fb.group({
        valorProgramaImmex: [this.tramiteState?.avisoFormulario?.valorProgramaImmex, [Validators.required, Validators.maxLength(9), Validators.pattern(REGEX_IMPORTE_PAGO)]],
        valorAnioProgramaImmex: [this.tramiteState?.avisoFormulario?.valorAnioProgramaImmex, [Validators.required, Validators.maxLength(4), Validators.pattern(REGEX_IMPORTE_PAGO)]],
      }),
      datosAviso: this.fb.group({
        tipoAviso: [this.tramiteState?.avisoFormulario?.tipoAviso, [Validators.required]],
        justificacion: [{ value: this.tramiteState?.avisoFormulario?.justificacion, disabled: true }, [Validators.required, Validators.maxLength(250)]],
        periodicidadMensualDestruccion: [{ value: this.tramiteState?.avisoFormulario?.periodicidadMensualDestruccion, disabled: true }, [Validators.required, Validators.maxLength(2)]],
        fechaTranslado: [{ value: this.tramiteState?.avisoFormulario?.fechaTranslado, disabled: true }, Validators.required],
      }),
      direccionOrigen: this.fb.group({
        nombreComercial: [this.tramiteState?.avisoFormulario?.nombreComercial, [Validators.maxLength(250)]],
        claveEntidadFederativa: [this.tramiteState?.avisoFormulario?.claveEntidadFederativa, [Validators.required]],
        claveDelegacionMunicipio: [this.tramiteState?.avisoFormulario?.claveDelegacionMunicipio, [Validators.required]],
        claveColonia: [this.tramiteState?.avisoFormulario?.claveColonia, [Validators.required]],
        calle: [this.tramiteState?.avisoFormulario?.calle, [Validators.required, Validators.maxLength(250)]],
        numeroExterior: [this.tramiteState?.avisoFormulario?.numeroExterior, [Validators.required, Validators.maxLength(15), Validators.pattern(REGEX_ALFANUMERICO_CON_ESPACIOS)]],
        numeroInterior: [this.tramiteState?.avisoFormulario?.numeroInterior, [Validators.maxLength(15), Validators.pattern(REGEX_ALFANUMERICO_CON_ESPACIOS)]],
        codigoPostal: [this.tramiteState?.avisoFormulario?.codigoPostal, [Validators.required, Validators.maxLength(5), Validators.pattern(REGEX_SOLO_NUMEROS)]]
      }),
      tipoCarga: [this.tramiteState?.avisoFormulario?.tipoCarga, [Validators.required]],
      archivoMasivo: [null]

    });
    // this.verificaTipoAviso();
  }
  /**
   * @method adaceFormulario
   * @description Getter para obtener el grupo de controles `adaceFormulario` del formulario `avisoFormulario`.
   * 
   * @returns {FormGroup} El grupo de controles `adaceFormulario`.
   */
  get adaceFormulario(): FormGroup {
    return this.avisoFormulario.get('adaceFormulario') as FormGroup;
  }
  /**
   * @method datosEmpresa
   * @description Getter para obtener el grupo de controles `datosEmpresa` del formulario `avisoFormulario`.
   * 
   * @returns {FormGroup} El grupo de controles `datosEmpresa`.
   */
  get datosEmpresa(): FormGroup {
    return this.avisoFormulario.get('datosEmpresa') as FormGroup;
  }
  /**
   * @method datosAviso
   * @description Getter para obtener el grupo de controles `datosAviso` del formulario `avisoFormulario`.
   * 
   * @returns {FormGroup} El grupo de controles `datosAviso`.
   */
  get datosAviso(): FormGroup {
    return this.avisoFormulario.get('datosAviso') as FormGroup;
  }
  /**
   * @method direccionOrigen
   * @description Getter para obtener el grupo de controles `direccionOrigen` del formulario `avisoFormulario`.
   * 
   * @returns {FormGroup} El grupo de controles `direccionOrigen`.
   */
  get direccionOrigen(): FormGroup {
    return this.avisoFormulario.get('direccionOrigen') as FormGroup;
  }
  /**
   * @method inicializarDomicilioFormulario
   * @description Método para inicializar el formulario reactivo `domicilioFormulario` con los datos del estado actual del trámite.
   * 
   * - Agrupa los campos relacionados con el domicilio, como `nombreComercial`, `claveEntidadFederativa`, `claveDelegacionMunicipio`, entre otros.
   * - Aplica validaciones específicas a cada campo, como longitud máxima, patrones y campos obligatorios.
   *
   * @returns {void}
   */
  inicializarDomicilioFormulario(): void {
    this.domicilioFormulario = this.fb.group({
      nombreComercial: [this.tramiteState?.domicilioFormulario?.nombreComercial, [Validators.maxLength(250)]],
      claveEntidadFederativa: [this.tramiteState?.domicilioFormulario?.claveEntidadFederativa, [Validators.required]],
      claveDelegacionMunicipio: [this.tramiteState?.domicilioFormulario?.claveDelegacionMunicipio, [Validators.required]],
      claveColonia: [this.tramiteState?.domicilioFormulario?.claveColonia, [Validators.required]],
      calle: [this.tramiteState?.domicilioFormulario?.calle, [Validators.required, Validators.maxLength(250)]],
      numeroExterior: [this.tramiteState?.domicilioFormulario?.numeroExterior, [Validators.required, Validators.maxLength(15), Validators.pattern(REGEX_IMPORTE_PAGO)]],
      numeroInterior: [this.tramiteState?.domicilioFormulario?.numeroInterior, [Validators.maxLength(15), Validators.pattern(REGEX_IMPORTE_PAGO)]],
      codigoPostal: [this.tramiteState?.domicilioFormulario?.codigoPostal, [Validators.required, Validators.maxLength(5), Validators.pattern(REGEX_SOLO_NUMEROS)]],
      rfc: [this.tramiteState?.domicilioFormulario?.rfc, [Validators.required]],
      horaDestruccion: [this.tramiteState?.avisoFormulario?.horaDestruccion, [Validators.required]],
      fechaDestruccion: [this.tramiteState?.avisoFormulario?.fechaDestruccion, [Validators.required]]
    });
  }
  /**
   * @method inicializarPedimentoFormulario
   * @description Método para inicializar el formulario reactivo `pedimentoFormulario` con los datos del estado actual del trámite.
   * 
   * - Agrupa los campos relacionados con la mercancía, como `claveFraccionArancelaria`, `nico`, `cantidad`, entre otros.
   * - Aplica validaciones específicas a cada campo, como longitud máxima, patrones y campos obligatorios.
   *
   * @returns {void}
   */
  inicializarPedimentoFormulario(): void {
    this.pedimentoFormulario = this.fb.group({
      patenteAutorizacion: [this.tramiteState?.pedimentoFormulario?.patenteAutorizacion, [Validators.required, Validators.maxLength(4)]],
      pedimento: [this.tramiteState?.pedimentoFormulario?.pedimento, [Validators.required, Validators.maxLength(7)]],
      claveAduanaPedimento: [this.tramiteState?.pedimentoFormulario?.claveAduanaPedimento, [Validators.required]],
      claveFraccionArancelariaPedimento: [this.tramiteState?.pedimentoFormulario?.claveFraccionArancelariaPedimento, Validators.required],
      nicoPedimento: [this.tramiteState?.pedimentoFormulario?.nicoPedimento, [Validators.required, Validators.maxLength(2)]],
      cantidadPedimento: [this.tramiteState?.pedimentoFormulario?.cantidadPedimento, [Validators.required, Validators.maxLength(15)]],
      claveUnidadMedidaPedimento: [this.tramiteState?.pedimentoFormulario?.claveUnidadMedidaPedimento, [Validators.required]]
    });
  }

  inicializarProcesoFormulario(): void {
    this.procesoFormulario = this.fb.group({
      descripcionProcesoDestruccion: [this.tramiteState?.procesoFormulario?.descripcionProcesoDestruccion, Validators.required]
    });
  }

  inicializarDesperdicioFormulario(): void {
    this.desperdicioFormulario = this.fb.group({
      descripcionDesperdicio: [this.tramiteState?.desperdicioFormulario?.descripcionDesperdicio, Validators.required],
      cantidadDesp: [this.tramiteState?.desperdicioFormulario?.cantidadDesp, [Validators.required, Validators.maxLength(15)]],
      claveUnidadMedidaDesp: [this.tramiteState?.desperdicioFormulario?.claveUnidadMedidaDesp, [Validators.required]],
      porcentaje: [this.tramiteState?.desperdicioFormulario?.porcentaje, [Validators.required, Validators.maxLength(3)]],
      descripcionMercancia: [this.tramiteState?.desperdicioFormulario?.descripcionMercancia, [Validators.required]],
      circunstanciaHechos: [this.tramiteState?.desperdicioFormulario?.circunstanciaHechos, [Validators.required]]
    });
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
   * @method cambioFechaIngreso
   * @description Método para actualizar la fecha de traslado en el formulario y en el store.
   * 
   * - Establece el nuevo valor en el campo `fechaTranslado` del formulario `datosAviso`.
   * - Marca el campo como no modificado y actualiza el store con el nuevo valor.
   *
   * @param {string} nuevo_valor - Nuevo valor de la fecha de traslado.
   * @returns {void}
   */
  public cambioFechaIngreso(nuevo_valor: string): void {
    this.datosAviso.get('fechaTranslado')?.setValue(nuevo_valor);
    this.datosAviso.get('fechaTranslado')?.markAsUntouched();
    this.store.setAvisoFormularioFechaTranslado(nuevo_valor);
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
  filaSeleccionada(evento: AvisoTabla[]): void {
    this.filaSeleccionadaLista = evento;
  }
  /**
   * @method filaSeleccionadaMercancia
   * @description Método para manejar las filas seleccionadas en la tabla de mercancías.
   * 
   * - Actualiza la propiedad `filaSeleccionadaMercanciaLista` con las filas seleccionadas.
   *
   * @param {MercanciaTabla[]} evento - Lista de filas seleccionadas en la tabla de mercancías.
   * @returns {void}
   */
  filaSeleccionadaPedimento(evento: PedimentoTabla[]): void {
    this.filaSeleccionadaPedimentoLista = evento;
  }

  filaSeleccionaProceso(evento: ProcesoTabla[]): void {
    this.filaSeleccionadaProcesoLista = evento;
  }

  filaSeleccionaDesperdicio(evento: DesperdicioTabla[]): void {
    this.filaSeleccionadaDesperdicioLista = evento;
  }

  /**
   * @method eliminarMercancia
   * @description Método para eliminar las filas seleccionadas de la tabla de mercancías.
   * 
   * - Filtra los datos de la tabla para excluir las filas seleccionadas.
   * - Limpia la lista de filas seleccionadas.
   *
   * @returns {void}
   */
  eliminarPedimento(): void {
    this.tablaPedimento.datos = this.tablaPedimento.datos.filter((ele) => !this.filaSeleccionadaPedimentoLista.includes(ele));
    this.filaSeleccionadaPedimentoLista = [];
  }
  /**
   * @method eliminarDomicilio
   * @description Método para eliminar las filas seleccionadas de la tabla de domicilios.
   * 
   * - Filtra los datos de la tabla para excluir las filas seleccionadas.
   * - Limpia la lista de filas seleccionadas.
   *
   * @returns {void}
 */
  eliminarDomicilio(): void {
    this.tablaDeDatos.datos = this.tablaDeDatos.datos.filter((ele) => !this.filaSeleccionadaLista.includes(ele));
    this.filaSeleccionadaLista = [];
  }

  eliminarProceso(): void {
    this.tablaProceso.datos = this.tablaProceso.datos.filter((ele) => !this.filaSeleccionadaProcesoLista.includes(ele));
    this.filaSeleccionadaProcesoLista = [];
  }

  eliminarDesperdicio(): void {
    this.tablaDesperdicio.datos = this.tablaDesperdicio.datos.filter((ele) => !this.filaSeleccionadaDesperdicioLista.includes(ele));
    this.filaSeleccionadaDesperdicioLista = [];
  }

  /**
   * @method verificaTipoAviso
   * @description Método para verificar el tipo de aviso seleccionado en el formulario.
   * 
   * - Obtiene el valor del tipo de aviso desde el formulario y lo actualiza en el store.
   * - Habilita o deshabilita los campos `idTransaccion` y `motivoProrroga` según el tipo de aviso seleccionado.
   *
   * @returns {void}
   */
  verificaTipoAviso(): void {
    const TIPO_AVISO = this.avisoFormulario.get('datosAviso.tipoAviso')?.value;
    this.store.setAvisoFormularioTipoAviso(TIPO_AVISO);
    this.avisoFormulario.get('datosAviso.justificacion')?.enable();
    this.avisoFormulario.get('datosAviso.periodicidadMensualDestruccion')?.enable();
    if (TIPO_AVISO === TIPAVI[0].value) {
      this.avisoFormulario.get('datosAviso.justificacion')?.disable();
      this.avisoFormulario.get('datosAviso.periodicidadMensualDestruccion')?.disable();
    }
  }
  /**
   * @method abiertoDomicilio
   * @description Método para abrir el modal de domicilio.
   * 
   * - Utiliza la referencia al modal de domicilio para mostrarlo en la interfaz.
   *
   * @returns {void}
   */
  abiertoDomicilio(): void {
    if (this.modalDomicilio) {
      const MODAL_INSTANCE = new Modal(this.modalDomicilio.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  abiertoProceso(): void {
    if (this.modalProceso) {
      const MODAL_INSTANCE = new Modal(this.modalProceso.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  abiertoDesperdicio(): void {
    if (this.modalDesperdicio) {
      const MODAL_INSTANCE = new Modal(this.modalDesperdicio.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * @method abiertoMercancia
   * @description Método para abrir el modal de mercancía.
   * 
   * - Utiliza la referencia al modal de mercancía para mostrarlo en la interfaz.
   *
   * @returns {void}
   */
  abiertoPedimento(): void {
    if (this.modalPedimento) {
      const MODAL_INSTANCE = new Modal(this.modalPedimento.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * @method agregarDomicilio
   * @description Método para agregar domicilios a la tabla de avisos.
   * 
   * - Carga los datos de la tabla de avisos y cierra el modal de domicilio.
   *
   * @returns {void}
   */
  agregarDomicilio(): void {
    this.cargarAvisoTabla();
    this.closeDomicilio.nativeElement.click();
    this.abrirModal()
  }

  agregarProceso(): void {
    this.cargarProcesoTabla();
    this.closeProceso.nativeElement.click();
    this.abrirModal();
  }

  agregarDesperdicio(): void {
    this.cargarDesperdicioTabla();
    this.closeDesperdicio.nativeElement.click();
    this.abrirModal();
  }

  agregarPedimento(): void {
    this.cargarPedimentoTabla();
    this.closePedimento.nativeElement.click();
    this.abrirModal();
  }

  /**
   * @method sanitizeAlphanumeric
   * @description Método para limpiar un campo de formulario, eliminando caracteres no alfanuméricos.
   * 
   * - Reemplaza caracteres no permitidos en el valor del campo y actualiza el formulario.
   *
   * @param {FormGroup} form - Formulario reactivo que contiene el campo a limpiar.
   * @param {string} control - Nombre del control dentro del formulario.
   * @param {Event} event - Evento que contiene el valor ingresado por el usuario.
   * @returns {void}
   */
  // eslint-disable-next-line class-methods-use-this
  sanitizeAlphanumeric(form: FormGroup, control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(REGEX_REEMPLAZAR, '');
    form.get(control)?.setValue(REEMPLAZAR, { emitEvent: false });
  }
  /**
   * @method sanitizeAlphanumericWithSpace
   * @description Método para limpiar un campo de formulario, eliminando caracteres no alfanuméricos excepto espacios.
   * 
   * - Reemplaza caracteres no permitidos en el valor del campo y actualiza el formulario.
   *
   * @param {FormGroup} form - Formulario reactivo que contiene el campo a limpiar.
   * @param {string} control - Nombre del control dentro del formulario.
   * @param {Event} event - Evento que contiene el valor ingresado por el usuario.
   * @returns {void}
   */
  // eslint-disable-next-line class-methods-use-this
  sanitizeAlphanumericWithSpace(form: FormGroup, control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(REGEX_ALFANUMERICO_CON_ESPACIOS_REEMPLAZAR, '');
    form.get(control)?.setValue(REEMPLAZAR, { emitEvent: false });
  }
  /**
   * @method sanitizeNumeric
   * @description Método para limpiar un campo de formulario, eliminando caracteres no numéricos.
   * 
   * - Reemplaza caracteres no permitidos en el valor del campo y actualiza el formulario.
   *
   * @param {FormGroup} form - Formulario reactivo que contiene el campo a limpiar.
   * @param {string} control - Nombre del control dentro del formulario.
   * @param {Event} event - Evento que contiene el valor ingresado por el usuario.
   * @returns {void}
   */
  // eslint-disable-next-line class-methods-use-this
  sanitizeNumeric(form: FormGroup, control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(REGEX_NUMEROS, '');
    form.get(control)?.setValue(REEMPLAZAR, { emitEvent: false });
  }
  /**
   * @method limpiar
   * @description Método para limpiar el campo de archivo masivo en el formulario.
   * 
   * - Limpia el valor del input de archivo y del control correspondiente en el formulario.
   *
   * @param {HTMLInputElement} fileInput - Elemento de entrada de archivo que se va a limpiar.
   * @returns {void}
   */
  limpiar(fileInput: HTMLInputElement): void {
    fileInput.value = '';
    this.avisoFormulario.get('archivoMasivo')?.setValue('');
  }
  /**
   * @method onArchivoMasivoSeleccionado
   * @description Método para manejar la selección de un archivo masivo.
   * 
   * - Obtiene el archivo seleccionado y lo asigna al control correspondiente en el formulario.
   *
   * @param {Event} event - Evento que contiene el archivo seleccionado.
   * @returns {void}
   */
  onArchivoMasivoSeleccionado(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    if (INPUT?.files?.length) {
      const FILE = INPUT.files[0];
      this.avisoFormulario.get('archivoMasivo')?.setValue(FILE);
    }
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