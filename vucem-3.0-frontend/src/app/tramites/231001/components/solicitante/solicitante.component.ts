/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormularioDinamico } from '../../../../core/models/shared/forms-model';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { TIPO_PERSONA } from '../../../../shared/constantes/constantes';

import{ 
PERSONA_FISICA_NACIONAL,
}from '../../../../shared/constantes/solicitante-constantes.enum'
import { PERSONA_FISICA_SACIONAL } from '../../../../shared/constantes/solicitante-constantes.enum';
import { SolicitanteService } from '../../../../core/services/shared/solicitante/solicitante.service';

import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';
import { tap } from 'rxjs';

/**
 * Componente SolicitanteComponent
 * 
 * Este componente maneja el formulario de datos del solicitante.
 */
@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss'
})
export class SolicitanteComponent implements OnInit {
  /**
   * Formulario reactivo del solicitante.
   */
  form: FormGroup;

  /**
   * Tipo de persona (física o moral).
   */
  tipoPersona!: number;

  /**
   * Configuración dinámica de los campos del formulario.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param solicitanteServicio - Servicio para obtener datos del solicitante.
   * @param formServices - Servicio para manejar formularios dinámicos.
   */
  constructor(
    private fb: FormBuilder,
    private solicitanteServicio: SolicitanteService,
    private formServices: FormulariosService
  ) {
    this.obtenerTipoPersona(TIPO_PERSONA.FISICA_NACIONAL);
    this.crearFormulario();
    this.inicializarFormGroup(this.persona, 'datosGenerales');
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.getDatosGenerales();
  }

  /**
   * Obtiene el tipo de persona y configura los campos del formulario en consecuencia.
   * @param tipo - Tipo de persona.
   */
  obtenerTipoPersona(tipo: number): void {
    this.tipoPersona = tipo;
    if (tipo === TIPO_PERSONA.FISICA_NACIONAL) {
      this.persona = PERSONA_FISICA_SACIONAL;
    }
  }

  /**
   * Obtiene el grupo de formularios de datos generales.
   */
  get datosGeneralesForm(): FormGroup {
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
   */
  inicializarFormGroup(config: FormularioDinamico[], grupoNombre: string): void {
    const grupo = this.form.get(grupoNombre) as FormGroup;
    config.forEach((campo) => {
      const validators = SolicitanteComponent.getValidators(campo.validators);
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
  static getValidators(validators: string[]): ValidatorFn[] {
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
   * Obtiene los datos generales del solicitante con una petición GET.
   */
  getDatosGenerales(): void {
    this.solicitanteServicio
      .getDatosGenerales(CATALOGOS_ID.DATOS_PERSONA_FISICA)
      .pipe(
        tap((response) => {
          if (response) {
            const datos = JSON.parse(response.data);
            const datosSolicitante = datos.datosGenerales;

            const camposDatosGenerales =
              this.formServices.obtenerNombresCamposForm(this.datosGeneralesForm);

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