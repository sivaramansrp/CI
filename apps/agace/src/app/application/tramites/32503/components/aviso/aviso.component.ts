import {
  AlertComponent,
  CatalogoSelectComponent,
  InputFecha,
  InputFechaComponent,
  InputRadioComponent,
  Pedimento,
  REGEX_ALFANUMERICO_CON_ESPACIOS,
  REGEX_ALFANUMERICO_CON_ESPACIOS_REEMPLAZAR,
  REGEX_IMPORTE_PAGO,
  REGEX_NUMEROS,
  REGEX_NUMEROS_USD_2,
  REGEX_REEMPLAZAR,
  REGEX_SOLO_NUMEROS,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService
} from "@libs/shared/data-access-user/src";
import { AvisoTabla, AvisoTablaDatos, Catalogo, CatalogoLista, MercanciaTabla, MercanciaTablaDatos } from "../../models/aviso-traslado.model";
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { ENCABEZADAS_TABLA, FECHA_INGRESO, TABLA_DE_MERCANCIA, TEXTOS, TIPACA, TIPAVI } from "../../constants/aviso-traslado.enum";
import { AvisoTrasladoService } from "../../services/aviso-traslado.service";
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
import { Tramite32503Query } from "../../../../estados/queries/tramite32503.query";
import { Tramite32503State } from "../../../../estados/tramites/tramite32503.store";
import { Tramite32503Store } from "../../../../estados/tramites/tramite32503.store";
import { Validators } from "@angular/forms";
import { ViewChild } from "@angular/core";
import { map } from "rxjs";
import { takeUntil } from "rxjs";
/**
 * Componente para gestionar el aviso de traslado.
 * 
 * Este componente permite al usuario capturar, editar y gestionar la información
 * relacionada con el aviso de traslado, incluyendo datos de la empresa, mercancías,
 * domicilios y otros detalles necesarios para el trámite 32503.
 */
