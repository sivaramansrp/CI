import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { Solicitud260603State, Tramite260603Store } from '../../../shared/estados/stores/tramites260603.store';
import { Tramite260603Query } from '../../../shared/estados/queries/tramites260603.query';

import { Subject, map, takeUntil } from 'rxjs';

/**
 * @description
 * Componente que gestiona los datos del representante legal.
 * Permite inicializar un formulario reactivo con los datos de la solicitud
 * y realizar operaciones relacionadas con el estado del trámite.
 */
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnInit {
  /**
   * @description
   * Formulario reactivo para capturar los datos del representante legal.
   */
  representanteLegalForm!: FormGroup;

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
    // Constructor
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

    this.representanteLegalForm = this.fb.group({
      /**
       * @description
       * Campo para capturar el RFC del representante legal.
       * Es un campo obligatorio con un máximo de 13 caracteres.
       */
      rfc: [this.solicitudState?.rfc, [Validators.required, Validators.maxLength(13)]],

      /**
       * @description
       * Campo para capturar el nombre o razón social del representante legal.
       * Este campo está deshabilitado por defecto y es obligatorio.
       */
      nombreRazonSocial: [{ value: '', disabled: true }, Validators.required],

      /**
       * @description
       * Campo para capturar el apellido paterno del representante legal.
       * Este campo está deshabilitado por defecto y es obligatorio.
       */
      apellidoPaterno: [{ value: '', disabled: true }, Validators.required],

      /**
       * @description
       * Campo para capturar el apellido materno del representante legal.
       * Este campo está deshabilitado por defecto y es opcional.
       */
      apellidoMaterno: [{ value: '', disabled: true }],
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
}
