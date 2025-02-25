import { CommonModule } from '@angular/common';

import { Component, Input, OnInit } from '@angular/core';

import { CATALOGOS_ID, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';

import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
} from 'libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';


import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { SolicitanteService } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
// eslint-disable-next-line sort-imports
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { FormulariosService } from '@ng-mf/data-access-user';
import { UppercaseDirective } from 'libs/shared/data-access-user/src/tramites/directives/Uppercase/uppercase.directive';
import { tap } from 'rxjs';

@Component({
  selector: 'app-domicilio',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, TituloComponent,
    ReactiveFormsModule,
    UppercaseDirective],
  templateUrl: './Domicilio.component.html',
  styleUrl: './Domicilio.component.scss',
})
export class DomicilioComponent implements OnInit {
  @Input() tabindex!: number;

  tipoPersona!: number;
  domicilioFiscal: FormularioDinamico[] = [];
  form!: FormGroup;

  constructor(
    private solicitanteServicio: SolicitanteService,
    private fb: FormBuilder,
    private formServices: FormulariosService
  ) {
    this.obtenerTipoPersona(TIPO_PERSONA.FISICA_NACIONAL);
    this.crearFormulario();
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
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    } else if (tipo === TIPO_PERSONA.MORAL_NACIONAL) {
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    } else if (tipo === TIPO_PERSONA.FISICA_EXTRANJERA) {
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA;
    } else if (tipo === TIPO_PERSONA.MORAL_EXTRANJERA) {
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA;
    }
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
            const datosDomicilioFiscal = datos.domicilioFiscal;

            const camposDatosDomicilioFiscal =
              this.formServices.obtenerNombresCamposForm(
                this.domicilioFiscalForm
              );

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
