import {
  ADV_LIMPIA_CAMPOS,
  EMPRESAS_CERTIFICADAS,
  FUNCION_STORE_DD,
  FUNCION_STORE_LDA,
  ID_NAME_DD,
  ID_NAME_LDA,
  LABEL_DESPACHO_DD,
  LABEL_DESPACHO_LDA,
  MSJ_ERROR_FECHA, PATENTES_ID, TITULO_MODAL_ERROR,
  TRANSPORTE,
  VEHICULO
} from '../../../../core/enums/5701/tramite5701.enum';
import {
  ALFANUMERICO_ESPACIO,
  CATALOGOS_ID,
  Catalogo,
  CatalogoPaises,
  CatalogosService,
  DatosAgregarFormulario,
  FechasService,
  FormulariosService,
  REGEX_RFC,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TIPO_SOLICITUD,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, delay, map, merge, takeUntil, tap } from 'rxjs';
import {
  Solicitud5701State,
  Tramite5701Store,
} from '../../../../core/estados/tramites/tramite5701.store';
import { DatosCheckInputText } from '../../../../core/models/shared/check-input-text.model';
import { DatosComponentePedimento } from '../../../../core/models/5701/tramite5701.model';
import { Modal } from 'bootstrap';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios.service';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';

// eslint-disable-next-line @nx/enforce-module-boundaries
import patentes from 'libs/shared/theme/assets/json/5701/patentes.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import rfcs from 'libs/shared/theme/assets/json/5701/rfcs.json';

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

  @ViewChild('modalAviso') modalAviso!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;

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
  aduanas!: Catalogo[];

  /**
   * Catalogo de secciones aduaneras disponibles.
   */
  seccionAduanera!: Catalogo[];

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
  recintoCatalogo!: Catalogo[];

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
   * Arrelgo de patentes de la empresa
   */
  patentes = patentes;

  /**
   * Pedimento -crea una señal para validar
   */
  validacionPedimento: boolean = false;

  /**
   * Almacena los datos que necesita el componente Patente para hacer las validaciones
   * patente: Número de patente
   * idAduanaDespacho: Número de aduana elegida
   */
  datosPedimentoComponente!: DatosComponentePedimento;

  modal: string = '';
  tituloModal!: string;
  mensajeModal!: string;

  /**
   * Variable que toma el valor true si el tipo de despacho LDA o DD ha sido seleccionado, de lo contrario es false.
   */
  tipoDespacho: boolean = false;

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

  radioPatentes = patentes.patentes;

  rfcs = rfcs.rfcs;

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

  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    private tramite5701Store: Tramite5701Store,
    private tramite5701Query: Tramite5701Query,
    private fb: FormBuilder,
    private catalogosServices: CatalogosService,
    private validacionesService: ValidacionesFormularioService,
    private serviciosExtraordinariosService: ServiciosExtraordinariosService
  ) { }

  ngOnInit(): void {

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
        tap((_value) => {
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

        })
      )
      .subscribe();

    // Aqui se busca el nro de patente o autorizacion
    this.obtenerPatente();
    this.tipoSolicitudSeleccion();

    this.desactivarSelectSeccionAduanera = (this.seccionAduanera && this.seccionAduanera.length === 0) ? true : false;

    this.verificarDatosExistentesStore();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['folioSolicitud'] && changes['folioSolicitud'].currentValue) {
      this.FormSolicitud.get('folioSolicitud')?.setValue(this.folioSolicitud);
      // Se hace la peticion para obtener los datos de la solicitud
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
 * Obtiene el grupo de formulario 'despachoSeleccion' del formulario principal 'FormSolicitud'.
 *
 * @returns {FormGroup} El grupo de formulario 'despachoSeleccion'.
 */
  get despachoSeleccion(): FormGroup {
    return this.FormSolicitud.get('despachoSeleccion') as FormGroup;
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
  get pedimento(): FormGroup {
    return this.FormSolicitud.get('pedimento') as FormGroup;
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
   * Verifica si el control 'idSocioComercial' tiene el validador 'Validators.required'.
   * 
   * @returns {boolean} `true` si el control es requerido, de lo contrario `false`.
   */
  isRequired(): boolean {
    const CONTROL = this.datosImportadorExportador.get('idSocioComercial') as FormControl;

    if (CONTROL) {
      const REQUERIDO = CONTROL.hasValidator(Validators.required);
      return REQUERIDO;
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

    const CAT_TIPO_SOLICITUD$ = this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_SOL)
      .pipe(
        map((resp) => {
          this.tiposSolicitud = resp;
        }),
        takeUntil(this.destroyNotifier$)
      );

    const CATALOGO_PAISES$ = this.catalogosServices
      .getCatalogoPaises(CATALOGOS_ID.CAT_PAISES)
      .pipe(
        map((resp) => {
          if (resp.length > 0) {
            this.paisesOrigen = resp;
            this.paisesProcedencia = resp;
          }
        })
      );

    const CATALOGO_ADUANAS$ = this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_ADUANAS)
      .pipe(
        map((resp) => {
          if (resp.length > 0) {
            this.aduanas = resp;
          }
        })
      );

    const SECCIONES_ADUANERAS$ = this.catalogosServices
      .getCatalogoById(CATALOGOS_ID.CAT_SECCION_ADUANAS)
      .pipe(
        map((resp) => {
          this.seccionAduanera = JSON.parse(resp.data);
        })
      );

    const TIPO_OPERACION$ = this.catalogosServices
      .getCatalogoById(CATALOGOS_ID.CAT_TIPO_OPERACION)
      .pipe(
        map((resp) => {
          this.tipoOperacion = JSON.parse(resp.data);
        })
      );

    const TIPO_TRANSPORTE$ = this.catalogosServices
      .getCatalogoById(CATALOGOS_ID.CAT_TIPO_TRANSPORTE)
      .pipe(
        map((resp) => {
          const CATALOGO_TRANSPORTE = JSON.parse(resp.data);

          const TIPO_VEHICULO = VEHICULO;
          this.tipoVehiculo = CATALOGO_TRANSPORTE.filter((elemento: Catalogo) => TIPO_VEHICULO.includes(elemento.descripcion));

          const TIPO_TRANSPORTE = TRANSPORTE;
          this.tipoTransporte = CATALOGO_TRANSPORTE.filter((elemento: Catalogo) => TIPO_TRANSPORTE.includes(elemento.descripcion));
        })
      );

    const RECINTO$ = this.catalogosServices
      .getCatalogoById(CATALOGOS_ID.CAT_RECINTO)
      .pipe(
        map((resp) => {
          this.recintoCatalogo = JSON.parse(resp.data);
        })
      );

    const CAT_DESPACHO_LDA$ = this.catalogosServices
      .getCatalogoById(CATALOGOS_ID.CAT_DESPACHO_LDA)
      .pipe(
        map((resp) => {
          this.despachoLdaCatalogo = JSON.parse(resp.data);
        })
      );

    const CAT_DESPACHO_DD$ = this.catalogosServices
      .getCatalogoById(CATALOGOS_ID.CAT_DESPACHO_DD)
      .pipe(
        map((resp) => {
          this.despachoDDCatalogo = JSON.parse(resp.data);
        })
      );


    merge(
      CAT_TIPO_SOLICITUD$,
      CATALOGO_PAISES$,
      CATALOGO_ADUANAS$,
      SECCIONES_ADUANERAS$,
      TIPO_OPERACION$,
      TIPO_TRANSPORTE$,
      RECINTO$,
      CAT_DESPACHO_LDA$,
      CAT_DESPACHO_DD$
    )
      .pipe(
        takeUntil(this.destroyNotifier$),
      )
      .subscribe();
  }

  /**
   * Este método realiza una búsqueda de la patente en algún endpoint y luego
   * agrega el valor de la patente al formulario utilizando el servicio de formularios.
   * @return {void} No retorna ningún valor.
   * @private
   */
  private obtenerPatente(): void {
    // Busqueda de la patente a algun endpoint
    const DATOS_PATENTE: DatosAgregarFormulario = {
      form: this.despacho,
      field: 'patente',
      valor: '3061',
    };
    FormulariosService.agregarValorCamposDesactivados(DATOS_PATENTE);
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
      datosImportadorExportador: this.fb.group({
        apoderadoPatente: [],
        empresaApoderado: [],
        empresasApoderado: [],

        RFCImpExp: [
          this.solicitudState?.RFCImportadorExportador,
          [
            Validators.required,
            Validators.pattern(REGEX_RFC),
          ],
        ],
        nombre: [
          { value: this.solicitudState?.nombre, disabled: true },
        ],
        desNumeroRegistro: [
          this.solicitudState?.descripcionNumeroRegistro,
          [Validators.maxLength(25)],
        ],

        programa: [this.solicitudState?.programa],
        desProgramaFomento: [{ value: this.solicitudState?.descripcionProgramaFomento, disabled: true }, [Validators.maxLength(300)]],

        checkIMMEX: [this.solicitudState?.checkIMMEX],
        desImmex: [this.solicitudState?.descripcionImmex],

        industriaAutomotriz: [this.solicitudState?.industriaAutomotriz],
        desIndustrialAutomotriz: [{ value: this.solicitudState?.descripcionIndustrialAutomotriz, disabled: true }, [Validators.maxLength(25)]],

        tipoEmpresaCertificada: [this.solicitudState?.tipoEmpresaCertificada],
        socioComercial: [this.solicitudState?.socioComercial],
        certificacionOEA: [this.solicitudState?.certificacionOEA],
        revision: [this.solicitudState?.revision],
        idSocioComercial: [
          { value: this.solicitudState?.idSocioComercial, disabled: true },
        ],
      }),

      datosServicio: this.fb.group({
        fechaInicio: [
          this.solicitudState?.fechaInicio,
          [Validators.required, ValidacionesFormularioService.validaFechaNoHoy],
        ],
        fechaFinal: [
          this.solicitudState?.fechaFinal,
          [Validators.required, ValidacionesFormularioService.validaFechaNoHoy],
        ],
        horaInicio: [this.solicitudState?.horaInicio, Validators.required],
        horaFinal: [this.solicitudState?.horaFinal, Validators.required],
        fechasSeleccionadas: this.fb.array([]),
      }),

      despachoSeleccion: this.fb.group({
        despacho: [this.solicitudState?.despacho],
        lda: [this.solicitudState?.lda],
        autorizacionLDA: [this.solicitudState?.autorizacionLDA],
        dd: [this.solicitudState?.dd],
        autorizacionDDEX: [this.solicitudState?.autorizacionDDEX],
      }),

      despacho: this.fb.group({
        idAduanaDespacho: [this.solicitudState?.idAduanaDespacho, [Validators.required]],
        aduanaDespacho: [
          this.solicitudState?.aduanaDespacho,
        ],
        idSeccionDespacho: [this.solicitudState?.idSeccionDespacho],
        seccionAduanera: [this.solicitudState?.seccionAduanera],
        idRecinto: [],
        nombreRecinto: [this.solicitudState?.nombreRecinto],
        tipoOperacion: [this.solicitudState?.tipoOperacion],
        patente: [{ value: this.solicitudState?.patente, disabled: true }],
        relacionSociedad: [this.solicitudState?.relacionSociedad],
        encargoConferido: [this.solicitudState?.encargoConferido],
        domicilioDespacho: [this.solicitudState?.domicilioDespacho],
      }),

      mercancia: this.fb.group({
        paisOrigen: [this.solicitudState?.paisOrigen, Validators.required],
        paisProcedencia: [
          this.solicitudState?.paisProcedencia,
          Validators.required,
        ],
        descripcionGenerica: [this.solicitudState?.descripcionGenerica, [Validators.required, Validators.maxLength(500)]],
        justificacion: [
          this.solicitudState?.justificacion,
          [Validators.required, Validators.maxLength(1000)],
        ],
      }),

      pedimento: this.fb.group({
        idPedimento: [this.solicitudState?.idPedimento],

        patentePedimento: [this.solicitudState?.patente],
        pedimento: [this.solicitudState?.pedimento],
        aduana: [this.solicitudState?.aduana],
        tipoPedimento: [this.solicitudState?.tipoPedimento],
        numeros: [this.solicitudState?.numero],
        comprobanteValor: [this.solicitudState?.comprobanteValor],
        pedimentoValidado: [this.solicitudState?.pedimentoValidado],

      }),

      personasResponsablesDespacho: this.fb.array([]),


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
        lineaCaptura: [
          this.solicitudState?.lineaCaptura,
          [Validators.required]
        ],
        monto: [this.solicitudState.monto, [Validators.required]],
      })
    });
  }

  /**
   * Este validador verifica que el intervalo entre las fechas y horas de inicio y finalización
   * cumpla con las restricciones específicas según el tipo de solicitud seleccionada.
   * @returns {Function} Una función que toma un `FormGroup` y devuelve un objeto con una clave booleana indicando si el intervalo es inválido, o `null` si el intervalo es válido.
   */
  fechaIntervaloValidator(): void {
    const FECHA_INICIO = new Date(this.datosServicio.get('fechaInicio')?.value);
    const FECHA_FINAL = new Date(this.datosServicio.get('fechaFinal')?.value);
    const HORA_INICIO = this.datosServicio.get('horaInicio')?.value;
    const HORA_FINAL = this.datosServicio.get('horaFinal')?.value;
    const INTERVALO_DIAS = SolicitudComponent.getIntervaloDias(this.tipoSolicitudSeleccionada);
    if (
      FECHA_INICIO &&
      FECHA_FINAL &&
      HORA_INICIO &&
      HORA_FINAL &&
      INTERVALO_DIAS !== null
    ) {
      FECHA_INICIO.setHours(
        parseInt(HORA_INICIO.split(':')[0], 10),
        parseInt(HORA_INICIO.split(':')[1], 10)
      );
      FECHA_FINAL.setHours(
        parseInt(HORA_FINAL.split(':')[0], 10),
        parseInt(HORA_FINAL.split(':')[1], 10)
      );
      const DIFERENCIA_EN_TIEMPO = FECHA_FINAL.getTime() - FECHA_INICIO.getTime();
      const DIFERENCIA_EN_HORAS = DIFERENCIA_EN_TIEMPO / (1000 * 3600);

      if (DIFERENCIA_EN_TIEMPO <= 0) {
        this.datosServicio.setErrors({ endDateBeforeStartDate: true });
        return;
      }

      if (
        this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.INDIVIDUAL &&
        DIFERENCIA_EN_HORAS > 24
      ) {
        this.datosServicio.setErrors({ invalidIntervalo: true });
        return;
      }

      const DIFERENCIA_EN_DIAS = DIFERENCIA_EN_TIEMPO / (1000 * 3600 * 24);
      if (
        (this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.SEMANAL &&
          DIFERENCIA_EN_DIAS > 7) ||
        (this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.MENSUAL &&
          DIFERENCIA_EN_DIAS > 30)
      ) {

        const FECHA_FINAL_CONTROL = this.datosServicio.get('fechaFinal');
        if (FECHA_FINAL_CONTROL) {
          FECHA_FINAL_CONTROL.setErrors({ invalidIntervalo: true });
        }
      }

      if (DIFERENCIA_EN_TIEMPO < 0) {
        this.datosServicio.setErrors({ endDateBeforeStartDate: true });
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
   * Realiza la búsqueda del RFC del importador/exportador y actualiza los campos relacionados.
   * 
   * @returns {void} No retorna ningún valor.
   */
  busquedaRfc(): void {
    if (this.datosImportadorExportador.get('RFCImpExp')?.valid) {
      const RFC_IMP_EXP =
        this.datosImportadorExportador.get('RFCImpExp')?.value;
      // Aqui se hará la busqueda del rfc, para obtener el nombre
      SolicitudComponent.llenarCamposDesactivados(
        this.datosImportadorExportador,
        'nombre'
      );

      const NOMBRE =
        this.datosImportadorExportador.get('nombre')?.value;
      this.tramite5701Store.setRFCImportadorExportador(RFC_IMP_EXP);
      this.tramite5701Store.setNombre(NOMBRE);
    }
  }

  /**
   * Habilita temporalmente un campo de un formulario, asigna un valor predeterminado
   * y luego lo desactiva nuevamente.
   *
   * @param form - El grupo de formulario (`FormGroup`) que contiene el campo a modificar.
   * @param field - El nombre del campo dentro del formulario que será modificado.
   */
  static llenarCamposDesactivados(form: FormGroup, field: string): void {
    form.get(field)?.enable();
    form.get(field)?.setValue('JUAN PEREZ CRUZ');
    form.get(field)?.disable();
  }

  /**
   * Selecciona el tipo de solicitud y actualiza el estado correspondiente.
   *
   * @returns {void} Esta función no retorna ningún valor.
   */
  tipoSolicitudSeleccion(): void {
    const TIPO_SOLICITUD = this.FormSolicitud.get('tipoSolicitud')?.value;

    if (this.solicitudState.tipoSolicitud && (TIPO_SOLICITUD !== this.solicitudState.tipoSolicitud)) {
      //Abre el modal de aviso
      alert('Tipo de solicitud seleccionado: ');
      this.tramite5701Store.limpiarSolicitud();
      this.FormSolicitud.reset(
        {
          tipoSolicitud: TIPO_SOLICITUD
        }
      );
      this.setValoresStore(this.FormSolicitud, 'tipoSolicitud', 'setTipoSolicitud');
    }

    this.tipoSolicitudSeleccionada = parseInt(
      this.FormSolicitud.get('tipoSolicitud')?.value,
      10
    );

    this.tramite5701Store.setTipoSolicitud(TIPO_SOLICITUD);


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
    SolicitudComponent.darValorCampoFormulario(this.despacho, 'idAduanaDespacho', aduana.id);
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
    const ADUANA_VALIDACION = this.isValid(this.despacho, 'aduanaDespacho');
    if (ADUANA_VALIDACION === null) {
      this.validacionPedimento = true;
    }
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
      this.datosImportadorExportador.get('idSocioComercial')?.setValidators([Validators.required, Validators.maxLength(30), Validators.pattern(ALFANUMERICO_ESPACIO)]);
      this.datosImportadorExportador.get('idSocioComercial')?.updateValueAndValidity();

    } else {
      this.datosImportadorExportador.get('idSocioComercial')?.clearValidators();
      this.datosImportadorExportador.get('idSocioComercial')?.updateValueAndValidity();
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
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite5701Store): void {
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
    if (this.datosServicio.hasError('endDateBeforeStartDate')) {
      this.tituloModal = TITULO_MODAL_ERROR;
      this.mensajeModal = MSJ_ERROR_FECHA;
      this.abrirModal();
      return;
    }

    if (this.tipoSolicitudSeleccionada !== TIPO_SOLICITUD.INDIVIDUAL) {
      this.rangoFechas();
      this.mostrarRangoFechas = true;
    }
  }

  /**
   * Calcula el rango de días entre dos fechas y horas, 
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
    this.colapsable = true;
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
* Abre el modal para eliminar un documento.
* @param {number} i - El índice del documento.
*/
  abrirModal(): void {
    const MODAL_AVISO = new Modal(this.modalAviso.nativeElement);
    MODAL_AVISO.show();
  }

  /**
 * Cierra el modal.
 */
  cerrarModal(tipo: string, acepta: boolean): void {
    this.closeModal.nativeElement.click();
    this.tituloModal = '';
    this.mensajeModal = '';

    if (tipo === 'aviso' && acepta) {
      this.despacho.reset({
        idAduanaDespacho: '',
        aduanaDespacho: '',
        idSeccionDespacho: '',
        seccionAduanera: '',
        nombreRecinto: '',
        tipoOperacion: '',
        patente: '',
        relacionSociedad: '',
        encargoConferido: '',
        domicilioDespacho: '',
      });

      this.setValoresStore(this.despacho, 'idAduanaDespacho', 'setIdAduanaDespacho');
      this.setValoresStore(this.despacho, 'aduanaDespacho', 'setAduanaDespacho');
      this.setValoresStore(this.despacho, 'idSeccionDespacho', 'setIdSeccionDespacho');
      this.setValoresStore(this.despacho, 'seccionAduanera', 'setSeccionAduanera');
      this.setValoresStore(this.despacho, 'nombreRecinto', 'setNombreRecinto');
      this.setValoresStore(this.despacho, 'tipoOperacion', 'setTipoOperacion');
      this.setValoresStore(this.mercancia, this.idNameAutorizacion, 'setAutorizacionDDEX')
    }



    if (tipo === 'fecha') {
      this.datosServicio.reset();
    }
  }

  /**
   * Muestra un cuadro de diálogo de confirmación para la selección de tipo de despacho (LDA o DD).
   * 
   * @param tipo - Tipo de despacho seleccionado ('lda' o 'dd').
   * 
   * @returns {void} No retorna ningún valor.
   */
  showConfirmDialogLDA_DD(tipo: string): void {
    const ADUANA = this.despacho.get('idAduanaDespacho')?.value;
    const DESPACHO = this.despacho.get('idSeccionDespacho')?.value;
    const RECINTO = this.despacho.get('nombreRecinto')?.value;


    if (ADUANA !== '' || DESPACHO !== '' || RECINTO !== '') {
      this.tituloModal = TITULO_MODAL_ERROR;
      this.mensajeModal = ADV_LIMPIA_CAMPOS;
      this.setValoresStore(this.despachoSeleccion, this.idNameAutorizacion, this.funcionStoreAutorizacion);
      this.abrirModal();
    }

    this.tipoDespacho = !this.tipoDespacho;

    if (!this.tipoDespacho) {
      this.despachoSeleccion.get('lda')?.enable();
      this.despachoSeleccion.get('dd')?.enable();

      this.despachoSeleccion.get(this.idNameAutorizacion)?.clearValidators();
      this.despachoSeleccion.get(this.idNameAutorizacion)?.updateValueAndValidity();
      this.despachoSeleccion.get(this.idNameAutorizacion)?.reset();
      if (this.funcionStoreAutorizacion) {
        this.setValoresStore(this.despachoSeleccion, this.idNameAutorizacion, this.funcionStoreAutorizacion);
      }

      this.idNameAutorizacion = '';
      this.labelTipoDespacho = '';
    }

    if (tipo === 'lda' && this.tipoDespacho) {
      this.labelTipoDespacho = LABEL_DESPACHO_LDA;
      this.idNameAutorizacion = ID_NAME_LDA
      this.funcionStoreAutorizacion = FUNCION_STORE_LDA;

      this.despachoSeleccion.get('dd')?.reset();
      this.despachoSeleccion.get('dd')?.disable();
      this.setValoresStore(this.despachoSeleccion, 'dd', 'setDD');
      this.setValoresStore(this.despachoSeleccion, 'lda', 'setLDA');
      this.selectCatalogoDespacho = this.despachoLdaCatalogo;
    } else if (tipo === 'dd' && this.tipoDespacho) {
      this.labelTipoDespacho = LABEL_DESPACHO_DD;
      this.idNameAutorizacion = ID_NAME_DD;
      this.funcionStoreAutorizacion = FUNCION_STORE_DD;

      this.despachoSeleccion.get('lda')?.reset();
      this.despachoSeleccion.get('lda')?.disable();
      this.setValoresStore(this.despachoSeleccion, 'lda', 'setLDA');
      this.setValoresStore(this.despachoSeleccion, 'dd', 'setDD');
      this.selectCatalogoDespacho = this.despachoDDCatalogo;
      this.activarCatalogoDespacho = true;

    }
    this.despachoSeleccion.get(this.idNameAutorizacion)?.setValidators(Validators.required);
    this.despachoSeleccion.get(this.idNameAutorizacion)?.updateValueAndValidity();
  }

  /**
   * Cambia la sección aduanera y actualiza el estado correspondiente.
   * @returns {void} No retorna ningún valor.
   */
  changeSeccionAduanera(): void {
    const SECCION_ADUANERA = this.despacho.get('idSeccionDespacho')?.value;

    if (SECCION_ADUANERA) {
      this.desactivarSelectRecinto = true;
    }

    this.setValoresStore(
      this.despacho,
      'idSeccionDespacho',
      'setIdSeccionDespacho'
    )
  }

  /**
   * Cambia el recinto seleccionado y actualiza el estado correspondiente.
   * 
   * @returns {void} No retorna ningún valor.
   */
  changeRecinto(): void {
    const RECINTO = this.despacho.get('nombreRecinto')?.value;

    if (RECINTO) {
      this.desactivarSelectSeccionAduanera = true;
    }

    this.setValoresStore(
      this.despacho,
      'nombreRecinto',
      'setNombreRecinto'
    )
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
    return this.serviciosExtraordinariosService.getCatalogoById(PATENTES_ID)
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
    this.serviciosExtraordinariosService.getCatalogoById(PATENTES_ID)
      .pipe(
        map((resp) => {
          return JSON.parse(resp.data);
        })
      );
  }

  /**
   * Actualiza los valores del campo Programa Fomento y almacena los cambios en el store.
   * 
   * @param valores - Objeto que contiene el estado del checkbox y el texto asociado.
   * @returns {void}
   */
  checkPrograma(valores: DatosCheckInputText): void {
    this.datosImportadorExportador.get('programa')?.setValue(valores.checkbox);
    this.datosImportadorExportador.get('desProgramaFomento')?.setValue(valores.texto);
    this.setValoresStore(this.datosImportadorExportador, 'programa', 'setPrograma');
    this.setValoresStore(this.datosImportadorExportador, 'desProgramaFomento', 'setDescripcionProgramaFomento');
  }

  /**
   * Actualiza los valores del campo IMMEX y almacena los cambios en el store.
   *    * @param valores - Objeto que contiene el estado del checkbox y el texto asociado.
   * @returns {void}
   */
  checkImmex(valores: DatosCheckInputText): void {
    this.datosImportadorExportador.get('checkIMMEX')?.setValue(valores.checkbox);
    this.datosImportadorExportador.get('desImmex')?.setValue(valores.texto);
    this.setValoresStore(this.datosImportadorExportador, 'checkIMMEX', 'setCheckIMMEX');
    this.setValoresStore(this.datosImportadorExportador, 'desImmex', 'setDescripcionImmex');
  }

  /**
   * Actualiza los valores del campo automutriz y almacena los cambios en el store.
   * 
   * @param valores - Objeto que contiene el estado del checkbox y el texto asociado.
   * @returns {void}
   */
  checkAutomotriz(valores: DatosCheckInputText): void {
    this.datosImportadorExportador.get('industriaAutomotriz')?.setValue(valores.checkbox);
    this.datosImportadorExportador.get('desIndustrialAutomotriz')?.setValue(valores.texto);
    this.setValoresStore(this.datosImportadorExportador, 'industriaAutomotriz', 'setIndustriaAutomotriz');
    this.setValoresStore(this.datosImportadorExportador, 'desIndustrialAutomotriz', 'setDescripcionIndustriaAutomotriz');
  }

  /**
   * Verifica y actualiza el estado de los campos de un formulario según el valor de un campo específico.
   * 
   * @param campoId - Identificador del campo a verificar.
   * @param campoDescripcion - Identificador del campo de descripción asociado.
   * @param form - Formulario reactivo que contiene los campos.
   * @returns {void}
   */
  verificaDatosCheckInput(campoId: string, campoDescripcion: string, form: FormGroup): void {
    const VALOR = form.get(campoId)?.value;
    const LDA_DD = campoId.includes('lda') || campoId.includes('dd');

    if (VALOR) {
      form.get(campoDescripcion)?.enable();
      form.get(campoDescripcion)?.setValue(this.solicitudState?.[campoDescripcion as keyof Solicitud5701State]);

      if (LDA_DD) {
        this.tipoDespacho = true;
        this.idNameAutorizacion = campoId === 'dd' ? ID_NAME_DD : ID_NAME_LDA;
        this.labelTipoDespacho = campoId === 'dd' ? LABEL_DESPACHO_DD : LABEL_DESPACHO_LDA;

        if (campoId === 'dd') {
          this.despachoSeleccion.get('lda')?.disable();
        } else if (campoId === 'lda') {
          this.despachoSeleccion.get('dd')?.disable();
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
  changeAgregarVehiculo(vehiculos: any[], tipo: string): void {
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
    //Verifica si programa fomento esta habilitado y si tiene valor.
    if (this.solicitudState.programa) {
      const DATOS_PROGRAMA: DatosCheckInputText = {
        checkbox: this.solicitudState.programa,
        texto: this.solicitudState.descripcionProgramaFomento,
      }
      this.checkPrograma(DATOS_PROGRAMA)
    }

    // Verifica si el check de IMMEX esta habilitado y si tiene valor.
    if (this.solicitudState.checkIMMEX) {
      const DATOS_IMMEX: DatosCheckInputText = {
        checkbox: this.solicitudState.checkIMMEX,
        texto: this.solicitudState.descripcionImmex,
      }
      this.checkImmex(DATOS_IMMEX)
    }

    // Verifica si el check de industria automotriz esta habilitado y si tiene valor.
    if (this.solicitudState.industriaAutomotriz) {
      const DATOS_AUTOMOTRIZ: DatosCheckInputText = {
        checkbox: this.solicitudState.industriaAutomotriz,
        texto: this.solicitudState.descripcionIndustrialAutomotriz,
      }
      this.checkAutomotriz(DATOS_AUTOMOTRIZ);
    }

    // Verifica que si los campos con check e input estan seleccionados y tienen valor.
    this.verificaDatosCheckInput('socioComercial', 'idSocioComercial', this.datosImportadorExportador);
    this.verificaDatosCheckInput('lda', 'despachoSeleccion', this.despachoSeleccion);
    this.verificaDatosCheckInput('dd', 'despachoSeleccion', this.despachoSeleccion);

    if (this.solicitudState.horaFinal && this.solicitudState.horaInicio && this.solicitudState.fechaInicio && this.solicitudState.fechaFinal) {
      this.selectRangoDias = FechasService.obtenerDiasEntreFechas(
        this.solicitudState.fechaInicio,
        this.solicitudState.fechaFinal,
        this.solicitudState.horaInicio,
        this.solicitudState.horaFinal
      );
      this.mostrarRangoFechas = true;
    }

    this.colapsable = (this.solicitudState.fechasSeleccionadas.length > 0 || this.selectRangoDias.length > 0) ? true : false;

  }
}
