/**
 * fecha-de-importacion.component.ts
 * Componente que gestiona los datos de retorno de prórroga para el trámite 630103.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ModeloDeFormaDinamica } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, takeUntil } from 'rxjs';

import { FORMULARIO_FECHA_IMPORTACION } from '../../enum/autorizacion-importacion-temporal.enum';


import { Subject} from 'rxjs';
import { Subscription} from 'rxjs';
import { Tramite630103Query } from '../../estados/tramite630103.query';

import { Tramite630103State, Tramite630103Store } from '../../estados/tramite630103.store';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

/**
 * Componente que gestiona los datos de retorno de prórroga para el trámite 630103.
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
   */
  estadoSeleccionado!: Tramite630103State;

  /**
   * Formulario dinámico para gestionar los datos de la prórroga.
   */
  formularioFechaDeImportacion: ModeloDeFormaDinamica[] = FORMULARIO_FECHA_IMPORTACION;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Formulario reactivo para gestionar los datos de la prórroga.
   */
  FechaDeImportacionTemporalFormulario!: FormGroup;
  private subscription: Subscription = new Subscription();
  esFormularioSoloLectura: boolean = false;
  public solicitudState!: Tramite630103State;

  /**
   * Constructor del componente.
   * 
   * @param fb - Constructor de formularios reactivos.
   * @param tramite630103Store - Store para manejar el estado del trámite.
   * @param tramite630103Query - Query para consultar el estado del trámite.
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
  inicializarEstadoFormulario(): void {
      if (this.esFormularioSoloLectura) {
        this.formularioFechaDeImportacion = this.formularioFechaDeImportacion.map(campo => ({
          ...campo,
          desactivado: true
        }));
        this.guardarDatosFormulario();
      } else {
        this.formularioFechaDeImportacion = this.formularioFechaDeImportacion.map(campo => ({
          ...campo,
          desactivado: false
        }));
        this.inicializarFormulario();
      }
  }
  
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
   */
  inicializarFormulario(): void {
    this.FechaDeImportacionTemporalFormulario = this.fb.group({
      // Define los controles del formulario aquí
    });
  }

  

  /**
   * Obtiene el estado actual del trámite desde el store.
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
   * 
   * @param $event - Evento que contiene el campo y el valor a actualizar.
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