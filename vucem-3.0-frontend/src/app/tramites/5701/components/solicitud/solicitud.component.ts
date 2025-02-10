import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  DESPACHO_DD,
  DESPACHO_LDA,
  FECHA_FINAL,
  FECHA_INICIO,
  HORA_FINAL,
  HORA_INICIO,
} from '../../../../shared/constantes/servicios-extraordinarios.enum';

import {
  Catalogo,
  CatalogoPaises,
} from '../../../../core/models/shared/catalogos.model';
import {
  DatosInputCheck,
  InputFecha,
  InputHora,
} from '../../../../core/models/shared/components.model';

import { DatosComponentePedimento } from '../../../../core/models/5701/servicios-extraordinarios.model';

import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

import {
  CATALOGOS_ID,
  TIPO_SOLICITUD,
} from '../../../../shared/constantes/constantes';

import {
  Solicitud5701State,
  Tramite5701Store,
} from '../../../../estados/tramites/tramite5701.store';
import { Subject, delay, map, merge, takeUntil, tap } from 'rxjs';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';

import { FechasService } from '../../../../core/services/shared/fechas/fechas.service';
import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';
import { datosAgregarFormulario } from '../../../../core/models/shared/forms-model';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SeccionState, SeccionStore } from '../../../../estados/seccion.store';
import { SeccionQuery } from '../../../../core/queries/seccion.query';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';
import { DatosArchivo } from '../../../../core/models/shared/components.model';

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
  tipoOperacion: Catalogo[];

  tipoSolicitudSeleccionada: number;

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

  diaMinimo: string;

  private destroyNotifier$: Subject<void> = new Subject();
  private seccion: SeccionState;
  public solicitudState: Solicitud5701State;

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
  ) {}

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
          let seccion: number;
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

  individual(): boolean {
    return this.tipoSolicitudSeleccionada &&
      this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.INDIVIDUAL
      ? true
      : false;
  }

  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field);
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

    merge(
      catTipoSolicitud$,
      catalogoPaises$,
      catalogoAduanas$,
      catalogoAduanas$,
      seccionesAduaneras$,
      tipoOperacion$
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

  // eslint-disable-next-line complexity
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

      datosServicio: this.fb.group(
        {
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
        },
        {
          asyncValidators: this.fechaIntervaloValidator(),
        }
      ),

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

      transporte: this.fb.group({}),

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
   * Validador de intervalo de fechas y horas para un formulario.
   *
   * Este validador verifica que el intervalo entre las fechas y horas de inicio y finalización
   * cumpla con las restricciones específicas según el tipo de solicitud seleccionada.
   *
   * @returns Una función que toma un `FormGroup` y devuelve un objeto con una clave booleana
   *          indicando si el intervalo es inválido, o `null` si el intervalo es válido.
   *
   * @example
   * ```typescript
   * const formGroup = new FormGroup({
   *   datosServicio: new FormGroup({
   *     fechaInicio: new FormControl('2023-01-01'),
   *     fechaFinal: new FormControl('2023-01-02'),
   *     horaInicio: new FormControl('08:00'),
   *     horaFinal: new FormControl('18:00')
   *   })
   * });
   * const validator = fechaIntervaloValidator();
   * const validationResult = validator(formGroup);
   * console.log(validationResult); // null si el intervalo es válido, { invalidIntervalo: true } si no lo es
   * ```
   *
   * @returns {Function} Una función que toma un `FormGroup` y devuelve un objeto con una clave booleana
   *                     indicando si el intervalo es inválido, o `null` si el intervalo es válido.
   */
  fechaIntervaloValidator() {
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    return (group: FormGroup): { [key: string]: boolean } | null => {
      const datosServicio = group.get('datosServicio') as FormGroup;

      const fechaInicio = new Date(
        this.datosServicio?.get('fechaInicio').value
      );
      const fechaFinal = new Date(datosServicio.get('fechaFinal').value);
      const horaInicio = datosServicio.get('horaInicio').value;
      const horaFinal = datosServicio.get('horaFinal').value;
      const intervalDays = this.getIIntervaloDias(
        this.tipoSolicitudSeleccionada
      );

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
          return { invalidIntervalo: true };
        }

        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        if (
          (this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.SEMANAL &&
            differenceInDays > 7) ||
          (this.tipoSolicitudSeleccionada === TIPO_SOLICITUD.MENSUAL &&
            differenceInDays > 30)
        ) {
          return { invalidIntervalo: true };
        }

        if (differenceInTime < 0) {
          return { endDateBeforeStartDate: true };
        }
      }
      return null;
    };
  }

  /**
   * Devuelve el número de días correspondiente a un intervalo específico.
   *
   * @param {number} intervalo - El tipo de intervalo, que puede ser uno de los valores definidos en TIPO_SOLICITUD.
   * @returns {number | null} El número de días correspondiente al intervalo proporcionado, o null si el intervalo no es válido.
   */
  getIIntervaloDias(intervalo: number): number | null {
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

  validarDiferenciaFechas(): void {
    const periodo = parseInt(
      this.FormSolicitud.get('tipoSolicitud')?.value,
      10
    );
    const fechaInicio = new Date(this.datosServicio.get('fechaInicio').value);
    const fechaFin = new Date(this.datosServicio.get('fechaFinal').value);

    let diferenciaPermitidaMin, diferenciaPermitidaMax;
    switch (periodo) {
      case TIPO_SOLICITUD.INDIVIDUAL:
        diferenciaPermitidaMin = 1;
        diferenciaPermitidaMax = 1;
        break;
      case TIPO_SOLICITUD.SEMANAL:
        diferenciaPermitidaMin = 1;
        diferenciaPermitidaMax = 7;
        break;
      case TIPO_SOLICITUD.MENSUAL:
        diferenciaPermitidaMin = 1;
        diferenciaPermitidaMax = 30;
        break;
      default:
        diferenciaPermitidaMin = 0;
        diferenciaPermitidaMax = 0;
    }

    const diferenciaDias =
      (fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 3600 * 24);

    if (
      diferenciaDias < diferenciaPermitidaMin ||
      diferenciaDias > diferenciaPermitidaMax
    ) {
      this.datosServicio
        .get('fechaFinal')
        .setErrors({ diferenciaExcedida: true });
    } else {
      this.datosServicio.get('fechaFinal').setErrors(null);
    }
  }

  // *Eventos de los componentes hijos

  busqueda_rfc(): void {
    const rfcImportExport =
      this.datosImportadorExportador.get('rfcImportExport')?.value;
    // Aqui se hará la busqueda del rfc, para obtener el nombre
    this.llenarCamposDesactivados(
      this.datosImportadorExportador,
      'nombreImportExport'
    );

    const nombreImportExport =
      this.datosImportadorExportador.get('nombreImportExport')?.value;
    this.tramite5701Store.setRfcImportExport(rfcImportExport);
    this.tramite5701Store.setNombreImportExport(nombreImportExport);
  }

  // eslint-disable-next-line class-methods-use-this
  llenarCamposDesactivados(form: FormGroup, field: string): void {
    form.get(field)?.enable();
    form.get(field)?.setValue('DAYNIZ YAEL VELASCO CORONEL');
    form.get(field)?.disable();
  }

  tipoSolicitudSeleccion(): void {
    this.tipoSolicitudSeleccionada =
      this.FormSolicitud.get('tipoSolicitud')?.value;

    const tipoSolicitud = this.FormSolicitud.get('tipoSolicitud')?.value;
    this.tramite5701Store.setTipoSolicitud(tipoSolicitud);
  }

  valorInputCheck(e: DatosInputCheck): void {}

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

    //
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
    if (aduanaValidacion === null) this.validacionPedimento = true;
  }

  darValorCampoFormulario(
    form: FormGroup,
    field: string,
    valor: string | number
  ): void {
    form.get(field)?.setValue(valor);
  }

  socioComercialChange(): void {
    const socioComercial =
      this.datosImportadorExportador.get('socioComercial')?.value;
    if (socioComercial) {
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
  setValoresStore(form: FormGroup, campo: string, metodoNombre: string): void {
    const valor = form.get(campo)?.value;
    this.tramite5701Store[metodoNombre](valor);
  }

  /**
   * Cambia la hora final del servicio.
   *
   * Esta función actualiza la validez de los datos del servicio y establece
   * los valores correspondientes en el store.
   *
   * @returns {void} No retorna ningún valor.
   */
  changeFechaFinal(): void {
    this.datosServicio.updateValueAndValidity();
    this.setValoresStore(this.datosServicio, 'fechaFinal', 'setFechaFinal');
  }

  /**
   * Updates the validity of the `datosServicio` form control and sets the final hour value in the store.
   *
   * This method performs the following actions:
   * 1. Calls `updateValueAndValidity` on the `datosServicio` form control to re-evaluate its validity.
   * 2. Invokes `setValoresStore` to update the store with the final hour value.
   *
   * @returns {void}
   */
  changeHoraFinal(): void {
    this.datosServicio.updateValueAndValidity();
    this.setValoresStore(this.datosServicio, 'horaFinal', 'setHoraFinal');
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
