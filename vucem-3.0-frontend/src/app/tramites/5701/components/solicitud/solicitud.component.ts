import { Component } from '@angular/core';
import { Catalogo } from '../../../../core/models/5701/catalogos.model';
import {
  CatalogosSelect,
  DatosInputCheck,
  InputCheck,
  InputFecha,
  InputHora,
} from '../../../../core/models/shared/components.model';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  SEMANA,
  SEMANA_D,
  SOCIO_COMERCIAL,
} from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';

@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent {
  datos_tipos_solicitud!: CatalogosSelect;
  paises_o!: CatalogosSelect;
  paises_p!: CatalogosSelect;
  aduanas!: CatalogosSelect;
  seccion_aduanera!: CatalogosSelect;


  tipo_sol_seleccionada!: Catalogo;
  tipo_sol_sel_valor!: number;

  programa_fomento: InputCheck = PROGRAMA_FOMENTO;
  immex: InputCheck = IMMEX;
  industria_automotriz: InputCheck = INDUSTRIA_AUTOMOTRIZ;
  socio_comercial: InputCheck = SOCIO_COMERCIAL;

  despacho_dd = DESPACHO_DD;
  despacho_lda = DESPACHO_LDA;

  hora_inicio: InputHora = HORA_INICIO;
  hora_final: InputHora = HORA_FINAL;

  fecha_inicio: InputFecha = FECHA_INICIO;
  fecha_final: InputFecha = FECHA_FINAL;

  FormSolicitud!: FormGroup;

  colapsable: boolean = false;

  selectRangoDias: Array<string> = [];

  constructor(
    private sExtraordinarios: ServiciosExtraordinariosService,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.crearFormSolicitud();
  }

  ngOnInit() {
    this.getTiposSolicitud();
    this.getPaises();
    this.getAduanas();
    this.getSeccionAduanera();
  }


  get datos_servicio() {
    return this.tipo_sol_seleccionada && this.tipo_sol_seleccionada.id !== 1
      ? true
      : false;
  }

  get datos_importador_exportador() {
    return this.FormSolicitud.get('datos_importador_exportador') as FormGroup;
  }

  get d_servicio() {
    return this.FormSolicitud.get('datos_servicio') as FormGroup;
  }

  crearFormSolicitud() {
    this.FormSolicitud = this.fb.group({
      tipo_solicitud: [{ value: '', requerid: true }, [Validators.required]],
      datos_importador_exportador: this.fb.group({
        rfc_import_export: [
          '',
          [
            Validators.required,
            Validators.pattern(this.validacionesService.rfc_pf_pattern),
          ],
        ],
        nombre_import_export: [
          { value: '', disabled: true },
          [Validators.required],
        ],
        nro_registro: ['', [Validators.required]],
        programa_fomento: [false],
        programa_fomento_value: [''],
        immex: [false],
        immex_value: [''],
        industria_automotriz: [false],
        industria_automotriz_value: [''],
        tipo_empresa_certificada: [''],
        id_socio_comercial: [''],
        socio_comercial: [false],
        op_economico_aut: [false],
        revision_origen: [false],
      }),

      datos_servicio: this.fb.group({
        f_inicio: [{ value: '', disabled: true }, [Validators.required]],
        f_final: [[{ value: '', disabled: true }, [Validators.required]]],
        h_inicio: ['', Validators.required],
        h_final: ['', Validators.required],
      }),

      despacho: this.fb.group({
        tipo: [''],
        autorizacion: [''],
        aduana: [''],
        seccion_aduanera: [''],
        nombre_recinto: [''],
        tipo_operacion: [''],
        patente: [''],
        relacion_sociedad: [],
        encargo_conferido: [],
        domicilio: ['', Validators.required],
      }),

      mercancia: this.fb.group({
        pais_origen: ['', Validators.required],
        pais_procedencia: ['', Validators.required],
        descripcion: ['', Validators.required],
        justificacion: ['', Validators.required],
      }),

      pedimento: this.fb.group({
        id_pedimento: [''],
        datos_pedimento: this.fb.group({
          patente: [],
          pedimento: [],
          aduana: [],
          tipo_pedimento: [],
          numeros: [],
          comprobante_valor: [],
          pedimento_validado: [],
        })
      }),


    });
  }

  fechaInicio() {
    const fecha_inicio = this.d_servicio.get('f_inicio')?.value;
    return fecha_inicio;
  }

  cambioFechaInicio(nuevo_valor: string) {
    this.d_servicio.get('f_inicio')?.setValue(nuevo_valor);
    this.d_servicio.get('f_inicio')?.markAsUntouched();
  }

  cambioFechaFinal(nuevo_valor: string) {
    this.d_servicio.get('f_final')?.setValue(nuevo_valor);
    this.d_servicio.get('f_final')?.markAsUntouched();
  }

  isValid(form: FormGroup, field: string) {
    return this.validacionesService.isValidField(form, field);
  }

  getTiposSolicitud() {
    this.sExtraordinarios
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_SOL)
      .subscribe((resp) => {
        if (resp.codigo === '200') {
          this.datos_tipos_solicitud = {
            labelNombre: 'Tipo de solicitud',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: JSON.parse(resp.data),
          };
        }
      });
  }

  getPaises() {
    this.sExtraordinarios
      .getCatalogo(CATALOGOS_ID.CAT_PAISES)
      .subscribe((resp) => {
        if (resp.codigo === '200') {
          this.paises_o = {
            labelNombre: 'País de origen',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: JSON.parse(resp.data),
          };

          this.paises_p = {
            labelNombre: 'País de procedencia',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: JSON.parse(resp.data),
          }
        }
      });
  }

  getAduanas() {
    this.sExtraordinarios
      .getCatalogo(CATALOGOS_ID.CAT_ADUANAS)
      .subscribe((resp) => {
        if (resp.codigo === '200') {
          this.aduanas = {
            labelNombre: 'Aduana',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: JSON.parse(resp.data),
          };
        }
      });

  }

  getSeccionAduanera() {

  }

  paisOrigen(pais: Catalogo) {
    console.log(pais);
  }

  paisProcedencia(pais: Catalogo) {
    console.log(pais);
  }

  busqueda_rfc() {
    const rfc =
      this.datos_importador_exportador.get('rfc_import_export')?.value;
    // Aqui se hará la busqueda del rfc, para obtener el nombre

    this.llenarCamposDesactivados(
      this.datos_importador_exportador,
      'nombre_import_export'
    );
  }

  llenarCamposDesactivados(form: FormGroup, field: string) {
    form.get(field)?.enable();
    form.get(field)?.setValue('DAYNIZ YAEL VELASCO CORONEL');
    form.get(field)?.disable();
  }

  tipoSolicitud(e: Catalogo) {
    this.tipo_sol_seleccionada = e;
  }

  validarFormulario() {
    if (this.FormSolicitud.invalid) {
      this.FormSolicitud.markAllAsTouched();
      return;
    }
  }

  valorInputCheck(e: DatosInputCheck) {
    console.log(e);
  }

  obtenerHora(e: string, tipo: string) {
    if (tipo === 'i') {
      this.d_servicio.get('h_inicio')?.setValue(e);
    } else if (tipo === 'f') {



      switch (this.tipo_sol_seleccionada.id) {
        case 1:
          this.d_servicio.get('h_final')?.setValue(e);

          const f_inicial = this.d_servicio.get('f_inicio')?.value;
          const f_final = this.d_servicio.get('f_final')?.value;



          break;
        case 2:
          console.log(this.tipo_sol_seleccionada.value);
          break;
        case 3:
          console.log(this.tipo_sol_seleccionada.value);
          break;
      }
      this.rango_fechas();
    }
  }

  rango_fechas() {
    const f_inicial = this.d_servicio.get('f_inicio')?.value;
    const f_final = this.d_servicio.get('f_final')?.value;

    const formato_fi = this.formato_fecha(f_inicial);
    const formato_ff = this.formato_fecha(f_final);

    this.selectRangoDias = this.obtenerDiasEntreFechas(formato_fi, formato_ff);

    this.colapsable = true;
  }

  obtenerDiasEntreFechas(f_inicio: string, f_final: string): Array<string> {
    const [dia_in, mes_in, anio_in] = f_inicio.split('-').map(Number);
    const [dia_fi, mes_fi, anio_fi] = f_final.split('-').map(Number);

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
}
