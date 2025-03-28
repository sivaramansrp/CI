import { CommonModule } from '@angular/common';

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { Solicitud260603State, Tramite260603Store } from '../../../shared/estados/stores/tramites260603.store';
import { Tramite260603Query } from '../../../shared/estados/queries/tramites260603.query';

import { Subject, map, takeUntil } from 'rxjs';

/**
 * @description
 * Componente que gestiona los datos del establecimiento.
 * Permite inicializar un formulario reactivo con los datos de la solicitud
 * y realizar operaciones relacionadas con el estado del trámite.
 */
@Component({
  selector: 'app-datos-del-establecimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './datos-del-establecimiento.component.html',
  styleUrl: './datos-del-establecimiento.component.scss',
})
export class DatosDelEstablecimientoComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Formulario reactivo para capturar los datos del establecimiento.
   */
  datosDelForm!: FormGroup;

  /**
   * @description
   * Variable que controla la visibilidad del modal.
   */
  public modal: string = 'modal';

  /**
   * @description
   * Referencia al elemento de cierre del modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * @description
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud260603State;

  /**
   * @description
   * Notificador para destruir observables y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @description
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param tramite260603Store Store para gestionar el estado del trámite.
   * @param tramite260603Query Query para obtener datos del estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260603Store: Tramite260603Store,
    private tramite260603Query: Tramite260603Query
  ) {
    // Llama al constructor de la clase base Query con el almacén inyectado.
  }

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo y sus valores iniciales basados en el estado de la solicitud.
   */
  ngOnInit(): void {
    this.tramite260603Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.datosDelForm = this.fb.group({
      denominacion: [this.solicitudState?.denominacion, [Validators.required]],
      correoElectronico: [this.solicitudState?.correoElectronico, [Validators.required, Validators.email]],
    });
  }

  /**
   * @description
   * Método que actualiza el estado del store con los valores del formulario.
   * @param form Formulario reactivo.
   * @param campo Campo del formulario que se desea actualizar.
   * @param metodoNombre Nombre del método del store que se invocará.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260603Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260603Store[metodoNombre] as (value: string | number) => void)(VALOR);
  }

  /**
   * @description
   * Método que abre el modal y carga el formulario con los datos predefinidos del representante.
   */
  public abrirModal(): void {
    this.modal = 'show'; // Muestra el modal
  }

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia los observables para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}