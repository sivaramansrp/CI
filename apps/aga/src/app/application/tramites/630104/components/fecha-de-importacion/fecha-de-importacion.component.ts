
import {CatalogoSelectComponent, ConsultaioQuery, InputFecha, ModeloDeFormaDinamica } from "@ng-mf/data-access-user";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ESTIMADA_RETORNO, FECHA_ESTIMADA_DE_INGRESO, FORMULARIO_FECHA_IMPORTACION } from '../../enums/retorno-importacion-temporal.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from "rxjs";
import { Tramite630104State, Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from "@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component";
import { InputFechaComponent } from "@ng-mf/data-access-user";
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
   * Indica si el formulario está en modo solo lectura.
   */
  esSoloLectura!: boolean;

  /**
   * Constructor del componente.
   * @param fb - Servicio para construir formularios reactivos.
   * @param tramite630104Store - Servicio para gestionar el estado del trámite 630104.
   * @param tramite630104Query - Servicio para consultar el estado del trámite 630104.
    @param consultaioQuery - Servicio para consultar el estado de la consulta de entrada/salida.
    
  */
  constructor(
    private fb: FormBuilder,
    private tramite630104Store: Tramite630104Store,
    private tramite630104Query: Tramite630104Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Método del ciclo de vida `OnInit`.
   * Se ejecuta al inicializar el componente. Obtiene el valor del estado del store
   * y configura el formulario reactivo.
   */
  ngOnInit(): void {
    this.tramite630104Query.selectSeccionState$
    .pipe(takeUntil(this.destroyed$))
    .subscribe((estado: Tramite630104State) => {
      this.estadoSeleccionado = estado;
      this.inizializarFormulario(); 
      this.inicializarEstadoFormulario(); 
    });
    this.getValorStore();
    this.inizializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados o del estado seleccionado.
   */
  inizializarFormulario(): void {
    this.FechaDeImportacionTemporalFormulario = this.fb.group({
      fechaLimiteRetorno: [this.estadoSeleccionado?.['fechaLimiteRetorno'] || '', Validators.required],
      fechaIngreso: [this.estadoSeleccionado?.['fechaIngreso'] || '', Validators.required],
    });
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inizializarFormulario();
    }
  }

  /**
   * @method
   * @name guardarDatosFormulario
   * @description
   * Inicializa los formularios y obtiene los datos de la tabla.
   * Dependiendo del modo de solo lectura (`esFormularioSoloLectura`),
   * deshabilita o habilita todos los formularios del componente.
   * Si el formulario está en modo solo lectura, todos los formularios se deshabilitan para evitar modificaciones.
   * Si no está en modo solo lectura, todos los formularios se habilitan para permitir la edición.
   *
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    this.inizializarFormulario();
    if (this.esSoloLectura) {
      this.FechaDeImportacionTemporalFormulario.disable();
    } else {
      this.FechaDeImportacionTemporalFormulario.enable();
    }
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