import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AvisoSanitarioState, Tramite260601Store } from '../../estados/tramites/tramite260601.store';
import { map, Subject, takeUntil } from 'rxjs';
import { Tramite260601Query } from '../../estados/queries/tramite260601.query';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { ToastrService } from 'ngx-toastr';
import { MSG_ERROR_REPRESENTANTE_LEGAL } from '../../constantes/aviso-enum';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';

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
export class RepresentanteLegalComponent {
  representanteLegalForm!: FormGroup;

  public avisoSanitarioState!: AvisoSanitarioState;

  /**
    * Subject para destruir las suscripciones.
    */
  private destruirNotificador$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private tramite260601Store: Tramite260601Store,
    private tramite260601Query: Tramite260601Query,
    private avisoSanitarioService: AvisoSanitarioService,
    private toastr: ToastrService
  ) {
    // Inicializar el formulario principal
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.tramite260601Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.avisoSanitarioState = seccionState;
        })
      )
      .subscribe();
  }

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

  obtenerRespuestaIDCPorRFC() {
    let rfcRepresentanteLegalCofepris = this.representanteLegalForm.get('rfc')?.value;

    if (rfcRepresentanteLegalCofepris == null || rfcRepresentanteLegalCofepris == undefined || rfcRepresentanteLegalCofepris == '') {
      this.toastr.error(MSG_ERROR_REPRESENTANTE_LEGAL);
      this.representanteLegalForm.reset();
    } else {
      this.avisoSanitarioService.buscarRfc().subscribe({
        next: (result: any) => {
          let representanteLegal = result.data[0];
          this.representanteLegalForm.patchValue({
            nombreOrazonsocial: representanteLegal.nombreOrazonsocial,
            apellidoPaterno: representanteLegal.apellidoPaterno,
            apellidoMaterno: representanteLegal.apellidoMaterno
          });
        }
      })
    }
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
