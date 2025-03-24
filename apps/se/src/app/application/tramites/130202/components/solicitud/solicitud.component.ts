import { Catalogo, REG_X } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { ExportacionMineralesDeHierroService } from '../../services/exportacion-minerales-de-hierro.service';
import { HttpClient } from '@angular/common/http';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130202/partidas-de-la.json';
import { ProductoOption } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { TEXTOS } from '../../../130202/enums/representacion-federal.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Tramite130202Query } from '../../estados/queries/tramite130202.query';
import { Tramite130202Store } from '../../estados/tramites/tramites130202.store';
import fractionValues from '@libs/shared/theme/assets/json/130202/fraccion_arancelaria.json';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130202/solicitud-select.json';
import unidadOptions from '@libs/shared/theme/assets/json/130202/unidad_da.json';

/**
 * @description Componente para gestionar la solicitud de mercancías.
 * Contiene formularios reactivos y opciones configurables relacionadas con el trámite.
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * form
   * Formulario reactivo principal para capturar los datos de la solicitud.
   */
  partidasDelaMercanciaForm!: FormGroup;

  /**
   * @description Formulario reactivo para los datos del trámite.
   */
  formDelTramite!: FormGroup;

  /**
   * @description Formulario reactivo para los detalles de la mercancía.
   */
  mercanciaForm!: FormGroup;

  /**
   * formForTotalCount
   * Formulario reactivo para capturar los totales de las partidas.
   */
  formForTotalCount!: FormGroup;
  // Add compodoc
  paisForm!: FormGroup;
  frmRepresentacionForm!: FormGroup;

  /**
   * tableHeaderData
   * Configuración de las columnas de la tabla dinámica.
   */
  tableHeaderData: ConfiguracionColumna<string>[] = [];

  /**
   * tableBodyData
   * Datos que se mostrarán en el cuerpo de la tabla dinámica.
   */
  tableBodyData: { tbodyData: string[] }[] = [];

  /**
   * mostrarTabla
   * Bandera para mostrar u ocultar la tabla dinámica.
   */
  mostrarTabla = false;

  /**
   * CHECKBOX
   * Tipo de selección de la tabla dinámica (checkbox).
   */
  CHECKBOX = TablaSeleccion.CHECKBOX;

  /**
   * getEstablecimientoTableData
   * Datos de configuración de la tabla obtenidos de un archivo JSON.
   */
  public getEstablecimientoTableData = PartidasdelaTable;

  /**
   * filaSeleccionada
   * Fila seleccionada en la tabla dinámica.
   */
  filaSeleccionada: any = null;

  /**
   * @description Opciones para el campo "producto".
   */
  productoOptions: ProductoOption[] = [];
  /**
   * @description Catálogo con valores de fracción arancelaria.
   */
  fraccionCatalog: Catalogo[] = fractionValues;

  /**
   * @description Catálogo con opciones de unidad de medida.
   */
  unidadCatalog: Catalogo[] = unidadOptions;
  /**
   * @description Campos de entrada configurables para detalles adicionales.
   */

  detosInputFields = [
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
      controlName: 'classification',
    },
  ];
  /**
   * @description Matriz de catálogos adicionales para el formulario.
   */
  catalogosArray: Catalogo[][] = solicitudeSelectVal;
  /**
   * @description Opciones de solicitud configurables.
   */
  solicitudeOptions: ProductoOption[] = [];

  /**
   * @description Sujeto para gestionar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();
  /**
   * @description Arreglo que almacena un catálogo de países.
   * @type {Catalogo[]}
   */
  paisProc: Catalogo[] = [];
  /**
   * @description Arreglo que contiene un catálogo de países organizados por bloque.
   * @type {Catalogo[]}
   */
  paisesPorBloque: Catalogo[] = [];
  /**
   * @description Arreglo que guarda un catálogo de entidades federativas.
   * @type {Catalogo[]}
   */
  entidadFederativa: Catalogo[] = [];
  /**
   * @description Arreglo que almacena un catálogo de representaciones federales.
   * @type {Catalogo[]}
   */
  representacionFederal: Catalogo[] = [];
  /**
   * @description Arreglo de cadenas que representa las opciones seleccionables de rangos de días.
   * @type {string[]}
   */
  selectRangoDias: string[] = [];
  /**
   * @description Objeto o constante que contiene los textos utilizados en la aplicación.
   * @type {any}
   */
  TEXTOS = TEXTOS;

  /**
   * @description Constructor que inyecta dependencias necesarias.
   * @param fb Constructor para formularios reactivos.
   * @param http Cliente HTTP para solicitudes de datos.
   * @param tramite130202Store Almacén de estado del trámite.
   * @param tramite130202Query Consultas relacionadas con el trámite.
   */
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private tramite130202Store: Tramite130202Store,
    private tramite130202Query: Tramite130202Query,
    private exportacionMineralesDeHierroService: ExportacionMineralesDeHierroService
  ) {
    //constructor
  }
  /**
   * @description Ciclo de vida de Angular: inicializa formularios, suscripciones y opciones al cargar el componente.
   */
  ngOnInit(): void {
    this.initializeForms();
    this.setupFormSubscriptions();
    this.fetchOptions();
    this.formularioTotalCount();
    this.getEstablecimiento();
    this.calculateTotals();
    this.fetchEntidadFederativa();
    this.fetchRepresentacionFederal();
    this.listaDePaisesDisponibles();

    this.tramite130202Query.mostrarTabla$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((mostrarTabla) => {
        this.mostrarTabla = mostrarTabla;
      });

    this.tramite130202Query.selectSolicitud$
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
   * @description Inicializa los formularios reactivos `formDelTramite` y `mercanciaForm`.
   */
  initializeForms(): void {
    this.formDelTramite = this.fb.group({
      solicitud: ['', Validators.required],
      regimen: ['', Validators.required],
      classification: ['', Validators.required],
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
   * @description Configura las suscripciones para actualizar formularios y almacenar estados.
   */
  setupFormSubscriptions(): void {
    this.tramite130202Query.solicitud$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((solicitud) => {
        this.formDelTramite.patchValue({ solicitud }, { emitEvent: false });
      });

    this.tramite130202Query.regimen$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((regimen) => {
        this.formDelTramite.patchValue({ regimen }, { emitEvent: false });
      });

    this.tramite130202Query.classification$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((classification) => {
        this.formDelTramite.patchValue(
          { classification },
          { emitEvent: false }
        );
      });
    this.tramite130202Query.mercanciaState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.mercanciaForm.patchValue(
          {
            producto: state.producto,
            descripcion: state.descripcion,
            fraccion: state.fraccion,
            cantidad: state.cantidad,
            valorFacturaUSD: state.valorPartidaUSD
              ? state.valorPartidaUSD.toString()
              : '',
            unidadMedida: state.unidadMedida,
          },
          { emitEvent: false }
        );
      });

    this.tramite130202Query.selectSolicitud$
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
    this.tramite130202Query.selectSolicitud$
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

    this.formDelTramite.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.tramite130202Store.updateState({
          solicitud: value.solicitud,
          regimen: value.regimen,
          classification: value.classification,
        });
      });

    this.mercanciaForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.tramite130202Store.updateState({
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
  getEstablecimiento(): void {
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader.map(
      (header, index) => ({
        encabezado: header,
        clave: (fila: any): string => fila.tbodyData[index],
        orden: index,
      })
    );
    this.tableBodyData = this.getEstablecimientoTableData.tableBody;
  }

  /**
   * calculateTotals
   * Calcula los totales de cantidad y valor en USD a partir de los datos de la tabla.
   */
  calculateTotals(): void {
    const CANTITAD_TOTAL = this.tableBodyData.reduce(
      (sum: number, item: { tbodyData: string[] }) =>
        sum + parseFloat(item.tbodyData[0]),
      0
    );
    const VALOR_TOTALUSD = this.tableBodyData.reduce(
      (sum: number, item: { tbodyData: string[] }) =>
        sum + parseFloat(item.tbodyData[5]),
      0
    );
    // eslint-disable-next-line dot-notation
    this.formForTotalCount.controls['cantidadTotal'].setValue(CANTITAD_TOTAL);
    // eslint-disable-next-line dot-notation
    this.formForTotalCount.controls['valorTotalUSD'].setValue(VALOR_TOTALUSD);
  }

  /**
   * @description Solicita opciones configurables para los formularios desde archivos JSON.
   */
  fetchOptions(): void {
    this.exportacionMineralesDeHierroService
      .getSolicitudeOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.solicitudeOptions = data.options;
          this.tramite130202Store.updateState({
            solicitud: data.options[0]?.value || '',
            defaultSelect: data.defaultSelect || 'Inicial',
          });
        },
        error: (error) =>
          console.error('Error loading solicitude options:', error),
      });

    this.exportacionMineralesDeHierroService
      .getProductoOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.productoOptions = data.options;
          this.tramite130202Store.updateState({
            producto: data.options[0]?.value || 'Nuevo',
            defaultProducto: data.options[0]?.value || 'Nuevo',
          });
        },
        error: (error) =>
          console.error('Error loading producto options:', error),
      });
  }
  /**
   * handleFilaSeleccionada
   * Maneja la selección de filas en la tabla dinámica y actualiza el estado global.
   * Lista de filas seleccionadas.
   */
  handleFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.filaSeleccionada = filasSeleccionadas.length
      ? filasSeleccionadas[0]
      : null;
    if (this.filaSeleccionada) {
      this.tramite130202Store.storeTableValues(this.filaSeleccionada);
    }
  }

  /**
   * validarYEnviarFormulario
   * Valida el formulario y muestra la tabla dinámica si es válido.
   */
  validarYEnviarFormulario(): void {
    this.mostrarTabla = true;
    if (this.partidasDelaMercanciaForm.invalid) {
      this.partidasDelaMercanciaForm.markAllAsTouched();
    } else {
      this.mostrarTabla = true;
    }
  }

  /**
   * navegarParaModificarPartida
   * Navega para modificar una partida específica y actualiza el estado global.
   */
  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
      this.tramite130202Store.setMostrarTabla(true);
      this.tramite130202Store.storeTableValues(this.filaSeleccionada);
    }
  }

  fetchEntidadFederativa(): void {
    this.exportacionMineralesDeHierroService
      .getEntidadFederativa()
      .subscribe((data) => {
        this.entidadFederativa = data;
      });
  }

  fetchRepresentacionFederal(): void {
    this.exportacionMineralesDeHierroService
      .getRepresentacionFederal()
      .subscribe((data) => {
        this.representacionFederal = data;
      });
  }
  listaDePaisesDisponibles(): void {
    this.exportacionMineralesDeHierroService
      .getListaDePaisesDisponibles()
      .subscribe((data) => {
        this.paisProc = data;
      });
  }
  fetchPaisesPorBloque(_bloqueId: number): void {
    this.exportacionMineralesDeHierroService
      .getPaisesPorBloque(_bloqueId)
      .subscribe((data) => {
        this.paisesPorBloque = data;
        this.selectRangoDias = this.paisesPorBloque.map(
          (pais: Catalogo) => pais.descripcion
        );
      });
  }
  enCambioDeBloque(bloqueId: number): void {
    this.fetchPaisesPorBloque(bloqueId);
  }

  /**
   * @description Actualiza el almacén con nuevos valores basados en eventos de formulario.
   * @param event Evento que incluye el formulario, el campo y el método a ejecutar.
   */
  setValoresStore(event: {
    form: FormGroup;
    campo: string;
    metodoNombre: string;
  }): void {
    const VALOR = event.form.get(event.campo)?.value;
    switch (event.metodoNombre) {
      case 'updateSolicitud':
        this.tramite130202Store.updateSolicitud(VALOR);
        break;
      case 'setDescripcionPartidasDeLaMercancia':
        this.tramite130202Store.setDescripcionPartidasDeLaMercancia(VALOR);
        break;
      case 'setCantidadPartidasDeLaMercancia':
        this.tramite130202Store.setCantidadPartidasDeLaMercancia(VALOR);
        break;
      case 'setValorPartidaUSDPartidasDeLaMercancia':
        this.tramite130202Store.setValorPartidaUSDPartidasDeLaMercancia(VALOR);
        break;
      case 'setregimen':
        this.tramite130202Store.setregimen(VALOR);
        break;
      case 'setclasificacion':
        this.tramite130202Store.setclasificacion(VALOR);
        break;

      case 'setProducto':
        this.tramite130202Store.setProducto(VALOR);
        break;
      case 'setDescripcion':
        this.tramite130202Store.setDescripcion(VALOR);
        break;
      case 'setCantidad':
        this.tramite130202Store.setCantidad(VALOR);
        break;
      case 'setValorPartidaUSD':
        this.tramite130202Store.setValorPartidaUSD(parseFloat(VALOR) || 0);
        break;
      case 'setUnidadMedida':
        this.tramite130202Store.setUnidadMedida(VALOR);
        break;
      default:
        console.error(
          `Método ${event.metodoNombre} no existe en Tramite130202Store`
        );
    }
  }

  /**
   * @description Ciclo de vida de Angular: limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
