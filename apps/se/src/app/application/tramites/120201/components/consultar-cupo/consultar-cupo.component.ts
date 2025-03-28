import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Cupos120201State, Tramite120201Store } from '../../../../estados/tramites/tramite120201.store';
import { CONFIGURACION_PARA_ENCABEZADO_DE_TABLA } from '../../constantes/cupos-constantes.enum';
import { CuposService } from '../../services/cupos/cupos.service';
import { InstrumentoCupoTPLForm } from '../../models/cupos.model';
import { Tramite120201Query } from '../../../../estados/queries/tramite120201.query';

/**
 * Componente para consultar el cupo.
 * @component
 * @description Este componente permite consultar el cupo de un instrumento específico.
 */
@Component({
  selector: 'app-consultar-cupo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './consultar-cupo.component.html',
  styleUrl: './consultar-cupo.component.css',
})
export class ConsultarCupoComponent implements OnInit, OnDestroy {
  /**
   * Formulario para consultar el cupo.
   */
  cupoConsultarForm!: FormGroup;

  /**
   * Tratado.
   * @type {Catalogo[]}
   * @description Catálogo que contiene los tratados disponibles.
   */
  tratado!: Catalogo[];

  /**
   * Régimen de clasificación.
   * @type {Catalogo[]}
   * @description Catálogo que contiene los regímenes de clasificación disponibles.
   */
  regimenClasificacion!: Catalogo[];

  /**
   * País de destino.
   * @type {Catalogo[]}
   * @description Catálogo que contiene los países de destino disponibles.
   */
  paisDestino!: Catalogo[];

  /**
   * Estado.
   * @type {Catalogo[]}
   * @description Catálogo que contiene los estados disponibles.
   */
  estado!: Catalogo[];

  /**
   * Representación federal.
   * @type {Catalogo[]}
   * @description Catálogo que contiene las representaciones federales disponibles.
   */
  representacionFederal!: Catalogo[];

  /**
   * Estado de la solicitud.
   */
  public cuposState!: Cupos120201State;

  /**
   * Configuración para el encabezado de la tabla.
   */
  configuracionParaEncabezadoDeTabla = CONFIGURACION_PARA_ENCABEZADO_DE_TABLA;

  /**
   * Configuraciones para la mesa.
   */
  listaDeTablasSeleccionadas: InstrumentoCupoTPLForm[] = [];

  /**
   * Configuración de la tabla dinámica.
   */
  cuerpoTabla: InstrumentoCupoTPLForm[] = [];

  /**
   * Bandera para mostrar detalles del cupo.
   * @type {boolean}
   */
  mostrarDetallesCupo: boolean = false;

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Constructor de la clase ConsultarCupoComponent.
   * @param cuposService
   * @description Servicio para obtener los catálogos y datos relacionados con los cupos.
   * @param fb
   * @description FormBuilder para crear formularios reactivos.
   * @param tramite120201Store
   * @description Store para gestionar el estado del trámite 120201.
   * @param tramite120201Query
   * @description Query para consultar el estado del trámite 120201. 
   */
  constructor(
    private cuposService: CuposService,
    private fb: FormBuilder,
    private tramite120201Store: Tramite120201Store,
    private tramite120201Query: Tramite120201Query
  ) {
    // El constructor se utiliza para la inyección de dependencias       
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.tramite120201Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.cuposState = seccionState;
          this.cuerpoTabla = seccionState.cuerpoTablaDatos;
          this.mostrarDetallesCupo = seccionState.mostrarDetallesCupo;
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearCupoConsultarForm();

    this.tratadoSeleccion();
    this.regimenClasificacionSeleccion();
    this.paisDestinoSeleccion();
    this.estadoSeleccion();
    this.representacionFederalSeleccion();
  }

  /**
   * Obtiene el formulario de cuota instrumento.
   * @returns {FormGroup} - El formulario de cuota instrumento.
   * @description Este formulario contiene los datos del instrumento de cuota.
   */
  get cuotaInstrumentoForm(): FormGroup {
    return this.cupoConsultarForm.get('cuotaInstrumentoForm') as FormGroup;
  }

