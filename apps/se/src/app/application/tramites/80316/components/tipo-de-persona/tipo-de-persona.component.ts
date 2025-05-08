import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BtnContinuarComponent,
  Catalogo,
  CatalogoSelectComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { SolicitudService } from '../../services/solicitud.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud80316State, Tramite80316Store } from '../../estados/tramite80316.store';
import { Tramite80316Query } from '../../estados/tramite80316.query';
import { map, merge, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tipo-de-persona',
  standalone: true,
  imports: [
    CommonModule,
    WizardComponent,
    BtnContinuarComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './tipo-de-persona.component.html',
  styleUrl: './tipo-de-persona.component.scss',
})
export class TipoDePersonaComponent {

  tipoDePersonaForm!: FormGroup;

  public destroyNotifier$: Subject<void> = new Subject();

  public derechoState: Solicitud80316State = {} as Solicitud80316State;

  tipoDePersona!: Catalogo[];

  constructor(
    public solicitudService: SolicitudService,
    private router: Router,
    private fb: FormBuilder,
    private tramite80316Store: Tramite80316Store,
    private tramite80316Query: Tramite80316Query
  ) { }

  ngOnInit(): void {
    this.tramite80316Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.derechoState = {
            ...this.derechoState,
            ...seccionState,
          };
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.inicializaCatalogos();
  }

  inicializarFormulario(): void {
    this.tipoDePersonaForm = this.fb.group({
      tipoDePersona: [this.derechoState?.tipoDePersona, Validators.required],
      RFCImpExp: [this.derechoState?.RFCImpExp, Validators.required]
    });
  }

  registroModificacion() {
    if (this.tipoDePersonaForm.invalid) {
      this.tipoDePersonaForm.markAllAsTouched();
    } else {
      this.router.navigate([
        '/pago/modificaciones-immex-prosec/registro-modificacion',
      ]);
    }
  }

  private inicializaCatalogos(): void {
    const TIPODEPERSONA$ = this.solicitudService.getTipoDePersona().pipe(
      map((resp) => {
        this.tipoDePersona = resp.data;
      })
    );

    merge(
      TIPODEPERSONA$
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
  }

  tipoDePersonaSeleccion(): void {
    const TIPODEPERSONA = this.tipoDePersonaForm.get('tipoDePersona')?.value;
    this.tramite80316Store.setActividadProductiva(TIPODEPERSONA);
  }

  /**
   * Establecer valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite80316Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite80316Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }

}
