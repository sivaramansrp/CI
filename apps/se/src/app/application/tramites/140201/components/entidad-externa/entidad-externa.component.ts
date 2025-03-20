/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { CancelacionesStore } from '../../estados/cancelaciones.store';

import { CancelacionesQuery } from '../../estados/cancelaciones.query';

import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
/**
 * @description
 * Componente para manejar la entidad externa en el trámite 140201.
 * Este componente maneja el formulario y la lógica para la entidad externa.
 * 
 * @example
 * <app-entidad-externa></app-entidad-externa>
 */
@Component({
  selector: 'app-entidad-externa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './entidad-externa.component.html',
  styleUrl: './entidad-externa.component.scss',
})
export class EntidadExternaComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la entidad externa.
   */
  entidadForm!: FormGroup;

  /**
   * @ignore
   */
  private destroy$ = new Subject<void>();

  /**
   * Observable para la entidad externa.
   */
  entidadExterna$ = this.cancelacionesQuery.entidadExterna$;

  /**
   * Observable para el nombre del solicitante IPC.
   */
  nombreSolicitanteIPC$ = this.cancelacionesQuery.nombreSolicitanteIPC$;

  /**
   * Observable para el cargo del solicitante IPC.
   */
  cargoSolicitanteIPC$ = this.cancelacionesQuery.cargoSolicitanteIPC$;

  /**
   * Observable para el folio del oficio de solicitud IPC.
   */
  folioOficioSolicitudIPC$ = this.cancelacionesQuery.folioOficioSolicitudIPC$;

  /**
   * Observable para el correo del solicitante IPC.
   */
  correoSolicitanteIPC$ = this.cancelacionesQuery.correoSolicitanteIPC$;

  /**
   * @ignore
   */
  constructor(private fb: FormBuilder,
    private cancelacionesStore: CancelacionesStore,
    private cancelacionesQuery: CancelacionesQuery
  ) {
    //constructor
  }

  /**
   * Inicializa el componente.
   * Configura el formulario y actualiza el estado con los datos observables.
   */
  ngOnInit(): void {
    this.entidadForm = this.fb.group({
      entidadExterna: ['', [Validators.required, Validators.maxLength(255)]],
      nombreSolicitanteIPC: ['', [Validators.required, Validators.maxLength(255)]],
      cargoSolicitanteIPC: ['', [Validators.maxLength(255)]],
      folioOficioSolicitudIPC: ['', [Validators.required, Validators.maxLength(30)]],
      fechaSolicitudIPC: [{ value: '', disabled: true }, [Validators.maxLength(20)]],
      correoSolicitanteIPC: ['', [Validators.maxLength(255)]]
    });
    this.updateState();
  }

  /**
   * Actualiza el estado del formulario con los datos observables.
   */
  updateState(): void {
    this.entidadExterna$.pipe(takeUntil(this.destroy$)).subscribe((entidadExterna) => {
      if (entidadExterna) {
        this.entidadForm.get('entidadExterna')?.setValue(entidadExterna);
      }
    });

    this.nombreSolicitanteIPC$.pipe(takeUntil(this.destroy$)).subscribe((nombreSolicitanteIPC) => {
      if (nombreSolicitanteIPC) {
        this.entidadForm.get('nombreSolicitanteIPC')?.setValue(nombreSolicitanteIPC);
      }
    });

    this.cargoSolicitanteIPC$.pipe(takeUntil(this.destroy$)).subscribe((cargoSolicitanteIPC) => {
      if (cargoSolicitanteIPC) {
        this.entidadForm.get('cargoSolicitanteIPC')?.setValue(cargoSolicitanteIPC);
      }
    });

    this.folioOficioSolicitudIPC$.pipe(takeUntil(this.destroy$)).subscribe((folioOficioSolicitudIPC) => {
      if (folioOficioSolicitudIPC) {
        this.entidadForm.get('folioOficioSolicitudIPC')?.setValue(folioOficioSolicitudIPC);
      }
    });

    this.correoSolicitanteIPC$.pipe(takeUntil(this.destroy$)).subscribe((correoSolicitanteIPC) => {
      if (correoSolicitanteIPC) {
        this.entidadForm.get('correoSolicitanteIPC')?.setValue(correoSolicitanteIPC);
      }
    });
  }

  /**
   * Actualiza la entidad externa en el almacén.
   */
  updateEntidadExterna() {
    const ENTIDADEXTERNA = this.entidadForm.get('entidadExterna')?.value;
    this.cancelacionesStore.setEntidadExterna(ENTIDADEXTERNA);
  }

  /**
   * Actualiza el nombre del solicitante IPC en el almacén.
   */
  updateNombreSolicitanteIPC() {
    const NOMBRESOLICITANTEIPC = this.entidadForm.get('nombreSolicitanteIPC')?.value;
    this.cancelacionesStore.setNombreSolicitanteIPC(NOMBRESOLICITANTEIPC);
  }

  /**
   * Actualiza el cargo del solicitante IPC en el almacén.
   */
  updateCargoSolicitanteIPC() {
    const CARGOSOLICITANTEIPC = this.entidadForm.get('cargoSolicitanteIPC')?.value;
    this.cancelacionesStore.setCargoSolicitanteIPC(CARGOSOLICITANTEIPC);
  }

  /**
   * Actualiza el folio del oficio de solicitud IPC en el almacén.
   */
  updateFolioOficioSolicitudIPC() {
    const FOLIOOFICIOSOLICITUDIPC = this.entidadForm.get('folioOficioSolicitudIPC')?.value;
    this.cancelacionesStore.setFolioOficioSolicitudIPC(FOLIOOFICIOSOLICITUDIPC);
  }

  /**
   * Actualiza el correo del solicitante IPC en el almacén.
   */
  updateCorreoSolicitanteIPC() {
    const CORREOSOLICITANTEIPC = this.entidadForm.get('correoSolicitanteIPC')?.value;
    this.cancelacionesStore.setCorreoSolicitanteIPC(CORREOSOLICITANTEIPC);
  }

  /**
 * Destruye las suscripciones para evitar fugas de memoria.
 */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}