  /**
   * Obtiene el formulario de cupo descripción.
   * @returns {FormGroup} - El formulario de cupo descripción.
   * @description Este formulario contiene la descripción del cupo.
   */
  get cupoDescripcionForm(): FormGroup {
    return this.cupoConsultarForm.get('cupoDescripcionForm') as FormGroup;
  }

  /**
   * Obtiene el formulario de representación federal.
   * @returns {FormGroup} - El formulario de representación federal.
   * @description Este formulario contiene la descripción de la representación federal.
   */
  get representacionFederalForm(): FormGroup {
    return this.cupoConsultarForm.get('representacionFederalForm') as FormGroup;
  }

  /**
   * Obtiene el formulario de bien final.
   * @returns {FormGroup} - El formulario de bien final.
   * @description Este formulario contiene la descripción del bien final.
   */
  get bienFinalForm(): FormGroup {
    return this.cupoConsultarForm.get('bienFinalForm') as FormGroup;
  }

  /**
   * Crea el formulario para consultar el cupo.
   * @returns {void}
   */
  crearCupoConsultarForm(): void {
    this.cupoConsultarForm = this.fb.group({
      cuotaInstrumentoForm: this.fb.group({
        cveTratado: [
          this.cuposState?.cveTratado,
          Validators.required
        ],
        cveRegimenClasificacion: [
          this.cuposState?.cveRegimenClasificacion,
          Validators.required
        ],
        cvePaisDestino: [
          this.cuposState?.cvePaisDestino,
          Validators.required
        ],
        fraccionArancelaria: [
          this.cuposState?.fraccionArancelaria,
          Validators.required
        ]
      }),
      cupoDescripcionForm: this.fb.group({
        fraccionArancelaria: [
          { value: this.cuposState?.fraccionArancelaria, disabled: true }
        ],
        productoDescripcion: [
          { value: this.cuposState?.productoDescripcion, disabled: true }
        ],
        cveTratado: [
          { value: this.cuposState?.cveTratado, disabled: true }
        ],
        subproductoClasificacion: [
          { value: this.cuposState?.subproductoClasificacion, disabled: true }
        ],
        asignacionMecanismo: [
          { value: this.cuposState?.asignacionMecanismo, disabled: true }
        ],
        categoriaTextil: [
          { value: this.cuposState?.categoriaTextil, disabled: true }
        ],
        cveRegimenClasificacion: [
          { value: this.cuposState?.cveRegimenClasificacion, disabled: true }
        ],
        categoriaTextilDescripcion: [
          { value: this.cuposState?.categoriaTextilDescripcion, disabled: true }
        ],
        paisDestino: [
          { value: this.cuposState?.paisDestino, disabled: true }
        ],
        unidad: [
          { value: this.cuposState?.unidad, disabled: true }
        ],
        conversionFactor: [
          { value: this.cuposState?.conversionFactor, disabled: true }
        ],
        fechaInicio: [
          { value: this.cuposState?.fechaInicio, disabled: true }
        ],
        fechaFinal: [
          { value: this.cuposState?.fechaFinal, disabled: true }
        ]
      }),
      representacionFederalForm: this.fb.group({
        cveEstado: [
          this.cuposState?.cveEstado,
          Validators.required
        ],
        cveRepresentacionFederal: [
          this.cuposState?.cveRepresentacionFederal,
          Validators.required
        ]
      }),
      bienFinalForm: this.fb.group({
        bienFinalDescripcion: [
          this.cuposState?.bienFinalDescripcion,
          Validators.required
        ]
      })
    });
  }

  /**
     * Inicializa los catálogos necesarios para el formulario.
     */
  inicializaCatalogos(): void {
    const TRATADO$ = this.cuposService
      .getTratadoCatalogo()
      .pipe(
        map((resp) => {
          this.tratado = resp.data;
        })
      );

    const REGIMEN_CLASIFICACION$ = this.cuposService
      .getRegimenClasificacionCatalogo()
      .pipe(
        map((resp) => {
          this.regimenClasificacion = resp.data;
        })
      );

    const PAIS_DESTINO$ = this.cuposService
      .getPaisDestinoCatalogo()
      .pipe(
        map((resp) => {
          this.paisDestino = resp.data;
        })
      );

    const ESTADO$ = this.cuposService
      .getEstadoCatalogo()
      .pipe(
        map((resp) => {
          this.estado = resp.data;
        })
      );

    const REPRESENTACION_FEDERAL$ = this.cuposService
      .getRepresentacionFederalCatalogo()
      .pipe(
        map((resp) => {
          this.representacionFederal = resp.data;
        })
      );

    merge(
      TRATADO$,
      REGIMEN_CLASIFICACION$,
      PAIS_DESTINO$,
      ESTADO$,
      REPRESENTACION_FEDERAL$
    )
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe();
  }

