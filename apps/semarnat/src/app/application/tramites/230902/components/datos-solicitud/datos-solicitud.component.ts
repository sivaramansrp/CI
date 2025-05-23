import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ALERTA_MERCANCIA } from '../../enum/mercancia-alert.enum';
import { AQUANDAS_LABEL } from '../../enum/adnuana-botons.enum';
import { CROSSLIST_BOTONS } from '../../enum/crossList-botons.enum';

import { Subject, takeUntil } from 'rxjs';
import { CONFIGURACION_TABLA_MERCANCIA } from '../../enum/mercancia.enum';
import { ConfiguracionItem } from '../../enum/mercancia.enum';

import { CrosslistBoton } from '../../enum/crossList-botons.enum';
import { MOVIMIENTO_LABEL } from '../../enum/movimiento.enum';

import { Catalogo, CategoriaMensaje, ConfiguracionColumna, CrossListLable, CrosslistComponent, Notificacion, REGEX_SEPARADO_POR_COMAS, TablaSeleccion, TipoNotificacionEnum } from '@libs/shared/data-access-user/src';

import { PermisoCitesService } from '../../services/permiso-cites.service';

import { Solicitud230902State, Tramite230902Store } from '../../estados/tramite230902.store';
import { Tramite230902Query } from '../../estados/tramite230902.query';






/**
 * Componente para gestionar los datos de la solicitud.
 * Este componente permite la gestión de formularios, tablas y datos relacionados con la solicitud.
 * 
 * Métodos:
 * - ngOnInit: Inicializa el componente y configura las suscripciones necesarias.
 * - crearFormularioSolicitud: Crea y configura el formulario para los datos de la solicitud.
 * - resetSolicitudForm: Resetea el formulario de solicitud.
 * - createNewMercanciaItem: Crea y configura el formulario para los datos de mercancía.
 * - cambiarTipoDeMovimiento: Maneja el cambio en el tipo de movimiento seleccionado.
 * - updateFilaSeleccionada: Actualiza la fila seleccionada en la tabla.
 * - modficarMercanciaItem: Modifica un elemento de mercancía en la tabla.
 * - esInvalido: Verifica si un control del formulario es inválido.
 * - onTipoRegimenChange: Maneja el cambio en el tipo de régimen seleccionado.
 * - hadleFilaSeleccionada: Maneja la fila seleccionada en la tabla de mercancías.
 * - alternarVisibilidadModalMercancia: Alterna la visibilidad del modal de datos de mercancía.
 * - mostrarFormularioMercanciaModal: Muestra el formulario de mercancía en un modal.
 * - enviarFormularioMercancia: Envía el formulario de mercancía y agrega los datos a la tabla.
 * - ngOnDestroy: Limpia las suscripciones cuando el componente se destruye.
 */
