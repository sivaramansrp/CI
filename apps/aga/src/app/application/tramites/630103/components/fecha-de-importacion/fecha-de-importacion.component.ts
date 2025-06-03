/**
 * fecha-de-importacion.component.ts
 * Componente que gestiona los datos de retorno de prórroga para el trámite 630103.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */

import { CommonModule } from '@angular/common';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, ModeloDeFormaDinamica } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, takeUntil } from 'rxjs';

import { FORMULARIO_FECHA_IMPORTACION } from '../../enum/autorizacion-importacion-temporal.enum';

import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { Tramite630103Query } from '../../estados/tramite630103.query';

import { Tramite630103State, Tramite630103Store } from '../../estados/tramite630103.store';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

/**
 * Componente que gestiona los datos de retorno de prórroga para el trámite 630103.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */
@Component({
  selector: 'app-fecha-de-importacion',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent],
  templateUrl: './fecha-de-importacion.component.html',
  styleUrl: './fecha-de-importacion.component.scss',
})
export class FechaDeImportacionComponent implements OnInit, OnDestroy {
  /**
   * Estado seleccionado del trámite 630103.
   * Contiene los datos actuales del trámite seleccionados desde el store.
   */
  estadoSeleccionado!: Tramite630103State;

  /**
   * Formulario dinámico para gestionar los datos de la prórroga.
   * Define la estructura y configuración de los campos del formulario.
   */
  formularioFechaDeImportacion: ModeloDeFormaDinamica[] = FORMULARIO_FECHA_IMPORTACION;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   * Se emite y completa en ngOnDestroy para cancelar todas las suscripciones activas.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Formulario reactivo para gestionar los datos de la prórroga.
   * Se inicializa dinámicamente según la configuración del formulario.
   */
  FechaDeImportacionTemporalFormulario!: FormGroup;

  /**
   * Suscripción general para manejar y limpiar las suscripciones del componente.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Si es verdadero, los campos del formulario estarán deshabilitados para edición.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Tramite630103State;

  /**
   * Constructor del componente.
   * fb - Constructor de formularios reactivos.
   * tramite630103Store - Store para manejar el estado del trámite.
   * tramite630103Query - Query para consultar el estado del trámite.
   * consultaioQuery - Query para observar el estado de solo lectura.
   */
 
  constructor(
    private fb: FormBuilder,
    private tramite630103Store: Tramite630103Store,
    private tramite630103Query: Tramite630103Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el estado del formulario dependiendo si es solo lectura o editable.
   * Si es solo lectura, desactiva los campos y carga los datos; si no, los activa.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.formularioFechaDeImportacion = this.formularioFechaDeImportacion.map(campo => ({
        ...campo,
        habilitado: false
      }));
      this.guardarDatosFormulario();
    } else {
      this.formularioFechaDeImportacion = this.formularioFechaDeImportacion.map(campo => ({
        ...campo,
        habilitado: true
      }));
      this.inicializarFormulario();
    }
  }

  /**
   * Guarda los datos del formulario y ajusta el estado de solo lectura.
   * Deshabilita o habilita los campos según corresponda.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.FechaDeImportacionTemporalFormulario.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.FechaDeImportacionTemporalFormulario.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario y obtiene el estado del trámite.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.getValorStore();
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados y validaciones.
   * Puedes agregar los controles dinámicamente según la configuración.
   */
  inicializarFormulario(): void {
    this.FechaDeImportacionTemporalFormulario = this.fb.group({
      // Define los controles del formulario aquí
    });
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   * Actualiza la propiedad estadoSeleccionado con los datos actuales.
   */
  getValorStore(): void {
    this.tramite630103Query.selectTramite630103State$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoSeleccionado = data;
      });
  }

  /**
   * Actualiza un valor específico en el store del trámite.
   * $event - Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    this.tramite630103Store.setTramite630103State($event.campo, $event.valor);
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}