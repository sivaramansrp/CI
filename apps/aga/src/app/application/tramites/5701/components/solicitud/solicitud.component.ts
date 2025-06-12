import { TITULO_MODAL_AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/terceros.enums';

import {
  ALFANUMERICO_ESPACIO,
  AduanaService,
  Catalogo,
  CatalogoPaises,
  CrossListLable,
  DatosAgregarFormulario,
  FechasService,
  FormulariosService,
  ICatalogo,
  MENSAJE_ALERTA_NO_FECHAS,
  MSG_ALERTA_ELIMINAR_ELEMENTO,
  MSG_ELIMINA_ELEMENTO,
  Notificacion,
  PROGRAMA_FOMENTO,
  PROGRAMA_IMMEX,
  PaisesService,
  REGEX_RFC,
  RFC_GENERICO,
  Recinto,
  RecintoService,
  SeccionAduanaService,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TEXTO_ACEPTAR,
  TEXTO_CANCELAR,
  TIPO_SOLICITUD,
  TablaSeleccion,
  TipoDespachoService,
  TipoOperacionService,
  TipoPedimentoService,
  TipoPersona,
  TipoSolicitudService,
  TipoTransporteService,
  TransporteDespacho,
  ValidaRfcService,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  CONFIGURACION_ENCABEZADO_TABLA_PAGOS,
  EMPRESAS_CERTIFICADAS,
  ERR_RFC_NO_VALIDO,
  ESTATUS_PAGADO,
  ID_NAME_DD,
  ID_NAME_LDA,
  LABEL_CROSSLIST,
  LABEL_DESPACHO_DD,
  LABEL_DESPACHO_LDA,
  PATENTES_ID,
  SIN_ITEMS,
  SIN_VALOR,
  TRANSPORTE,
  UN_DIA,
  VEHICULO,
} from '../../../../core/enums/5701/tramite5701.enum';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  DatosComponentePedimento,
  Pedimento,
  ResponsablesDespacho,
} from '../../../../core/models/5701/tramite5701.model';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  delay,
  first,
  map,
  merge,
  switchMap,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import {
  Solicitud5701State,
  Tramite5701Store,
} from '../../../../core/estados/tramites/tramite5701.store';
import { CatalogoLista } from '@libs/shared/data-access-user/src/core/models/shared/tipo-solicitud.model';
import { CertificacionOeaService } from '../../../../core/services/5701/certificacion-oea.service';
import { CertificacionOrigenService } from '../../../../core/services/5701/certificacion-origen.service';
import { CertificacionService } from '../../../../core/services/5701/certificacion.service';
import { DatosCheckInputText } from '../../../../core/models/shared/check-input-text.model';
import { IdcService } from '../../../../core/services/5701/idc.service';
import { IndustriaAutomotrizService } from '../../../../core/services/5701/industria-automotriz.service';
import { LineaCaptura } from '../../../../core/models/5701/linea-captura.model';
import { MODALIDAD_OEA_IMPEXP } from '../../../../constantes/5701/constantes-tramite';
import { ParametroMontoService } from '../../../../core/services/5701/pago/parametro-monto.service';
import { Patente } from '../../../../core/models/5701/Patente.model';
import { PatenteApoderadoService } from '../../../../core/services/5701/patente-apoderado.service';
import { PatenteEmpresaService } from '../../../../core/services/5701/patente-empresas.service';
import { PatenteService } from '../../../../core/services/5701/patente.service';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios.service';
import { SocioComercialService } from '../../../../core/services/5701/socio-comercial.service';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';
import { UsuarioState } from '@libs/shared/data-access-user/src/core/estados/usuario.store';
import { ValidaLineaCapturaService } from '../../../../core/services/5701/pago/valida-linea-captura.service';
import { ValidaLineaPagoService } from '../../../../core/services/5701/pago/valida-linea-pago.service';

//Estas importaciones deben eliminarse una vez que se obtengan las patentes y los rfcs de la consulta del api.
// eslint-disable-next-line @nx/enforce-module-boundaries
import patentes from 'libs/shared/theme/assets/json/5701/patentes.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import rfcs from 'libs/shared/theme/assets/json/5701/rfcs.json';

