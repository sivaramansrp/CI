import { Component, Input, OnInit, forwardRef } from '@angular/core';

import {FormBuilder,FormGroup,ReactiveFormsModule,ValidatorFn,Validators} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { CATALOGOS_ID, TIPO_PERSONA } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_FISICA_EXTRANJERO, PERSONA_FISICA_NACIONAL, PERSONA_MORAL_EXTRANJERO, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico } from '@libs/shared/data-access-user/src/core/models/shared/forms-model';
import { FormulariosService } from '@libs/shared/data-access-user/src/core/services/shared/formularios/formularios.service';
import { SolicitanteService } from '@libs/shared/data-access-user/src/core/services/shared/solicitante/solicitante.service';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { UppercaseDirective } from '@libs/shared/data-access-user/src/tramites/directives/Uppercase/uppercase.directive';
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
  /**
   * @input tabindex
   * 
   * Define el índice de tabulación para el componente, 
   * que determina el orden en el que los elementos son enfocados 
   * al navegar con el teclado.
   * 
   * @type {number}
   */
  @Input() tabindex!: number;

  tipoPersona!: number;
  persona: FormularioDinamico[] = [];
  domicilioFiscal: FormularioDinamico[] = [];

  form!: FormGroup;

    folioTramite: any;

    fechaInicioTramite = new Date().toISOString().split('T')[0]; // Converts current date to 'YYYY-MM-DD'



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
       // Retrieve data from state
    this.folioTramite = history.state.data;
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
      requerimiento: this.fb.group({}),
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
    const FORM_VALIDATORS: ValidatorFn[] = [];
    validators.forEach((validator) => {
      if (validator === 'required') {
        FORM_VALIDATORS.push(Validators.required);
      } else if (validator.includes('maxLength')) {
        const MAX = validator.split(':')[1];
        FORM_VALIDATORS.push(Validators.maxLength(Number(MAX)));
      } else if (validator.includes('pattern')) {
        const PATTERN = validator.split(':')[1];
        FORM_VALIDATORS.push(Validators.pattern(PATTERN));
      }
    });
    return FORM_VALIDATORS;
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
              this.formServices.obtenerNombresCamposForm(
                this.datosGeneralesForm
              );
            const CAMPOS_DATOS_DOMICILIO_FISCAL =
              this.formServices.obtenerNombresCamposForm(
                this.domicilioFiscalForm
              );

            CAMPOS_DATOS_GENERALES.forEach((campo) => {
              this.formServices.agregarValorCampoDesactivados(
                this.datosGeneralesForm,
                campo,
                DATOS_SOLICITANTE[campo]
              );
            });

            CAMPOS_DATOS_DOMICILIO_FISCAL.forEach((campo) => {
              this.formServices.agregarValorCampoDesactivados(
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
