/**
 * datos-retorno-autorizacion.component.ts
 * Componente que gestiona los datos de retorno de autorización para el trámite 630303.
 */
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Catalogo, InputFecha, ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { CatalogoSelectComponent, InputFechaComponent ,TituloComponent} from '@ng-mf/data-access-user';

import { FECHA_INGRESO, FECHA_VENCIMIENTO, FORMULARIO_DATOS_AUTORIZACION } from '../../enum/retorno-importacion-temporal.enum';
import { Tramite630303Query } from '../../estados/tramite630303.query';

import { Tramite630303State, Tramite630303Store } from '../../estados/tramite630303.store';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
/**
 * datos-retorno-autorizacion.component.ts
 * Componente que gestiona los datos de retorno de autorización para el trámite 630303.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */
@Component({
  selector: 'app-datos-retorno-autorizacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFechaComponent,
    FormasDinamicasComponent,
    CatalogoSelectComponent,
    TituloComponent,
  ],
  templateUrl: './datos-retorno-autorizacion.component.html',
  styleUrl: './datos-retorno-autorizacion.component.scss',
})
export class DatosRetornoAutorizacionComponent implements OnInit, OnDestroy {
  /**
   * Opciones de secciones aduaneras obtenidas desde un catálogo.
   */
  seccionAduaneraOpciones: Catalogo[] = [];

  /**
   * Formulario dinámico para gestionar los datos de autorización.
   */
  formularioDatosAutorizacion: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_AUTORIZACION;

  /**
   * Estado seleccionado del trámite 630303.
   */
  estadoSeleccionado!: Tramite630303State;

  /**
   * Formulario reactivo para gestionar los datos de la autorización de retorno.
   */
  datosImportacionRetornoAutorizacionGeneralFormulario!: FormGroup;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Configuración para el componente de fecha de ingreso.
   */
  inputFechaIngreso: InputFecha = FECHA_INGRESO;

  /**
   * Configuración para el componente de fecha de vencimiento.
   */
  inputFechaVencimiento: InputFecha = FECHA_VENCIMIENTO;

  /**
   * Constructor del componente.
   * 
   * @param fb - Constructor de formularios reactivos.
   * @param retornoImportacionTemporalService - Servicio para obtener datos de catálogos.
   * @param tramite630303Store - Store para manejar el estado del trámite.
   * @param tramite630303Query - Query para consultar el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private retornoImportacionTemporalService: RetornoImportacionTemporalService,
    private tramite630303Store: Tramite630303Store,
    private tramite630303Query: Tramite630303Query
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario y obtiene datos de catálogos.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inicializarFormulario();
    this.getAduanaDeIngreso();
    this.getSeccionAduanera();
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados y validaciones.
   */
  inicializarFormulario(): void {
    this.datosImportacionRetornoAutorizacionGeneralFormulario = this.fb.group({
      seccionAduanera: [this.estadoSeleccionado?.['seccionAduanera'] || ''],
      fechaIngreso: [this.estadoSeleccionado?.['fechaIngreso'] || '', Validators.required],
      fechaVencimiento: [this.estadoSeleccionado?.['fechaVencimiento'] || '', Validators.required],
    });
  }

  /**
   * Obtiene las opciones de aduanas de ingreso desde el servicio.
   */
  getAduanaDeIngreso(): void {
    this.retornoImportacionTemporalService.getAduanaDeIngreso()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        const ADUANA_DE_INGRESO = this.formularioDatosAutorizacion.find((item) => item.id === 'aduanaDeIngreso');
        if (ADUANA_DE_INGRESO) {
          ADUANA_DE_INGRESO.opciones = data;
        }
      });
  }

  /**
   * Obtiene las opciones de secciones aduaneras desde el servicio.
   */
  getSeccionAduanera(): void {
    this.retornoImportacionTemporalService.getSeccionAduanera()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.seccionAduaneraOpciones = data;
      });
  }

  /**
   * Actualiza un valor específico en el store del trámite.
   * 
   * @param $event - Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    if (typeof $event.valor === 'object' && $event.valor !== null && 'id' in $event.valor) {
      this.tramite630303Store.setTramite630303State($event.campo, ($event.valor as { id: unknown }).id);
    } else {
      this.tramite630303Store.setTramite630303State($event.campo, $event.valor);
    }
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