import { CATALOGOS_ID, TIPO_PERSONA } from '../../constantes/constantes';
import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  FOLIO_DEL_TRAMITE,
  PERSONA_FISICA_EXTRANJERO,
  PERSONA_FISICA_NACIONAL,
  PERSONA_MORAL_EXTRANJERO,
  PERSONA_MORAL_NACIONAL,
} from '../../constantes/solicitante-constantes.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
// Se agregan las siguientes líneas para resolver errores de eslint.
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ConsultaioQuery } from '@ng-mf/data-access-user';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ConsultaioState } from '@ng-mf/data-access-user';
import { DatosGeneralesModel } from '../../../core/models/datos-generales.model';
import { FormularioDinamico } from '../../../core/models/shared/forms-model';
import { FormulariosService } from '../../../core/services/shared/formularios/formularios.service';
import { SolicitanteService } from '../../../core/services/shared/solicitante/solicitante.service';
import { TituloComponent } from '../titulo/titulo.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { UppercaseDirective } from '../../directives/Uppercase/uppercase.directive';
import { SolicitanteEvaluarResponse } from '../../../core/models/datos-solicitante-evaluar.model';
import { CategoriaMensaje, Notificacion } from '@ng-mf/data-access-user';
import { Location } from '@angular/common';


@Component({
  selector: 'solicitante',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    TooltipModule,
    forwardRef(() => UppercaseDirective),
  ],
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss',
  host: {}
})
export class SolicitanteComponent implements OnInit, OnDestroy {
  nuevaNotificacion: Notificacion | null = null;

  @Input() tabindex!: number;

  /** Indica si se deben mostrar los datos del trámite en el formulario del solicitante. */
  @Input() mostrarDatosTramite: boolean = true;

  tipoPersona!: number;
  persona: FormularioDinamico[] = [];
  domicilioFiscal: FormularioDinamico[] = [];
  datosTramite: FormularioDinamico[] = [];


  form!: FormGroup;
  guardarDatos!: ConsultaioState;
  private destroyNotifier$: Subject<void> = new Subject();

  @Input() RFC: string = 'LEQI8101314S7';

  datosGenerales?: DatosGeneralesModel;

  /** Variable para almacenar los datos del solicitante obtenidos de la API */
  datosSolicitanteEvaluar!: SolicitanteEvaluarResponse;

