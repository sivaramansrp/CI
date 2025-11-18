import { Catalogo, ConsultaioQuery, REGEX_NUMERO_DECIMAL_ENTERO, REG_X } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite130104State, Tramite130104Store } from '../../../../estados/tramites/tramite130104.store';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { ImportacionOtrosVehiculosUsadosService } from '../../services/importacion-otros-vehiculos-usados.service';
import { MostrarPartidas } from '@libs/shared/data-access-user/src';
import { PARTIDASDELAMERCANCIA_TABLA } from '../../../../shared/constantes/partidas-de-la-mercancia.enum';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130104/partidas-de-la.json';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { TEXTOS } from '../../../../shared/constantes/representacion-federal.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Tramite130104Query } from '../../../../estados/queries/tramite130104.query';
import Decimal from 'decimal.js';
import fractionValues from '@libs/shared/theme/assets/json/130104/fraccion_arancelaria.json';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130104/solicitud-select.json';
import unidadOptions from '@libs/shared/theme/assets/json/130104/unidad_da.json';
import { ID_PROCEDIMIENTO } from '../../constants/importacion-otros-vehiculos-usados-pasos.enum';


/**
 * jest.spyOnComponente para gestionar la solicitud de mercancías.
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
   * jest.spyOnFormulario reactivo para los datos del trámite.
   */
  formDelTramite!: FormGroup;
 
  /**
   * jest.spyOnFormulario reactivo para los detalles de la mercancía.
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
   * jest.spyOnOpciones para el campo "producto".
   */
  productoOpciones: ProductoOpción[] = [];
  /**
   * jest.spyOnCatálogo con valores de fracción arancelaria.
   */
  
 fraccionCatalogo: Catalogo[] = fractionValues;
 
  /**
   * jest.spyOnCatálogo con opciones de unidad de medida.
   */
  unidadCatalogo: Catalogo[] = unidadOptions;
  /**
   * jest.spyOnCampos de entrada configurables para detalles adicionales.
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
   * jest.spyOnMatriz de catálogos adicionales para el formulario.
   */
  catalogosArray: Catalogo[][] = solicitudeSelectVal;
  /**
   * jest.spyOnOpciones de solicitud configurables.
   */
  opcionesSolicitud: ProductoOpción[] = [];
 
  /**
   * jest.spyOnSujeto para gestionar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();
  /**
   * jest.spyOnArreglo que almacena un catálogo de elementosDeBloque.
   */
  elementosDeBloque: Catalogo[] = [];
  /**
   * jest.spyOnArreglo que contiene un catálogo de países organizados por bloque.
   */
  paisesPorBloque: Catalogo[] = [];
  /**
   * jest.spyOnArreglo que guarda un catálogo de entidades federativas.
   */
  entidadFederativa: Catalogo[] = [];
  /**
   * jest.spyOnArreglo que almacena un catálogo de representaciones federales.
   */
  representacionFederal: Catalogo[] = [];
  /**
   * jest.spyOnArreglo de cadenas que representa las opciones seleccionables de rangos de días.
   */
  selectRangoDias: string[] = [];
  /**
   * jest.spyOnObjeto o constante que contiene los textos utilizados en la aplicación.
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
    private seccionState!: Tramite130104State;

    /**
   *  jest.spyOnIndica si las partidas seleccionadas son inválidas. 
   */
  isInvalidaPartidas: boolean = false;

  /**
   * jest.spyOnIdentificador del procedimiento actual.
   * @type {number}
   */
  idProcedimiento: number = ID_PROCEDIMIENTO;

  /**
   * jest.spyOnArreglo que almacena las partidas a mostrar en la tabla.
   * @type {MostrarPartidas[]}
   */
  mostrarPartidas: MostrarPartidas[] = [];

  /**
   * Constructor del componente.
   */
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private tramite130104Store: Tramite130104Store,
    private tramite130104Query: Tramite130104Query,
    private importacionOtrosVehiculosUsadosService: ImportacionOtrosVehiculosUsadosService,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.inicializarFormularios();
      this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState)=>{
          this.esFormularioSoloLectura = seccionState.readonly; 
          if(this.esFormularioSoloLectura){
            this.getMostrarPartidas();
          }
        })
      )
      .subscribe()
  }
  /**
   * jest.spyOnCiclo de vida de Angular: inicializa formularios, suscripciones y opciones al cargar el componente.
   */
  ngOnInit(): void {
    this.configuracionFormularioSuscripciones();
    this.getRegimenCatalogo();
    this.getFraccionCatalogo();
    // this.opcionesDeBusqueda();
    this.formularioTotalCount();
    // this.obtenerTablaDatos();
    this.getEntidadesFederativasCatalogo();
    this.getBloque();
    // this.fetchRepresentacionFederal();
    // this.listaDePaisesDisponibles();

    this.tramite130104Query.mostrarTabla$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((mostrarTabla) => {
        this.mostrarTabla = mostrarTabla;
      });
  }
 
  /**
   * jest.spyOnInicializa los formularios reactivos `formDelTramite` y `mercanciaForm`.
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
          Validators.pattern(REG_X.SOLO_NUMEROS),
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
          Validators.pattern(REGEX_NUMERO_DECIMAL_ENTERO),
          Validators.maxLength(20),
        ],
      ],
    });
 
    this.paisForm = this.fb.group({
      bloque: [this.seccionState?.bloque],
      usoEspecifico: [this.seccionState?.usoEspecifico, Validators.required],
      justificacionImportacionExportacion: [this.seccionState?.justificacionImportacionExportacion, [Validators.required]],
      observaciones: [this.seccionState?.observaciones],
    });
    this.frmRepresentacionForm = this.fb.group({
      entidad: [this.seccionState?.entidad, Validators.required],
      representacion: [this.seccionState?.representacion, Validators.required],
    });
  }
  /**
   * jest.spyOnConfigura las suscripciones para actualizar formularios y almacenar estados.
   */
  configuracionFormularioSuscripciones(): void {
    this.tramite130104Query.selectSolicitud$
      .pipe(takeUntil(this.destroyed$),
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
   * formularioTotalCount
   * Crea el formulario reactivo para capturar los totales de las partidas.
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
  }
 
  // /**
  //  * jest.spyOnSolicita opciones configurables para los formularios desde archivos JSON.
  //  */
  // opcionesDeBusqueda(): void {
  //   this.importacionOtrosVehiculosUsadosService
  //     .getSolicitudeOptions()
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe({
  //       next: (data) => {
  //         this.opcionesSolicitud = data.options;
  //         this.tramite130104Store.actualizarEstado({
  //           solicitud: data.options[0]?.value || '',
  //           defaultSelect: data.defaultSelect || 'Inicial',
  //         });
  //       },
  //       error: (error) =>
  //         console.error('Error loading solicitude options:', error),
  //     });
 
  //   this.importacionOtrosVehiculosUsadosService
  //     .getProductoOptions()
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe({
  //       next: (data) => {
  //         this.productoOpciones = data.options;
  //         this.tramite130104Store.actualizarEstado({
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
  manejarlaFilaSeleccionada(filasSeleccionadas: PartidasDeLaMercanciaModelo[]): void {
    this.filaSeleccionada = filasSeleccionadas.length
      ? filasSeleccionadas
      : [];
    if (this.filaSeleccionada) {
      this.tramite130104Store.actualizarEstado({filaSeleccionada:this.filaSeleccionada});
    }
  }
// /**
//  * Método para obtener los datos de la tabla dinámica.
//  * Este método realiza una solicitud al servicio `ImportacionDeVehiculosService` para obtener los datos
//  * de la tabla y actualiza las propiedades relacionadas con la tabla dinámica.
//  * 
//  * - Actualiza `tableBodyData` con los datos obtenidos.
//  * - Asigna valores a las propiedades `cantidad` y `descripcion` del primer elemento de la tabla.
//  * - Actualiza el formulario `formForTotalCount` con los valores totales de cantidad y valor en USD.
//  * 
//  */
//   obtenerTablaDatos(): void {
//       this.importacionOtrosVehiculosUsadosService.getTablaDatos().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
//         this.tableBodyData = data;
//         this.formForTotalCount.patchValue({
//           cantidadTotal:data[0].cantidad,
//           valorTotalUSD:data[0].totalUSD
//         });
//       });
//   }
 
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
    if (this.filaSeleccionada.length === 0) {
      this.isInvalidaPartidas = true;
      isValid = false;
    } else if (this.filaSeleccionada.length > 0) {
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

  // /**
  //  * validarYEnviarFormulario
  //  * Valida el formulario y muestra la tabla dinámica si es válido.
  //  */
  // validarYEnviarFormulario(): void {
  //   if (this.partidasDelaMercanciaForm.invalid) {
  //     this.partidasDelaMercanciaForm.markAllAsTouched();
  //   } else {
  //     this.mostrarTabla = true;
  //     this.tramite130104Store.actualizarEstado({mostrarTabla:true});

  //   }
  // }

  /**
   * validarYEnviarFormulario
   * Valida el formulario y muestra la tabla dinámica si es válido.
   */
  validarYEnviarFormulario(): void {
    if (this.partidasDelaMercanciaForm.invalid) {
      this.partidasDelaMercanciaForm.markAllAsTouched();
    } else {
      this.mostrarTabla = true;
      this.tramite130104Store.actualizarEstado({ mostrarTabla: true });
      const PRECIO_UNITARIO_USD = this.calcularImporteUnitario(this.seccionState?.valorPartidaUSDPartidasDeLaMercancia, this.seccionState?.cantidadPartidasDeLaMercancia);
      const UMT = this.unidadCatalogo.map(item => item.clave === this.seccionState?.unidadMedida ? item.descripcion : '').toString();
      const DATOS = [
        {
          "id": String(this.tableBodyData.length + 1),
          "cantidad": this.seccionState?.cantidadPartidasDeLaMercancia || "",
          "unidadDeMedida": UMT || "",
          "fraccionFrancelaria": this.seccionState?.fraccion || "",
          "descripcion": this.seccionState?.descripcion || "",
          "precioUnitarioUSD": PRECIO_UNITARIO_USD || "",
          "totalUSD": this.seccionState?.valorPartidaUSDPartidasDeLaMercancia || ""
        }
      ];
      this.tableBodyData = [...this.tableBodyData, ...DATOS];
      this.partidasDelaMercanciaForm.reset();
      const CANTIDAD_TOTAL = this.tableBodyData.reduce((acc, item) => acc + parseInt(item.cantidad, 10), 0);
      const TOTAL_USD = this.tableBodyData.reduce((acc, item) => acc + parseFloat(item.totalUSD), 0);
      this.formForTotalCount.patchValue({
        cantidadTotal: CANTIDAD_TOTAL,
        valorTotalUSD: TOTAL_USD,
      });
    }
  }

  /**
 *  Calcula el importe unitario en USD basado en la cantidad de partidas y el total en USD.
 * @param cantidadPartidas 
 * @param cantidadUSD 
 * @returns 
 */
  calcularImporteUnitario(cantidadPartidas: string, cantidadUSD: string): string {
    const TOTAL_PARTIDAS = Number(cantidadPartidas);
    const TOTAL_USD = Number(cantidadUSD);

    if (TOTAL_PARTIDAS === 0) {
      return '0';
    }

    const MAXIMO_DECIMALES = 3;
    const IMPORTE_UNITARIO_USD = new Decimal(TOTAL_USD).dividedBy(TOTAL_PARTIDAS);

    return IMPORTE_UNITARIO_USD.toFixed(MAXIMO_DECIMALES).toString();
  }
 
  /**
   * navegarParaModificarPartida
   * Navega para modificar una partida específica y actualiza el estado global.
   */
  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
     this.tramite130104Store.actualizarEstado({mostrarTabla:true});
     this.tramite130104Store.actualizarEstado({filaSeleccionada:this.filaSeleccionada});
    }
  }
// /**
//  * Método para obtener la lista de entidades federativas.
//  */
// fetchEntidadFederativa(): void {
//   this.importacionOtrosVehiculosUsadosService
//     .getEntidadFederativa()
//     .pipe(takeUntil(this.destroyed$))
//     .subscribe((data) => {
//       this.entidadFederativa = data;
//     });
// }
// /**
// * Método para obtener la lista de representaciones federales.
// */
// fetchRepresentacionFederal(): void {
//   this.importacionOtrosVehiculosUsadosService
//     .getRepresentacionFederal()
//     .pipe(takeUntil(this.destroyed$))
//     .subscribe((data) => {
//       this.representacionFederal = data;
//     });
// }
// /**
// * Método para obtener la lista de países disponibles.
// */
// listaDePaisesDisponibles(): void {
//   this.importacionOtrosVehiculosUsadosService
//     .getListaDePaisesDisponibles()
//     .pipe(takeUntil(this.destroyed$))
//     .subscribe((data) => {
//       this.elementosDeBloque = data;
//     });
// }
// /**
// * Método para obtener la lista de países por bloque.
// * Identificador del bloque.
// */
// fetchPaisesPorBloque(_bloqueId: number): void {
//   this.importacionOtrosVehiculosUsadosService
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
   *  Obtiene los países por bloque desde el servicio y los asigna a la propiedad `paisesPorBloque`.
   * @param ID 
   */
  getPaisesPorBloque(ID: string): void {
    this.importacionOtrosVehiculosUsadosService.getPaisesPorBloqueService(this.idProcedimiento.toString(), ID).subscribe((data) => {
      this.paisesPorBloque = data as Catalogo[];
    });
  }

  /**
   * Obtiene el catálogo de entidades federativas desde el servicio y lo asigna a la propiedad `entidadFederativa`.
   *
   * @returns {void}
   */
  getEntidadesFederativasCatalogo(): void {
    this.importacionOtrosVehiculosUsadosService.getEntidadesFederativasCatalogo(this.idProcedimiento.toString()).subscribe((data) => {
      this.entidadFederativa = data as Catalogo[];
    })
  }

  /**
   *  Obtiene el catálogo de representaciones federales basado en la entidad seleccionada.
   * @param cveEntidad 
   */
  getRepresentacionFederalCatalogo(cveEntidad: string): void {
    this.importacionOtrosVehiculosUsadosService.getRepresentacionFederalCatalogo(this.idProcedimiento.toString(), cveEntidad).subscribe((data) => {
      this.representacionFederal = data as Catalogo[];
    });
  }
  /**
   * Obtiene las partidas a mostrar desde el servicio y las asigna a la propiedad `mostrarPartidas`.
   *
   * @returns {void}
   */
  getMostrarPartidas(): void {
    this.importacionOtrosVehiculosUsadosService.getMostrarPartidasService(202859165).subscribe((data: any) => {
      if(data.codigo === '00'){
          this.mostrarPartidas = data.datos as MostrarPartidas[];
          this.tramite130104Store.actualizarEstado({ mostrarPartidas: this.mostrarPartidas });
      }
    });
  }

  /**
  * Maneja el cambio de bloque seleccionado.
  * Identificador del bloque seleccionado.
  */
  enCambioDeBloque(bloqueId: number): void {
    this.getPaisesPorBloque(bloqueId.toString());
  }
  
  // /**
  //  * Obtiene el catálogo de tratados o acuerdos desde el servicio y lo asigna a la propiedad `tratadoAcuerdoCertificado`.
  //  *
  //  * @returns {void}
  //  */
  // getClasificacionRegimenCatalogo(VALOR: string): void {
  //   this.importacionOtrosVehiculosUsadosService.getClasificacionRegimenCatalogo(VALOR).subscribe((data) => {
  //     this.catalogosArray[1] = data as Catalogo[];
  //   });
  // }

  /**
  * Obtiene el catálogo de tratados o acuerdos desde el servicio y lo asigna a la propiedad `tratadoAcuerdoCertificado`.
  *
  * @returns {void}
  */
  getRegimenCatalogo(): void {
    this.importacionOtrosVehiculosUsadosService.getRegimenCatalogo(this.idProcedimiento.toString()).subscribe((data) => {
      this.catalogosArray[0] = data as Catalogo[];
    });
  }

  /**
   *  Obtiene las unidades de medida tarifaria basadas en la fracción arancelaria seleccionada.
   * @param FRACCION_ID 
   */
  getUnidadesMedidaTarifaria(FRACCION_ID: string): void {
    this.importacionOtrosVehiculosUsadosService.getUMTService(this.idProcedimiento.toString(), FRACCION_ID).subscribe((data) => {
      this.unidadCatalogo = data as Catalogo[];
      if (this.unidadCatalogo.length > 0) {
        this.mercanciaForm.get('unidadMedida')?.setValue(this.unidadCatalogo[0]?.clave || '');
        this.tramite130104Store.actualizarEstado({ unidadMedida: this.unidadCatalogo[0]?.clave || '' });
      }
    });
  }

  /**
   * Obtiene el catálogo de fracciones arancelarias desde el servicio y lo asigna a la propiedad `fraccionCatalogo`.
   *
   * @returns {void}
   */
  getFraccionCatalogo(): void {
    this.importacionOtrosVehiculosUsadosService.getFraccionCatalogoService(this.idProcedimiento.toString()).subscribe((data) => {
      this.fraccionCatalogo = data?.map(item => ({
        ...item,
        descripcion: `${item.clave} - ${item.descripcion}`
      }));
    });
  }

  /**
   * Obtiene los bloques desde el servicio y los asigna a la propiedad `elementosDeBloque`.
   *
   * @returns {void}
   */
  getBloque(): void {
    this.importacionOtrosVehiculosUsadosService.getBloqueService(this.idProcedimiento.toString()).subscribe((data) => {
      this.elementosDeBloque = data as Catalogo[];
    });
  }

  /**
   * jest.spyOnActualiza el almacén con nuevos valores basados en eventos de formulario.
   * jest.spyOnEvento que incluye el formulario, el campo y el método a ejecutar.
   */
  setValoresStore($event: { form: FormGroup; campo: string }): void {
    const VALOR = $event.form.get($event.campo)?.value;
    this.tramite130104Store.actualizarEstado({ [$event.campo]: VALOR });
    if ($event.campo === 'regimen') {
      const VALOR = this.formDelTramite.get('regimen')?.value;
      // this.getClasificacionRegimenCatalogo(VALOR);
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

// /**
//    * jest.spyOnActualiza el almacén con nuevos valores basados en eventos de formulario.
//    * jest.spyOnEvento que incluye el formulario, el campo y el método a ejecutar.
//    */
//   setValoresStore($event: { form: FormGroup; campo: string }): void {
//     const VALOR = $event.form.get($event.campo)?.value;
//     this.tramite130104Store.actualizarEstado({ [$event.campo]: VALOR });
//     if($event.campo === 'fraccion'){
//       this.tramite130104Store.actualizarEstado({'unidadMedida': '1'});
//     }
//   }
 
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
   * jest.spyOnCiclo de vida de Angular: limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
 