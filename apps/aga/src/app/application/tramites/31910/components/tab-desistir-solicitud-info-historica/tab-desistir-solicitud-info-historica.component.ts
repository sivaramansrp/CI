import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud31910State, Tramite31910Store } from '../../../../estados/tramites/tramite31910.store';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Tramite31910Query } from '../../../../estados/queries/tramite31910.query';

/**
 * Componente que gestiona la información histórica de la solicitud de desistimiento.
 * Permite la creación y gestión de un formulario reactivo para capturar observaciones.
 */
@Component({
  selector: 'app-tab-desistir-solicitud-info-historica',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tab-desistir-solicitud-info-historica.component.html',
  styleUrl: './tab-desistir-solicitud-info-historica.component.scss',
})
export class TabDesistirSolicitudInfoHistoricaComponent implements OnInit, OnDestroy {
  /**
   * solicitud reactivo para capturar las observaciones del usuario.
   */
  solicitud!: FormGroup;

  /**
   * Estado actual de la solicitud 31910.
   */
  private seccionState!: Solicitud31910State;

  /**
   * Sujeto utilizado para manejar la destrucción de suscripciones.
   */
  private destroy$ = new Subject<void>();

  /**
   * Constructor que inicializa los servicios necesarios para el componente.
   */
  constructor(
    private fb: FormBuilder,
    private tramite31910Store: Tramite31910Store,
    private tramite31910Query: Tramite31910Query
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Configura las suscripciones y crea el formulario.
   */
  ngOnInit(): void {
    this.tramite31910Query.selectSolicitud$?.pipe(takeUntil(this.destroy$))
      .subscribe((data: Solicitud31910State) => {
        this.seccionState = data;
      });
    this.crearFormulario();
  }

  /**
   * Crea el solicitud reactivo con los campos necesarios.
   */
  crearFormulario(): void {
    this.solicitud = this.fb.group({
      justificacion: [this.seccionState?.justificacion, [Validators.required, Validators.maxLength(4000)]],
    });
  }

  /**
   * Actualiza el estado de la solicitud en el store con los valores del formulario.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.tramite31910Store.actualizarEstado({ [campo]: VALOR });
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}