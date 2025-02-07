import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  DESPACHO_DD,
  DESPACHO_LDA,
  FECHA_FINAL,
  FECHA_INICIO,
  HORA_FINAL,
  HORA_INICIO,
  IMMEX,
  INDUSTRIA_AUTOMOTRIZ,
  PROGRAMA_FOMENTO,
  SOCIO_COMERCIAL,
} from '../../../../shared/constantes/servicios-extraordinarios.enum';

import {
  Catalogo,
  CatalogoPaises,
} from '../../../../core/models/shared/catalogos.model';
import {
  CatalogosSelect,
  CatalogosSelectPaises,
  DatosInputCheck,
  InputCheck,
  InputFecha,
  InputHora,
} from '../../../../core/models/shared/components.model';

import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

import {
  CATALOGOS_ID,
  TIPO_SOLICITUD,
} from '../../../../shared/constantes/constantes';
import { MILISEGUNDOS } from '../../../../shared/constantes/constantes';

import {
  Solicitud5701State,
  Tramite5701Store,
} from '../../../../estados/tramites/tramite5701.store';
import {
  Observable,
  Subject,
  Subscription,
  delay,
  map,
  merge,
  takeUntil,
  tap,
} from 'rxjs';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';
import {
  DatosComponentePedimento,
  DatosDespacho,
  DatosImportadorExportador,
  DatosPago,
  DatosPedimento,
  DatosServicio,
  Personas,
  ResponsablesDespacho,
} from '../../../../core/models/5701/servicios-extraordinarios.model';
import { DatosMercancia } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { DatosParaValidacionFecha } from '../../../../core/models/shared/fechas.model';
import { FechasService } from '../../../../core/services/shared/fechas/fechas.service';
import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';
import { datosAgregarFormulario } from '../../../../core/models/shared/forms-model';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SeccionState, SeccionStore } from '../../../../estados/seccion.store';
import { SeccionQuery } from '../../../../core/queries/seccion.query';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  @Input({ required: true }) tabindex!: number;

  datosTiposSolicitud!: CatalogosSelect;
  paisesOrigen!: CatalogosSelectPaises;
  paisesProcedencia!: CatalogosSelectPaises;
  aduanas!: CatalogosSelect;
  seccionAduanera!: any;

  tipoSolSeleccionada!: Catalogo;

  programaFomento: InputCheck = PROGRAMA_FOMENTO;
  immex: InputCheck = IMMEX;
  industriaAutomotriz: InputCheck = INDUSTRIA_AUTOMOTRIZ;
  socioComercial: InputCheck = SOCIO_COMERCIAL;

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

  solIndividual!: boolean;
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

    //Validacion si tenemos datos guardados en el store
    const datosForma5701 = this.tramite5701Query.getFormaTramite5071();

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

    //this.fillForm(datosForma5701);

    // Aqui se busca el nro de patente o autorizacion
    this.obtenerPatente();

    this.FormSolicitud.statusChanges.pipe(
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
    ).subscribe();

    this.datosServicio.get('fechaInicio').valueChanges.subscribe((_value) => {
      this.validaFechas();
    });

    this.datosServicio.get('fechaFinal').valueChanges.subscribe((_value) => {
      this.validaFechas();
    });

    /* Suscripcion a los FormGroup para guardar su informacion en el store */
    this.FormSolicitud.get('tipoSolicitud')?.valueChanges.subscribe((value) => {
      this.tramite5701Store.guardaTipoSolicitud(value);
    });

    this.datosImportadorExportador.valueChanges.subscribe((_value) => {
      const valor = this.datosImportadorExportador.getRawValue();
      this.tramite5701Store.guadarDatosImportadorExportador(valor);
    });

    this.datosServicio.valueChanges.subscribe((value) => {
      this.tramite5701Store.guardaDatosServicio(value);
    });

    this.despacho.valueChanges.subscribe((value) => {
      this.tramite5701Store.guardarDatosDespacho(value);
    });

    this.mercancia.valueChanges.subscribe((value) => {
      this.tramite5701Store.guardarDatosMercancia(value);
    });

    this.pedimento.valueChanges.subscribe((value) => {
      this.tramite5701Store.guardarDatosPedimento(value);
    });

    this.personasResponsablesDespacho.valueChanges.subscribe((value) => {
      this.tramite5701Store.guardarPersonasResponsablesDespacho(value);
    });

    this.pagoCaptura.valueChanges.subscribe((value) => {
      this.tramite5701Store.guardarDatosPago(value);
    });

    // this.datosServicio.valueChanges.subscribe((value) => {
    //   this.tramite5701Store.guardaDatosServicio(value);
    // });
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
    return this.FormSolicitud.get('datosServicio') as FormGroup;
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
    return this.tipoSolSeleccionada &&
      this.tipoSolSeleccionada.id === TIPO_SOLICITUD.INDIVIDUAL
      ? true
      : false;
  }

  isValid(form: FormGroup, field: string) {
    return this.validacionesService.isValid(form, field);
  }

  private inicializaCatalogos() {
    /**
     * Obtiene los tipos de solicitud desde el catálogo y los asigna a `datosTiposSolicitud`.
     *
     * Este método realiza una solicitud al servicio `catalogosServices` para obtener el catálogo de tipos de solicitud identificado por `CATALOGOS_ID.CAT_TIPO_SOL`. Una vez que recibe la  respuesta, verifica si la respuesta contiene elementos. Si es así, asigna los datos recibidos a la propiedad `datosTiposSolicitud` con la estructura adecuada.
     */
    const catTipoSolicitud$ = this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_TIPO_SOL).pipe(
      map((resp) => {
        this.datosTiposSolicitud = {
          labelNombre: 'Tipo de solicitud',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: resp,
        };
      }),
      takeUntil(this.destroyNotifier$),
    );

    const catalogoPaises$ = this.catalogosServices.getCatalogoPaises(CATALOGOS_ID.CAT_PAISES).pipe(
      map((resp) => {
        if (resp.length > 0) {
          this.paisesOrigen = {
            labelNombre: 'País de origen',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: resp,
          };

          this.paisesProcedencia = {
            labelNombre: 'País de procedencia',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: resp,
          };
        }
      }),
    );

    const catalogoAduanas$ = this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_ADUANAS).pipe(
      map((resp) => {
        if (resp.length > 0) {
          this.aduanas = {
            labelNombre: 'Aduana',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: resp,
          };
        }
      }),
    );

    merge(
      catTipoSolicitud$, catalogoPaises$, catalogoAduanas$, catalogoAduanas$
    ).subscribe();
  }

  getSeccionesAduaneras(): void {
    this.catalogosServices
      .getCatalogoById(CATALOGOS_ID.CAT_SECCION_ADUANAS)
      .subscribe((resp) => {
        this.seccionAduanera = JSON.parse(resp.data);
        console.log(this.seccionAduanera);
      });
  }

  obtenerPatente() {
    // Busqueda de la patente a algun endpoint
    const datosPatente: datosAgregarFormulario = {
      form: this.despacho,
      field: 'patente',
      valor: '3061',
    };
    this.formulariosService.agregarValorCamposDesactivados(datosPatente);
  }

  crearFormSolicitud() {
    this.FormSolicitud = this.fb.group({
      tipoSolicitud: [{ value: '', requerid: true }, [Validators.required]],
      datosImportadorExportador: this.fb.group({
        rfcImportExport: [
          this.solicitudState?.datosImportadorExportador?.rfcImportExport,
          [
            Validators.required,
            Validators.pattern(this.validacionesService.rfcPattern),
          ],
        ],
        nombreImportExport: [{ value: this.solicitudState?.datosImportadorExportador?.nombreImportExport, disabled: true }],
        nroRegistro: [this.solicitudState?.datosImportadorExportador?.nroRegistro, [Validators.maxLength(25)]],
        programaFomento: [this.solicitudState?.datosImportadorExportador?.programaFomento],
        immex: [this.solicitudState?.datosImportadorExportador?.immex],
        industriaAutomotriz: [this.solicitudState?.datosImportadorExportador?.industriaAutomotriz],
        tipoEmpresaCertificada: [this.solicitudState?.datosImportadorExportador?.tipoEmpresaCertificada],
        socioComercial: [this.solicitudState?.datosImportadorExportador?.idSocioComercial],
        opEconomicoAut: [this.solicitudState?.datosImportadorExportador?.opEconomicoAut],
        revisionOrigen: [this.solicitudState?.datosImportadorExportador?.revisionOrigen],
        idSocioComercial: [{ value: this.solicitudState?.datosImportadorExportador?.idSocioComercial, disabled: true }],
      }),

      datosServicio: this.fb.group({
        fechaInicio: [
          this.solicitudState?.datosServicio?.fechaInicio,
          [Validators.required, this.validacionesService.validaFechaNoHoy,],
        ],
        fechaFinal: [
          this.solicitudState?.datosServicio?.fechaFinal,          
          [Validators.required, this.validacionesService.validaFechaNoHoy],
        ],
        horaInicio: [this.solicitudState?.datosServicio?.horaInicio, Validators.required],
        horaFinal: [this.solicitudState?.datosServicio?.horaFinal, Validators.required],
        fechasSeleccionadas: this.fb.array([]),
      }),

      despacho: this.fb.group({
        despacho: [this.solicitudState?.despacho?.despacho],
        autorizacion: [this.solicitudState?.despacho?.rfcAutorizacion],
        idAduana: [this.solicitudState?.despacho?.idAduana, [Validators.required]],
        descripcionAduana: [this.solicitudState?.despacho?.descripcionAduana, [Validators.required]],
        idSeccionAduanera: [this.solicitudState?.despacho?.idSeccionAduanera],
        seccionAduanera: [this.solicitudState?.despacho?.seccionAduanera],
        nombreRecinto: [this.solicitudState?.despacho?.nombreRecinto],
        tipoOperacion: [this.solicitudState?.despacho?.tipoOperacion],
        patente: [{ value: this.solicitudState?.despacho?.patente, disabled: true }],
        relacionSociedad: [this.solicitudState?.despacho?.relacionSociedad],
        encargoConferido: [this.solicitudState?.despacho?.encargoConferido],
        domicilio: [this.solicitudState?.despacho?.domicilio],
      }),

      mercancia: this.fb.group({
        paisOrigen: [this.solicitudState?.mercancia?.paisOrigen, Validators.required],
        paisProcedencia: [this.solicitudState?.mercancia?.paisProcedencia, Validators.required],
        descripcion: [this.solicitudState?.mercancia?.descripcion, Validators.required],
        justificacion: [this.solicitudState?.mercancia?.justificacion, Validators.required],
      }),

      pedimento: this.fb.group({
        idPedimento: [this.solicitudState?.pedimento?.idPedimento],
        datosPedimento: this.fb.group({
          patente: [this.solicitudState?.pedimento?.patente],
          pedimento: [this.solicitudState?.pedimento?.pedimento],
          aduana: [this.solicitudState?.pedimento?.aduana],
          tipoPedimento: [this.solicitudState?.pedimento?.tipoPedimento],
          numeros: [this.solicitudState?.pedimento?.numero],
          comprobanteValor: [this.solicitudState?.pedimento?.comprobanteValor],
          pedimentoValidado: [this.solicitudState?.pedimento?.pedimentoValidado],
        }),
      }),

      personasResponsablesDespacho: this.fb.array([]),

      transporte: this.fb.group({}),

      pagoCaptura: this.fb.group({
        montoAPagar: [{ value: this.solicitudState?.pagoCaptura?.montoPagar, disabled: true }],
        lineaCaptura: [this.solicitudState?.pagoCaptura?.lineaCaptura, [Validators.required]],
        monto: [this.solicitudState?.pagoCaptura?.monto, [Validators.required]],
      }),
    });
  }

  validaFechas() {
    const fechaInicio = this.fechaService.parseDate(
      this.datosServicio.get('fechaInicio')?.value
    );
    const fechaFinal = this.fechaService.parseDate(
      this.datosServicio.get('fechaFinal')?.value
    );

    let valido = false;
    const diferenciaFecha = fechaFinal.getTime() - fechaInicio.getTime();

    switch (this.tipoSolSeleccionada.id) {
      case TIPO_SOLICITUD.INDIVIDUAL: {
        valido = diferenciaFecha < MILISEGUNDOS.DIA && diferenciaFecha > 0;
        break;
      }
      case TIPO_SOLICITUD.SEMANAL: {
        valido = diferenciaFecha < MILISEGUNDOS.SEMANA && diferenciaFecha > 0;
        break;
      }
      case TIPO_SOLICITUD.MENSUAL: {
        valido = diferenciaFecha < MILISEGUNDOS.MES && diferenciaFecha > 0;
        break;
      }
    }

    if (!valido) {
      this.datosServicio
        .get('fechaFinal')
        ?.setErrors({ fechaFinalInvalida: true });
    } else {
      this.datosServicio.get('fechaFinal')?.setErrors(null);
    }
  }

  // *Eventos de los componentes hijos
  paisOrigen(pais: CatalogoPaises) {
    this.mercancia.get('paisOrigen')?.setValue(pais.id);
  }

  paisProcedencia(pais: CatalogoPaises) {
    this.mercancia.get('paisProcedencia')?.setValue(pais.id);
  }

  busqueda_rfc() {
    const rfc = this.datosImportadorExportador.get('rfcImportExport')?.value;
    // Aqui se hará la busqueda del rfc, para obtener el nombre

    this.llenarCamposDesactivados(
      this.datosImportadorExportador,
      'nombreImportExport'
    );
  }

  llenarCamposDesactivados(form: FormGroup, field: string) {
    form.get(field)?.enable();
    form.get(field)?.setValue('DAYNIZ YAEL VELASCO CORONEL');
    form.get(field)?.disable();
  }

  tipoSolicitud(e: Catalogo) {
    this.tipoSolSeleccionada = e;
    this.solIndividual = this.individual();
    this.FormSolicitud.get('tipoSolicitud')?.setValue(e.id);
  }

  /**
   * Valida el formulario
   */
  validarFormulario(): void {
    if (this.FormSolicitud.invalid) {
      this.FormSolicitud.markAllAsTouched();
      return;
    }
  }

  programaFomentoF(e: DatosInputCheck) {
    this.datosImportadorExportador.get('programaFomento')?.setValue(e.check);
    this.datosImportadorExportador
      .get('programaFomentoValue')
      ?.setValue(e.valor);
  }

  immexSeleccion(e: DatosInputCheck) {
    this.datosImportadorExportador.get('immex')?.setValue(e.check);
    this.datosImportadorExportador.get('immexValue')?.setValue(e.valor);
  }

  industriaAutomotrizSeleccion(e: DatosInputCheck) {
    this.datosImportadorExportador
      .get('industriaAutomotriz')
      ?.setValue(e.check);
    this.datosImportadorExportador
      .get('industriaAutomotrizValue')
      ?.setValue(e.valor);
  }

  valorInputCheck(e: DatosInputCheck) {
    console.log(e);
  }

  obtenerHora(e: string, tipo: string) {
    if (tipo === 'i') {
      this.datosServicio.get('horaInicio')?.setValue(e);
    } else if (tipo === 'f') {
      this.datosServicio.get('horaFinal')?.setValue(e);

      const fechaInicial = this.datosServicio.get('fechaInicio')?.value;
      const fechaFinal = this.datosServicio.get('fechaFinal')?.value;
      const horaInicial = this.datosServicio.get('horaInicio')?.value;
      const horaFinal = this.datosServicio.get('horaFinal')?.value;

      if (fechaInicial && fechaFinal && horaInicial && horaFinal) {
        const rangoFecha = {
          fechaInicio: this.fechaService.formatoFechaGuion(fechaInicial, false),
          horaInicio: horaInicial,
          fechaFin: this.fechaService.formatoFechaGuion(fechaFinal, false),
          horaFin: horaFinal,
        };
        this.validaRangoFechas(rangoFecha);
      }
    }
  }

  validaRangoFechas(datos: DatosParaValidacionFecha): void {
    switch (this.tipoSolSeleccionada.id) {
      case TIPO_SOLICITUD.INDIVIDUAL: {
        const rangoFechaValida = this.fechaService.validacion24Horas(datos);
        if (!rangoFechaValida) {
          // Aqui se muestra un mensaje de error
          alert('El rango de fechas no puede ser mayor a 24 horas');
          return;
        }
        this.rango_fechas();
        break;
      }
      case TIPO_SOLICITUD.SEMANAL: {
        const rangoFechaSemana = this.fechaService.validacionSemana(datos);
        if (!rangoFechaSemana) {
          // Aqui se muestra un mensaje de error
          alert('El rango de fechas no puede ser mayor a una semana');
          return;
        }
        this.rango_fechas();
        break;
      }
      case TIPO_SOLICITUD.MENSUAL: {
        const rangoFechaMes = this.fechaService.validacionMes(datos);
        if (!rangoFechaMes) {
          // Aqui se muestra un mensaje de error
          alert('El rango de fechas no puede ser mayor a un mes');
          return;
        }
        this.rango_fechas();
        break;
      }
    }
  }

  rango_fechas() {
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

  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

  aduanaSeleccion(aduana: Catalogo) {
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

  validaCampoPedimento() {
    const aduanaValidacion = this.isValid(this.despacho, 'descripcionAduana');
    if (aduanaValidacion === null) this.validacionPedimento = true;
  }

  darValorCampoFormulario(
    form: FormGroup,
    field: string,
    valor: string | number
  ) {
    form.get(field)?.setValue(valor);
  }

  socioComercialChange() {
    const socioComercial =
      this.datosImportadorExportador.get('socioComercial')?.value;
    if (socioComercial) {
      this.datosImportadorExportador.get('idSocioComercial')?.enable();
    } else {
      this.datosImportadorExportador.get('idSocioComercial')?.disable();
    }
  }

  validarCamposNull(solicitud: Solicitud5701State): boolean {
    for (const llave in solicitud) {
      if (
        solicitud[llave] !== null &&
        (!Array.isArray(solicitud[llave]) || solicitud[llave].length > 0)
      ) {
        return true;
      }
    }
    return false;
  }

  fillForm(data: Partial<Solicitud5701State>) {
    this.fillFormRecursive(this.FormSolicitud, data);
  }

  fillFormRecursive(
    form: FormGroup | FormArray,
    data: Partial<
      | Solicitud5701State
      | DatosImportadorExportador
      | DatosServicio
      | DatosDespacho
      | DatosMercancia
      | DatosPedimento
      | DatosPago
      | Personas
      | ResponsablesDespacho
    >
  ) {
    Object.keys(data).forEach((key) => {
      const control = form.get(key);
      if (
        control &&
        data[key as keyof typeof data] !== null &&
        data[key as keyof typeof data] !== undefined
      ) {
        if (control instanceof FormGroup || control instanceof FormArray) {
          this.fillFormRecursive(
            control,
            data[key as keyof typeof data] as Partial<
              | Solicitud5701State
              | DatosImportadorExportador
              | DatosServicio
              | DatosDespacho
              | DatosMercancia
              | DatosPedimento
              | DatosPago
              | Personas
              | ResponsablesDespacho
            >
          );
        } else {
          control.setValue(data[key as keyof typeof data]);
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
