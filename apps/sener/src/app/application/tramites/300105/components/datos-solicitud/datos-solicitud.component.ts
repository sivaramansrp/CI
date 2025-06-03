import {
  Catalogo,
  CategoriaMensaje,
  ConfiguracionColumna,
  ConsultaioQuery,
  CrosslistComponent,
  Notificacion,
  TablaSeleccion,
  TipoNotificacionEnum,
} from '@ng-mf/data-access-user';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ConfiguracionItem,
  SERIE_TABLA_CONFIGURACION,
  SerieConfiguracionItem,
  TABLA_CONFIGURACION,
} from '../../enum/mercancia-tabla.enum';
import {
  CrosslistBoton,
  OBTENER_BOTONES_CROSSLIST,
} from '../../enum/botons.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import {
  Tramite300105State,
  Tramite300105Store,
} from '../../estados/tramite300105.store';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';
import { Tramite300105Query } from '../../estados/tramite300105.query';

/*
 * Componente que gestiona los datos de la solicitud, incluyendo la configuración de formularios,
 * tablas dinámicas y la interacción con servicios relacionados con autorizaciones de vida silvestre.
 */
@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrls: ['./datos-solicitud.component.scss'],
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  /** 
  * Tipo de operación recibida como entrada desde el componente padre. 
  */
  @Input() tipoOperacionSeleccionado!: string | number;
  /**
   * Referencia al componente Crosslist para gestionar listas dinámicas.
   */
  @ViewChild(CrosslistComponent) crosslistComponent!: CrosslistComponent;

  /**
   * Formulario reactivo para los datos de la solicitud.
   */
  formularioSolicitud!: FormGroup;

  /**
   * Formulario reactivo para los datos de la mercancía.
   */
  formularioMercancia!: FormGroup;

  /**
   * Indica si se seleccionó otra fracción en el formulario de mercancía.
   */
  otraFraccionSeleccionada!: boolean;

  /**
   * Estado actual de la solicitud.
   */
  estadoSolicitud300105!: Tramite300105State;

  /**
   * Botones configurados para la lista dinámica de aduanas.
   */
  botonesAduanas!: CrosslistBoton[];

  /**
   * Lista original de aduanas disponibles.
   */
  listaOriginalAduanas: string[] = [];

  /**
   * Lista de aduanas seleccionadas.
   */
  listaSeleccionadaAduanas: string[] = [];

  /**
   * Botones configurados para la lista dinámica de movimientos.
   */
  botonesMovimientos!: CrosslistBoton[];

  /**
   * Lista original de movimientos disponibles.
   */
  listaOriginalMovimientos: string[] = [];

  /**
   * Lista de movimientos seleccionados.
   */
  listSeleccionadaMovimientos: string[] = [];

  /**
   * Configuración de las columnas para la tabla.
   */
  configuracionTabla: ConfiguracionColumna<ConfiguracionItem>[] =
    TABLA_CONFIGURACION;

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 

  /**
   * Configuración de las columnas para la tabla de series.
   * Esta propiedad define la configuración de las columnas que se utilizarán
   * en la tabla de series dentro del componente de datos de solicitud.
   */
  serieTabla: ConfiguracionColumna<SerieConfiguracionItem>[] =
  SERIE_TABLA_CONFIGURACION;

  /**
   * Tipo de selección para la tabla dinámica.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Datos de la tabla de mercancías.
   */
  datosTablaMercancia!: ConfiguracionItem[];

  /**
   * Datos de la tabla de mercancías para la selección múltiple.
   */
  datosSerieTablaMercancia!: SerieConfiguracionItem[];

  /**
   * Fila seleccionada en la tabla de mercancías.
   */
  filaSeleccionadaMercancia!: ConfiguracionItem;

  /**
   * Lista de filas seleccionadas en la tabla de mercancías.
   */
  listaFilaSeleccionadaMercancia!: ConfiguracionItem[];

  /**
   * Indica si un archivo está seleccionado.
   */
  enableModficarBoton: boolean = false;

  /**
   * Indica si se debe mostrar el modal de datos de mercancía.
   */
  mostrarModalDatosMercancia: boolean = false;

  /**
   * Indica si se debe mostrar el popup de selección múltiple.
   */
  mostrarPopupSeleccionMultiple: boolean = false;
  /**
   * Indica si el popup está abierto.
   */
  multipleSeleccionPopupAbierto: boolean = false;

  /**
   * Indica si el popup está cerrado.
   */
  multipleSeleccionPopupCerrado: boolean = true;

  /**
   * Indica si el popup está abierto.
   */
  confirmEliminarPopupAbierto: boolean = false;

  /**
   * Indica si el popup está cerrado.
   */
  confirmEliminarPopupCerrado: boolean = true;

  /**
   * Indica si el popup de serie agregada está abierto.
   */
  serieAgregadaPopupAbierto: boolean = false;

  /**
   * Indica si el popup de mercancía agregada está abierto.
   */
  mercanciaAgregadaPopupAbierto: boolean = false;

  /**
   * Indica si el botón de eliminar está habilitado.
   */
  enableEliminarBoton: boolean = false;

  /**
   * Notificación que se muestra al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Observable para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();


  /**
   * Indica si se está realizando una operación de actualización.
   */
  esOperacionDeActualizacion: boolean = false;

  /**
   * Constructor del componente.
   * autorizacionDeRayosXService Servicio para manejar datos relacionados con autorizaciones de vida silvestre.
   * tramite300105Store Almacén de estado para el trámite 300105.
   * tramite300105Query Consulta de estado para el trámite 300105.
   * formBuilder Constructor de formularios reactivos.
   */
  constructor(
    public autorizacionDeRayosXService: AutorizacionDeRayosXService,
    private tramite300105Store: Tramite300105Store,
    private tramite300105Query: Tramite300105Query,
    private formBuilder: FormBuilder,
    private consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.notificadorDestruccion$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly || true;
      })
    )
    .subscribe()
  }

  /**
   * Método del ciclo de vida de Angu131lar que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.tramite300105Query.selectTramite300105$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((state) => {
        this.estadoSolicitud300105 = state;
      });

    this.botonesMovimientos = OBTENER_BOTONES_CROSSLIST(
      this.crosslistComponent
    );

    this.datosTablaMercancia = this.estadoSolicitud300105.mercanciaTablaDatos;

    this.formularioSolicitud = this.formBuilder.group({
      observaciones: [this.estadoSolicitud300105.observaciones, Validators.maxLength(500)],
    });

    if(this.esFormularioSoloLectura){
      this.formularioSolicitud.disable();
    };
  }

   /**
   * Método para guardar el valor de observaciones en el store.
   */
   guardarObservaciones(): void {
    const observaciones = this.formularioSolicitud.get('observaciones')?.value;
    this.tramite300105Store.establecerDatos({observaciones}); 
  }

  /**
   * Método para inicializar el formulario de la solicitud.
   * Crea un nuevo formulario reactivo con los campos necesarios.
   */
  crearNuevoFormularioMercancia(data?: ConfiguracionItem): void {
    const DATOS_PREDETERMINADOS: ConfiguracionItem = {
      id: 0,
      marca: '',
      modelo: '',
      serie: '',
      voltaje: '',
      unidadMedidaVoltaje: '',
      corriente: '',
      unidadMedidaCorriente: '',
      numEquipos: '',
      fraccionArancelaria: '',
      fraccionDescripcion: '',
      ...data,
    };

    this.formularioMercancia = this.formBuilder.group({
      id: [DATOS_PREDETERMINADOS.id],
      marca: [DATOS_PREDETERMINADOS.marca, [Validators.required, Validators.maxLength(50)]],
      modelo: [DATOS_PREDETERMINADOS.modelo, [Validators.required, Validators.maxLength(100)]],
      serie: [DATOS_PREDETERMINADOS.serie, [Validators.required, Validators.maxLength(150)]],
      voltaje: [DATOS_PREDETERMINADOS.voltaje, [Validators.required, Validators.maxLength(11)]],
      unidadMedidaVoltaje: [DATOS_PREDETERMINADOS.unidadMedidaVoltaje, Validators.required],
      corriente: [DATOS_PREDETERMINADOS.corriente, [Validators.required, Validators.maxLength(11)]],
      unidadMedidaCorriente: [DATOS_PREDETERMINADOS.unidadMedidaCorriente, Validators.required],
      numEquipos: [DATOS_PREDETERMINADOS.numEquipos, [Validators.required, Validators.maxLength(2)]],
      fraccionArancelaria: [DATOS_PREDETERMINADOS.fraccionArancelaria, Validators.required],
      fraccionDescripcion: [DATOS_PREDETERMINADOS.fraccionDescripcion, Validators.required],
    });
    this.formularioMercancia.get('fraccionDescripcion')?.disable();
  }

  /**
   * Maneja el cambio en la fracción arancelaria seleccionada.
   * $event Evento que contiene la información de la fracción arancelaria seleccionada.
   */
  manejarCambioFraccionArancelaria($event: Catalogo): void {
    const FRACCION_DESCRIPCION =
      this.autorizacionDeRayosXService.fraccionArancelariaDescripcion.find(
        (item) => Number(item.id) === Number($event.descripcion)
      );
    this.formularioMercancia
      .get('fraccionDescripcion')
      ?.setValue(FRACCION_DESCRIPCION?.descripcion);
  }

  /**
   * Maneja la fila seleccionada en la tabla de mercancías.
   * fila Fila seleccionada.
   */
  manejarFilaSeleccionada(fila: ConfiguracionItem[]): void {
    if (fila.length === 0) {
      this.enableModficarBoton = false;
      this.enableEliminarBoton = false;
      return;
    }
    this.listaFilaSeleccionadaMercancia = fila;
    this.filaSeleccionadaMercancia = fila[fila.length - 1];
    this.enableModficarBoton = true;
    this.enableEliminarBoton = true;
  }

  /**
   * Actualiza la fila seleccionada con los datos más recientes de la tabla.
   */
  actualizarFilaSeleccionada(): void {
    const DATOS_ACTUALIZADOS = this.datosTablaMercancia.find(
      (item) => item.id === this.filaSeleccionadaMercancia.id
    );

    if (DATOS_ACTUALIZADOS) {
      this.filaSeleccionadaMercancia = { ...DATOS_ACTUALIZADOS };
    }
  }

  /**
   * Modifica los datos de una fila seleccionada en la tabla de mercancías.
   * Actualiza el formulario de mercancía con los datos de la fila seleccionada
   * y abre el modal para editar los datos.
   */
  modificarItemMercancia(): void {
    if (this.listaFilaSeleccionadaMercancia.length < 2) {
      const OBTENER_INDICE = (array: Catalogo[], value: string): number =>
        array.findIndex((item) => item.descripcion === value) + 1;
      
      this.actualizarFilaSeleccionada();
      this.esOperacionDeActualizacion = true;
      const FRACCION_DESCRIPCION =
        this.autorizacionDeRayosXService.fraccionArancelariaDescripcion.find((item)=>Number(item.id) === Number(this.filaSeleccionadaMercancia.fraccionArancelaria))?.descripcion || '';

        const MERCANCIA_CONFIGURACION_ITEM: ConfiguracionItem = {
        id: this.filaSeleccionadaMercancia.id,
        marca: this.filaSeleccionadaMercancia.marca,
        modelo: this.filaSeleccionadaMercancia.modelo,
        serie: this.filaSeleccionadaMercancia.serie,
        voltaje: this.filaSeleccionadaMercancia.voltaje,
        unidadMedidaVoltaje: OBTENER_INDICE(
          this.autorizacionDeRayosXService.unidadMedidaVoltaje,
          this.filaSeleccionadaMercancia.unidadMedidaVoltaje
        ).toString(),
        corriente: this.filaSeleccionadaMercancia.corriente,
        unidadMedidaCorriente: OBTENER_INDICE(
          this.autorizacionDeRayosXService.unidadMedidaCorriente,
          this.filaSeleccionadaMercancia.unidadMedidaCorriente
        ).toString(),        
        fraccionArancelaria: OBTENER_INDICE(
          this.autorizacionDeRayosXService.fraccionArancelaria,
          this.filaSeleccionadaMercancia.fraccionArancelaria
        ).toString(),
        fraccionDescripcion:FRACCION_DESCRIPCION,
        numEquipos: this.filaSeleccionadaMercancia.numEquipos, 
      };

      this.crearNuevoFormularioMercancia(MERCANCIA_CONFIGURACION_ITEM);
      this.alternarModalMercancia();
    } else {
      this.abrirMultipleSeleccionPopup();
    }
  }

  /**
   * Confirma la eliminación de los elementos seleccionados en la tabla de mercancías.
   * Si no hay elementos seleccionados, no realiza ninguna acción.
   * Si hay elementos seleccionados, abre el popup de confirmación de eliminación.
   */
  confirmEliminarMercanciaItem(): void {
    if (this.listaFilaSeleccionadaMercancia.length === 0) {
      return;
    }
    this.abrirElimninarConfirmationopup();
  }

  /**
 * Filtra y elimina los elementos seleccionados de la tabla de mercancías.
 * Actualiza el estado del almacén y cierra el popup de confirmación de eliminación.
 */
  eliminarMercanciaItem(): void {
    const IDS_TO_DELETE = this.listaFilaSeleccionadaMercancia.map(
      (item) => item.id
    );

    this.datosTablaMercancia = this.datosTablaMercancia.filter(
      (item) => !IDS_TO_DELETE.includes(item.id)
    );

    this.listaFilaSeleccionadaMercancia = [];
    this.tramite300105Store.setMercanciaTablaDatos(this.datosTablaMercancia);
    this.cerrarEliminarConfirmationPopup();
  }

  /**
   * Muestra notificación después de agregar un número de serie.
   */
  mostrarNotificacionSerieAgregada(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.EXITO,
      modo: 'modal',
      titulo: '',
      mensaje: 'Número de serie agregado',
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    this.serieAgregadaPopupAbierto = true;
  }

  /**
   * Cierra el popup de serie agregada.
   */
  cerrarSerieAgregadaPopup(): void {
    this.serieAgregadaPopupAbierto = false;
  }

  /**
   * Muestra notificación después de guardar la mercancía.
   */
  mostrarNotificacionMercanciaAgregada(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.EXITO,
      modo: 'modal',
      titulo: '',
      mensaje: 'La mercancia fue agregada correctamente.',
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    this.mercanciaAgregadaPopupAbierto = true;
  }

  /**
   * Cierra el popup de mercancía agregada.
   */
  cerrarMercanciaAgregadaPopup(): void {
    this.mercanciaAgregadaPopupAbierto = false;
    this.alternarModalMercancia();
  }
  
