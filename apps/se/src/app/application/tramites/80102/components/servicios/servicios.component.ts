import {
  CATALOGOS_ID,
  Catalogo,
  CatalogoSelectComponent,
  CatalogosService,
  ConsultaioQuery,
  FormularioDinamico,
  Notificacion,
  NotificacionesComponent,
  SelectPaisesComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  CONFIGURACION_DOMICILIOS,
  CONFIGURACION_EMPRESA_ECTRANJERA,
  CONFIGURACION_SERVICIO_IMMEX,
  FORMA_EMPRESA_ECTRANJERA,
} from '../../constantes/autorizacion-programa-nuevo.enum';
import {
  DatosCatalago,
  DatosEmpresaExtranjera,
  Servicio,
  ServicioInmex,
  Servicios,
} from '../../models/autorizacion-programa-nuevo.model';
import { Observable, Subject, map,takeUntil } from 'rxjs';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';

import { Input, OnDestroy, OnInit } from '@angular/core';
import { AutorizacionProgrmaNuevoService } from '../../services/autorizacion-programa-nuevo.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

const ENTIDADFEDERATIVA = 'entidadFederativaEmpresaExt';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CatalogoSelectComponent,
    FormsModule,
    TablaDinamicaComponent,
    TituloComponent,
    SelectPaisesComponent,
    NotificacionesComponent
  ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss',
  host: { hostID: crypto.randomUUID().toString() },
})
/**
 * Componente para gestionar los servicios en el trámite 80102.
 * Este componente permite visualizar y manejar los datos de los servicios, así como sus encabezados.
 *
 * @export ServiciosComponent
 */
export class ServiciosComponent implements OnInit, OnDestroy {
  /**
     * @description
     * Objeto que representa una nueva notificación para RFC.
     * Se utiliza para mostrar mensajes de alerta o información al usuario.
     */
    public nuevaNotificacionRfc!: Notificacion;

  /**
   * @description
   * Objeto que representa una notificación de confirmación para agregar servicios.
   * Se utiliza para mostrar modal de confirmación al usuario.
   */
  public notificacionAgregarServicio!: Notificacion;

  /**
   * @description
   * Bandera que indica si se debe mostrar la notificación de agregar servicio.
   */
  public mostrarNotificacionAgregar: boolean = false;

  /**
   * Índice de la pestaña.
   * @property {number} tabindex
   */
  @Input() tabindex!: number;

  /**
   * Formulario reactivo.
   * @type {FormGroup}
   */
  formulario: FormGroup;

  /**
   * Tipo de persona.
   * @type {number}
   */
  tipoPersona!: number;

  /**
   * Domicilio fiscal.
   * @type {FormularioDinamico[]}
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Servicios desplegables.
   * @type {string}
   */
  serviciosDropDown: string = '';

  /**
   * Datos recibidos del servicio.
   * @type {Servicio[]}
   */
  recibioDatos: Servicio[] = [];

  /**
   * Tabla de selección.
   * @type {TablaSeleccion}
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * RFC de la empresa.
   * @type {string}
   */
  rfcEmpresa: string = '';

  /**
   * Número del programa.
   * @type {string}
   */
  numeroPrograma: string = '';

  /**
   * Tiempo del programa.
   * @type {string}
   */
  tiempoPrograma: string = '';

  /**
   * Configuración de la tabla de domicilios.
   * @type {ConfiguracionColumna<ServicioInmex>[]}
   */
  configuracionTabla: ConfiguracionColumna<ServicioInmex>[] =
    CONFIGURACION_DOMICILIOS;

  /**
   * Configuración de la tabla de servicios.
   * @type {ConfiguracionColumna<Servicio>[]}
   */
  configuracionTablaServicio: ConfiguracionColumna<Servicio>[] =
    CONFIGURACION_SERVICIO_IMMEX;

  /**
   * Configuración de la tabla de empresas extranjeras.
   * @type {ConfiguracionColumna<DatosEmpresaExtranjera>[]}
   */
  configuracionTablaEmpresaExtranjera: ConfiguracionColumna<DatosEmpresaExtranjera>[] =
    CONFIGURACION_EMPRESA_ECTRANJERA;

  /**
   * Datos de servicios Inmex.
   * @type {ServicioInmex[]}
   */
  datos: ServicioInmex[] = [];

  /**
   * Datos de servicios Immex.
   * @type {Servicio[]}
   */
  datosImmex: Servicio[] = [];

  /**
   * Domicilios seleccionados.
   * @type {Servicio[]}
   */
  domiciliosSeleccionados: Servicio[] = [];

  /**
   * Empresas seleccionadas.
   * @type {ServicioInmex[]}
   */
  empresasSeleccionados: ServicioInmex[] = [];

