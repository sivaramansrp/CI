/**
 * datos-retorno-autorizacion.component.ts
 * Componente que gestiona los datos de retorno de autorización para el trámite 630307.
 */
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Catalogo, CatalogoSelectComponent, InputFecha, REGEX_PATRON_ALFANUMERICO } from '@libs/shared/data-access-user/src';
import { InputFechaComponent, TituloComponent } from '@ng-mf/data-access-user';

import { FECHA_INGRESO, FECHA_VENCIMIENTO } from '../../enum/retorno-importacion-temporal.enum';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';

import { Tramite630307State, Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';
/**
 * Componente que gestiona los datos de retorno de autorización para el trámite 630307.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */
@Component({
  selector: 'app-datos-retorno-autorizacion',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, InputFechaComponent],
  templateUrl: './datos-retorno-autorizacion.component.html',
  styleUrl: './datos-retorno-autorizacion.component.scss',
})
export class DatosRetornoAutorizacionComponent implements OnInit, OnDestroy {

  /**
   * Estado seleccionado del trámite 630307.
   */
  estadoSeleccionado!: Tramite630307State;

  /**
   * Formulario reactivo para gestionar los datos de la autorización de retorno.
   */
  datosImportacionRetornoAutorizacionGeneralFormulario!: FormGroup;

  /**
   * Opciones de aduanas de ingreso obtenidas desde un catálogo.
   */
  aduanaDeingresOpciones: Catalogo[] = [];

  /**
   * Opciones de secciones aduaneras obtenidas desde un catálogo.
   */
  seccionAduaneraOpciones: Catalogo[] = [];

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
   * @param tramite630307Store - Store para manejar el estado del trámite.
   * @param tramite630307Query - Query para consultar el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private retornoImportacionTemporalService: RetornoImportacionTemporalService,
    private tramite630307Store: Tramite630307Store,
    private tramite630307Query: Tramite630307Query
  ) {
    //constructor
  }

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
      folioInformacionGeneralAutorizacion: [
        this.estadoSeleccionado?.folioInformacionGeneralAutorizacion,
        [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO)],
      ],
      aduanaIngreso: [this.estadoSeleccionado?.aduanaIngreso, Validators.required],
      seccionAduanera: [this.estadoSeleccionado?.seccionAduanera, Validators.required],
      fechaIngreso: [this.estadoSeleccionado?.fechaIngreso, Validators.required],
      fechaVencimiento: [this.estadoSeleccionado?.fechaVencimiento, Validators.required],
    });
  }

  /**
   * Obtiene las opciones de aduanas de ingreso desde el servicio.
   */
  getAduanaDeIngreso(): void {
    this.retornoImportacionTemporalService.getAduanaDeIngreso()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.aduanaDeingresOpciones = data;
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
   * Actualiza el valor de la fecha de ingreso en el formulario y en el store.
   * 
   * @param nuevo_valor - Nuevo valor de la fecha de ingreso.
   */
  cambioFechaIngreso(nuevo_valor: string): void {
    this.datosImportacionRetornoAutorizacionGeneralFormulario.patchValue({
      fechaIngreso: nuevo_valor,
    });
    this.setValorStore(this.datosImportacionRetornoAutorizacionGeneralFormulario, 'fechaIngreso');
  }

  /**
   * Actualiza el valor de la fecha de vencimiento en el formulario y en el store.
   * 
   * @param nuevo_valor - Nuevo valor de la fecha de vencimiento.
   */
  cambioFechaVencimiento(nuevo_valor: string): void {
    this.datosImportacionRetornoAutorizacionGeneralFormulario.patchValue({
      fechaVencimiento: nuevo_valor,
    });
    this.setValorStore(this.datosImportacionRetornoAutorizacionGeneralFormulario, 'fechaVencimiento');
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
