import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SolicitudPermisoState,
  Tramite260703Store,
} from '../../estados/store/tramite260703.store';
import { Subject, takeUntil } from 'rxjs';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';

/**
 * Componente que representa la sección de datos del establecimiento.
 * Permite capturar y gestionar información relacionada con el establecimiento.
 */
@Component({
  selector: 'app-datos-del-establecimiento',
  templateUrl: './datos-del-establecimiento.component.html',
  styleUrl: './datos-del-establecimiento.component.scss',
})
export class DatosDelEstablecimientoComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para capturar los datos del establecimiento.
   */
  datosDelEstablecimientoForm!: FormGroup;

  /**
   * Estado actual de la solicitud de permiso.
   */
  solicitudPermisoState!: SolicitudPermisoState;

  /**
   * Observable utilizado para limpiar las suscripciones al destruirNotificacion el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  destruirNotificacion$ = new Subject<void>();

  /**
   * Constructor del componente.
   * formBuilder Servicio para construir formularios reactivos.
   * tramite260703Store Servicio para gestionar el estado del trámite.
   * tramite260703Query Servicio para consultar el estado del trámite.
   */
  constructor(
    private formBuilder: FormBuilder,
    private tramite260703Store: Tramite260703Store,
    private tramite260703Query: Tramite260703Query
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Configura las suscripciones necesarias y crea el formulario inicial.
   */
  ngOnInit(): void {
    this.tramite260703Query.selectSolicitudPermiso$
      .pipe(takeUntil(this.destruirNotificacion$))
      .subscribe((state) => {
        this.solicitudPermisoState = state;
      });
    this.crearFormularioDatosDelEstablecimiento();
  }

  /**
   * Crea el formulario reactivo para capturar los datos del establecimiento.
   * Inicializa los valores del formulario con el estado actual de la solicitud.
   */
  crearFormularioDatosDelEstablecimiento(): void {
    this.datosDelEstablecimientoForm = this.formBuilder.group({
      razonSocial: [
        this.solicitudPermisoState.datosDelEstablecimientoFormState.razonSocial,
        [Validators.required],
      ],
      correoElectronico: [
        this.solicitudPermisoState.datosDelEstablecimientoFormState
          .correoElectronico,
        [Validators.required, Validators.maxLength(320)],
      ],
    });
  }

  /**
   * Actualiza el estado del formulario de datos del establecimiento en el store.
   * @param campo Nombre del campo del formulario a actualizar.
   */
  setValoresStore(campo: string): void {
    this.tramite260703Store.actualizarDatosDelFormularioDelEstablecimiento({
      [campo]: this.datosDelEstablecimientoForm.get(campo)?.value,
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruirNotificacion el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destruirNotificacion$.next();
    this.destruirNotificacion$.complete();
  }
}
