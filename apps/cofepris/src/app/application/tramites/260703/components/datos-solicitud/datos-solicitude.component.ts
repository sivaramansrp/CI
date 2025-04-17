import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SolicitudPermisoState,
  Tramite260703Store,
} from '../../estados/store/tramite260703.store';
import { Subject, takeUntil } from 'rxjs';
import { OPCIONES_DE_BOTON_DE_RADIO_INFORMACION_CONFIDENCIAL } from '../../enum/solicitud-permiso.enum';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';

/**
 * Componente que representa la sección de datos de la solicitud.
 * Permite capturar y gestionar información relacionada con la solicitud.
 */
@Component({
  selector: 'app-datos-solitude',
  templateUrl: './datos-solicitude.component.html',
  styleUrl: './datos-solicitude.component.scss',
})
export class DatosSolitudeComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para capturar los datos preoperativos de la solicitud.
   */
  preOperativeForm!: FormGroup;

  /**
   * Estado actual de la solicitud de permiso.
   */
  solicitudPermisoState!: SolicitudPermisoState;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  destruirNotificacion$: Subject<void> = new Subject<void>();

  /**
   * Opciones de radio para seleccionar el tipo de solicitud.
   */
  radioOptions = OPCIONES_DE_BOTON_DE_RADIO_INFORMACION_CONFIDENCIAL;
 
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

    this.crearFormularioOperativo();
  }

  /**
   * Crea el formulario reactivo para capturar los datos preoperativos.
   * Inicializa los valores del formulario con el estado actual de la solicitud.
   */
  crearFormularioOperativo(): void {
    this.preOperativeForm = this.formBuilder.group({
      ideGenerica1: [
        this.solicitudPermisoState.preOperativFormState.ideGenerica1,
      ],
      observaciones: [
        this.solicitudPermisoState.preOperativFormState.observaciones,
        [Validators.required],
      ],
    });
  }

  /**
   * Actualiza el estado del formulario preoperativo en el store.
   * campo Nombre del campo del formulario a actualizar.
   */
  setValoresStore(campo: string): void {
    const VALOR = this.preOperativeForm.get(campo)?.value;
    this.tramite260703Store.actualizarEstadoFormularioPreOperativo({
      [campo]: VALOR,
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destruirNotificacion$.next();
    this.destruirNotificacion$.complete();
  }
}
