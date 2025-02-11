import { CATALOGOS_ID, TIPO_PERSONA } from '../../constantes/constantes';

import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  PERSONA_FISICA_EXTRANJERO,
  PERSONA_FISICA_NACIONAL,
  PERSONA_MORAL_EXTRANJERO,
  PERSONA_MORAL_NACIONAL,
} from '../../constantes/solicitante-constantes.enum';

import { Component, Input, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SolicitanteService } from '../../../core/services/shared/solicitante/solicitante.service';
import { TituloComponent } from '../titulo/titulo.component';

import { FormularioDinamico } from '../../../core/models/shared/forms-model';
import { FormulariosService } from '../../../core/services/shared/formularios/formularios.service';
import { UppercaseDirective } from '../../directives/Uppercase/uppercase.directive';
import { tap } from 'rxjs';

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
  getValidators(validators: string[]): ValidatorFn[] {
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
    this.solicitanteServicio
      .getDatosGenerales(CATALOGOS_ID.DATOS_PERSONA_FISICA)
      .pipe(
        tap((response) => {
          if (response) {
            const datos = JSON.parse(response.data);
            const datosSolicitante = datos.datosGenerales;
            const datosDomicilioFiscal = datos.domicilioFiscal;

            const camposDatosGenerales =
              this.formServices.obtenerNombresCamposForm(
                this.datosGeneralesForm
              );
            const camposDatosDomicilioFiscal =
              this.formServices.obtenerNombresCamposForm(
                this.domicilioFiscalForm
              );

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
        })
      )
      .subscribe();
  }
}