  /**
   * Empresas extranjeras seleccionadas.
   * @type {DatosEmpresaExtranjera[]}
   */
  empresaExtranjeraSeleccionados: DatosEmpresaExtranjera[] = [];

  /**
   * Formulario reactivo.
   * @type {FormGroup}
   */
  forma!: FormGroup;

  /**
   * Aduanas de ingreso.
   * @type {Catalogo[]}
   */
  aduanaDeIngreso!: Catalogo[];

  /**
   * Datos del cuerpo autorizados.
   * @type {[]}
   */
  autorizadosBodyData: [] = [];

  /**
   * Información del registro de servicios.
   * @type {Servicios}
   */
  infoRegistro!: Servicios;

  /**
   * Formulario de empresa extranjera.
   * @type {FormGroup}
   */
  formularioEmpresaExtranjera!: FormGroup;

  /**
   * Campos del formulario de empresa extranjera.
   * @type {DatosCatalago[]}
   */
  camposFormulario: DatosCatalago[] = FORMA_EMPRESA_ECTRANJERA;

  /**
   * Observable de datos de empresas extranjeras.
   * @type {Observable<DatosEmpresaExtranjera[]>}
   */
  datosEmpresaExtranjera$!: Observable<DatosEmpresaExtranjera[]>;

   /**
     * Notificador utilizado para manejar la destrucción o desuscripción de observables.
     * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
     *
     * @property {Subject<void>} destroyNotifier$
     */
    private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * Cuando es verdadero, los campos del formulario no pueden ser editados por el usuario.
   */
  public esFormularioSoloLectura: boolean = false; 

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {autorizacionProgrmaNuevoService} autorizacionProgrmaNuevoService - Servicio para obtener datos de ampliación de servicios.
   * @param {HttpClient} httpServicios - Servicio HTTP para realizar peticiones.
   */
  constructor(
    private fb: FormBuilder,
    private Tramite80102Query: Tramite80102Query,
    private Tramite80102Store: Tramite80102Store,
    private readonly autorizacionProgrmaNuevoService: AutorizacionProgrmaNuevoService,
    private catalogosServices: CatalogosService, private consultaQuery: ConsultaioQuery
  ) {
    this.formulario = this.fb.group({
      entidadFederativa: ['', [Validators.required, Validators.min(0)]],
    });

    this.Tramite80102Query.selectAduanaDeIngresoSelecion$
      .pipe()
      .subscribe((aduanaDeIngresoSelecion) => {
        if (aduanaDeIngresoSelecion) {
          this.formulario.patchValue({
            entidadFederativa: aduanaDeIngresoSelecion.id,
          });
        }
        this.Tramite80102Store.setFormValida({
          servicios: this.formulario.valid,
        });
      });

    this.formularioEmpresaExtranjera = this.fb.group({
      taxIdEmpresaExt: ['', [Validators.required, Validators.maxLength(50)]],
      nombreEmpresaExt: ['', [Validators.required, Validators.maxLength(200)]],
      entidadFederativaEmpresaExt: ['', Validators.required],
      direccionEmpresaExtranjera: [
        '',
        [Validators.required, Validators.maxLength(300)],
      ],
    });

    this.datosEmpresaExtranjera$ =
      this.Tramite80102Query.selectdatosEmpresaExtranjera$;
  }

