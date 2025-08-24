import { Catalogo, ConsultaioQuery, REG_X } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import {
  Tramite130114State,
  Tramite130114Store,
} from '../../../estados/tramites/tramite130114.store';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { DiamanteBrutoService } from '../../130114/services/diamante-bruto.service';
import { HttpClient } from '@angular/common/http';
import { PARTIDASDELAMERCANCIA_TABLA } from '../../../shared/constantes/partidas-de-la-mercancia.enum';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130114/partidas-de-la.json';
import { ProductoOpción } from '../../../shared/constantes/vehiculos-adaptados.enum';
import { TEXTOS } from '../../../shared/constantes/representacion-federal.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Tramite130114Query } from '../../../estados/queries/tramite130114.query';
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
  tableHeaderData: ConfiguracionColumna<PartidasDeLaMercanciaModelo>[] =
    PARTIDASDELAMERCANCIA_TABLA;

  /**
   * Datos para el cuerpo de la tabla de partidas.
   * @type {{ tbodyData: string[] }[]}
   */
    tableBodyData: PartidasDeLaMercanciaModelo[] = [];

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
  filaSeleccionada: PartidasDeLaMercanciaModelo[] = [];

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
     * Indica si el formulario está en modo solo lectura.
     * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false;
   /**
    * Estado interno de la sección actual del trámite 130110.
    * Utilizado para gestionar y almacenar la información relacionada con esta sección.
    * Propiedad privada.
   */
    private seccionState!: Tramite130114State;
    /**
 * **Subject para manejar la destrucción de suscripciones**
 *
 * - Se utiliza para cancelar las suscripciones activas cuando el componente o servicio es destruido.
 * - Evita fugas de memoria al asegurarse de que las suscripciones se cancelen correctamente.
 * - Se emite un valor en `ngOnDestroy` y luego se completa.
 *
 * @private
 */
  private destroy$ = new Subject<void>();

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
    private DiamanteBrutoService: DiamanteBrutoService,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.inicializarFormularios();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState)=>{
          this.esFormularioSoloLectura = seccionState.readonly; 
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el componente:
   * - Crea los formularios
   * - Configura suscripciones
   * - Carga datos iniciales
   * - Configura la tabla de partidas
   */
  ngOnInit(): void {
    this.configuracionFormularioSuscripciones();
    this.opcionesDeBusqueda();
    this.formularioTotalCount();
    this.obtenerTablaDatos();
    this.fetchEntidadFederativa();
    this.fetchRepresentacionFederal();
    this.listaDePaisesDisponibles();

    this.Tramite130114Query.mostrarTabla$
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
      this.Tramite130114Query.selectSolicitud$?.pipe(takeUntil(this.destroyed$))
      .subscribe((data: Tramite130114State) => {
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
   * Inicializa todos los formularios reactivos del componente con sus validaciones correspondientes.
   */
  inicializarFormularios(): void {
    this.suscribirseAEstadoDeSolicitud();
    this.formDelTramite = this.fb.group({
      solicitud: ['', Validators.required],
      regimen: [{value:this.seccionState?.regimen,disabled: true}, Validators.required],
      clasificacion: [{value:this.seccionState?.clasificacion,disabled: true}, Validators.required],
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
        this.formDelTramite.patchValue({ solicitud:seccionState.solicitud,regimen:seccionState.regimen,
          clasificacion:seccionState.clasificacion
         }, { emitEvent: false });

         this.mercanciaForm.patchValue({
          producto: seccionState.producto,
          descripcion: seccionState.descripcion,
          fraccion: seccionState.fraccion,
          cantidad: seccionState.cantidad,
          valorFacturaUSD: seccionState.valorFacturaUSD,
          unidadMedida: seccionState.unidadMedida,
        }, { emitEvent: false });

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
   * Crea el formulario para mostrar los totales calculados.
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
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
          this.Tramite130114Store.actualizarEstado({
            solicitud: data.options[0]?.value || '',
            defaultSelect: data.defaultSelect || 'Inicial',
          });
        },
        error: (error) =>
          console.error('Error loading solicitude options:', error),
      });

    this.DiamanteBrutoService.getProductoOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.productoOpciones = data.options;
          this.Tramite130114Store.actualizarEstado({
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
  manejarlaFilaSeleccionada(filasSeleccionadas: PartidasDeLaMercanciaModelo[]): void {
    this.filaSeleccionada = filasSeleccionadas.length
      ? filasSeleccionadas
      : [];
    if (this.filaSeleccionada) {
      this.Tramite130114Store.actualizarEstado({
        filaSeleccionada: this.filaSeleccionada,
      });
    }
  }

  /**
 * Método para obtener los datos de la tabla dinámica.
 * Este método realiza una solicitud al servicio `ImportacionDeVehiculosService` para obtener los datos
 * de la tabla y actualiza las propiedades relacionadas con la tabla dinámica.
 * 
 * - Actualiza `tableBodyData` con los datos obtenidos.
 * - Asigna valores a las propiedades `cantidad` y `descripcion` del primer elemento de la tabla.
 * - Actualiza el formulario `formForTotalCount` con los valores totales de cantidad y valor en USD.
 * 
 */
  obtenerTablaDatos(): void {
    this.DiamanteBrutoService.getTablaDatos()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
      this.tableBodyData = data;
      this.formForTotalCount.patchValue({
          cantidadTotal: data[0].cantidad,
          valorTotalUSD: data[0].totalUSD,
      });
    });
}
  /**
   * Valida el formulario de partidas y muestra la tabla si es válido.
   */
  validarYEnviarFormulario(): void {
    if (this.partidasDelaMercanciaForm.invalid) {
      this.partidasDelaMercanciaForm.markAllAsTouched();
    } else {
      this.mostrarTabla = true;
      this.Tramite130114Store.actualizarEstado({mostrarTabla:true});

    }
  }

  /**
   * Navega para modificar una partida específica seleccionada en la tabla.
   */
  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
      this.Tramite130114Store.actualizarEstado({ mostrarTabla: true });
      this.Tramite130114Store.actualizarEstado({
        filaSeleccionada: this.filaSeleccionada,
      });
    }
  }

  /**
   * Obtiene la lista de entidades federativas desde el servicio.
   */
  fetchEntidadFederativa(): void {
    this.DiamanteBrutoService.getEntidadFederativa().pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.entidadFederativa = data;
      });
  }

  /**
   * Obtiene la lista de representaciones federales desde el servicio.
   */
  fetchRepresentacionFederal(): void {
    this.DiamanteBrutoService.getRepresentacionFederal().pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.representacionFederal = data;
      });
  }

  /**
   * Obtiene la lista de países disponibles desde el servicio.
   */
  listaDePaisesDisponibles(): void {
    this.DiamanteBrutoService.getListaDePaisesDisponibles().pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.elementosDeBloque = data;
      });
  }

  /**
   * Obtiene la lista de países pertenecientes a un bloque específico.
   * @param {number} _bloqueId - ID del bloque seleccionado
   */
  fetchPaisesPorBloque(_bloqueId: number): void {
    this.DiamanteBrutoService.getPaisesPorBloque(_bloqueId).pipe(takeUntil(this.destroyed$))
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
   * @description Actualiza el almacén con nuevos valores basados en eventos de formulario.
   * @param event Evento que incluye el formulario, el campo y el método a ejecutar.
   */
    setValoresStore($event: { form: FormGroup; campo: string }): void {
      const VALOR = $event.form.get($event.campo)?.value;
      this.Tramite130114Store.actualizarEstado({ [$event.campo]: VALOR });
      if($event.campo === 'fraccion'){
        this.Tramite130114Store.actualizarEstado({'unidadMedida': '1'});
      }
    }
/**
 * Determina si el botón "Modificar" debe estar deshabilitado.
 * Este método verifica si no hay filas seleccionadas en la tabla dinámica.
 * 
 */
  disabledModificar(): boolean {
  let disabled = false;
    if (this.filaSeleccionada.length === 0) {
      disabled = true;
  }
  return disabled;
}
  /**
   * Limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}