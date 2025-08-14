import {
  Catalogo,
  ConfiguracionColumna,
  ConsultaioQuery,
  REGEX_NUMERO_DECIMAL_2_DIGITOS,
  REG_X,
} from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Tramite130203State,
  Tramite130203Store,
} from '../../estados/tramites/tramites130203.store';
import { Component } from '@angular/core';
import { ExportacionDeDiamantesEnBrutoService } from '../../services/exportacion-de-diamantes-en-bruto.service';
import { ID_PROCEDIMIENTO } from '../../constants/exportacion-de-diamantes-en-bruto.enum';
import { map } from 'rxjs';

import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PARTIDASDELAMERCANCIA_TABLA } from '../../../../shared/constantes/partidas-de-la-mercancia.enum';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130202/partidas-de-la.json';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { Subject } from 'rxjs';
import { TEXTOS } from '../../../../shared/constantes/representacion-federal.enum';
import { Tramite130203Query } from '../../estados/queries/tramite130203.query';
import { takeUntil } from 'rxjs';

import fractionValues from '@libs/shared/theme/assets/json/130203/fraccion_arancelaria.json';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130202/solicitud-select.json';
import unidadOptions from '@libs/shared/theme/assets/json/130203/unidad_da.json';

/**
 * @description
 * Componente para gestionar la solicitud del trámite 130203.
 * Este componente incluye formularios reactivos y suscripciones para manejar el estado del trámite.
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal del trámite.
   */
  formDelTramite!: FormGroup;

  /**
   * Formulario para los datos de la mercancía.
   */
  mercanciaForm!: FormGroup;

  /**
   * Formulario para las partidas de la mercancía.
   */
  partidasDelaMercanciaForm!: FormGroup;

  /**
   * Formulario para los datos del país.
   */
  paisForm!: FormGroup;

  /**
   * Formulario para la representación federal.
   */
  frmRepresentacionForm!: FormGroup;

  /**
   * Campos de entrada para los datos del formulario.
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
   * Catálogos de valores para los selectores.
   */
  catalogosArray: Catalogo[][] = solicitudeSelectVal;

  /**
   * Opciones disponibles para la solicitud.
   */
  opcionesSolicitud: ProductoOpción[] = [];

  /**
   * Observable para manejar la destrucción del componente.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Opciones de productos disponibles.
   */
  productoOpciones: ProductoOpción[] = [];

  /**
   * Indica si se debe mostrar la tabla.
   */
  mostrarTabla = false;

  /**
   * Catálogo de fracciones arancelarias.
   */
  fraccionCatalogo: Catalogo[] = fractionValues;

  /**
   * Catálogo de unidades de medida.
   */
  unidadCatalogo: Catalogo[] = unidadOptions;

  /**
   * Formulario para el conteo total.
   */
  formForTotalCount!: FormGroup;

  /**
   * Datos del cuerpo de la tabla.
   */
  tableBodyData: PartidasDeLaMercanciaModelo[] = [];

  /**
   * tableHeaderData
   * Configuración de las columnas de la tabla dinámica.
   */
  tableHeaderData: ConfiguracionColumna<PartidasDeLaMercanciaModelo>[] =
    PARTIDASDELAMERCANCIA_TABLA;
  /**
   * Datos de establecimiento para la tabla.
   */
  public getEstablecimientoTableData = PartidasdelaTable;

  /**
   * Fila seleccionada en la tabla.
   */
  filaSeleccionada: PartidasDeLaMercanciaModelo[] = [];

  /**
   * Elementos del bloque seleccionados.
   */
  elementosDeBloque: Catalogo[] = [];

  /**
   * Lista de países por bloque.
   */
  paisesPorBloque: Catalogo[] = [];

  /**
   * Rango de días seleccionados.
   */
  selectRangoDias: string[] = [];

  /**
   * Lista de entidades federativas.
   */
  entidadFederativa: Catalogo[] = [];

  /**
   * Lista de representaciones federales.
   */
  representacionFederal: Catalogo[] = [];

  /**
   * Textos constantes para la representación federal.
   */
  TEXTOS = TEXTOS;

  /**
   * Identificador del procedimiento.
   * @property {number} idProcedimiento
   */
  public idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Indica si el estado del trámite ha sido creado.
   * Cuando es `true`, el estado inicial del trámite está listo para usarse.
   */
  esEstadoCreado: boolean = false;

  /**
   * Estado interno de la sección actual del trámite 130110.
   * Utilizado para gestionar y almacenar la información relacionada con esta sección.
   * Propiedad privada.
   */
  private seccionState!: Tramite130203State;

  /**
   * @description
   * Constructor del componente.
   * @param fb FormBuilder para la creación de formularios reactivos.
   * @param http Servicio HTTP para realizar solicitudes.
   * @param exportacionDeDiamantesEnBrutoService Servicio para obtener datos relacionados con la exportación.
   * @param tramite130203Store Store para gestionar el estado del trámite.
   * @param tramite130203Query Query para obtener datos del estado del trámite.
   * @param consultaioQuery Query para obtener datos de consulta.
   */
  constructor(
    private fb: FormBuilder,
    private exportacionDeDiamantesEnBrutoService: ExportacionDeDiamantesEnBrutoService,
    private tramite130203Store: Tramite130203Store,
    private tramite130203Query: Tramite130203Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.inicializarFormularios();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.esEstadoCreado = seccionState.create;
        })
      )
      .subscribe();
  }

  /**
   * @description
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.obtenerTablaDatos();
    this.opcionesDeBusqueda();
    this.configuracionFormularioSuscripciones();
    this.formularioTotalCount();
    this.fetchEntidadFederativa();
    this.fetchRepresentacionFederal();
    this.listaDePaisesDisponibles();
    this.mostrarTabla = true;
    this.tramite130203Query.mostrarTabla$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.mostrarTabla = true;
      });
  }
  /**
   * @description
   * Inicializa los formularios del componente.
   */
  inicializarFormularios(): void {
    this.formDelTramite = this.fb.group({
      solicitud: [this.seccionState?.solicitud, Validators.required],
      regimen: [this.seccionState?.regimen, Validators.required],
      clasificacion: [this.seccionState?.clasificacion, Validators.required],
    });

    this.mercanciaForm = this.fb.group({
      producto: [],
      descripcion: [
        this.seccionState?.descripcion,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      fraccion: [this.seccionState?.fraccion, Validators.required],
      cantidad: [
        this.seccionState?.cantidad,
        [
          Validators.required,
          Validators.pattern(REG_X.SOLO_NUMEROS),
          Validators.min(1),
        ],
      ],

      valorFacturaUSD: [
        this.seccionState?.valorFacturaUSD,
        [
          Validators.required,
          Validators.pattern(REG_X.DECIMALES_DOS_LUGARES),
          Validators.min(0.01),
        ],
      ],

      unidadMedida: [this.seccionState?.unidadMedida, Validators.required],
    });

    this.partidasDelaMercanciaForm = this.fb.group({
      cantidadPartidasDeLaMercancia: [
        this.seccionState?.cantidadPartidasDeLaMercancia,
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(18),
        ],
      ],
      descripcionPartidasDeLaMercancia: [
        this.seccionState?.descripcionPartidasDeLaMercancia,
        [Validators.required, Validators.maxLength(255)],
      ],
      valorPartidaUSDPartidasDeLaMercancia: [
        this.seccionState?.valorPartidaUSDPartidasDeLaMercancia,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(REGEX_NUMERO_DECIMAL_2_DIGITOS),
          Validators.maxLength(20),
        ],
      ],
    });

    this.paisForm = this.fb.group({
      bloque: [this.seccionState?.bloque],
      usoEspecifico: [this.seccionState?.usoEspecifico, Validators.required],
      justificacionImportacionExportacion: [
        this.seccionState?.justificacionImportacionExportacion,
        [Validators.required],
      ],
      observaciones: [this.seccionState?.observaciones],
      numeroPermisoImportacion: [this.seccionState?.numeroPermisoImportacion],
    });

    this.frmRepresentacionForm = this.fb.group({
      entidad: [this.seccionState?.entidad, Validators.required],
      representacion: [this.seccionState?.representacion, Validators.required],
    });
  }

  /**
   * @description
   * Configura las opciones de búsqueda para los formularios.
   * Obtiene las opciones de solicitud y producto desde el servicio.
   */
  opcionesDeBusqueda(): void {
    this.exportacionDeDiamantesEnBrutoService
      .getSolicitudeOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.opcionesSolicitud = data.options;
          this.tramite130203Store.actualizarEstado({
            solicitud: data.options[0]?.value || '',
            defaultSelect: data.defaultSelect || 'Inicial',
          });
        },
        error: (error) =>
          console.error('Error loading solicitude options:', error),
      });

    this.exportacionDeDiamantesEnBrutoService
      .getProductoOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.productoOpciones = data.options;
          this.tramite130203Store.actualizarEstado({
            producto: data.options[0]?.value || 'Nuevo',
            defaultProducto: data.options[0]?.value || 'Nuevo',
          });
        },
      });
  }
  /**
   * @description Actualiza el almacén con nuevos valores basados en eventos de formulario.
   * @param event Evento que incluye el formulario, el campo y el método a ejecutar.
   */
  setValoresStore($event: { form: FormGroup; campo: string }): void {
    const VALOR = $event.form.get($event.campo)?.value;
    this.tramite130203Store.actualizarEstado({ [$event.campo]: VALOR });
    if ($event.campo === 'fraccion') {
      this.tramite130203Store.actualizarEstado({ unidadMedida: '1' });
    }
  }

  /**
   * @description
   * Configura las suscripciones para los formularios y actualiza el estado del store.
   */
  configuracionFormularioSuscripciones(): void {
    this.tramite130203Query.selectSolicitud$
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
            numeroPermisoImportacion: seccionState.numeroPermisoImportacion,
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
   * @description
   * Valida y envía el formulario, mostrando la tabla si es válido.
   */
  validarYEnviarFormulario(): void {
    if (this.partidasDelaMercanciaForm.invalid) {
      this.partidasDelaMercanciaForm.markAllAsTouched();
    } else {
      this.mostrarTabla = true;
      this.tramite130203Store.actualizarEstado({ mostrarTabla: true });
    }
  }

  /**
   * @description
   * Inicializa el formulario para el conteo total.
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
  }

  /**
   * @description
   * Navega para modificar una partida seleccionada en la tabla.
   */
  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
      this.tramite130203Store.actualizarEstado({ mostrarTabla: true });
      this.tramite130203Store.actualizarEstado({
        filaSeleccionada: this.filaSeleccionada,
      });
    }
  }

  /**
   * @description
   * Maneja la fila seleccionada en la tabla.
   * @param filasSeleccionadas Lista de filas seleccionadas.
   */
  manejarlaFilaSeleccionada(
    filasSeleccionadas: PartidasDeLaMercanciaModelo[]
  ): void {
    this.filaSeleccionada = filasSeleccionadas.length ? filasSeleccionadas : [];
    if (this.filaSeleccionada) {
      this.tramite130203Store.actualizarEstado({
        filaSeleccionada: this.filaSeleccionada,
      });
    }
  }
  /**
   * @description
   * Obtiene la lista de países disponibles desde el servicio.
   */
  listaDePaisesDisponibles(): void {
    this.exportacionDeDiamantesEnBrutoService
      .getListaDePaisesDisponibles()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.elementosDeBloque = data;
      });
  }

  /**
   * @description
   * Obtiene los países por bloque desde el servicio.
   * @param _bloqueId ID del bloque seleccionado.
   */
  fetchPaisesPorBloque(_bloqueId: number): void {
    this.exportacionDeDiamantesEnBrutoService
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
   * @description
   * Maneja el cambio de bloque y actualiza los países correspondientes.
   * @param bloqueId ID del bloque seleccionado.
   */
  enCambioDeBloque(bloqueId: number): void {
    this.fetchPaisesPorBloque(bloqueId);
  }

  /**
   * @description
   * Obtiene la lista de entidades federativas desde el servicio.
   */
  fetchEntidadFederativa(): void {
    this.exportacionDeDiamantesEnBrutoService
      .getEntidadFederativa()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.entidadFederativa = data;
      });
  }

  /**
   * @description
   * Obtiene la lista de representaciones federales desde el servicio.
   */
  fetchRepresentacionFederal(): void {
    this.exportacionDeDiamantesEnBrutoService
      .getRepresentacionFederal()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.representacionFederal = data;
      });
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
    this.exportacionDeDiamantesEnBrutoService
      .getTablaDatos()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.tableBodyData = this.esEstadoCreado ? [] : data;
        this.formForTotalCount.patchValue({
          cantidadTotal: data[0].cantidad,
          valorTotalUSD: data[0].totalUSD,
        });
      });
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
   * @description
   * Método para limpiar las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
