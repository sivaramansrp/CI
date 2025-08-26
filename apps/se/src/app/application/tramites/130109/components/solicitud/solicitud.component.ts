import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Catalogo, ConsultaioQuery, Notificacion } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite130109State, Tramite130109Store } from '../../../../estados/tramites/tramites130109.store';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { PARTIDASDELAMERCANCIA_TABLA } from '../../../../shared/constantes/partidas-de-la-mercancia.enum';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130109/partidas-de-la.json';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { TEXTOS } from '../../../../shared/constantes/representacion-federal.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Tramite130109Query } from '../../../../estados/queries/tramite130109.query';
import { VehiculosUsadosAdaptadosService } from '../../services/vehiculos-usados-adaptados.service';
import fractionValues from '@libs/shared/theme/assets/json/130109/fraccion_arancelaria.json';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130109/solicitud-select.json';
import unidadOptions from '@libs/shared/theme/assets/json/130109/unidad_da.json';


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
        label: 'Régimen al que se destinará la mercancía*',
        placeholder: 'Seleccione un documento',
        required: true,
        controlName: 'regimen',
      },
      {
        label: 'Clasificación del régimen*',
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
    private seccionState!: Tramite130109State;

    /**
     * Indica si se debe mostrar el error de clasificación.
     */
    mostrarErrorClasificacion = true;
    /**
   * Bandera que indica si se deben mostrar los mensajes de error para el formulario de partidas de la mercancía.
   */
    mostrarErroresPartidas = false;
  /**
   * Bandera que indica si se deben mostrar los mensajes de error para el formulario de mercancía.
   */
    mostrarErroresMercancia = false;
    /*
      * @descripcion Indica si se debe mostrar una notificación.
      */
    mostrarNotificacion = false;
    /**
      * @descripcion Notificación para mostrar mensajes al usuario.
      */
    public nuevaNotificacion!: Notificacion;

    /**
     * Constructor del componente.
     */
    constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private tramite130109Store: Tramite130109Store,
      private tramite130109Query: Tramite130109Query,
      private vehiculosUsadosAdaptadosService: VehiculosUsadosAdaptadosService,
      private consultaioQuery: ConsultaioQuery,
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
     * jest.spyOnCiclo de vida de Angular: inicializa formularios, suscripciones y opciones al cargar el componente.
     */
    ngOnInit(): void {
      this.configuracionFormularioSuscripciones();
      this.opcionesDeBusqueda();
      this.formularioTotalCount();
      this.obtenerTablaDatos();
      this.fetchEntidadFederativa();
      this.fetchRepresentacionFederal();
      this.listaDePaisesDisponibles();


      this.tramite130109Query.mostrarTabla$
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
            SolicitudComponent.validarSinCaracterAnguloDerecho
          ],
        ],
        fraccion: [this.seccionState?.fraccion, Validators.required],
        cantidad: [
          this.seccionState?.cantidad,
          [
            Validators.required,
            SolicitudComponent.validarNumeroTresDecimales,
            Validators.min(1),
          ],
        ],
        valorFacturaUSD: [
          this.seccionState?.valorFacturaUSD,
          [
            Validators.required,
            SolicitudComponent.validarNumeroTresDecimales,
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
            SolicitudComponent.validarCatorceEnterosTresDecimales,
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
            SolicitudComponent.validarCatorceEnterosTresDecimales,
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
      this.tramite130109Query.selectSolicitud$
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
   
    /**
     * jest.spyOnSolicita opciones configurables para los formularios desde archivos JSON.
     */
    opcionesDeBusqueda(): void {
      this.vehiculosUsadosAdaptadosService
        .getSolicitudeOptions()
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (data) => {
            this.opcionesSolicitud = data.options;
            this.tramite130109Store.actualizarEstado({
              solicitud: data.options[0]?.value || '',
              defaultSelect: data.defaultSelect || 'Inicial',
            });
          },
          error: (error) =>
            console.error('Error loading solicitude options:', error),
        });
   
      this.vehiculosUsadosAdaptadosService
        .getProductoOptions()
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (data) => {
            this.productoOpciones = data.options;
            this.tramite130109Store.actualizarEstado({
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
    manejarlaFilaSeleccionada(filasSeleccionadas: PartidasDeLaMercanciaModelo[]): void {
      this.filaSeleccionada = filasSeleccionadas.length
        ? filasSeleccionadas
        : [];
      if (this.filaSeleccionada) {
        this.tramite130109Store.actualizarEstado({filaSeleccionada:this.filaSeleccionada});
      }
    }
  /**
   * Método para obtener los datos de la tabla dinámica.
   * Este método realiza una solicitud al servicio `vehiculosUsadosAdaptadosService` para obtener los datos
   * de la tabla y actualiza las propiedades relacionadas con la tabla dinámica.
   * 
   * - Actualiza `tableBodyData` con los datos obtenidos.
   * - Asigna valores a las propiedades `cantidad` y `descripcion` del primer elemento de la tabla.
   * - Actualiza el formulario `formForTotalCount` con los valores totales de cantidad y valor en USD.
   * 
   */
    obtenerTablaDatos(): void {
        this.vehiculosUsadosAdaptadosService.getTablaDatos().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
          this.tableBodyData = data;
          this.formForTotalCount.patchValue({
            cantidadTotal:data[0].cantidad,
            valorTotalUSD:data[0].totalUSD
          });
        });
    }
   
    /**
     * validarYEnviarFormulario
     * Valida el formulario y muestra la tabla dinámica si es válido.
     */
    validarYEnviarFormulario(): void {
  ['cantidad', 'valorFacturaUSD'].forEach(controlName => {
    const CONTROL = this.mercanciaForm.get(controlName);
    if (CONTROL) {
      CONTROL.markAsTouched();
      CONTROL.updateValueAndValidity();
    }
  });
  
  if (this.mercanciaForm.get('cantidad')?.invalid ||
    this.mercanciaForm.get('valorFacturaUSD')?.invalid
  ) {
    this.mostrarErroresMercancia = true;
    this.mostrarErroresPartidas = false;
    return;
  }
  this.mostrarErroresMercancia = false;
  [
    'cantidadPartidasDeLaMercancia',
    'valorPartidaUSDPartidasDeLaMercancia',
    'descripcionPartidasDeLaMercancia'
  ].forEach(controlName => {
    const CONTROL = this.partidasDelaMercanciaForm.get(controlName);
    if (CONTROL) {
      CONTROL.markAsTouched();
      CONTROL.updateValueAndValidity();
    }
  });
  if (
    this.partidasDelaMercanciaForm.get('cantidadPartidasDeLaMercancia')?.invalid ||
    this.partidasDelaMercanciaForm.get('valorPartidaUSDPartidasDeLaMercancia')?.invalid ||
    this.partidasDelaMercanciaForm.get('descripcionPartidasDeLaMercancia')?.invalid
  ) {
    this.mostrarErroresPartidas = true;
    return;
  }
    // Si fracción no tiene valor, mostrar popup y detener flujo
  if (!this.mercanciaForm.get('fraccion')?.value) {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'info',
      modo: '',
      titulo: '',
      mensaje: 'Debes seleccionar una Fracción arancelaria',
      cerrar: true,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
      tamanioModal: 'modal-sm'
    };
    this.mostrarNotificacion = true;
    return;
  }
  this.mostrarErroresPartidas = false;
  this.mostrarTabla = true;
  this.tramite130109Store.actualizarEstado({ mostrarTabla: true });
}

   
    /**
     * navegarParaModificarPartida
     * Navega para modificar una partida específica y actualiza el estado global.
     */
    navegarParaModificarPartida(): void {
      if (this.filaSeleccionada) {
        this.tramite130109Store.actualizarEstado({mostrarTabla:true});
        this.tramite130109Store.actualizarEstado({filaSeleccionada:this.filaSeleccionada});
      }
    }
  /**
   * Método para obtener la lista de entidades federativas.
   */
  fetchEntidadFederativa(): void {
    this.vehiculosUsadosAdaptadosService
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
    this.vehiculosUsadosAdaptadosService
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
    this.vehiculosUsadosAdaptadosService
      .getListaDePaisesDisponibles()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.elementosDeBloque = data;
      });
  }
  /**
  * Método para obtener la lista de países por bloque.
  * Identificador del bloque.
  */
  fetchPaisesPorBloque(_bloqueId: number): void {
    this.vehiculosUsadosAdaptadosService
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
  * Identificador del bloque seleccionado.
  */
  enCambioDeBloque(bloqueId: number): void {
    this.fetchPaisesPorBloque(bloqueId);
  }
    /**
     * jest.spyOnActualiza el almacén con nuevos valores basados en eventos de formulario.
     * jest.spyOnEvento que incluye el formulario, el campo y el método a ejecutar.
     */
  setValoresStore($event: { form: FormGroup; campo: string }): void {
  const VALOR = $event.form.get($event.campo)?.value;

  if ($event.campo === 'regimen') {
    this.formDelTramite.get('clasificacion')?.setValue('');
    this.mostrarErrorClasificacion = false;
    this.tramite130109Store.actualizarEstado({
      [ $event.campo ]: VALOR,
      clasificacion: ''
    });
  } else {
    this.tramite130109Store.actualizarEstado({ [ $event.campo ]: VALOR });
    if ($event.campo === 'clasificacion' && VALOR) {
      this.mostrarErrorClasificacion = true;
    }
  }

  if ($event.campo === 'fraccion') {
    this.tramite130109Store.actualizarEstado({'unidadMedida': '1'});
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
     * jest.spyOnCiclo de vida de Angular: limpia las suscripciones al destruir el componente.
     */
    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }

    /**
     * Valida que un número tenga como máximo tres decimales.
     */
    static validarNumeroTresDecimales(control: AbstractControl): ValidationErrors | null {
      const VALOR = control.value;
      if (VALOR === null || VALOR === undefined || VALOR === '') { return null; }

      if (!/^\d+(\.\d+)?$/.test(VALOR)) {
        return { noEsNumero: true };
      }

      if (/^\d+\.\d{4,}$/.test(VALOR)) {
        return { maximoTresDecimales: true };
      }

      return null;
    }

    /**
     * Valida que un string no contenga el carácter de ángulo derecho (›).
     */
    static validarSinCaracterAnguloDerecho(control: AbstractControl): ValidationErrors | null {
      if (typeof control.value === 'string' && control.value.includes('›')) {
        return { validarSinCaracterAnguloDerecho: true };
      }
      return null;
    }

     /*
    Valida que un número tenga como máximo 14 enteros y 3 decimales.
    */
    static validarCatorceEnterosTresDecimales(control: AbstractControl): ValidationErrors | null {
      const VALOR = control.value;
        if (VALOR === null || VALOR === undefined || VALOR === '') { return null; }

        if (!/^\d*\.?\d*$/.test(VALOR)) {
          return { noEsNumero: true };
        }

        if (!/^\d{1,14}(\.\d{1,3})?$/.test(VALOR)) {
          return { validarCatorceEnterosTresDecimales: true };
        }

        return null;
    }
}
   