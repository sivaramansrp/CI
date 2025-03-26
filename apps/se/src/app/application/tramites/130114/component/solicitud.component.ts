import { Catalogo, REG_X } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { DiamanteBrutoService } from '../../130114/services/diamante-bruto.service'
import { HttpClient } from '@angular/common/http';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130202/partidas-de-la.json';
import { ProductoOpción } from '../../../shared/constantes/vehiculos-adaptados.enum';
import { TEXTOS } from '../../../shared/constantes/representacion-federal.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Tramite130114Query } from '../../130114/estados/queries/tramite130114.query';
import { Tramite130114Store } from '../../130114/estados/queries/tramites130114.store'
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
  /**
   * Formulario reactivo para la selección de países.
   * @type {FormGroup}
   */
  paisForm!: FormGroup;
  /**
   * Formulario reactivo para la representación.
   * @type {FormGroup}
   */
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
  filaSeleccionada: any = null;
 
  /**
   * @description Opciones para el campo "producto".
   */
  productoOpciones: ProductoOpción[] = [];
  /**
   * @description Catálogo con valores de fracción arancelaria.
   */
  
 fraccionCatalogo: Catalogo[] = fractionValues;
 
  /**
   * @description Catálogo con opciones de unidad de medida.
   */
  unidadCatalogo: Catalogo[] = unidadOptions;
  /**
   * @description Campos de entrada configurables para detalles adicionales.
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
   * @description Matriz de catálogos adicionales para el formulario.
   */
  catalogosArray: Catalogo[][] = solicitudeSelectVal;
  /**
   * @description Opciones de solicitud configurables.
   */
  opcionesSolicitud: ProductoOpción[] = [];
 
  /**
   * @description Sujeto para gestionar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();
  /**
   * @description Arreglo que almacena un catálogo de elementosDeBloque.
   * @type {Catalogo[]}
   */
  elementosDeBloque: Catalogo[] = [];
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
   * Constructor del componente.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {HttpClient} http - Servicio para realizar solicitudes HTTP.
   * @param {Tramite130114Store} Tramite130114Store - Store para gestionar el estado del trámite 130202.
   * @param {Tramite130114Query} Tramite130114Query - Query para consultar el estado del trámite 130202.
   * @param {DiamanteBrutoService} DiamanteBrutoService - Servicio para la exportación de minerales de hierro.
   */
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private Tramite130114Store: Tramite130114Store,
    private Tramite130114Query: Tramite130114Query,
    private DiamanteBrutoService: DiamanteBrutoService
  ) {
    //constructor
  }
  /**
   * @description Ciclo de vida de Angular: inicializa formularios, suscripciones y opciones al cargar el componente.
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
   * @description Inicializa los formularios reactivos `formDelTramite` y `mercanciaForm`.
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
   * @description Configura las suscripciones para actualizar formularios y almacenar estados.
   */
  configuracionFormularioSuscripciones(): void {
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
        this.formDelTramite.patchValue(
          { clasificacion },
          { emitEvent: false }
        );
      });
    this.Tramite130114Query.mercanciaState$
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
        /* eslint-disable @typescript-eslint/no-explicit-any */
        clave: (fila: any): string => fila.tbodyData[index],
        orden: index,
      })
    );
    this.tableBodyData = this.getEstablecimientoTableData.tableBody;
  }
 
  /**
   * calcularTotales
   * Calcula los totales de cantidad y valor en USD a partir de los datos de la tabla.
   */
  calcularTotales(): void {
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
  opcionesDeBusqueda(): void {
    this.DiamanteBrutoService
      .getSolicitudeOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.opcionesSolicitud = data.options;
          this.Tramite130114Store.updateState({
            solicitud: data.options[0]?.value || '',
            defaultSelect: data.defaultSelect || 'Inicial',
          });
        },
        error: (error) =>
          console.error('Error loading solicitude options:', error),
      });
 
    this.DiamanteBrutoService
      .getProductoOptions()
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
   * manejarlaFilaSeleccionada
   * Maneja la selección de filas en la tabla dinámica y actualiza el estado global.
   * Lista de filas seleccionadas.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  manejarlaFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.filaSeleccionada = filasSeleccionadas.length
      ? filasSeleccionadas[0]
      : null;
    if (this.filaSeleccionada) {
      this.Tramite130114Store.storeTableValues(this.filaSeleccionada);
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
      this.Tramite130114Store.setMostrarTabla(true);
      this.Tramite130114Store.storeTableValues(this.filaSeleccionada);
    }
  }
/**
 * Método para obtener la lista de entidades federativas.
 */
fetchEntidadFederativa(): void {
  this.DiamanteBrutoService
    .getEntidadFederativa()
    .subscribe((data) => {
      this.entidadFederativa = data;
    });
}
/**
* Método para obtener la lista de representaciones federales.
*/
fetchRepresentacionFederal(): void {
  this.DiamanteBrutoService
    .getRepresentacionFederal()
    .subscribe((data) => {
      this.representacionFederal = data;
    });
}
/**
* Método para obtener la lista de países disponibles.
*/
listaDePaisesDisponibles(): void {
  this.DiamanteBrutoService
    .getListaDePaisesDisponibles()
    .subscribe((data) => {
      this.elementosDeBloque = data;
    });
}
/**
* Método para obtener la lista de países por bloque.
* @param {number} _bloqueId - Identificador del bloque.
*/
fetchPaisesPorBloque(_bloqueId: number): void {
  this.DiamanteBrutoService
    .getPaisesPorBloque(_bloqueId)
    .subscribe((data) => {
      this.paisesPorBloque = data;
      this.selectRangoDias = this.paisesPorBloque.map(
        (pais: Catalogo) => pais.descripcion
      );
    });
}
/**
* Maneja el cambio de bloque seleccionado.
* @param {number} bloqueId - Identificador del bloque seleccionado.
*/
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
        this.Tramite130114Store.setProducto(VALOR);
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
        console.error(
          `Método ${event.metodoNombre} no existe en Tramite130114Store`
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
 
