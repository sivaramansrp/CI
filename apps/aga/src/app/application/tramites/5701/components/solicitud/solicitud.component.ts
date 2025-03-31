import {
  DESPACHO_DD, DESPACHO_LDA,
  FECHA_FINAL,
  FECHA_INICIO,
  HORA_FINAL,
  HORA_INICIO,
} from '../../../../core/enums/5701/tramite5701.enum';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
} from '@ng-mf/data-access-user';

import {
  Catalogo,
  CatalogoPaises,
} from '@ng-mf/data-access-user';
import {
  InputFecha,
  InputHora,
} from '@ng-mf/data-access-user';

import { DatosComponentePedimento } from '../../../../core/models/5701/tramite5701.model';

import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

import {
  CATALOGOS_ID,
  TIPO_SOLICITUD,
} from '@ng-mf/data-access-user';

import {
  Solicitud5701State,
  Tramite5701Store,
} from '../../../../core/estados/tramites/tramite5701.store';
import { Subject, delay, map, merge, takeUntil, tap } from 'rxjs';
import { CatalogosService } from '@ng-mf/data-access-user';

import { FechasService } from '@ng-mf/data-access-user';
import { FormulariosService } from '@ng-mf/data-access-user';
import { DatosAgregarFormulario } from '@ng-mf/data-access-user';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';



