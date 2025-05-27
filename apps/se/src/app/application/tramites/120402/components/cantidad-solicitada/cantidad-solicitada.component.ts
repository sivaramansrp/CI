/**
 * Componente que representa un formulario para solicitar una cantidad específica.
 * Gestiona la validación y el envío del formulario.
 */
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';



import { ConsultaioQuery, TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';

import { Tramite120402Query } from '../../estados/queries/tramite120402.query';

import { Tramite120402State, Tramite120402Store } from '../../estados/tramites/tramite120402.store';

/**
 * Componente que representa un formulario para solicitar una cantidad específica.
 * Gestiona la validación y el envío del formulario.
 */
@Component({
  selector: 'app-cantidad-solicitada',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './cantidad-solicitada.component.html',
  styleUrl: './cantidad-solicitada.component.scss',
})
export class CantidadSolicitadaComponent implements OnInit, OnDestroy {

  /**
   * Suscripción a los cambios en el formulario react
   */
  private subscription: Subscription = new Subscription();

  /**
* Subject para notificar la destrucción del componente.
*/
  private destroyNotifier$: Subject<void> = new Subject();

  /**
  * Estado de la solicitud de la sección 120402.
  */
  public solicitudState!: Tramite120402State;


  /**
    * Indica si el formulario está en modo solo lectura.
    * Cuando es `true`, los campos del formulario no se pueden editar.
    */
  esFormularioSoloLectura: boolean = false;

  /**
   * Formulario reactivo para la solicitud de cantidad.
   */
  form!: FormGroup;

  /**
   * Subject utilizado para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * @param fb FormBuilder para la creación y gestión del formulario reactivo.
   */
  constructor(
    private fb: FormBuilder,
    public tramite120402Store: Tramite120402Store,
    public tramite120402Query: Tramite120402Query,
    public consultaioQuery: ConsultaioQuery,
  ) {
    /**
      * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
      *
      * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
      * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
      * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
      */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }

  /**
* Evalúa si se debe inicializar o cargar datos en el formulario.  
* Además, obtiene la información del catálogo de mercancía.
*/
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormulario();
    }
    //this.getMercancia();
  }

  /**
* Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
* Luego reinicializa el formulario con los valores actualizados desde el store.
*/
  guardarDatosFormulario(): void {
    this.crearFormulario();
    if (this.esFormularioSoloLectura) {
      this.form.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.form.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }
  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
   // this.getValorStore();
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Crea e inicializa el formulario con validaciones.
   */
  crearFormulario(): void {
    this.subscription.add(
      this.tramite120402Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe()
    );
    this.form = this.fb.group({
      cantidadSolicitada: [this.solicitudState?.cantidadSolicitada, [Validators.required]],
    });
  }

  /**
   * Verifica si un control del formulario es inválido.
   * @param nombreControl Nombre del control a verificar.
   * @returns Verdadero si el control es inválido, falso en caso contrario.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.form.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Valida y envía el formulario, mostrando mensajes en consola según el resultado.
   */
  validarYEnviarFormulario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
  }


     /**
   * Actualiza un valor específico en el store del trámite.
   * 
   * @param FormGroup - Formulario reactivo.
   * @param control - Nombre del control cuyo valor se actualizará en el store.
   */
   setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite120402Store.setTramite120402State({
      [control]: VALOR
    });
  }

}
