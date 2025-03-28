import {
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DomicilioComponent } from '../domicilio-establecimiento/domicilio-establecimiento.component';
import { DatosDomicilioLegalState, DatosDomicilioLegalStore } from '../../estados/stores/datos-domicilio-legal.store';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { ManifiestosComponent } from '../manifiestos-declaraciones/manifiestos-declaraciones.component';
import { RepresentanteLegalComponent } from '../representante-legal-rfc/representante-legal-rfc.component';
/**
 * Componente responsable de gestionar y mostrar los datos principales del formulario,
 * incluyendo domicilio, manifiestos y representante legal.
 */
@Component({
  selector: 'app-datos-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    DomicilioComponent,
    ManifiestosComponent,
    RepresentanteLegalComponent,
  ],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosDeLaComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud.
   */
  public solicitudState!: DatosDomicilioLegalState;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param fb
   * @param DatosDomicilioLegalStore
   * @param DatosDomicilioLegalQuery
   */
  constructor(
    public readonly fb: FormBuilder,
    private DatosDomicilioLegalStore: DatosDomicilioLegalStore,
    private DatosDomicilioLegalQuery: DatosDomicilioLegalQuery
  ) {
    // Inicializa el formulario.
  }

  /**
   * Grupo de formularios principal.
   * @property {FormGroup} forma
   */
  forma!: FormGroup;

  /**
   * Método que se llama cuando se inicializa el componente
   * */
  ngOnInit() {
    this.DatosDomicilioLegalQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.forma = this.fb.group({
      rfcDel: [{ value: this.solicitudState?.rfcDel, disabled: true }],
      denominacion: [
        { value: this.solicitudState?.denominacion, disabled: true },
        Validators.required,
      ],
      correo: [
        { value: this.solicitudState?.correo, disabled: true },
        Validators.required,
      ],
    });
  }

  /**
   * Método que se llama cuando se envía el formulario.
   */
  alternarControlesDeFormulario() {
    Object.keys(this.forma.controls).forEach((controlName) => {
      const CONTROL = this.forma.get(controlName);
      if (CONTROL?.disabled) {
        CONTROL.enable();
      }
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
