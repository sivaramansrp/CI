import { Catalogo, REG_X } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { DiamanteBrutoService } from '../../130114/services/diamante-bruto.service';
import { HttpClient } from '@angular/common/http';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130114/partidas-de-la.json';
import { ProductoOpción } from '../../../shared/constantes/vehiculos-adaptados.enum';
import { TEXTOS } from '../../../shared/constantes/representacion-federal.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Tramite130114Query } from '../../130114/estados/queries/tramite130114.query';
import { Tramite130114Store } from '../../130114/estados/queries/tramites130114.store';
import fractionValues from '@libs/shared/theme/assets/json/130114/fraccion_arancelaria.json';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130114/solicitud-select.json';
import unidadOptions from '@libs/shared/theme/assets/json/130114/unidad_da.json';

/**
 * Componente para gestionar la solicitud de mercancías de diamantes brutos.
 * Contiene formularios reactivos para capturar información sobre:
 * - Datos del trámite
 * - Detalles de la mercancía
 * - Partidas de la mercancía
 * - Selección de países y representación federal
 * 
 * Utiliza un store (Tramite130114Store) para gestionar el estado de la solicitud
 * y servicios para obtener datos de catálogos y opciones configurables.
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para los datos principales del trámite.
   * @type {FormGroup}
   */
  formDelTramite!: FormGroup;

  /**
   * Formulario reactivo para los detalles específicos de la mercancía.
   * @type {FormGroup}
   */
  mercanciaForm!: FormGroup;

  /**
   * Formulario reactivo para las partidas de la mercancía.
   * @type {FormGroup}
   */
  partidasDelaMercanciaForm!: FormGroup;

  /**
   * Formulario reactivo para mostrar los totales calculados.
   * @type {FormGroup}
   */
  formForTotalCount!: FormGroup;

  /**
   * Formulario reactivo para la selección de países.
   * @type {FormGroup}
   */
  paisForm!: FormGroup;

  /**
   * Formulario reactivo para la representación federal.
   * @type {FormGroup}
   */
  frmRepresentacionForm!: FormGroup;

  /**
   * Configuración de las columnas para la tabla de partidas.
   * @type {ConfiguracionColumna<string>[]}
   */
  tableHeaderData: ConfiguracionColumna<string>[] = [];

  /**
   * Datos para el cuerpo de la tabla de partidas.
   * @type {{ tbodyData: string[] }[]}
   */
  tableBodyData: { tbodyData: string[] }[] = [];

  /**
   * Indica si la tabla de partidas debe mostrarse.
   * @type {boolean}
   */
  mostrarTabla = false;

  /**
   * Tipo de selección para la tabla (checkbox).
   * @type {TablaSeleccion}
   */
  checkBox = TablaSeleccion.CHECKBOX;

  /**
   * Datos de configuración para la tabla de partidas.
   * @type {any}
   */
  public getEstablecimientoTableData = PartidasdelaTable;

  /**
   * Fila seleccionada en la tabla de partidas.
   * @type {any}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filaSeleccionada: any = null;

  /**
   * Opciones disponibles para el campo "producto".
   * @type {ProductoOpción[]}
   */
  productoOpciones: ProductoOpción[] = [];

  /**
   * Catálogo de fracciones arancelarias.
   * @type {Catalogo[]}
   */
  fraccionCatalogo: Catalogo[] = fractionValues;

  /**
   * Catálogo de unidades de medida.
   * @type {Catalogo[]}
   */
  unidadCatalogo: Catalogo[] = unidadOptions;

  /**
   * Campos de entrada configurables para el formulario.
   * @type {Array}
   */
  datosInputFields = [
    {
      label: 'Régimen al que se destinará la mercancía',
      placeholder: 'Seleccione un documento',
      required: true,
      controlName: 'regimen',
    },
    {
      label: 'Clasificación del régimen',
      placeholder: 'Seleccione un documento',
      required: true,
      controlName: 'clasificacion',
    },
  ];

  /**
   * Matriz de catálogos para opciones de selección.
   * @type {Catalogo[][]}
   */
  catalogosArray: Catalogo[][] = solicitudeSelectVal;

  /**
   * Opciones configurables para la solicitud.
   * @type {ProductoOpción[]}
   */
  opcionesSolicitud: ProductoOpción[] = [];

  /**
   * Sujeto para gestionar la destrucción de suscripciones.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Catálogo de bloques de países.
   * @type {Catalogo[]}
   */
  elementosDeBloque: Catalogo[] = [];

  /**
   * Catálogo de países organizados por bloque.
   * @type {Catalogo[]}
   */
  paisesPorBloque: Catalogo[] = [];

  /**
   * Catálogo de entidades federativas.
   * @type {Catalogo[]}
   */
  entidadFederativa: Catalogo[] = [];

  /**
   * Catálogo de representaciones federales.
   * @type {Catalogo[]}
   */
  representacionFederal: Catalogo[] = [];

  /**
   * Opciones de rangos de días para selección.
   * @type {string[]}
   */
  selectRangoDias: string[] = [];

  /**
   * Textos constantes utilizados en el componente.
   * @type {any}
   */
  TEXTOS = TEXTOS;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos
   * @param {HttpClient} http - Servicio para realizar peticiones HTTP
   * @param {Tramite130114Store} Tramite130114Store - Store para gestionar el estado del trámite
   * @param {Tramite130114Query} Tramite130114Query - Query para acceder al estado del trámite
   * @param {DiamanteBrutoService} DiamanteBrutoService - Servicio para operaciones específicas de diamantes brutos
   */
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private Tramite130114Store: Tramite130114Store,
    private Tramite130114Query: Tramite130114Query,
    private DiamanteBrutoService: DiamanteBrutoService
  ) {}

  /**
   * Inicializa el componente:
   * - Crea los formularios
   * - Configura suscripciones
   * - Carga datos iniciales
   * - Configura la tabla de partidas
   */
  ngOnInit(): void {
    this.inicializarFormularios();
    this.configuracionFormularioSuscripciones();
    this.opcionesDeBusqueda();
    this.formularioTotalCount();
    this.getEstablecimiento();
    this.calcularTotales();
    this.fetchEntidadFederativa();
    this.fetchRepresentacionFederal();
    this.listaDePaisesDisponibles();

    this.Tramite130114Query.mostrarTabla$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((mostrarTabla) => {
        this.mostrarTabla = mostrarTabla;
      });

    this.Tramite130114Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.partidasDelaMercanciaForm.patchValue({
            cantidadPartidasDeLaMercancia:
              seccionState.cantidadPartidasDeLaMercancia,
            valorPartidaUSDPartidasDeLaMercancia:
              seccionState.valorPartidaUSDPartidasDeLaMercancia,
            descripcionPartidasDeLaMercancia:
              seccionState.descripcionPartidasDeLaMercancia,
          });
        })
      )
      .subscribe();
  }

  /**
   * Inicializa todos los formularios reactivos del componente con sus validaciones correspondientes.
   */
  inicializarFormularios(): void {
    this.formDelTramite = this.fb.group({
      solicitud: ['', Validators.required],
      regimen: ['', Validators.required],
      clasificacion: ['', Validators.required],
    });

    this.mercanciaForm = this.fb.group({
      producto: ['Nuevo'],
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
          Validators.pattern(REG_X.SOLO_NUMEROS),
          Validators.min(1),
        ],
      ],
      valorFacturaUSD: [
        '',
        [
          Validators.required,
          Validators.pattern(REG_X.DECIMALES_DOS_LUGARES),
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
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(18),
        ],
      ],
      descripcionPartidasDeLaMercancia: [
        '',
        [Validators.required, Validators.maxLength(255)],
      ],
      valorPartidaUSDPartidasDeLaMercancia: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
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
   * Configura las suscripciones a los cambios en los formularios
   * para actualizar el store con los nuevos valores.
   */
  configuracionFormularioSuscripciones(): void {
    // Suscripción a cambios en los datos del trámite
    this.Tramite130114Query.solicitud$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((solicitud) => {
        this.formDelTramite.patchValue({ solicitud }, { emitEvent: false });
      });

    this.Tramite130114Query.regimen$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((regimen) => {
        this.formDelTramite.patchValue({ regimen }, { emitEvent: false });
      });

    this.Tramite130114Query.clasificacion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((clasificacion) => {
        this.formDelTramite.patchValue({ clasificacion }, { emitEvent: false });
      });

    // Suscripción a cambios en los datos de la mercancía
    this.Tramite130114Query.mercanciaState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.mercanciaForm.patchValue({
          producto: state.producto,
          descripcion: state.descripcion,
          fraccion: state.fraccion,
          cantidad: state.cantidad,
          valorFacturaUSD: state.valorPartidaUSD?.toString() || '',
          unidadMedida: state.unidadMedida,
        }, { emitEvent: false });
      });

    // Suscripción a cambios en los datos de país
    this.Tramite130114Query.selectSolicitud$
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

    // Suscripción a cambios en la representación federal
    this.Tramite130114Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.frmRepresentacionForm.patchValue({
            entidad: seccionState.entidad,
            representacion: seccionState.representacion,
          });
        })
      )
      .subscribe();

    // Actualización del store cuando cambian los formularios
    this.formDelTramite.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.Tramite130114Store.updateState({
          solicitud: value.solicitud,
          regimen: value.regimen,
          clasificacion: value.clasificacion,
        });
      });

    this.mercanciaForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.Tramite130114Store.updateState({
          producto: value.producto,
          descripcion: value.descripcion,
          fraccion: value.fraccion,
          cantidad: value.cantidad,
          valorPartidaUSD: parseFloat(value.valorFacturaUSD) || 0,
          unidadMedida: value.unidadMedida,
        });
      });
  }

  /**
   * Crea el formulario para mostrar los totales calculados.
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
  }

  /**
   * Configura los datos iniciales para la tabla de partidas.
   */
  getEstablecimiento(): void {
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader.map(
      (header, index) => ({
        encabezado: header,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        clave: (fila: any): string => fila?.tbodyData[index] ?? null,
        orden: index,
      })
    );
    this.tableBodyData = this.getEstablecimientoTableData?.tableBody;
  }
  /**
   * Calcula los totales de cantidad y valor en USD a partir de los datos de la tabla.
   */
  calcularTotales(): void {
    const CANTIDAD_TOTAL = this.tableBodyData.reduce(
      (sum: number, item: { tbodyData: string[] }) =>
        sum + parseFloat(item.tbodyData[0]),
      0
    );
    const VALOR_TOTALUSD = this.tableBodyData.reduce(
      (sum: number, item: { tbodyData: string[] }) =>
        sum + parseFloat(item.tbodyData[5]),
      0
    );
    this.formForTotalCount.controls['cantidadTotal'].setValue(CANTIDAD_TOTAL);
    this.formForTotalCount.controls['valorTotalUSD'].setValue(VALOR_TOTALUSD);
  }

  /**
   * Carga las opciones configurables para los formularios desde el servicio.
   */
  opcionesDeBusqueda(): void {
    this.DiamanteBrutoService.getSolicitudeOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.opcionesSolicitud = data.options;
          this.Tramite130114Store.updateState({
            solicitud: data.options[0]?.value || '',
            defaultSelect: data.defaultSelect || 'Inicial',
          });
        },
        error: (error) => console.error('Error loading solicitude options:', error),
      });

    this.DiamanteBrutoService.getProductoOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.productoOpciones = data.options;
          this.Tramite130114Store.updateState({
            producto: data.options[0]?.value || 'Nuevo',
            defaultProducto: data.options[0]?.value || 'Nuevo',
          });
        },
      });
  }

  /**
   * Maneja la selección de filas en la tabla de partidas.
   * @param {any[]} filasSeleccionadas - Array de filas seleccionadas
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manejarlaFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.filaSeleccionada = filasSeleccionadas.length ? filasSeleccionadas[0] : null;
    if (this.filaSeleccionada) {
      this.Tramite130114Store.storeTableValues(this.filaSeleccionada);
    }
  }

  /**
   * Valida el formulario de partidas y muestra la tabla si es válido.
   */
  validarYEnviarFormulario(): void {
    if (this.partidasDelaMercanciaForm.invalid) {
      this.partidasDelaMercanciaForm.markAllAsTouched();
    } else {
      this.mostrarTabla = true;
    }
  }

  /**
   * Navega para modificar una partida específica seleccionada en la tabla.
   */
  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
      this.Tramite130114Store.setMostrarTabla(true);
      this.Tramite130114Store.storeTableValues(this.filaSeleccionada);
    }
  }

  /**
   * Obtiene la lista de entidades federativas desde el servicio.
   */
  fetchEntidadFederativa(): void {
    this.DiamanteBrutoService.getEntidadFederativa()
      .subscribe((data) => {
        this.entidadFederativa = data;
      });
  }

  /**
   * Obtiene la lista de representaciones federales desde el servicio.
   */
  fetchRepresentacionFederal(): void {
    this.DiamanteBrutoService.getRepresentacionFederal()
      .subscribe((data) => {
        this.representacionFederal = data;
      });
  }

  /**
   * Obtiene la lista de países disponibles desde el servicio.
   */
  listaDePaisesDisponibles(): void {
    this.DiamanteBrutoService.getListaDePaisesDisponibles()
      .subscribe((data) => {
        this.elementosDeBloque = data;
      });
  }

  /**
   * Obtiene la lista de países pertenecientes a un bloque específico.
   * @param {number} _bloqueId - ID del bloque seleccionado
   */
  fetchPaisesPorBloque(_bloqueId: number): void {
    this.DiamanteBrutoService.getPaisesPorBloque(_bloqueId)
      .subscribe((data) => {
        this.paisesPorBloque = data;
        this.selectRangoDias = this.paisesPorBloque.map(
          (pais: Catalogo) => pais.descripcion
        );
      });
  }

  /**
   * Maneja el evento de cambio en la selección de bloque.
   * @param {number} bloqueId - ID del bloque seleccionado
   */
  enCambioDeBloque(bloqueId: number): void {
    this.fetchPaisesPorBloque(bloqueId);
  }

  /**
   * Actualiza el store con los valores del formulario según el evento recibido.
   * @param {Object} event - Objeto con información del evento
   * @param {FormGroup} event.form - Formulario que generó el evento
   * @param {string} event.campo - Nombre del campo que cambió
   * @param {string} event.metodoNombre - Nombre del método del store a llamar
   */
  setValoresStore(event: {
    form: FormGroup;
    campo: string;
    metodoNombre: string;
  }): void {
    const VALOR = event.form.get(event.campo)?.value;
    switch (event.metodoNombre) {
      case 'updateSolicitud':
        this.Tramite130114Store.updateSolicitud(VALOR);
        break;
      case 'setDescripcionPartidasDeLaMercancia':
        this.Tramite130114Store.setDescripcionPartidasDeLaMercancia(VALOR);
        break;
      case 'setCantidadPartidasDeLaMercancia':
        this.Tramite130114Store.setCantidadPartidasDeLaMercancia(VALOR);
        break;
      case 'setValorPartidaUSDPartidasDeLaMercancia':
        this.Tramite130114Store.setValorPartidaUSDPartidasDeLaMercancia(VALOR);
        break;
      case 'setregimen':
        this.Tramite130114Store.setregimen(VALOR);
        break;
      case 'setclasificacion':
        this.Tramite130114Store.setclasificacion(VALOR);
        break;
      case 'setProducto':
        this.Tramite130114Store.setProducto(VALOR); // Ensure this is called correctly
        break;
      case 'setDescripcion':
        this.Tramite130114Store.setDescripcion(VALOR);
        break;
      case 'setCantidad':
        this.Tramite130114Store.setCantidad(VALOR);
        break;
      case 'setValorPartidaUSD':
        this.Tramite130114Store.setValorPartidaUSD(parseFloat(VALOR) || 0);
        break;
      case 'setUnidadMedida':
        this.Tramite130114Store.setUnidadMedida(VALOR);
        break;
      case 'setBloque':
        this.Tramite130114Store.setBloque(VALOR);
        break;
      case 'setUsoEspecifico':
        this.Tramite130114Store.setUsoEspecifico(VALOR);
        break;
      case 'setJustificacionImportacionExportacion':
        this.Tramite130114Store.setJustificacionImportacionExportacion(VALOR);
        break;
      case 'setObservaciones':
        this.Tramite130114Store.setObservaciones(VALOR);
        break;
      case 'setEntidad':
        this.Tramite130114Store.setEntidad(VALOR);
        break;
      case 'setRepresentacion':
        this.Tramite130114Store.setRepresentacion(VALOR);
        break;
      default:
        console.error(`Método ${event.metodoNombre} no existe en Tramite130114Store`);
    }
  }

  /**
   * Limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}