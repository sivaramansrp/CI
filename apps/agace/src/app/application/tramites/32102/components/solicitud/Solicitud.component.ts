import {AbstractControl, FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,ValidationErrors,ValidatorFn} from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Solicitud32102State, Tramite32102Store } from '../../../../estados/tramites/tramite32102.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Solicitud32102Enum } from '../../constants/solicitud32101.enum';
import {TituloComponent} from '@libs/shared/data-access-user/src';
import { Tramite32102Query } from '../../../../estados/queries/tramite32102.query';
/**
 * Componente que representa la solicitud en el contexto del trámite 32102.
 * Este componente utiliza un formulario reactivo para gestionar los datos
 * relacionados con el aviso de extensión y permite la interacción con el estado
 * del trámite a través de un store y un query.
 */
@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, FormsModule],
  providers: [],
  templateUrl: './Solicitud.component.html',
  styleUrl: './Solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * Representa el formulario reactivo utilizado para gestionar los datos
   * relacionados con el aviso de extensión en el componente de solicitud.
   *
   * @type {FormGroup}
   */
  formularioAvisoDeExtension!: FormGroup;

  /**
   * Enumeración que representa los valores posibles para la solicitud en el contexto del trámite 32102.
   * Utiliza la enumeración `Solicitud32102Enum` para definir los estados o tipos de solicitud disponibles.
   */
  solicitudEnum = Solicitud32102Enum;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud32102State;

  /**
   * Sujeto utilizado como notificador para la destrucción del componente.
   * Se emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones o liberar recursos asociados.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    public tramite32102Store: Tramite32102Store,
    private tramite32102Query: Tramite32102Query
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * - Suscribe al observable `selectSolicitud$` del servicio `tramite32102Query` para obtener el estado de la solicitud
   *   y lo asigna a la propiedad `solicitudState`. La suscripción se gestiona con `takeUntil` para evitar fugas de memoria.
   * - Llama al método `inicializarFormulario` para configurar el formulario inicial del componente.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  ngOnInit(): void {
    this.tramite32102Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Emite un valor en el observable `destroyNotifier$` para notificar a los suscriptores
   * que deben limpiar recursos o cancelar suscripciones, y luego completa el observable.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Inicializa el formulario `formularioAvisoDeExtension` con un conjunto de controles reactivos.
   * Cada control está asociado a una propiedad del estado `solicitudState` y requiere que su valor sea verdadero.
   *
   * @returns {void} No retorna ningún valor.
   */
  inicializarFormulario(): void {
    this.formularioAvisoDeExtension = this.fb.group(
      {
        MANIFIESTO_1: [this.solicitudState?.MANIFIESTO_1 || false],
        MANIFIESTO_2: [this.solicitudState?.MANIFIESTO_2 || false],
        MANIFIESTO_3: [this.solicitudState?.MANIFIESTO_3 || false],
        MANIFIESTO_4: [this.solicitudState?.MANIFIESTO_4 || false],
      },
      { validators: SolicitudComponent.allCheckboxesSelectedValidator() } // Add the custom validator here
    );
  }

  /**
   * Validador personalizado que verifica si todos los checkboxes en un formulario están seleccionados.
   *
   * @returns {ValidatorFn} Una función de validación que evalúa si todos los controles en el formulario tienen un valor `true`.
   * 
   * @example
   * const formGroup = new FormGroup({
   *   checkbox1: new FormControl(false),
   *   checkbox2: new FormControl(true),
   * });
   * 
   * formGroup.setValidators(SolicitudComponent.allCheckboxesSelectedValidator());
   * 
   * // Resultado: { notAllSelected: true } si no todos los checkboxes están seleccionados.
   * 
   * @remarks
   * Este validador asume que los controles del formulario son checkboxes con valores booleanos.
   * Si todos los controles tienen el valor `true`, el validador devuelve `null` (válido).
   * Si al menos uno de los controles tiene un valor diferente de `true`, devuelve un error con la clave `notAllSelected`.
   */
  static allCheckboxesSelectedValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const CONTROLS = (formGroup as FormGroup).controls;
      const ARE_ALL_CHECKED = Object.values(CONTROLS).every(
        (control) => control.value === true
      );
      return ARE_ALL_CHECKED ? null : { notAllSelected: true };
    };
  }

  /**
   * Establecer valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32102Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite32102Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }
}
