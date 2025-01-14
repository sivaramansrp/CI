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

  /**
   * Obtiene el tipo de persona que es solicitante, y asigna los campos correspondientes al formulario.
   * @param tipo - Tipo de persona que es solicitante.
   * @returns void
   */
  obtenerTipoPersona(tipo: number): void {
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

  /**
   * Es un getter que proporciona un acceso más sencillo ala grupo de formularios llamado datosGenerales contenido dentr del formulario principal Form.
   */
  get datosGeneralesForm() {
    return this.form.get('datosGenerales') as FormGroup;
  }

  /**
   * Es un getter que proporciona un acceso más sencillo ala grupo de formularios llamado domicilioFiscal contenido dentr del formulario principal Form.
   */
  get domicilioFiscalForm() {
    return this.form.get('domicilioFiscal') as FormGroup;
  }

  /**
   * Crea un formulario vacío con dis grupos de formularios, datosGenerales y domicilioFiscal.
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
    config: Array<FormularioDinamico>,
    grupoNombre: string
  ): void {
    const grupo = this.form.get(grupoNombre) as FormGroup;
    config.forEach((campo) => {
      const validators = this.getValidators(campo.validators);
      grupo.addControl(
        campo.campo,
        this.fb.control({ value: '', disabled: campo.disabled }, validators)
      );
    });
  }

  /**
   * Obtiene los validadores de los campos de los formularios.
   * @param validators - Validadores de los campos de los formularios.
   * @returns ValidatorFn[]
   */
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

  /**
   * Obtiene los datos generales del solicitante con una peticion get.
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