import {
  MSG_ADUANA_PEDIMENTO,
  MSG_ERROR_NO_INFORMACION,
  MSG_ERROR_RFC_NO_ENCONTRADO,
  MSG_MONTO_PAGADO_CUBIERTO,
  MSJ_ERROR_FECHA_DIA,
  MSJ_ERROR_FECHA_MES,
  MSJ_ERROR_FECHA_SEMANA,
  MSJ_ERROR_ID_SOCIO_COMERCIAL,
  MSJ_ERROR_LINEA_CAPTURA,
  MSJ_LINEA_CAPTURA_NO_PAGADA,
  MSJ_LINEA_CAPTURA_USADA,
} from '../../../../core/enums/5701/mensajes-modal-5701.enum';
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Índice de tabulación para el control de enfoque en la interfaz.
   * @required
   */
  @Input({ required: true }) tabindex!: number;

  /**
   * Folio de la solicitud.
   * @required
   */
  @Input() folioSolicitud!: string;

  /**
   * Catalogo tipos de solicitud disponibles.
   */
  tiposSolicitud!: Catalogo[];

  /**
   * Catalogos de países, para país de origen y de procedencia.
   */
  paisesOrigen!: CatalogoPaises[];
  paisesProcedencia!: CatalogoPaises[];

  /**
   * Catalogo de aduanas disponibles.
   */
  aduanas!: ICatalogo[];

  /**
   * Catalogo de secciones aduaneras disponibles.
   */
  seccionAduanera!: ICatalogo[];

  /**
   * Catalogo de tipos de operación.
   */
  tipoOperacion!: Catalogo[];

  /**
   * Catalogo de tipos de transporte y vehículos.
   */
  tipoTransporte!: Catalogo[];
  tipoVehiculo!: Catalogo[];

  /**
   * Catalogo de recinto aduanero.
   */
  recintoCatalogo!: Recinto[];

  /**
   * Catalogo de despacho LDA y DD.
   */
  despachoLdaCatalogo!: Catalogo[];
  despachoDDCatalogo!: Catalogo[];

  /**
   * Catalogo de despachos.
   */
  selectCatalogoDespacho!: Catalogo[];

  /**
   * Activa el catálogo de despacho LDA o DD según la selección del usuario.
   */
  activarCatalogoDespacho: boolean = false;

  /**
   * Activa o desactiva el campo sección aduanera según la selección del usuario
   */
  desactivarSelectSeccionAduanera: boolean = false;

  /**
   * Activa o desactiva el campo recinto aduanero según la selección del usuario
   */
  desactivarSelectRecinto: boolean = false;

  /**
   * Guarda el tipo de solicitud seleccionada por el usuario.
   */
  tipoSolicitudSeleccionada!: number;

  /**
   * Formulario reactivo para gestionar la solicitud.
   */
  FormSolicitud!: FormGroup;

  /**
   * Controla la visibilidad del crosslist de fechas.
   */
  colapsable: boolean = false;

  /**
   * Arreglo de cadenas que representa un rango de días para seleccionar.
   */
  selectRangoDias: string[] = [];

  /**
   * Indica si se debe mostrar el rango de fechas.
   */
  mostrarRangoFechas: boolean = false;

  /**
   * Indica si el usuario es un apoderado.
   */
  isApoderado: boolean = false;

  /**
   * Indica si esxiste más de una patente.
   */
  masDeUnaPatente: boolean = false;

  /**
   * Indica si el usuario es un apoderado de más de una empresa.
   */
  masDeUnaEmpresa: boolean = false;

  /**
   * Pedimento -crea una señal para validar
   */
  validacionPedimento?: boolean;

  /**
   * Almacena los datos que necesita el componente Patente para hacer las validaciones
   * patente: Número de patente
   * idAduanaDespacho: Número de aduana elegida
   */
  datosPedimentoComponente!: DatosComponentePedimento;

  /**
   * Variable que toma el valor true si el tipo de despacho LDA o DD ha sido seleccionado, de lo contrario es false.
   */
  despachoSeleccionado: boolean = false;

  /**
   * Variable que toma el valor de la etiqueta del tipo de despacho LDA o DD.
   */
  labelTipoDespacho!: string;

  /**
   * Variable que toma el valor que el id el input que almacena la autorizacion LDA o DD.
   */
  idNameAutorizacion!: string;

  /**
   * Variable que toma el valor de la funcion del store que almacena la autorizacion LDA o DD.
   */
  funcionStoreAutorizacion!: keyof Tramite5701Store;

  /**
   * Variable que toma el valor que tendra el id del tipo de despacho que ha sido seleccionado LDA o DD.
   */
  idTipoDespacho!: string;

  /**
   * Opciones disponibles para empresas certificadas.
   */
  radioOpciones = EMPRESAS_CERTIFICADAS;

  /**
   * Notificador para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la sección utilizado en el componente.
   */
  private seccion!: SeccionLibState;

  /**
   * Estado de la solicitud utilizado en el componente.
   */
  public solicitudState!: Solicitud5701State;

  /**
   * Estado del usuario firmado en la aplicación
   */
  private usuarioState!: UsuarioState;

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion | null;

  /**
   * Bandera para saber el tipo de persona del usuario.
   * Por el momento esta bandera está hardcodeada, la información se deberá tomar del store de la aplicación,
   * en cuanto esa implementación esté realizada, esta línea deberá borrarse.
   */
  private tipoPersona: TipoPersona = TipoPersona.FISICA;

  /**
   * Bandera para mostrar u ocultar la sección de certificaciones.
   */
  public muestraCertificaciones: boolean = true;

  /**
   * Tipo de despacho seleccionado por el usuario.
   */
  public tipoDespacho!: string;

  /**
   * GUarda el tipo de proceso que se eligió y de acuerdo a lo elegido se tomá decision en el modal.
   */
  public procesoModal!: string;

  /**
   * Tabla de selección para los pagos.
   */
  public tablaSeleccionPagos = TablaSeleccion;

  /**
   * Encabezado de la tabla de pagos.
   */
  public encabezadoDeTablaPagos = CONFIGURACION_ENCABEZADO_TABLA_PAGOS;

  /**
   * Datos de la tabla de pagos.
   */
  public datosTablaPagos: LineaCaptura[] = [];

  /**
   * @description Almacena el monto total a pagar en la solicitud.
   */
  montoACubrir: number = 0;

  /**
   * @description Almacena el monto por dia.
   */
  montoPorDia: number = 0;

  /**
   * @description Almacena los montos a pagar en la solicitud.
   */
  montoPagadoLineas: number = 0;

  /**
   * @description Mensaje de alerta que se muestra cuando no se han seleccionado fechas, en el crosslist.
   */
  readonly MENSAJE_ALERTA_CROSSLIST = MENSAJE_ALERTA_NO_FECHAS;

  /**
   * @description Label del crosslist de fechas
   */
  readonly LABEL_CROSSLIST_FECHAS: CrossListLable = LABEL_CROSSLIST;

  /**
   *@description Alamcena las lineas de capturas seleccionadas por el usuario en la tabla.
   */
  lineaCapturaSeleccionados: LineaCaptura[] = [];

  //Estas variables se van a eliminar
  /**
   * Arrelgo de patentes de la empresa
   */
  radioPatentes = patentes.patentes;
  rfcs = rfcs.rfcs;

  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    private tramite5701Store: Tramite5701Store,
    private tramite5701Query: Tramite5701Query,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private serviciosExtraordinariosService: ServiciosExtraordinariosService,
    private tipoSolicitudService: TipoSolicitudService,
    private readonly tipoOperacionService: TipoOperacionService,
    private readonly tipoTransporteService: TipoTransporteService,
    private readonly paisesService: PaisesService,
    private readonly tipoPedimentoService: TipoPedimentoService,
    private readonly tipoDespachoService: TipoDespachoService,
    private readonly aduanaService: AduanaService,
    private readonly patenteService: PatenteService,
    private readonly patenteApoderadoService: PatenteApoderadoService,
    private readonly patenteEmpresasService: PatenteEmpresaService,
    private readonly seccionAduanaService: SeccionAduanaService,
    private readonly recintoService: RecintoService,
    private readonly socioComercial: SocioComercialService,
    private readonly validaRfcService: ValidaRfcService,
    private readonly idcService: IdcService,
    private readonly certificacionService: CertificacionService,
    private readonly certificacionIndustriaAutomotrizService: IndustriaAutomotrizService,
    private readonly certificacionOrigenService: CertificacionOrigenService,
    private readonly certificacionOeaService: CertificacionOeaService,
    private readonly validaLineaPagoService: ValidaLineaPagoService,
    private readonly validaLineaCapturaService: ValidaLineaCapturaService,
    private readonly parametroMontoService: ParametroMontoService
  ) {}

  ngOnInit(): void {
    this.validaTipoPersona();
    // Peticiones a las apis
    this.inicializaCatalogos();

    this.tramite5701Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.crearFormSolicitud();

    this.FormSolicitud.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_) => {
          this.configuraSeccion();
        })
      )
      .subscribe();

    // Aqui se busca el nro de patente o autorizacion
    //
    this.obtenerPatente();

    this.calcularMontoTotal();
    this.verificarDatosExistentesStore();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['folioSolicitud'] && changes['folioSolicitud'].currentValue) {
      this.FormSolicitud.get('folioSolicitud')?.setValue(this.folioSolicitud);
      // Se hace la peticion para obtener los datos de la solicitud
    }
  }

  private validaTipoPersona(): void {
    // Esta validación debería cambiar y validar contra el valor almacenado
    // en el store.
    if (this.tipoPersona === TipoPersona.FISICA) {
      this.obtenerPatente();
    }
  }

  /**
   * Método para actualizar las secciones una vez que contengan toda la información marcada como requerida
   */
  private configuraSeccion(): void {
    let seccion: number | null = 0;
    const FORMAS_VALIDADAS = this.seccion.formaValida;

    for (let i = 0; i < this.seccion.seccion.length; i++) {
      if (
        this.seccion.seccion[i] === true &&
        this.seccion.formaValida[i] === false
      ) {
        seccion = i;
        break;
      } else {
        seccion = null;
      }
    }

    if (seccion !== null) {
      if (this.FormSolicitud.valid) {
        FORMAS_VALIDADAS[seccion] = true;
        this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
      } else {
        FORMAS_VALIDADAS[seccion] = false;
        this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
      }
    }
  }

  /**
   * Obtiene el grupo de formulario 'datosImportadorExportador' del formulario principal 'FormSolicitud'.
   *
   * @returns {FormGroup} El grupo de formulario 'datosImportadorExportador'.
   */
  get datosImportadorExportador(): FormGroup {
    return this.FormSolicitud.get('datosImportadorExportador') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'datosServicio' del formulario principal 'FormSolicitud'.
   *
   * @returns {FormGroup} El grupo de formulario 'datosServicio'.
   */
  get datosServicio(): FormGroup {
    return this.FormSolicitud?.get('datosServicio') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'despacho' del formulario principal 'FormSolicitud'.
   *
   * @returns {FormGroup} El grupo de formulario 'despacho'.
   */
  get despacho(): FormGroup {
    return this.FormSolicitud.get('despacho') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'pedimento' del formulario principal 'FormSolicitud'.
   *
   * @returns {FormGroup} El grupo de formulario 'pedimento'.
   */
  get pedimento(): FormArray {
    return this.FormSolicitud.get('pedimento') as FormArray;
  }

  /**
   * Obtiene el array del formulario 'personasResponsablesDespacho' del formulario principal 'FormSolicitud'.
   *
   * @returns {FormArray} El array de formulario 'personasResponsablesDespacho'.
   */
  get personasResponsablesDespacho(): FormArray {
    return this.FormSolicitud.get('personasResponsablesDespacho') as FormArray;
  }

  /**
   * Obtiene el array del formulario 'lineasCaptura' del formulario principal 'FormSolicitud'.
   *
   * @returns {FormArray} El array de formulario 'lineasCaptura'.
   */
  get lineasCaptura(): FormArray {
    return this.pagoCaptura.get('lineasCaptura') as FormArray;
  }

  /**
   * Obtiene el grupo de formulario 'mercancia' del formulario principal 'FormSolicitud'.
   */
  get mercancia(): FormGroup {
    return this.FormSolicitud.get('mercancia') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'pagoCaptura' del formulario principal 'FormSolicitud'.
   */
  get pagoCaptura(): FormGroup {
    return this.FormSolicitud.get('pagoCaptura') as FormGroup;
  }

  /**vehiculo
   * Obtiene el grupo de formulario 'vehiculo' del formulario principal 'FormSolicitud'.
   */
  get vehiculo(): FormGroup {
    return this.FormSolicitud.get('vehiculo') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'transporteArriboSalida' del formulario principal 'FormSolicitud'.
   */
  get transporteArriboSalida(): FormGroup {
    return this.FormSolicitud.get('transporteArriboSalida') as FormGroup;
  }

  /**
   * Obtiene el array del formulario 'itemsVehiculo' del grupo de formulario 'vehiculo'.
   *
   * @returns {FormArray} El array de formulario 'itemsVehiculo'.
   */
  get itemsVehiculo(): FormArray {
    return this.vehiculo.get('vehiculoDatos') as FormArray;
  }

  /**
   * Obtiene el array del formulario 'fechasSeleccionadas' del grupo de formulario  'datosServicio'.
   *
   * @returns {FormArray} El array de formulario 'fechasSeleccionadas'.
   */
  get fechasSeleccionadas(): FormArray {
    return this.datosServicio.get('fechasSeleccionadas') as FormArray;
  }

  /**
   * Valida que el FormArray tenga al menos un elemento.
   * @param min {number} - El número mínimo de elementos que debe tener el FormArray.
   * @returns {ValidatorFn} - Una función de validador que verifica la longitud del FormArray.
   */
  static minLengthArray(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormArray && control.length < min) {
        return {
          minLengthArray: { requiredLength: min, actualLength: control.length },
        };
      }
      return null;
    };
  }

  /**
   * Verifica si la solicitud seleccionada es de tipo individual.
   *
   * @returns {boolean} - Retorna `true` si la solicitud seleccionada es de tipo individual, de lo contrario retorna `false`.
   */
  individual(): boolean {
    return this.tipoSolicitudSeleccionada &&
      this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.INDIVIDUAL
      ? true
      : false;
  }

  /**
   * Verifica si un campo específico en un formulario es válido.
   *
   * @param {FormGroup} form - El formulario que contiene el campo a validar.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} - Retorna `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.validacionesService.isValid(form, field)!;
  }

  /**
   * Error pattern
   * @returns {boolean} - Retorna `true` si el campo tiene un error de patrón, de lo contrario `false`.
   */
  isErrorPattern(field: string): boolean {
    const CONTROL = this.datosImportadorExportador.get(field) as FormControl;

    if (CONTROL) {
      const ERROR_PATTERN = CONTROL.hasError('pattern');
      return ERROR_PATTERN;
    }

    return false;
  }

  /**
   * Verifica si el control 'idSocioComercial' tiene el validador 'Validators.required'.
   *
   * @returns {boolean} `true` si el control es obligatorio, de lo contrario `false`.
   */
  // eslint-disable-next-line class-methods-use-this
  isRequired(form: FormGroup, field: string): boolean | null {
    const CONTROL = form.get(field) as FormControl;

    if (CONTROL) {
      const ERROR_PATTERN = CONTROL.hasError('required');
      return ERROR_PATTERN && CONTROL.touched;
    }

    return false;
  }

  /**
   * Verifica si hay un error de intervalo de fecha en los datos del servicio.
   * @returns {boolean} - `true` si hay un error de intervalo de fecha y el campo ha sido tocado, de lo contrario `false`.
   */
  intervaloFechaError(): boolean {
    return (
      this.datosServicio.hasError('invalidIntervalo') &&
      this.datosServicio.touched
    );
  }

  /**
   * Verifica si hay un error de intervalo de fecha en los datos del servicio.
   * @returns {boolean} - `true` si hay un error de intervalo de fecha y el campo ha sido tocado, de lo contrario `false`.
   */
  fechaInicioPasadaFechaFinalError(): boolean {
    return (
      this.datosServicio.hasError('endDateBeforeStartDate') &&
      this.datosServicio.touched
    );
  }

  /**
   * Obtiene los tipos de solicitud desde el catálogo y los asigna a `datosTiposSolicitud`.
   *
   * Este método realiza una solicitud al servicio `catalogosServices` para obtener el catálogo de tipos de solicitud identificado por `CATALOGOS_ID.CAT_TIPO_SOL`. Una vez que recibe la  respuesta, verifica si la respuesta contiene elementos. Si es así, asigna los datos recibidos a la propiedad `datosTiposSolicitud` con la estructura adecuada.
   */
  private inicializaCatalogos(): void {
    const CAT_TIPO_SOLICITUD$ = this.tipoSolicitudService
      .getListaTipoSolicitud()
      .pipe(
        map((datos: CatalogoLista) => {
          this.tiposSolicitud = datos.datos;
        }),
        takeUntil(this.destroyNotifier$)
      );

    const CATALOGO_PAISES$ = this.paisesService.getListaPaises().pipe(
      map((resp) => {
        this.paisesOrigen = resp.datos.sort((a, b) =>
          a.descripcion.localeCompare(b.descripcion, 'es', {
            sensitivity: 'base',
          })
        );
        this.paisesProcedencia = resp.datos.sort((a, b) =>
          a.descripcion.localeCompare(b.descripcion, 'es', {
            sensitivity: 'base',
          })
        );
      })
    );

    const CATALOGO_ADUANAS$ = this.aduanaService.getListaAduanas().pipe(
      map((resp) => {
        this.aduanas = resp.datos;
      })
    );

    const TIPO_OPERACION$ = this.tipoOperacionService
      .getListaTipoOperacion()
      .pipe(
        map((resp) => {
          this.tipoOperacion = resp.datos;
        })
      );

    const TIPO_TRANSPORTE$ = this.tipoTransporteService
      .getListaTipoTransporte()
      .pipe(
        map((resp) => {
          const CATALOGO_TRANSPORTE = resp.datos;

          const TIPO_VEHICULO = VEHICULO;
          this.tipoVehiculo = CATALOGO_TRANSPORTE.filter((elemento: Catalogo) =>
            TIPO_VEHICULO.includes(elemento.descripcion)
          );

          const TIPO_TRANSPORTE = TRANSPORTE;
          this.tipoTransporte = CATALOGO_TRANSPORTE.filter(
            (elemento: Catalogo) =>
              TIPO_TRANSPORTE.includes(elemento.descripcion)
          );
        })
      );

    const CAT_DESPACHO_LDA$ = this.tipoDespachoService
      .getListaTipoDespacho()
      .pipe(
        map((resp) => {
          this.despachoLdaCatalogo = resp.datos;
        })
      );

    const CAT_DESPACHO_DD$ = this.tipoDespachoService
      .getListaTipoDespacho()
      .pipe(
        map((resp) => {
          this.despachoDDCatalogo = resp.datos;
        })
      );

    merge(
      CAT_TIPO_SOLICITUD$,
      CATALOGO_PAISES$,
      CATALOGO_ADUANAS$,
      TIPO_OPERACION$,
      TIPO_TRANSPORTE$,
      CAT_DESPACHO_LDA$,
      CAT_DESPACHO_DD$
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
  }

  /**
   * Este método realiza una búsqueda de la patente en algún endpoint y luego
   * agrega el valor de la patente al formulario utilizando el servicio de formularios.
   * @return {void} No retorna ningún valor.
   * @private
   */
  private obtenerPatente(): void {
    let patente: Patente;
    this.patenteService
      .getListaPatente('SAAA980822LP1')
      .pipe(
        switchMap((pantenteResponse) => {
          if (pantenteResponse) {
            patente = pantenteResponse.datos;
            const DATOS_PATENTE: DatosAgregarFormulario = {
              form: this.despacho,
              field: 'patente',
              valor: patente?.patente,
            };
            FormulariosService.agregarValorCamposDesactivados(DATOS_PATENTE);
            this.tramite5701Store.setPatente(patente);
            return EMPTY;
          }
          return this.patenteApoderadoService.getListaPatentesApoderado(
            'SAAA980822LP1'
          );
        }),
        switchMap((patenteApoderadoResponse) => {
          if (patenteApoderadoResponse) {
            this.tramite5701Store.setPatenteApoderado(
              patenteApoderadoResponse.datos
            );
            this.isApoderado = true;
            if (patenteApoderadoResponse.datos?.length > 1) {
              this.masDeUnaPatente = true;
              return EMPTY;
            }
            this.tramite5701Store.setPatente(patenteApoderadoResponse.datos[0]);
            return this.patenteEmpresasService.getListaEmpresas(patente);
          }
          return EMPTY;
        }),
        tap((empresaResponse) => {
          if (empresaResponse) {
            if (empresaResponse.datos.length > 1) {
              this.masDeUnaEmpresa = true;
            } else {
              this.datosImportadorExportador
                .get('RFCImpExp')
                ?.setValue(empresaResponse.datos[0]);
              this.tramite5701Store.setRFCImportadorExportador(
                empresaResponse.datos[0]
              );
            }
          }
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
  }

  /**
   * Crea el formulario de solicitud.
   * @return {void} No retorna ningún valor.
   */
  crearFormSolicitud(): void {
    this.FormSolicitud = this.fb.group({
      folioSolicitud: [],
      tipoSolicitud: [
        this.solicitudState?.tipoSolicitud,
        [Validators.required],
      ],
      descripcionTipoSolicitud: ['', [Validators.required]],
      datosImportadorExportador: this.fb.group({
        apoderadoPatente: [],
        empresaApoderado: [],
        empresasApoderado: [],

        RFCImpExp: [
          this.solicitudState?.RFCImportadorExportador,
          [Validators.required, Validators.pattern(REGEX_RFC)],
        ],
        nombre: [{ value: this.solicitudState?.nombre, disabled: true }],
        desNumeroRegistro: [
          this.solicitudState?.descripcionNumeroRegistro,
          [Validators.maxLength(30)],
        ],

        programa: [this.solicitudState?.programa],
        desProgramaFomento: [
          {
            value: this.solicitudState?.descripcionProgramaFomento,
            disabled: true,
          },
          [Validators.maxLength(300)],
        ],

        checkIMMEX: [this.solicitudState?.checkIMMEX],
        desImmex: [this.solicitudState?.descripcionImmex],

        industriaAutomotriz: [this.solicitudState?.industriaAutomotriz],
        desIndustrialAutomotriz: [
          {
            value: this.solicitudState?.descripcionIndustrialAutomotriz,
            disabled: true,
          },
          [Validators.maxLength(25)],
        ],

        tipoEmpresaCertificada: [this.solicitudState?.tipoEmpresaCertificada],
        socioComercial: [this.solicitudState?.socioComercial],
        certificacionOEA: [this.solicitudState?.certificacionOEA],
        revision: [this.solicitudState?.revision],
        idSocioComercial: [
          { value: this.solicitudState?.idSocioComercial, disabled: true },
        ],
      }),

      datosServicio: this.fb.group({
        fechaInicio: [this.solicitudState?.fechaInicio, [Validators.required]],
        fechaFinal: [this.solicitudState?.fechaFinal, [Validators.required]],
        horaInicio: [this.solicitudState?.horaInicio, Validators.required],
        horaFinal: [this.solicitudState?.horaFinal, Validators.required],
        fechasSeleccionadas: this.fb.array([], Validators.required),
      }),

      despacho: this.fb.group({
        lda: [{ value: this.solicitudState?.lda, disabled: false }],
        rfcDespachoLDA: [this.solicitudState?.autorizacionLDA],
        dd: [{ value: this.solicitudState?.dd, disabled: false }],
        folioDDEX: [this.solicitudState?.autorizacionDDEX],
        idAduanaDespacho: [
          this.solicitudState?.idAduanaDespacho,
          [Validators.required, ValidacionesFormularioService.noMenosUnoValor],
        ],
        aduanaDespacho: [this.solicitudState?.aduanaDespacho],
        idSeccionDespacho: [
          this.solicitudState?.idSeccionDespacho,
          [ValidacionesFormularioService.noMenosUnoValor],
        ],
        seccionAduanera: [this.solicitudState?.seccionAduanera],
        idRecinto: [],
        nombreRecinto: [this.solicitudState?.nombreRecinto],
        tipoDespacho: [this.solicitudState?.tipoDespacho],
        descripcionTipoDespacho: [this.solicitudState?.descripcionTipoDespacho],
        tipoOperacion: [this.solicitudState?.tipoOperacion],
        patente: [{ value: this.solicitudState?.patente, disabled: true }],
        relacionSociedad: [this.solicitudState?.relacionSociedad],
        encargoConferido: [this.solicitudState?.encargoConferido],
        domicilioDespacho: [this.solicitudState?.domicilioDespacho],
        especifique: [this.solicitudState?.especifique],
      }),

      mercancia: this.fb.group({
        paisOrigen: [this.solicitudState?.paisOrigen, Validators.required],
        paisProcedencia: [
          this.solicitudState?.paisProcedencia,
          Validators.required,
        ],
        descripcionGenerica: [
          this.solicitudState?.descripcionGenerica,
          [Validators.required, Validators.maxLength(500)],
        ],
        justificacion: [
          this.solicitudState?.justificacion,
          [Validators.required, Validators.maxLength(1000)],
        ],
      }),

      pedimento: this.fb.array([]),

      personasResponsablesDespacho: this.fb.array([], Validators.required),

      vehiculo: this.fb.group({
        tipoTransporte: [this.solicitudState?.tipoTransporte],
        vehiculoDatos: this.fb.array([]),
      }),

      transporteArriboSalida: this.fb.group({
        tipoTransporte: [this.solicitudState?.tipoTransporteArriboSalida],
        transporteArriboDatos: this.fb.array([]),
      }),

      pagoCaptura: this.fb.group({
        montoAPagar: [
          { value: this.solicitudState?.montoPagar, disabled: true },
        ],
        lineaCaptura: [this.solicitudState?.lineaCaptura],
        monto: [this.solicitudState.monto],
        lineasCaptura: this.fb.array([], Validators.required),
      }),
    });
    this.despacho.get('idSeccionDespacho')?.disable();
    this.despacho.get('nombreRecinto')?.disable();
  }

  /**
   * Este validador verifica que el intervalo entre las fechas y horas de inicio y finalización
   * cumpla con las restricciones específicas según el tipo de solicitud seleccionada.
   * @returns {Function} Una función que toma un `FormGroup` y devuelve un objeto con una clave booleana indicando si el intervalo es inválido, o `null` si el intervalo es válido.
   */
  fechaIntervaloValidator(): void {
    const FECHA_INICIO_STR = this.datosServicio.get('fechaInicio')?.value;
    const FECHA_FINAL_STR = this.datosServicio.get('fechaFinal')?.value;

    const FECHA_INICIO = new Date(`${FECHA_INICIO_STR}T00:00:00`);
    const FECHA_FINAL = new Date(`${FECHA_FINAL_STR}T00:00:00`);
    const HORA_INICIO = this.datosServicio.get('horaInicio')?.value;
    const HORA_FINAL = this.datosServicio.get('horaFinal')?.value;
    const INTERVALO_DIAS = SolicitudComponent.getIntervaloDias(
      this.tipoSolicitudSeleccionada
    );

    const PRIMER_DIA_MES = FECHA_INICIO.getDate() === 1 ? true : false;

    const CAMPOS_NO_NULOS =
      [FECHA_INICIO, FECHA_FINAL, HORA_INICIO, HORA_FINAL].every(Boolean) &&
      INTERVALO_DIAS !== null;

    if (CAMPOS_NO_NULOS) {
      const FECHA_INICIO_HORA = new Date(FECHA_INICIO);
      const FECHA_FINAL_HORA = new Date(FECHA_FINAL);

      FECHA_INICIO_HORA.setHours(
        parseInt(HORA_INICIO.split(':')[0], 10),
        parseInt(HORA_INICIO.split(':')[1], 10)
      );
      FECHA_FINAL_HORA.setHours(
        parseInt(HORA_FINAL.split(':')[0], 10),
        parseInt(HORA_FINAL.split(':')[1], 10)
      );

      const DIFERENCIA_EN_TIEMPO =
        FECHA_FINAL.getTime() - FECHA_INICIO.getTime();

      const DIFERENCIA_EN_HORAS =
        (FECHA_FINAL_HORA.getTime() - FECHA_INICIO_HORA.getTime()) /
        (1000 * 3600);

      if (DIFERENCIA_EN_HORAS <= 0) {
        this.datosServicio.setErrors({ endDateBeforeStartDate: true });
        return;
      }

      if (PRIMER_DIA_MES) {
        const VALIDACION_MES =
          FECHA_INICIO.getMonth() === FECHA_FINAL.getMonth() &&
          FECHA_INICIO.getFullYear() === FECHA_FINAL.getFullYear();
        if (!VALIDACION_MES) {
          this.datosServicio.setErrors({ invalidIntervalo: true });
          return;
        }
      }

      if (
        this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.INDIVIDUAL &&
        DIFERENCIA_EN_HORAS > 24
      ) {
        this.datosServicio.setErrors({ invalidIntervalo: true });
        return;
      }

      const DIFERENCIA_EN_DIAS = DIFERENCIA_EN_TIEMPO / (1000 * 3600 * 24) + 1;

      if (
        (this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.SEMANAL &&
          DIFERENCIA_EN_DIAS > 7) ||
        (this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.MENSUAL &&
          DIFERENCIA_EN_DIAS > 31)
      ) {
        this.datosServicio.setErrors({ invalidIntervalo: true });
      }
    }
  }

  /**
   * Devuelve el número de días correspondiente a un intervalo específico.
   *
   * @param {number} intervalo - El tipo de intervalo, que puede ser uno de los valores definidos en TIPO_SOLICITUD.
   * @returns {number | null} El número de días correspondiente al intervalo proporcionado, o null si el intervalo no es válido.
   */
  static getIntervaloDias(intervalo: number): number | null {
    switch (intervalo) {
      case TIPO_SOLICITUD.INDIVIDUAL:
        return 1;
      case TIPO_SOLICITUD.SEMANAL:
        return 7;
      case TIPO_SOLICITUD.MENSUAL:
        return 30;
      default:
        return null;
    }
  }

  /**
   * Realiza la validación del RFC del importador/exportador y actualiza los campos relacionados.
   *
   * @returns {void} No retorna ningún valor.
   */
  validaRfc(): void {
    const RFC_IMP_EXP = this.datosImportadorExportador.get('RFCImpExp')?.value;
    if (
      RFC_IMP_EXP &&
      !this.datosImportadorExportador.get('RFCImpExp')?.valid
    ) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Avisos',
        mensaje: ERR_RFC_NO_VALIDO,
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.datosImportadorExportador.get('RFCImpExp')?.reset();
      return;
    }

    this.validaRfcService
      .getValidacionRfc(RFC_IMP_EXP)
      .pipe(
        takeUntil(this.destroyNotifier$),
        switchMap((validacionResponse) => {
          if (validacionResponse) {
            this.muestraCertificaciones = !validacionResponse.datos;
            this.tramite5701Store.setRfcGenerico(validacionResponse.datos);

            if (validacionResponse.datos) {
              // Aqui se hará la busqueda del rfc, para obtener el nombre
              SolicitudComponent.llenarCamposDesactivados(
                this.datosImportadorExportador,
                'nombre',
                RFC_GENERICO
              );
              this.tramite5701Store.setNombre(RFC_GENERICO);
              return EMPTY;
            }
            return this.idcService
              .getInformacionContribuyente(RFC_IMP_EXP)
              .pipe(tap());
          }
          return EMPTY;
        }),
        tap((idcResponse) => {
          const NOMBRE = idcResponse.datos?.nombre
            ? idcResponse.datos?.nombre
            : idcResponse.datos?.razon_social;
          if (NOMBRE) {
            this.datosImportadorExportador.get('nombre')?.setValue(NOMBRE);
            this.getCertificaciones(RFC_IMP_EXP);
          } else {
            this.nuevaNotificacion = {
              tipoNotificacion: 'alert',
              categoria: 'danger',
              modo: 'action',
              titulo: 'Avisos',
              mensaje: MSG_ERROR_RFC_NO_ENCONTRADO,
              cerrar: false,
              txtBtnAceptar: 'Aceptar',
              txtBtnCancelar: '',
            };
          }
        })
      )
      .subscribe();

    this.tramite5701Store.setRFCImportadorExportador(RFC_IMP_EXP);
  }

  /**
   * Habilita temporalmente un campo de un formulario, asigna un valor predeterminado
   * y luego lo desactiva nuevamente.
   *
   * @param form - El grupo de formulario (`FormGroup`) que contiene el campo a modificar.
   * @param field - El nombre del campo dentro del formulario que será modificado.
   */
  static llenarCamposDesactivados(
    form: FormGroup,
    field: string,
    value: string
  ): void {
    form.get(field)?.enable();
    form.get(field)?.setValue(value);
    form.get(field)?.disable();
  }

  /**
   * Selecciona el tipo de solicitud y actualiza el estado correspondiente.
   *
   * @returns {void} Esta función no retorna ningún valor.
   */
  tipoSolicitudSeleccion(): void {
    // Se obtiene el valor del tipo de solicitud seleccionado y se agrega la descripción correspondiente al formulario.
    const TIPO_SOLICITUD_VALUE = parseInt(
      this.FormSolicitud.get('tipoSolicitud')?.value,
      10
    );

    const SOLICITUD_DESRIPCION = this.tiposSolicitud.find(
      (tipo) => tipo.id === TIPO_SOLICITUD_VALUE
    )?.descripcion;
    this.FormSolicitud.get('descripcionTipoSolicitud')?.setValue(
      SOLICITUD_DESRIPCION
    );

    this.tipoSolicitudSeleccionada = TIPO_SOLICITUD_VALUE;

    if (this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.INDIVIDUAL) {
      this.pedimento.setValidators([Validators.required]);
      this.pedimento.setValidators([SolicitudComponent.minLengthArray(1)]);
      this.pedimento.updateValueAndValidity();
    } else {
      this.pedimento.clearValidators();
      this.pedimento.updateValueAndValidity();
    }

    this.setValoresStore(
      this.FormSolicitud,
      'tipoSolicitud',
      'setTipoSolicitud'
    );
    this.setValoresStore(
      this.FormSolicitud,
      'descripcionTipoSolicitud',
      'setDescripcionTipoSolicitud'
    );

    const FORMA_MODIFICADA = Object.keys(this.FormSolicitud.controls).some(
      (key) => {
        if (key !== 'tipoSolicitud' && key !== 'descripcionTipoSolicitud') {
          return (
            this.FormSolicitud.controls[key].dirty ||
            this.FormSolicitud.controls[key].touched
          );
        }
        return false;
      }
    );

    if (FORMA_MODIFICADA) {
      this.limpiarFormulario();
    }
  }

  /**
   * Alterna el estado de visibilidad del componente colapsable.
   *
   * @returns {void} No retorna ningún valor.
   */
  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Selecciona una aduana y actualiza los campos correspondientes en el formulario.
   *
   * @param aduana - El objeto de tipo Catalogo que contiene la información de la aduana seleccionada.
   * @returns {void}
   */
  aduanaSeleccion(aduana: Catalogo): void {
    SolicitudComponent.darValorCampoFormulario(
      this.despacho,
      'idAduanaDespacho',
      aduana.id
    );
    SolicitudComponent.darValorCampoFormulario(
      this.despacho,
      'aduanaDespacho',
      aduana.descripcion
    );
    this.validacionPedimento = true;

    const PATENTE = FormulariosService.convertirValorANumero(
      this.despacho,
      'patente'
    );
    const ID_ADUANA = FormulariosService.convertirValorANumero(
      this.despacho,
      'idAduanaDespacho'
    );

    this.datosPedimentoComponente = {
      patente: PATENTE,
      idAduanaDespacho: ID_ADUANA,
    };
  }

  /**
   * Valida el campo de la aduana en el formulario.
   *
   * @returns {void} No retorna ningún valor.
   */
  validaCampoPedimento(): void {
    const ADUANA_VALIDACION = parseInt(
      this.solicitudState?.idAduanaDespacho,
      10
    );

    if (ADUANA_VALIDACION < 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Avisos',
        mensaje: MSG_ADUANA_PEDIMENTO,
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }
    this.validacionPedimento = true;
  }

  /**
   * Establece el valor de un campo en un formulario.
   *
   * @param {FormGroup} form - El formulario en el que se va a establecer el valor del campo.
   * @param {string} field - El nombre del campo en el formulario cuyo valor se va a establecer.
   * @param {string | number} valor - El valor que se va a establecer en el campo.
   * @returns {void} No retorna ningún valor.
   */
  static darValorCampoFormulario(
    form: FormGroup,
    field: string,
    valor: string | number
  ): void {
    form.get(field)?.setValue(valor);
  }

  /**
   * Activa el input de idSocioComercial si se selecciona un socio comercial.
   *
   * @returns {void} No retorna ningún valor.
   */
  checkIdSocioComercial(): void {
    const SOCIO_COMERCIAL =
      this.datosImportadorExportador.get('socioComercial')?.value;

    if (SOCIO_COMERCIAL) {
      this.datosImportadorExportador.get('idSocioComercial')?.enable();
      this.datosImportadorExportador
        .get('idSocioComercial')
        ?.setValidators([
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(ALFANUMERICO_ESPACIO),
        ]);
      this.datosImportadorExportador
        .get('idSocioComercial')
        ?.updateValueAndValidity();
    } else {
      this.datosImportadorExportador.get('idSocioComercial')?.clearValidators();
      this.datosImportadorExportador
        .get('idSocioComercial')
        ?.updateValueAndValidity();
      this.datosImportadorExportador.get('idSocioComercial')?.reset();
      this.datosImportadorExportador.get('idSocioComercial')?.disable();
      this.setValoresStore(
        this.datosImportadorExportador,
        'idSocioComercial',
        'setIdSocioComercial'
      );
    }

    this.setValoresStore(
      this.datosImportadorExportador,
      'socioComercial',
      'setSocioComercial'
    );
  }

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite5701Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite5701Store[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Cambia la fecha final del servicio.
   * Esta función actualiza la validez de los datos del servicio y establece
   * los valores correspondientes en el store.
   * @returns {void} No retorna ningún valor.
   */
  changeFechaFinal(): void {
    this.datosServicio.updateValueAndValidity();
    this.fechaIntervaloValidator();

    const FECHA_FINAL = this.datosServicio.get('fechaFinal');

    if (!FECHA_FINAL?.dirty || !FECHA_FINAL?.touched) {
      this.setValoresStore(this.datosServicio, 'fechaFinal', 'setFechaFinal');
      return;
    }

    if (this.datosServicio.hasError('endDateBeforeStartDate')) {
      this.limpiarFechasHoras();
      return;
    }

    const MSJ_ERROR_FECHA =
      this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.INDIVIDUAL
        ? MSJ_ERROR_FECHA_DIA
        : this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.SEMANAL
        ? MSJ_ERROR_FECHA_SEMANA
        : MSJ_ERROR_FECHA_MES;

    if (this.datosServicio.hasError('invalidIntervalo')) {
      this.limpiarFechasHoras();
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Avisos',
        mensaje: MSJ_ERROR_FECHA,
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }

    this.rangoFechas();
    this.setValoresStore(this.datosServicio, 'fechaFinal', 'setFechaFinal');
  }

  /**
   * Cambia la hora de inicio del servicio.
   * Esta función actualiza la validez de los datos del servicio y establece
   * los valores correspondientes en el store. Valida el intervalo de las fechas.
   * @returns {void} No retorna ningún valor.
   */
  changeHoraFinal(): void {
    this.datosServicio.updateValueAndValidity();
    this.fechaIntervaloValidator();

    this.setValoresStore(this.datosServicio, 'horaFinal', 'setHoraFinal');

    if (this.fechaInicioPasadaFechaFinalError()) {
      this.limpiarFechasHoras();
      return;
    }
    const MSJ_ERROR_FECHA =
      this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.INDIVIDUAL
        ? MSJ_ERROR_FECHA_DIA
        : this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.SEMANAL
        ? MSJ_ERROR_FECHA_SEMANA
        : MSJ_ERROR_FECHA_MES;

    if (
      this.datosServicio.hasError('endDateBeforeStartDate') ||
      this.datosServicio.hasError('invalidIntervalo')
    ) {
      this.limpiarFechasHoras();
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Avisos',
        mensaje: MSJ_ERROR_FECHA,
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }

    this.calcularRangoFechas();
  }

  /**
   * Calcula el rango de días entre las fechas y horas seleccionadas,
   * actualiza el valor de mostrarRangoFechas y colapsable,
   * y establece los valores correspondientes en el store.
   * @returns
   */
  calcularRangoFechas(): void {
    this.rangoFechas();
    if (this.tipoSolicitudSeleccionada !== TIPO_SOLICITUD.INDIVIDUAL) {
      this.mostrarRangoFechas = true;
    } else {
      this.mostrarRangoFechas = false;

      this.fechasSeleccionadas?.clear();
      this.fechasSeleccionadas.push(new FormControl(this.selectRangoDias[0]));
    }
  }

  /**
   * Calcula el rango de días    entre dos fechas y horas,
   * y actualiza el estado del componente.
   */
  rangoFechas(): void {
    const FECHA_INICIAL = this.datosServicio.get('fechaInicio')?.value;
    const FECHA_FINAL = this.datosServicio.get('fechaFinal')?.value;
    const HORA_INICIO = this.datosServicio.get('horaInicio')?.value;
    const HORA_FINAL = this.datosServicio.get('horaFinal')?.value;

    this.selectRangoDias = FechasService.obtenerDiasEntreFechas(
      FECHA_INICIAL,
      FECHA_FINAL,
      HORA_INICIO,
      HORA_FINAL
    );

    this.montoACubrir = this.selectRangoDias.length * this.montoPorDia; // Ejemplo de cálculo, ajustar según lógica real
    this.pagoCaptura.get('montoAPagar')?.enable();
    this.pagoCaptura.get('montoAPagar')?.setValue(this.montoACubrir);
    this.pagoCaptura.get('montoAPagar')?.disable();

    this.colapsable =
      this.tipoSolicitudSeleccionada !== TIPO_SOLICITUD.INDIVIDUAL
        ? true
        : false;

    this.setValoresStore(this.pagoCaptura, 'montoAPagar', 'setMontoPagar');
  }

  /**
   * Método que limpia el formulario de las fechas y horas.
   */
  limpiarFechasHoras(): void {
    this.datosServicio.get('horaInicio')?.setValue('');
    this.datosServicio.get('horaInicio')?.markAsUntouched();
    this.datosServicio.get('fechaInicio')?.setValue('');
    this.datosServicio.get('fechaInicio')?.markAsUntouched();
    this.datosServicio.get('horaFinal')?.setValue('');
    this.datosServicio.get('horaFinal')?.markAsUntouched();
    this.datosServicio.get('fechaFinal')?.setValue('');
    this.datosServicio.get('fechaFinal')?.markAsUntouched();

    this.selectRangoDias = [];

    this.setValoresStore(this.datosServicio, 'fechaInicio', 'setFechaInicio');
    this.setValoresStore(this.datosServicio, 'horaInicio', 'setHoraInicio');
    this.setValoresStore(this.datosServicio, 'fechaFinal', 'setFechaFinal');
    this.setValoresStore(this.datosServicio, 'horaFinal', 'setHoraFinal');
  }

  /**
   * Cambia la fecha de inicio del servicio.
   *
   */
  changeFechaInicio(): void {
    this.datosServicio.updateValueAndValidity();
    this.fechaIntervaloValidator();

    const FECHA_INICIO = this.datosServicio.get('fechaInicio');

    if (!FECHA_INICIO?.dirty || !FECHA_INICIO?.touched) {
      this.setValoresStore(this.datosServicio, 'fechaInicio', 'setFechaInicio');
      return;
    }

    if (this.datosServicio.hasError('endDateBeforeStartDate')) {
      this.limpiarFechasHoras();
      return;
    }

    const MSJ_ERROR_FECHA =
      this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.INDIVIDUAL
        ? MSJ_ERROR_FECHA_DIA
        : this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.SEMANAL
        ? MSJ_ERROR_FECHA_SEMANA
        : MSJ_ERROR_FECHA_MES;

    if (this.datosServicio.hasError('invalidIntervalo')) {
      this.limpiarFechasHoras();
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Avisos',
        mensaje: MSJ_ERROR_FECHA,
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }

    this.rangoFechas();
    this.setValoresStore(this.datosServicio, 'fechaInicio', 'setFechaInicio');
  }
  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Cambia la sección aduanera y actualiza el estado correspondiente.
   * @returns {void} No retorna ningún valor.
   */
  changeSeccionAduanera(): void {
    const SECCION_ADUANERA = this.despacho.get('idSeccionDespacho')?.value;

    if (SECCION_ADUANERA !== SIN_VALOR.toString()) {
      this.desactivarSelectRecinto = true;
      this.despacho.get('nombreRecinto')?.disable();
    } else {
      this.desactivarSelectRecinto = false;
      this.despacho.get('nombreRecinto')?.enable();
      this.despacho.get('nombreRecinto')?.setValue(SIN_VALOR);
    }

    this.setValoresStore(
      this.despacho,
      'idSeccionDespacho',
      'setIdSeccionDespacho'
    );
  }

  /**
   * Cambia el recinto seleccionado y actualiza el estado correspondiente.
   *
   * @returns {void} No retorna ningún valor.
   */
  changeRecinto(): void {
    const RECINTO = this.despacho.get('nombreRecinto')?.value;

    if (RECINTO !== SIN_VALOR.toString()) {
      this.desactivarSelectSeccionAduanera = true;
      this.despacho.get('idSeccionDespacho')?.disable();
    } else {
      this.desactivarSelectSeccionAduanera = false;
      this.despacho.get('idSeccionDespacho')?.enable();
      this.despacho.get('idSeccionDespacho')?.setValue(SIN_VALOR);
    }

    this.setValoresStore(this.despacho, 'nombreRecinto', 'setNombreRecinto');
  }

  /**
   * Busca la patente de un apoderado, actualiza el formulario con el valor obtenido
   * y realiza la obtención de IDs de patentes aduanales.
   *
   * @returns {void} No retorna ningún valor.
   */
  patenteApoderado(): void {
    // Busqueda de la patente a algun endpoint
    const PATENTE = this.FormSolicitud.get('apoderadoPatente')?.value;
    const DATOS_PATENTE: DatosAgregarFormulario = {
      form: this.despacho,
      field: 'patente',
      valor: PATENTE,
    };
    FormulariosService.agregarValorCamposDesactivados(DATOS_PATENTE);
    this.obtenerIdPatentesAduanales();
  }

  /**
   * Obtiene un listado de empresas asociadas a una patente.
   *
   * @returns {Observable<string[]>} Observable que emite un arreglo de cadenas con los datos de las empresas.
   */
  obtenerEmpresasPatente(): Observable<string[]> {
    return this.serviciosExtraordinariosService
      .getCatalogoById(PATENTES_ID)
      .pipe(
        map((resp) => {
          return JSON.parse(resp.data);
        })
      );
  }

  /**
   * Obtiene el catálogo de patentes aduanales mediante un servicio.
   * @returns {void} No retorna ningún valor.
   */
  obtenerIdPatentesAduanales(): void {
    this.serviciosExtraordinariosService.getCatalogoById(PATENTES_ID).pipe(
      map((resp) => {
        return JSON.parse(resp.data);
      })
    );
  }

  /**
   * Actualiza los valores del campo Programa Fomento y almacena los cambios en el store.
   * @param valores - Objeto que contiene el estado del checkbox y el texto asociado.
   * @returns {void}
   */
  checkPrograma(valores: DatosCheckInputText): void {
    this.datosImportadorExportador.get('programa')?.setValue(valores.checkbox);
    this.datosImportadorExportador
      .get('desProgramaFomento')
      ?.setValue(valores.texto);
    this.setValoresStore(
      this.datosImportadorExportador,
      'programa',
      'setPrograma'
    );
    this.setValoresStore(
      this.datosImportadorExportador,
      'desProgramaFomento',
      'setDescripcionProgramaFomento'
    );
  }

  /**
   * Actualiza los valores del campo IMMEX y almacena los cambios en el store.
   * @param valores - Objeto que contiene el estado del checkbox y el texto asociado.
   * @returns {void}
   */
  checkImmex(valores: DatosCheckInputText): void {
    this.datosImportadorExportador
      .get('checkIMMEX')
      ?.setValue(valores.checkbox);
    this.datosImportadorExportador.get('desImmex')?.setValue(valores.texto);
    this.setValoresStore(
      this.datosImportadorExportador,
      'checkIMMEX',
      'setCheckIMMEX'
    );
    this.setValoresStore(
      this.datosImportadorExportador,
      'desImmex',
      'setDescripcionImmex'
    );
  }

  /**
   * Actualiza los valores del campo automutriz y almacena los cambios en el store.
   * @param valores - Objeto que contiene el estado del checkbox y el texto asociado.
   * @returns {void}
   */
  checkAutomotriz(valores: DatosCheckInputText): void {
    this.datosImportadorExportador
      .get('industriaAutomotriz')
      ?.setValue(valores.checkbox);
    this.datosImportadorExportador
      .get('desIndustrialAutomotriz')
      ?.setValue(valores.texto);
    this.setValoresStore(
      this.datosImportadorExportador,
      'industriaAutomotriz',
      'setIndustriaAutomotriz'
    );
    this.setValoresStore(
      this.datosImportadorExportador,
      'desIndustrialAutomotriz',
      'setDescripcionIndustriaAutomotriz'
    );
  }

  /**
   * Verifica y actualiza el estado de los campos de un formulario según el valor de un campo específico.
   * @param campoId - Identificador del campo a verificar.
   * @param campoDescripcion - Identificador del campo de descripción asociado.
   * @param form - Formulario reactivo que contiene los campos.
   * @returns {void}
   */
  verificaDatosCheckInput(
    campoId: string,
    campoDescripcion: string,
    form: FormGroup
  ): void {
    const VALOR = form.get(campoId)?.value;
    const LDA_DD = campoId.includes('lda') || campoId.includes('dd');

    if (VALOR) {
      form.get(campoDescripcion)?.enable();
      form
        .get(campoDescripcion)
        ?.setValue(
          this.solicitudState?.[campoDescripcion as keyof Solicitud5701State]
        );

      if (LDA_DD) {
        this.despachoSeleccionado = true;
        this.idNameAutorizacion = campoId === 'dd' ? ID_NAME_DD : ID_NAME_LDA;
        this.labelTipoDespacho =
          campoId === 'dd' ? LABEL_DESPACHO_DD : LABEL_DESPACHO_LDA;

        if (campoId === 'dd') {
          this.despacho.get('lda')?.disable();
        } else if (campoId === 'lda') {
          this.despacho.get('dd')?.disable();
        }
      }
    }
  }

  /**
   * Cambia los datos de transporte o vehículo según el tipo especificado.
   *
   * @param vehiculos - Lista de vehículos o datos de transporte.
   * @param tipo - Tipo de datos a actualizar ('vehiculo' o 'transporte').
   * @returns void
   */
  changeAgregarVehiculo(vehiculos: TransporteDespacho[], tipo: string): void {
    if (tipo === 'vehiculo') {
      this.tramite5701Store.setTransporte(vehiculos);
    } else if (tipo === 'transporte') {
      this.tramite5701Store.setTransporteArriboDatos(vehiculos);
    }
  }

  /**
   * Actualiza la lista de fechas seleccionadas y las almacena en el estado.
   *
   * @param fechas - Arreglo de fechas a agregar.
   * @returns void
   */
  changeCrosslist(fechas: string[]): void {
    this.fechasSeleccionadas.clear();
    fechas.forEach((fecha) => {
      this.fechasSeleccionadas.push(new FormControl(fecha));
    });

    this.tramite5701Store.setFechasSeleccionadas(fechas);
  }

  /**
   * Verifica y procesa los datos existentes en el estado de la solicitud.
   *
   * @remarks
   * Realiza validaciones y configuraciones basadas en los datos del estado,
   * como programas de fomento, IMMEX, industria automotriz, y rangos de fechas.
   *
   * @returns {void} No retorna ningún valor.
   */
  verificarDatosExistentesStore(): void {
    // Verifica si existe tipo de solicitud
    if (this.solicitudState.tipoSolicitud !== SIN_VALOR) {
      this.tipoSolicitudSeleccionada = parseInt(
        this.FormSolicitud.get('tipoSolicitud')?.value,
        10
      );
    }
    //Verifica si programa fomento esta habilitado y si tiene valor.
    if (this.solicitudState.programa) {
      const DATOS_PROGRAMA: DatosCheckInputText = {
        checkbox: this.solicitudState.programa,
        texto: this.solicitudState.descripcionProgramaFomento,
      };
      this.checkPrograma(DATOS_PROGRAMA);
    }

    // Verifica si el check de IMMEX esta habilitado y si tiene valor.
    if (this.solicitudState.checkIMMEX) {
      const DATOS_IMMEX: DatosCheckInputText = {
        checkbox: this.solicitudState.checkIMMEX,
        texto: this.solicitudState.descripcionImmex,
      };
      this.checkImmex(DATOS_IMMEX);
    }

    // Verifica si el check de industria automotriz esta habilitado y si tiene valor.
    if (this.solicitudState.industriaAutomotriz) {
      const DATOS_AUTOMOTRIZ: DatosCheckInputText = {
        checkbox: this.solicitudState.industriaAutomotriz,
        texto: this.solicitudState.descripcionIndustrialAutomotriz,
      };
      this.checkAutomotriz(DATOS_AUTOMOTRIZ);
    }

    // Verifica que si los campos con check e input estan seleccionados y tienen valor.
    this.verificaDatosCheckInput(
      'socioComercial',
      'idSocioComercial',
      this.datosImportadorExportador
    );
    this.verificaDatosCheckInput('lda', 'despacho', this.despacho);
    this.verificaDatosCheckInput('dd', 'despacho', this.despacho);

    if (
      this.solicitudState.horaFinal &&
      this.solicitudState.horaInicio &&
      this.solicitudState.fechaInicio &&
      this.solicitudState.fechaFinal
    ) {
      this.selectRangoDias = FechasService.obtenerDiasEntreFechas(
        this.solicitudState.fechaInicio,
        this.solicitudState.fechaFinal,
        this.solicitudState.horaInicio,
        this.solicitudState.horaFinal
      );
      this.mostrarRangoFechas = true;
    }

    //Verifica si la tabla de lineas de captura tiene datos y los agrega al formulario.
    if (this.solicitudState.lineasCaptura.length > 0) {
      this.datosTablaPagos = [...this.solicitudState.lineasCaptura];

      this.lineasCaptura?.clear();
      this.datosTablaPagos.forEach((linea) => {
        this.lineasCaptura.push(
          this.fb.group({
            lineaCaptura: [linea.lineaCaptura, Validators.required],
            monto: [linea.monto, Validators.required],
          })
        );
      });
      this.pagoCaptura.get('lineaCaptura')?.reset();
      this.pagoCaptura.get('monto')?.reset();
    }

    this.colapsable =
      this.solicitudState.fechasSeleccionadas.length > 0 ||
      this.selectRangoDias.length > 0
        ? true
        : false;
  }

  /**
   * Obtiene la selección realizada por el usuario dentro del campo aduana,
   * filtra las listas secciones y recintos con base a la selección
   * y actualiza el estado del componente.
   */
  public changeAduana(): void {
    const ADUANA = this.despacho.get('idAduanaDespacho')?.value;

    if (ADUANA) {
      this.despacho.get('idSeccionDespacho')?.setValue(SIN_VALOR);
      this.seccionAduanaService
        .getListaSeccionesAduanas(ADUANA)
        .pipe(
          switchMap((response) => {
            this.desactivarSelectSeccionAduanera =
              response && response.datos?.length > 0;

            if (this.desactivarSelectSeccionAduanera) {
              this.seccionAduanera = response?.datos;
              this.despacho.get('idSeccionDespacho')?.enable();
            } else {
              this.seccionAduanera = [
                {
                  clave: '-2',
                  descripcion: 'No cuenta con sección aduanera',
                },
              ];
              this.despacho.get('idSeccionDespacho')?.setValue(SIN_ITEMS);
              this.despacho.get('idSeccionDespacho')?.disable();
            }

            return this.recintoService.getListaRecintos(ADUANA);
          }),
          tap((responseRecinto) => {
            this.desactivarSelectRecinto =
              responseRecinto && responseRecinto.datos?.length > 0;

            if (this.desactivarSelectRecinto) {
              this.recintoCatalogo = responseRecinto?.datos;
              this.despacho.get('nombreRecinto')?.enable();
            } else {
              this.recintoCatalogo = [
                {
                  id_recinto_fiscalizado: '-2',
                  nombre: 'No cuenta con recinto',
                  descripcion: 'No cuenta con recinto',
                },
              ];

              this.despacho.get('nombreRecinto')?.setValue(SIN_ITEMS);
              this.despacho.get('nombreRecinto')?.disable();
            }
          }),
          takeUntil(this.destroyNotifier$)
        )
        .subscribe();

      this.setValoresStore(
        this.despacho,
        'idAduanaDespacho',
        'setIdAduanaDespacho'
      );
    }
  }

  /**
   * Obtiene las certificaciones del RFC proporcionado y actualiza el store correspondiente.
   *
   * @param rfc - RFC del importador/exportador.
   * @returns {void} No retorna ningún valor.
   */
  private getCertificaciones(rfc: string): void {
    this.certificacionService
      .getCertificacion(rfc, PROGRAMA_IMMEX)
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((response) => {
          if (response) {
            this.tramite5701Store.setBlnImmex(response.datos.immex);
            this.tramite5701Store.setDescripcionImmex(response.datos.des_immex);
          }
        })
      )
      .subscribe();

    this.certificacionService
      .getCertificacion(rfc, PROGRAMA_FOMENTO)
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((response) => {
          if (response.datos) {
            this.tramite5701Store.setBlnProgramaFomento(
              response.datos.programa_fomento
            );
            this.tramite5701Store.setDescripcionImmex(
              response.datos.des_programa_fomento
            );
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      )
      .subscribe();

    this.certificacionIndustriaAutomotrizService
      .getCertificacionAutomotriz(rfc)
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((response) => {
          if (response.datos) {
            this.tramite5701Store.setBlnIndustriaAutomotriz(
              response.datos.industrial_automotriz
            );
            this.tramite5701Store.setDescripcionIndustriaAutomotriz(
              response.datos.des_industrial_automotriz
            );
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      )
      .subscribe();

    this.certificacionOrigenService
      .getCertificacionOrigen(rfc)
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((response) => {
          this.tramite5701Store.setBlnRevisionOrigen(response.datos);
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      )
      .subscribe();

    const VALIDACION_OEA_IMPEXP$ =
      this.certificacionOeaService.getValidacionCertificacion(
        MODALIDAD_OEA_IMPEXP,
        rfc
      );
    const VALIDACION_OEA_CTRL$ =
      this.certificacionOeaService.getValidacionCertificacion(
        MODALIDAD_OEA_IMPEXP,
        rfc
      );
    const VALIDACION_OEA_AEREO$ =
      this.certificacionOeaService.getValidacionCertificacion(
        MODALIDAD_OEA_IMPEXP,
        rfc
      );
    const VALIDACION_OEA_SECIIT$ =
      this.certificacionOeaService.getValidacionCertificacion(
        MODALIDAD_OEA_IMPEXP,
        rfc
      );
    const VALIDACION_OEA_TEXTIL$ =
      this.certificacionOeaService.getValidacionCertificacion(
        MODALIDAD_OEA_IMPEXP,
        rfc
      );
    const VALIDACION_OEA_RFESTRATEGICO$ =
      this.certificacionOeaService.getValidacionCertificacion(
        MODALIDAD_OEA_IMPEXP,
        rfc
      );

    merge(
      VALIDACION_OEA_IMPEXP$,
      VALIDACION_OEA_CTRL$,
      VALIDACION_OEA_AEREO$,
      VALIDACION_OEA_SECIIT$,
      VALIDACION_OEA_TEXTIL$,
      VALIDACION_OEA_RFESTRATEGICO$
    )
      .pipe(
        takeUntil(this.destroyNotifier$),
        first(),
        tap((response) => {
          this.tramite5701Store.setBlnOEA(response.datos);
          return response.datos;
        })
      )
      .subscribe();
  }

  /**
   * Consulta si la línea de captura es válida, ha sido usada y ya fue pagada y actualiza el store correspondiente.
   * @returns {void} No retorna ningún valor.
   */
  public agregarPagoSea(): void {
    const LINEA_PAGO: string = this.pagoCaptura.get('lineaCaptura')?.value;
    const MONTO: number = this.pagoCaptura.get('monto')?.value;

    if (!LINEA_PAGO || !MONTO) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: TITULO_MODAL_AVISO,
        mensaje: MSJ_ERROR_LINEA_CAPTURA,
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }

    this.validaLineaCapturaService
      .getValidaLineaCapturaUsada(LINEA_PAGO)
      .pipe(
        takeUntil(this.destroyNotifier$),
        switchMap((responseValidaLineaCaptura) => {
          if (responseValidaLineaCaptura.datos) {
            this.nuevaNotificacion = {
              tipoNotificacion: 'alert',
              categoria: 'danger',
              modo: 'action',
              titulo: TITULO_MODAL_AVISO,
              mensaje: MSJ_LINEA_CAPTURA_USADA,
              cerrar: false,
              txtBtnAceptar: 'Aceptar',
              txtBtnCancelar: '',
            };
            this.pagoCaptura.get('lineaCaptura')?.reset();
            this.pagoCaptura.get('monto')?.reset();
            return EMPTY;
          }
          return this.validaLineaCapturaService.getValidaLineaCaptura(
            LINEA_PAGO
          );
        }),
        tap((responseLineaCapturaPagada) => {
          if (
            responseLineaCapturaPagada.datos.pago_model.estatus !==
            ESTATUS_PAGADO
          ) {
            this.nuevaNotificacion = {
              tipoNotificacion: 'alert',
              categoria: 'danger',
              modo: 'action',
              titulo: TITULO_MODAL_AVISO,
              mensaje: MSJ_LINEA_CAPTURA_NO_PAGADA,
              cerrar: false,
              txtBtnAceptar: 'Aceptar',
              txtBtnCancelar: '',
            };
            return;
          }

          const DIAS_SERVICIO =
            this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.INDIVIDUAL
              ? UN_DIA
              : this.fechasSeleccionadas.length;

          const MONTO_A_CUBRIR = DIAS_SERVICIO * this.montoPorDia;

          const PAGO = {
            lineaCaptura: LINEA_PAGO,
            monto: responseLineaCapturaPagada.datos.pago_model.importe,
          };

          if (this.montoPagadoLineas < MONTO_A_CUBRIR) {
            this.montoPagadoLineas +=
              responseLineaCapturaPagada.datos.pago_model.importe;
            this.datosTablaPagos.push(PAGO);
          } else {
            this.nuevaNotificacion = {
              tipoNotificacion: 'alert',
              categoria: 'danger',
              modo: 'action',
              titulo: TITULO_MODAL_AVISO,
              mensaje: MSG_MONTO_PAGADO_CUBIERTO,
              cerrar: false,
              txtBtnAceptar: 'Aceptar',
              txtBtnCancelar: '',
            };
            this.pagoCaptura.get('lineaCaptura')?.reset();
            this.pagoCaptura.get('monto')?.reset();
            return;
          }

          // Actualizar el estado una vez, en lugar de en cada iteración
          this.tramite5701Store.setLineasCaptura(this.datosTablaPagos);

          //Limpia los campos de la línea de captura y monto
          this.pagoCaptura.get('lineaCaptura')?.reset();
          this.pagoCaptura.get('monto')?.reset();

          this.lineasCaptura?.clear();
          this.lineasCaptura.push(
            this.fb.group({
              lineaCaptura: [LINEA_PAGO, Validators.required],
              monto: [
                responseLineaCapturaPagada.datos.pago_model.importe,
                Validators.required,
              ],
            })
          );
        })
      )
      .subscribe();
  }

  /**
   * Obtiene el monto a pagar desde el servicio de parámetros y lo establece en el formulario.
   * @returns {void} No retorna ningún valor.
   */
  public calcularMontoTotal(): void {
    this.parametroMontoService
      .getParametroMonto()
      .pipe(
        takeUntil(this.destroyNotifier$),
        tap((montoResponse) => {
          this.montoPorDia = montoResponse.datos;
          this.pagoCaptura.get('montoAPagar')?.enable();
          this.pagoCaptura.get('montoAPagar')?.setValue(montoResponse.datos);
          this.pagoCaptura.get('montoAPagar')?.disable();
        })
      )
      .subscribe();
  }

  // #Seccion Modal
  /**
   * Método que maneja el evento de aceptar o no una accion del componente Notificación cuando este es un modal.
   */
  confirmacionModal(confirmar: boolean): void {
    switch (this.procesoModal) {
      case 'lda_dd':
        {
          const CHECK_LDA = this.solicitudState.lda;
          const CHECK_DD = this.solicitudState.dd;

          if (CHECK_DD || CHECK_LDA) {
            if (confirmar) {
              this.despacho.get(this.tipoDespacho)?.setValue(false);
              this.limpiaCamposDdaLda();
              this.activaDesactivaCheckLDA_DDEX(this.tipoDespacho);
              this.despachoSeleccionado = false;
              this.tipoDespacho = '';
            } else {
              this.despacho.get(this.tipoDespacho)?.setValue(true);
              this.despachoSeleccionado = true;
            }
          } else {
            if (confirmar) {
              this.limpiaCamposDdaLda();
              this.activaDesactivaCheckLDA_DDEX(this.tipoDespacho);
              this.despacho.get(this.tipoDespacho)?.setValue(true);
              this.despachoSeleccionado = true;
              this.tipoDespacho = '';
            } else {
              this.despacho.get(this.tipoDespacho)?.setValue(false);
              this.despachoSeleccionado = false;
            }
          }

          this.despacho.get('rfcDespachoLDA')?.clearValidators();
          this.despacho.get('rfcDespachoLDA')?.updateValueAndValidity();
          this.despacho.get('folioDDEX')?.clearValidators();
          this.despacho.get('folioDDEX')?.updateValueAndValidity();
        }
        break;

      case 'linea_captura':
        if (confirmar) {
          this.datosTablaPagos = this.datosTablaPagos.filter(
            (item) =>
              !this.lineaCapturaSeleccionados.some(
                (seleccionado) =>
                  seleccionado.lineaCaptura === item.lineaCaptura
              )
          );
          this.lineaCapturaSeleccionados = [];
          this.tramite5701Store.setLineasCaptura(this.datosTablaPagos);
          this.nuevaNotificacion = {
            tipoNotificacion: 'alert',
            categoria: '',
            modo: 'action',
            titulo: TITULO_MODAL_AVISO,
            mensaje: MSG_ELIMINA_ELEMENTO,
            cerrar: false,
            txtBtnAceptar: 'Cerrar',
            txtBtnCancelar: '',
          };
          this.procesoModal = '';
        }

        this.limpiarNotificacion();

        break;

      default:
        break;
    }
  }

  // #Seccion LDA y DD

  /**
   * Muestra un cuadro de diálogo de confirmación para la selección de tipo de despacho (LDA o DD).
   * @param tipo - Tipo de despacho seleccionado ('lda' o 'dd').
   * @returns {void} No retorna ningún valor.
   */
  showConfirmDialogLDA_DD(tipo: string): void {
    const CHECKED = this.despacho.get(tipo)?.value;
    if (CHECKED) {
      // Valida si hay fechas seleccionadas
      console.log(this.fechasSeleccionadas.length);

      const VALIDACION_FECHAS = this.fechasSeleccionadas.length > 0 || false;

      console.log('Validación de fechas seleccionadas:', VALIDACION_FECHAS);

      console.log('El campo ya está seleccionado');
    } else {
      console.log(
        'El campo no está seleccionado, se procede a mostrar el modal de confirmación'
      );
    }

    // this.tipoDespacho = tipo;
    // const ADUANA = this.despacho.get('idAduanaDespacho')?.value;
    // const DESPACHO = this.despacho.get('idSeccionDespacho')?.value;
    // const RECINTO = this.despacho.get('nombreRecinto')?.value;

    // const FORMA_MODIFICADA = Object.keys(this.despacho.controls).some((key) => {
    //   if (key !== 'lda' && key !== 'dd') {
    //     return (
    //       this.despacho.controls[key].dirty ||
    //       this.despacho.controls[key].touched
    //     );
    //   }
    //   return false;
    // });

    // if ((ADUANA || DESPACHO || RECINTO) > 0 && FORMA_MODIFICADA) {
    //   this.nuevaNotificacion = {
    //     tipoNotificacion: 'alert',
    //     categoria: '',
    //     modo: 'action',
    //     titulo: TITULO_MODAL_ERROR,
    //     mensaje: ADV_LIMPIA_CAMPOS,
    //     cerrar: false,
    //     txtBtnAceptar: 'Sí',
    //     txtBtnCancelar: 'No',
    //   };
    //   this.procesoModal = 'lda_dd';
    // } else if (!this.despacho.get(tipo)?.value) {
    //   this.despacho.get('rfcDespachoLDA')?.clearValidators();
    //   this.despacho.get('rfcDespachoLDA')?.updateValueAndValidity();
    //   this.despacho.get('folioDDEX')?.clearValidators();
    //   this.despacho.get('folioDDEX')?.updateValueAndValidity();
    // } else {
    //   this.activaDesactivaCheckLDA_DDEX(tipo);
    // }
  }

  /**
   * Procesa la lógica para activar o desactivar los campos de LDA y DD en el formulario.
   * @param {tipo} string
   * @returns {void} No retorna ningún valor.
   */
  activaDesactivaCheckLDA_DDEX(tipo: string): void {
    this.despachoSeleccionado = !this.despachoSeleccionado;

    if (!this.despachoSeleccionado) {
      this.despacho.get('lda')?.enable();
      this.despacho.get('dd')?.enable();

      this.despacho.get('lda')?.clearValidators();
      this.despacho.get('dd')?.clearValidators();

      this.despacho.get('lda')?.updateValueAndValidity();
      this.despacho.get('dd')?.updateValueAndValidity();

      this.despacho.get('lda')?.reset();
      this.despacho.get('dd')?.reset();
    }
    if (tipo === 'lda' && this.despachoSeleccionado) {
      this.despacho.get('dd')?.reset();
      this.despacho.get('dd')?.disable();
      this.despacho.get('lda')?.setValue(true);
      this.selectCatalogoDespacho = this.despachoLdaCatalogo;

      this.despacho.get('rfcDespachoLDA')?.setValidators([Validators.required]);
      this.despacho.get('rfcDespachoLDA')?.updateValueAndValidity();
    } else if (tipo === 'dd' && this.despachoSeleccionado) {
      this.despacho.get('lda')?.reset();
      this.despacho.get('lda')?.disable();
      this.despacho.get('dd')?.setValue(true);

      this.despacho.get('folioDDEX')?.setValidators([Validators.required]);
      this.despacho.get('folioDDEX')?.updateValueAndValidity();

      this.selectCatalogoDespacho = this.despachoDDCatalogo;
      this.activarCatalogoDespacho = true;
    }

    this.setValoresStore(this.despacho, 'lda', 'setLDA');
    this.setValoresStore(this.despacho, 'dd', 'setDD');
  }

  /**
   * Limpia los campos del formulario de despacho y actualiza el store correspondiente.
   * @returns {void} No retorna ningún valor.
   */
  limpiaCamposDdaLda(): void {
    this.despacho.get('idAduanaDespacho')?.setValue(SIN_VALOR);
    this.despacho.get('aduanaDespacho')?.setValue('');
    this.despacho.get('idSeccionDespacho')?.setValue(SIN_VALOR);
    this.despacho.get('seccionAduanera')?.setValue('');
    this.despacho.get('nombreRecinto')?.setValue(SIN_VALOR);
    this.despacho.get('tipoOperacion')?.setValue('');
    this.despacho.get('relacionSociedad')?.setValue(false);
    this.despacho.get('encargoConferido')?.setValue(false);
    this.despacho.get('domicilioDespacho')?.setValue('');
    this.despacho.get('tipoDespacho')?.setValue(SIN_VALOR);
    this.despacho.get('tipoDespachoDescripcion')?.setValue('');

    this.setValoresStore(
      this.despacho,
      'idAduanaDespacho',
      'setIdAduanaDespacho'
    );
    this.setValoresStore(this.despacho, 'aduanaDespacho', 'setAduanaDespacho');
    this.setValoresStore(
      this.despacho,
      'idSeccionDespacho',
      'setIdSeccionDespacho'
    );
    this.setValoresStore(
      this.despacho,
      'seccionAduanera',
      'setSeccionAduanera'
    );
    this.setValoresStore(this.despacho, 'nombreRecinto', 'setNombreRecinto');
    this.setValoresStore(this.despacho, 'tipoOperacion', 'setTipoOperacion');
    this.setValoresStore(
      this.despacho,
      this.idNameAutorizacion,
      'setAutorizacionDDEX'
    );
    this.setValoresStore(
      this.despacho,
      'relacionSociedad',
      'setRelacionSociedad'
    );
    this.setValoresStore(
      this.despacho,
      'encargoConferido',
      'setEncargoConferido'
    );
    this.setValoresStore(
      this.despacho,
      'domicilioDespacho',
      'setDomicilioDespacho'
    );
    this.setValoresStore(this.despacho, 'tipoDespacho', 'setTipoDespacho');
    this.setValoresStore(
      this.despacho,
      'tipoDespachoDescripcion',
      'setDescripcionTipoDespacho'
    );
  }

  /**
   * Valida si el campo recinto y el campo especifique tienen algun valor.
   * @returns {boolean} Retorna true si el campo recinto es válido, de lo contrario false.
   */
  validaCampoRecintoEspecifique(): boolean {
    const RECINTO = this.despacho.get('nombreRecinto')?.value
      ? parseInt(this.despacho.get('nombreRecinto')?.value, 10)
      : SIN_VALOR;
    const ESPECIFIQUE = this.despacho.get('recintoEspecifique')?.value;
    if (RECINTO !== SIN_VALOR || ESPECIFIQUE !== '') {
      return true;
    }
    return false;
  }

  /**
   * Guarda los datos del pedimento en el store.
   * @param {datosPedimento[]} Lista con los datos del pedimento.
   * @returns {void} No retorna ningún v(alor.
   */
  changeAgregarPedimento(datosPedimento: Pedimento[]): void {
    this.pedimento.clear();
    if (datosPedimento.length > 0) {
      datosPedimento.forEach((pedimento) => {
        this.pedimento.push(
          this.fb.group({
            idPedimento: [pedimento.idPedimento],
            patente: [pedimento.patente],
            pedimento: [pedimento.pedimento],
            aduana: [pedimento.aduana],
            tipoPedimento: [pedimento.tipoPedimento],
            estadoPedimento: [pedimento.estadoPedimento],
            subEstadoPedimento: [pedimento.subEstadoPedimento],
            descTipoPedimento: [pedimento.descTipoPedimento],
            numero: [pedimento.numero],
            comprobanteValor: [pedimento.comprobanteValor],
            pedimentoValidado: [pedimento.pedimentoValidado],
          })
        );
      });
    }
    this.tramite5701Store.setPedimentos(datosPedimento);
  }

  /**
   * Cambia el tipo de despacho y actualiza el store correspondiente.
   * @returns {void} No retorna ningún valor.
   */
  changeTipoDespacho(): void {
    const TIPO_DESPACHO = parseInt(
      this.despacho.get('tipoDespacho')?.value,
      10
    );

    const TIPO_DESPACHO_DESCRIPCION = this.selectCatalogoDespacho.find(
      (tipo) => tipo.id === TIPO_DESPACHO
    )?.descripcion;
    this.despacho
      .get('tipoDespachoDescripcion')
      ?.setValue(TIPO_DESPACHO_DESCRIPCION);

    this.setValoresStore(this.despacho, 'tipoDespacho', 'setTipoDespacho');
    this.setValoresStore(
      this.despacho,
      'tipoDespachoDescripcion',
      'setDescripcionTipoDespacho'
    );
  }

  /**
   * Cambia el tipo de transporte y actualiza el store correspondiente.
   * @param tipoTransporte {string} - El tipo de transporte seleccionado.
   * @returns {void} No retorna ningún valor.
   */
  changeSeleccionTipoTransporte(tipoTransporte: string): void {
    this.vehiculo.get('tipoTransporte')?.setValue(tipoTransporte);
    this.setValoresStore(this.vehiculo, 'tipoTransporte', 'setTipoTransporte');
  }

  /**
   * Cambia el tipo de transporte y actualiza el store correspondiente.
   * @param tipoTransporte {string} - El tipo de transporte seleccionado.
   * @returns {void} No retorna ningún valor.
   */
  changeSeleccionTipoVehiculo(tipoTransporte: string): void {
    this.transporteArriboSalida.get('tipoTransporte')?.setValue(tipoTransporte);
    this.setValoresStore(
      this.transporteArriboSalida,
      'tipoTransporteArriboSalida',
      'setTipoTransporteArriboSalida'
    );
  }

  /**
   * Cambia los responsables de despacho y actualiza el store correspondiente.
   * @param personas - Lista de responsables de despacho.
   * @returns {void} No retorna ningún valor.
   */
  changeResponsablesDespacho(personas: ResponsablesDespacho[]): void {
    this.tramite5701Store.setPersonasResponsablesDespacho(personas);

    this.personasResponsablesDespacho.clear();
    if (personas.length > 0) {
      personas.forEach((persona) => {
        this.personasResponsablesDespacho.push(
          this.fb.group({
            gafeteRespoDespacho: [persona.gafeteRespoDespacho],
            nombre: [persona.nombre],
            primerApellido: [persona.primerApellido],
            segundoApellido: [persona.segundoApellido],
          })
        );
      });
    }
  }

  /**
   * Limpia el formulario FormSolicitud, excepto el campo de tipoSolicitud y actualiza el store correspondiente.
   * @returns {void} No retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.FormSolicitud.reset({
      folioSolicitud: null,
      tipoSolicitud: this.FormSolicitud.get('tipoSolicitud')?.value,
      descripcionTipoSolicitud: this.FormSolicitud.get(
        'descripcionTipoSolicitud'
      )?.value,
      datosImportadorExportador: {
        apoderadoPatente: null,
        empresaApoderado: null,
        empresasApoderado: null,
        RFCImpExp: '',
        nombre: '',
        desNumeroRegistro: '',
        programa: false,
        desProgramaFomento: '',
        checkIMMEX: false,
        desImmex: '',
        industriaAutomotriz: false,
        desIndustrialAutomotriz: '',
        tipoEmpresaCertificada: '',
        socioComercial: false,
        certificacionOEA: false,
        revision: false,
        idSocioComercial: '',
      },
      datosServicio: {
        fechaInicio: '',
        fechaFinal: '',
        horaInicio: '',
        horaFinal: '',
        fechasSeleccionadas: [],
      },
      despacho: {
        lda: false,
        rfcDespachoLDA: '',
        dd: false,
        folioDDEX: '',
        idAduanaDespacho: '-1',
        aduanaDespacho: '',
        idSeccionDespacho: '-1',
        seccionAduanera: '',
        idRecinto: null,
        nombreRecinto: '-1',
        tipoDespacho: -1,
        descripcionTipoDespacho: '',
        tipoOperacion: '-1',
        patente: this.despacho.get('patente')?.value,
        relacionSociedad: false,
        encargoConferido: false,
        domicilioDespacho: '',
        especifique: '',
      },
      mercancia: {
        paisOrigen: 0,
        paisProcedencia: 0,
        descripcionGenerica: '',
        justificacion: '',
      },
      pedimento: [],
      personasResponsablesDespacho: [],
      vehiculo: {
        tipoTransporte: '',
        vehiculoDatos: [],
      },
      transporteArriboSalida: {
        tipoTransporte: '',
        transporteArriboDatos: [],
      },
      pagoCaptura: {
        montoAPagar: this.pagoCaptura.get('montoAPagar')?.value,
        lineaCaptura: '',
        monto: '',
      },
    });

    this.selectRangoDias = [];
    this.pedimento.clear();
    this.personasResponsablesDespacho.clear();

    this.tramite5701Store.limpiarSolicitud();

    this.setValoresStore(
      this.FormSolicitud,
      'tipoSolicitud',
      'setTipoSolicitud'
    );

    this.setValoresStore(
      this.FormSolicitud,
      'descripcionTipoSolicitud',
      'setDescripcionTipoSolicitud'
    );
  }

  /**
   * Elimina un elemento de la tabla de lineas de captura
   * @returns {void} No retorna ningún valor.
   */
  eliminarLineaCaptura(): void {
    if (this.lineaCapturaSeleccionados.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: '',
        modo: 'action',
        titulo: TITULO_MODAL_AVISO,
        mensaje: MSG_ERROR_NO_INFORMACION,
        cerrar: false,
        txtBtnAceptar: 'Cerrar',
        txtBtnCancelar: '',
      };
      return;
    }

    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'action',
      titulo: TITULO_MODAL_AVISO,
      mensaje: MSG_ALERTA_ELIMINAR_ELEMENTO,
      cerrar: false,
      txtBtnAceptar: TEXTO_ACEPTAR,
      txtBtnCancelar: TEXTO_CANCELAR,
    };

    this.procesoModal = 'linea_captura';
  }

  /**
   * Lipia el objeto de notificación y el proceso modal.
   * @returns {void} No retorna ningún valor.
   */
  limpiarNotificacion(): void {
    this.nuevaNotificacion = null;
    this.procesoModal = '';
  }

  /**
   * @description Valida el ID del socio comercial
   * @returns {void} No retorna ningún valor.
   */
  validarIDSocioComercial(): void {
    const ID_SOCIO_COMERCIAL: string =
      this.datosImportadorExportador.get('idSocioComercial')?.value;

    if (ID_SOCIO_COMERCIAL && ID_SOCIO_COMERCIAL) {
      this.socioComercial
        .getSocioComercial(ID_SOCIO_COMERCIAL)
        .pipe(
          takeUntil(this.destroyNotifier$),
          tap((response) => {
            if (!response.datos) {
              this.nuevaNotificacion = {
                tipoNotificacion: 'alert',
                categoria: 'danger',
                modo: 'action',
                titulo: TITULO_MODAL_AVISO,
                mensaje: MSJ_ERROR_ID_SOCIO_COMERCIAL,
                cerrar: false,
                txtBtnAceptar: 'Aceptar',
                txtBtnCancelar: '',
              };
              return EMPTY;
            }
            this.tramite5701Store.setBlnSocioComercial(response.datos);
            this.setValoresStore(
              this.datosImportadorExportador,
              'idSocioComercial',
              'setIdSocioComercial'
            );
            return response;
          }),
          catchError((_error) => {
            this.nuevaNotificacion = {
              tipoNotificacion: 'alert',
              categoria: 'danger',
              modo: 'action',
              titulo: 'Error',
              mensaje: 'Ocurrió un error al obtener el socio comercial.',
              cerrar: false,
              txtBtnAceptar: 'Aceptar',
              txtBtnCancelar: '',
            };
            return EMPTY; // Evita que el error se propague
          })
        )
        .subscribe();
    }
  }
}
