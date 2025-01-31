import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SolicitanteService } from '../../../../core/services/shared/solicitante/solicitante.service';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CommonModule, UpperCasePipe } from '@angular/common';
import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA,
  PERSONA_FISICA_EXTRANJERO,
  PERSONA_FISICA_NACIONAL,
  PERSONA_MORAL_EXTRANJERO,
  PERSONA_MORAL_NACIONAL,
} from '../../../../shared/constantes/solicitante-constantes.enum';
import { TIPO_PERSONA } from '../../../../shared/constantes/constantes';
import { FormularioDinamico } from '../../../../core/models/shared/forms-model';
import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';
import { UppercaseDirective } from '../../../../shared/directives/Uppercase/uppercase.directive';

@Component({
  selector: 'solicitante',
  standalone: true,
  imports: [ReactiveFormsModule, TituloComponent, CommonModule],
  templateUrl: './solicitante.component.html',
  styleUrls: ['./solicitante.component.scss'],
})
export class SolicitanteComponent {
  /**
   * Tipo de persona que es el solicitante.
   */
  tipoPersona!: number;

  /**
   * Información de la persona del solicitante.
   */
  persona: Array<FormularioDinamico> = [];

  /**
   * Información del domicilio fiscal del solicitante.
   */
  domicilioFiscal: Array<FormularioDinamico> = [];

  /**
   * Formulario principal del componente.
   */
  form!: FormGroup;
  datosGeneralesForm!: FormGroup;
  domicilioFiscalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private solicitanteServicio: SolicitanteService,
    private formServices: FormulariosService
  ) {}

  /**
   * Inicializa el componente.
   * @returns void
   */
  ngOnInit(): void {
    this.crearFormulario();
  }

  /**
   * Crea el formulario principal del componente.
   * @returns void
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      datosGenerales: this.fb.group({}),
      domicilioFiscal: this.fb.group({})
    });
  }

  /**
   * Inicializa un FormGroup con la configuración dada.
   * @param config - Configuración del formulario.
   * @param formGroupName - Nombre del grupo de formulario.
   * @returns void
   */
  inicializarFormGroup(config: Array<FormularioDinamico>, formGroupName: string): void {
    const formGroup = this.form.get(formGroupName) as FormGroup;
    config.forEach((campo) => {
      formGroup.addControl(campo.campo, this.fb.control({ value: '', disabled: campo.disabled }, this.getValidators(campo.validators)));
    });
  }

  /**
   * Obtiene los validadores para un campo de formulario.
   * @param validators - Lista de validadores en formato string.
   * @returns Array de validadores.
   */
  getValidators(validators: string[]): any[] {
    const validatorFns: ValidatorFn[] = [];
    validators.forEach((validator) => {
      if (validator === 'required') {
        validatorFns.push(Validators.required);
      }
      // Add more validators as needed
    });
    return validatorFns;
  }

  /**
   * Obtiene el tipo de persona que es solicitante, y asigna los campos correspondientes al formulario.
   * @param tipo - Tipo de persona que es solicitante.
   * @returns void
   */
  obtenerTipoPersona(tipo: number): void {
    this.tipoPersona = tipo;
    if (tipo === TIPO_PERSONA.FISICA_NACIONAL) {
      this.persona = PERSONA_MORAL_NACIONAL;
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    } else if (tipo === TIPO_PERSONA.MORAL_NACIONAL) {
      this.persona = PERSONA_MORAL_NACIONAL;
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    } else if (tipo === TIPO_PERSONA.FISICA_EXTRANJERA) {
      this.persona = PERSONA_FISICA_EXTRANJERO;
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA;
    } else if (tipo === TIPO_PERSONA.MORAL_EXTRANJERA) {
      this.persona = PERSONA_MORAL_EXTRANJERO;
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA;
    }
  }

  /**
   * Obtiene los datos generales del solicitante con una petición GET.
   * @returns void
   */
  getDatosGenerales(): void {
    this.solicitanteServicio.getDatosGenerales(5).subscribe((resp) => {
      if (resp.codigo === '200') {
        const datos = JSON.parse(resp.data);
        const datosSolicitante = datos.datosSolicitante.generales;
        const datosDomicilioFiscal = datos.datosSolicitante.domicilioFiscal;

        const camposDatosGenerales = this.formServices.obtenerNombresCamposForm(
          this.datosGeneralesForm
        );
        const camposDatosDomicilioFiscal =
          this.formServices.obtenerNombresCamposForm(this.domicilioFiscalForm);

        camposDatosGenerales.forEach((campo) => {
          this.formServices.agregarValorCampoDesactivados(
            this.datosGeneralesForm,
            campo,
            datosSolicitante[campo]
          );
        });

        camposDatosDomicilioFiscal.forEach((campo) => {
          this.formServices.agregarValorCampoDesactivados(
            this.domicilioFiscalForm,
            campo,
            datosDomicilioFiscal[campo]
          );
        });
      }
    });
  }
}
