import { CATALOGOS_ID, TIPO_PERSONA } from '../../constantes/constantes';
import { Component, Input,OnDestroy, OnInit,forwardRef } from '@angular/core';
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
import { FormularioDinamico } from '../../../core/models/shared/forms-model';
import { FormulariosService } from '../../../core/services/shared/formularios/formularios.service';
import { SolicitanteService } from '../../../core/services/shared/solicitante/solicitante.service';
import { TituloComponent } from '../titulo/titulo.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { UppercaseDirective } from '../../directives/Uppercase/uppercase.directive';

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
export class SolicitanteComponent implements OnInit,OnDestroy {
  @Input() tabindex!: number;

  tipoPersona!: number;
  persona: FormularioDinamico[] = [];
  domicilioFiscal: FormularioDinamico[] = [];
  datosTramite: FormularioDinamico[] = [];


  form!: FormGroup;
  guardarDatos!: ConsultaioState;
  private destroyNotifier$: Subject<void> = new Subject();

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
    this.form.patchValue({datosTramite: this.guardarDatos?.consultaioSolicitante??{}});    
  }

  /**
   * @inheritdoc
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a la función `getDatosGenerales` para obtener datos iniciales.
   * @returns {void} No retorna ningún valor.
   */
  ngOnInit(): void {
    this.getDatosGenerales();
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
    this.datosTramite=FOLIO_DEL_TRAMITE;
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
  getDatosGenerales(): void {
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
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
