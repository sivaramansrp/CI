import { Catalogo, ConsultaioQuery } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { REGEX_NUMERO_DECIMAL_ENTERO } from '@ng-mf/data-access-user';
import { REG_X } from '@ng-mf/data-access-user';

import { REGEX_PATRON_DECIMAL_2} from '@ng-mf/data-access-user';
import { REGEX_SOLO_NUMEROS } from '@ng-mf/data-access-user';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite130113State, Tramite130113Store } from '../../estados/tramites/tramites130113.store';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { ImportacionEquipoAnticontaminanteService } from '../../services/importacion-equipo-anticontaminante-.service';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130113/partidas-de-la.json';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { TEXTOS } from '../../../../shared/constantes/representacion-federal.enum';
import { Tramite130113Query } from '../../estados/queries/tramite130113.query';

import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import fractionValues from '@libs/shared/theme/assets/json/130113/fraccion_arancelaria.json';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130113/solicitud-select.json';
import unidadOptions from '@libs/shared/theme/assets/json/130113/unidad_da.json';

import { PARTIDASDELAMERCANCIA_TABLA } from '../../../../shared/constantes/partidas-de-la-mercancia.enum';



/**
 * Componente para gestionar la solicitud de mercancías.
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
   *  Formulario reactivo para los datos del trámite.
   */
  formDelTramite!: FormGroup;

  /**
   *  Formulario reactivo para los detalles de la mercancía.
   */
  mercanciaForm!: FormGroup;

  /**
   * formForTotalCount
   * Formulario reactivo para capturar los totales de las partidas.
   */
  formForTotalCount!: FormGroup;

  /**
   * Formulario reactivo para la selección de países.
   */
  paisForm!: FormGroup;

  /**
   * Formulario reactivo para la representación.
   */
  frmRepresentacionForm!: FormGroup;

  /**
   * tableHeaderData
   * Configuración de las columnas de la tabla dinámica.
   */
   tableHeaderData: ConfiguracionColumna<PartidasDeLaMercanciaModelo>[] = PARTIDASDELAMERCANCIA_TABLA;

  /**
   * tableBodyData
   * Datos que se mostrarán en el cuerpo de la tabla dinámica.
   */
  tableBodyData: PartidasDeLaMercanciaModelo[] = [];

  /**
   * mostrarTabla
   * Bandera para mostrar u ocultar la tabla dinámica.
   */
  mostrarTabla = false;

  /**
   * CHECKBOX
   * Tipo de selección de la tabla dinámica (checkbox).
   */
  checkBox = TablaSeleccion.CHECKBOX;

  /**
   * getEstablecimientoTableData
   * Datos de configuración de la tabla obtenidos de un archivo JSON.
   */
  public getEstablecimientoTableData = PartidasdelaTable;

  /**
   * filaSeleccionada
   * Fila seleccionada en la tabla dinámica.
   */
  filaSeleccionada: PartidasDeLaMercanciaModelo[] = [];

  /**
   *  Opciones para el campo "producto".
   */
  productoOpciones: ProductoOpción[] = [];

  /**
   *  Opciones para el campo "fraccionDescription".
   */
  fraccionDescription: Catalogo[] = [];

  /**
   *  Catálogo con valores de fracción arancelaria.
   */

  fraccionCatalogo: Catalogo[] = fractionValues;

  /**
   *  Catálogo con opciones de unidad de medida.
   */
  unidadCatalogo: Catalogo[] = unidadOptions;

  /**
   *  Campos de entrada configurables para detalles adicionales.
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
        map((seccionState)=>{
          this.esFormularioSoloLectura = seccionState.readonly; 
          
        })
      )
      .subscribe()
  }
  /**
   *  Ciclo de vida de Angular: inicializa formularios, suscripciones y opciones al cargar el componente.
   */
  ngOnInit(): void {
    this.configuracionFormularioSuscripciones();
    this.opcionesDeBusqueda();
    this.formularioTotalCount();
    this.obtenerTablaDatos()
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
      this.tramite130113Query.selectSolicitud$?.pipe(takeUntil(this.destroyed$))
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
      fraccionDescripcionPartidasDeLaMercancia: [
        ''
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
            cantidadPartidasDeLaMercancia: seccionState.cantidadPartidasDeLaMercancia,
            fraccionTigiePartidasDeLaMercancia: seccionState.fraccionTigiePartidasDeLaMercancia,
            fraccionDescripcionPartidasDeLaMercancia: seccionState.fraccionDescripcionPartidasDeLaMercancia,
            valorPartidaUSDPartidasDeLaMercancia: seccionState.valorPartidaUSDPartidasDeLaMercancia,
            descripcionPartidasDeLaMercancia: seccionState.descripcionPartidasDeLaMercancia,
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
            justificacionImportacionExportacion: seccionState.justificacionImportacionExportacion,
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
    this.importacionEquipoAnticontaminanteService.getTablaDatos().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.tableBodyData = data;
      this.formForTotalCount.patchValue({
        cantidadTotal:data[0].cantidad,
        valorTotalUSD:data[0].totalUSD
      });
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
  manejarlaFilaSeleccionada(filasSeleccionadas:PartidasDeLaMercanciaModelo[]): void {
    this.filaSeleccionada = filasSeleccionadas.length
      ? [filasSeleccionadas[0]]
      : [];
    if (this.filaSeleccionada) {
      this.tramite130113Store.actualizarEstado({filaSeleccionada:this.filaSeleccionada});
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
      this.tramite130113Store.actualizarEstado({mostrarTabla:true});
    }
  }
 
  /**
   * navegarParaModificarPartida
   * Navega para modificar una partida específica y actualiza el estado global.
   */
  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
      this.tramite130113Store.actualizarEstado({mostrarTabla:true});
      this.tramite130113Store.actualizarEstado({filaSeleccionada:this.filaSeleccionada});
    }
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
      if($event.campo === 'fraccion'){
        this.tramite130113Store.actualizarEstado({'unidadMedida': '1'});
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
