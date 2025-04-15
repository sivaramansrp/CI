/**
 * datos-de-la-solicitud.component.ts
 * Componente que gestiona los datos de la solicitud para el trámite 630303.
 */
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Catalogo, InputFecha, TituloComponent } from "@ng-mf/data-access-user";
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { InputFechaComponent } from "@ng-mf/data-access-user";

import { DatosRetornoAutorizacionComponent } from "../datos-retorno-autorizacion/datos-retorno-autorizacion.component";
import { DatosRetornoProrrogaComponent } from "../datos-retorno-prorroga/datos-retorno-prorroga.component";
import { ESTIMADA_RETORNO } from '../../enum/retorno-importacion-temporal.enum';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';

import { Tramite630303State, Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';

import { DatosMercanciaComponent } from "../datos-mercancia/datos-mercancia.component";

/**
 * Componente que gestiona los datos de la solicitud para el trámite 630303.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, InputFechaComponent, DatosRetornoProrrogaComponent, DatosRetornoAutorizacionComponent, DatosMercanciaComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

  /**
   * Formulario reactivo para gestionar los datos de la importación temporal.
   */
  datosImportacionTemporalFormulario!: FormGroup;

  /**
   * Fecha estimada de retorno, inicializada con un valor por defecto.
   */
  datosfecha: InputFecha = ESTIMADA_RETORNO;

  /**
   * Opciones de aduanas de ingreso obtenidas desde un catálogo.
   */
  aduanaDeingresOpciones: Catalogo[] = [];

  /**
   * Opciones de secciones aduaneras obtenidas desde un catálogo.
   */
  seccionAduaneraOpciones: Catalogo[] = [];

  /**
   * Opciones de prórrogas obtenidas desde un catálogo.
   */
  prorrogaOpciones: Catalogo[] = [];

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Bandera que indica si se debe mostrar el componente de retorno de prórroga.
   */
  showRetornoProrroga: boolean = false;

  /**
   * Estado seleccionado del trámite 630303.
   */
  estadoSeleccionado!: Tramite630303State;

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
  ) {
    //constructor
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario y obtiene datos de catálogos.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inizializarFormulario();
    this.getAduanaDeIngreso();
    this.getSeccionAduanera();
    this.getProrroga();
    this.onChangeTipoImportacionRetorno();
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados y validaciones.
   */
  inizializarFormulario(): void {
    this.datosImportacionTemporalFormulario = this.fb.group({
      cveAduana: [this.estadoSeleccionado?.cveAduana, Validators.required],
      cveSeccionAduanal: [this.estadoSeleccionado?.cveSeccionAduanal],
      fechaLimiteRetorno: [this.estadoSeleccionado?.fechaLimiteRetorno, Validators.required],
      cuentaProrroga: [this.estadoSeleccionado?.cuentaProrroga, Validators.required]
    });
  }

  /**
   * Actualiza el valor de la fecha límite de retorno en el formulario y en el store.
   * 
   * @param nuevo_valor - Nuevo valor de la fecha límite de retorno.
   */
  cambioFechaFinal(nuevo_valor: string): void {
    this.datosImportacionTemporalFormulario.patchValue({
      fechaLimiteRetorno: nuevo_valor,
    });
    this.setValorStore(this.datosImportacionTemporalFormulario, 'fechaLimiteRetorno');
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
   * Obtiene las opciones de prórrogas desde el servicio.
   */
  getProrroga(): void {
    this.retornoImportacionTemporalService.getProrroga()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.prorrogaOpciones = data;
      });
  }

  /**
   * Cambia el estado de la bandera `showRetornoProrroga` según el valor de `cuentaProrroga`.
   */
  onChangeTipoImportacionRetorno(): void {
    const CUENTA_PRORROGA = this.datosImportacionTemporalFormulario.get('cuentaProrroga')?.value;
    this.showRetornoProrroga = CUENTA_PRORROGA === '1';
    this.setValorStore(this.datosImportacionTemporalFormulario, 'cuentaProrroga');
  }

  /**
   * Actualiza un valor específico en el store del trámite.
   * 
   * @param FormGroup - Formulario reactivo.
   * @param control - Nombre del control cuyo valor se actualizará en el store.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite630303Store.setTramite630303State({
      [control]: VALOR
    });
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   */
  getValorStore(): void {
    this.tramite630303Query.selectTramite630303State$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.estadoSeleccionado = data;
      }
    );
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