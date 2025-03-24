
/**
 * compo doc
 * @fileoverview Componente encargado de gestionar la selección de países de procedencia en un trámite.
 * @module PaisProcendenciaComponent
 */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  CrosslistState,
  CrosslistStore,
} from '@libs/shared/data-access-user/src/core/estados/crosslist.store';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, takeUntil } from 'rxjs';
import { Pais } from '../../enum/vehiculos-adaptados.enum';

import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { CrosslistQuery } from '@libs/shared/data-access-user/src/core/queries/crosslist.query';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite130109Query } from '../../estados/queries/tramite130109.query';
import { Tramite130109Store } from '../../estados/tramites/tramites130109.store';
import { VehiculosUsadosAdaptadosService } from '../../services/vehiculos-usados-adaptados.service';


/**
 * Componente para la gestión de la selección de países de procedencia.
 */
@Component({
  selector: 'app-pais-procendencia',
  standalone: true,
  imports: [
    TituloComponent,
    CrosslistComponent,
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
  ],
  templateUrl: './pais-procendencia.component.html',
  styleUrl: './pais-procendencia.component.scss',
})
export class PaisProcendenciaComponent implements OnInit, OnDestroy {
  /**
   * compo doc
   * @property {CrosslistComponent} crosslistComponent - Referencia al componente Crosslist.
   */
  @ViewChild(CrosslistComponent) crosslistComponent!: CrosslistComponent;
  /**
   * Observable utilizado para gestionar la destrucción del componente y evitar fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  private destroyed$: Subject<void> = new Subject();
  /**
   * compo doc
   * @property {FormGroup} paisForm - Estructura del formulario reactivo.
   */
  paisForm!: FormGroup;

  /**
   * compo doc
   * @property {string[]} fechasSeleccionadas - Lista de fechas seleccionadas.
   */
  fechasSeleccionadas: string[] = [];

  /**
   * compo doc
   * @property {FormControl} fecha - Control de formulario para la fecha.
   */
  fecha: FormControl = new FormControl('');

  /**
   * compo doc
   * @property {FormControl} fechaSeleccionada - Control de formulario para la fecha seleccionada.
   */
  fechaSeleccionada: FormControl = new FormControl('');

  /**
   * compo doc
   * @property {string[]} fechasDatos - Datos de fechas.
   */
  fechasDatos: string[] = [];

  /**
   * compo doc
   * @property {string[]} selectRangoDias - Rango de días seleccionados.
   */
  selectRangoDias: string[] = [];

  /**
   * compo doc
   * @property {Catalogo[]} paisProc - Catálogo de países de procedencia.
   */
  public paisProc!: Catalogo[];

  /**
   * compo doc
   * @property {Catalogo[]} paisesPorBloque - Lista de países por bloque.
   */
  public paisesPorBloque!: Catalogo[];
  /**
   * compo doc
   * @property {Array<{ btnNombre: string; class: string; funcion: Function }>} campoDeBotones - Configuración de botones.
   */
  campoDeBotones = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.agregar('t');
        }
      },
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.agregar('');
        }
      },
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.quitar('');
        }
      },
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.quitar('t');
        }
      },
    },
  ];
  /**
   * Lista de fechas.
   * @type {string[]}
   */
  fechas!: string[];
  /**
 * Constructor del componente
 * @param http Cliente HTTP para realizar solicitudes
 * @param fb FormBuilder para crear formularios reactivos
 * @param tramite130109Store Almacén de datos para el trámite 130109
 * @param tramite130109Query Consulta de datos para el trámite 130109
 * @param vehiculosUsadosAdaptadosService Servicio para vehículos usados adaptados
 * @param crosslistQuery Consulta de datos para la lista cruzada
 * @param crosslistStore Almacén de datos para la lista cruzada
 */

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private tramite130109Store: Tramite130109Store,
    private tramite130109Query: Tramite130109Query,
    private vehiculosUsadosAdaptadosService: VehiculosUsadosAdaptadosService,
    private crosslistQuery: CrosslistQuery,
    private crosslistStore: CrosslistStore
  ) {
    // Constructor del componente
  }

  /**
   * compo doc
   * @method ngOnInit
   * @description Inicializa el formulario y carga datos de países de procedencia.
   */
  ngOnInit(): void {
    this.paisForm = this.fb.group({
      bloque: [''],
      usoEspecifico: ['', Validators.required],
      justificacionImportacionExportacion: ['', [Validators.required]],
      observaciones: [''],
    });
    /**
     * Suscripción al estado del componente Crosslist.
     * @type {Observable<CrosslistState>}
     */
    this.crosslistQuery.selectCrosslist$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        /**
         * Actualiza la lista de fechas con el estado recibido.
         * @type {string[]}
         */
        this.fechas = state.fechas || [];

        /**
         * Actualiza los datos de las fechas con el estado recibido o con la lista de fechas.
         * @type {string[]}
         */
        this.fechasDatos = state.fechasDatos || this.fechas;
      });

    this.listaDePaisesDisponibles();
    this.tramite130109Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.paisForm.patchValue({
            bloque: seccionState.bloque,
            usoEspecifico: seccionState.usoEspecifico,
            justificacionImportacionExportacion:
              seccionState.justificacionImportacionExportacion,
            observaciones: seccionState.observaciones,
          });
        })
      )
      .subscribe();
  }

  /**
   * compo doc
   * @method listaDePaisesDisponibles
   * @description Carga las opciones de países de procedencia desde el JSON.
   */
  listaDePaisesDisponibles(): void {
    this.vehiculosUsadosAdaptadosService
      .getListaDePaisesDisponibles()
      .subscribe((data) => {
        this.paisProc = data;
      });
    const SELECTED_BLOQUE = (this.paisForm.get('bloque') as FormControl).value;
    if (SELECTED_BLOQUE) {
      this.fetchPaisesPorBloque(SELECTED_BLOQUE);
    }
  }

  /**
   * compo doc
   * @method fetchPaisesPorBloque
   * @description Obtiene información de países por bloque.
   * @param {number} bloqueId - ID del bloque seleccionado.
   */
  fetchPaisesPorBloque(_bloqueId: number): void {
    this.vehiculosUsadosAdaptadosService
      .getPaisesPorBloque(_bloqueId)
      .subscribe((data) => {
        this.paisesPorBloque = data;
        this.selectRangoDias = this.paisesPorBloque.map(
          (pais: Pais) => pais.descripcion
        );
        this.crosslistStore.establecerFechas(this.selectRangoDias);
      });
      
  }
  /**
   * compo doc
   * @method setValoresStore
   * @description Establece valores en el store del trámite.
   * @param {FormGroup} paisForm - Formulario reactivo.
   * @param {string} campo - Nombre del campo del formulario.
   * @param {keyof Tramite130109Store} metodoNombre - Nombre del método del store.
   */
  setValoresStore(
    paisForm: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite130109Store
  ): void {
    const VALOR = paisForm.get(campo)?.value;
    (this.tramite130109Store[metodoNombre] as (value: string | number) => void)(
      VALOR
    );
  }
  /**
   * Método que se ejecuta cuando el componente se destruye.
   * Este método emite un valor a `destroyed$` y completa el observable para evitar fugas de memoria.
   * @method
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