@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  @Input({ required: true }) tabindex!: number;

  tiposSolicitud!: Catalogo[];
  paisesOrigen!: CatalogoPaises[];
  paisesProcedencia!: CatalogoPaises[];
  aduanas!: Catalogo[];
  seccionAduanera!: Catalogo[];
  tipoOperacion!: Catalogo[];

  tipoSolicitudSeleccionada!: number;

  despachoDD = DESPACHO_DD;
  despachoLDA = DESPACHO_LDA;

  horaInicio: InputHora = HORA_INICIO;
  horaFinal: InputHora = HORA_FINAL;

  fechaInicioInput: InputFecha = FECHA_INICIO;
  fechaFinalInput: InputFecha = FECHA_FINAL;
  FormSolicitud!: FormGroup;

  colapsable: boolean = false;

  selectRangoDias: string[] = [];

  // Pedimento -crea una señal para validar
  validacionPedimento: boolean = false;
  datosPedimentoComponente!: DatosComponentePedimento;

  diaMinimo!: string;

  private destroyNotifier$: Subject<void> = new Subject();
  private seccion!: SeccionLibState;
  public solicitudState!: Solicitud5701State;

  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    private tramite5701Store: Tramite5701Store,
    private tramite5701Query: Tramite5701Query,
    private fechaService: FechasService,
    private fb: FormBuilder,
    private formulariosService: FormulariosService,
    private catalogosServices: CatalogosService,
    private validacionesService: ValidacionesFormularioService
  // eslint-disable-next-line no-empty-function
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


    if (this.solicitudState.horaFinal && this.solicitudState.horaInicio && this.solicitudState.fechaInicio && this.solicitudState.fechaFinal) {
      this.selectRangoDias = FechasService.obtenerDiasEntreFechas(
        this.solicitudState.fechaInicio,
        this.solicitudState.fechaFinal,
        this.solicitudState.horaInicio,
        this.solicitudState.horaFinal
      );
    }

    this.colapsable = (this.solicitudState.fechasSeleccionadas.length > 0 || this.selectRangoDias.length > 0)? true : false;
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
   * Verifica si hay un error de intervalo de fecha en los datos del servicio.
   * @returns {boolean} - `true` si hay un error de intervalo de fecha y el campo ha sido tocado, de lo contrario `false`.
   */
  intervaloFechaError(): boolean {
    return (
      this.datosServicio.hasError('invalidIntervalo') &&
      this.datosServicio.touched
    );
  }

  private inicializaCatalogos(): void {
    /**
     * Obtiene los tipos de solicitud desde el catálogo y los asigna a `datosTiposSolicitud`.
     *
     * Este método realiza una solicitud al servicio `catalogosServices` para obtener el catálogo de tipos de solicitud identificado por `CATALOGOS_ID.CAT_TIPO_SOL`. Una vez que recibe la  respuesta, verifica si la respuesta contiene elementos. Si es así, asigna los datos recibidos a la propiedad `datosTiposSolicitud` con la estructura adecuada.
     */
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

    merge(
      CAT_TIPO_SOLICITUD$,
      CATALOGO_PAISES$,
      CATALOGO_ADUANAS$,
      SECCIONES_ADUANERAS$,
      TIPO_OPERACION$
    ).subscribe();
  }

  /**
   * Obtiene la patente y la agrega al formulario.
   * 
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
      tipoSolicitud: [
        this.solicitudState?.tipoSolicitud,
        [Validators.required],
      ],
      datosImportadorExportador: this.fb.group({
        rfcImportExport: [
          this.solicitudState?.rfcImportExport,
          [
            Validators.required,
            Validators.pattern(this.validacionesService.rfcPattern),
          ],
        ],
        nombreImportExport: [
          { value: this.solicitudState?.nombreImportExport, disabled: true },
        ],
        nroRegistro: [
          this.solicitudState?.nroRegistro,
          [Validators.maxLength(25)],
        ],
        programaFomento: [this.solicitudState?.programaFomento],
        immex: [this.solicitudState?.immex],
        industriaAutomotriz: [this.solicitudState?.industriaAutomotriz],
        tipoEmpresaCertificada: [this.solicitudState?.tipoEmpresaCertificada],
        socioComercial: [this.solicitudState?.socioComercial],
        opEconomicoAut: [this.solicitudState?.opEconomicoAut],
        revisionOrigen: [this.solicitudState?.revisionOrigen],
        idSocioComercial: [
          { value: this.solicitudState?.idSocioComercial, disabled: true },
        ],
      }),

      datosServicio: this.fb.group({
        fechaInicio: [
          this.solicitudState?.fechaInicio,
          [Validators.required, this.validacionesService.validaFechaNoHoy],
        ],
        fechaFinal: [
          this.solicitudState?.fechaFinal,
          [Validators.required, this.validacionesService.validaFechaNoHoy],
        ],
        horaInicio: [this.solicitudState?.horaInicio, Validators.required],
        horaFinal: [this.solicitudState?.horaFinal, Validators.required],
        fechasSeleccionadas: this.fb.array([]),
      }),

      despacho: this.fb.group({
        despacho: [this.solicitudState?.despacho],
        autorizacion: [this.solicitudState?.rfcAutorizacion],
        idAduana: [this.solicitudState?.idAduana, [Validators.required]],
        descripcionAduana: [
          this.solicitudState?.descripcionAduana,
        ],
        idSeccionAduanera: [this.solicitudState?.idSeccionAduanera],
        seccionAduanera: [this.solicitudState?.seccionAduanera],
        nombreRecinto: [this.solicitudState?.nombreRecinto],
        tipoOperacion: [this.solicitudState?.tipoOperacion],
        patente: [{ value: this.solicitudState?.patente, disabled: true }],
        relacionSociedad: [this.solicitudState?.relacionSociedad],
        encargoConferido: [this.solicitudState?.encargoConferido],
        domicilio: [this.solicitudState?.domicilio],
      }),

      mercancia: this.fb.group({
        paisOrigen: [this.solicitudState?.paisOrigen, Validators.required],
        paisProcedencia: [
          this.solicitudState?.paisProcedencia,
          Validators.required,
        ],
        descripcion: [this.solicitudState?.descripcion, Validators.required],
        justificacion: [
          this.solicitudState?.justificacion,
          Validators.required,
        ],
      }),

      pedimento: this.fb.group({
        idPedimento: [this.solicitudState?.idPedimento],
        datosPedimento: this.fb.group({
          patentePedimento: [this.solicitudState?.patente],
          pedimento: [this.solicitudState?.pedimento],
          aduana: [this.solicitudState?.aduana],
          tipoPedimento: [this.solicitudState?.tipoPedimento],
          numeros: [this.solicitudState?.numero],
          comprobanteValor: [this.solicitudState?.comprobanteValor],
          pedimentoValidado: [this.solicitudState?.pedimentoValidado],
        }),
      }),

      personasResponsablesDespacho: this.fb.array([]),

      transporte: this.fb.group({}),

      pagoCaptura: this.fb.group({
        montoAPagar: [
          { value: this.solicitudState?.montoPagar, disabled: true },
        ],
        lineaCaptura: [
          this.solicitudState?.lineaCaptura,
          [Validators.required]
        ],
        montoModal: [this.solicitudState.montoModal, [Validators.required]],
      })
    });
  }

  /**
   * Este validador verifica que el intervalo entre las fechas y horas de inicio y finalización
   * cumpla con las restricciones específicas según el tipo de solicitud seleccionada.
   * @returns {Function} Una función que toma un `FormGroup` y devuelve un objeto con una clave booleana indicando si el intervalo es inválido, o `null` si el intervalo es válido.
   */
  fechaIntervaloValidator(): void {
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    const FECHA_INICIO = new Date(this.datosServicio.get('fechaInicio')?.value);
    const FECHA_FINAL = new Date(this.datosServicio.get('fechaFinal')?.value);
    const HORA_INICIO = this.datosServicio.get('horaInicio')?.value;
    const HORA_FINAL = this.datosServicio.get('horaFinal')?.value;
    const INTERVALO_DIAS = this.getIntervaloDias(this.tipoSolicitudSeleccionada);
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

      if (
        this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.INDIVIDUAL &&
        DIFERENCIA_EN_HORAS > 24
      ) {
        this.datosServicio.setErrors({ invalidIntervalo: true });
        // return { invalidIntervalo: true };
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
        // return { invalidIntervalo: true };
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
  // eslint-disable-next-line class-methods-use-this
  getIntervaloDias(intervalo: number): number | null {
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

  // *Eventos de los componentes hijos
  busqueda_rfc(): void {
    const RFC_IMPORT_EXPORT =
      this.datosImportadorExportador.get('rfcImportExport')?.value;
    // Aqui se hará la busqueda del rfc, para obtener el nombre
    this.llenarCamposDesactivados(
      this.datosImportadorExportador,
      'nombreImportExport'
    );

    const NOMBRE_IMPORT_EXPORT =
      this.datosImportadorExportador.get('nombreImportExport')?.value;
    this.tramite5701Store.setRfcImportExport(RFC_IMPORT_EXPORT);
    this.tramite5701Store.setNombreImportExport(NOMBRE_IMPORT_EXPORT);
  }

  // eslint-disable-next-line class-methods-use-this
  llenarCamposDesactivados(form: FormGroup, field: string): void {
    form.get(field)?.enable();
    form.get(field)?.setValue('DAYNIZ YAEL VELASCO CORONEL');
    form.get(field)?.disable();
  }

  /**
   * Selecciona el tipo de solicitud y actualiza el estado correspondiente.
   *
   * @returns {void} Esta función no retorna ningún valor.
   */
  tipoSolicitudSeleccion(): void {
    this.tipoSolicitudSeleccionada = parseInt(
      this.FormSolicitud.get('tipoSolicitud')?.value,
      10
    );

    const TIPO_SOLICITUD = this.FormSolicitud.get('tipoSolicitud')?.value;
    this.tramite5701Store.setTipoSolicitud(TIPO_SOLICITUD);
  }


  /**
  * Alterna el estado de visibilidad del componente colapsable.
  *
  * @returns {void} No retorna ningún valor.
  */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
 * Selecciona una aduana y actualiza los campos correspondientes en el formulario.
 *
 * @param aduana - El objeto de tipo Catalogo que contiene la información de la aduana seleccionada.
 * @returns {void}
 */
  aduanaSeleccion(aduana: Catalogo): void {
    this.darValorCampoFormulario(this.despacho, 'idAduana', aduana.id);
    this.darValorCampoFormulario(
      this.despacho,
      'descripcionAduana',
      aduana.descripcion
    );
    this.validacionPedimento = true;

    const PATENTE = FormulariosService.convertirValorANumero(
      this.despacho,
      'patente'
    );
    const ID_ADUANA = FormulariosService.convertirValorANumero(
      this.despacho,
      'idAduana'
    );

    this.datosPedimentoComponente = {
      patente: PATENTE,
      idAduana: ID_ADUANA,
    };
  }

  /**
   * Valida el campo de la aduana en el formulario.
   *
   * @returns {void} No retorna ningún valor.
   */
  validaCampoPedimento(): void {
    const ADUANA_VALIDACION = this.isValid(this.despacho, 'descripcionAduana');
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
  // eslint-disable-next-line class-methods-use-this
  darValorCampoFormulario(
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
  socioComercialChange(): void {
    const SOCIO_COMERCIAL =
      this.datosImportadorExportador.get('socioComercial')?.value;
    if (SOCIO_COMERCIAL) {
      this.datosImportadorExportador.get('idSocioComercial')?.enable();
    } else {
      this.datosImportadorExportador.get('idSocioComercial')?.disable();
    }

    this.setValoresStore(
      this.datosImportadorExportador,
      'idSocioComercial',
      'setIdSocioComercial'
    );
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

    if (this.tipoSolicitudSeleccionada !== TIPO_SOLICITUD.INDIVIDUAL) {
      this.rangoFechas();
    }
  }

  /**
   * Calculates the range of dates and times based on the input values from the service,
   * updates the selected range of days, and sets the collapsible state for the UI.
   *
   * @remarks
   * This method retrieves the start and end dates (`fechaInicio` and `fechaFinal`) 
   * as well as the start and end times (`horaInicio` and `horaFinal`) from the 
   * `datosServicio` form group. It then calculates the range of days using the 
   * `fechaService.obtenerDiasEntreFechas` method and updates the state in the 
   * `crosslistStore` and `tramite5701Store`.
   *
   * @returns {void} This method does not return a value.
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
   * Actualiza la lista de fechas seleccionadas y sincroniza el estado en el store.
   *
   * @param fechas - Un arreglo de cadenas que representan las fechas seleccionadas.
   * 
   * Este método recorre el arreglo de fechas proporcionado, crea una nueva instancia
   * de `FormControl` para cada fecha y la agrega a la lista `fechasSeleccionadas`.
   * Posteriormente, actualiza el estado de las fechas seleccionadas en el store
   * `tramite5701Store` llamando al método `setFechasSeleccionadas`.
   */
  changeCrosslist(fechas: string[]): void {
    fechas.forEach((fecha) => {
      this.fechasSeleccionadas.push(new FormControl(fecha));
    });
    this.tramite5701Store.setFechasSeleccionadas(fechas);
  }

}
