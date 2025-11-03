/**
 * Componente para gestionar la solicitud de mercancías en el trámite 130113.
 * Contiene formularios reactivos y opciones configurables relacionadas con el trámite.
 * Proporciona funcionalidades para capturar, modificar y validar la solicitud, así como mostrar notificaciones y manejar datos asociados.
 * @export
 * @class SolicitudComponent
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, map, takeUntil } from 'rxjs';

import { ConsultaioQuery } from '@ng-mf/data-access-user';

import {
  Catalogo,
  ConfiguracionColumna,
  Notificacion,
  REGEX_NUMERO_DECIMAL_ENTERO,
  REGEX_PATRON_DECIMAL_2,
  REGEX_SOLO_NUMEROS,
  REG_X,
} from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import fractionValues from '@libs/shared/theme/assets/json/130113/fraccion_arancelaria.json';

import PartidasdelaTable from '@libs/shared/theme/assets/json/130113/partidas-de-la.json';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130113/solicitud-select.json';
import unidadOptions from '@libs/shared/theme/assets/json/130113/unidad_da.json';

import { Tramite130113Query } from '../../estados/queries/tramite130113.query';

import {
  Tramite130113State,
  Tramite130113Store,
} from '../../estados/tramites/tramites130113.store';
import { ImportacionEquipoAnticontaminanteService } from '../../services/importacion-equipo-anticontaminante.service';
import { TEXTOS } from '../../../../shared/constantes/representacion-federal.enum';

import { PARTIDASDELAMERCANCIA_TABLA } from '../../../../shared/constantes/partidas-de-la-mercancia.enum';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';

import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';

/**
 * Componente para gestionar la solicitud de mercancías.
 * Contiene formularios reactivos y opciones configurables relacionadas con el trámite.
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss'
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * form
   * Formulario reactivo principal para capturar los datos de la solicitud.
   */
  /**
   * Formulario reactivo principal para capturar los datos de la solicitud.
   * @type {FormGroup}
   */
  partidasDelaMercanciaForm!: FormGroup;

  /**
   *  Formulario reactivo para los datos del trámite.
   */
  /**
   * Formulario reactivo para los datos del trámite.
   * @type {FormGroup}
   */
  formDelTramite!: FormGroup;

  /**
   *  Formulario reactivo para los detalles de la mercancía.
   */
  /**
   * Formulario reactivo para los detalles de la mercancía.
   * @type {FormGroup}
   */
  mercanciaForm!: FormGroup;

  /**
   * formForTotalCount
   * Formulario reactivo para capturar los totales de las partidas.
   */
  /**
   * Formulario reactivo para capturar los totales de las partidas.
   * @type {FormGroup}
   */
  formForTotalCount!: FormGroup;

  /**
   * Formulario reactivo para la selección de países.
   */
  /**
   * Formulario reactivo para la selección de países.
   * @type {FormGroup}
   */
  paisForm!: FormGroup;

  /**
   * Formulario reactivo para la representación.
   */
  /**
   * Formulario reactivo para la representación.
   * @type {FormGroup}
   */
  frmRepresentacionForm!: FormGroup;

  /**
   * Notificación de alerta para mostrar mensajes de éxito.
   * 
   * @public
   * @property {Notificacion} alertaNotificacion
   */

  /**
   * Notificación de alerta para mostrar mensajes de éxito o advertencia.
   * @type {Notificacion}
   */
  public alertaNotificacion!: Notificacion;

  /**
   * tableHeaderData
   * Configuración de las columnas de la tabla dinámica.
   */
  /**
   * Configuración de las columnas de la tabla dinámica.
   * @type {ConfiguracionColumna<PartidasDeLaMercanciaModelo>[]}
   */
  tableHeaderData: ConfiguracionColumna<PartidasDeLaMercanciaModelo>[] = PARTIDASDELAMERCANCIA_TABLA;

  /**
   * tableBodyData
   * Datos que se mostrarán en el cuerpo de la tabla dinámica.
   */
  /**
   * Datos que se mostrarán en el cuerpo de la tabla dinámica.
   * @type {PartidasDeLaMercanciaModelo[]}
   */
  tableBodyData: PartidasDeLaMercanciaModelo[] = [];

  /**
   * mostrarTabla
   * Bandera para mostrar u ocultar la tabla dinámica.
   */
  /**
   * Bandera para mostrar u ocultar la tabla dinámica.
   * @type {boolean}
   */
  mostrarTabla = false;

  /**
   * CHECKBOX
   * Tipo de selección de la tabla dinámica (checkbox).
   */
  /**
   * Tipo de selección de la tabla dinámica (checkbox).
   * @type {TablaSeleccion}
   */
  checkBox = TablaSeleccion.CHECKBOX;

  /**
   * getEstablecimientoTableData
   * Datos de configuración de la tabla obtenidos de un archivo JSON.
   */
  /**
   * Datos de configuración de la tabla obtenidos de un archivo JSON.
   * @type {any}
   */
  public getEstablecimientoTableData = PartidasdelaTable;

  /**
   * filaSeleccionada
   * Fila seleccionada en la tabla dinámica.
   */
  /**
   * Fila seleccionada en la tabla dinámica.
   * @type {PartidasDeLaMercanciaModelo[]}
   */
  filaSeleccionada: PartidasDeLaMercanciaModelo[] = [];

  /**
   *  Opciones para el campo "producto".
   */
  /**
   * Opciones para el campo "producto".
   * @type {ProductoOpción[]}
   */
  productoOpciones: ProductoOpción[] = [];

  /**
   *  Opciones para el campo "fraccionDescription".
   */
  /**
   * Opciones para el campo "fraccionDescription".
   * @type {Catalogo[]}
   */
  fraccionDescription: Catalogo[] = [];

  /**
   *  Catálogo con valores de fracción arancelaria.
   */

  /**
   * Catálogo con valores de fracción arancelaria.
   * @type {Catalogo[]}
   */
  fraccionCatalogo: Catalogo[] = fractionValues;

  /**
   *  Catálogo con opciones de unidad de medida.
   */
  /**
   * Catálogo con opciones de unidad de medida.
   * @type {Catalogo[]}
   */
  unidadCatalogo: Catalogo[] = unidadOptions;

  /**
   *  Campos de entrada configurables para detalles adicionales.
   */
  datosInputFields = [
    {
      label: 'Régimen al que se destinará la mercancía',
      placeholder: 'Seleccione un valor',
      required: true,
      controlName: 'regimen',
    },
    {
      label: 'Clasificación del régimen',
      placeholder: 'Seleccione un valor',
      required: true,
      controlName: 'clasificacion',
    },
  ];

  /**
   *  Matriz de catálogos adicionales para el formulario.
   */
  catalogosArray: Catalogo[][] = solicitudeSelectVal;
  /**
   *  Opciones de solicitud configurables.
   */
  opcionesSolicitud: ProductoOpción[] = [];

  /**
   *  Sujeto para gestionar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();
  /**
   *  Arreglo que almacena un catálogo de elementosDeBloque.
   * {Catalogo[]}
   */
  elementosDeBloque: Catalogo[] = [];
  /**
   *  Arreglo que contiene un catálogo de países organizados por bloque.
   * {Catalogo[]}
   */
  paisesPorBloque: Catalogo[] = [];
  /**
   *  Arreglo que guarda un catálogo de entidades federativas.
   * {Catalogo[]}
   */
  entidadFederativa: Catalogo[] = [];
  /**
   *  Arreglo que almacena un catálogo de representaciones federales.
   * {Catalogo[]}
   */
  representacionFederal: Catalogo[] = [];
  /**
   *  Arreglo de cadenas que representa las opciones seleccionables de rangos de días.
   * {string[]}
   */
  selectRangoDias: string[] = [];
  /**
   *  Objeto o constante que contiene los textos utilizados en la aplicación.
   * {any}
   */
  TEXTOS = TEXTOS;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
  /**
   * Estado interno de la sección actual del trámite 130110.
   * Utilizado para gestionar y almacenar la información relacionada con esta sección.
   * Propiedad privada.
   */
  private seccionState!: Tramite130113State;
  /**
   * Constructor del componente.
   *{FormBuilder} fb - Servicio para la creación de formularios reactivos.
   *{HttpClient} http - Servicio para realizar solicitudes HTTP.
   *{Tramite130113Store} tramite130113Store - Store para gestionar el estado del trámite 130113.
   *{Tramite130113Query} tramite130113Query - Query para consultar el estado del trámite 130113.
   */
  constructor(
    private fb: FormBuilder,
    private tramite130113Store: Tramite130113Store,
    private tramite130113Query: Tramite130113Query,
    private importacionEquipoAnticontaminanteService: ImportacionEquipoAnticontaminanteService,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.inicializarFormularios();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }
  /**
   *  Ciclo de vida de Angular: inicializa formularios, suscripciones y opciones al cargar el componente.
   */
  ngOnInit(): void {
    this.configuracionFormularioSuscripciones();
    this.opcionesDeBusqueda();
    this.formularioTotalCount();
    this.obtenerTablaDatos();
    this.fetchEntidadFederativa();
    this.fetchRepresentacionFederal();
    this.listaDePaisesDisponibles();
    this.listaDeFraccionDescripcion();

    this.tramite130113Query.mostrarTabla$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((mostrarTabla) => {
        this.mostrarTabla = mostrarTabla;
      });
  }
  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.inicializarFormularios();
    }
  }

  /**
   * Se suscribe a los cambios del estado de la solicitud en el store de Tramite130111.
   * Cada vez que el estado cambia, actualiza la propiedad interna `seccionState` con los nuevos datos.
   * Esta suscripción se cancela automáticamente al destruir el componente para evitar fugas de memoria.
   */
  suscribirseAEstadoDeSolicitud(): void {
    this.tramite130113Query.selectSolicitud$
      ?.pipe(takeUntil(this.destroyed$))
      .subscribe((data: Tramite130113State) => {
        this.seccionState = data;
      });
  }
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormularios();
  }
  /**
   *  Inicializa los formularios reactivos `formDelTramite` y `mercanciaForm`.
   */
  inicializarFormularios(): void {
    this.suscribirseAEstadoDeSolicitud();
    this.formDelTramite = this.fb.group({
      solicitud: ['', Validators.required],
      regimen: [
        { value: this.seccionState?.regimen, disabled: true },
        Validators.required,
      ],
      clasificacion: [
        { value: this.seccionState?.clasificacion, disabled: true },
        Validators.required,
      ],
    });

    this.mercanciaForm = this.fb.group({
      producto: [],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      fraccion: ['', Validators.required],
      cantidad: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_SOLO_NUMEROS),
          Validators.min(1),
        ],
      ],

      valorFacturaUSD: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_PATRON_DECIMAL_2),
          Validators.min(0.01),
        ],
      ],

      unidadMedida: ['', Validators.required],
    });
    this.partidasDelaMercanciaForm = this.fb.group({
      cantidadPartidasDeLaMercancia: [
        '',
        [
          Validators.required,
          Validators.pattern(REG_X.SOLO_NUMEROS),
          Validators.maxLength(18),
        ],
      ],
      fraccionTigiePartidasDeLaMercancia: [
        '',
        [Validators.required, Validators.maxLength(255)],
      ],
      fraccionDescripcionPartidasDeLaMercancia: [''],
      descripcionPartidasDeLaMercancia: [
        '',
        [Validators.required, Validators.maxLength(255)],
      ],
      valorPartidaUSDPartidasDeLaMercancia: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(REGEX_NUMERO_DECIMAL_ENTERO),
          Validators.maxLength(20),
        ],
      ],
    });

    this.paisForm = this.fb.group({
      bloque: [''],
      usoEspecifico: ['', Validators.required],
      justificacionImportacionExportacion: ['', [Validators.required]],
      observaciones: [''],
    });
    this.frmRepresentacionForm = this.fb.group({
      entidad: ['', Validators.required],
      representacion: ['', Validators.required],
    });
  }
  /**
   *  Configura las suscripciones para actualizar formularios y almacenar estados.
   */
  configuracionFormularioSuscripciones(): void {
    this.tramite130113Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.partidasDelaMercanciaForm.patchValue({
            cantidadPartidasDeLaMercancia:
              seccionState.cantidadPartidasDeLaMercancia,
            fraccionTigiePartidasDeLaMercancia:
              seccionState.fraccionTigiePartidasDeLaMercancia,
            fraccionDescripcionPartidasDeLaMercancia:
              seccionState.fraccionDescripcionPartidasDeLaMercancia,
            valorPartidaUSDPartidasDeLaMercancia:
              seccionState.valorPartidaUSDPartidasDeLaMercancia,
            descripcionPartidasDeLaMercancia:
              seccionState.descripcionPartidasDeLaMercancia,
          });

          this.formDelTramite.patchValue({
            solicitud: seccionState.solicitud,
            regimen: seccionState.regimen,
            clasificacion: seccionState.clasificacion,
          });

          this.mercanciaForm.patchValue({
            producto: seccionState.producto,
            descripcion: seccionState.descripcion,
            fraccion: seccionState.fraccion,
            cantidad: seccionState.cantidad,
            valorFacturaUSD: seccionState.valorFacturaUSD,
            unidadMedida: seccionState.unidadMedida,
          });

          this.paisForm.patchValue({
            bloque: seccionState.bloque,
            usoEspecifico: seccionState.usoEspecifico,
            justificacionImportacionExportacion:
              seccionState.justificacionImportacionExportacion,
            observaciones: seccionState.observaciones,
          });

          this.frmRepresentacionForm.patchValue({
            entidad: seccionState.entidad,
            representacion: seccionState.representacion,
          });
        })
      )
      .subscribe();
  }
  /**
   * formularioTotalCount
   * Crea el formulario reactivo para capturar los totales de las partidas.
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
  }

  /**
   * getEstablecimiento
   * Configura los datos de la tabla dinámica a partir de un archivo JSON.
   */

  obtenerTablaDatos(): void {
    // No complete tableBodyData en el inicio, manténgalo vacío de forma predeterminada
    this.tableBodyData = [];
    this.formForTotalCount.patchValue({
      cantidadTotal: '',
      valorTotalUSD: '',
    });
  }

  /**
   *  Solicita opciones configurables para los formularios desde archivos JSON.
   */
  opcionesDeBusqueda(): void {
    this.importacionEquipoAnticontaminanteService
      .getSolicitudeOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.opcionesSolicitud = data.options;
          this.tramite130113Store.actualizarEstado({
            solicitud: data.options[0]?.value || '',
            defaultSelect: data.defaultSelect || 'Inicial',
          });
        },
        error: (error) =>
          console.error('Error loading solicitude options:', error),
      });

    this.importacionEquipoAnticontaminanteService
      .getProductoOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.productoOpciones = data.options;
          this.tramite130113Store.actualizarEstado({
            producto: data.options[0]?.value || 'Nuevo',
            defaultProducto: data.options[0]?.value || 'Nuevo',
          });
        },
      });
  }
  /**
   * manejarlaFilaSeleccionada
   * Maneja la selección de filas en la tabla dinámica y actualiza el estado global.
   * Lista de filas seleccionadas.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  manejarlaFilaSeleccionada(
    filasSeleccionadas: PartidasDeLaMercanciaModelo[]
  ): void {
    // Actualiza la fila seleccionada
    this.filaSeleccionada = filasSeleccionadas;
    this.tramite130113Store.actualizarEstado({
      filaSeleccionada: this.filaSeleccionada,
    });
  }

  /**
   * validarYEnviarFormulario
   * Valida el formulario y muestra la tabla dinámica si es válido.
   */
  validarYEnviarFormulario(): void {
    if (this.partidasDelaMercanciaForm.invalid) {
      this.partidasDelaMercanciaForm.markAllAsTouched();
      this.mostrarTabla = false;
      return;
    }
    // Validar que todos los campos obligatorios estén llenos antes de agregar la fila
    const CAMPOS_OBLIGATORIOS = [
      'cantidadPartidasDeLaMercancia',
      'fraccionTigiePartidasDeLaMercancia',
      'fraccionDescripcionPartidasDeLaMercancia',
      'descripcionPartidasDeLaMercancia',
      'valorPartidaUSDPartidasDeLaMercancia'
    ];
    const VALOR_FORMULARIO = this.partidasDelaMercanciaForm.value;
    const TODOS_CAMPOS_LLENO = CAMPOS_OBLIGATORIOS.every(
      campo => VALOR_FORMULARIO[campo] !== null && VALOR_FORMULARIO[campo] !== undefined && VALOR_FORMULARIO[campo] !== ''
    );
    if (!TODOS_CAMPOS_LLENO) {
      this.mostrarTabla = false;
      return;
    }
    // Calcular el total USD para la fila
    const CANTIDAD = Number(VALOR_FORMULARIO.cantidadPartidasDeLaMercancia);
    const PRECIO_UNITARIO_USD = Number(VALOR_FORMULARIO.valorPartidaUSDPartidasDeLaMercancia);
    const TOTAL_USD = (CANTIDAD && PRECIO_UNITARIO_USD) ? (CANTIDAD * PRECIO_UNITARIO_USD).toFixed(2) : '';
    // Crear la fila mapeada para la tabla
    const FILA_MAPEADA = {
      id: (Date.now()).toString(), // Identificador único para cada fila
      cantidad: VALOR_FORMULARIO.cantidadPartidasDeLaMercancia,
      unidadDeMedida: '', // Completar desde catálogo o formulario si está disponible
      fraccionFrancelaria: VALOR_FORMULARIO.fraccionTigiePartidasDeLaMercancia,
      descripcion: VALOR_FORMULARIO.descripcionPartidasDeLaMercancia,
      precioUnitarioUSD: VALOR_FORMULARIO.valorPartidaUSDPartidasDeLaMercancia,
      totalUSD: TOTAL_USD,
      fraccionTigiePartidasDeLaMercancia: VALOR_FORMULARIO.fraccionTigiePartidasDeLaMercancia,
      fraccionDescripcionPartidasDeLaMercancia: VALOR_FORMULARIO.fraccionDescripcionPartidasDeLaMercancia
    };
    // Agregar la fila mapeada al arreglo de datos de la tabla
    this.tableBodyData = [
      ...this.tableBodyData,
      FILA_MAPEADA
    ];
    // Actualizar los totales en el formulario de totales
    const SUMA_CANTIDAD = this.tableBodyData.reduce((sum, row) => sum + Number(row.cantidad || 0), 0);
    const SUMA_TOTAL_USD = this.tableBodyData.reduce((sum, row) => sum + Number(row.totalUSD || 0), 0);
    this.formForTotalCount.patchValue({
      cantidadTotal: SUMA_CANTIDAD,
      valorTotalUSD: Number(SUMA_TOTAL_USD).toFixed(2)
    });
    this.mostrarTabla = true;
    this.tramite130113Store.actualizarEstado({ mostrarTabla: true });
    this.partidasDelaMercanciaForm.reset();
  }

  /**
   * navegarParaModificarPartida
   * Navega para modificar una partida específica y actualiza el estado global.
   */
  navegarParaModificarPartida(): void {
    // Aquí se abriría el modal de modificar (el template debe manejarlo)
    this.tramite130113Store.actualizarEstado({ mostrarTabla: true });
    this.tramite130113Store.actualizarEstado({
      filaSeleccionada: this.filaSeleccionada,
    });
  }
  /**
   * Método para obtener la lista de entidades federativas.
   */
  fetchEntidadFederativa(): void {
    this.importacionEquipoAnticontaminanteService
      .getEntidadFederativa()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.entidadFederativa = data;
      });
  }

  /**
   * Método para obtener la lista de representaciones federales.
   */
  fetchRepresentacionFederal(): void {
    this.importacionEquipoAnticontaminanteService
      .getRepresentacionFederal()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.representacionFederal = data;
      });
  }
  /**
   * Método para obtener la lista de países disponibles.
   */
  listaDePaisesDisponibles(): void {
    this.importacionEquipoAnticontaminanteService
      .getListaDePaisesDisponibles()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.elementosDeBloque = data;
      });
  }

  /**
   * Método para obtener la lista de fracciones de la descripción de las partidas de la mercancía.
   */
  listaDeFraccionDescripcion(): void {
    this.importacionEquipoAnticontaminanteService
      .getFraccionDescripcionPartidasDeLaMercancia()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.fraccionDescription = data;
      });
  }

  /**
   * Método para obtener la lista de países por bloque.
   *{number} _bloqueId - Identificador del bloque.
   */
  fetchPaisesPorBloque(_bloqueId: number): void {
    this.importacionEquipoAnticontaminanteService
      .getPaisesPorBloque(_bloqueId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.paisesPorBloque = data;
        this.selectRangoDias = this.paisesPorBloque.map(
          (pais: Catalogo) => pais.descripcion
        );
      });
  }
  /**
   * Maneja el cambio de bloque seleccionado.
   *{number} bloqueId - Identificador del bloque seleccionado.
   */
  enCambioDeBloque(bloqueId: number): void {
    this.fetchPaisesPorBloque(bloqueId);
  }

  /**
   * @description Actualiza el almacén con nuevos valores basados en eventos de formulario.
   * @param event Evento que incluye el formulario, el campo y el método a ejecutar.
   */
  setValoresStore($event: { form: FormGroup; campo: string }): void {
    const VALOR = $event.form.get($event.campo)?.value;
    this.tramite130113Store.actualizarEstado({ [$event.campo]: VALOR });
    if ($event.campo === 'fraccion') {
      this.tramite130113Store.actualizarEstado({ unidadMedida: '1' });
    }
  }
  /**
   *  Ciclo de vida de Angular: limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
