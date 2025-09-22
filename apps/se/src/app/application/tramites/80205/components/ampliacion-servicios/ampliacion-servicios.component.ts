import {
  CONFIGURACION_DOMICILIOS,
  CONFIGURACION_SERVICIO_IMMEX,
} from '../../constantes/modificacion.enum';
import {
  
  Catalogo,
  CatalogoSelectComponent,
  CatalogoServices,
  CategoriaMensaje,
  ConsultaioQuery,
  FormularioDinamico,
  TablaDinamicaComponent,
  TablaSeleccion,
  TipoNotificacionEnum,
} from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Input, OnDestroy, OnInit } from '@angular/core';
import {
  Servicio,
  ServicioInmex,
  Servicios,
} from '../../models/datos-info.model';
import { Subject,Subscription,map,takeUntil} from 'rxjs';
import { AmpliacionServiciosQuery } from '../../estados/tramite80205.query';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { AmpliacionServiciosState } from '../../estados/tramite80205.store';
import { AmpliacionServiciosStore } from '../../estados/tramite80205.store';
import { ApiResponse } from '../../models/datos-info.model';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '../../models/configuracion-columna.model';
import { HttpClient } from '@angular/common/http';
import { Notificacion } from '@ng-mf/data-access-user';
import { NotificacionesComponent } from '@ng-mf/data-access-user';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'app-ampliacion-servicios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CatalogoSelectComponent,
    FormsModule,
    TablaDinamicaComponent,
    NotificacionesComponent,
    
  ],
  templateUrl: './ampliacion-servicios.component.html',
  styleUrl: './ampliacion-servicios.component.scss',
})
export class AmpliacionServiciosComponent implements OnInit, OnDestroy {

  /**
   * Lista de identificadores de mercancías seleccionadas.
   *
   * Este arreglo almacena los IDs de las mercancías que el usuario ha elegido,
   * ya sea para registrar, modificar o visualizar en el contexto del formulario.
   *
   * @type {number[]}
   */
  mercanciasSeleccionados: number[] = [];
  /**
   * 
   * Lista de identificadores de la segunda tabla seleccionados.
   * Este arreglo almacena los IDs de los elementos que el usuario ha elegido
   */

  tablaDosSeleccionados: number[] = [];

  /**
   * Referencia a la tabla dinámica A.
   * @property {TablaDinamicaComponent<any>} tablaA
   */
  @ViewChild('tablaA') tablaA!: TablaDinamicaComponent<any>;
  /**
   * Referencia a la tabla dinámica B.
   * @property {TablaDinamicaComponent<any>} tablaB
   */
@ViewChild('tablaB') tablaB!: TablaDinamicaComponent<any>;
/**
 * Referencia a la tabla dinámica C.
 * @property {TablaDinamicaComponent<any>} tablaC
 */
@ViewChild('tablaC') tablaC!: TablaDinamicaComponent<any>;
  /**
   * Índice de la pestaña.
   * @property {number} tabindex
   */
  @Input() tabindex!: number;
  /**
   * Suscripción para manejar observables.
   * @property {Subscription} subscription
   */
  private subscription: Subscription = new Subscription();

  /**
   * Formulario principal del componente.
   * @property {FormGroup} formulario
   */
  formulario: FormGroup;

  /**
   * Tipo de persona seleccionada.
   * @property {number} tipoPersona
   */
  tipoPersona!: number;

  /**
   * Lista de campos dinámicos para el formulario de domicilio fiscal.
   * @property {FormularioDinamico[]} domicilioFiscal
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Servicios disponibles en el dropdown.
   * @property {string} serviciosDropDown
   */
  serviciosDropDown: string = '';

  /**
   * Datos recibidos desde un componente hijo.
   * @property {Servicio[]} recibioDatos
   */
  recibioDatos: Servicio[] = [];

  /**
   * Formulario para la información de registro.
   * @property {FormGroup} formularioInfoRegistro
   */
  formularioInfoRegistro!: FormGroup;

  /**
   * Tipo de selección en la tabla.
   * @property {TablaSeleccion} tablaSeleccion
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * RFC de la empresa.
   * @property {string} rfcEmpresa
   */
  rfcEmpresa: string = '';

  
  tramiteState: AmpliacionServiciosState = {} as AmpliacionServiciosState;

