import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitud80316State, Tramite80316Store } from '../../estados/tramite80316.store';
import { Subject, takeUntil } from 'rxjs';
import { DatosCertificacion } from '../../models/datos-tramite.model';
import { SolicitudService } from '../../services/solicitud.service';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * Componente `DatosCertificacionComponent` utilizado para gestionar y mostrar los datos relacionados con la certificación.
 * Este componente es independiente (standalone) y utiliza formularios reactivos para manejar los datos.
 */
@Component({
  selector: 'app-datos-certificacion',
  templateUrl: './datos-certificacion.component.html',
  styleUrl: './datos-certificacion.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, TituloComponent],
})
export class DatosCertificacionComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la certificación.
   * Este formulario contiene los campos relacionados con la certificación, como el estado de certificación,
   * la fecha de inicio y la fecha de vigencia.
   * 
   * @type {FormGroup}
   */
  certificionForm!: FormGroup;

   /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud80316State;

  /**
   * Notificador para limpiar suscripciones al destruir el componente.
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Constructor del componente `DatosCertificacionComponent`.
   * Inicializa el formulario reactivo `certificionForm` con valores predeterminados y deshabilitados.
   * 
   * @param {FormBuilder} fb - Instancia de `FormBuilder` utilizada para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder, public solicitudService: SolicitudService, private tramite80316Store: Tramite80316Store) {
    this.certificionForm = this.fb.group({
      /**
       * Campo `certificion`:
       * Representa el estado de certificación. Por defecto, tiene el valor "Si" y está deshabilitado.
       */
      certificion: [{ value: this.solicitudState?.certificion, disabled: true }],

      /**
       * Campo `fechaInicio`:
       * Representa la fecha de inicio de la certificación. Por defecto, está vacío y deshabilitado.
       */
      fechaInicio: [{ value: this.solicitudState?.fechaInicio, disabled: true }],

      /**
       * Campo `fechaVigencia`:
       * Representa la fecha de vigencia de la certificación. Por defecto, está vacío y deshabilitado.
       */
      fechaVigencia: [{ value: this.solicitudState?.fechaVigencia, disabled: true }]
    });
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario, carga los datos de modificación y los datos de la tabla.
   */
  ngOnInit(): void {
    this.loadDatosCertificacion();
  }

  /**
   * Carga los datos de certificación desde el servicio y actualiza el formulario reactivo con los valores obtenidos.
   * También actualiza el estado global a través del store.
   */
  loadDatosCertificacion(): void {
    (this.solicitudService.getDatosCertificacion() as import('rxjs').Observable<DatosCertificacion>)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: DatosCertificacion) => {
        (this.tramite80316Store.setDatosCertificacion as (valor: unknown) => void)(datos);
        if (datos) {
          this.certificionForm.patchValue({
            certificion: datos.certificion,
            fechaInicio: datos.fechaInicio,
            fechaVigencia: datos.fechaVigencia
          });
        }
      });
  }

  /**
   * Limpia las suscripciones activas al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}
