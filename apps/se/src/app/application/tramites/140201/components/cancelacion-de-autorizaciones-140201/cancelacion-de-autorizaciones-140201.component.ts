/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line sort-imports
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { TablaDinamicaComponent, TablaSeleccion, } from '@libs/shared/data-access-user/src';

import { Cancelaciones140201Service } from '../../services/cancelaciones-140201.service'

import { CancellationOfAuthorizations } from '../../models/cancelacions.model'

import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Cancelaciones140201Store } from '../../estados/cancelaciones.store';

import { Cancelaciones140201Query } from '../../estados/cancelaciones.query';

import { CANCELLATIONOFAUTHORIZATIONS } from '../../constantes/cancelacion-table140201.enum'
/**
 * @description
 * Componente para la cancelación de autorizaciones 140201.
 * Este componente maneja el formulario y la lógica para la cancelación de autorizaciones.
 * 
 * @example
 * <app-cancelacion-de-autorizaciones-140201></app-cancelacion-de-autorizaciones-140201>
 */
@Component({
  selector: 'app-cancelacion-de-autorizaciones-140201',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './cancelacion-de-autorizaciones-140201.component.html',
  styleUrl: './cancelacion-de-autorizaciones-140201.component.scss',
})
export class CancelacionDeAutorizaciones140201Component implements OnInit, OnDestroy {

  /**
   * @ignore
   */
  constructor(private fb: FormBuilder,
    private cancelacionesService: Cancelaciones140201Service,
    private cancelaciones140201Store: Cancelaciones140201Store,
    private cancelaciones140201Query: Cancelaciones140201Query
  ) {
    //constructor
  }

  /**
   * @ignore
   */
  private destroy$ = new Subject<void>();

  /**
   * Formulario reactivo para la cancelación de autorizaciones.
   */
  cancelacionForm!: FormGroup;

  /**
   * Variable para alternar la visibilidad del contenido.
   */
  mostrarContenido = false;

  /**
   * Observable para el RFC ingresado.
   */
  rfcIngresado$ = this.cancelaciones140201Query.rfcIngresado$;

  /**
   * Observable para el motivo de cancelación.
   */
  motivoCancelacion$ = this.cancelaciones140201Query.motivoCancelacion$;

  /**
   * Configuración de las columnas de la tabla.
   */
  configuracionTabla:ConfiguracionColumna<CancellationOfAuthorizations>[] = CANCELLATIONOFAUTHORIZATIONS;

  /**
   * Referencia al componente de selección de tabla.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Datos de cancelación de autorizaciones.
   */
  cancelacionData: CancellationOfAuthorizations[] = [];

  /**
   * Inicializa el componente.
   * Configura el formulario y obtiene los datos necesarios.
   */
  ngOnInit(): void {
    this.cancelacionForm = this.fb.group({
      rfcIngresado: ['', [Validators.required, Validators.maxLength(13)]],
      motivoCancelacion: ['', Validators.required]
    });

    this.getCancelacioneServiceData();
    this.updateState();
  }

  /**
   * Actualiza el estado del formulario con los datos observables.
   */
  updateState(): void {
    this.rfcIngresado$.subscribe((rfcIngresado) => {
      if (rfcIngresado) {
        this.cancelacionForm.get('rfcIngresado')?.setValue(rfcIngresado);
      }
    });

    this.motivoCancelacion$.subscribe((motivoCancelacion) => {
      if (motivoCancelacion) {
        this.cancelacionForm.get('motivoCancelacion')?.setValue(motivoCancelacion);
      }
    });
  }

  /**
   * Actualiza el RFC ingresado en el almacén.
   */
  updateRfcIngresado() {
    const RFCINGRESADO = this.cancelacionForm.get('rfcIngresado')?.value;
    this.cancelaciones140201Store.setRfcIngresado(RFCINGRESADO);
  }

  /**
   * Actualiza el motivo de cancelación en el almacén.
   */
  updateMotivoCancelacion() {
    const MOTIVOCANCELACION = this.cancelacionForm.get('motivoCancelacion')?.value;
    this.cancelaciones140201Store.setMotivoCancelacion(MOTIVOCANCELACION);
  }

  /**
   * Alterna la visibilidad del contenido.
   */
  alternarContenido(): void {
    this.mostrarContenido = !this.mostrarContenido;
  }

  /**
   * Obtiene los datos de cancelación de autorizaciones del servicio.
   */
  getCancelacioneServiceData(): void {
    this.cancelacionesService
      .getCancelacionDeAutorizaciones()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => { 
        this.cancelacionData = resp;
      });
  }

  /**
   * Destruye las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}