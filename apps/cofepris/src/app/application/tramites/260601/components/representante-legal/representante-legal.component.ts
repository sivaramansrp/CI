import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AvisoSanitarioState, Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { MSG_ERROR_REPRESENTANTE_LEGAL } from '../../constantes/aviso-enum';
import { RepresentanteLegalRespuesta } from '../../models/aviso-model';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { ToastrService } from 'ngx-toastr';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';

/**
 * Componente para gestionar el representante legal.
 */
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent
  ],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.css',
})
export class RepresentanteLegalComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para gestionar los datos del representante legal.
   */
  representanteLegalForm!: FormGroup;

  /**
   * Estado actual del aviso sanitario.
   */
  public avisoSanitarioState!: AvisoSanitarioState;

  /**
    * Subject para destruir las suscripciones.
    */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * Inyecta servicios necesarios para gestionar el estado del trámite y las interacciones del formulario.
   *
   * @param fb FormBuilder para construir formularios reactivos.
   * @param tramite260601Store Store para gestionar el estado del trámite.
   * @param tramite260601Query Query para observar cambios en el estado del trámite.
   * @param avisoSanitarioService Servicio para gestionar las interacciones de aviso sanitario.
   * @param toastr Servicio para mostrar notificaciones al usuario.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260601Store: Tramite260601Store,
    private tramite260601Query: Tramite260601Query,
    private avisoSanitarioService: AvisoSanitarioService,
    private toastr: ToastrService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Inicializa el componente.
   * Suscribe al estado del trámite y configura el formulario principal.
   */
  ngOnInit(): void {
    this.tramite260601Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.avisoSanitarioState = seccionState;
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearFormulario();
  }

  /**
   * Crea y configura el formulario principal para el representante legal.
   */
  crearFormulario(): void {
    this.representanteLegalForm = this.fb.group({
      rfc: [
        this.avisoSanitarioState?.rfc,
        [
          Validators.required
        ]
      ],
      nombreOrazonsocial: [
        { value: this.avisoSanitarioState?.nombreOrazonsocial, disabled: true },
        Validators.required
      ],
      apellidoPaterno: [
        { value: this.avisoSanitarioState?.apellidoPaterno, disabled: true }
      ],
      apellidoMaterno: [
        { value: this.avisoSanitarioState?.apellidoMaterno, disabled: true }
      ]
    });
  }

  /**
   * Obtiene la información del representante legal según el RFC ingresado.
   * Actualiza el formulario con los datos obtenidos o muestra un error en caso de valor no válido.
   */
  obtenerRespuestaIDCPorRFC(): void {
    const RFC_REPRESENTANTE_LEGAL_COFEPRIS = this.representanteLegalForm.get('rfc')?.value;

    if (RFC_REPRESENTANTE_LEGAL_COFEPRIS === null || RFC_REPRESENTANTE_LEGAL_COFEPRIS === undefined || RFC_REPRESENTANTE_LEGAL_COFEPRIS === '') {
      this.toastr.error(MSG_ERROR_REPRESENTANTE_LEGAL);
      this.representanteLegalForm.reset();
    } else {
      this.avisoSanitarioService.buscarRfc()
        .pipe(takeUntil(this.destruirNotificador$))
        .subscribe({
          next: (result: RepresentanteLegalRespuesta) => {
            const REPRESENTANTE_LEGAL = result.data[0];
            this.representanteLegalForm.patchValue({
              nombreOrazonsocial: REPRESENTANTE_LEGAL.nombreOrazonsocial,
              apellidoPaterno: REPRESENTANTE_LEGAL.apellidoPaterno,
              apellidoMaterno: REPRESENTANTE_LEGAL.apellidoMaterno
            });
            this.tiendaCampoRepresentanteLegal();
          }
        })
    }
  }

  /**
   * Almacena los valores del formulario del representante legal en el store.
   */
  tiendaCampoRepresentanteLegal(): void {
    this.setValoresStore(this.representanteLegalForm, 'nombreOrazonsocial', 'setNombreOrazonsocial');
    this.setValoresStore(this.representanteLegalForm, 'apellidoPaterno', 'setApellidoPaterno');
    this.setValoresStore(this.representanteLegalForm, 'apellidoMaterno', 'setApellidoMaterno');
    this.setValoresStore(this.representanteLegalForm, 'rfc', 'setRfc');
  }

  /**
  * Establece los valores en el store de tramite260601.
  *
  * @param {FormGroup} form - El formulario del cual se obtiene el valor.
  * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
  * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
  * @returns {void}
  */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260601Store[metodoNombre] as (value: unknown) => void)(VALOR);
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
