import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { Catalogo } from '../../../../core/models/5701/catalogos.model';
import {
  CatalogosSelect,
  DatosInputCheck,
  InputCheck,
  InputFecha,
  InputHora,
} from '../../../../core/models/shared/components.model';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  SEMANA_D,
  SOCIO_COMERCIAL,
} from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';
import { datosAgregarFormulario } from '../../../../core/models/shared/forms-model';
import { DatosComponentePedimento } from '../../../../core/models/5701/servicios-extraordinarios.model';

@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent {
  datosTiposSolicitud!: CatalogosSelect;
  paisesOrigen!: CatalogosSelect;
  paisesProcedencia!: CatalogosSelect;
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
    private sExtraordinarios: ServiciosExtraordinariosService,
    private fb: FormBuilder,
    private fService: FormulariosService,
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



  get datosImportadorExportador() {
    return this.FormSolicitud.get('datosImportadorExportador') as FormGroup;
  }

  get datosServicio() {
    return this.FormSolicitud.get('datosServicio') as FormGroup;
  }

  get despacho() {
    return this.FormSolicitud.get('despacho') as FormGroup;
  }

  get pedimento() {
    return this.FormSolicitud.get('pedimento') as FormGroup;
  }

  get personasResponsablesDespacho() {
    return this.FormSolicitud.get('personasResponsablesDespacho') as FormArray;
  }

  // * Peticiones a las apis
  getTiposSolicitud(): void {
    this.sExtraordinarios
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_SOL)
      .subscribe((resp) => {
        console.log(resp);

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
    this.sExtraordinarios
      .getCatalogo(CATALOGOS_ID.CAT_PAISES)
      .subscribe((resp) => {

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
      });
  }

  getAduanas(): void {
    this.sExtraordinarios
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
    return this.tipoSolSeleccionada && this.tipoSolSeleccionada.id === 1
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
  paisOrigen(pais: Catalogo) {
    console.log(pais);
  }

  paisProcedencia(pais: Catalogo) {
    console.log(pais);
  }

  busqueda_rfc() {
    const rfc =
      this.datosImportadorExportador.get('rfcImportExport')?.value;
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
    this.datosImportadorExportador.get('programaFomentoValue')?.setValue(e.valor);
  }

  immexSeleccion(e: DatosInputCheck) {
    this.datosImportadorExportador.get('immex')?.setValue(e.check);
    this.datosImportadorExportador.get('immexValue')?.setValue(e.valor);
  }

  industriaAutomotrizSeleccion(e: DatosInputCheck) {
    this.datosImportadorExportador.get('industriaAutomotriz')?.setValue(e.check);
    this.datosImportadorExportador.get('industriaAutomotrizValue')?.setValue(e.valor);
  }

  valorInputCheck(e: DatosInputCheck) {
    console.log(e);

  }

  obtenerHora(e: string, tipo: string) {
    if (tipo === 'i') {
      this.datosServicio.get('horaInicio')?.setValue(e);
    } else if (tipo === 'f') {
      switch (this.tipoSolSeleccionada.id) {
        case 1:
          this.datosServicio.get('horaFinal')?.setValue(e);

          const fechaInicial = this.datosServicio.get('fechaInicio')?.value;
          const fechaFinal = this.datosServicio.get('fechaFinal')?.value;

          break;
        case 2:
          console.log(this.tipoSolSeleccionada.descripcion);
          break;
        case 3:
          console.log(this.tipoSolSeleccionada.descripcion);
          break;
      }
      this.rango_fechas();
    }
  }

  rango_fechas() {
    const fechaInicial = this.datosServicio.get('fechaInicio')?.value;
    const fechaFinal = this.datosServicio.get('fechaFinal')?.value;

    const formatoFechaInicial = this.formato_fecha(fechaInicial);
    const formatoFechaFinal = this.formato_fecha(fechaFinal);

    this.selectRangoDias = this.obtenerDiasEntreFechas(formatoFechaInicial, formatoFechaFinal);

    this.colapsable = true;
  }

  obtenerDiasEntreFechas(fechaInicio: string, fechaFinal: string): Array<string> {
    const [dia_in, mes_in, anio_in] = fechaInicio.split('-').map(Number);
    const [dia_fi, mes_fi, anio_fi] = fechaFinal.split('-').map(Number);

    let fechaActual = new Date(anio_in, mes_in - 1, dia_in);
    const fe_final = new Date(anio_fi, mes_fi - 1, dia_fi);
    const dias = [];

    while (fechaActual <= new Date(fe_final)) {
      // Formatear la fecha actual en formato Día de la semana, DD/MM/YYYY, HH:MM
      const diaSemana = this.obtenerNombreDiaSemana(fechaActual);
      const dia = String(fechaActual.getDate()).padStart(2, '0');
      const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
      const año = fechaActual.getFullYear();
      dias.push(`${diaSemana}, ${dia}/${mes}/${año}`); // Incrementar la fecha en un día
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return dias;
  }

  obtenerNombreDiaSemana(fecha: Date) {
    const diasSemana = SEMANA_D;
    return diasSemana[fecha.getDay()];
  }

  formato_fecha(fecha: string): string {
    const [anio, mes, dia] = fecha.split('/');
    return `${anio}-${mes}-${dia}`;
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
