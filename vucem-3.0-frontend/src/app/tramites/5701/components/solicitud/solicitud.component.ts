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
  FECHA_FINAL,
  FECHA_INICIO,
  HORA_FINAL,
  HORA_INICIO,
  IMMEX,
  INDUSTRIA_AUTOMOTRIZ,
  PROGRAMA_FOMENTO,
  SOCIO_COMERCIAL,
} from '../../../../shared/constantes/servicios-extraordinarios.enum';

@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent {
  datos_tipos_solicitud!: CatalogosSelect;

  tipo_sol_seleccionada!: Catalogo;
  tipo_sol_sel_valor!: number;

  programa_fomento: InputCheck = PROGRAMA_FOMENTO;
  immex: InputCheck = IMMEX;
  industria_automotriz: InputCheck = INDUSTRIA_AUTOMOTRIZ;
  socio_comercial: InputCheck = SOCIO_COMERCIAL;

  hora_inicio: InputHora = HORA_INICIO;
  hora_final: InputHora = HORA_FINAL;

  fecha_inicio: InputFecha = FECHA_INICIO;
  fecha_final: InputFecha = FECHA_FINAL;

  FormSolicitud!: FormGroup;

  constructor(
    private sExtraordinarios: ServiciosExtraordinariosService,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.crearFormSolicitud();
  }

  ngOnInit() {
    this.getTiposSolicitud();
  }

  fechaInicio() {
    const fecha_inicio = this.FormSolicitud.get('f_inicio')?.value;
    return fecha_inicio;
  }

  cambioFechaInicio(nuevo_valor: string) {
    this.FormSolicitud.get('f_inicio')?.setValue(nuevo_valor);
    this.FormSolicitud.get('f_inicio')?.markAsUntouched();

    console.log(this.FormSolicitud.get('f_inicio')?.value);
  }

  cambioFechaFinal(nuevo_valor: string) {
    this.FormSolicitud.get('f_final')?.setValue(nuevo_valor);
    this.FormSolicitud.get('f_final')?.markAsUntouched();

    console.log(this.FormSolicitud.get('f_final')?.value);
  }

  crearFormSolicitud() {
    this.FormSolicitud = this.fb.group({
      tipo_solicitud: [{ value: '', requerid: true }, [Validators.required]],
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
      f_inicio: [{ value: '', disabled: true }, [Validators.required]],
      f_final: [[{ value: '', disabled: true }, [Validators.required]]],
    });
  }

  isValid(field: string) {
    return this.validacionesService.isValidField(this.FormSolicitud, field);
  }

  getTiposSolicitud() {
    this.sExtraordinarios
      .getCatalogos('cat-tipo-solicitud.json')
      .subscribe((resp) => {
        if (resp.code === 200) {
          const tipos_solicitud = resp.data;
          this.datos_tipos_solicitud = {
            labelNombre: 'Tipo de solicitud',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: tipos_solicitud,
          };
        }
      });
  }

  tipoSolicitud(e: Catalogo) {
    this.tipo_sol_seleccionada = e;
  }

  validarFormulario() {
    console.log(this.FormSolicitud.controls);
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
      console.log('Hora inicial:' + e);
    } else if (tipo === 'f') {
      console.log('Hora final:' + e);
    }
  }
}
