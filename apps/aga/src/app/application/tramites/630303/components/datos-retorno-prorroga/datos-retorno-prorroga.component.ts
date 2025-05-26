/**
 * datos-retorno-prorroga.component.ts
 * Componente que gestiona los datos de retorno de prórroga para el trámite 630303.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { FORMULARIO_DATOS_PRORROGA } from '../../enum/retorno-importacion-temporal.enum';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Tramite630303Query } from '../../estados/tramite630303.query';

import { Tramite630303State, Tramite630303Store } from '../../estados/tramite630303.store';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

/**
 * Componente que gestiona los datos de retorno de prórroga para el trámite 630303.
 */
@Component({
  selector: 'app-datos-retorno-prorroga',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent],
  templateUrl: './datos-retorno-prorroga.component.html',
  styleUrl: './datos-retorno-prorroga.component.scss',
})
export class DatosRetornoProrrogaComponent implements OnInit, OnDestroy {
  /**
   * Estado seleccionado del trámite 630303.
   */
  estadoSeleccionado!: Tramite630303State;

  /**
   * Formulario dinámico para gestionar los datos de la prórroga.
   */
  formularioDatosProrroga: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_PRORROGA;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Formulario reactivo para gestionar los datos de la prórroga.
   */
  datosImportacionRetornoProrrogaGeneralFormulario!: FormGroup;

  /**
   * Constructor del componente.
   * 
   * @param fb - Constructor de formularios reactivos.
   * @param tramite630303Store - Store para manejar el estado del trámite.
   * @param tramite630303Query - Query para consultar el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private tramite630303Store: Tramite630303Store,
    private tramite630303Query: Tramite630303Query
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario y obtiene el estado del trámite.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados y validaciones.
   */
  inicializarFormulario(): void {
    this.datosImportacionRetornoProrrogaGeneralFormulario = this.fb.group({
      // Define los controles del formulario aquí
    });
  }

  /**
   * Actualiza un valor específico en el store del trámite.
   * 
   * @param $event - Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    this.tramite630303Store.setTramite630303State($event.campo, $event.valor);
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   */
  getValorStore(): void {
    this.tramite630303Query.selectTramite630303State$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoSeleccionado = data;
      });
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}