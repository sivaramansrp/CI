import { Component, OnInit, OnDestroy } from '@angular/core';
import { ID_DE_USUARIO, ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL } from 'apps/se/src/app/application/tramites/120301/constantes/elegibilidad-de-textiles.enums';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from 'libs/shared/data-access-user/src/core/models/shared/forms-model';
import { FormulariosService } from 'libs/shared/data-access-user/src/core/services/shared/formularios/formularios.service';
import { ServiciosElegibilidadDeTextilesService } from '../../services/servicios-elegibilidad-de-textiles.service';
import { SolicitanteService } from 'libs/shared/data-access-user/src/core/services/shared/solicitante/solicitante.service';
import { Solicitante } from 'apps/se/src/app/application/tramites/120301/models/elegibilidad-de-textiles.model';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { tap } from 'rxjs';


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
   * @param {ServiciosElegibilidadDeTextilesService} ServiciosElegibilidadDeTextilesService - Servicio para la modificación de la extensión de emisión.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly solicitanteServices: SolicitanteService,
    private readonly formServices: FormulariosService,
    private readonly ServiciosElegibilidadDeTextilesService: ServiciosElegibilidadDeTextilesService
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
      .getDatosGenerales(ID_DE_USUARIO)
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
    const sol: Solicitante = this.form.value.datosGenerales as Solicitante;
    this.form.reset();
  }
}