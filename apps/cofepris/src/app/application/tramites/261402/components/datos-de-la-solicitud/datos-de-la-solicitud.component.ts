/**
 * Componente que representa la sección de datos de la solicitud.
 * Este componente es standalone y utiliza ReactiveFormsModule y CommonModule.
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PropietarioComponent } from '../../../../shared/components/propietario/propietario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud261402State } from '../../../../estados/tramites/tramite261402.store';
import { SolicitudModificacionPermisoInternacionService } from '../../services/solicitud-modificacion-permiso-internacion.service';
import { Subject } from 'rxjs';
import { Tramite261402Query } from '../../../../estados/queries/tramite261402.query';
import { Tramite261402Store } from '../../../../estados/tramites/tramite261402.store';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

/**
 * Componente que representa la sección de datos de la solicitud.
 * Este componente es standalone y utiliza ReactiveFormsModule y CommonModule.
 * Gestiona el formulario reactivo para los datos de la solicitud y actualiza el estado del store.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropietarioComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
/**
 * Clase que representa el componente Angular para la sección de datos de la solicitud.
 * Implementa las interfaces OnInit y OnDestroy para gestionar el ciclo de vida del componente.
 */
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para gestionar los datos de la solicitud.
   */
  formulario!: FormGroup;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones.
   */
  private destroy$ = new Subject<void>();

  /**
   * Estado actual de la solicitud.
   */
  private seccionState!: Solicitud261402State;

  /**
   * Constructor del componente.
   * Param fb FormBuilder para la creación de formularios reactivos.
   * Param tramite261402Store Store para gestionar el estado del trámite.
   * Param tramite261402Query Query para obtener datos del estado del trámite.
   * Param service Servicio para manejar solicitudes relacionadas con permisos de salida del territorio.
   */
  constructor(
    private fb: FormBuilder,
    private tramite261402Store: Tramite261402Store,
    private tramite261402Query: Tramite261402Query,
    private service: SolicitudModificacionPermisoInternacionService
  ) {
    // Constructor
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado de la solicitud y crea el formulario.
   */
  ngOnInit(): void {
    this.tramite261402Query.selectSolicitud$?.pipe(takeUntil(this.destroy$))
      .subscribe((data: Solicitud261402State) => {
        this.seccionState = data;
      });
    this.crearFormulario();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa el Subject para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Establece valores en el store a partir de un campo del formulario.
   * Param form Formulario reactivo.
   * Param campo Nombre del campo del formulario.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.tramite261402Store.actualizarEstado({ [campo]: VALOR });
  }

  /**
   * Crea el formulario reactivo con los campos necesarios.
   */
  crearFormulario(): void {
    this.formulario = this.fb.group({
      observaciones: [this.seccionState?.observaciones, [Validators.required]],
    });
  }
}