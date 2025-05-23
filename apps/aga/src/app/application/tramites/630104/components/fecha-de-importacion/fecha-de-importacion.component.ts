
import {CatalogoSelectComponent, InputFecha, ModeloDeFormaDinamica } from "@ng-mf/data-access-user";

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from "rxjs";

import { CommonModule } from '@angular/common';

import { InputFechaComponent } from "@ng-mf/data-access-user";

import { ESTIMADA_RETORNO, FECHA_ESTIMADA_DE_INGRESO, FORMULARIO_FECHA_IMPORTACION } from '../../enums/retorno-importacion-temporal.enum';
import { Tramite630104State, Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { FormasDinamicasComponent } from "@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component";
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

/**
 * Componente `FechaDeImportacionComponent`
 * Este componente gestiona la lógica y la interfaz de usuario para la sección de fecha de importación
 * en el trámite 630104. Permite inicializar un formulario dinámico, manejar eventos de cambio de valor
 * y suscribirse al estado del trámite.
 */
@Component({
  selector: 'app-fecha-de-importacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent, TituloComponent, InputFechaComponent, CatalogoSelectComponent],
  templateUrl: './fecha-de-importacion.component.html',
  styleUrl: './fecha-de-importacion.component.scss',
})
export class FechaDeImportacionComponent implements OnInit, OnDestroy {

  /**
   * Modelo del formulario dinámico para la fecha de importación.
   */
  formularioFechaDeImportacion: ModeloDeFormaDinamica[] = FORMULARIO_FECHA_IMPORTACION;

  /**
   * Formulario reactivo para gestionar los datos de la fecha de importación temporal.
   */
  FechaDeImportacionTemporalFormulario!: FormGroup;

  /**
   * Datos de la fecha estimada de retorno.
   */
  datosfecha: InputFecha = ESTIMADA_RETORNO;

  /**
   * Datos de la fecha estimada de ingreso.
   */
  datosfechaLimite: InputFecha = FECHA_ESTIMADA_DE_INGRESO;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Estado seleccionado del trámite 630104.
   */
  estadoSeleccionado!: Tramite630104State;

  /**
   * Constructor del componente.
   * @param fb - Servicio para construir formularios reactivos.
   * @param tramite630104Store - Servicio para gestionar el estado del trámite 630104.
   * @param tramite630104Query - Servicio para consultar el estado del trámite 630104.
   */
  constructor(
    private fb: FormBuilder,
    private tramite630104Store: Tramite630104Store,
    private tramite630104Query: Tramite630104Query
  ) {}

  /**
   * Método del ciclo de vida `OnInit`.
   * Se ejecuta al inicializar el componente. Obtiene el valor del estado del store
   * y configura el formulario reactivo.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inizializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados o del estado seleccionado.
   */
  inizializarFormulario(): void {
    this.FechaDeImportacionTemporalFormulario = this.fb.group({
      fechaLimiteRetorno: [this.estadoSeleccionado?.['fechaLimiteRetorno'] || '', Validators.required],
      cuentaProrroga: [this.estadoSeleccionado?.['cuentaProrroga'] || '', Validators.required],
    });
  }

  /**
   * Obtiene el valor del estado del store y lo asigna a `estadoSeleccionado`.
   */
  getValorStore(): void {
    this.tramite630104Query.selectTramite630104State$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoSeleccionado = data;
      });
  }

  /**
   * Establece un cambio de valor en el estado del trámite.
   * @param $event - Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    if (typeof $event.valor === 'object' && $event.valor !== null && 'id' in $event.valor) {
      this.tramite630104Store.setTramite630104State($event.campo, String(($event.valor as { id: unknown }).id));
    } else {
      this.tramite630104Store.setTramite630104State($event.campo, $event.valor);
    }
  }

  /**
   * Método del ciclo de vida `OnDestroy`.
   * Se ejecuta al destruir el componente. Completa el Subject `destroyed$` para liberar recursos.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}