import {
  AQUANDAS_CROSSLIST_LABEL,
  MENSAJE_DE_ALERTA_MERCANCIA,
  MOVIMIENTO_CROSSLIST_LABEL,
} from '../../enum/autorizaciones.enum';
import {
  Catalogo,
  ConfiguracionColumna,
  CrossListLable,
  CrosslistComponent,
  REGEX_SEPARADO_POR_COMAS,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  CrosslistBoton,
  OBTENER_BOTONES_CROSSLIST,
} from '../../enum/crosslist-botons.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MERCANCIA_TABLA_CONFIGURACION,
  MercanciaConfiguracionItem,
} from '../../enum/mercancia-tabla.enum';
import {
  Solicitud230901State,
  Tramite230901Store,
} from '../../estados/store/tramite230901.store';
import { Subject, takeUntil } from 'rxjs';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';

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
   * Tipo de movimiento seleccionado en el formulario.
   */
  tipoMovimientoSeleccionada!: number;

  /**
   * Indica si se seleccionó otra fracción en el formulario de mercancía.
   */
  otraFraccionSeleccionada!: boolean;

  /**
   * Estado actual de la solicitud.
   */
  estadoSolicitud230901!: Solicitud230901State;

  /**
   * Etiquetas para las listas dinámicas de aduanas.
   */
  etiquetaAduanas: CrossListLable = AQUANDAS_CROSSLIST_LABEL;

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
   * Etiquetas para las listas dinámicas de movimientos.
   */
  etiquetaMovimientos: CrossListLable = MOVIMIENTO_CROSSLIST_LABEL;

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
   * Configuración de las columnas para la tabla de mercancías.
   */
  configuracionTablaMercancia: ConfiguracionColumna<MercanciaConfiguracionItem>[] =
    MERCANCIA_TABLA_CONFIGURACION;

  /**
   * Tipo de selección para la tabla dinámica.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Datos de la tabla de mercancías.
   */
  datosTablaMercancia!: MercanciaConfiguracionItem[];

  /**
   * Fila seleccionada en la tabla de mercancías.
   */
  filaSeleccionadaMercancia!: MercanciaConfiguracionItem;

  /**
   * Lista de filas seleccionadas en la tabla de mercancías.
   */
  listaFilaSeleccionadaMercancia!: MercanciaConfiguracionItem[];

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
   * Indica si el botón de eliminar está habilitado.
   */
  enableEliminarBoton: boolean = false;

  /**
   * Observable para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  /**
   * Mensaje de alerta relacionado con la mercancía.
   */
  public mensajeAlertaMercancia: string = MENSAJE_DE_ALERTA_MERCANCIA;

  /**
   * Indica si se está realizando una operación de actualización.
   */
  esOperacionDeActualizacion: boolean = false;

  /**
   * Constructor del componente.
   * autorizacionesDeVidaSilvestreService Servicio para manejar datos relacionados con autorizaciones de vida silvestre.
   * tramite230901Store Almacén de estado para el trámite 230901.
   * tramite230901Query Consulta de estado para el trámite 230901.
   * formBuilder Constructor de formularios reactivos.
   */
  constructor(
    public autorizacionesDeVidaSilvestreService: AutorizacionesDeVidaSilvestreService,
    private tramite230901Store: Tramite230901Store,
    private tramite230901Query: Tramite230901Query,
    private formBuilder: FormBuilder
  ) {
    // No se realiza ninguna acción aquí en el constructor.
  }

  /**
   * Método del ciclo de vida de Angu131lar que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.autorizacionesDeVidaSilvestreService.inicializaDatosSolicitudDatosCatalogos();

    this.tramite230901Query.selectSolicitud$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((state) => {
        this.estadoSolicitud230901 = state;
      });

    this.botonesAduanas = OBTENER_BOTONES_CROSSLIST(this.crosslistComponent);
    this.botonesMovimientos = OBTENER_BOTONES_CROSSLIST(
      this.crosslistComponent
    );

    this.crearFormularioSolicitud();
    this.manejarCambioTipoMovimiento();
    this.datosTablaMercancia = this.estadoSolicitud230901.mercanciaTablaDatos;
  }

  /**
   * Crea el formulario reactivo para los datos de la solicitud.
   */
  crearFormularioSolicitud(): void {
    this.formularioSolicitud = this.formBuilder.group({
      tipodemovimiento: [
        this.estadoSolicitud230901.tipoDeMovimiento,
        Validators.required,
      ],
      tipoderegimen: [
        this.estadoSolicitud230901.tipoDeRegimen,
        Validators.required,
      ],
    });
  }

  /**
   * Crea un nuevo formulario de mercancía con valores predeterminados o datos proporcionados.
   * Si se proporcionan datos, estos sobrescriben los valores predeterminados.
   */
  crearNuevoFormularioMercancia(data?: MercanciaConfiguracionItem): void {
    const DEFAULT_DATA: MercanciaConfiguracionItem = {
      id: 0,
      fraccionArancelaria: '',
      fraccionDescripcion: '',
      otraFraccion: false,
      descripcion: '',
      rendimientoProducto: '',
      clasificacionTaxonomica: '',
      nombreCientifico: '',
      nombreComun: '',
      marca: '',
      cantidad: '',
      unidadMedida: '',
      paisOrigen: '',
      paisProcedencia: '',
      ...data,
    };

    this.formularioMercancia = this.formBuilder.group({
      id: [DEFAULT_DATA.id],
      fraccionArancelaria: [
        DEFAULT_DATA.fraccionArancelaria,
        Validators.required,
      ],
      fraccionDescripcion: [DEFAULT_DATA.fraccionDescripcion],
      otraFraccion: [DEFAULT_DATA.otraFraccion],
      descripcion: [DEFAULT_DATA.descripcion, Validators.required],
      rendimientoProducto: [DEFAULT_DATA.rendimientoProducto],
      clasificacionTaxonomica: [
        DEFAULT_DATA.clasificacionTaxonomica,
        Validators.required,
      ],
      nombreCientifico: [DEFAULT_DATA.nombreCientifico, Validators.required],
      nombreComun: [DEFAULT_DATA.nombreComun, Validators.required],
      marca: [DEFAULT_DATA.marca, Validators.required],
      cantidad: [
        DEFAULT_DATA.cantidad,
        [Validators.required, Validators.pattern(REGEX_SEPARADO_POR_COMAS)],
      ],
      unidadMedida: [DEFAULT_DATA.unidadMedida, Validators.required],
      paisOrigen: [DEFAULT_DATA.paisOrigen, Validators.required],
      paisProcedencia: [DEFAULT_DATA.paisProcedencia, Validators.required],
    });

    if (this.formularioMercancia.get('otraFraccion')?.value) {
      this.otraFraccionSeleccionada = true;
    }
    this.formularioMercancia.get('fraccionDescripcion')?.disable();
  }

  manejarCambioOtraFraccion():void{
    const CHECKED = this.formularioMercancia.get('otraFraccion')?.value;
    if (CHECKED) {
      this.formularioMercancia.addControl(
        'fraccionVigenteTIGIE',
        this.formBuilder.control('')
      );
      this.formularioMercancia.get('fraccionArancelaria')?.setValue('0');
      this.formularioMercancia
        .get('fraccionDescripcion')
        ?.reset();
      this.otraFraccionSeleccionada = true;
    } else {
      this.otraFraccionSeleccionada = false;
      this.formularioMercancia.removeControl('fraccionVigenteTIGIE');
    }
  }

  /**
   * Maneja el cambio en la fracción arancelaria seleccionada.
   * $event Evento que contiene la información de la fracción arancelaria seleccionada.
   */
  manejarCambioFraccionArancelaria($event: Catalogo): void {
    const FRACCION_DESCRIPCION =
      this.autorizacionesDeVidaSilvestreService.fraccionArancelariaDescripcion.find(
        (item) => Number(item.id) === Number($event.descripcion)
      );
    this.formularioMercancia
      .get('fraccionDescripcion')
      ?.setValue(FRACCION_DESCRIPCION?.descripcion);
  }

  /**
   * Maneja el cambio en el tipo de movimiento seleccionado.
   */
  manejarCambioTipoMovimiento(): void {
    const TIPO_DE_MOVIMIENTO =
      this.formularioSolicitud.get('tipodemovimiento')?.value;
    this.tramite230901Store.setTipoDeMovimiento(TIPO_DE_MOVIMIENTO);
    if (TIPO_DE_MOVIMIENTO === '1') {
      this.botonesAduanas = OBTENER_BOTONES_CROSSLIST(
        this.crosslistComponent
      ).slice(1);
    } else {
      this.botonesAduanas = OBTENER_BOTONES_CROSSLIST(this.crosslistComponent);
    }
    this.tipoMovimientoSeleccionada = parseInt(TIPO_DE_MOVIMIENTO, 10);
  }

  /**
   * Maneja el cambio en el tipo de régimen seleccionado.
   */
  manejarCambioTipoRegimen(): void {
    this.tramite230901Store.setTipoDeRegimen(
      this.formularioSolicitud.get('tipoderegimen')?.value
    );
  }

  /**
   * Maneja la fila seleccionada en la tabla de mercancías.
   * fila Fila seleccionada.
   */
  manejarFilaSeleccionada(fila: MercanciaConfiguracionItem[]): void {
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
    const UPDATED_DATA = this.datosTablaMercancia.find(
      (item) => item.id === this.filaSeleccionadaMercancia.id
    );

    if (UPDATED_DATA) {
      this.filaSeleccionadaMercancia = { ...UPDATED_DATA };
    }
  }

  /**
   * Modifica los datos de una fila seleccionada en la tabla de mercancías.
   * Actualiza el formulario de mercancía con los datos de la fila seleccionada
   * y abre el modal para editar los datos.
   */
  modificarItemMercancia(): void {
    if (this.listaFilaSeleccionadaMercancia.length < 2) {
      const GET_INDEX = (array: Catalogo[], value: string): number =>
        array.findIndex((item) => item.descripcion === value) + 1;
      
      this.actualizarFilaSeleccionada();
      this.esOperacionDeActualizacion = true;
      const FRACCION_DESCRIPCION =
        this.autorizacionesDeVidaSilvestreService.fraccionArancelariaDescripcion.find((item)=>Number(item.id) === Number(this.filaSeleccionadaMercancia.fraccionArancelaria))?.descripcion || '';

        const MERCANCIA_CONFIGURACION_ITEM: MercanciaConfiguracionItem = {
        id: this.filaSeleccionadaMercancia.id,
        fraccionArancelaria: GET_INDEX(
          this.autorizacionesDeVidaSilvestreService.fraccionArancelaria,
          this.filaSeleccionadaMercancia.fraccionArancelaria
        ).toString(),
        fraccionDescripcion:FRACCION_DESCRIPCION,
        otraFraccion: this.filaSeleccionadaMercancia.otraFraccion,
        descripcion: this.filaSeleccionadaMercancia.descripcion,
        rendimientoProducto: this.filaSeleccionadaMercancia.rendimientoProducto,
        clasificacionTaxonomica: GET_INDEX(
          this.autorizacionesDeVidaSilvestreService.clasificacionTaxonomica,
          this.filaSeleccionadaMercancia.clasificacionTaxonomica
        ).toString(),
        nombreCientifico: GET_INDEX(
          this.autorizacionesDeVidaSilvestreService.nombreCientifico,
          this.filaSeleccionadaMercancia.nombreCientifico
        ).toString(),
        nombreComun: GET_INDEX(
          this.autorizacionesDeVidaSilvestreService.nombreComun,
          this.filaSeleccionadaMercancia.nombreComun
        ).toString(),
        marca: this.filaSeleccionadaMercancia.marca,
        cantidad: this.filaSeleccionadaMercancia.cantidad,
        unidadMedida: GET_INDEX(
          this.autorizacionesDeVidaSilvestreService.unidadMedida,
          this.filaSeleccionadaMercancia.unidadMedida
        ).toString(),
        paisOrigen: GET_INDEX(
          this.autorizacionesDeVidaSilvestreService.paisOrigen,
          this.filaSeleccionadaMercancia.paisOrigen
        ).toString(),
        paisProcedencia: GET_INDEX(
          this.autorizacionesDeVidaSilvestreService.paisProcedencia,
          this.filaSeleccionadaMercancia.paisProcedencia
        ).toString(),
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
    this.tramite230901Store.setMercanciaTablaDatos(this.datosTablaMercancia);
    this.cerrarEliminarConfirmationPopup();
  }

  
/**
 * Abre el popup de selección múltiple si el botón de modificar está habilitado.
 */
  abrirMultipleSeleccionPopup(): void {
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
    this.autorizacionesDeVidaSilvestreService.inicializaMercanciaDatosCatalogos();
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
  enviarFormularioMercancia(): void {
    if (this.formularioMercancia.invalid || (!this.otraFraccionSeleccionada && this.formularioMercancia.get('fraccionArancelaria')?.value === '0')) {
      return;
    }
      const GET_DESCRIPTION = (array: Catalogo[], index: number): string => array[index - 1]?.descripcion || '';
  
    const TABLA_ROW: MercanciaConfiguracionItem = {
      id: this.esOperacionDeActualizacion
        ? this.formularioMercancia.get('id')?.value
        : this.datosTablaMercancia.length + 1,
      fraccionArancelaria: GET_DESCRIPTION(
        this.autorizacionesDeVidaSilvestreService.fraccionArancelaria,
        this.formularioMercancia.get('fraccionArancelaria')?.value
      ),
      fraccionDescripcion: this.formularioMercancia.get('fraccionDescripcion')?.value,
      otraFraccion: this.formularioMercancia.get('otraFraccion')?.value,
      descripcion: this.formularioMercancia.get('descripcion')?.value,
      rendimientoProducto: this.formularioMercancia.get('rendimientoProducto')?.value,
      clasificacionTaxonomica: GET_DESCRIPTION(
        this.autorizacionesDeVidaSilvestreService.clasificacionTaxonomica,
       this.formularioMercancia.get('clasificacionTaxonomica')?.value
      ),
      nombreCientifico: GET_DESCRIPTION(
        this.autorizacionesDeVidaSilvestreService.nombreCientifico,
        this.formularioMercancia.get('nombreCientifico')?.value
      ),
      nombreComun: GET_DESCRIPTION(
        this.autorizacionesDeVidaSilvestreService.nombreComun,
        this.formularioMercancia.get('nombreComun')?.value
      ),
      marca: this.formularioMercancia.get('marca')?.value,
      cantidad: this.formularioMercancia.get('cantidad')?.value,
      unidadMedida: GET_DESCRIPTION(
        this.autorizacionesDeVidaSilvestreService.unidadMedida,
        this.formularioMercancia.get('unidadMedida')?.value
      ),
      paisOrigen: GET_DESCRIPTION(
        this.autorizacionesDeVidaSilvestreService.paisOrigen,
        this.formularioMercancia.get('paisOrigen')?.value
      ),
      paisProcedencia: GET_DESCRIPTION(
        this.autorizacionesDeVidaSilvestreService.paisProcedencia,
        this.formularioMercancia.get('paisProcedencia')?.value
      ),
    };
  
    const EXISTING_INDEX = this.datosTablaMercancia.findIndex(item => item.id === TABLA_ROW.id);
  
    if (EXISTING_INDEX > -1) {
      this.datosTablaMercancia[EXISTING_INDEX] = TABLA_ROW;
    } else {
      this.datosTablaMercancia = [...this.datosTablaMercancia, TABLA_ROW];
    }
  
    this.tramite230901Store.setMercanciaTablaDatos(this.datosTablaMercancia);
    this.formularioMercancia.reset();
    this.alternarModalMercancia();
  }

  /**
   * Maneja el evento de cierre del modal de datos de mercancía.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}