/**
 * Abre el popup de selección múltiple si el botón de modificar está habilitado.
 */
  abrirMultipleSeleccionPopup(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ERROR,
      modo: 'modal',
      titulo: 'Aviso',
      mensaje: 'Selecciona sólo un registro para modificar.',
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    if (this.enableModficarBoton) {
      this.multipleSeleccionPopupAbierto = true;
    }
  }

  /**
 * Cierra el popup de selección múltiple.
 */
  cerrarMultipleSeleccionPopup(): void {
    this.multipleSeleccionPopupAbierto = false;
    this.multipleSeleccionPopupCerrado = false;
  }

  /**
 * Abre el popup de confirmación de eliminación.
 */
  abrirElimninarConfirmationopup(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ERROR,
      modo: 'modal',
      titulo: 'Aviso',
      mensaje: '¿Estás seguro que deseas eliminar los registros marcados?',
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
    this.confirmEliminarPopupAbierto = true;
  }

  /**
 * Cierra el popup de confirmación de eliminación.
 */
  cerrarEliminarConfirmationPopup(): void {
    this.confirmEliminarPopupAbierto = false;
    this.confirmEliminarPopupCerrado = false;
  }

  /**
 * Alterna la visibilidad del modal de datos de mercancía.
 */
  alternarModalMercancia(): void {
    this.mostrarModalDatosMercancia = !this.mostrarModalDatosMercancia;
  }

  /**
   * Muestra el formulario de mercancía en un modal.
   */
  mostrarFormularioMercanciaModal(): void {
    this.esOperacionDeActualizacion = false;
    this.autorizacionDeRayosXService.inicializaMercanciaDatosCatalogos();
    this.crearNuevoFormularioMercancia();
    this.alternarModalMercancia();
  }

  /**
   * Valida si un control del formulario es inválido.
   * formControlName Nombre del control del formulario.
   * `true` si el control es inválido y ha sido tocado o modificado, de lo contrario `false`.
   */
  esControlInvalido(formControlName: string): boolean {
    const CONTROL = this.formularioMercancia.get(formControlName);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Envía los datos del formulario de mercancía.
   * Valida el formulario, actualiza o agrega una nueva fila en la tabla de mercancías,
   * y actualiza el estado del almacén correspondiente.
   */
  enviarFormularioMercancia(isAgregar: boolean): void {
    const OBTENER_DESCRIPCION = (array: Catalogo[], index: number): string => array[index - 1]?.descripcion || '';
  
    const TABLA_ROW: ConfiguracionItem = {
      id: this.esOperacionDeActualizacion
        ? this.formularioMercancia.get('id')?.value
        : this.datosTablaMercancia.length + 1,
      marca: this.formularioMercancia.get('marca')?.value,
      modelo: this.formularioMercancia.get('modelo')?.value,
      serie: this.formularioMercancia.get('serie')?.value,
      voltaje: this.formularioMercancia.get('voltaje')?.value,
      unidadMedidaVoltaje: OBTENER_DESCRIPCION(
        this.autorizacionDeRayosXService.unidadMedidaVoltaje,
        this.formularioMercancia.get('unidadMedidaVoltaje')?.value
      ),
      corriente: this.formularioMercancia.get('corriente')?.value,
      unidadMedidaCorriente: OBTENER_DESCRIPCION(
        this.autorizacionDeRayosXService.unidadMedidaCorriente,
        this.formularioMercancia.get('unidadMedidaCorriente')?.value
      ),
      fraccionArancelaria: OBTENER_DESCRIPCION(
        this.autorizacionDeRayosXService.fraccionArancelaria,
        this.formularioMercancia.get('fraccionArancelaria')?.value
      ),
      fraccionDescripcion: this.formularioMercancia.get('fraccionDescripcion')?.value,
      numEquipos: this.formularioMercancia.get('numEquipos')?.value,
    };
  
    const EXISTING_INDEX = this.datosTablaMercancia.findIndex(item => item.id === TABLA_ROW.id);
  
    if (EXISTING_INDEX > -1) {
      this.datosTablaMercancia[EXISTING_INDEX] = TABLA_ROW;
    } else {
      this.datosTablaMercancia = [...this.datosTablaMercancia, TABLA_ROW];
    }
    
    this.tramite300105Store.setMercanciaTablaDatos(this.datosTablaMercancia);
    this.formularioMercancia.reset();
    if (isAgregar) {
      this.mostrarNotificacionSerieAgregada();
    } else {
      this.mostrarNotificacionMercanciaAgregada();
    }
  }

  /**
   * Maneja el evento de cierre del modal de datos de mercancía.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}
