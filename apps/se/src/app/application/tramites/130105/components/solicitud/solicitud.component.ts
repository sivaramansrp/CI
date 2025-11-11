import { Catalogo, ConsultaioQuery, REGEX_NUMERO_DECIMAL_ENTERO, REG_X } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Decimal } from 'decimal.js';
import { Tramite130105State, Tramite130105Store } from '../../../../estados/tramites/tramites130105.store';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { ImportacionVehiculosUsadosDonacionService } from '../../services/importacion-vehiculos-usados-donacion.service';
import { PARTIDASDELAMERCANCIA_TABLA } from '../../../../shared/constantes/partidas-de-la-mercancia.enum';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { TEXTOS } from '../../../../shared/constantes/representacion-federal.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Tramite130105Query } from '../../../../estados/queries/tramite130105.query';
import { idProcedimiento, OPINIONES_SOLICITUD, PRODUCTO_OPCION } from '../../constants/importacion-vehiculos-usados-donacion-pasos.enum';
import { MostrarPartidas } from '@libs/shared/data-access-user/src/';


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

  isInvalidaPartidas: boolean = false;

  /**
   * Formulario reactivo para la selección de países.
   */
  paisForm!: FormGroup;
  /**
   * Formulario reactivo para la representación.
   */
  frmRepresentacionForm!: FormGroup;

  modificarPartidasDelaMercanciaForm!: FormGroup;
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
  public getEstablecimientoTableData = [];

  /**
   * filaSeleccionada
   * Fila seleccionada en la tabla dinámica.
   */
  filaSeleccionada: PartidasDeLaMercanciaModelo[] = [];

  /**
   * jest.spyOnOpciones para el campo "producto".
   */
  productoOpciones: ProductoOpción[] = PRODUCTO_OPCION;
  /**
   * jest.spyOnCatálogo con valores de fracción arancelaria.
   */

  fraccionCatalogo: Catalogo[] = [];

  /**
   * jest.spyOnCatálogo con opciones de unidad de medida.
   */
  unidadCatalogo: Catalogo[] = [];
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
  catalogosArray: Catalogo[][] = [[], []];
  /**
   * jest.spyOnOpciones de solicitud configurables.
   */
  opcionesSolicitud: ProductoOpción[] = OPINIONES_SOLICITUD;

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
  private seccionState!: Tramite130105State;

  idProcedimiento: number = idProcedimiento;

  mostrarPartidas: MostrarPartidas[] = [];

  /**
   * Constructor del componente.
   */
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private tramite130105Store: Tramite130105Store,
    private tramite130105Query: Tramite130105Query,
    private importacionVehiculosUsadosDonacionService: ImportacionVehiculosUsadosDonacionService,
    private consultaioQuery: ConsultaioQuery,
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
   * jest.spyOnCiclo de vida de Angular: inicializa formularios, suscripciones y opciones al cargar el componente.
   */
  ngOnInit(): void {
    this.configuracionFormularioSuscripciones();
    this.getRegimenCatalogo();
    this.getFraccionCatalogo();
    this.getEntidadesFederativasCatalogo();
    this.getBloque();
    this.tramite130105Query.mostrarTabla$
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
      solicitud: [this.seccionState?.defaultSelect, Validators.required],
      regimen: [this.seccionState?.regimen, Validators.required],
      clasificacion: [this.seccionState?.clasificacion, Validators.required],
    });

    this.mercanciaForm = this.fb.group({
      producto: [this.seccionState?.defaultProducto],
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

    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: this.seccionState?.cantidadTotal, disabled: true }],
      valorTotalUSD: [{ value: this.seccionState?.valorTotalUSD, disabled: true }],
    });
  }

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

  /**
   * jest.spyOnConfigura las suscripciones para actualizar formularios y almacenar estados.
   */
  configuracionFormularioSuscripciones(): void {
    this.tramite130105Query.selectSolicitud$
      .pipe(takeUntil(this.destroyed$),
        map((seccionState) => {
          this.seccionState = seccionState;
          // this.partidasDelaMercanciaForm.patchValue({
          //   cantidadPartidasDeLaMercancia:
          //     seccionState.cantidadPartidasDeLaMercancia,
          //   valorPartidaUSDPartidasDeLaMercancia:
          //     seccionState.valorPartidaUSDPartidasDeLaMercancia,
          //   descripcionPartidasDeLaMercancia:
          //     seccionState.descripcionPartidasDeLaMercancia,
          // });

          this.formDelTramite.patchValue({
            solicitud: seccionState.defaultSelect,
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
      ).subscribe();
  }

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
      this.tramite130105Store.actualizarEstado({ filaSeleccionada: this.filaSeleccionada });
    }
  }

  /**
   * validarYEnviarFormulario
   * Valida el formulario y muestra la tabla dinámica si es válido.
   */
  validarYEnviarFormulario(): void {
    if (this.partidasDelaMercanciaForm.invalid) {
      this.partidasDelaMercanciaForm.markAllAsTouched();
    } else {
      this.mostrarTabla = true;
      this.tramite130105Store.actualizarEstado({ mostrarTabla: true });
      const precioUnitarioUSD = this.calcularImporteUnitario(this.seccionState?.valorPartidaUSDPartidasDeLaMercancia, this.seccionState?.cantidadPartidasDeLaMercancia);
      const UMT = this.unidadCatalogo.map(item => item.clave === this.seccionState?.unidadMedida ? item.descripcion : '').toString();
      const DATOS = [
        {
          "id": this.tableBodyData.length + 1 + "",
          "cantidad": this.seccionState?.cantidadPartidasDeLaMercancia || "",
          "unidadDeMedida": UMT || "",
          "fraccionFrancelaria": this.seccionState?.fraccion || "",
          "descripcion": this.seccionState?.descripcion || "",
          "precioUnitarioUSD": precioUnitarioUSD || "",
          "totalUSD": this.seccionState?.valorPartidaUSDPartidasDeLaMercancia || ""
        }
      ];
      this.tableBodyData = [...this.tableBodyData, ...DATOS];
      this.partidasDelaMercanciaForm.reset();
      const CANTIDAD_TOTAL = this.tableBodyData.reduce((acc, item) => acc + parseInt(item.cantidad), 0);
      const TOTAL_lUSD = this.tableBodyData.reduce((acc, item) => acc + parseFloat(item.totalUSD), 0);
      this.formForTotalCount.patchValue({
        cantidadTotal: CANTIDAD_TOTAL,
        valorTotalUSD: TOTAL_lUSD,
      });
    }
  }

  /**
   * navegarParaModificarPartida
   * Navega para modificar una partida específica y actualiza el estado global.
   */
  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
      this.tramite130105Store.actualizarEstado({ mostrarTabla: true });
      this.tramite130105Store.actualizarEstado({ filaSeleccionada: this.filaSeleccionada });
    }
  }
  /**
  * Maneja el cambio de bloque seleccionado.
  * Identificador del bloque seleccionado.
  */
  enCambioDeBloque(bloqueId: number): void {
    this.getPaisesPorBloque(bloqueId.toString());
  }
  /**
   * jest.spyOnActualiza el almacén con nuevos valores basados en eventos de formulario.
   * jest.spyOnEvento que incluye el formulario, el campo y el método a ejecutar.
   */
  setValoresStore($event: { form: FormGroup; campo: string }): void {
    const VALOR = $event.form.get($event.campo)?.value;
    this.tramite130105Store.actualizarEstado({ [$event.campo]: VALOR });
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
   * Determina si el botón "Modificar" debe estar deshabilitado.
   * Este método verifica si no hay filas seleccionadas en la tabla dinámica.
   * 
   */
  disabledModificar(): boolean {
    let disabled = false;
    if (this.filaSeleccionada.length === 0) {
      disabled = true
    }
    return disabled;
  }


  modificarPartidaSeleccionada(evento: PartidasDeLaMercanciaModelo): void {
    this.modificarPartidasDelaMercanciaForm.patchValue({
      cantidadPartidasDeLaMercancia: evento.cantidad,
      valorPartidaUSDPartidasDeLaMercancia: evento.totalUSD,
      descripcionPartidasDeLaMercancia: evento.descripcion,
    });
  }

  partidaModificada(evento: PartidasDeLaMercanciaModelo): void {
    this.tableBodyData = this.tableBodyData.map(item => {
      if (item.id === evento.id) {
        return {
          ...item,
          cantidad: this.modificarPartidasDelaMercanciaForm.get('cantidadPartidasDeLaMercancia')?.value,
          totalUSD: this.modificarPartidasDelaMercanciaForm.get('valorPartidaUSDPartidasDeLaMercancia')?.value,
          descripcion: this.modificarPartidasDelaMercanciaForm.get('descripcionPartidasDeLaMercancia')?.value,
        };
      }
      return item;
    });
  }

  /**
  * Obtiene el catálogo de tratados o acuerdos desde el servicio y lo asigna a la propiedad `tratadoAcuerdoCertificado`.
  *
  * @returns {void}
  */
  getRegimenCatalogo(): void {
    this.importacionVehiculosUsadosDonacionService.getRegimenCatalogo(this.idProcedimiento.toString()).subscribe((data) => {
      this.catalogosArray[0] = data as Catalogo[];
    });
  }

  /**
   * Obtiene el catálogo de tratados o acuerdos desde el servicio y lo asigna a la propiedad `tratadoAcuerdoCertificado`.
   *
   * @returns {void}
   */
  getClasificacionRegimenCatalogo(VALOR: string): void {
    this.importacionVehiculosUsadosDonacionService.getClasificacionRegimenCatalogo(VALOR).subscribe((data) => {
      this.catalogosArray[1] = data as Catalogo[];
    });
  }

  getFraccionCatalogo(): void {
    this.importacionVehiculosUsadosDonacionService.getFraccionCatalogoService(this.idProcedimiento.toString()).subscribe((data) => {
      this.fraccionCatalogo = data?.map(item => ({
        ...item,
        descripcion: `${item.clave} - ${item.descripcion}`
      }));
    });
  }

  getUnidadesMedidaTarifaria(FRACCION_ID: string): void {
    this.importacionVehiculosUsadosDonacionService.getUMTService(this.idProcedimiento.toString(), FRACCION_ID).subscribe((data) => {
      this.unidadCatalogo = data as Catalogo[];
      if (this.unidadCatalogo.length > 0) {
        this.mercanciaForm.get('unidadMedida')?.setValue(this.unidadCatalogo[0]?.clave || '');
        this.tramite130105Store.actualizarEstado({ unidadMedida: this.unidadCatalogo[0]?.clave || '' });
      }
    });
  }

  getBloque(): void {
    this.importacionVehiculosUsadosDonacionService.getBloqueService(this.idProcedimiento.toString()).subscribe((data) => {
      this.elementosDeBloque = data as Catalogo[];
    });
  }

  getPaisesPorBloque(ID: string): void {
    this.importacionVehiculosUsadosDonacionService.getPaisesPorBloqueService(this.idProcedimiento.toString(), ID).subscribe((data) => {
      this.paisesPorBloque = data as Catalogo[];
    });
  }

  getEntidadesFederativasCatalogo(): void {
    this.importacionVehiculosUsadosDonacionService.getEntidadesFederativasCatalogo(this.idProcedimiento.toString()).subscribe((data) => {
      this.entidadFederativa = data as Catalogo[];
    })
  }

  getRepresentacionFederalCatalogo(cveEntidad: string): void {
    this.importacionVehiculosUsadosDonacionService.getRepresentacionFederalCatalogo(this.idProcedimiento.toString(), cveEntidad).subscribe((data) => {
      this.representacionFederal = data as Catalogo[];
    });
  }

  todosPaisesSeleccionados(evento: boolean): void {
    if (evento) {
      this.importacionVehiculosUsadosDonacionService.getTodosPaisesSeleccionados(this.idProcedimiento.toString()).subscribe((data) => {
        this.paisesPorBloque = data as Catalogo[];
      });
    }
  }

  getMostrarPartidas(): void {
    this.importacionVehiculosUsadosDonacionService.getMostrarPartidasService(this.idProcedimiento.toString(), 0).subscribe((data) => {
      this.mostrarPartidas = data as MostrarPartidas[];
      this.tramite130105Store.actualizarEstado({ mostrarPartidas: this.mostrarPartidas });
    });
  }

  fechasSeleccionadas(evento: string[]): void {
    console.log(evento);
    this.tramite130105Store.actualizarEstado({ fechasSeleccionadas: evento });
  }

  
  calcularImporteUnitario(cantidadPartidas: string, cantidadUSD: string): string {
    const totalPartidas = Number(cantidadPartidas);
    const totalUSD = Number(cantidadUSD);

    if (totalPartidas === 0) {
      return '0';
    }

    const MAXIMO_DECIMALES = 3;
    const importeUnitarioUSD = new Decimal(totalUSD).dividedBy(totalPartidas);

    return importeUnitarioUSD.toFixed(MAXIMO_DECIMALES).toString();
  }

  /**
   * jest.spyOnCiclo de vida de Angular: limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
