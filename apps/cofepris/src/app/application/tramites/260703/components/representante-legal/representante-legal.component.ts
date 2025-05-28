import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudPermisoState, Tramite260703Store } from '../../estados/store/tramite260703.store';
import { Subject, takeUntil } from 'rxjs';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';

@Component({
  selector: 'app-representante-legal',
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnInit, OnDestroy{
   /**
     * Formulario principal para gestionar los datos del representante legal.
     */
    representanteLegalForm!: FormGroup;

    /**
     * Estado actual de la solicitud de permiso.
     * Se utiliza para gestionar y observar los datos relacionados con el representante legal.
     */
    solicitudPermisoState!: SolicitudPermisoState;
  
    /**
      * Subject para destruir las suscripciones.
      */
    private destruirNotificador$: Subject<void> = new Subject();
  
    /**
     * Constructor del componente.
     * Inyecta servicios necesarios para gestionar el estado del trámite y las interacciones del formulario.
     *
     * formBuilder FormBuilder para construir formularios reactivos.
     * tramite260703Store Store para gestionar el estado del trámite.
     * tramite260703Query Query para observar cambios en el estado del trámite.
     * solicitudPermisoService Servicio para gestionar las interacciones de aviso sanitario.
     * toastr Servicio para mostrar notificaciones al usuario.
     */
    constructor(
      private formBuilder: FormBuilder,
      private tramite260703Store: Tramite260703Store,
      private tramite260703Query: Tramite260703Query,
      private solicitudPermisoService: SolicitudPermisoService,
    ) {
      // El constructor se utiliza para la inyección de dependencias.
    }
  
    /**
     * Inicializa el componente.
     * Suscribe al estado del trámite y configura el formulario principal.
     */
    ngOnInit(): void {
      this.tramite260703Query.selectSolicitudPermiso$
        .pipe(
          takeUntil(this.destruirNotificador$))
        .subscribe((seccionState) => {
          this.solicitudPermisoState = seccionState;
        });
  
      this.crearFormulario();
    }
  
    /**
     * Crea y configura el formulario principal para el representante legal.
     */
    crearFormulario(): void {
      this.representanteLegalForm = this.formBuilder.group({
        rfc: [
          this.solicitudPermisoState?.representanteLegalFormState.rfc,
          [
            Validators.required,
            Validators.maxLength(13)
          ]
        ],
        nombreOrazonsocial: [
          { value: this.solicitudPermisoState?.representanteLegalFormState.nombreOrazonsocial, disabled: true },
          Validators.required
        ],
        apellidoPaterno: [
          { value: this.solicitudPermisoState?.representanteLegalFormState.apellidoPaterno, disabled: true }
        ],
        apellidoMaterno: [
          { value: this.solicitudPermisoState?.representanteLegalFormState.apellidoMaterno, disabled: true }
        ]
      });
    }
  
    /**
    * Establece los valores en el store de tramite260703.
    *
    * {FormGroup} form - El formulario del cual se obtiene el valor.
    * {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
    */
    setValoresStore(campo: string): void {
      const VALOR = this.representanteLegalForm.get(campo)?.value;
      this.tramite260703Store.actualizarEstadoFormularioRepresentanteLegal({
        [campo]: VALOR
      });
    }
  
    /**
     * Se ejecuta al destruir el componente.
     * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
     */
    ngOnDestroy(): void {
      this.destruirNotificador$.next();
      this.destruirNotificador$.complete();
    }
}
