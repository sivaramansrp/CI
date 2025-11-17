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
  MostrarPartidas,
  Notificacion,
  REGEX_NUMERO_DECIMAL_ENTERO,
  REGEX_PATRON_DECIMAL_2,
  REGEX_SOLO_NUMEROS,
  REG_X,
} from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import { Tramite130113Query } from '../../estados/queries/tramite130113.query';

import {
  Tramite130113State,
  Tramite130113Store,
} from '../../estados/tramites/tramites130113.store';
import { ImportacionEquipoAnticontaminanteService } from '../../services/importacion-equipo-anticontaminante.service';
import { TEXTOS } from '../../../../shared/constantes/representacion-federal.enum';

import { PARTIDASDELAMERCANCIA_TABLA } from '../../../../shared/constantes/partidas-de-la-mercancia.enum';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';

import { ID_PROCEDIMIENTO, OPINIONES_SOLICITUD, PRODUCTO_OPCION } from '../../constants/importacion-equipo-anticontaminante.enum';
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

  isInvalidaPartidas: boolean = false;

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
  public getEstablecimientoTableData = [];

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
  productoOpciones: ProductoOpción[] = PRODUCTO_OPCION;

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
  fraccionCatalogo: Catalogo[] = [];

  /**
   *  Catálogo con opciones de unidad de medida.
   */
  /**
   * Catálogo con opciones de unidad de medida.
   * @type {Catalogo[]}
   */
  unidadCatalogo: Catalogo[] = [];

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
  catalogosArray: Catalogo[][] = [[], []];
  /**
   *  Opciones de solicitud configurables.
   */
  opcionesSolicitud: ProductoOpción[] = OPINIONES_SOLICITUD;

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

  mostrarPartidas: MostrarPartidas[] = [];

   /**
   * Formulario reactivo para modificar las partidas de la mercancía.
   */
  modificarPartidasDelaMercanciaForm!: FormGroup;

  /**
   * idProcedimiento
   * Identificador del procedimiento asociado al trámite.
   */
  idProcedimiento: number = ID_PROCEDIMIENTO;
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
    this.getMostrarPartidas();
    this.configuracionFormularioSuscripciones();
    this.formularioTotalCount();
    this.getRegimenCatalogo();
    this.getFraccionCatalogo();
    this.getEntidadesFederativasCatalogo();
    this.getBloque();
    // this.opcionesDeBusqueda();
    // this.obtenerTablaDatos();
    // this.fetchEntidadFederativa();
    // this.fetchRepresentacionFederal();
    // this.listaDePaisesDisponibles();
    // this.listaDeFraccionDescripcion();

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
 this.modificarPartidasDelaMercanciaForm = this.fb.group({
      cantidadPartidasDeLaMercancia: [
        this.seccionState?.modificarPartidasDelaMercanciaForm?.cantidadPartidasDeLaMercancia,
        [
          Validators.required,
          Validators.pattern(REG_X.SOLO_NUMEROS),
          Validators.maxLength(18),
        ],
      ],
      descripcionPartidasDeLaMercancia: [
        this.seccionState?.modificarPartidasDelaMercanciaForm?.descripcionPartidasDeLaMercancia,
        [Validators.required, Validators.maxLength(255)],
      ],
      valorPartidaUSDPartidasDeLaMercancia: [
        this.seccionState?.modificarPartidasDelaMercanciaForm?.valorPartidaUSDPartidasDeLaMercancia,
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
  // opcionesDeBusqueda(): void {
  //   this.importacionEquipoAnticontaminanteService
  //     .getSolicitudeOptions()
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe({
  //       next: (data) => {
  //         this.opcionesSolicitud = data.options;
  //         this.tramite130113Store.actualizarEstado({
  //           solicitud: data.options[0]?.value || '',
  //           defaultSelect: data.defaultSelect || 'Inicial',
  //         });
  //       },
  //       error: (error) =>
  //         console.error('Error loading solicitude options:', error),
  //     });

  //   this.importacionEquipoAnticontaminanteService
  //     .getProductoOptions()
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe({
  //       next: (data) => {
  //         this.productoOpciones = data.options;
  //         this.tramite130113Store.actualizarEstado({
  //           producto: data.options[0]?.value || 'Nuevo',
  //           defaultProducto: data.options[0]?.value || 'Nuevo',
  //         });
  //       },
  //     });
  // }
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
    const UMT = this.unidadCatalogo.map(item => item.clave === this.seccionState?.unidadMedida ? item.descripcion : '').toString();
    // const CANTIDAD = Number(VALOR_FORMULARIO.cantidadPartidasDeLaMercancia);
    // const PRECIO_UNITARIO_USD = this.calcularImporteUnitario(this.seccionState?.valorPartidaUSDPartidasDeLaMercancia, this.seccionState?.cantidadPartidasDeLaMercancia);
    const PRECIO_UNITARIO_USD = Number(VALOR_FORMULARIO.valorPartidaUSDPartidasDeLaMercancia)/Number(VALOR_FORMULARIO.cantidadPartidasDeLaMercancia);
    // const TOTAL_USD = (CANTIDAD && PRECIO_UNITARIO_USD) ? (CANTIDAD * PRECIO_UNITARIO_USD).toFixed(2) : '';
    // Crear la fila mapeada para la tabla
    const FILA_MAPEADA = {
      id: String(this.tableBodyData.length + 1), // Identificador único para cada fila
      cantidad: VALOR_FORMULARIO.cantidadPartidasDeLaMercancia,
      unidadDeMedida: UMT, // Completar desde catálogo o formulario si está disponible
      fraccionFrancelaria: VALOR_FORMULARIO.fraccionTigiePartidasDeLaMercancia,
      descripcion: VALOR_FORMULARIO.descripcionPartidasDeLaMercancia,
      precioUnitarioUSD: PRECIO_UNITARIO_USD.toString(),
      totalUSD: VALOR_FORMULARIO.valorPartidaUSDPartidasDeLaMercancia,
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
    this.tramite130113Store.actualizarEstado({
        tableBodyData: this.tableBodyData
      })
    this.partidasDelaMercanciaForm.reset();
  }

  /**
 *  Calcula el importe unitario en USD basado en la cantidad de partidas y el total en USD.
 * @param cantidadPartidas 
 * @param cantidadUSD 
 * @returns 
 */
  calcularImporteUnitario(cantidadPartidas: string, cantidadUSD: string): string {
    const TOTAL_PARTIDAS = Number(cantidadPartidas) || 0;
    const TOTAL_USD = Number(cantidadUSD) || 0;

    if (TOTAL_PARTIDAS === 0) {
      return '0';
    }

    const MAXIMO_DECIMALES = 3;
    const IMPORTE_UNITARIO_USD = TOTAL_USD / TOTAL_PARTIDAS;

    return IMPORTE_UNITARIO_USD.toFixed(MAXIMO_DECIMALES).toString();
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
  // fetchEntidadFederativa(): void {
  //   this.importacionEquipoAnticontaminanteService
  //     .getEntidadFederativa()
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe((data) => {
  //       this.entidadFederativa = data;
  //     });
  // }

  /**
   * Método para obtener la lista de representaciones federales.
   */
  // fetchRepresentacionFederal(): void {
  //   this.importacionEquipoAnticontaminanteService
  //     .getRepresentacionFederal()
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe((data) => {
  //       this.representacionFederal = data;
  //     });
  // }
  /**
   * Método para obtener la lista de países disponibles.
   */
  // listaDePaisesDisponibles(): void {
  //   this.importacionEquipoAnticontaminanteService
  //     .getListaDePaisesDisponibles()
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe((data) => {
  //       this.elementosDeBloque = data;
  //     });
  // }

  /**
   * Método para obtener la lista de fracciones de la descripción de las partidas de la mercancía.
   */
  // listaDeFraccionDescripcion(): void {
  //   this.importacionEquipoAnticontaminanteService
  //     .getFraccionDescripcionPartidasDeLaMercancia()
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe((data) => {
  //       this.fraccionDescription = data;
  //     });
  // }

  /**
   * Método para obtener la lista de países por bloque.
   *{number} _bloqueId - Identificador del bloque.
   */
  // fetchPaisesPorBloque(_bloqueId: number): void {
  //   this.importacionEquipoAnticontaminanteService
  //     .getPaisesPorBloque(_bloqueId)
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe((data) => {
  //       this.paisesPorBloque = data;
  //       this.selectRangoDias = this.paisesPorBloque.map(
  //         (pais: Catalogo) => pais.descripcion
  //       );
  //     });
  // }
  /**
   * Maneja el cambio de bloque seleccionado.
   *{number} bloqueId - Identificador del bloque seleccionado.
   */
  enCambioDeBloque(bloqueId: number): void {
    // this.fetchPaisesPorBloque(bloqueId);
    this.getPaisesPorBloque(bloqueId.toString());
  }

  /**
   * @description Actualiza el almacén con nuevos valores basados en eventos de formulario.
   * @param event Evento que incluye el formulario, el campo y el método a ejecutar.
   */
  setValoresStore($event: { form: FormGroup; campo: string }): void {
    const VALOR = $event.form.get($event.campo)?.value;
    this.tramite130113Store.actualizarEstado({ [$event.campo]: VALOR });
    if ($event.campo === 'regimen') {
      const VALOR = this.formDelTramite.get('regimen')?.value;
      this.getClasificacionRegimenCatalogo(VALOR);
    }
    if ($event.campo === 'fraccion') {
      const VALOR = this.mercanciaForm.get('fraccion')?.value;
      this.getUnidadesMedidaTarifaria(VALOR);
    }
    if ($event.campo === 'entidad') {
      const VALOR = this.frmRepresentacionForm.get('entidad')?.value;
      this.getRepresentacionFederalCatalogo(VALOR);
    }
  }

   /**
    * Obtiene el catálogo de tratados o acuerdos desde el servicio y lo asigna a la propiedad `tratadoAcuerdoCertificado`.
    *
    * @returns {void}
    */
    getRegimenCatalogo(): void {
      this.importacionEquipoAnticontaminanteService.getRegimenCatalogo(this.idProcedimiento.toString()).subscribe((data) => {
        this.catalogosArray[0] = data as Catalogo[];
      });
    }
  
    /**
     * Obtiene el catálogo de tratados o acuerdos desde el servicio y lo asigna a la propiedad `tratadoAcuerdoCertificado`.
     *
     * @returns {void}
     */
    getClasificacionRegimenCatalogo(VALOR: string): void {
      this.importacionEquipoAnticontaminanteService.getClasificacionRegimenCatalogo(VALOR).subscribe((data) => {
        this.catalogosArray[1] = data as Catalogo[];
      });
    }
  
    /**
     * Obtiene el catálogo de fracciones arancelarias desde el servicio y lo asigna a la propiedad `fraccionCatalogo`.
     *
     * @returns {void}
     */
    getFraccionCatalogo(): void {
      this.importacionEquipoAnticontaminanteService.getFraccionCatalogoService(this.idProcedimiento.toString()).subscribe((data) => {
        this.fraccionCatalogo = data?.map(item => ({
          ...item,
          descripcion: `${item.clave} - ${item.descripcion}`
        }));
      });
    }
  
    /**
     *  Obtiene las unidades de medida tarifaria basadas en la fracción arancelaria seleccionada.
     * @param FRACCION_ID 
     */
    getUnidadesMedidaTarifaria(FRACCION_ID: string): void {
      this.importacionEquipoAnticontaminanteService.getUMTService(this.idProcedimiento.toString(), FRACCION_ID).subscribe((data) => {
        this.unidadCatalogo = data as Catalogo[];
        if (this.unidadCatalogo.length > 0) {
          this.mercanciaForm.get('unidadMedida')?.setValue(this.unidadCatalogo[0]?.clave || '');
          this.tramite130113Store.actualizarEstado({ unidadMedida: this.unidadCatalogo[0]?.clave || '' });
        }
      });
    }
  
    /**
     * Obtiene los bloques desde el servicio y los asigna a la propiedad `elementosDeBloque`.
     *
     * @returns {void}
     */
    getBloque(): void {
      this.importacionEquipoAnticontaminanteService.getBloqueService(this.idProcedimiento.toString()).subscribe((data) => {
        this.elementosDeBloque = data as Catalogo[];
      });
    }
  
    /**
     *  Obtiene los países por bloque desde el servicio y los asigna a la propiedad `paisesPorBloque`.
     * @param ID 
     */
    getPaisesPorBloque(ID: string): void {
      this.importacionEquipoAnticontaminanteService.getPaisesPorBloqueService(this.idProcedimiento.toString(), ID).subscribe((data) => {
        this.paisesPorBloque = data as Catalogo[];
      });
    }
  
    /**
     * Obtiene el catálogo de entidades federativas desde el servicio y lo asigna a la propiedad `entidadFederativa`.
     *
     * @returns {void}
     */
    getEntidadesFederativasCatalogo(): void {
      this.importacionEquipoAnticontaminanteService.getEntidadesFederativasCatalogo(this.idProcedimiento.toString()).subscribe((data) => {
        this.entidadFederativa = data as Catalogo[];
      })
    }
  
    /**
     *  Obtiene el catálogo de representaciones federales basado en la entidad seleccionada.
     * @param cveEntidad 
     */
    getRepresentacionFederalCatalogo(cveEntidad: string): void {
      this.importacionEquipoAnticontaminanteService.getRepresentacionFederalCatalogo(this.idProcedimiento.toString(), cveEntidad).subscribe((data) => {
        this.representacionFederal = data as Catalogo[];
      });
    }
  
    /**
     *  Maneja la selección de todos los países.
     * @param evento 
     */
    todosPaisesSeleccionados(): void {
        this.importacionEquipoAnticontaminanteService.getTodosPaisesSeleccionados(this.idProcedimiento.toString()).subscribe((data) => {
          this.paisesPorBloque = data as Catalogo[];
        });
    }
  
    /**
     * Obtiene las partidas a mostrar desde el servicio y las asigna a la propiedad `mostrarPartidas`.
     *
     * @returns {void}
     */
    getMostrarPartidas(): void {
      this.importacionEquipoAnticontaminanteService.getMostrarPartidasService(202859165).subscribe((data) => {
        if(data.codigo === '00'){
            this.mostrarPartidas = data.datos as MostrarPartidas[];
            this.tramite130113Store.actualizarEstado({ mostrarPartidas: this.mostrarPartidas });
        }
      });
    }

    /**
     *  Modifica los valores del formulario de partidas de la mercancía según el evento recibido.
     * @param evento 
     */
      modificarPartidaSeleccionada(evento: PartidasDeLaMercanciaModelo): void {
    
        this.modificarPartidasDelaMercanciaForm.patchValue({
          cantidadPartidasDeLaMercancia: evento.cantidad,
          valorPartidaUSDPartidasDeLaMercancia: evento.totalUSD,
          descripcionPartidasDeLaMercancia: evento.descripcion,
        });
      }

     /**
   * Valida todos los formularios y la selección de filas.
   * @returns {boolean} Indica si todos los formularios y la selección son válidos.
   */
  validarFormulario(): boolean {
    let isValid = true;
    if (this.formDelTramite.invalid) {
      this.formDelTramite.markAllAsTouched();
      isValid = false;
    }
    if (this.mercanciaForm.invalid) {
      this.mercanciaForm.markAllAsTouched();
      isValid = false;
    }
    if (this.tableBodyData.length === 0) {
      this.isInvalidaPartidas = true;
      isValid = false;
    } else if (this.tableBodyData.length > 0) {
      this.isInvalidaPartidas = false;
    }
    if (this.paisForm.invalid) {
      this.paisForm.markAllAsTouched();
      isValid = false;
    }
    if (this.frmRepresentacionForm.invalid) {
      this.frmRepresentacionForm.markAllAsTouched();
      isValid = false;
    }
    return isValid;
  }
  
  /**
   *  Ciclo de vida de Angular: limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