  /**
   * Número del programa IMMEX.
   * @property {string} numeroPrograma
   */
  numeroPrograma: string = '';

  /**
   * Tiempo del programa IMMEX.
   * @property {string} tiempoPrograma
   */
  tiempoPrograma: string = '';

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 
  
  /**
   * Indica si el campo debe ser deshabilitado.
   * @property {boolean} campoDeshabilitar
   */
  campoDeshabilitar:boolean= false;

  /**
   * Configuración de columnas para la tabla de domicilios.
   * @property {ConfiguracionColumna<ServicioInmex>[]} configuracionTabla
   */
  configuracionTabla: ConfiguracionColumna<ServicioInmex>[] =
    CONFIGURACION_DOMICILIOS;

  /**
   * Configuración de columnas para la tabla de servicios IMMEX.
   * @property {ConfiguracionColumna<Servicio>[]} configuracionTablaServicio
   */
  configuracionTablaServicio: ConfiguracionColumna<Servicio>[] =
    CONFIGURACION_SERVICIO_IMMEX;

  /**
   * Datos de empresas nacionales.
   * @property {ServicioInmex[]} datos
   */
  datos: ServicioInmex[] = [];

  /**
   * Datos de servicios IMMEX.
   * @property {Servicio[]} datosImmex
   */
  datosImmex: Servicio[] = [];

  datosAutorizados:Servicio[]=[];

   /**
     * @public
     * @property {Notificacion} nuevaNotificacion
     * @description Representa una nueva notificación que se utilizará en el componente.
     * @command Este campo debe ser inicializado antes de su uso.
     */
   public nuevaNotificacion!: Notificacion;

  /**
   * Domicilios seleccionados.
   * @property {Servicio[]} domiciliosSeleccionados
   */
  domiciliosSeleccionados: Servicio[] = [];
 /**
  * Autorizados seleccionados.
  * @property {Servicio[]} autorizadosSeleccionados
  */
  autorizadosSeleccionados: Servicio[] = [];

  /**
   * Empresas seleccionadas.
   * @property {ServicioInmex[]} empresasSeleccionados
   */
  empresasSeleccionados: ServicioInmex[] = [];

  /**
   * Formulario auxiliar.
   * @property {FormGroup} forma
   */
  forma!: FormGroup;

  /**
 * @property {boolean} esHabilitarElDialogo
 * Indica si el diálogo de confirmación para agregar servicios está habilitado y visible.
 */

  esHabilitarElDialogo: boolean = false;
  /**
   * Indica si el diálogo de confirmación para eliminar servicios está habilitado y visible.
   * @property {boolean} esEliminar
   */
  esEliminar: boolean = false;
  /**
   * Indica si el diálogo de confirmación para eliminar empresas nacionales está habilitado y visible.
   * @property {boolean} esEliminar
   */

  esAgregarDos: boolean = false;

  /**
   * Indica si el diálogo de confirmación para eliminar empresas nacionales está habilitado y visible.
   * @property {boolean} esEliminar
   */

  esEliminarDos: boolean = false;
  /**
   * Indica si se han recibido datos de respuesta.
   * @property {boolean} esDatosRespuesta
   */

  rowNotSeleccionada: boolean = false;

  /**
   * Indica si se han recibido datos de respuesta.
   * @property {boolean} esDatosRespuesta
   * */

  noRowSelected: boolean = false;

   /**
   * Indica si se han recibido datos de respuesta.
   * @property {boolean} esDatosRespuesta
   * */
   noRowSelectedTablaC: boolean = false;


  /**
   * Lista de aduanas de ingreso.
   * @property {Catalogo[]} aduanaDeIngreso
   */
  aduanaDeIngreso!: Catalogo[];
  /**
   * Valor predeterminado para la selección de aduanas.
   * @property {number} predeterminado
   */
  predeterminado=-1;

  /**
   * Datos del cuerpo de autorizados.
   * @property {[]} autorizadosBodyData
   */
  autorizadosBodyData: [] = [];

