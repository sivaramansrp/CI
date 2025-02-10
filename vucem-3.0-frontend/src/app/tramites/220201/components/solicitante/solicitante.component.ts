import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormularioDinamico } from '../../../../core/models/shared/forms-model';
import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';
import { IDDEUSUARIO } from '../../../../shared/constantes/certificado-zoosanitario.enum';
import { CertificadoZoosanitarioServiceService } from '../../../../core/services/220201/core/services/220201/certificado-zoosanitario.service';
import { SolicitanteService } from '../../../../core/services/shared/solicitante/solicitante.service';
import { solicitante } from '../../../../core/models/220201/capturar-solicitud.model';

import { ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL } from '../../../../shared/constantes/certificado-zoosanitario.enum';
import { tap } from 'rxjs';

/**
 * @fileoverview Componente para la gestión del formulario de solicitante.
 * Este componente se encarga de la lógica y la presentación del formulario de solicitante,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module solicitante
 */

/**
 * Componente para el formulario de solicitante.
 * @class SolicitanteComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrls: ['./solicitante.component.scss'],
})
export class SolicitanteComponent implements OnInit, OnDestroy {
  /**
   * Array de configuración para los campos del formulario de solicitante.
   * @property {FormularioDinamico[]} persona
   */
  persona: FormularioDinamico[] = [];

  /**
   * Grupo de formularios principal para el componente.
   * @property {FormGroup} form
   */
  form!: FormGroup;

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {SolicitanteService} solicitanteServices - Servicio para la gestión de solicitantes.
   * @param {FormulariosService} formServices - Servicio para la gestión de formularios.
   * @param {CertificadoZoosanitarioServiceService} CertificadoZoosanitarioServiceServicio - Servicio para la modificación de la extensión de emisión.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly solicitanteServices: SolicitanteService,
    private readonly formServices: FormulariosService,
    private readonly CertificadoZoosanitarioServiceServicio: CertificadoZoosanitarioServiceService
  ) {
    this.persona = ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL;
    this.crearFormulario();
  }

  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit() {
    this.inicializarFormGroup(this.persona, 'datosGenerales');
    this.obtenerDetallesDeUsuario();
  }

  /**
   * Obtiene los detalles del usuario y llena el formulario.
   * @method obtenerDetallesDeUsuario
   */
  obtenerDetallesDeUsuario() {
    this.solicitanteServices
      .getDatosGenerales(IDDEUSUARIO)
      .pipe(
        tap((response) => {
          if (response) {
            const datos = JSON.parse(response?.data);
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

  /**
   * Getter para el formulario de datos generales.
   * @property {FormGroup} datosGeneralesForm
   */
  get datosGeneralesForm() {
    return this.form.get('datosGenerales') as FormGroup;
  }

  /**
   * Crea el grupo de formularios principal.
   * @method crearFormulario
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      datosGenerales: this.fb.group({}),
    });
  }

  /**
   * Inicializa un grupo de formularios con campos dinámicos.
   * @method inicializarFormGroup
   * @param {FormularioDinamico[]} config - Array de configuración de campos.
   * @param {string} grupoNombre - Nombre del grupo de formularios.
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
   * Genera un array de validadores basados en cadenas.
   * @method getValidators
   * @param {string[]} validators - Array de cadenas de validadores.
   * @returns {ValidatorFn[]} - Array de funciones validadoras.
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
   * Se ejecuta al destruir el componente.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    const sol: solicitante = this.form.value.datosGenerales as solicitante;
    this.CertificadoZoosanitarioServiceServicio.setSoliciante(sol);
    this.form.reset();
  }
}