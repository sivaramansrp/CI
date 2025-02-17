/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input } from '@angular/core';
 
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { FormularioDinamico } from '../../../../core/models/shared/forms-model';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
// eslint-disable-next-line sort-imports
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { TIPO_PERSONA } from '../../../../shared/constantes/constantes';
// eslint-disable-next-line sort-imports
import{ DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  PERSONA_FISICA_EXTRANJERO,
  PERSONA_FISICA_NACIONAL,
  
  PERSONA_MORAL_EXTRANJERO,
  PERSONA_MORAL_NACIONAL
}from '../../../../shared/constantes/solicitante-constantes.enum'
import { PERSONA_FISICA_SACIONAL } from '../../../../shared/constantes/solicitante-constantes.enum';
import { SolicitanteService } from '../../../../core/services/shared/solicitante/solicitante.service';
// eslint-disable-next-line sort-imports
import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss'
})
export class SolicitanteComponent {
@Input() tabindex!: number;
  form: FormGroup;
  tipoPersona!: number;
   persona: FormularioDinamico[] = [];
  constructor( private fb: FormBuilder, private solicitanteServicio: SolicitanteService, private formServices: FormulariosService) {
    
    this.obtenerTipoPersona(TIPO_PERSONA.FISICA_NACIONAL);
    this.crearFormulario();
    this.inicializarFormGroup(this.persona, 'datosGenerales');
    /**
   * Obtiene los datos generales del solicitante con una peticion get.
   * @returns void
   */
}
ngOnInit() {
  this.getDatosGenerales();
}

obtenerTipoPersona(tipo: number): void {
  this.tipoPersona = tipo;
  if (tipo === TIPO_PERSONA.FISICA_NACIONAL) {
    
    this.persona = PERSONA_FISICA_SACIONAL;
    
  } else if (tipo === TIPO_PERSONA.MORAL_NACIONAL) {
    
    this.persona = PERSONA_MORAL_NACIONAL;
   
  } else if (tipo === TIPO_PERSONA.FISICA_EXTRANJERA) {
    
    this.persona = PERSONA_FISICA_EXTRANJERO;
   
  } else if (tipo === TIPO_PERSONA.MORAL_EXTRANJERA) {
   this.persona = PERSONA_MORAL_EXTRANJERO;
    
  }
}
get datosGeneralesForm() {
  return this.form.get('datosGenerales') as FormGroup;
}

/**
   * Crea un formulario vacío con dos grupos de formularios, datosGenerales y domicilioFiscal.
   */
crearFormulario(): void {
  this.form = this.fb.group({
    datosGenerales: this.fb.group({}),
    
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

  // eslint-disable-next-line class-methods-use-this
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

    getDatosGenerales(): void {
        this.solicitanteServicio
          .getDatosGenerales(CATALOGOS_ID.DATOS_PERSONA_FISICA)
          .pipe(
            tap((response) => {
              if (response) {
                const datos = JSON.parse(response.data);
                const datosSolicitante = datos.datosGenerales;
               
                 const camposDatosGenerales =
                  this.formServices.obtenerNombresCamposForm(
                    this.datosGeneralesForm
                  );
                
    
                camposDatosGenerales.forEach((campo) => {
                  this.formServices.agregarValorCampoDesactivados(
                    this.datosGeneralesForm,
                    campo,
                    datosSolicitante[campo]
                  );
                });
               }
            })
          )
          .subscribe();
      }

}
