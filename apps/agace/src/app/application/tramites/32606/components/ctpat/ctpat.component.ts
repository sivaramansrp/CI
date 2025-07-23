import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery, ConsultaioState, InputRadioComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RADIO_01 } from '../../constantes/adace32606.enum';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Solicitud32606State, Tramite32606Store } from '../../state/Tramite32606.store';
import { map, ReplaySubject, takeUntil } from 'rxjs';

/** Componente para la sección CTPAT del trámite 32606. */
@Component({
  selector: 'app-ctpat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputRadioComponent],
  templateUrl: './ctpat.component.html',
  styleUrl: './ctpat.component.css',
})
export class CtpatComponent implements OnDestroy, OnInit {
  /** Opciones para el radio tipo 01. */
  radioOpcions01 = RADIO_01;
  /** Formulario reactivo principal de la sección CTPAT. */
  public ctpatForm !: FormGroup;
  /** Indica si el formulario está en modo solo lectura. */
  soloLectura: boolean = false;
  /** Estado actual de la solicitud. */
  public solicitudState!: Solicitud32606State;
  /** Observable para controlar la destrucción de suscripciones. */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /** Estado de consulta actual. */
  consultaDatos!: ConsultaioState;

  /** Constructor que inicializa servicios y suscripciones. */
  constructor(
    private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /** Inicializa el formulario y sus valores según el modo solo lectura. */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
    this.inicializarEstadoFormulario();
  }

  /** Establece el estado inicial del formulario según soloLectura. */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.donanteDomicilio();
    }
  }

  /** Habilita o deshabilita el formulario según soloLectura. */
  guardarDatosFormulario(): void {
    this.donanteDomicilio();
    if (this.soloLectura) {
      this.ctpatForm.disable();
    } else {
      this.ctpatForm.enable();
    }
  }

  /** Marca todos los campos como tocados si el formulario es inválido. */
  validarDestinatarioFormulario(): void {
    if (this.ctpatForm.invalid) {
      this.ctpatForm.markAllAsTouched();
    }
  }

  /**
   * Actualiza un valor en el store usando el nombre del método.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el almacén para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32606Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /** Inicializa el formulario con los valores del estado de la solicitud. */
  donanteDomicilio(): void {
    this.ctpatForm = this.fb.group({
      tipoRadio24: [{ value: this.solicitudState?.tipoRadio24, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio25: [{ value: this.solicitudState?.tipoRadio25, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio26: [{ value: this.solicitudState?.tipoRadio26, disabled: this.soloLectura }, [Validators.required]],
    });
  }

  /** Libera recursos y completa el observable destroyed$ al destruir el componente. */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}