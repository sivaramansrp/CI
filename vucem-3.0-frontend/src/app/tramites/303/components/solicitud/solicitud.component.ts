import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { Catalogo, CatalogoPaises } from '../../../../core/models/shared/catalogos.model';
import {
  CatalogosSelect,
  CatalogosSelectPaises,
  DatosInputCheck,
  InputCheck,
  InputFecha,
  InputHora,
} from '../../../../core/models/shared/components.model';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
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
  CATALOGOS_ID,
  TIPO_SOLICITUD,
} from '../../../../shared/constantes/constantes';
import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';
import { datosAgregarFormulario } from '../../../../core/models/shared/forms-model';
import { DatosComponentePedimento } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { FechasService } from '../../../../core/services/shared/fechas/fechas.service';
import { DatosParaValidacionFecha } from '../../../../core/models/shared/fechas.model';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';

@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent {
  datosTiposSolicitud!: CatalogosSelect;
  paisesOrigen!: CatalogoPaises[];
  paisesProcedencia!: CatalogoPaises[];
  aduanas!: CatalogosSelect;
  seccionAduanera!: CatalogosSelect;

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

  selectRangoDias: Array<string> = [];

  // Pedimento -crea una señal para validar
  validacionPedimento: boolean = false;
  datosPedimentoComponente!: DatosComponentePedimento;

  solIndividual!: boolean;

  constructor(
    private fechaService: FechasService,
    private fb: FormBuilder,
    private fService: FormulariosService,
    private catalogosServices: CatalogosService,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.crearFormSolicitud();
  }

  ngOnInit(): void {
    this.getTiposSolicitud();
    this.getPaises();
    this.getAduanas();
    this.getSeccionAduanera();

    // Aqui se busca el nro de patente o autorizacion
    this.obtenerPatente();
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

  // * Peticiones a las apis

  /**
   * Obtiene los tipos de solicitud desde el catálogo y los asigna a `datosTiposSolicitud`.
   *
   * Este método realiza una solicitud al servicio `catalogosServices` para obtener el catálogo de tipos de solicitud identificado por `CATALOGOS_ID.CAT_TIPO_SOL`. Una vez que recibe la  respuesta, verifica si la respuesta contiene elementos. Si es así, asigna los datos recibidos a la propiedad `datosTiposSolicitud` con la estructura adecuada.
   *
   * @returns {void} No retorna ningún valor.
   */
  getTiposSolicitud(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_SOL)
      .subscribe((resp) => {
        if (resp.length > 0) {
          this.datosTiposSolicitud = {
            labelNombre: 'Tipo de solicitud',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: resp,
          };
        }
      });
  }

  getPaises(): void {
    this.catalogosServices
      .getCatalogoPaises(CATALOGOS_ID.CAT_PAISES)
      .subscribe((resp) => {
        if (resp.length > 0) {
          this.paisesOrigen = resp;
          this.paisesProcedencia = resp;
        }
      });
  }

  getAduanas(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_ADUANAS)
      .subscribe((resp) => {
        if (resp.length > 0) {
          this.aduanas = {
            labelNombre: 'Aduana',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: resp,
          };
        }
      });
  }

  getSeccionAduanera(): void {}

  obtenerPatente() {
    // Busqueda de la patente a algun endpoint
    const datosPatente: datosAgregarFormulario = {
      form: this.despacho,
      field: 'patente',
      valor: '3061',
    };
    this.fService.agregarValorCamposDesactivados(datosPatente);
  }

  // ************************************************************

  individual(): boolean {
    return this.tipoSolSeleccionada &&
      this.tipoSolSeleccionada.id === TIPO_SOLICITUD.INDIVIDUAL
      ? true
      : false;
  }

  isValid(form: FormGroup, field: string) {
    return this.validacionesService.isValid(form, field);
  }

  crearFormSolicitud() {
    this.FormSolicitud = this.fb.group({
      tipoSolicitud: [{ value: '', requerid: true }, [Validators.required]],
      datosImportadorExportador: this.fb.group({
        rfcImportExport: [
          '',
          [
            Validators.required,
            Validators.pattern(this.validacionesService.rfcPattern),
          ],
        ],
        nombreImportExport: [
          { value: '', disabled: true },
          [Validators.required],
        ],
        nroRegistro: ['', [Validators.maxLength(25)]],
        programaFomento: [false],
        programaFomentoValue: [''],
        immex: [false],
        immexValue: [''],
        industriaAutomotriz: [false],
        industriaAutomotrizValue: [''],
        tipoEmpresaCertificada: [''],
        idSocioComercial: [''],
        socioComercial: [false],
        opEconomicoAut: [false],
        revisionOrigen: [false],
      }),

      datosServicio: this.fb.group({
        fechaInicio: [{ value: '', disabled: true }, [Validators.required]],
        fechaFinal: [[{ value: '', disabled: true }, [Validators.required]]],
        horaInicio: ['', Validators.required],
        horaFinal: ['', Validators.required],
      }),

      despacho: this.fb.group({
        tipo: [''],
        autorizacion: [''],
        idAduana: [null, [Validators.required]],
        descripcionAduana: ['', [Validators.required]],
        seccionAduanera: [''],
        nombreRecinto: [''],
        tipoOperacion: [''],
        patente: [{ value: '', disabled: true }],
        relacionSociedad: [],
        encargoConferido: [],
        domicilio: ['', Validators.required],
      }),

      mercancia: this.fb.group({
        paisOrigen: ['', Validators.required],
        paisProcedencia: ['', Validators.required],
        descripcion: ['', Validators.required],
        justificacion: ['', Validators.required],
      }),

      pedimento: this.fb.group({
        idPedimento: [''],
        datosPedimento: this.fb.group({
          patente: [],
          pedimento: [],
          aduana: [],
          tipoPedimento: [],
          numeros: [],
          comprobanteValor: [],
          pedimentoValidado: [],
        }),
      }),

      personasResponsablesDespacho: this.fb.array([]),
    });
  }

  fechaInicio() {
    const fechaInicio = this.datosServicio.get('fechaInicio')?.value;
    return fechaInicio;
  }

  cambioFechaInicio(nuevo_valor: string) {
    this.datosServicio.get('fechaInicio')?.setValue(nuevo_valor);
    this.datosServicio.get('fechaInicio')?.markAsUntouched();
  }

  cambioFechaFinal(nuevo_valor: string) {
    this.datosServicio.get('fechaFinal')?.setValue(nuevo_valor);
    this.datosServicio.get('fechaFinal')?.markAsUntouched();
  }

  // *Eventos de los componentes hijos
  paisOrigen(pais: CatalogoPaises) {
    console.log(pais);
  }

  paisProcedencia(pais: CatalogoPaises) {
    console.log(pais);
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
  }

  validarFormulario() {
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

      const rangoFecha = {
        fechaInicio: this.fechaService.formatoFechaGuion(fechaInicial, false),
        horaInicio: horaInicial,
        fechaFin: this.fechaService.formatoFechaGuion(fechaFinal, false),
        horaFin: horaFinal,
      };
      this.validaRangoFechas(rangoFecha);
    }
  }

  validaRangoFechas(datos: DatosParaValidacionFecha): void {
    switch (this.tipoSolSeleccionada.id) {
      case TIPO_SOLICITUD.INDIVIDUAL:
        const rangoFechaValida = this.fechaService.validacion24Horas(datos);
        if (!rangoFechaValida) {
          // Aqui se muestra un mensaje de error
          alert('El rango de fechas no puede ser mayor a 24 horas');
          return;
        }
        this.rango_fechas();

        break;
      case TIPO_SOLICITUD.SEMANAL:
        const rangoFechaSemana = this.fechaService.validacionSemana(datos);
        if (!rangoFechaSemana) {
          // Aqui se muestra un mensaje de error
          alert('El rango de fechas no puede ser mayor a una semana');
          return;
        }
        this.rango_fechas();
        break;
      case TIPO_SOLICITUD.MENSUAL:
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
    const patente = this.fService.convertirValorANumero(
      this.despacho,
      'patente'
    );
    const idAduana = this.fService.convertirValorANumero(
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
}