  /**
   * Información del registro de servicios.
   * @property {Servicios} infoRegistro
   */
  infoRegistro!: Servicios;
  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  
  tramiteID:string='80205';

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {AmpliacionServiciosService} ampliacionServiciosService - Servicio para obtener datos de ampliación de servicios.
   * @param {HttpClient} httpServicios - Servicio HTTP para realizar peticiones.
   */
  constructor(
    private fb: FormBuilder,
    private ampliacionServiciosService: AmpliacionServiciosService,
    private catalogoServices: CatalogoServices,
    private ampliacionServiciosQuery: AmpliacionServiciosQuery,
    private ampliacionServiciosStore: AmpliacionServiciosStore,
    private readonly httpServicios: HttpClient,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      ).subscribe();
    
    
    /**
     * Inicializa el formulario principal del componente con los campos necesarios.
     * @method inicializarFormularioPrincipal
     */
    this.formulario = this.fb.group({
      entidadFederativa: [{ value:this.tramiteState.aduanaDeIngresoSelecion}, Validators.required],
    });
    /**
     * Suscripción al observable `selectAduanaDeIngresoSelecion$` del query `ampliacionServiciosQuery`.
     *
     * Este observable emite la aduana de ingreso seleccionada, y al recibir un valor válido,
     * se actualiza el campo `entidadFederativa` del formulario con el `id` de la aduana.
     *
     * Además, se actualiza el estado global `formValida` en el store `ampliacionServiciosStore`,
     * indicando si el campo `entidadFederativa` es válido dentro del formulario.
     *
     * @observable selectAduanaDeIngresoSelecion$
     * @returns {void}
     */
    this.ampliacionServiciosQuery.selectAduanaDeIngresoSelecion$
      .pipe()
      .subscribe((aduanaDeIngresoSelecion) => {
        if (aduanaDeIngresoSelecion) {
          this.formulario.patchValue({
            entidadFederativa: aduanaDeIngresoSelecion.id,
          });
        }
        this.ampliacionServiciosStore.setFormValida({
          entidadFederativa: this.formulario.valid,
        });
      });
  }

  
  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormularioInfoRegistro();
    }  
    
  }

  /**
   * Método de inicialización del componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.obtenerIngresoSelectList(this.tramiteID);
    this.getDatos();
    this.suscribirseADatosImmex();
    this.suscribirseADatos();
    this.suscribirseAFields();
    this.getTablaDatos();
    

  }
  /**
   * Maneja los cambios en los campos de entrada y actualiza el estado correspondiente
   * en el store de ampliación de servicios.
   *
   * @param fieldName - El nombre del campo que ha cambiado.
   * @param newValue - El nuevo valor asignado al campo.
   */
  enCambioDeCampo(fieldName: string, newValue: string): void {
    switch (fieldName) {
      case 'rfcEmpresa':
        this.ampliacionServiciosStore.setRfcEmpresa(newValue);
        break;
      case 'numeroPrograma':
        this.ampliacionServiciosStore.setNumeroPrograma(newValue);
        break;
      case 'tiempoPrograma':
        this.ampliacionServiciosStore.setTiempoPrograma(newValue);
        break;
      default:
        break;
    }
  }

  /**
   * Obtiene los datos del servicio.
   * @method getDatos
   */
  suscribirseADatos(): void {
    this.subscription.add(
      this.ampliacionServiciosQuery.selectDatos$.subscribe((datos) => {
        this.datos = datos; // Update local `datos` array when store data changes
      })
    );
  }
 /**
  * Actualiza el grid de empresas nacionales.
  * @method actualizaGridEmpresasNacionales
  * 
  * @return {void}
  */
  getTablaDatos(): void {
    this.subscription.add(
      this.ampliacionServiciosService.getTablaDatos().subscribe((data) => {
        const DATOS = data as Servicio[];
        this.datosAutorizados = DATOS;
      })

    )}

    /**
   * Método para cerrar el modal de confirmación.
   * @returns {void}
   */
  cerrarModal(): void {
   
    this.esHabilitarElDialogo = false;
  }
  /**
   * Método para cerrar el modal de eliminación.
   * @param {boolean} evento - Indica si se debe proceder con la eliminación.
   * @return {void}
   */
  cerrarModalEliminar(evento:boolean): void {
    if(evento===true){
    this.eliminarServiciosGrid();
    }
    this.esEliminar=false;
  }
