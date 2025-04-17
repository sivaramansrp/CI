/**
 * datos-de-la-solicitud.component.ts
 * Componente que gestiona los datos de la solicitud para el trámite 630307.
 */
import { Tramite630307State, Tramite630307Store} from '../../estados/tramite630307.store';
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { Catalogo, CatalogoSelectComponent, InputFecha, ModeloDeFormaDinamica } from "@ng-mf/data-access-user";
import { InputFechaComponent } from "@ng-mf/data-access-user";

import { DatosRetornoAutorizacionComponent } from "../datos-retorno-autorizacion/datos-retorno-autorizacion.component";
import { DatosRetornoProrrogaComponent } from "../datos-retorno-prorroga/datos-retorno-prorroga.component";

import { ESTIMADA_RETORNO, FORMULARIO_DATOS_SOLICITUD } from '../../enum/retorno-importacion-temporal.enum';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';

import { DatosMercanciaComponent } from "../datos-mercancia/datos-mercancia.component";
import { ManifiestoComponent } from "../manifiesto/manifiesto.component";

import { FormasDinamicasComponent } from "@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component";
import { Tramite630307Query } from '../../estados/tramite630307.query';

/**
 * Componente que gestiona los datos de la solicitud para el trámite 630307.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    InputFechaComponent,
    DatosRetornoProrrogaComponent,
    DatosRetornoAutorizacionComponent,
    DatosMercanciaComponent,
    ManifiestoComponent,
    FormasDinamicasComponent,
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario dinámico para gestionar los datos de la solicitud.
   */
  formularioDatosSolicitud: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_SOLICITUD;

  /**
   * Formulario reactivo para gestionar los datos de la importación temporal.
   */
  datosImportacionTemporalFormulario!: FormGroup;

  /**
   * Fecha estimada de retorno, inicializada con un valor por defecto.
   */
  datosfecha: InputFecha = ESTIMADA_RETORNO;

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
   * Estado seleccionado del trámite 630307.
   */
  estadoSeleccionado!: Tramite630307State;

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
  ) {}

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
      fechaLimiteRetorno: [this.estadoSeleccionado?.fechaLimiteRetorno, Validators.required],
      cuentaProrroga: [this.estadoSeleccionado?.cuentaProrroga, Validators.required],
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
        this.formularioDatosSolicitud[0].opciones = data;
      });
  }

  /**
   * Obtiene las opciones de secciones aduaneras desde el servicio.
   */
  getSeccionAduanera(): void {
    this.retornoImportacionTemporalService.getSeccionAduanera()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.formularioDatosSolicitud[1].opciones = data;
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
    this.showRetornoProrroga = CUENTA_PRORROGA === 1;
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
   * Establece un cambio de valor en el store basado en un evento.
   * 
   * @param $event - Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    this.setValorStore(this.datosImportacionTemporalFormulario, $event.campo);
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