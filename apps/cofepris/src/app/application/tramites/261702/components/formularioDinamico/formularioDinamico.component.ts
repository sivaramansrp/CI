import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RetirosCofepris261702State, Tramite261702Store } from '../../../../estados/tramites/tramite261702.store';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '@libs/shared/data-access-user/src/core/models/shared/forms-model';
import { Tramite261702Query } from '../../../../estados/queries/tramite261702.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
/**
* FormularioDinamicoComponent es un componente que crea un formulario basado en el tipo de campo
*  con la ayuda de formdata pasando como entrada
* 
* @component
*/
@Component({
  selector: 'formulario-dinamico',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './formularioDinamico.component.html',
  styleUrl: './formularioDinamico.component.scss',
})
export class FormularioDinamicoComponent implements OnInit, OnDestroy {
  /**
   * compo doc
   * @type {FormGroup}
   * @memberof FormularioDinamicoComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({});

  /**
   * compo doc
   * @input formularioDatos
   * @type {FormularioDinamico[]}
   * @memberof FormularioDinamicoComponent
   * @description
   * Este es un arreglo de objetos de tipo FormularioDinamico.
   * Se utiliza para definir la estructura y configuración de los formularios dinámicos en el componente.
   */
  @Input() public formularioDatos!: FormularioDinamico[];

  /**
   * Suscripción a los cambios en el formulario reactivo.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Subject para notificar la destrucción del componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud de la sección 301.
   * @type {RetirosCofepris261702State}
   * @memberof FormularioDinamicoComponent
   */
  public retirosCofeprisState!: RetirosCofepris261702State;

  /**
   * compo doc
   * @constructor
   * Inicializa una nueva instancia del componente `FormulariosDeCertiRegistroComponent`.
   * 
   * @param fb un servicio que simplifica la creación de formularios reactivos
   * @param validacionesService servicio que procesa todas las validaciones
   */
  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private tramite261702Store: Tramite261702Store,
    private tramite261702Query: Tramite261702Query
  ) {
      // eslint-disable-next-line no-empty-function
    }

  /**
  * compo doc
   * @method ngOnInit
   * @description 
   * /**
     El gancho ngOnInit se llama para inicializar el formulario
   * @memberof FormularioDinamicoComponent
   */

  ngOnInit(): void {
    this.subscription.add(
      this.tramite261702Query.selectRetiros$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.retirosCofeprisState = seccionState;
          })
        )
        .subscribe()
    );
    this.inicializarFormulario();
  }

  /** compo doc
   * @method inicializarFormulario
   * @description La función inicializarFormulario se utiliza para crear el formulario 
   * utilizando los datos del formulario pasados como entrada a este componente
   */
  inicializarFormulario(): void {
    const FORMGROUP: { [key: string]: ReturnType<FormBuilder['control']> } = {};
    this.formularioDatos.forEach(campo => {
      const VALIDADORES = FormularioDinamicoComponent.obtenerValidadores(campo.validators);
      FORMGROUP[campo.campo] = this.fb.control(
        { value: this.retirosCofeprisState[campo.campo], disabled: campo.disabled },
        { validators: VALIDADORES }
      );
    });
    this.forma = this.fb.group(FORMGROUP);
    this.forma.get('folio')?.setValue('0402600201020254006000001');
    this.forma.get('tipoDeSolicitud')?.setValue('Permiso Sanitario de Importación de Medicamentos y Materias Primas Destinados a Pruebas de Laboratorio');
  }

  /**
   * compo doc
   * @method obtenerValidadores
   * @description
   * Esta función estática se utiliza para generar una lista de validadores de Angular
   * basados en una lista de validadores proporcionada como entrada.
   * 
   * @param {string[]} listaDeValidadores - Un arreglo de cadenas que representan los nombres
   * de los validadores que se deben aplicar a un campo del formulario.
   * 
   * @returns {ValidatorFn[]} - Un arreglo de funciones de validación (`ValidatorFn`) que
   * pueden ser utilizadas en un formulario reactivo de Angular.
   * 
   * @example
   * const validadores = FormularioDinamicoComponent.obtenerValidadores(['required']);
   * // validadores contendrá [Validators.required]
   */
  static obtenerValidadores(listaDeValidadores: string[]): ValidatorFn[] {
    const VALIDATORS = [];
    if (listaDeValidadores.includes('required')) {
      VALIDATORS.push(Validators.required);
    }
    return VALIDATORS;
  }

  /**
   * compo doc
   * @method isValid
   * @description 
   * Verifica si un campo específico del formulario es válido.
   * @param field El nombre del campo que se desea validar.
   * @returns Un valor booleano que indica si el campo es válido.
   */
  public isValid(campo: string): boolean | null {
    return this.validacionesService.isValid(this.forma, campo);
  }

  /**
   * compo doc
   * @method changeInValoresStore
   * @description 
   * Este método se utiliza para emitir un evento cuando hay un cambio en los valores del formulario.
   * Recibe como parámetros el formulario reactivo (FormGroup) y el campo que ha cambiado.
   * Luego, emite un objeto con esta información utilizando el EventEmitter `emitirValorCambiado`.
   * @param form - El formulario reactivo que contiene los datos.
   * @param campo - El nombre del campo que ha cambiado.
   */
  public changeInValoresStore(forma: FormGroup, campo: string): void {
    const VALOR = forma.get(campo)?.value;
    this.tramite261702Store.setDynamicFieldValue(campo, VALOR);
  }

  /**
   * @method ngOnDestroy
   * @description Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   * @memberof FormularioDinamicoComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
