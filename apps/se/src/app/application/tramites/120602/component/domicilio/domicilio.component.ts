import { CATALOGOS_ID, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA,DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL} from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';import { Subscription, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { FormulariosService } from '@ng-mf/data-access-user';
import { SolicitanteService } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
/**
 * `DomicilioComponent` maneja los datos del formulario relacionados con el domicilio
 * y gestiona la entrada del usuario para diferentes tipos de personas 
 * (Física Nacional, Moral Nacional, etc.).
 */
import { RepresentacionFederal } from '../../modelos/datos-empresa.model';
import { Tramite120602Store } from '../../estados/tramite-120602.store';

/**
 * Componente: DomicilioComponent
 * --------------------------------
 * Este componente gestiona los datos del domicilio fiscal en el proceso de captura de la empresa.
 * Permite la entrada, validación y prellenado de información de domicilio para diferentes tipos de personas (física/moral, nacional/extranjera).
 *
 * Uso:
 * <app-domicilio></app-domicilio>
 *
 * Funcionalidad:
 * - Permite capturar y validar los datos del domicilio fiscal mediante formularios reactivos.
 * - Soporta la carga dinámica de campos según el tipo de persona seleccionada.
 * - Permite prellenar el formulario con datos provenientes de otras fuentes (por ejemplo, plantas).
 * - Sincroniza los datos con el store global del trámite.
 *
 * Autor: [Agregar nombre del autor si se desea]
 * Fecha: 12/11/2025
 */

@Component({
  selector: 'app-domicilio',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './domicilio.component.html',
  styleUrl: './domicilio.component.scss',
})
export class DomicilioComponent implements OnInit, OnDestroy {
  /**
   * Propiedad de entrada para establecer dinámicamente el tabindex.
   */
  @Input() tabindex!: number;

  /**
   * Tipo de persona seleccionada en el formulario.
   * Puede ser una persona física o moral, nacional o extranjera.
   */
  tipoPersona!: number;

  /**
   * Configuración de los campos de formulario dinámicos para el domicilio fiscal.
   * Se carga según el tipo de persona seleccionada.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Formulario principal del componente.
   * Contiene subgrupos para organizar la estructura del domicilio fiscal.
   */
  form!: FormGroup;

    /** Manejo de la suscripción para evitar fugas de memoria. */
    private subscription: Subscription = new Subscription();

  /**
   * Constructor del componente.
   * 
   * @param solicitanteServicio - Servicio para obtener los datos del solicitante.
   * @param fb - Instancia de FormBuilder para la creación de formularios reactivos.
   * @param formServices - Servicio para manejar operaciones dinámicas del formulario.
   */
  constructor(
    private solicitanteServicio: SolicitanteService,
    private fb: FormBuilder,
    private tramite120602Store: Tramite120602Store
  ) {
    this.obtenerTipoPersona(TIPO_PERSONA.FISICA_NACIONAL);
    this.crearFormulario();
    this.inicializarFormGroup(this.domicilioFiscal, 'domicilioFiscal');
  }
  saveDomicilioFiscalToStore(): void {
    const DOMICILIO_DATOS = this.domicilioFiscalForm.value;
    this.tramite120602Store.setDomicilioFiscal(DOMICILIO_DATOS);
  }

  prefillDomicilioForm(plantasData: RepresentacionFederal[]): void {
    if (plantasData.length > 0) {
      const PLANTA = plantasData[0];
      this.domicilioFiscalForm.patchValue({
        calle: PLANTA.calle,
        nInt: PLANTA.numeroInterior,
        nExt: PLANTA.numeroExterior,
        codigoPostal: PLANTA.codigoPostal,
        colonia: PLANTA.colonia,
        localidad: PLANTA.localidad,
        municipio: PLANTA.municipio,
        entidadFederativa: PLANTA.estado,
        pais: PLANTA.pais,
        lada: PLANTA.lada,
        telefono: PLANTA.telefono,
      });
      this.saveDomicilioFiscalToStore();
    }
  }

  /**
   * Método del ciclo de vida de Angular.
   * Se ejecuta al inicializar el componente y obtiene los datos generales del solicitante.
   */
  ngOnInit(): void {
    this.getDatosGenerales();
  }

   /**
   * Se ejecuta al destruir el componente y se cancelan suscripciones activas.
   */
   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Determina el tipo de persona y asigna los campos del formulario correspondientes.
   * 
   * @param tipo - El tipo de persona (Física Nacional, Moral Nacional, Extranjera).
   */
  obtenerTipoPersona(tipo: number): void {
    this.tipoPersona = tipo;
    if (tipo === TIPO_PERSONA.FISICA_NACIONAL || tipo === TIPO_PERSONA.MORAL_NACIONAL) {
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    } else {
      this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA;
    }
  }

  /**
   * Getter para acceder al `FormGroup` del domicilio fiscal.
   * 
   * @returns FormGroup - Representa la sección del formulario de domicilio fiscal.
   */
  get domicilioFiscalForm(): FormGroup {
    return this.form.get('domicilioFiscal') as FormGroup;
  }

  /**
   * Crea la estructura del formulario principal con subgrupos anidados.
   */
  crearFormulario(): void {
    this.form = this.fb.group({

      domicilioFiscal: this.fb.group({}),
    });
  }

  /**
   * Inicializa los controles del formulario dinámicamente según la configuración proporcionada.
   * 
   * @param config - Matriz de configuración para los campos dinámicos.
   * @param grupoNombre - Nombre del grupo de formulario a inicializar.
   */
  inicializarFormGroup(config: FormularioDinamico[], grupoNombre: string): void {
    const GRUPO = this.form.get(grupoNombre) as FormGroup;
    config.forEach((campo) => {
      const VALIDATORS = DomicilioComponent.getValidators(campo.validators);
      GRUPO.addControl(campo.campo, this.fb.control({ value: '', disabled: campo.disabled }, VALIDATORS));
    });
  }

  /**
   * Mapea cadenas de validación a funciones de validadores de Angular.
   * 
   * @param validators - Matriz de validadores en formato de cadena (por ejemplo, `['required', 'maxLength:50']`).
   * @returns {ValidatorFn[]} - Matriz de funciones de validación de Angular.
   */
  static getValidators(validators: string[]): ValidatorFn[] {
    return validators.map((validator) => {
      if (validator === 'required') {
        return Validators.required;
      } else if (validator.startsWith('maxLength')) {
        const MAX = Number(validator.split(':')[1]);
        return Validators.maxLength(MAX);
      } else if (validator.startsWith('pattern')) {
        const PATTERN = validator.split(':')[1];
        return Validators.pattern(PATTERN);
      }
      return null;
    }).filter((validator): validator is ValidatorFn => validator !== null);
  }

  /**
   * Obtiene los datos generales del solicitante y los asigna al formulario.
   */
  getDatosGenerales(): void {
    this.subscription.add(
      this.solicitanteServicio.getDatosGenerales(CATALOGOS_ID.DATOS_PERSONA_FISICA)
        .pipe(
          tap((response) => {
            if (response) {
              const DATOS = JSON.parse(response.data);
              const DATOS_DOMICILIO_FISCAL = DATOS.domicilioFiscal;
              const CAMPOS_DATOS_DOMICILIO_FISCAL = FormulariosService.obtenerNombresCamposForm(this.domicilioFiscalForm);

              CAMPOS_DATOS_DOMICILIO_FISCAL.forEach((campo) => {
                FormulariosService.agregarValorCampoDesactivado(this.domicilioFiscalForm, campo, DATOS_DOMICILIO_FISCAL[campo]);
              });
            }
          })
        )
        .subscribe()
    );
  }
}


