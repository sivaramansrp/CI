import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  DESPACHO_DD,
  DESPACHO_LDA,
  FECHA_FINAL,
  FECHA_INICIO,
  HORA_FINAL,
  HORA_INICIO,
} from '@ng-mf/data-access-user';

import {
  Catalogo,
  CatalogoPaises,
} from '@ng-mf/data-access-user';
import {
  InputFecha,
  InputHora,
} from '@ng-mf/data-access-user';

import { DatosComponentePedimento } from '@ng-mf/data-access-user';

import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

import {
  CATALOGOS_ID,
  TIPO_SOLICITUD,
} from '@ng-mf/data-access-user';

import {
  Solicitud5701State,
  Tramite5701Store,
} from '../../../../estados/tramites/tramite5701.store';
import { Subject, delay, map, max, merge, takeUntil, tap } from 'rxjs';
import { CatalogosService } from '@ng-mf/data-access-user';

import { FechasService } from '@ng-mf/data-access-user';
import { FormulariosService } from '@ng-mf/data-access-user';
import { datosAgregarFormulario } from '@ng-mf/data-access-user';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SeccionState, SeccionStore } from '../../../../estados/seccion.store';
import { SeccionQuery } from '../../../../estados/queries/seccion.query';
import { Tramite5701Query } from '../../../../estados/queries/tramite5701.query';

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
  tipoTransporte!: Catalogo[];

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
  private seccion!: SeccionState;
  public solicitudState!: Solicitud5701State;

  constructor(
    private seccionQuery: SeccionQuery,
    private seccionStore: SeccionStore,
    private tramite5701Store: Tramite5701Store,
    private tramite5701Query: Tramite5701Query,
    private fechaService: FechasService,
    private fb: FormBuilder,
    private formulariosService: FormulariosService,
    private catalogosServices: CatalogosService,
    private validacionesService: ValidacionesFormularioService
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
          let seccion: number = 0;
          const formasValidadas = this.seccion.formaValida;

          for (let i = 0; i < this.seccion.seccion.length; i++) {
            if (
              this.seccion.seccion[i] === true &&
              this.seccion.formaValida[i] === false
            ) {
              seccion = i;
              break;
            }
          }
          if (this.FormSolicitud.valid) {
            formasValidadas[seccion] = true;
            this.seccionStore.establecerFormaValida(formasValidadas);
          } else {
            formasValidadas[seccion] = false;
            this.seccionStore.establecerFormaValida(formasValidadas);
          }
        })
      )
      .subscribe();

    // Aqui se busca el nro de patente o autorizacion
    this.obtenerPatente();
    this.tipoSolicitudSeleccion();
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

  /**
 * Obtiene el grupo de formulario 'transporte' del formulario principal 'FormSolicitud'.
 */
  get transporte(): FormGroup {
    return this.FormSolicitud.get('transporte') as FormGroup;
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
    return this.validacionesService.isValid(form, field)!;
  }

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

  private inicializaCatalogos(): void {
    /**
     * Obtiene los tipos de solicitud desde el catálogo y los asigna a `datosTiposSolicitud`.
     *
     * Este método realiza una solicitud al servicio `catalogosServices` para obtener el catálogo de tipos de solicitud identificado por `CATALOGOS_ID.CAT_TIPO_SOL`. Una vez que recibe la  respuesta, verifica si la respuesta contiene elementos. Si es así, asigna los datos recibidos a la propiedad `datosTiposSolicitud` con la estructura adecuada.
     */
    const catTipoSolicitud$ = this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_SOL)
      .pipe(
        map((resp) => {
          this.tiposSolicitud = resp;
        }),
        takeUntil(this.destroyNotifier$)
      );

    const catalogoPaises$ = this.catalogosServices
      .getCatalogoPaises(CATALOGOS_ID.CAT_PAISES)
      .pipe(
        map((resp) => {
          if (resp.length > 0) {
            this.paisesOrigen = resp;
            this.paisesProcedencia = resp;
          }
        })
      );

    const catalogoAduanas$ = this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_ADUANAS)
      .pipe(
        map((resp) => {
          if (resp.length > 0) {
            this.aduanas = resp;
          }
        })
      );

    const seccionesAduaneras$ = this.catalogosServices
      .getCatalogoById(CATALOGOS_ID.CAT_SECCION_ADUANAS)
      .pipe(
        map((resp) => {
          this.seccionAduanera = JSON.parse(resp.data);
        })
      );

    const tipoOperacion$ = this.catalogosServices
      .getCatalogoById(CATALOGOS_ID.CAT_TIPO_OPERACION)
      .pipe(
        map((resp) => {
          this.tipoOperacion = JSON.parse(resp.data);
        })
      );

    const tipoTransporte$ = this.catalogosServices
      .getCatalogoById(CATALOGOS_ID.CAT_TIPO_TRANSPORTE)
      .pipe(
        map((resp) => {
          this.tipoTransporte = JSON.parse(resp.data);
        })
      );


    merge(
      catTipoSolicitud$,
      catalogoPaises$,
      catalogoAduanas$,
      catalogoAduanas$,
      seccionesAduaneras$,
      tipoOperacion$,
      tipoTransporte$,
    ).subscribe();
  }

  private obtenerPatente(): void {
    // Busqueda de la patente a algun endpoint
    const datosPatente: datosAgregarFormulario = {
      form: this.despacho,
      field: 'patente',
      valor: '3061',
    };
    this.formulariosService.agregarValorCamposDesactivados(datosPatente);
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
        RFCImpExp: [
          this.solicitudState?.RFCImpExp,
          [
            Validators.required,
            Validators.pattern(this.validacionesService.rfcPattern),
          ],
        ],
        nombre: [
          { value: this.solicitudState?.nombre, disabled: true },
        ],
        desNumeroRegistro: [
          this.solicitudState?.desNumeroRegistro,
          [Validators.maxLength(25)],
        ],
        programa: [this.solicitudState?.programa, [Validators.maxLength(300)]],
        desdesImmex: [this.solicitudState?.desImmex],
        desIndustrialAutomotriz: [this.solicitudState?.desIndustrialAutomotriz],
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
          [Validators.required],
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


      transporte: this.fb.group({
        tipoTransporte: [this.solicitudState?.tipoTransporte],

      }),

      pagoCaptura: this.fb.group({
        montoAPagar: [
          { value: this.solicitudState?.montoPagar, disabled: true },
        ],
        lineaCaptura: [
          this.solicitudState?.lineaCaptura,
          [Validators.required],
        ],
        monto: [this.solicitudState?.monto, [Validators.required]],
      }),
    });
  }

  /**
   * Este validador verifica que el intervalo entre las fechas y horas de inicio y finalización
   * cumpla con las restricciones específicas según el tipo de solicitud seleccionada.
   * @returns {Function} Una función que toma un `FormGroup` y devuelve un objeto con una clave booleana indicando si el intervalo es inválido, o `null` si el intervalo es válido.
   */
  fechaIntervaloValidator(): void {
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    const fechaInicio = new Date(this.datosServicio.get('fechaInicio')?.value);
    const fechaFinal = new Date(this.datosServicio.get('fechaFinal')?.value);
    const horaInicio = this.datosServicio.get('horaInicio')?.value;
    const horaFinal = this.datosServicio.get('horaFinal')?.value;
    const intervalDays = this.getIntervaloDias(this.tipoSolicitudSeleccionada);
    if (
      fechaInicio &&
      fechaFinal &&
      horaInicio &&
      horaFinal &&
      intervalDays !== null
    ) {
      fechaInicio.setHours(
        parseInt(horaInicio.split(':')[0], 10),
        parseInt(horaInicio.split(':')[1], 10)
      );
      fechaFinal.setHours(
        parseInt(horaFinal.split(':')[0], 10),
        parseInt(horaFinal.split(':')[1], 10)
      );
      const differenceInTime = fechaFinal.getTime() - fechaInicio.getTime();
      const differenceInHours = differenceInTime / (1000 * 3600);

      if (
        this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.INDIVIDUAL &&
        differenceInHours > 24
      ) {
        this.datosServicio.setErrors({ invalidIntervalo: true });
        // return { invalidIntervalo: true };
      }

      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      if (
        (this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.SEMANAL &&
          differenceInDays > 7) ||
        (this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.MENSUAL &&
          differenceInDays > 30)
      ) {
        this.datosServicio
          .get('fechaFinal')!
          .setErrors({ invalidIntervalo: true });
        // return { invalidIntervalo: true };
      }

      if (differenceInTime < 0) {
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
    if (this.datosImportadorExportador.get('RFCImpExp')?.valid) {
      const RFC_IMP_EXP =
        this.datosImportadorExportador.get('RFCImpExp')?.value;
      // Aqui se hará la busqueda del rfc, para obtener el nombre
      this.llenarCamposDesactivados(
        this.datosImportadorExportador,
        'nombre'
      );

      const NOMBRE =
        this.datosImportadorExportador.get('nombre')?.value;
      this.tramite5701Store.setRFCImpExp(RFC_IMP_EXP);
      this.tramite5701Store.setNombre(NOMBRE);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  llenarCamposDesactivados(form: FormGroup, field: string): void {
    form.get(field)?.enable();
    form.get(field)?.setValue('JUAN PEREZ CRUZ');
    form.get(field)?.disable();
  }

  tipoSolicitudSeleccion(): void {
    if (this.solicitudState?.tipoSolicitud) {

      console.log('Al elegir un nuevo tipo de solicitud se borraran todos los datos que ya ha lllenado');

    }

    this.tipoSolicitudSeleccionada = parseInt(
      this.FormSolicitud.get('tipoSolicitud')?.value,
      10
    );

    const tipoSolicitud = this.FormSolicitud.get('tipoSolicitud')?.value;
    this.tramite5701Store.setTipoSolicitud(tipoSolicitud);
  }

  rango_fechas(): void {
    const fechaInicial = this.datosServicio.get('fechaInicio')?.value;
    const fechaFinal = this.datosServicio.get('fechaFinal')?.value;

    const formatoFechaInicial =
      this.fechaService.formatoFechaGuion(fechaInicial);
    const formatoFechaFinal = this.fechaService.formatoFechaGuion(fechaFinal);

    this.selectRangoDias = this.fechaService.obtenerDiasEntreFechas(
      formatoFechaInicial,
      formatoFechaFinal
    );

    this.colapsable = true;
  }

  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  aduanaSeleccion(aduana: Catalogo): void {
    this.darValorCampoFormulario(this.despacho, 'idAduana', aduana.id);
    this.darValorCampoFormulario(
      this.despacho,
      'descripcionAduana',
      aduana.descripcion
    );
    this.validacionPedimento = true;

    const patente = this.formulariosService.convertirValorANumero(
      this.despacho,
      'patente'
    );
    const idAduana = this.formulariosService.convertirValorANumero(
      this.despacho,
      'idAduana'
    );

    this.datosPedimentoComponente = {
      patente: patente,
      idAduana: idAduana,
    };
  }

  validaCampoPedimento(): void {
    const aduanaValidacion = this.isValid(this.despacho, 'descripcionAduana');
    if (aduanaValidacion === null) {
      this.validacionPedimento = true;
    }
  }

  darValorCampoFormulario(
    form: FormGroup,
    field: string,
    valor: string | number
  ): void {
    form.get(field)?.setValue(valor);
  }

  socioComercialChange(): void {
    const SOCIO_COMERCIAL =
      this.datosImportadorExportador.get('socioComercial')?.value;
    if (SOCIO_COMERCIAL) {
      this.datosImportadorExportador.get('idSocioComercial')?.enable();
      this.datosImportadorExportador.get('idSocioComercial')?.setValidators([Validators.required, Validators.maxLength(30)],);
      this.datosImportadorExportador.get('idSocioComercial')?.updateValueAndValidity();
    } else {
      this.datosImportadorExportador.get('idSocioComercial')?.clearValidators();
      this.datosImportadorExportador.get('idSocioComercial')?.updateValueAndValidity();
      this.datosImportadorExportador.get('idSocioComercial')?.reset();
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
    const valor = form.get(campo)?.value;
    (this.tramite5701Store[metodoNombre] as (value: any) => void)(valor);
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
}