  /**
   * Selecciona el tratado.
   * @returns {void}
   * @description Este método se ejecuta cuando se selecciona un tratado en el formulario.
   */
  tratadoSeleccion(): void {
    const TRATADO = this.cuotaInstrumentoForm.get('cveTratado')?.value;
    this.tramite120201Store.setTratado(TRATADO);
  }

  /**
   * Selecciona el régimen de clasificación.
   * @returns {void}
   * @description Este método se ejecuta cuando se selecciona un régimen de clasificación en el formulario.
   */
  regimenClasificacionSeleccion(): void {
    const REGIMEN_CLASIFICACION = this.cuotaInstrumentoForm.get('cveRegimenClasificacion')?.value;
    this.tramite120201Store.setRegimenClasificacion(REGIMEN_CLASIFICACION);
  }

  /**
   * Selecciona el país destino.
   * @returns {void}
   * @description Este método se ejecuta cuando se selecciona un país destino en el formulario.
   */
  paisDestinoSeleccion(): void {
    const PAIS_DESTINO = this.cuotaInstrumentoForm.get('cvePaisDestino')?.value;
    this.tramite120201Store.setCvePaisDestino(PAIS_DESTINO);
  }

  /**
   * Selecciona el estado.
   * @returns {void}
   * @description Este método se ejecuta cuando se selecciona un estado en el formulario.
   */
  estadoSeleccion(): void {
    const ESTADO = this.representacionFederalForm.get('cveEstado')?.value;
    this.tramite120201Store.setEstado(ESTADO);
  }

  /**
   * Selecciona la representación federal.
   * @returns {void}
   * @description Este método se ejecuta cuando se selecciona una representación federal en el formulario.
   */
  representacionFederalSeleccion(): void {
    const REPRESENTACION_FEDERAL = this.representacionFederalForm.get('cveRepresentacionFederal')?.value;
    this.tramite120201Store.setRepresentacionFederal(REPRESENTACION_FEDERAL);
  }

  /**
   * Se ejecuta cuando se seleccionan filas en la tabla.
   * @param filasSeleccionadas
   * @description Este método se ejecuta cuando se seleccionan filas en la tabla dinámica.
   * @returns {void}
   */
  onListaDeFilaSeleccionada(filasSeleccionadas: InstrumentoCupoTPLForm[]): void {
    this.listaDeTablasSeleccionadas = filasSeleccionadas;
  }

  /**
   * Busca los datos de la tabla.
   * @description Este método se ejecuta cuando se hace clic en el botón de búsqueda.
   * @returns {void}
   */
  buscar(): void {
    this.cuposService.obtenerTablaDatos()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe((resp) => {
        const TABLA_DATOS = resp.data;
        const NUEVO_CUERPO_TABLA = TABLA_DATOS.map((item: InstrumentoCupoTPLForm) => ({
          cveTratado: item.cveTratado,
          cveRegimenClasificacion: item.cveRegimenClasificacion,
          cvePaisDestino: item.cvePaisDestino,
          fraccionArancelaria: item.fraccionArancelaria,
          categoriaTextilDescripcion: item.categoriaTextilDescripcion,
          productoDescripcion: item.productoDescripcion,
          subProductoClasificacion: item.subProductoClasificacion,
          fechaInicioVigencia: item.fechaInicioVigencia,
          fechaFinVigencia: item.fechaFinVigencia,
          montoDisponible: item.montoDisponible,
          categoriaTextil: item.categoriaTextil,
          asignacionMecanismo: item.asignacionMecanismo,
          unidad: item.unidad,
          conversionFactor: item.conversionFactor
        })
        );

        this.cuerpoTabla = NUEVO_CUERPO_TABLA;
        this.tramite120201Store.setCuerpoTablaDatos(this.cuerpoTabla ?? '');
      });
  }