/**
 * Actualiza el grid de empresas nacionales.
 * @method actualizaGridEmpresasNacionales
 * @return {void}
 * 
 */
  cerrarModalAgregar(): void {
    this.actualizaGridEmpresasNacionales();
    this.esAgregarDos=false;
  }

  /**
   * Elimina las empresas nacionales seleccionadas del grid.
   * @method eliminarEmpresasNacionales
   * @return {void}
   */

  cerrarEliminarDos(evento:boolean): void {
    if(evento===true){
    this.eliminarEmpresasNacionales();}
    this.esEliminarDos=false;
    
  }
  /**
   * Elimina las empresas nacionales seleccionadas del grid.
   * @method eliminarEmpresasNacionales
   * @return {void}
   */
  cerrarNoRow(): void {
    this.noRowSelected=false;
  }
  /**
   * Cierra la notificación de fila no seleccionada.
   * @method cerrarNotSeleccainda
   * @return {void}
   * 
   */
  cerrarNotSeleccainda(): void {
    
    this.rowNotSeleccionada=false;
  }

  /**
   * Suscribe a los campos seleccionados del estado de `ampliacionServiciosQuery`
   * y actualiza las propiedades locales del componente con los valores obtenidos.
   *
   * @remarks
   * Este método agrega una suscripción al objeto `subscription` del componente,
   * lo que asegura que los valores de `rfcEmpresa`, `numeroPrograma` y `tiempoPrograma`
   * se mantengan sincronizados con el estado de la consulta.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  suscribirseAFields(): void {
    this.subscription.add(
      this.ampliacionServiciosQuery
        .select((state) => ({
          rfcEmpresa: state.rfcEmpresa,
          numeroPrograma: state.numeroPrograma,
          tiempoPrograma: state.tiempoPrograma,
        }))
        .subscribe((fields) => {
          this.rfcEmpresa = fields.rfcEmpresa;
          this.numeroPrograma = fields.numeroPrograma;
          this.tiempoPrograma = fields.tiempoPrograma;
        })
    );
  }

  /**
   * Obtiene los datos necesarios desde el servicio `ampliacionServiciosService`
   * y los almacena en el store `ampliacionServiciosStore`. Además, inicializa
   * el formulario con la información obtenida del store.
   *
   * @remarks
   * - Suscribe al observable proporcionado por `getDatos` del servicio.
   * - Convierte la respuesta en un objeto de tipo `ApiResponse`.
   * - Almacena la información de servicios en el store mediante `setInfoRegistro`.
   * - Llama a `initializeFormFromStore` para inicializar el formulario con los datos del store.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  getDatos(): void {
    this.subscription.add(
      this.ampliacionServiciosService.getDatos().subscribe((respuesta) => {
        const RESPONSE = respuesta as unknown as ApiResponse;
        if (RESPONSE) {
          this.ampliacionServiciosStore.setInfoRegistro(RESPONSE.infoServicios);
          this.initializeFormFromStore();
        }
      })
    );
  }
  /**
   * Se suscribe al observable `selectDatosImmex$` del store para obtener los datos de IMMEX
   * de forma reactiva y mantener el componente actualizado con los cambios.
   *
   * @remarks
   * Este método actualiza la variable local `datosImmex` con los datos más recientes
   * proporcionados por el store.
   */
  suscribirseADatosImmex(): void {
    /**
     * @method suscribirseADatosImmex
     * @description
     * Se suscribe al observable `selectDatosImmex$` del store para obtener los datos de servicios IMMEX
     * de forma reactiva y mantener el componente actualizado con los cambios en el estado.
     *
     * @remarks
     * Este método actualiza la variable local `datosImmex` con los datos más recientes proporcionados por el store.
     *
     * @returns {void} Este método no retorna ningún valor.
     */
    this.ampliacionServiciosQuery.selectDatosImmex$.subscribe((datosImmex) => {
      this.datosImmex = datosImmex;
    });
  }
  /**
   * Inicializa el formulario `formularioInfoRegistro` con los datos obtenidos del store.
   *
   * Este método se suscribe al observable `selectInfoRegistro$` del query `ampliacionServiciosQuery`.
   * Cuando se emiten datos desde el store, se crea un formulario reactivo (`FormGroup`) con los valores
   * proporcionados y los campos se configuran como deshabilitados.
   *
   * @remarks
   * - Los campos inicializados en el formulario son:
   *   - `seleccionaLaModalidad`: Modalidad seleccionada, deshabilitada.
   *   - `folio`: Folio del registro, deshabilitado.
   *   - `ano`: Año del registro, deshabilitado.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  initializeFormFromStore(): void {
    /**
     * @property {FormGroup} formularioInfoRegistro
     * @description
     * Inicializa un formulario reactivo con los campos correspondientes a la información del registro.
     *
     * Los campos del formulario son:
     * - `seleccionaLaModalidad`: Campo deshabilitado que contiene la modalidad seleccionada.
     * - `folio`: Campo deshabilitado que contiene el folio del registro.
     * - `ano`: Campo deshabilitado que contiene el año del registro.
     *
     * @example
     * this.formularioInfoRegistro = this.fb.group({
     *   seleccionaLaModalidad: [{ value: infoRegistro.seleccionaLaModalidad, disabled: true }],
     *   folio: [{ value: infoRegistro.folio, disabled: true }],
     *   ano: [{ value: infoRegistro.ano, disabled: true }],
     * });
     */
    this.ampliacionServiciosQuery.selectInfoRegistro$.subscribe(
      (infoRegistro) => {
        this.formularioInfoRegistro = this.fb.group({
          seleccionaLaModalidad: [
            { value: infoRegistro.seleccionaLaModalidad, disabled: true },
          ],
          folio: [{ value: infoRegistro.folio, disabled: true }],
          ano: [{ value: infoRegistro.ano, disabled: true }],
        });
      }
    );
  }

  /**
   * @method inicializarFormularioInfoRegistro
   * @description
   * Inicializa el formulario `formularioInfoRegistro` con campos deshabilitados y valores vacíos.
   * Este formulario se utiliza para capturar y mostrar información relacionada con el registro.
   *
   * @remarks
   * Los campos inicializados en el formulario son:
   * - `seleccionaLaModalidad`: Campo deshabilitado que representa la modalidad seleccionada.
   * - `folio`: Campo deshabilitado que representa el folio del registro.
   * - `ano`: Campo deshabilitado que representa el año del registro.
   *
   * @returns {void} Este método no retorna ningún valor.
   *
   * @example
   * this.inicializarFormularioInfoRegistro();
   */
  inicializarFormularioInfoRegistro(): void {
    this.formularioInfoRegistro = this.fb.group({
      seleccionaLaModalidad: [{ value: '', disabled: true }],
      folio: [{ value: '', disabled: true }],
      ano: [{ value: '', disabled: true }],
    });
  }

  /**
   * Crea un formulario vacío con dos grupos de formularios, datosGenerales y domicilioFiscal.
   * @method crearFormulario
   */

  /**
   * Obtiene la lista de selección de ingreso.
   * @method obtenerIngresoSelectList
   */
  obtenerIngresoSelectList(tramite:string): void {
    /**
     * Obtiene la lista de selección de ingreso desde el servicio `ampliacionServiciosService`
     * y actualiza el estado global con los datos obtenidos.
     *
     * @method obtenerIngresoSelectList
     * @returns {void} Este método no retorna ningún valor.
     */
    this.subscription.add(
      this.catalogoServices
        .immexCatalogo(tramite)
        .subscribe((data) => {
          const DATOS = data.datos as Catalogo[];

          // Actualiza el estado global con la lista de aduanas de ingreso.
          this.ampliacionServiciosStore.setAduanaDeIngreso(DATOS);

          // Suscribe al observable para mantener actualizada la lista local de aduanas.
          this.ampliacionServiciosQuery.selectAduanaDeIngreso$.subscribe(
            (aduanaDeIngreso) => {
              this.aduanaDeIngreso = aduanaDeIngreso;
            }
          );
        })
    );
  }
  
  /**
   * Guarda los datos del formulario y actualiza el estado del componente.
   * Si el formulario está en modo solo lectura, deshabilita los campos.
   * Si no, habilita los campos para permitir la edición.
   *
   * @method guardarDatosFormulario
   * @returns {void} Este método no retorna ningún valor.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormularioInfoRegistro();
    if (this.esFormularioSoloLectura) {
      this.campoDeshabilitar=true;
    } else {
      this.campoDeshabilitar=false;
    }

}

  /**
   * Elimina servicios del grid.
   * @method eliminarServiciosGrid
   */
  eliminarServiciosGrid(): void {
    const INDICE = this.datosImmex.findIndex(
      (item: Servicio) =>
        item.id ===
        this.domiciliosSeleccionados[0]?.['id']
    );
    if (INDICE !== -1) {
      const DATOS_IMMEX_ACTUALIZADOS = [...this.datosImmex];
      DATOS_IMMEX_ACTUALIZADOS.splice(INDICE, 1);
      this.ampliacionServiciosStore.setDatosImmex(DATOS_IMMEX_ACTUALIZADOS);
      this.domiciliosSeleccionados = [];
      this.tablaA?.clearSelection();
     
    }
  }
  /**
   * Elimina las empresas nacionales seleccionadas del grid.
   * @method eliminarEmpresasNacionales
   * @return {void}
   */
  cerrarNoRowTablaC(): void {
    this.noRowSelectedTablaC=false;
  }
  /**
   * Muestra una notificación de confirmación al intentar agregar un servicio duplicado.
   * @method doConfirmAgregar
   * @returns {void} Este método no retorna ningún valor.
   */
 
  doConfirmAgregar(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ALERTA,
      modo: 'modal',
      titulo: '',
      mensaje: 'El servicio que intenta ingresar ya ha sido registrado anteriormente.',
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.esHabilitarElDialogo = true;
  }
 /**
  * Muestra una notificación de confirmación al intentar eliminar un servicio.
  * @method doConfirmEliminar
  * @return {void} Este método no retorna ningún valor.
  */
  doConfirmEliminar(): void {
    if(this.domiciliosSeleccionados[0]?.id===undefined || this.domiciliosSeleccionados.length === 0){
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'modal',
        titulo: '',
        mensaje: 'Debe seleccionar el Servicio que desea eliminar',
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.noRowSelected = true;

    }
    else{
    this.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ALERTA,
      modo: 'modal',
      titulo: '',
      mensaje: '¿Esta seguro de eliminar el(los) servicio(s) seleccionado(s)?',
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
    this.esEliminar = true;}}
  /**
   * Muestra una notificación de confirmación al intentar agregar un servicio.
   * @method doAgregarDos
   * @return {void} Este método no retorna ningún valor.
   *  
   * */
    doAgregarDos(): void {
      if((this.domiciliosSeleccionados.length===0 &&this.autorizadosSeleccionados.length===0)|| (this.domiciliosSeleccionados[0]?.id===undefined&&this.autorizadosSeleccionados[0]?.id===undefined)){
        this.nuevaNotificacion = {
          tipoNotificacion: TipoNotificacionEnum.ALERTA,
          categoria: CategoriaMensaje.ALERTA,
          modo: 'modal',
          titulo: '',
          mensaje: 'Debe seleccionar un Servicio.',
          cerrar: false,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        };
        this.rowNotSeleccionada = true;
      } else{
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'modal',
        titulo: '',
        mensaje: '¿La empresa a otorgar servicios no tiene un programa IMMEX vigente.',
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.esAgregarDos = true;
    }
    }
    /**
     * Muestra una notificación de confirmación al intentar eliminar un servicio.
     * @method doEliminarDos
     * @return {void} Este método no retorna ningún valor.
     * */
    doEliminarDos(): void {
      if(this.empresasSeleccionados.length===0){
        this.nuevaNotificacion = {
          tipoNotificacion: TipoNotificacionEnum.ALERTA,
          categoria: CategoriaMensaje.ALERTA,
          modo: 'modal',
          titulo: '',
          mensaje: 'Selecciona un registro.',
          cerrar: false,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        };
        this.noRowSelectedTablaC = true;

      }
      else{
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'modal',
        titulo: '',
        mensaje: '¿Está seguro de eliminar el servicio seleccionado?',
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: 'Cancelar',
      };
      this.esEliminarDos = true;}}
    

 /**
   * Agrega servicios a la ampliación.
   * @method agregarServiciosAmpliacion
   */

  agregarServiciosAmpliacion(): void {
    const DESCRIPCION = this.recibioDatos[0]?.descripcion;
    const TIPODE = this.recibioDatos[0]?.tipode;
    const ID=this.recibioDatos[0]?.id;
  
    if (!DESCRIPCION || !TIPODE || DESCRIPCION === '-1' || TIPODE=== '-1') {
      return;
    }
  
    const CUERPODATOS = {
      descripiónDelServicio: DESCRIPCION,
      tipode: TIPODE,
      id:ID
    };

    const ISDUPLICATE = this.datosImmex.some(item => item.id === ID);
    if (ISDUPLICATE) {
      this.doConfirmAgregar();
      return; 
    }
  
    this.ampliacionServiciosStore.setDatosImmex([
      ...this.datosImmex,
      CUERPODATOS,
    ]);
    
  }
  

  /**
   * Elimina empresas nacionales.
   * @method eliminarEmpresasNacionales
   */
  eliminarEmpresasNacionales(): void {
    const INDICE = this.datos.findIndex(
      (item: ServicioInmex) =>
        item.RegistroContribuyentes ===
        this.empresasSeleccionados[0]?.RegistroContribuyentes
    );
    if (INDICE !== -1) {
      const DATOSACTUALIZADOS = [...this.datos];
      DATOSACTUALIZADOS.splice(INDICE, 1);
      this.ampliacionServiciosStore.setDatos(DATOSACTUALIZADOS);
      this.empresasSeleccionados = [];
      this.tablaC?.clearSelection();
    }
    
  }

  /**
   * Actualiza el grid de empresas nacionales.
   * @method actualizaGridEmpresasNacionales
   */
  actualizaGridEmpresasNacionales(): void {
    if (
      !this.rfcEmpresa?.trim() ||
      !this.numeroPrograma?.trim() ||
      !this.tiempoPrograma?.trim()
    ) {
      return; 
    }

    const SERVICIO_DATOS=(this.domiciliosSeleccionados[0]?.descripiónDelServicio!==undefined)?this.domiciliosSeleccionados[0]?.descripiónDelServicio:this.autorizadosSeleccionados[0]?.descripiónDelServicio;
    const DENOMINACION_DATOS=(this.domiciliosSeleccionados[0]?.tipode!==undefined)?this.domiciliosSeleccionados[0]?.tipode:this.autorizadosSeleccionados[0]?.tipode;
  
    const CUERPODATOS = {
      Servicio: SERVICIO_DATOS,
      RegistroContribuyentes: this.rfcEmpresa,
      DenominaciónSocial:DENOMINACION_DATOS,
      NumeroIMMEX: this.numeroPrograma,
      AñoIMMEX: this.tiempoPrograma,
    };
  
    const DATOSACTUALIZADOS = [...this.datos, CUERPODATOS];
    this.ampliacionServiciosStore.setDatos(DATOSACTUALIZADOS);  

    this.rfcEmpresa = '';
    this.numeroPrograma = '';
    this.tiempoPrograma = '';
  
    this.ampliacionServiciosStore.setCamposEmpresa(
      this.rfcEmpresa,
      this.numeroPrograma,
      this.tiempoPrograma
    );
  }
  

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Maneja los datos recibidos del componente hijo. 
   * @method procesarDatosDelHijo
   * @param {any} data - Datos recibidos.
   */
  procesarDatosDelHijo(): void {
    const SELECTED_DATOS= this.aduanaDeIngreso.find(item => item.id === this.formulario.value.entidadFederativa);
    const SERVICIO = (SELECTED_DATOS as any)?.tipode;
    const DATOS={id: this.formulario.value.entidadFederativa,descripcion:SELECTED_DATOS?.descripcion};
    this.recibioDatos= [{ descripcion:SELECTED_DATOS?.descripcion, tipode:SERVICIO,id:this.formulario.value.entidadFederativa}];
    this.ampliacionServiciosStore.setAduanaDeIngresoSeleccion(DATOS as Catalogo);
  }

  /**
   * Selecciona domicilios.
   * @method seleccionarDomicilios
   * @param {any} domicilios - Domicilios seleccionados.
   */
  seleccionarDomicilios(domicilios: Servicio): void {
    this.domiciliosSeleccionados = [{ ...domicilios }];
    this.mercanciasSeleccionados = [domicilios.id as number];
    this.tablaB?.clearSelection();
  }
  /**
   * Selecciona autorizados.
   * @method seleccionarAutorizados
   * @param {any} autorizados - Autorizados seleccionados.
   */

  seleccionarAutorizados(autorizados: Servicio): void {
    this.autorizadosSeleccionados= [{ ...autorizados }];
    this.tablaDosSeleccionados = [autorizados.id as number];
    this.tablaA?.clearSelection();
  }

  /**
   * Selecciona empresas.
   * @method seleccionarEmpresas
   * @param {any} empresas - Empresas seleccionadas.
   */
  seleccionarEmpresas(empresas: ServicioInmex): void {
    this.empresasSeleccionados = [{ ...empresas }];
  }
}
