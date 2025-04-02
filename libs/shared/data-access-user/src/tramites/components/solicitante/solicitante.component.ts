import { CATALOGOS_ID, TIPO_PERSONA } from '../../constantes/constantes';
import { Component, Input, OnInit,forwardRef } from '@angular/core';
import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
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
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '../../../core/models/shared/forms-model';
import { FormulariosService } from '../../../core/services/shared/formularios/formularios.service';
import { SolicitanteService } from '../../../core/services/shared/solicitante/solicitante.service';
import { TituloComponent } from '../titulo/titulo.component';
import { UppercaseDirective } from '../../directives/Uppercase/uppercase.directive';
import { tap } from 'rxjs';

@Component({
  selector: 'solicitante',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    forwardRef(() => UppercaseDirective),
  ],
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss',
  host: {}
})
export class SolicitanteComponent implements OnInit {
  @Input() tabindex!: number;

  tipoPersona!: number;
  persona: FormularioDinamico[] = [];
  domicilioFiscal: FormularioDinamico[] = [];

  form!: FormGroup;

  constructor(
    private solicitanteServicio: SolicitanteService,
    private fb: FormBuilder,
    private formServices: FormulariosService
  ) {
    this.obtenerTipoPersona(TIPO_PERSONA.FISICA_NACIONAL);
    this.crearFormulario();
    this.inicializarFormGroup(this.persona, 'datosGenerales');
    this.inicializarFormGroup(this.domicilioFiscal, 'domicilioFiscal');
  }

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

  /**
   * Crea un formulario vacío con dos grupos de formularios, datosGenerales y domicilioFiscal.
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      datosGenerales: this.fb.group({}),
      domicilioFiscal: this.fb.group({}),
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
      const VALIDATORS = this.getValidators(campo.validators);
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
   getValidators(validators: string[]): ValidatorFn[] {
    const FROM_VALIDATORS: ValidatorFn[] = [];
    validators.forEach((validator) => {
      if (validator === 'required') {
        FROM_VALIDATORS.push(Validators.required);
      } else if (validator.includes('maxLength')) {
        const MAX = validator.split(':')[1];
        FROM_VALIDATORS.push(Validators.maxLength(Number(MAX)));
      } else if (validator.includes('pattern')) {
        const PATTERN = validator.split(':')[1];
        FROM_VALIDATORS.push(Validators.pattern(PATTERN));
      }
    });
    return FROM_VALIDATORS;
  }

  /**
   * Obtiene los datos generales del solicitante con una peticion get.
   * @returns void
   */
  getDatosGenerales(): void {
    this.solicitanteServicio
      .getDatosGenerales(CATALOGOS_ID.DATOS_PERSONA_FISICA)
      .pipe(
        tap((RESPONSE) => {
          if (RESPONSE) {
            const DATOS = JSON.parse(RESPONSE.data);
            const DATOS_SOLICITANTE = DATOS.datosGenerales;
            const DATOS_DOMICILIO_FISCAL = DATOS.domicilioFiscal;

            const CAMPOS_DATOS_GENERALES =
              this.formServices.obtenerNombresCamposForm(
                this.datosGeneralesForm
              );
            const CAMPOS_DATOS_DOMICILIO_FISCAL =
              this.formServices.obtenerNombresCamposForm(
                this.domicilioFiscalForm
              );

            CAMPOS_DATOS_GENERALES.forEach((CAMPO) => {
              this.formServices.agregarValorCampoDesactivados(
                this.datosGeneralesForm,
                CAMPO,
                DATOS_SOLICITANTE[CAMPO]
              );
            });

            CAMPOS_DATOS_DOMICILIO_FISCAL.forEach((CAMPO) => {
              this.formServices.agregarValorCampoDesactivados(
                this.domicilioFiscalForm,
                CAMPO,
                DATOS_DOMICILIO_FISCAL[CAMPO]
              );
            });
          }
        })
      )
      .subscribe();
  }
}