@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputFechaComponent,
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
  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Sujeto utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
  */
  public destroyNotifier$: Subject<void> = new Subject();
  /**
   * @property {Tramite32503State} tramiteState
   * @description Estado actual del trámite 32503, que contiene toda la información relevante del proceso.
  */
  public tramiteState!: Tramite32503State;
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
      encabezadas: ENCABEZADAS_TABLA,
      datos: []
    };
  /**
   * @property {AvisoTabla[]} filaSeleccionadaLista
   * @description Lista de filas seleccionadas en la tabla de avisos. 
   * Contiene los datos de las filas seleccionadas por el usuario.
  */
  filaSeleccionadaLista: AvisoTabla[] = [];

  /**
   * @property {Record<number, any>} datosCompletosAvisos
   * @description Almacena los datos completos de los avisos incluyendo información de dirección.
   * Se utiliza para mantener datos adicionales que no están en la interfaz AvisoTabla.
   * La clave es el ID del aviso y el valor contiene todos los datos del formulario.
  */
  datosCompletosAvisos: Record<number, {
    rfc: string;
    nombreComercial: string;
    claveEntidadFederativa: string;
    claveDelegacionMunicipio: string;
    claveColonia: string;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    codigoPostal: string;
  }> = {};

  /**
   * @property {Record<number, any>} datosCompletosMercancias
   * @description Almacena los datos completos de las mercancías incluyendo toda la información del formulario.
   * Se utiliza para mantener datos adicionales para permitir la modificación completa.
   * La clave es el ID de la mercancía y el valor contiene todos los datos del formulario.
  */
  datosCompletosMercancias: Record<number, {
    claveFraccionArancelaria: string;
    nico: string;
    cantidad: string;
    claveUnidadMedida: string;
    valorUSD: string;
    descripcionMercancia: string;
    descripcionProceso: string;
    numPedimentoExportacion: string;
    numPedimentoImportacion: string;
  }> = {};
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

  /**
   * @property {ElementRef} modalMercancia
   * @description Referencia al elemento del modal de mercancía en la plantilla HTML.
   * Utilizado para abrir o manipular el modal de mercancía.
  */
  @ViewChild('modalMercancia') modalMercancia!: ElementRef;
  /**
   * @property {ElementRef} closeMercancia
   * @description Referencia al botón o elemento que cierra el modal de mercancía.
   * Utilizado para cerrar el modal de manera programática.
  */
  @ViewChild('closeMercancia') public closeMercancia!: ElementRef;
  /**
   * @property {FormGroup} domicilioFormulario
   * @description Formulario reactivo que contiene los datos relacionados con el domicilio.
  */
  domicilioFormulario!: FormGroup;
  /**
   * @property {object} tablaDeMercancia
   * @description Configuración de la tabla de mercancías utilizada en el componente.
   * Contiene las definiciones de las columnas (encabezados) y los datos que se mostrarán en la tabla.
   */
  tablaDeMercancia: {
    encabezadas: {
      encabezado: string,
      clave: (ele: MercanciaTabla) => string,
      orden: number
    }[],
    datos: MercanciaTabla[],
  } = {
      encabezadas: TABLA_DE_MERCANCIA,
      datos: []
    };
  /**
   * @property {MercanciaTabla[]} filaSeleccionadaMercanciaLista
   * @description Lista de filas seleccionadas en la tabla de mercancías.
   * Contiene los datos de las filas seleccionadas por el usuario en la tabla de mercancías.
   */
  filaSeleccionadaMercanciaLista: MercanciaTabla[] = [];
  /**
   * @property {FormGroup} mercanciaFormulario
   * @description Formulario reactivo que contiene los datos relacionados con la mercancía.
   */
  mercanciaFormulario!: FormGroup;
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
   * Representa una nueva instancia de notificación asociada con el componente.
   * Esta propiedad se utiliza para gestionar y almacenar datos de notificaciones.
   */
  public nuevaNotificacion1!: Notificacion;
  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  /**
 * Expresiones regulares utilizadas para validaciones y reemplazos.
 * 
 * Estas propiedades contienen las expresiones regulares que se utilizan en la clase
 * para realizar validaciones o reemplazos en los formularios.
 */
  REGEX_REEMPLAZAR = REGEX_REEMPLAZAR;

  /**
   * Expresión regular para validar y reemplazar caracteres alfanuméricos con espacios.
   */
  REGEX_ALFANUMERICO_CON_ESPACIOS_REEMPLAZAR = REGEX_ALFANUMERICO_CON_ESPACIOS_REEMPLAZAR;

  /**
   * Expresión regular para validar y reemplazar números.
   */
  REGEX_NUMEROS = REGEX_NUMEROS;
  /**
   * Estado de la consulta
   */
  consultaDatos!: ConsultaioState;
  /**
   * Lista de pedimentos asociados al aviso.
   */
  public pedimentos: Array<Pedimento> = [];
  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  soloLectura: boolean = false;

  /**
   * @property {boolean} mostrarAlertaValidacionDomicilio
   * @description Indica si se debe mostrar la alerta de validación en el modal de domicilio.
   * @default false
   */
  mostrarAlertaValidacionDomicilio: boolean = false;

  /**
   * @property {boolean} mostrarAlertaValidacionMercancia
   * @description Indica si se debe mostrar la alerta de validación en el modal de mercancía.
   * @default false
   */
  mostrarAlertaValidacionMercancia: boolean = false;

  /**
   * Índice del elemento a eliminar.
   */
  public elementoParaEliminar!: number;

  /**
   * @method cerrarModalDomicilio
   * @description Método para cerrar el modal de domicilio.
   * @returns {void}
   */
  cerrarModalDomicilio(): void {
    if (this.modalDomicilio) {
      AvisoComponent.hideModal(this.modalDomicilio);
    }
  }

  /**
   * @method cerrarModalMercancia
   * @description Método para cerrar el modal de mercancía.
   * @returns {void}
   */
  cerrarModalMercancia(): void {
    if (this.modalMercancia) {
      AvisoComponent.hideModal(this.modalMercancia);
    }
  }

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {Tramite32503Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite32503Query} tramiteQuery - Query para obtener el estado del trámite.
   * @param {AvisoTrasladoService} avisoTrasladoService - Servicio para obtener datos relacionados con el aviso.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
  */
  constructor(
    public fb: FormBuilder,
    public store: Tramite32503Store,
    public tramiteQuery: Tramite32503Query,
    public avisoTrasladoService: AvisoTrasladoService,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery,
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * @method activarValidacionFormulario
   * @description Método público para activar la validación del formulario y mostrar errores.
   * Marca todos los campos como touched para mostrar los mensajes de error.
   * @returns {boolean} true si el formulario es válido, false en caso contrario.
   */
  public activarValidacionFormulario(): boolean {
    // Marcar todos los campos del formulario principal como touched
    this.marcarGrupoFormularioTocado(this.avisoFormulario);
    
    // Marcar todos los campos del formulario de domicilio como touched
    this.marcarGrupoFormularioTocado(this.domicilioFormulario);
    
    // Marcar todos los campos del formulario de mercancía como touched
    this.marcarGrupoFormularioTocado(this.mercanciaFormulario);
    
    // Retornar si el formulario principal es válido
    return this.avisoFormulario.valid;
  }

  /**
   * @method marcarGrupoFormularioTocado
   * @description Marca todos los controles de un FormGroup como touched.
   * @param {FormGroup} formGroup - El FormGroup a marcar como touched.
   */
  private marcarGrupoFormularioTocado(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const CONTROL = formGroup.get(field);
      if (CONTROL) {
        CONTROL.markAsTouched({ onlySelf: true });
        
        // Si es un FormGroup anidado, marcarlo recursivamente
        if (CONTROL instanceof FormGroup) {
          this.marcarGrupoFormularioTocado(CONTROL);
        }
      }
    });
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
          this.tablaDeDatos.datos = this.tramiteState.tablaDeDatos ?? [];
        })
      )
      .subscribe();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();

    this.tablaDeDatos.datos = [];
    this.tablaDeMercancia.datos = [];

    this.inicializarDomicilioFormulario();
    this.cargarFederativa();
    this.cargarMunicipio();
    this.cargarColonias();
    this.inicializarMercanciaFormulario();
    this.cargarFraccionArancelaria();
    this.cargarUnidadMedida();
    this.inicializarFormulario();
  }
  /**
   * @method setValoresStore
   * @description Método para establecer valores en el store del trámite.
   * Obtiene el valor de un campo específico de un formulario y lo asigna al método correspondiente del store.
   *
   * @param {FormGroup} form - Formulario reactivo del cual se obtiene el valor.
   * @param {string} campo - Nombre del campo dentro del formulario.
   * @param {keyof Tramite32503Store} metodoNombre - Nombre del método del store donde se asignará el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite32503Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
   * @method cargarFraccionArancelaria
   * @description Método para cargar la lista de fracciones arancelarias desde el servicio `avisoTrasladoService`.
   * Los datos obtenidos se asignan a la propiedad `fraccionArancelaria`.
   *
   * @returns {void}
   */
  public cargarFraccionArancelaria(): void {
    this.avisoTrasladoService
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
   * @description Método para cargar la lista de unidades de medida desde el servicio `avisoTrasladoService`.
   * Los datos obtenidos se asignan a la propiedad `unidadMedida`.
   *
   * @returns {void}
   */
  public cargarUnidadMedida(): void {
    this.avisoTrasladoService
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
   * @description Método para cargar la lista de entidades federativas desde el servicio `avisoTrasladoService`.
   * Los datos obtenidos se asignan a la propiedad `entidadFederativa`.
   *
   * @returns {void}
   */
  public cargarFederativa(): void {
    this.avisoTrasladoService
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
   * @description Método para cargar la lista de municipios desde el servicio `avisoTrasladoService`.
   * Los datos obtenidos se asignan a la propiedad `delegacionMunicipio`.
   *
   * @returns {void}
   */
  public cargarMunicipio(): void {
    this.avisoTrasladoService
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
   * @description Método para cargar la lista de colonias desde el servicio `avisoTrasladoService`.
   * Los datos obtenidos se asignan a la propiedad `colonia`.
   *
   * @returns {void}
   */
  public cargarColonias(): void {
    this.avisoTrasladoService
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
   * @description Método para cargar los datos de la tabla de avisos desde el servicio `avisoTrasladoService`.
   * Los datos obtenidos se asignan a la propiedad `tablaDeDatos.datos`.
   *
   * @returns {void}
   */
  public cargarAvisoTabla(): void {
    this.avisoTrasladoService
      .obtenerAvisoTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: AvisoTablaDatos) => {
          this.tablaDeDatos.datos = datos.datos;
        }
      );
  }
  /**
   * @method cargarMercanciaTabla
   * @description Método para cargar los datos de la tabla de mercancías desde el servicio `avisoTrasladoService`.
   * Los datos obtenidos se asignan a la propiedad `tablaDeMercancia.datos`.
   *
   * @returns {void}
   */
  public cargarMercanciaTabla(): void {
    this.avisoTrasladoService
      .obtenerMercanciaTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: MercanciaTablaDatos) => {
          this.tablaDeMercancia.datos = datos.datos;
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
        idTransaccion: [this.tramiteState?.avisoFormulario?.idTransaccion, [Validators.maxLength(25), Validators.pattern(REGEX_IMPORTE_PAGO)]],
        motivoProrroga: [this.tramiteState?.avisoFormulario?.motivoProrroga, [Validators.required, Validators.maxLength(250)]],
        fechaTranslado: [this.tramiteState?.avisoFormulario?.fechaTranslado, [Validators.required]],
      }),
      direccionOrigen: this.fb.group({
        nombreComercial: [this.tramiteState?.avisoFormulario?.nombreComercial, [Validators.maxLength(250)]],
        claveEntidadFederativa: [this.tramiteState?.avisoFormulario?.claveEntidadFederativa, [Validators.required]],
        claveDelegacionMunicipio: [this.tramiteState?.avisoFormulario?.claveDelegacionMunicipio, [Validators.required]],
        claveColonia: [this.tramiteState?.avisoFormulario?.claveColonia, [Validators.required]],
        calle: [this.tramiteState?.avisoFormulario?.calle, [Validators.required, Validators.maxLength(250)]],
        numeroExterior: [this.tramiteState?.avisoFormulario?.numeroExterior, [Validators.required, Validators.maxLength(15), Validators.pattern(REGEX_ALFANUMERICO_CON_ESPACIOS)]],
        numeroInterior: [this.tramiteState?.avisoFormulario?.numeroInterior, [Validators.maxLength(15), Validators.pattern(REGEX_ALFANUMERICO_CON_ESPACIOS)]],
        codigoPostal: [this.tramiteState?.avisoFormulario?.codigoPostal, [Validators.required, Validators.maxLength(5), Validators.pattern(REGEX_SOLO_NUMEROS)]],
      }),
      tipoCarga: [this.tramiteState?.avisoFormulario?.tipoCarga, [Validators.required]],
      archivoMasivo: [null]

    });
    this.verificaTipoAviso();
    this.inicializarEstadoFormulario();
  }
  /**
   * Inicializa el estado de los formularios según el modo de solo lectura.
   * 
   * Este método habilita o deshabilita los formularios dependiendo del valor de la propiedad `soloLectura`.
   * Si `soloLectura` es `true`, los formularios se deshabilitan; de lo contrario, se habilitan.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.avisoFormulario?.disable();
      this.domicilioFormulario?.disable();
      this.mercanciaFormulario?.disable();
    } else {
      this.avisoFormulario?.enable();
      this.domicilioFormulario?.enable();
      this.mercanciaFormulario?.enable();
    }
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
      nombreComercial: [this.tramiteState?.domicilioFormulario?.nombreComercial ?? '', [Validators.maxLength(250)]],
      claveEntidadFederativa: [this.tramiteState?.domicilioFormulario?.claveEntidadFederativa ?? '', [Validators.required]],
      claveDelegacionMunicipio: [this.tramiteState?.domicilioFormulario?.claveDelegacionMunicipio ?? '', [Validators.required]],
      claveColonia: [this.tramiteState?.domicilioFormulario?.claveColonia ?? '', [Validators.required]],
      calle: [this.tramiteState?.domicilioFormulario?.calle ?? '', [Validators.required, Validators.maxLength(250)]],
      numeroExterior: [this.tramiteState?.domicilioFormulario?.numeroExterior ?? '', [Validators.required, Validators.maxLength(15), Validators.pattern(REGEX_IMPORTE_PAGO)]],
      numeroInterior: [this.tramiteState?.domicilioFormulario?.numeroInterior ?? '', [Validators.maxLength(15), Validators.pattern(REGEX_IMPORTE_PAGO)]],
      codigoPostal: [this.tramiteState?.domicilioFormulario?.codigoPostal ?? '', [Validators.required, Validators.maxLength(5), Validators.pattern(REGEX_SOLO_NUMEROS)]],
      rfc: [this.tramiteState?.domicilioFormulario?.rfc ?? '', [Validators.required]],
    });
  }
  /**
   * @method inicializarMercanciaFormulario
   * @description Método para inicializar el formulario reactivo `mercanciaFormulario` con los datos del estado actual del trámite.
   * 
   * - Agrupa los campos relacionados con la mercancía, como `claveFraccionArancelaria`, `nico`, `cantidad`, entre otros.
   * - Aplica validaciones específicas a cada campo, como longitud máxima, patrones y campos obligatorios.
   *
   * @returns {void}
   */
  inicializarMercanciaFormulario(): void {
    this.mercanciaFormulario = this.fb.group({
      claveFraccionArancelaria: [this.tramiteState?.mercanciaFormulario?.claveFraccionArancelaria || '', Validators.required],
      nico: [this.tramiteState?.mercanciaFormulario?.nico || '', [Validators.required, Validators.maxLength(2), Validators.pattern(REGEX_SOLO_NUMEROS)]],
      cantidad: [this.tramiteState?.mercanciaFormulario?.cantidad || '', [Validators.required, Validators.pattern(REGEX_NUMEROS_USD_2), Validators.max(999999999999.99)]],
      claveUnidadMedida: [this.tramiteState?.mercanciaFormulario?.claveUnidadMedida || '', Validators.required],
      valorUSD: [this.tramiteState?.mercanciaFormulario?.valorUSD || '', [Validators.required, Validators.pattern(REGEX_NUMEROS_USD_2), Validators.max(999999999999.99)]],
      descripcionMercancia: [this.tramiteState?.mercanciaFormulario?.descripcionMercancia || '', [Validators.required, Validators.maxLength(250)]],
      descripcionProceso: [this.tramiteState?.mercanciaFormulario?.descripcionProceso || '', [Validators.required, Validators.maxLength(250)]],
      numPedimentoExportacion: [this.tramiteState?.mercanciaFormulario?.numPedimentoExportacion || '', [Validators.required, Validators.maxLength(15)]],
      numPedimentoImportacion: [this.tramiteState?.mercanciaFormulario?.numPedimentoImportacion || '', [Validators.required, Validators.maxLength(15)]],
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
   * @method obtenerMensajeError
   * @description Método estático para obtener el mensaje de error de un campo específico de un formulario.
   * 
   * - Devuelve el mensaje de error apropiado según el tipo de validación que falló.
   *
   * @param {FormGroup} form - Formulario reactivo que contiene el campo a validar.
   * @param {string} field - Nombre del campo a validar.
   * @returns {string | null} Retorna el mensaje de error correspondiente o `null` si no hay errores.
   */
  static obtenerMensajeError(form: FormGroup, field: string): string | null {
    const CONTROL = form.get(field);
    if (!CONTROL || !CONTROL.touched || !CONTROL.invalid) {
      return null;
    }

    if (CONTROL.hasError('required')) {
      return 'Este campo es obligatorio.';
    }

    if (CONTROL.hasError('minlength')) {
      const REQUIRED_LENGTH = CONTROL.errors?.['minlength']?.requiredLength;
      return `Debe tener al menos ${REQUIRED_LENGTH} caracteres.`;
    }

    if (CONTROL.hasError('maxlength')) {
      const REQUIRED_LENGTH = CONTROL.errors?.['maxlength']?.requiredLength;
      return `No debe exceder ${REQUIRED_LENGTH} caracteres.`;
    }

    if (CONTROL.hasError('max')) {
      if (field === 'cantidad' || field === 'valorUSD') {
        return 'Por favor, escribe un valor menor a igual a 999999999999.99';
      }
      const MAX_VALUE = CONTROL.errors?.['max']?.max;
      return `El valor debe ser menor o igual a ${MAX_VALUE}.`;
    }

    if (CONTROL.hasError('pattern')) {
      return 'El formato ingresado no es válido.';
    }

    return 'Este campo contiene errores.';
  }

  /**
   * @property {Function} obtenerMensajeError
   * @description Propiedad pública que expone el método estático obtenerMensajeError para uso en el template.
   */
  public obtenerMensajeError = AvisoComponent.obtenerMensajeError;
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
  filaSeleccionadaMercancia(evento: MercanciaTabla[]): void {
    this.filaSeleccionadaMercanciaLista = evento;
  }
  /**
   * @method eliminarMercancia
   * @description Método para eliminar las filas seleccionadas de la tabla de mercancías.
   * 
   * - Muestra un modal de confirmación antes de eliminar.
   * - Solo elimina si hay filas seleccionadas.
   *
   * @returns {void}
   */
  eliminarMercancia(): void {
    if (this.filaSeleccionadaMercanciaLista.length === 0) {
      return;
    }

    this.elementoParaEliminar = 1;
    this.eliminarModal();
  }
  /**
   * @method eliminarDomicilio
   * @description Método para eliminar las filas seleccionadas de la tabla de domicilios.
   * 
   * - Muestra un modal de confirmación antes de eliminar.
   * - Solo elimina si hay filas seleccionadas.
   *
   * @returns {void}
   */
  eliminarDomicilio(): void {
    if (this.filaSeleccionadaLista.length === 0) {
      return;
    }

    this.elementoParaEliminar = 2;
    this.eliminarModal();
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
    this.avisoFormulario.get('datosAviso.idTransaccion')?.enable();
    this.avisoFormulario.get('datosAviso.motivoProrroga')?.enable();
    if (TIPO_AVISO === TIPAVI[0].value) {
      this.avisoFormulario.get('datosAviso.idTransaccion')?.disable();
      this.avisoFormulario.get('datosAviso.motivoProrroga')?.disable();
    }
  }
  /**
   * @method showModal
   * @description Helper method to safely show Bootstrap modals with compatibility handling.
   * @param {ElementRef} modalElement - The modal element reference to show.
   * @returns {void}
   */
  private static showModal(modalElement: ElementRef): void {
    try {
      document.querySelectorAll('.modal-backdrop').forEach(bd => bd.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
      
      const MODAL_EL = modalElement.nativeElement;
      
      MODAL_EL.classList.add('show');
      MODAL_EL.style.display = 'block';
      MODAL_EL.setAttribute('aria-modal', 'true');
      MODAL_EL.removeAttribute('aria-hidden');
      
      const BACKDROP = document.createElement('div');
      BACKDROP.className = 'modal-backdrop fade show';
      BACKDROP.onclick = (): void => {
        AvisoComponent.hideModal(modalElement);
      };
      document.body.appendChild(BACKDROP);
      
      document.body.classList.add('modal-open');
      
    } catch (error) {
      console.error('Error showing modal:', error);
    }
  }

  /**
   * @method hideModal
   * @description Helper method to hide Bootstrap modals.
   * @param {ElementRef} modalElement - The modal element reference to hide.
   * @returns {void}
   */
  private static hideModal(modalElement: ElementRef): void {
    try {
      const MODAL_EL = modalElement.nativeElement;
      
      MODAL_EL.classList.remove('show');
      MODAL_EL.style.display = 'none';
      MODAL_EL.setAttribute('aria-hidden', 'true');
      MODAL_EL.removeAttribute('aria-modal');
      
      document.querySelectorAll('.modal-backdrop').forEach(bd => bd.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
      
    } catch (error) {
      console.error('Error hiding modal:', error);
    }
  }

  /**
   * @method abiertoDomicilio
   * @description Método para abrir el modal de domicilio.
   * 
   * - Utiliza la referencia al modal de domicilio para mostrarlo en la interfaz.
   * - Si es para modificar (esModificacion = true), pre-carga los datos del registro seleccionado.
   * - Si es para agregar (esModificacion = false), resetea el formulario para que esté limpio.
   *
   * @param {boolean} esModificacion - Indica si el modal se abre para modificar (true) o agregar (false) un registro.
   * @returns {void}
   */
  abiertoDomicilio(esModificacion: boolean = false): void {
    this.mostrarAlertaValidacionDomicilio = false;
    
    if (esModificacion && this.filaSeleccionadaLista && this.filaSeleccionadaLista.length > 0) {
      const REGISTRO_SELECCIONADO = this.filaSeleccionadaLista[0];
      const DATOS_COMPLETOS = this.datosCompletosAvisos[REGISTRO_SELECCIONADO.id];

      if (DATOS_COMPLETOS) {
        this.domicilioFormulario.patchValue({
          rfc: DATOS_COMPLETOS.rfc || '',
          nombreComercial: DATOS_COMPLETOS.nombreComercial || '',
          claveEntidadFederativa: DATOS_COMPLETOS.claveEntidadFederativa || '',
          claveDelegacionMunicipio: DATOS_COMPLETOS.claveDelegacionMunicipio || '',
          claveColonia: DATOS_COMPLETOS.claveColonia || '',
          calle: DATOS_COMPLETOS.calle || '',
          numeroExterior: DATOS_COMPLETOS.numeroExterior || '',
          numeroInterior: DATOS_COMPLETOS.numeroInterior || '',
          codigoPostal: DATOS_COMPLETOS.codigoPostal || ''
        });
      } else {
        this.domicilioFormulario.patchValue({
          rfc: REGISTRO_SELECCIONADO.rfc || '',
          nombreComercial: REGISTRO_SELECCIONADO.nombreComercial || '',
          claveEntidadFederativa: REGISTRO_SELECCIONADO.entidadFederativa || '',
          claveDelegacionMunicipio: REGISTRO_SELECCIONADO.alcaldioOMuncipio || '',
          claveColonia: REGISTRO_SELECCIONADO.colonia || '',
          calle: '',
          numeroExterior: '',
          numeroInterior: '',
          codigoPostal: ''
        });
      }
    } else {
      this.domicilioFormulario.reset();
    }

    if (this.modalDomicilio) {
      AvisoComponent.showModal(this.modalDomicilio);
    }
  }
  /**
   * @method precargarDatosMercancia
   * @description Método auxiliar para pre-cargar los datos de mercancía en el formulario.
   * 
   * @param {MercanciaTabla} registroSeleccionado - Registro seleccionado de la tabla.
   * @returns {void}
   */
  private precargarDatosMercancia(registroSeleccionado: MercanciaTabla): void {
    const DATOS_COMPLETOS = this.datosCompletosMercancias[registroSeleccionado.id];

    if (DATOS_COMPLETOS) {
      this.mercanciaFormulario.patchValue({
        claveFraccionArancelaria: DATOS_COMPLETOS.claveFraccionArancelaria || '',
        nico: DATOS_COMPLETOS.nico || '',
        cantidad: DATOS_COMPLETOS.cantidad || '',
        claveUnidadMedida: DATOS_COMPLETOS.claveUnidadMedida || '',
        valorUSD: DATOS_COMPLETOS.valorUSD || '',
        descripcionMercancia: DATOS_COMPLETOS.descripcionMercancia || '',
        descripcionProceso: DATOS_COMPLETOS.descripcionProceso || '',
        numPedimentoExportacion: DATOS_COMPLETOS.numPedimentoExportacion || '',
        numPedimentoImportacion: DATOS_COMPLETOS.numPedimentoImportacion || ''
      });
    } else {
      this.mercanciaFormulario.patchValue({
        claveFraccionArancelaria: registroSeleccionado.claveFraccionArancelaria || '',
        nico: registroSeleccionado.nico || '',
        cantidad: registroSeleccionado.cantidad || '',
        claveUnidadMedida: registroSeleccionado.claveUnidadMedida || '',
        valorUSD: registroSeleccionado.valorUSD || '',
        numPedimentoExportacion: registroSeleccionado.numPedimentoExportacion || '',
        numPedimentoImportacion: registroSeleccionado.numPedimentoImportacion || ''
      });
    }
  }

  /**
   * @method abiertoMercancia
   * @description Método para abrir el modal de mercancía.
   * 
   * - Utiliza la referencia al modal de mercancía para mostrarlo en la interfaz.
   * - Si es para modificar (esModificacion = true), pre-carga los datos del registro seleccionado.
   * - Si es para agregar (esModificacion = false), resetea el formulario para que esté limpio.
   *
   * @param {boolean} esModificacion - Indica si el modal se abre para modificar (true) o agregar (false) un registro.
   * @returns {void}
   */
  abiertoMercancia(esModificacion: boolean = false): void {
    this.mostrarAlertaValidacionMercancia = false;
    
    if (esModificacion && this.filaSeleccionadaMercanciaLista && this.filaSeleccionadaMercanciaLista.length > 0) {
      const REGISTRO_SELECCIONADO = this.filaSeleccionadaMercanciaLista[0];
      this.precargarDatosMercancia(REGISTRO_SELECCIONADO);
    } else {
      if (this.mercanciaFormulario) {
        this.mercanciaFormulario.reset();
      }
    }

    if (this.modalMercancia) {
      document.querySelectorAll('.modal-backdrop').forEach(bd => bd.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
      
      const WIN = window as Window & { bootstrap?: { Modal?: typeof Modal } };
      if (WIN.bootstrap && WIN.bootstrap.Modal) {
        const MODAL_INSTANCE = new WIN.bootstrap.Modal(this.modalMercancia.nativeElement);
        MODAL_INSTANCE.show();
      } else {
        const MODAL_INSTANCE = new Modal(this.modalMercancia.nativeElement);
        MODAL_INSTANCE.show();
      }
    }
  }
  /**
   * @method pruebaAgregarMercancia
   * @description Método temporal para probar la funcionalidad de agregar mercancía.
   * @returns {void}
   */
  pruebaAgregarMercancia(): void {
    const TEST_MERCANCIA: MercanciaTabla = {
      id: this.tablaDeMercancia.datos.length + 1,
      claveFraccionArancelaria: 'TEST123',
      nico: '01',
      cantidad: '10',
      claveUnidadMedida: 'KG',
      valorUSD: '100',
      numPedimentoExportacion: '123456789012345',
      numPedimentoImportacion: '543210987654321'
    };

    this.tablaDeMercancia.datos = [...this.tablaDeMercancia.datos, TEST_MERCANCIA];
  }
  /**
   * @method agregarMercancia
   * @description Método para agregar mercancías a la tabla de mercancías.
   * 
   * - Toma los valores del formulario de mercancía y los agrega a la tabla existente.
   * - Valida que el formulario sea válido antes de agregar.
   * - Cierra el modal después de agregar exitosamente.
   *
   * @returns {void}
   */
  agregarMercancia(): void {
    if (this.mercanciaFormulario.valid) {
      this.mostrarAlertaValidacionMercancia = false;
      
      const VALORES_DE_FORMULARIO = this.mercanciaFormulario.value;
      const SIGUIENTE_ID = this.tablaDeMercancia.datos.length + 1;

      const NUEVA_MERCANCIA: MercanciaTabla = {
        id: SIGUIENTE_ID,
        claveFraccionArancelaria: VALORES_DE_FORMULARIO.claveFraccionArancelaria,
        nico: VALORES_DE_FORMULARIO.nico,
        cantidad: VALORES_DE_FORMULARIO.cantidad,
        claveUnidadMedida: VALORES_DE_FORMULARIO.claveUnidadMedida,
        valorUSD: VALORES_DE_FORMULARIO.valorUSD,
        numPedimentoExportacion: VALORES_DE_FORMULARIO.numPedimentoExportacion,
        numPedimentoImportacion: VALORES_DE_FORMULARIO.numPedimentoImportacion
      };

      this.datosCompletosMercancias[SIGUIENTE_ID] = {
        claveFraccionArancelaria: VALORES_DE_FORMULARIO.claveFraccionArancelaria,
        nico: VALORES_DE_FORMULARIO.nico,
        cantidad: VALORES_DE_FORMULARIO.cantidad,
        claveUnidadMedida: VALORES_DE_FORMULARIO.claveUnidadMedida,
        valorUSD: VALORES_DE_FORMULARIO.valorUSD,
        descripcionMercancia: VALORES_DE_FORMULARIO.descripcionMercancia,
        descripcionProceso: VALORES_DE_FORMULARIO.descripcionProceso,
        numPedimentoExportacion: VALORES_DE_FORMULARIO.numPedimentoExportacion,
        numPedimentoImportacion: VALORES_DE_FORMULARIO.numPedimentoImportacion
      };

      this.tablaDeMercancia.datos = [...this.tablaDeMercancia.datos, NUEVA_MERCANCIA];

      this.mercanciaFormulario.reset();
      this.closeMercancia?.nativeElement?.click();
    } else {
      this.mostrarAlertaValidacionMercancia = true;
      
      Object.keys(this.mercanciaFormulario.controls).forEach(key => {
        this.mercanciaFormulario.get(key)?.markAsTouched();
      });
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
    if (this.domicilioFormulario.valid) {
      this.mostrarAlertaValidacionDomicilio = false;
      
      const VALORES_DE_FORMULARIO = this.domicilioFormulario.value;
      const NUEVO_ID = Date.now();

      const NUEVO_DOMICILIO = {
        id: NUEVO_ID,
        rfc: VALORES_DE_FORMULARIO.rfc,
        nombreComercial: VALORES_DE_FORMULARIO.nombreComercial,
        entidadFederativa: VALORES_DE_FORMULARIO.claveEntidadFederativa,
        alcaldioOMuncipio: VALORES_DE_FORMULARIO.claveDelegacionMunicipio,
        colonia: VALORES_DE_FORMULARIO.claveColonia
      };

      this.datosCompletosAvisos[NUEVO_ID] = {
        rfc: VALORES_DE_FORMULARIO.rfc,
        nombreComercial: VALORES_DE_FORMULARIO.nombreComercial,
        claveEntidadFederativa: VALORES_DE_FORMULARIO.claveEntidadFederativa,
        claveDelegacionMunicipio: VALORES_DE_FORMULARIO.claveDelegacionMunicipio,
        claveColonia: VALORES_DE_FORMULARIO.claveColonia,
        calle: VALORES_DE_FORMULARIO.calle,
        numeroExterior: VALORES_DE_FORMULARIO.numeroExterior,
        numeroInterior: VALORES_DE_FORMULARIO.numeroInterior,
        codigoPostal: VALORES_DE_FORMULARIO.codigoPostal
      };

      this.tablaDeDatos.datos = [...this.tablaDeDatos.datos, NUEVO_DOMICILIO];

      this.domicilioFormulario.reset();
      this.closeDomicilio.nativeElement.click();
    } else {
      this.mostrarAlertaValidacionDomicilio = true;
      
      Object.keys(this.domicilioFormulario.controls).forEach(key => {
        this.domicilioFormulario.get(key)?.markAsTouched();
      });
    }
  }
  /**
   * @method desinfectarAlfanumerico
   * @description Método para limpiar un campo de formulario, eliminando caracteres no alfanuméricos.
   * 
   * - Reemplaza caracteres no permitidos en el valor del campo y actualiza el formulario.
   *
   * @param {FormGroup} form - Formulario reactivo que contiene el campo a limpiar.
   * @param {string} control - Nombre del control dentro del formulario.
   * @param {Event} event - Evento que contiene el valor ingresado por el usuario.
   * @returns {void}
   */
  desinfectarAlfanumerico(form: FormGroup, control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(this.REGEX_REEMPLAZAR, '');
    form.get(control)?.setValue(REEMPLAZAR, { emitEvent: false });
  }
  /**
   * @method desinfectarAlfanumericoConEspacio
   * @description Método para limpiar un campo de formulario, eliminando caracteres no alfanuméricos excepto espacios.
   * 
   * - Reemplaza caracteres no permitidos en el valor del campo y actualiza el formulario.
   *
   * @param {FormGroup} form - Formulario reactivo que contiene el campo a limpiar.
   * @param {string} control - Nombre del control dentro del formulario.
   * @param {Event} event - Evento que contiene el valor ingresado por el usuario.
   * @returns {void}
   */
  desinfectarAlfanumericoConEspacio(form: FormGroup, control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(this.REGEX_ALFANUMERICO_CON_ESPACIOS_REEMPLAZAR, '');
    form.get(control)?.setValue(REEMPLAZAR, { emitEvent: false });
  }
  /**
   * @method desinfectarNumerico
   * @description Método para limpiar un campo de formulario, eliminando caracteres no numéricos.
   * 
   * - Reemplaza caracteres no permitidos en el valor del campo y actualiza el formulario.
   *
   * @param {FormGroup} form - Formulario reactivo que contiene el campo a limpiar.
   * @param {string} control - Nombre del control dentro del formulario.
   * @param {Event} event - Evento que contiene el valor ingresado por el usuario.
   * @returns {void}
   */
  desinfectarNumerico(form: FormGroup, control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(this.REGEX_NUMEROS, '');
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
  * Elimina un pedimento de la lista.
  * @param borrar Indica si se debe eliminar el pedimento.
  */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      if (this.elementoParaEliminar === 1) {
        this.tablaDeMercancia.datos = this.tablaDeMercancia.datos.filter((ele) => !this.filaSeleccionadaMercanciaLista.includes(ele));
        this.filaSeleccionadaMercanciaLista = [];
      } else if (this.elementoParaEliminar === 2) {
        this.tablaDeDatos.datos = this.tablaDeDatos.datos.filter((ele) => !this.filaSeleccionadaLista.includes(ele));
        this.filaSeleccionadaLista = [];
      }
    }
  }

  /**
   * @method eliminarModal
   * @description Método para configurar una notificación de confirmación de eliminación.
   * 
   * Este método configura una nueva notificación con los siguientes parámetros:
   * - `tipoNotificacion`: Tipo de notificación (en este caso, "alerta").
   * - `categoria`: Categoría de la notificación (en este caso, "peligro").
   * - `modo`: Modo de la notificación (en este caso, "acción").
   * - `titulo`: Título de la notificación (en este caso, vacío).
   * - `mensaje`: Mensaje de la notificación (en este caso, "¿Desea eliminar el registro seleccionado?").
   * - `cerrar`: Indica si la notificación se puede cerrar manualmente (en este caso, `false`).
   * - `tiempoDeEspera`: Tiempo en milisegundos antes de que la notificación desaparezca automáticamente (en este caso, 2000 ms).
   * - `txtBtnAceptar`: Texto del botón de aceptación (en este caso, "Aceptar").
   * - `txtBtnCancelar`: Texto del botón de cancelación (en este caso, "Cancelar").
   *
   * @returns {void}
   */
  public eliminarModal(): void {
    this.nuevaNotificacion1 = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: '¿Desea eliminar el registro seleccionado?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
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