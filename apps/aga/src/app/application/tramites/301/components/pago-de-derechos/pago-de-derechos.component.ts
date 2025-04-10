/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud301State,
  Tramite301Store,
} from '../../../../core/estados/tramites/tramite301.store';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite301Query } from '../../../../core/queries/tramite301.query';

/**
 * Componente `PagoDeDerechosComponent`
 *
 * Este componente se encarga de gestionar un formulario para la solicitud de pago de derechos.
 * El formulario contiene campos como la línea y el monto del pago. Al inicializarse, se configura el formulario
 * y se establece un valor predeterminado para el campo 'monto', deshabilitándolo.
 *
 * @component
 * @example
 * <app-pago-de-derechos></app-pago-de-derechos>
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule],
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo que contiene los campos de datos del importador/exportador.
   * El formulario incluye un campo 'linea' y un campo 'monto' con validaciones de 'required'.
   *
   * @type {FormGroup}
   */
  FormSolicitud!: FormGroup;

  /**
   * Suscripción a los cambios en el formulario reactivo.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Estado de la solicitud de la sección 301.
   */
  public solicitudState!: Solicitud301State;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente `PagoDeDerechosComponent`.
   *
   * Inicializa la instancia de `FormBuilder` para crear formularios reactivos.
   *
   * @param {FormBuilder} fb - Instancia de FormBuilder utilizada para construir formularios reactivos.
   */
  constructor(
    private fb: FormBuilder,
    private tramite301Store: Tramite301Store,
    private tramite301Query: Tramite301Query
  ) {}

  /**
   * Método del ciclo de vida `ngOnInit()`.
   * Este método se ejecuta cuando el componente se inicializa y realiza las siguientes acciones:
   * - Inicializa el formulario reactivo `FormSolicitud` con dos campos: `linea` y `monto`.
   * - Llama al método `updateformfied()` para configurar el campo 'monto', deshabilitándolo y estableciendo un valor predeterminado.
   *
   * @memberof PagoDeDerechosComponent
   */
  ngOnInit(): void {
    // Inicializa el formulario con validaciones requeridas
    this.subscription.add(
      this.tramite301Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe()
    );

    this.FormSolicitud = this.fb.group({
      pagodederechos: this.fb.group({
        linea: [this.solicitudState?.linea, Validators.required],
        monto: ['', Validators.required],
        lineaCheckbox: [this.solicitudState?.lineaCheckbox],
      }),
    });

    // Llama al método para actualizar el campo 'monto'
    this.updateformfied();
  }

  /**
   * Método `updateformfied()`.
   * Este método se encarga de actualizar el campo 'monto' dentro del formulario:
   * - Deshabilita el campo 'monto'.
   * - Establece el valor predeterminado de 'monto' a '4845'.
   *
   * @memberof PagoDeDerechosComponent
   */
  updateformfied(): void {
    // Deshabilita el campo 'monto' y asigna el valor '4845'
    this.FormSolicitud.get('pagodederechos.monto')?.disable();
    this.FormSolicitud.get('pagodederechos.monto')?.setValue('4845');
  }

  /**
   * Método `onSubmit()`.
   * Este método se ejecuta cuando se envía el formulario y realiza las siguientes acciones:
   * - Valida si el formulario es válido.
   * - Llama al método `setValoresStore()` para guardar los valores del formulario en el estado.
   *
   * @param {FormGroup} form - Formulario reactivo que contiene los campos de datos del importador/exportador.
   * @memberof PagoDeDerechosComponent
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite301Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  /**
   * Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   *
   * @memberof PagoDeDerechosComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
