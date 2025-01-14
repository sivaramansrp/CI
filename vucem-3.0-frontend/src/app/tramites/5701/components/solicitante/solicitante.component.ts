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
  PERSONA_FISICA_EXTRANJERO,
  PERSONA_FISICA_NACIONAL,
  PERSONA_MORAL_EXTRANJERO,
  PERSONA_MORAL_NACIONAL,
} from '../../../../shared/constantes/solicitante-constantes.enum';
import { FormularioDinamico } from '../../../../core/models/shared/forms-model';
import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA } from '../../../../shared/constantes/solicitante-constantes.enum';
import { UppercaseDirective } from '../../../../shared/directives/Uppercase/uppercase.directive';

@Component({
  selector: 'solicitante',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    UppercaseDirective,
  ],
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss',
})
export class SolicitanteComponent {
  tipoPersona: number = 1;
  persona: Array<FormularioDinamico> = [];
  domicilioFiscal: Array<FormularioDinamico> = [];

  form!: FormGroup;

  constructor(
    private solicitanteServicio: SolicitanteService,
    private fb: FormBuilder,
    private formServices: FormulariosService
  ) {
    this.obtenerTipoPersona(2);
    this.crearFormulario();
    this.inicializarFormGroup(this.persona, 'datosGenerales');
    this.inicializarFormGroup(this.domicilioFiscal, 'domicilioFiscal');
  }

  ngOnInit() {
    this.getDatosGenerales();
  }

  obtenerTipoPersona(tipo: number) {
    this.tipoPersona = tipo;
    if (tipo === 1) {
      // Persona fisica nacional
      this.persona = PERSONA_FISICA_NACIONAL;
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    } else if (tipo === 2) {
      // Persona moral nacional
      this.persona = PERSONA_MORAL_NACIONAL;
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    } else if (tipo === 3) {
      // Persona fisica extranjera
      this.persona = PERSONA_FISICA_EXTRANJERO;
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA;
    } else if (tipo === 4) {
      // Persona moral extranjera
      this.persona = PERSONA_MORAL_EXTRANJERO;
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA;
    }
  }

  get datosGeneralesForm() {
    return this.form.get('datosGenerales') as FormGroup;
  }

  get domicilioFiscalForm() {
    return this.form.get('domicilioFiscal') as FormGroup;
  }

  crearFormulario() {
    this.form = this.fb.group({
      datosGenerales: this.fb.group({}),
      domicilioFiscal: this.fb.group({}),
    });
  }

  inicializarFormGroup(config: Array<FormularioDinamico>, grupoNombre: string) {
    const grupo = this.form.get(grupoNombre) as FormGroup;
    config.forEach((campo) => {
      const validators = this.getValidators(campo.validators);
      grupo.addControl(
        campo.campo,
        this.fb.control({ value: '', disabled: campo.disabled }, validators)
      );
    });
  }

  getValidators(validators: Array<string>): ValidatorFn[] {
    const formValidators: ValidatorFn[] = [];
    validators.forEach((validator) => {
      if (validator === 'required') {
        formValidators.push(Validators.required);
      } else if (validator.includes('maxLength')) {
        const max = validator.split(':')[1];
        formValidators.push(Validators.maxLength(Number(max)));
      } else if (validator.includes('pattern')) {
        const pattern = validator.split(':')[1];
        formValidators.push(Validators.pattern(pattern));
      }
    });
    return formValidators;
  }

  getDatosGenerales() {
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

  setValorInput(field: string, value: string): void {
    this.datosGeneralesForm.controls[field].enable();
    this.datosGeneralesForm.controls[field].setValue(value);
    this.datosGeneralesForm.controls[field].disable();
  }
}
