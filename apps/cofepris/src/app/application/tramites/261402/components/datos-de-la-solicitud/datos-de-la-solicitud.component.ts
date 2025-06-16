/**
 * Componente que representa la sección de datos de la solicitud.
 * Este componente es standalone y utiliza ReactiveFormsModule y CommonModule.
 */
import { Subject, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PropietarioComponent } from '../../../../shared/components/propietario/propietario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud261402State } from '../../../../estados/tramites/tramite261402.store';
import { SolicitudModificacionPermisoInternacionService } from '../../services/solicitud-modificacion-permiso-internacion.service';
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
   * Indica si el formulario debe mostrarse solo en modo lectura.
   */
  esFormularioSoloLectura: boolean = false;
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
    private service: SolicitudModificacionPermisoInternacionService,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado de la solicitud y crea el formulario.
   */
  ngOnInit(): void {

    this.inicializarEstadoFormulario();
   
  }
    obtenerEstadoSolicitud(): void {
     this.tramite261402Query.selectSolicitud$?.pipe(takeUntil(this.destroy$))
      .subscribe((data: Solicitud261402State) => {
        this.seccionState = data;
      });
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
    this. obtenerEstadoSolicitud();
    this.formulario = this.fb.group({
      observaciones: [this.seccionState?.observaciones, [Validators.required]],
    });
  }

  
   /**
 * Inicializa el estado de los formularios según el modo de solo lectura.
 *
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), llama a `guardarDatosFormulario()`
 * para deshabilitar todos los controles. En caso contrario, inicializa los formularios normalmente.
 */
   inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); 
    } else {
      this.crearFormulario();
    }
  }

    /**
 * Guarda y actualiza el estado de los formularios según el modo de solo lectura.
 *
 * Inicializa los formularios y luego los deshabilita si el formulario está en modo solo lectura,
 * o los habilita si está en modo edición.
 */
  guardarDatosFormulario(): void {
    this.crearFormulario();
    if (this.esFormularioSoloLectura) {
      this.formulario.disable();
     
    } else if (!this.esFormularioSoloLectura) {
      this.formulario.enable();
     
    } else {
      // No se requiere ninguna acción en el formulario
    }
}
}