@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrls: ['./datos-solicitud.component.scss'],
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Referencia al componente Crosslist.
   * Se utiliza para interactuar con el componente Crosslist desde este componente.
   */
  @ViewChild(CrosslistComponent) crosslistComponent!: CrosslistComponent;

  /**
   * Botones para la lista cruzada.
   * Contiene las configuraciones de los botones utilizados en la lista cruzada.
   */
  crossListBotons!: CrosslistBoton[];

  /**
   * Botones para el movimiento.
   * Configuración de los botones relacionados con los movimientos.
   */
  movimientoBotons!: CrosslistBoton[];

  /**
   * Botones para las aduanas.
   * Configuración de los botones relacionados con las aduanas.
   */
  aduanasBotons!: CrosslistBoton[];

  /**
   * Formulario de solicitud.
   * Contiene los datos y validaciones del formulario de solicitud.
   */
  formSolicitud!: FormGroup;

  /**
   * Formulario de mercancía.
   * Contiene los datos y validaciones del formulario de mercancía.
   */
  formMercancia!: FormGroup;

  /**
   * Tipo de movimiento seleccionado.
   * Representa el tipo de movimiento actualmente seleccionado en el formulario.
   */
  tipoMovimientoSeleccionada!: number;

  /**
   * Indica si se ha seleccionado otra fracción.
   * Se utiliza para habilitar o deshabilitar campos relacionados con fracciones.
   */
  otraFraccionSeleccionada!: boolean;

  /**
   * Estado de la solicitud 230902.
   * Contiene el estado actual de la solicitud.
   */
  solicitud230902State!: Solicitud230902State;

  /**
   * Etiqueta de Aquaandas.
   * Configuración de la etiqueta utilizada en la lista cruzada de Aquaandas.
   */
  aquandasLabel: CrossListLable = AQUANDAS_LABEL;

  /**
   * Lista original de aduanas.
   * Contiene las aduanas disponibles antes de realizar selecciones.
   */
  listaOriginalAduanas: string[] = [];

  /**
   * Lista seleccionada de aduanas.
   * Contiene las aduanas seleccionadas por el usuario.
   */
  listaSeleccionadaAduanas: string[] = [];

  /**
   * Etiqueta de movimiento.
   * Configuración de la etiqueta utilizada en la lista cruzada de movimientos.
   */
  movimientoLabel: CrossListLable = MOVIMIENTO_LABEL;

  /**
   * Configuración de la tabla de mercancías.
   * Define las columnas y configuraciones de la tabla de mercancías.
   */
  configuracionTabla: ConfiguracionColumna<ConfiguracionItem>[] = CONFIGURACION_TABLA_MERCANCIA;

  /**
   * Mensaje de alerta relacionado con la mercancía.
   * Se muestra cuando ocurre un error o advertencia relacionada con la mercancía.
   */
  public alert_message: string = ALERTA_MERCANCIA;

  /**
   * Lista original de movimientos.
   * Contiene los movimientos disponibles antes de realizar selecciones.
   */
  listaOriginalMovimiento: string[] = [];

  /**
   * Lista seleccionada de movimientos.
   * Contiene los movimientos seleccionados por el usuario.
   */
  listSeleccionadaMovimiento: string[] = [];

  /**
   * Tipo de selección de la tabla.
   * Define el tipo de selección que se puede realizar en la tabla.
   */
  tablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Indica si se ha seleccionado un archivo.
   * Se utiliza para rastrear el estado de la selección de archivos en el componente.
   */
  isFileSelected: boolean = false;
 
  /**
   * Método para cargar los datos de la tabla.
   * Realiza una solicitud al servicio para obtener los datos de la tabla.
   */
  listaFilaSeleccionadaMercancia!: ConfiguracionItem[];
  /**
   * Método para cargar los datos de la tabla.
   * Realiza una solicitud al servicio para obtener los datos de la tabla.
   */
  cargarDatosTabla(): void {
    this.permisoCitesService.loadTablaDatos().pipe(takeUntil(this.destroyed$)).subscribe((state) => {
      this.tablaDatos = state;
    });
  }

  /**
   * Datos de la tabla de mercancías.
   * Contiene las filas de datos que se muestran en la tabla de mercancías.
   */
  tablaDatos: ConfiguracionItem[] = [];

  /**
   * Fila seleccionada en la tabla de mercancías.
   * Representa la fila actualmente seleccionada por el usuario.
   */
  filaSeleccionada!: ConfiguracionItem;

  /**
   * Indica si se debe mostrar el modal de datos de mercancía.
   * Controla la visibilidad del modal de datos de mercancía.
   */
  showDatosMercanciaModal: boolean = false;
  

  
  /**
   * Observable utilizado para manejar la destrucción del componente y evitar fugas de memoria.
   * Se utiliza para cancelar suscripciones activas cuando el componente se destruye.
   */
  private destroyed$ = new Subject<void>();

  
  /**
   * Indica si la operación actual es una actualización.
   * Se utiliza para diferenciar entre crear un nuevo elemento y actualizar uno existente.
   */
  esOperacionDeActualizacion: boolean = false;
  
  /**
   * Indica si el botón "Modificar" está habilitado.
   * Se utiliza para controlar la disponibilidad del botón de modificación.
   */
  enableModficarBoton: boolean = false;

  /**
   * Indica si el botón "Eliminar" está habilitado.
   * Se utiliza para controlar la disponibilidad del botón de eliminación.
   */
  enableEliminarBoton: boolean = false;

  /**
   * Indica si el popup de selección múltiple está abierto.
   * Controla la visibilidad del popup de selección múltiple.
   */
  multipleSeleccionPopupAbierto: boolean = false;

  /**
   * Indica si el popup está cerrado.
   */
  multipleSeleccionPopupCerrado:boolean = true;
  /**
   * Indica si el popup de confirmación para eliminar está abierto.
   * Controla la visibilidad del popup de confirmación para eliminar elementos.
   */
  confirmEliminarPopupAbierto: boolean = false;

  /**
   * Indica si el popup de selección múltiple está cerrado.
   * Controla el estado del cierre del popup de selección múltiple.
   */
  confirmEliminarPopupCerrado: boolean = true;
  modal: string = '';
  tituloModal!: string;
  mensajeModal!: string;
  public nuevaNotificacion!: Notificacion;
  /**
   * Constructor del componente.
   * Inicializa los servicios y dependencias necesarias para la gestión de datos y formularios.
   */
  constructor(
    public permisoCitesService: PermisoCitesService,
    private tramite230902Store: Tramite230902Store,
    private tramite230902Query: Tramite230902Query,
    public formBuilder: FormBuilder
  ) {
    // Initialize any required properties or call necessary methods here
    // Removed console.log to avoid unexpected console statement error
  }

  /**
   * Inicializa el componente.
   * Configura los formularios, datos iniciales y suscripciones necesarias.
   */
  ngOnInit(): void {
    this.permisoCitesService.inicializaDatosSolicitudDatosCatalogos();
    this.crossListBotons = CROSSLIST_BOTONS(this.crosslistComponent);
    this.movimientoBotons = this.crossListBotons;
    this.aduanasBotons = this.crossListBotons;

    this.tramite230902Query.selectSolicitud$
      .pipe(takeUntil(this.destroyed$)).subscribe((state) => {
        this.solicitud230902State = state;
      });

    this.crearFormularioSolicitud();
    this.cambiarTipoDeMovimiento();
    this.cargarDatosTabla();
  }

  /**
   * Crea y configura el formulario para los datos de la solicitud.
   * Define los campos y validaciones necesarias.
   */
  crearFormularioSolicitud(): void {
    this.formSolicitud = this.formBuilder.group({
      tipodeMovimiento: [this.solicitud230902State.tipodeMovimiento, Validators.required],
      tipoRegimen: [this.solicitud230902State.tipoRegimen, Validators.required],
    });
  }
  
  /**
   * Crea y configura el formulario para los datos de mercancía.
   * Define los campos y validaciones necesarias. Recibe datos iniciales opcionales.
   */
  crearNuevoFormularioMercancia(data?: ConfiguracionItem): void {
    const DEFAULT_DATA: ConfiguracionItem = {
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

    this.formMercancia = this.formBuilder.group({
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

    if (this.formMercancia.get('otraFraccion')?.value) {
      this.otraFraccionSeleccionada = true;
    }
    this.formMercancia.get('fraccionDescripcion')?.disable();
   
  }
  
  /**
   * Maneja el cambio en el campo "otraFracción".
   * Si el campo está seleccionado, agrega un control adicional al formulario
   * y reinicia los valores relacionados con la fracción arancelaria.
   * Si no está seleccionado, elimina el control adicional.
   */
  manejarCambioOtraFraccion(): void {
    const CHECKED = this.formMercancia.get('otraFraccion')?.value;
    if (CHECKED) {
      this.formMercancia.addControl(
        'fraccionVigenteTIGIE',
        this.formBuilder.control('')
      );
      this.formMercancia.get('fraccionArancelaria')?.setValue('0');
      this.formMercancia
        .get('fraccionDescripcion')
        ?.reset();
      this.otraFraccionSeleccionada = true;
    } else {
      this.otraFraccionSeleccionada = false;
      this.formMercancia.removeControl('fraccionVigenteTIGIE');
    }
  }

  /**
   * Maneja el cambio en el tipo de movimiento seleccionado.
   * Actualiza el estado y los botones relacionados con el movimiento.
   */
  cambiarTipoDeMovimiento(): void {
    const TIPO_DE_MOVIMIENTO = this.formSolicitud.get('tipodeMovimiento')?.value;
    this.tramite230902Store.establecerDatos({ tipodeMovimiento: TIPO_DE_MOVIMIENTO });
    if (TIPO_DE_MOVIMIENTO === '1') {
      this.aduanasBotons = this.crossListBotons.slice(1);
    } else {
      this.aduanasBotons = this.crossListBotons;
    }
    this.tipoMovimientoSeleccionada = parseInt(TIPO_DE_MOVIMIENTO, 10);
  }

  /**
   * Actualiza la fila seleccionada en la tabla.
   * Sincroniza los datos de la fila seleccionada con el formulario.
   */
  updateFilaSeleccionada(): void {
    const UPDATED_DATA = this.tablaDatos.find(
      (item) => item.id === this.filaSeleccionada.id
    );

    if (UPDATED_DATA) {
      this.filaSeleccionada = { ...UPDATED_DATA };
    }
  }

 
 
  /**
   * Verifica si un control del formulario es inválido.
   * Devuelve verdadero si el control es inválido y ha sido tocado o modificado.
   * 
   * @param formControlName Nombre del control en el formulario.
   */
  esInvalido(formControlName: string): boolean {
    const CONTROL = this.formMercancia.get(formControlName);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Maneja la fila seleccionada en la tabla de mercancías.
   * Actualiza el formulario con los datos de la fila seleccionada.
   *
   * @param fila Fila seleccionada en la tabla.
   */
  hadleFilaSeleccionada(fila: ConfiguracionItem[]): void {
    this.listaFilaSeleccionadaMercancia = fila;
    if (fila.length === 0) {
      this.enableModficarBoton = false;
      this.enableEliminarBoton = false;
      return;
    }
    this.filaSeleccionada = fila[fila.length - 1];
    this.enableModficarBoton = true;
    this.enableEliminarBoton = true;
  }
 
 
  /**
   * Modifica un elemento de mercancía en la tabla.
   * Actualiza los datos del formulario con los valores de la fila seleccionada.
   */
  modficarMercanciaItem(): void {
   
     if (this.listaFilaSeleccionadaMercancia.length < 2) {
      
       const GET_INDEX = (array: Catalogo[], value: string): number =>
         array.findIndex((item) => item.descripcion === value) + 1;
       
       this.updateFilaSeleccionada();
       this.esOperacionDeActualizacion = true;
       const FRACCION_DESCRIPCION =
         this.permisoCitesService.fraccionArancelariaDescripcion.find((item)=>Number(item.id) === Number(this.filaSeleccionada.fraccionArancelaria))?.descripcion || '';
 
         const MERCANCIA_CONFIGURACION_ITEM: ConfiguracionItem = {
         id: this.filaSeleccionada.id,
         fraccionArancelaria: GET_INDEX(
           this.permisoCitesService.fraccionArancelaria,
           this.filaSeleccionada.fraccionArancelaria
         ).toString(),
         fraccionDescripcion:FRACCION_DESCRIPCION,
         otraFraccion: this.filaSeleccionada.otraFraccion,
         descripcion: this.filaSeleccionada.descripcion,
         rendimientoProducto: this.filaSeleccionada.rendimientoProducto,
         clasificacionTaxonomica: GET_INDEX(
           this.permisoCitesService.clasificacionTaxonomica,
           this.filaSeleccionada.clasificacionTaxonomica
         ).toString(),
         nombreCientifico: GET_INDEX(
           this.permisoCitesService.nombreCientifico,
           this.filaSeleccionada.nombreCientifico
         ).toString(),
         nombreComun: GET_INDEX(
           this.permisoCitesService.nombreComun,
           this.filaSeleccionada.nombreComun
         ).toString(),
         marca: this.filaSeleccionada.marca,
         cantidad: this.filaSeleccionada.cantidad,
         unidadMedida: GET_INDEX(
           this.permisoCitesService.unidadMedida,
           this.filaSeleccionada.unidadMedida
         ).toString(),
         paisOrigen: GET_INDEX(
           this.permisoCitesService.paisOrigen,
           this.filaSeleccionada.paisOrigen
         ).toString(),
         paisProcedencia: GET_INDEX(
           this.permisoCitesService.paisProcedencia,
           this.filaSeleccionada.paisProcedencia
         ).toString(),
       };
 
       this.crearNuevoFormularioMercancia(MERCANCIA_CONFIGURACION_ITEM);
       this.alternarVisibilidadModalMercancia();
     } else {
      this.abrirMultipleSeleccionPopup();
     }
  }

  /**
   * Abre el popup de selección múltiple.
   * Muestra un mensaje de error si se seleccionan múltiples registros para modificar.
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
   * Elimina los elementos seleccionados de la tabla de mercancías.
   * Actualiza el estado global con los datos restantes.
   */
  eliminarMercanciaItem():void{
    const IDS_TO_DELETE = this.listaFilaSeleccionadaMercancia.map(item => item.id);
  
    this.tablaDatos = this.tablaDatos.filter(
      item => !IDS_TO_DELETE.includes(item.id)
    );
  
    this.listaFilaSeleccionadaMercancia = [];
    this.tramite230902Store.setMercanciaTablaDatos(this.tablaDatos);
    this.cerrarEliminarConfirmationPopup()
  } 
   
  /**
   * Abre el popup de confirmación para eliminar elementos.
   * Muestra un mensaje de confirmación antes de eliminar los registros seleccionados.
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
   * Cierra el popup de confirmación para eliminar elementos.
   */
  cerrarEliminarConfirmationPopup(): void {
    this.confirmEliminarPopupAbierto = false;
    this.confirmEliminarPopupCerrado = false;
  }

  /**
   * Confirma la eliminación de los elementos seleccionados.
   * Abre el popup de confirmación si hay elementos seleccionados.
   */
  confirmEliminarMercanciaItem(): void {
    if (this.listaFilaSeleccionadaMercancia.length === 0) {
      return;
    }
    this.abrirElimninarConfirmationopup();
  }

  /**
   * Alterna la visibilidad del modal de datos de mercancía.
   * Muestra u oculta el modal según el estado actual.
   */
  alternarVisibilidadModalMercancia(): void {
    this.showDatosMercanciaModal = !this.showDatosMercanciaModal;
  }

  /**
   * Muestra el formulario de mercancía en un modal.
   * Inicializa los datos necesarios para el formulario.
   */
  mostrarformMercanciaModal(): void {
    this.esOperacionDeActualizacion = false;
    this.permisoCitesService.inicializaMercanciaDatosCatalogos();
    this.crearNuevoFormularioMercancia();
    this.alternarVisibilidadModalMercancia();
  }

  /**
   * Maneja el cambio en la fracción arancelaria seleccionada.
   * Actualiza la descripción de la fracción en el formulario.
   * 
   * @param $event Evento que contiene la fracción seleccionada.
   */
  manejarCambioFraccionArancelaria($event: Catalogo): void {
    const FRACCION_DESCRIPCION =
      this.permisoCitesService.fraccionArancelariaDescripcion.find(
        (item) => Number(item.id) === Number($event.descripcion)
      );
    this.formMercancia
      .get('fraccionDescripcion')
      ?.setValue(FRACCION_DESCRIPCION?.descripcion);
  }

  /**
   * Envía el formulario de mercancía y agrega los datos a la tabla.
   * Valida el formulario antes de agregar los datos.
   */
  enviarFormularioMercancia(): void {
    if (this.formMercancia.invalid || (!this.otraFraccionSeleccionada && this.formMercancia.get('fraccionArancelaria')?.value === '0')) {
      return;
    }
      const GET_DESCRIPTION = (array: Catalogo[], index: number): string => array[index - 1]?.descripcion || '';
  
    const TABLA_ROW: ConfiguracionItem = {
      id: this.esOperacionDeActualizacion
        ? this.formMercancia.get('id')?.value
        : this.tablaDatos.length + 1,
      fraccionArancelaria: GET_DESCRIPTION(
        this.permisoCitesService.fraccionArancelaria,
        this.formMercancia.get('fraccionArancelaria')?.value
      ),
      fraccionDescripcion: this.formMercancia.get('fraccionDescripcion')?.value,
      otraFraccion: this.formMercancia.get('otraFraccion')?.value,
      descripcion: this.formMercancia.get('descripcion')?.value,
      rendimientoProducto: this.formMercancia.get('rendimientoProducto')?.value,
      clasificacionTaxonomica: GET_DESCRIPTION(
        this.permisoCitesService.clasificacionTaxonomica,
       this.formMercancia.get('clasificacionTaxonomica')?.value
      ),
      nombreCientifico: GET_DESCRIPTION(
        this.permisoCitesService.nombreCientifico,
        this.formMercancia.get('nombreCientifico')?.value
      ),
      nombreComun: GET_DESCRIPTION(
        this.permisoCitesService.nombreComun,
        this.formMercancia.get('nombreComun')?.value
      ),
      marca: this.formMercancia.get('marca')?.value,
      cantidad: this.formMercancia.get('cantidad')?.value,
      unidadMedida: GET_DESCRIPTION(
        this.permisoCitesService.unidadMedida,
        this.formMercancia.get('unidadMedida')?.value
      ),
      paisOrigen: GET_DESCRIPTION(
        this.permisoCitesService.paisOrigen,
        this.formMercancia.get('paisOrigen')?.value
      ),
      paisProcedencia: GET_DESCRIPTION(
        this.permisoCitesService.paisProcedencia,
        this.formMercancia.get('paisProcedencia')?.value
      ),
    };
  
    const EXISTING_INDEX = this.tablaDatos.findIndex(item => item.id === TABLA_ROW.id);
  
    if (EXISTING_INDEX > -1) {
      this.tablaDatos[EXISTING_INDEX] = TABLA_ROW;
    } else {
      this.tablaDatos = [...this.tablaDatos, TABLA_ROW];
    }
  
    this.tramite230902Store.setMercanciaTablaDatos(this.tablaDatos);
    this.formMercancia.reset();
    this.alternarVisibilidadModalMercancia();
  }
 
  /**
   * Método setValoresStore
   * Descripción: Actualiza un valor específico en el store utilizando el método correspondiente.
   * Parámetros:
   *   - form: Formulario reactivo que contiene los datos.
   *   - campo: Nombre del campo cuyo valor se actualizará en el store.
   *   - metodoNombre: Nombre del método del store que se utilizará para actualizar el valor.
   */
    setValoresStore(form: FormGroup, campo: string): void {
      const VALOR = form.get(campo)?.value;
      this.tramite230902Store.establecerDatos({ [campo]: VALOR });
    }

  /**
   * Limpia las suscripciones cuando el componente se destruye.
   * Evita fugas de memoria al completar el Subject.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}