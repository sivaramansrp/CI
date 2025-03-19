/**
 * DatosDelLas140201Component
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NotifDomicileComponent } from '../notif-domicile/notif-domicile.component';

import { CancelacionesStore } from '../../estados/cancelaciones.store';

import { CancelacionesQuery } from '../../estados/cancelaciones.query';
import { CancelacionesService } from '../../services/cancelaciones.service';

import { Subject, takeUntil } from 'rxjs';

/**
 * Componente DatosDelLasComponent
 * 
 * Este componente es responsable de manejar el formulario de notificación de personas
 * para el trámite 140201. Permite la actualización de los datos de nombre, apellido paterno
 * y correo electrónico, y carga la información adicional desde el servicio.
 */
@Component({
  selector: 'app-datos-del-las',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    NotifDomicileComponent,
  ],
  templateUrl: './datos-del-las.component.html',
  styleUrl: './datos-del-las.component.scss',
})
/** DatosDelLasComponent */
export class DatosDelLasComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para la notificación de personas */
  authNotifPersonsForm!: FormGroup;
  /** Subject para manejar la destrucción de las suscripciones */
  private destroy$ = new Subject<void>();

  /** Constructor */
  constructor(
    private fb: FormBuilder,
    private cancelacionService: CancelacionesService,
    private cancelacionesStore: CancelacionesStore,
    private cancelacionesQuery: CancelacionesQuery
  ) {
    // Constructor
  }

  /** Observable para el nombre */
  nombre$ = this.cancelacionesQuery.nombre$;
  /** Observable para el apellido paterno */
  apellidoPaterno$ = this.cancelacionesQuery.apellidoPaterno$;
  /** Observable para el correo electrónico */
  correoElectronico$ = this.cancelacionesQuery.correoElectronico$;

  /**
   * Método ngOnInit
   * 
   * Inicializa el formulario y carga el estado y la información.
   */
  ngOnInit(): void {
    this.authNotifPersonsForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: [{ value: '', disabled: true }],
      correoElectronico: ['', [Validators.email]],
    });
    this.updateState();
    this.loadInfo();
  }

  /**
   * Método updateState
   * 
   * Actualiza el estado del formulario suscribiéndose a los observables de nombre,
   * apellido paterno y correo electrónico.
   */
  updateState(): void {
    this.nombre$.pipe(takeUntil(this.destroy$)).subscribe((nombre) => {
      if (nombre) {
        this.authNotifPersonsForm.get('nombre')?.setValue(nombre);
      }
    });

    this.apellidoPaterno$.pipe(takeUntil(this.destroy$)).subscribe((apellidoPaterno) => {
      if (apellidoPaterno) {
        this.authNotifPersonsForm.get('apellidoPaterno')?.setValue(apellidoPaterno);
      }
    });

    this.correoElectronico$.pipe(takeUntil(this.destroy$)).subscribe((correoElectronico) => {
      if (correoElectronico) {
        this.authNotifPersonsForm.get('correoElectronico')?.setValue(correoElectronico);
      }
    });
  }

  /**
   * Método updateNombre
   * 
   * Actualiza el nombre en el store.
   */
  updateNombre(): void {
    const NOMBRE = this.authNotifPersonsForm.get('nombre')?.value;
    this.cancelacionesStore.setNombre(NOMBRE);
  }

  /**
   * Método updateApellidoPaterno
   * 
   * Actualiza el apellido paterno en el store.
   */
  updateApellidoPaterno(): void {
    const APELLIDO_PATERNO = this.authNotifPersonsForm.get('apellidoPaterno')?.value;
    this.cancelacionesStore.setApellidoPaterno(APELLIDO_PATERNO);
  }

  /**
   * Método updateCorreoElectronico
   * 
   * Actualiza el correo electrónico en el store.
   */
  updateCorreoElectronico(): void {
    const CORREO_ELECTRONICO = this.authNotifPersonsForm.get('correoElectronico')?.value;
    this.cancelacionesStore.setCorreoElectronico(CORREO_ELECTRONICO);
  }

  /**
   * Método loadInfo
   * 
   * Carga la información adicional desde el servicio y actualiza el formulario.
   */
  loadInfo(): void {
    this.cancelacionService
      .getInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.authNotifPersonsForm.patchValue({
          apellidoMaterno: data.apellidoMaterno
        });
      });
  }

  /**
   * Método ngOnDestroy
   * 
   * Limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}