  /**
   * Maneja el evento de clic en la fila de la tabla.
   * @description Este método se ejecuta cuando se hace clic en una fila de la tabla dinámica.
   * @param event - El evento que contiene los datos de la fila seleccionada.
   * @returns {void}
   */
  onFilaClicHandler(event: InstrumentoCupoTPLForm): void {
    // Aquí puedes manejar el evento de clic en la fila de la tabla
    const CUPO_DESCRIPCION_DATOS = event;

    this.cupoDescripcionForm.patchValue({
      fraccionArancelaria: CUPO_DESCRIPCION_DATOS.fraccionArancelaria,
      productoDescripcion: CUPO_DESCRIPCION_DATOS.productoDescripcion,
      cveTratado: CUPO_DESCRIPCION_DATOS.cveTratado,
      subproductoClasificacion: CUPO_DESCRIPCION_DATOS.subProductoClasificacion,
      asignacionMecanismo: CUPO_DESCRIPCION_DATOS.asignacionMecanismo,
      categoriaTextil: CUPO_DESCRIPCION_DATOS.categoriaTextil,
      cveRegimenClasificacion: CUPO_DESCRIPCION_DATOS.cveRegimenClasificacion,
      categoriaTextilDescripcion: CUPO_DESCRIPCION_DATOS.categoriaTextilDescripcion,
      paisDestino: CUPO_DESCRIPCION_DATOS.cvePaisDestino,
      unidad: CUPO_DESCRIPCION_DATOS.unidad,
      conversionFactor: CUPO_DESCRIPCION_DATOS.conversionFactor,
      fechaInicio: CUPO_DESCRIPCION_DATOS.fechaInicioVigencia,
      fechaFinal: CUPO_DESCRIPCION_DATOS.fechaFinVigencia
    });

    this.mostrarDetallesCupo = true;
    this.tramite120201Store.setMostrarDetallesCupo(this.mostrarDetallesCupo);
    this.actualizarCupoDescripcionState(this.cupoDescripcionForm);
  }

  /**
   * Actualiza el estado de la descripción del cupo en el store.
   * @description Este método se ejecuta cuando se actualiza la descripción del cupo en el formulario.
   * @param cupoDescripcionDatos - Los datos de la descripción del cupo.
   * @returns {void}
   */
  actualizarCupoDescripcionState(cupoDescripcionDatos: FormGroup): void {
    this.setValoresStore(cupoDescripcionDatos, 'fraccionArancelaria', 'setFraccionArancelaria');
    this.setValoresStore(cupoDescripcionDatos, 'productoDescripcion', 'setProductoDescripcion');
    this.setValoresStore(cupoDescripcionDatos, 'subproductoClasificacion', 'setSubproductoClasificacion');
    this.setValoresStore(cupoDescripcionDatos, 'asignacionMecanismo', 'setAsignacionMecanismo');
    this.setValoresStore(cupoDescripcionDatos, 'categoriaTextil', 'setCategoriaTextil');
    this.setValoresStore(cupoDescripcionDatos, 'cveRegimenClasificacion', 'setRegimenClasificacion');
    this.setValoresStore(cupoDescripcionDatos, 'unidad', 'setUnidad');
    this.setValoresStore(cupoDescripcionDatos, 'conversionFactor', 'setConversionFactor');
    this.setValoresStore(cupoDescripcionDatos, 'fechaInicio', 'setFechaInicio');
    this.setValoresStore(cupoDescripcionDatos, 'fechaFinal', 'setFechaFinal');
    this.setValoresStore(cupoDescripcionDatos, 'cveTratado', 'setTratado');
    this.setValoresStore(cupoDescripcionDatos, 'paisDestino', 'setPaisDestino');
    this.setValoresStore(cupoDescripcionDatos, 'categoriaTextilDescripcion', 'setCategoriaTextilDescripcion');
  }

  /**
   * Establece los valores en el store de tramite120201.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite120201Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite120201Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Se ejecuta al destruir el componente.
   * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}
