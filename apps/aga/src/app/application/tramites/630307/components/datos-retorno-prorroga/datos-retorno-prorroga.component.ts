/**
 * datos-retorno-prorroga.component.ts
 * Componente que gestiona los datos de retorno de prórroga para el trámite 630307.
 */
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFecha, REGEX_PATRON_ALFANUMERICO, TituloComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';

import { FECHA_INICIO_PRORROGA, FECHA_VENCIMIENTO_PRORROGA } from '../../enum/retorno-importacion-temporal.enum';
import { Subject, takeUntil } from 'rxjs';
import { Tramite630307State, Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';
/**
 * Componente que gestiona los datos de retorno de prórroga para el trámite 630307.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */
@Component({
  selector: 'app-datos-retorno-prorroga',
  standalone: true,
  imports: [CommonModule, TituloComponent, InputFechaComponent, ReactiveFormsModule],
  templateUrl: './datos-retorno-prorroga.component.html',
  styleUrl: './datos-retorno-prorroga.component.scss',
})
export class DatosRetornoProrrogaComponent implements OnInit,OnDestroy {

  /**
   * Estado seleccionado del trámite 630307.
   */
  estadoSeleccionado!: Tramite630307State;

  /**
   * Configuración para el componente de fecha de inicio de la prórroga.
   */
  inputFechaInicioProrroga: InputFecha = FECHA_INICIO_PRORROGA;

  /**
   * Configuración para el componente de fecha de vencimiento de la prórroga.
   */
  inputFechaVencimientoProrroga: InputFecha = FECHA_VENCIMIENTO_PRORROGA;

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
   * @param tramite630307Store - Store para manejar el estado del trámite.
   * @param tramite630307Query - Query para consultar el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private tramite630307Store: Tramite630307Store,
    private tramite630307Query: Tramite630307Query
  ) {
    //Constructor
  }

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
      folioInformacionGeneralProrroga: [
        this.estadoSeleccionado?.folioInformacionGeneralProrroga,
        [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO)],
      ],
      fechaInicioProrroga: [this.estadoSeleccionado?.fechaInicioProrroga, Validators.required],
      fechaVencimientoProrroga: [this.estadoSeleccionado?.fechaVencimientoProrroga, Validators.required],
    });
  }

  /**
   * Actualiza el valor de la fecha de vencimiento de la prórroga en el formulario y en el store.
   * 
   * @param nuevo_valor - Nuevo valor de la fecha de vencimiento de la prórroga.
   */
  cambioFechaVencimientoProrroga(nuevo_valor: string): void {
    this.datosImportacionRetornoProrrogaGeneralFormulario.patchValue({
      fechaVencimientoProrroga: nuevo_valor,
    });
    this.setValorStore(this.datosImportacionRetornoProrrogaGeneralFormulario, 'fechaVencimientoProrroga');
  }

  /**
   * Actualiza el valor de la fecha de inicio de la prórroga en el formulario y en el store.
   * 
   * @param nuevo_valor - Nuevo valor de la fecha de inicio de la prórroga.
   */
  cambioFechaInicioProrroga(nuevo_valor: string): void {
    this.datosImportacionRetornoProrrogaGeneralFormulario.patchValue({
      fechaInicioProrroga: nuevo_valor,
    });
    this.setValorStore(this.datosImportacionRetornoProrrogaGeneralFormulario, 'fechaInicioProrroga');
  }

  /**
   * Actualiza un valor específico en el store del trámite.
   * 
   * @param FormGroup - Formulario reactivo.
   * @param control - Nombre del control cuyo valor se actualizará en el store.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite630307Store.setTramite630307State({
      [control]: VALOR,
    });
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   */
  getValorStore(): void {
    this.tramite630307Query.selectTramite630307State$
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