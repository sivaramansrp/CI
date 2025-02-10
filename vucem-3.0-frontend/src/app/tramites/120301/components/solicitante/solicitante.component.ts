import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators, 
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '../../../../core/models/shared/forms-model';
import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';
import { ServiciosElegibilidadDeTextilesService } from '../../../../core/services/120301/servicios-elegibilidad-de-textiles.service';
import { SolicitanteService } from '../../../../core/services/shared/solicitante/solicitante.service';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL } from '../../../../shared/constantes/elegibilidad-de-textiles.enums';


@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrls: ['./solicitante.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
  ],
})
/**
 * @component SolicitanteComponent
 * @description Este componente maneja el formulario para la sección "Solicitante", incluyendo la inicialización, obtención de datos y gestión de controles del formulario.
 * 
 * @example
 * <app-solicitante></app-solicitante>
 * 
 * @function crearFormulario
 * @description Inicializa el grupo de formularios para el componente.
 * 
 * @function inicializarFormGroup
 * @description Inicializa un grupo de formularios con campos dinámicos basados en la configuración proporcionada.
 * @param {FormularioDinamico[]} config - Array de configuración de campos de formulario dinámicos.
 * @param {string} grupoNombre - El nombre del grupo de formularios a inicializar.
 * 
 * @function obtenerDetallesDeUsuario
 * @description Obtiene los detalles del usuario y llena el formulario con los datos obtenidos.
 * 
 * @function getValidators
 * @description Genera un array de ValidatorFn de Angular basado en las cadenas de validadores proporcionadas.
 * @param {string[]} validators - Un array de cadenas que representan los validadores a aplicar.
 * @returns {ValidatorFn[]} Un array de ValidatorFn para ser usados en formularios de Angular.
 * 
 * @function ngOnDestroy
 * @description Limpia el componente reseteando el formulario y estableciendo los datos del "Solicitante" en el servicio.
 * 
 * @property {FormularioDinamico[]} persona - Array de campos de formulario dinámicos para el "Solicitante".
 * @property {FormGroup} form - El grupo de formularios principal para el componente.
 * 
 * @example
 * // Ejemplo de uso:
 * const validators = getValidators(['required', 'maxLength:10', 'pattern:^[a-zA-Z]+$']);
 * // Devuelve un array de ValidatorFn incluyendo Validators.required, Validators.maxLength(10), y Validators.pattern(/^[a-zA-Z]+$/)
 * 
 * @compodoc
 */
export class SolicitanteComponent implements OnInit {
  persona: FormularioDinamico[] = [];
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly solicitanteServices: SolicitanteService,
    private readonly formServices: FormulariosService,
    private readonly MódulodeModificacióndeExtensióndeemisiónService: ServiciosElegibilidadDeTextilesService
  ) {
    this.persona = ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL;
    this.crearFormulario();
  }

  ngOnInit() {
    this.inicializarFormGroup(this.persona, 'datosGenerales');
    // this.obtenerDetallesDeUsuario();
  }

  // obtenerDetallesDeUsuario() {
  //   this.solicitanteServices
  //     .getDatosGenerales(IDDEUSUARIO)
  //     .pipe(
  //       tap((response) => {
  //         if (response) {
  //           const datos = JSON.parse(response?.data);
  //           const datosSolicitante = datos.datosGenerales;
  //           const camposDatosGenerales =
  //             this.formServices.obtenerNombresCamposForm(
  //               this.datosGeneralesForm
  //             );
  //           camposDatosGenerales.forEach((campo) => {
  //             this.formServices.agregarValorCampoDesactivados(
  //               this.datosGeneralesForm,
  //               campo,
  //               datosSolicitante[campo]
  //             );
  //           });
  //         }
  //       })
  //     )
  //     .subscribe();
  // }

  get datosGeneralesForm() {
    return this.form.get('datosGenerales') as FormGroup;
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      datosGenerales: this.fb.group({}),
    });
  }

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
   * @function getValidators
   * @description Genera un array de ValidatorFn de Angular basado en las cadenas de validadores proporcionadas.
   * @param {string[]} validators - Un array de cadenas que representan los validadores a aplicar.
   * @returns {ValidatorFn[]} Un array de ValidatorFn para ser usados en formularios de Angular.
   * 
   * @example
   * // Ejemplo de uso:
   * const validators = getValidators(['required', 'maxLength:10', 'pattern:^[a-zA-Z]+$']);
   * // Devuelve un array de ValidatorFn incluyendo Validators.required, Validators.maxLength(10), y Validators.pattern(/^[a-zA-Z]+$/)
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

  // ngOnDestroy(): void {
  //   const sol: solicitante = this.form.value.datosGenerales as solicitante;
  //   this.MódulodeModificacióndeExtensióndeemisiónService.setSoliciante(sol);
  //   this.form.reset();
  // }
}