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

import { Tramite120402Query } from '../../estados/tramite120402.query';

import { Tramite120402State, Tramite120402Store } from '../../estados/tramite120402.store';

/**
 * Componente que representa un formulario para solicitar una cantidad específica.
 * Gestiona la creación, validación, visualización en modo lectura y el envío del formulario.
 */
@Component({
  selector: 'app-cantidad-solicitada',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './cantidad-solicitada.component.html',
  styleUrl: './cantidad-solicitada.component.scss',
})
export class CantidadSolicitadaComponent implements OnInit, OnDestroy {

  /** Suscripción para manejar observables y evitar fugas de memoria */
  private subscription: Subscription = new Subscription();

  /** Subject que notifica la destrucción del componente para cancelar suscripciones */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado actual de la solicitud proveniente del store */
  public solicitudState!: Tramite120402State;

  /** Indica si el formulario está en modo solo lectura */
  esFormularioSoloLectura: boolean = false;

  /** Formulario reactivo para manejar la cantidad solicitada */
  form!: FormGroup;

  /** Subject auxiliar para manejar la destrucción del componente */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor que inyecta servicios y configura la suscripción al estado de solo lectura.
   * @param fb FormBuilder para construir el formulario reactivo
   * @param tramite120402Store Store para actualizar el estado del trámite
   * @param tramite120402Query Query para seleccionar datos del trámite
   * @param consultaioQuery Query para obtener el estado de la sección y el modo readonly
   */
  constructor(
    private fb: FormBuilder,
    public tramite120402Store: Tramite120402Store,
    public tramite120402Query: Tramite120402Query,
    public consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el formulario dependiendo del modo (solo lectura o editable).
   * Si está en solo lectura, carga y bloquea el formulario.
   * Si no, crea un formulario editable.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormulario();
    }
  }

  /**
   * Crea el formulario y, si está en modo solo lectura, lo deshabilita.
   * De lo contrario, lo habilita para edición.
   */
  guardarDatosFormulario(): void {
    this.crearFormulario();
    if (this.esFormularioSoloLectura) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  /**
   * Hook de Angular que se ejecuta al inicializar el componente.
   * Inicializa el formulario basándose en el estado actual.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Hook de Angular que se ejecuta al destruir el componente.
   * Completa los Subjects para cancelar suscripciones y evitar fugas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Crea el formulario reactivo y se suscribe a los cambios del estado de la solicitud.
   * Obtiene los datos actuales del store para inicializar los valores del formulario.
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
   * Evalúa si un control del formulario es inválido y ha sido tocado o modificado.
   * @param nombreControl Nombre del control a evaluar
   * @returns true si el control es inválido y fue tocado o modificado, false en otro caso
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.form.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Marca todos los controles como tocados si el formulario es inválido.
   * Puede ser extendido para realizar envíos si es válido.
   */
  validarYEnviarFormulario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
  }

  /**
   * Actualiza un campo específico del store con el valor actual del formulario.
   * @param FormGroup Formulario reactivo desde donde se obtiene el valor
   * @param control Nombre del control cuyo valor se desea actualizar en el store
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite120402Store.setTramite120402State({
      [control]: VALOR
    });
  }

}
