import {
  AlertComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DatosDomicilioLegalState,
  DatosDomicilioLegalStore,
} from '../../estados/stores/datos-domicilio-legal.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import CumplimientoOptions from '@libs/shared/theme/assets/json/260501/cumplimiento-options.json';
import { MENSAJE_DE_ALERTA } from '../../constantes/datos-domicilio-legal.enum';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';

/**
 * Componente principal para gestionar el formulario de manifiestos.
 */
@Component({
  selector: 'app-manifiestos',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    ReactiveFormsModule,
    InputRadioComponent,
  ],
  templateUrl: './manifiestos-declaraciones.component.html',
  styleUrl: './manifiestos-declaraciones.component.css',
})
export class ManifiestosComponent implements OnInit, OnDestroy {
  /**
   * Mensaje de alerta.
   */
  public mensaje: string = MENSAJE_DE_ALERTA;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: DatosDomicilioLegalState;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  cumplimientoOptions = CumplimientoOptions;

  /**
   * Constructor del componente.
   * @param fb
   * @param DatosDomicilioLegalStore
   * @param DatosDomicilioLegalQuery
   */
  constructor(
    private fb: FormBuilder,
    private DatosDomicilioLegalStore: DatosDomicilioLegalStore,
    private DatosDomicilioLegalQuery: DatosDomicilioLegalQuery
  ) {
    // Se inicial
  }

  /**
   * Grupo de formularios principal.
   * @property {FormGroup} manifiestos
   */
  manifiestos!: FormGroup;

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se inicializa.
   */
  ngOnInit(): void {
    this.DatosDomicilioLegalQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.manifiestos = this.fb.group({
      cumplimiento: [this.solicitudState?.cumplimiento, Validators.required],
    });
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof DatosDomicilioLegalStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.DatosDomicilioLegalStore[metodoNombre] as (
        value: string | number | boolean
      ) => void
    )(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