  constructor(
    private solicitanteServicio: SolicitanteService,
    private fb: FormBuilder,
    private formServices: FormulariosService,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.guardarDatos = seccionState;
        })
      )
      .subscribe();
    this.obtenerTipoPersona(TIPO_PERSONA.FISICA_NACIONAL);
    this.crearFormulario();
    this.inicializarFormGroup(this.persona, 'datosGenerales');
    this.inicializarFormGroup(this.domicilioFiscal, 'domicilioFiscal');
    this.inicializarFormGroup(this.datosTramite, 'datosTramite');
    this.form.patchValue({ datosTramite: this.guardarDatos?.consultaioSolicitante });
  }

  /**
   * @inheritdoc
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a la función `getDatosGenerales` para obtener datos iniciales.
   * @returns {void} No retorna ningún valor.
   */
  ngOnInit(): void {
    if (this.guardarDatos.id_solicitud && (this.guardarDatos.procedureId === '130118' || this.guardarDatos.procedureId === '5701' 
      || this.guardarDatos.procedureId === '120301')) {
      this.getDatosSolicitanteEvaluar(this.guardarDatos.id_solicitud);
    } else {
      this.getDatosGenerales(this.RFC);
    }

  }

      /**
   * @method iniciar
   * @description Método que inicia el trámite 120301 enviando una solicitud
   * al servicio IniciarService. Maneja la respuesta del servidor
   */
  iniciar(): void {
    const PAYLOAD: any = {
      rfc_solicitante: this.datosGenerales?.datos?.rfc_original,
      rol_actual: 'SOLICITANTE'
    };

    // Realiza la solicitud de inicio del trámite
    this.solicitanteServicio.postIniciar(PAYLOAD).subscribe({
      next: (response) => {
        if (response.codigo !== '00') {
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: response.error || 'Error al iniciar el trámite.',
            mensaje:
              response.causa ||
              response.mensaje ||
              'Ocurrió un error al guardar la solicitud.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
          // this.location.back();
        }
      },
      error: (error) => {
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: CategoriaMensaje.ERROR,
          modo: 'action',
          titulo: '',
          mensaje: error?.error?.error || 'Error inesperado al iniciar el trámite.',
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        };
        // this.location.back();
      }
    });
  }

  /**
   * Obtiene los datos del solicitante para evaluar y asigna los valores al formulario.
   * @param idSolicitud - Id de la solicitud para obtener los datos del solicitante.
   */
  getDatosSolicitanteEvaluar(idSolicitud: string): void {
    this.solicitanteServicio
      .getSolicitanteEvaluar(this.guardarDatos?.procedureId,idSolicitud)
      .pipe(
        tap((response) => {
          if (response?.datos) {
            const DATOS_SOLICITANTE = response.datos.datos_solicitante;
            const DOMICILIO_SOLICITANTE = response.datos.domicilio_solicitante;

            // Mapear tipo persona
            this.obtenerTipoPersona(
              DATOS_SOLICITANTE.tipo_persona === 'MORAL'
                ? TIPO_PERSONA.MORAL_NACIONAL
                : TIPO_PERSONA.FISICA_NACIONAL
            );

            // Transformar al modelo que usa el HTML
            this.datosGenerales = {
              codigo: '',
              mensaje: '',
              datos: {
                rfc_original: DATOS_SOLICITANTE.rfc,
                rfc_vigente: DATOS_SOLICITANTE.rfc,
                rfc_solicitado: DATOS_SOLICITANTE.rfc,
                bo_id: '',
                person_id: '',
                actividades: DATOS_SOLICITANTE.descripcion_giro,
                grupo_empresas: '',
                identificacion: {
                  tipo_persona: DATOS_SOLICITANTE.tipo_persona === 'MORAL' ? 'M' : 'F',
                  clave_segmento: '',
                  descripcion_segmento: '',
                  curp: DATOS_SOLICITANTE.curp,
                  nit: DATOS_SOLICITANTE.numero_identificacion_fiscal,
                  razon_social: DATOS_SOLICITANTE.razon_social,
                  tipo_sociedad: '',
                  nombre: DATOS_SOLICITANTE.nombre,
                  ap_paterno: DATOS_SOLICITANTE.apellido_paterno,
                  ap_materno: DATOS_SOLICITANTE.apellido_materno,
                  nombre_comercial: '',
                  fecha_nacimiento: null,
                  fecha_constitucion: '',
                  nacionalidad: null,
                  fechaInicio_operacion: '',
                  c_sit_cont: '',
                  c_det_sit_cont: '',
                  d_sit_cont: '',
                  f_sit_cont: '',
                  c_sit_dom: '',
                  d_sit_dom: '',
                  c_sit_cont_dom: '',
                  d_sit_cont_dom: DATOS_SOLICITANTE.descripcion_giro,
                  pais_origen: '',
                  df_tipo: '',
                  df_folio: '',
                  df_f_inicio: '',
                  df_f_fin: '',
                  email: DATOS_SOLICITANTE.correo_electronico
                },
                ubicacion: {
                  calle: DOMICILIO_SOLICITANTE.calle,
                  n_exterior: DOMICILIO_SOLICITANTE.numero_exterior,
                  n_interior: DOMICILIO_SOLICITANTE.numero_interior,
                  telefono_1: DOMICILIO_SOLICITANTE.telefono,
                  t_tel_1: DOMICILIO_SOLICITANTE.lada,
                  telefono_2: '',
                  t_tel_2: DOMICILIO_SOLICITANTE.telefono,
                  c_alr: '',
                  d_alr: '',
                  d_calle_1: '',
                  d_calle_2: '',
                  d_Referencia: '',
                  t_inmueble: '',
                  d_inmueble: '',
                  t_vialidad: '',
                  d_vialidad: '',
                  cp: DOMICILIO_SOLICITANTE.codigo_postal,
                  c_colonia: DOMICILIO_SOLICITANTE.colonia,
                  c_localidad: DOMICILIO_SOLICITANTE.colonia,
                  c_municipio: '',
                  d_ent_fed: DOMICILIO_SOLICITANTE.entidad_federativa,
                  d_municipio: DOMICILIO_SOLICITANTE.delegacion_municipio,
                  email: DATOS_SOLICITANTE.correo_electronico,
                  f_alta_dom: null,
                  pais_residencia: DOMICILIO_SOLICITANTE.pais,
                  caract_domicilio: '',
                  c_crh: '',
                  d_crh: '',
                  d_colonia: '',
                  d_localidad: DOMICILIO_SOLICITANTE.localidad,
                  c_ent_fed: ''
                }
              }
            };

            // Patch al formulario
            SolicitanteComponent.patchValuesToForm(
              this.datosGeneralesForm,
              DATOS_SOLICITANTE
            );
            SolicitanteComponent.patchValuesToForm(
              this.domicilioFiscalForm,
              DOMICILIO_SOLICITANTE
            );

            const DATOS_TRAMITE_FORM = this.form.get('datosTramite') as FormGroup;

            const DATOS_TRAMITE_MAPPED = {
              folioDelTramite: response.datos.datos_solicitud.num_folio_tramite,
              fechaDeInicio: response.datos.datos_solicitud.fec_ini_tramite,
              estadoDelTramite: response.datos.datos_solicitud.estado_tramite
            };
            SolicitanteComponent.patchValuesToForm(DATOS_TRAMITE_FORM, DATOS_TRAMITE_MAPPED);


          }
        })
      )
      .subscribe();
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static patchValuesToForm(formGroup: FormGroup, values: any): void {
    Object.keys(formGroup.controls).forEach((campo) => {
      if (values[campo] !== undefined) {
        FormulariosService.agregarValorCampoDesactivado(
          formGroup,
          campo,
          values[campo]
        );
      }
    });
  }


  /**
   * Obtiene el tipo de persona que es solicitante, y asigna los campos correspondientes al formulario.
   * @param tipo - Tipo de persona que es solicitante.
   * @returns void
   */
  obtenerTipoPersona(tipo: number): void {
    this.tipoPersona = tipo;
    if (tipo === TIPO_PERSONA.FISICA_NACIONAL) {
      // Persona fisica nacional
      this.persona = PERSONA_FISICA_NACIONAL;
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    } else if (tipo === TIPO_PERSONA.MORAL_NACIONAL) {
      // Persona moral nacional
      this.persona = PERSONA_MORAL_NACIONAL;
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    } else if (tipo === TIPO_PERSONA.FISICA_EXTRANJERA) {
      // Persona fisica extranjera
      this.persona = PERSONA_FISICA_EXTRANJERO;
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA;
    } else if (tipo === TIPO_PERSONA.MORAL_EXTRANJERA) {
      // Persona moral extranjera
      this.persona = PERSONA_MORAL_EXTRANJERO;
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA;
    }
    this.datosTramite = FOLIO_DEL_TRAMITE;
  }

  /**
   * Es un getter que proporciona un acceso más sencillo ala grupo de formularios llamado datosGenerales contenido dentr del formulario principal Form.
   */
  get datosGeneralesForm(): FormGroup {
    return this.form.get('datosGenerales') as FormGroup;
  }

  /**
   * Es un getter que proporciona un acceso más sencillo ala grupo de formularios llamado domicilioFiscal contenido dentr del formulario principal Form.
   */
  get domicilioFiscalForm(): FormGroup {
    return this.form.get('domicilioFiscal') as FormGroup;
  }
  get datosTramiteForm(): FormGroup {
    return this.form.get('datosTramite') as FormGroup;
  }

  /**
   * Crea un formulario vacío con dos grupos de formularios, datosGenerales y domicilioFiscal.
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      datosGenerales: this.fb.group({}),
      domicilioFiscal: this.fb.group({}),
      datosTramite: this.fb.group({})
    });
  }

  /**
   * Inicializa los campos del formulario con los campos de la configuración de los campos de los formularios.
   * @param config - Configuración de los campos de los formularios.
   * @param grupoNombre - Nombre del grupo de formularios a inicializar.
   * @returns void
   */
  inicializarFormGroup(
    config: FormularioDinamico[],
    grupoNombre: string
  ): void {
    const GRUPO = this.form.get(grupoNombre) as FormGroup;
    config.forEach((campo) => {
      const VALIDATORS = SolicitanteComponent.getValidators(campo.validators);
      GRUPO.addControl(
        campo.campo,
        this.fb.control({ value: '', disabled: campo.disabled }, VALIDATORS)
      );
    });
  }

  /**
   * Obtiene los validadores de los campos de los formularios.
   * @param validators - Validadores de los campos de los formularios.
   * @returns ValidatorFn[]
   */
  static getValidators(validators: string[]): ValidatorFn[] {
    const FORM_VALIDATOR: ValidatorFn[] = [];
    validators.forEach((validator) => {
      if (validator === 'required') {
        FORM_VALIDATOR.push(Validators.required);
      } else if (validator.includes('maxLength')) {
        const MAX = validator.split(':')[1];
        FORM_VALIDATOR.push(Validators.maxLength(Number(MAX)));
      } else if (validator.includes('pattern')) {
        const PATTERN = validator.split(':')[1];
        FORM_VALIDATOR.push(Validators.pattern(PATTERN));
      }
    });
    return FORM_VALIDATOR;
  }

  /**
   * Obtiene los datos generales del solicitante con una peticion get.
   * @returns void
   */
  getDatosGenerales(RFC: string): void {
    if (RFC !== undefined || RFC !== null || RFC !== '') {
      this.solicitanteServicio
        .getDatosGeneralesAPI(RFC)
        .pipe(
          tap((response) => {
            if (response) {
              this.datosGenerales = response;
              this.iniciar();

            }
          })
        )
        .subscribe();
    } else {

      this.solicitanteServicio
        .getDatosGenerales(CATALOGOS_ID.DATOS_PERSONA_FISICA)
        .pipe(
          tap((response) => {
            if (response) {

              const DATOS = JSON.parse(response.data);
              const DATOS_SOLICITANTE = DATOS.datosGenerales;
              const DATOS_DOMICILIO_FISCAL = DATOS.domicilioFiscal;

              const CAMPOS_DATOS_GENERALES =
                FormulariosService.obtenerNombresCamposForm(
                  this.datosGeneralesForm
                );
              const CAMPOS_DATOS_DOMICILIO_FISCAL =
                FormulariosService.obtenerNombresCamposForm(
                  this.domicilioFiscalForm
                );

              CAMPOS_DATOS_GENERALES.forEach((campo) => {
                FormulariosService.agregarValorCampoDesactivado(
                  this.datosGeneralesForm,
                  campo,
                  DATOS_SOLICITANTE[campo]
                );
              });

              CAMPOS_DATOS_DOMICILIO_FISCAL.forEach((campo) => {
                FormulariosService.agregarValorCampoDesactivado(
                  this.domicilioFiscalForm,
                  campo,
                  DATOS_DOMICILIO_FISCAL[campo]
                );
              });
            }
          })
        )
        .subscribe();
    }
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