  /**
   * Método de inicialización del componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.obtenerIngresoSelectList();
    this.getDatos();
    this.suscribirseADatosImmex();
    this.suscribirseADatos();
    this.suscribirseAFields();
    this.getCatalogoPaises();
    this.consultaQuery.selectConsultaioState$
     .pipe(
       takeUntil(this.destroyNotifier$),
       map((seccionState)=>{
         this.esFormularioSoloLectura = seccionState.readonly; 
         if(this.esFormularioSoloLectura){
            this.formulario.disable();
            this.formularioEmpresaExtranjera.disable();
         }
       })
     )
     .subscribe()
  }

  /**
   * Obtiene el catálogo de países y actualiza las opciones del formulario.
   * @returns {void}
   */
  getCatalogoPaises(): void {
      this.catalogosServices
        .getCatalogoPaises(CATALOGOS_ID.CAT_PAISES)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos) => {
          const INDICE = this.camposFormulario.findIndex(
            (ele) => ele.campo === ENTIDADFEDERATIVA
          );
          this.camposFormulario[INDICE].opciones = datos;
          this.Tramite80102Store.setPaisesOrigen(datos);
        })
  }

  /**
   * Maneja el cambio de valor de un campo específico y actualiza el estado correspondiente.
   * @param {string} fieldName - El nombre del campo que ha cambiado.
   * @param {string} newValue - El nuevo valor del campo.
   * @returns {void}
   */
  enCambioDeCampo(fieldName: string, newValue: string): void {
    switch (fieldName) {
      case 'rfcEmpresa':
        this.Tramite80102Store.setRfcEmpresa(newValue);
        break;
      case 'numeroPrograma':
        this.Tramite80102Store.setNumeroPrograma(newValue);
        break;
      case 'tiempoPrograma':
        this.Tramite80102Store.setTiempoPrograma(newValue);
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
      this.Tramite80102Query.selectDatos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.datos = datos; // Update local `datos` array when store data changes
      })
  }

  /**
   * Se suscribe a los campos del estado y actualiza las propiedades correspondientes.
   * @returns {void}
   */
  suscribirseAFields(): void {
      this.Tramite80102Query.select((state) => ({
        rfcEmpresa: state.rfcEmpresa,
        numeroPrograma: state.numeroPrograma,
        tiempoPrograma: state.tiempoPrograma,
      }))
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((fields) => {
        this.rfcEmpresa = fields.rfcEmpresa;
        this.numeroPrograma = fields.numeroPrograma;
        this.tiempoPrograma = fields.tiempoPrograma;
      })
  }

  /**
   * Obtiene los datos del servicio de autorización de programa nuevo y los almacena en el store.
   * @returns {void}
   */
  getDatos(): void {
    
      this.autorizacionProgrmaNuevoService.getDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        if (respuesta) {
          this.Tramite80102Store.setInfoRegistro(respuesta);
        }
      })
    
  }

  /**
   * Se suscribe a `datosImmex` desde el store para mantener el componente actualizado de manera reactiva.
   * @returns {void}
   */
  suscribirseADatosImmex(): void {
    // Subscribe to `datosImmex` from the store to keep the component updated reactively
    this.Tramite80102Query.selectDatosImmex$.subscribe((datosImmex) => {
      this.datosImmex = datosImmex; // Update local variable with the latest data from the store
    });
  }

  /**
   * Obtiene la lista de selección de ingreso.
   * @method obtenerIngresoSelectList
   */
  obtenerIngresoSelectList(): void {
    // Fetch AduanaDeIngreso list using the service and store it in the Akita store
      this.autorizacionProgrmaNuevoService
        .obtenerIngresoSelectList()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((data) => {
          const DATOS = data as Catalogo[];

          // Set the fetched data into the store
          this.Tramite80102Store.setAduanaDeIngreso(DATOS);

          // You can also directly assign it to the component if needed, but it's better to use the store for reactivity
          this.Tramite80102Query.selectAduanaDeIngreso$.subscribe(
            (aduanaDeIngreso) => {
              this.aduanaDeIngreso = aduanaDeIngreso;
            }
          );
        })
  }

  /**
   * Elimina servicios del grid.
   * @method eliminarServiciosGrid
   */
  eliminarServiciosGrid(): void {
    const INDICE = this.datosImmex.findIndex(
      (item: Servicio) =>
        item.descripionDelServicio ===
        this.domiciliosSeleccionados[0]?.descripionDelServicio
    );
    if (INDICE !== -1) {
      const DATOS_IMMEX_ACTUALIZADOS = [...this.datosImmex];
      DATOS_IMMEX_ACTUALIZADOS.splice(INDICE, 1);
      this.Tramite80102Store.setDatosImmex(DATOS_IMMEX_ACTUALIZADOS);
    }
  }

  /**
   * Agrega servicios a la ampliación con confirmación modal.
   * @method agregarServiciosAmpliacion
   */
  agregarServiciosAmpliacion(): void {
    // Verificar si hay datos seleccionados
    if (!this.recibioDatos || this.recibioDatos.length === 0) {
      this.mostrarNotificacionError('¿Está seguro de agregar el(los) servicio(s) seleccionado(s)?');
      return;
    }

    // Mostrar modal de confirmación
    this.notificacionAgregarServicio = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: '¿Estás seguro de que quieres eliminar?',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    this.mostrarNotificacionAgregar = true;
  }

  /**
   * Maneja la confirmación del modal para agregar servicios.
   * @param {boolean} confirmado - Indica si el usuario confirmó la acción.
   * @returns {void}
   */
  confirmarAgregarServicio(confirmado: boolean): void {
    this.mostrarNotificacionAgregar = false;
    
    if (confirmado) {
      const CUERPODATOS = {
        descripionDelServicio: this.recibioDatos[0].descripcion,
        tipode: this.recibioDatos[0].tipode,
      };
      this.Tramite80102Store.setDatosImmex([...this.datosImmex, CUERPODATOS]);
      
      // Mostrar notificación de éxito
      this.mostrarNotificacionExito('Servicio agregado exitosamente.');
    }
  }

  /**
   * Muestra una notificación de éxito.
   * @param {string} mensaje - Mensaje a mostrar.
   * @returns {void}
   */
  private mostrarNotificacionExito(mensaje: string): void {
    this.nuevaNotificacionRfc = {
      tipoNotificacion: 'alert',
      categoria: 'success',
      modo: 'info',
      titulo: 'Operación exitosa',
      mensaje: mensaje,
      ttl: '',
      cerrar: true,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: ''
    };
  }

  /**
   * Muestra una notificación de error.
   * @param {string} mensaje - Mensaje a mostrar.
   * @returns {void}
   */
  private mostrarNotificacionError(mensaje: string): void {
    this.nuevaNotificacionRfc = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'error',
      titulo: '',
      mensaje: mensaje,
      ttl: '',
      cerrar: true,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar'
    };
  }

  /**
   * Maneja la confirmación de la notificación RFC.
   * @param {boolean} confirmado - Indica si el usuario confirmó.
   * @returns {void}
   */
  confirmarNotificacionRfc(confirmado: boolean): void {
    // Limpiar la notificación
    this.nuevaNotificacionRfc = null as any;
  }

  /**
   * Elimina empresas nacionales.
   * @method eliminarEmpresasNacionales
   */
  eliminarEmpresasNacionales(): void {
    const INDICE = this.datos.findIndex(
      (item: ServicioInmex) =>
        item.registroContribuyentes ===
        this.empresasSeleccionados[0]?.registroContribuyentes
    );
    if (INDICE !== -1) {
      const DATOSACTUALIZADOS = [...this.datos];
      DATOSACTUALIZADOS.splice(INDICE, 1);
      this.Tramite80102Store.setDatos(DATOSACTUALIZADOS);
    }
  }

  /**
   * Actualiza el grid de empresas nacionales.
   * @method actualizaGridEmpresasNacionales
   */
  actualizaGridEmpresasNacionales(): void {
    const CUERPODATOS = {
      servicio: 'Auditoría de sistemas de seguridad',
      registroContribuyentes: this.rfcEmpresa,
      denominacionSocial: 'AAL970927390',
      numeroIMMEX: this.numeroPrograma,
      anoIMMEX: this.tiempoPrograma,
    };

    const DATOSACTUALIZADOS = [...this.datos, CUERPODATOS];
    this.Tramite80102Store.setDatos(DATOSACTUALIZADOS);
    this.rfcEmpresa = '';
    this.numeroPrograma = '';
    this.tiempoPrograma = '';
    this.Tramite80102Store.setCamposEmpresa(
      this.rfcEmpresa,
      this.numeroPrograma,
      this.tiempoPrograma
    );
  }

  /**
   * Maneja los datos recibidos del componente hijo.
   * @method procesarDatosDelHijo
   * @param {any} data - Datos recibidos.
   */
  procesarDatosDelHijo(data: Catalogo | Catalogo[]): void {
    this.recibioDatos = Array.isArray(data) ? data : [data];
    this.Tramite80102Store.setAduanaDeIngresoSeleccion(data as Catalogo);
  }

  /**
   * Selecciona domicilios.
   * @method seleccionarDomicilios
   * @param {any} domicilios - Domicilios seleccionados.
   */
  seleccionarDomicilios(domicilios: Servicio): void {
    this.domiciliosSeleccionados = [{ ...domicilios }];
  }

  /**
   * Selecciona empresas.
   * @method seleccionarEmpresas
   * @param {any} empresas - Empresas seleccionadas.
   */
  seleccionarEmpresas(empresas: ServicioInmex): void {
    this.empresasSeleccionados = [{ ...empresas }];
  }

  /**
   * Elimina las empresas extranjeras seleccionadas del store.
   * @returns {void}
   */
  eliminarEmpresaExtranjera(): void {
    if (!this.empresaExtranjeraSeleccionados.length) {
      return;
    }
    this.Tramite80102Store.eliminarDatosEmpresaExtranjera(
      this.empresaExtranjeraSeleccionados
    );
    this.empresaExtranjeraSeleccionados = [];
  }

  /**
   * Agrega una nueva empresa extranjera al store utilizando los valores del formulario.
   * @returns {void}
   */
  agregarEmpresaExtranjera(): void {
    this.Tramite80102Store.agregarDdatosEmpresaExtranjera(
      this.formularioEmpresaExtranjera.value
    );
  }

  /**
   * Converts input to uppercase for specific fields
   * @param {string} fieldName - The name of the field
   * @param {Event} event - The input event
   */
  onInputChange(fieldName: string, event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    const VALUE = TARGET.value;

    if (fieldName === 'nombreEmpresaExt' || fieldName === 'direccionEmpresaExtranjera') {
      const UPPER_CASE_VALUE = VALUE.toUpperCase();
      this.formularioEmpresaExtranjera.patchValue({
        [fieldName]: UPPER_CASE_VALUE
      });
    }
  }

   /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }

  
}
