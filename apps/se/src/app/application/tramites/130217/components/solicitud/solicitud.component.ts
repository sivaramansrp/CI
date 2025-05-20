// Importación de módulos, servicios, constantes y datos JSON necesarios para el funcionamiento del componente
// Este conjunto de importaciones cubre funcionalidades relacionadas con la gestión de formularios, validaciones,
// permisos, configuraciones, así como la obtención y manipulación de datos externos para la aplicación.

import { Catalogo, REGEX_VALORES_NUMERICOS, REG_X } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { ControlPermisosPreviosExportacionService } from '../../services/control-permisos-previos-exportacion.service';
import { HttpClient } from '@angular/common/http';
import { PARTIDASDELAMERCANCIA_TABLA } from '../../../../shared/constantes/partidas-de-la-mercancia.enum';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130217/partidas-de-la.json';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { TEXTOS } from '../../../../shared/constantes/representacion-federal.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Tramite130217Query } from '../../../../estados/queries/tramite130217.query';
import { Tramite130217Store } from '../../../../estados/tramites/tramite130217.store';
import fractionValues from '@libs/shared/theme/assets/json/130217/fraccion_arancelaria.json';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130217/solicitud-select.json';
import unidadOptions from '@libs/shared/theme/assets/json/130217/unidad_da.json';

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
   * Formulario reactivo principal para capturar los datos de la solicitud.
   */
  partidasDelaMercanciaForm!: FormGroup;

  /**
   * Formulario reactivo para los datos del trámite.
   */
  formDelTramite!: FormGroup;

  /**
   * Formulario reactivo para los detalles de la mercancía.
   */
  mercanciaForm!: FormGroup;

  /**
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
   * Configuración de las columnas de la tabla dinámica.
   */
  tableHeaderData: ConfiguracionColumna<PartidasDeLaMercanciaModelo>[] = PARTIDASDELAMERCANCIA_TABLA;

  /**
   * Datos para el cuerpo de la tabla de partidas.
   * @type {{ tbodyData: string[] }[]}
   */
  tableBodyData: PartidasDeLaMercanciaModelo[] = [];

  /**
   * Bandera para mostrar u ocultar la tabla dinámica.
   */
  mostrarTabla = false;

  /**
   * Tipo de selección de la tabla dinámica (checkbox).
   */
  checkBox = TablaSeleccion.CHECKBOX;

  /**
   * Datos de configuración de la tabla obtenidos de un archivo JSON.
   */
  public getEstablecimientoTableData = PartidasdelaTable;

  /**
   * Fila seleccionada en la tabla dinámica.
   */
  filaSeleccionada: PartidasDeLaMercanciaModelo[] = [];

  /**
   * Opciones para el campo "producto".
   */
  productoOpciones: ProductoOpción[] = [];

  /**
   * Catálogo con valores de fracción arancelaria.
   */
  fraccionCatalogo: Catalogo[] = fractionValues;

  /**
   * Catálogo con opciones de unidad de medida.
   */
  unidadCatalogo: Catalogo[] = unidadOptions;

  /**
   * Campos de entrada configurables para detalles adicionales.
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
   * Matriz de catálogos adicionales para el formulario.
   */
  catalogosArray: Catalogo[][] = solicitudeSelectVal;

  /**
   * Opciones de solicitud configurables.
   */
  opcionesSolicitud: ProductoOpción[] = [];

  /**
   * Sujeto para gestionar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Arreglo que almacena un catálogo de elementosDeBloque.
   */
  elementosDeBloque: Catalogo[] = [];

  /**
   * Arreglo que contiene un catálogo de países organizados por bloque.
   */
  paisesPorBloque: Catalogo[] = [];

  /**
   * Arreglo que guarda un catálogo de entidades federativas.
   */
  entidadFederativa: Catalogo[] = [];

  /**
   * Arreglo que almacena un catálogo de representaciones federales.
   */
  representacionFederal: Catalogo[] = [];

  /**
   * Arreglo de cadenas que representa las opciones seleccionables de rangos de días.
   */
  selectRangoDias: string[] = [];

  /**
   * Objeto que contiene los textos utilizados en la aplicación.
   */
  TEXTOS = TEXTOS;

  /**
   * Constructor del componente.
   * @param fb Servicio para la creación de formularios reactivos.
   * @param http Servicio para realizar solicitudes HTTP.
   * @param tramite130217Store Store para gestionar el estado del trámite 130217.
   * @param tramite130217Query Query para consultar el estado del trámite 130217.
   * @param ControlPermisosPreviosExportacionService Servicio para la exportación de minerales de hierro.
   */
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private tramite130217Store: Tramite130217Store,
    private tramite130217Query: Tramite130217Query,
    private ControlPermisosPreviosExportacionService: ControlPermisosPreviosExportacionService
  ) {
    //constructor
  }

  /**
   * Ciclo de vida de Angular: inicializa formularios, suscripciones y opciones al cargar el componente.
   */
  ngOnInit(): void {
    this.inicializarFormularios();
    this.configuracionFormularioSuscripciones();
    this.opcionesDeBusqueda();
    this.formularioTotalCount();
    this.fetchEntidadFederativa();
    this.fetchRepresentacionFederal();
    this.listaDePaisesDisponibles();
    this.obtenerTablaDatos();

    this.tramite130217Query.mostrarTabla$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((mostrarTabla) => {
        this.mostrarTabla = mostrarTabla;
      });

    
      
  }

  /**
   * Inicializa los formularios reactivos del componente.
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
          Validators.pattern(REG_X.SOLO_NUMEROS),
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
          Validators.pattern(REGEX_VALORES_NUMERICOS),
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
   * Configura las suscripciones para actualizar formularios y almacenar estados.
   */
  configuracionFormularioSuscripciones(): void {
    this.tramite130217Query.selectSolicitud$
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
   * Crea el formulario reactivo para capturar los totales de las partidas.
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
  }


  /**
   * Solicita opciones configurables para los formularios desde archivos JSON.
   */
  opcionesDeBusqueda(): void {
    this.ControlPermisosPreviosExportacionService
      .getSolicitudeOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.opcionesSolicitud = data.options;
          this.tramite130217Store.actualizarEstado({
            solicitud: data.options[0]?.value || '',
            defaultSelect: data.defaultSelect || 'Inicial',
          });
        },
        error: (error) =>
          console.error('Error loading solicitude options:', error),
      });

    this.ControlPermisosPreviosExportacionService
      .getProductoOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.productoOpciones = data.options;
          this.tramite130217Store.actualizarEstado({
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
      this.tramite130217Store.storeTableValues(this.filaSeleccionada);
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
    this.ControlPermisosPreviosExportacionService.getTablaDatos().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.tableBodyData = data;
      this.formForTotalCount.patchValue({
        cantidadTotal:data[0].cantidad,
        valorTotalUSD:data[0].totalUSD
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
    this.tramite130217Store.setMostrarTabla(true);

  }
}

  /**
   * Navega para modificar una partida específica y actualiza el estado global.
   */
  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
      this.tramite130217Store.setMostrarTabla(true);
      this.tramite130217Store.storeTableValues(this.filaSeleccionada);
    }
  }

  /**
   * Obtiene la lista de entidades federativas.
   */
  fetchEntidadFederativa(): void {
    this.ControlPermisosPreviosExportacionService
      .getEntidadFederativa()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.entidadFederativa = data;
      });
  }

  /**
   * Obtiene la lista de representaciones federales.
   */
  fetchRepresentacionFederal(): void {
    this.ControlPermisosPreviosExportacionService
      .getRepresentacionFederal()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.representacionFederal = data;
      });
  }

  /**
   * Obtiene la lista de países disponibles.
   */
  listaDePaisesDisponibles(): void {
    this.ControlPermisosPreviosExportacionService
      .getListaDePaisesDisponibles()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.elementosDeBloque = data;
      });
  }

  /**
   * Obtiene la lista de países por bloque.
   * @param _bloqueId Identificador del bloque.
   */
  fetchPaisesPorBloque(_bloqueId: number): void {
    this.ControlPermisosPreviosExportacionService
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
   * @param bloqueId Identificador del bloque seleccionado.
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
    this.tramite130217Store.actualizarEstado({ [$event.campo]: VALOR });
    if($event.campo === 'fraccion'){
      this.tramite130217Store.actualizarEstado({'unidadMedida': '1'});
    }
  }
  /**
 * Determina si el botón "Modificar" debe estar deshabilitado.
 * Este método verifica si no hay filas seleccionadas en la tabla dinámica.
 * 
 */
disabledModificar() : boolean {
  let disabled = false;
  if(this.filaSeleccionada.length === 0){
    disabled = true
  }
  return disabled;
}

  /**
   * Ciclo de vida de Angular: limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}