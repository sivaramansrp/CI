import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TituloComponent, doDeepCopy, esValidObject } from '@ng-mf/data-access-user';
import { SolicitudService } from '../../service/solicitud.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite80302Store } from '../../../../estados/tramites/tramite80302.store';

@Component({
  selector: 'app-datos-certificacion',
  templateUrl: './datos-certificacion.component.html',
  styleUrl: './datos-certificacion.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, TituloComponent],
})
export class DatosCertificacionComponent implements OnDestroy{
  /**
   * Formulario reactivo para la certificación.
   * @type {FormGroup}
   */
  certificionForm!: FormGroup;

  /**
   * Valor del formulario de certificación.
   * @type {string}
   */
  formValue:string = '';

  /**
     * Subject utilizado para notificar cuando se debe completar y limpiar las suscripciones activas.
     * Esto evita fugas de memoria al completar las suscripciones al destruir el componente.
     * @private
     * @type {Subject<void>}
     */
    destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor de la clase.
   * Inicializa el formulario reactivo `certificionForm` con el valor "Si" y deshabilitado.
   * @param {FormBuilder} fb - Instancia de `FormBuilder` utilizada para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder, 
    public solicitudService: SolicitudService,
    private tramite80302Store: Tramite80302Store,
    private toastr: ToastrService,
  ) 
    {
    const PARAMS = { rfc: 'AAL0409235E6' };
    this.solicitudService.obtenerDatosCertificacionSat(PARAMS)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data) => {
          if (esValidObject(data)) {
            const RESPONSE = doDeepCopy(data);
            this.formValue = RESPONSE.datos.certificacionSAT;
            this.certificionForm.patchValue({
              certificion: this.formValue,
            });
            this.tramite80302Store.setCertificacionSAT(this.formValue);
          }
        },
        () => {
          this.toastr.error('Error al obtener los datos de certificación SAT.');
        }
      );
    this.certificionForm = this.fb.group({
      certificion: [{ value: '', disabled: true }], // El campo de certificación con valor "Si" y deshabilitado.
    });
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.complete(); // Finaliza el Subject para evitar fugas de memoria.
  }
}
