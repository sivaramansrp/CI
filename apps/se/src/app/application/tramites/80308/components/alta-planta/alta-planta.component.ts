import {
  Catalogo,
  CatalogoSelectComponent,
  ConsultaioQuery,
  Notificacion,
  NotificacionesComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { CONFIGURACION_DOMICILIOS } from '../../constantes/modificacion.enum';
import { CommonModule } from '@angular/common';
import { ComplementariaImmexComponent } from '../complementaria-immex/complementaria-immex.component';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { DomicilioInfo } from '../../models/plantas-consulta.model';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite80308Query } from '../../estados/tramite80308.query';
import { Tramite80308Store } from '../../estados/tramite80308.store';

@Component({
  selector: 'app-alta-planta',
  templateUrl: './alta-planta.component.html',
  styleUrls: ['./alta-planta.component.scss'],
  standalone: true,
  imports: [
    CatalogoSelectComponent,
    TituloComponent,
    TablaDinamicaComponent,
    ComplementariaImmexComponent,
    ReactiveFormsModule,
    CommonModule,
    NotificacionesComponent
  ],
  providers: [ModificacionSolicitudeService, ToastrService],
})
export class AltaPlantaComponent implements OnInit, OnDestroy {

  nuevaNotificacion!: Notificacion | null;
  /**
   * Formulario que contiene el grupo de controles para la entidad federativa.
   */
  formulario: FormGroup;

  /**
   * Lista de catálogos que representan los estados.
   * @type {Observable<Catalogo[]>}
   */
  estados$!: Observable<Catalogo[]>

  /**
   * Estado seleccionado.
   * @type {Catalogo}
   */
  estado!: Catalogo;

  /**
   * Lista de domicilios disponibles.
   * @type {Observable<DomicilioInfo[]>}
   */
  domicilios$!: Observable<DomicilioInfo[]>;

  /**
   * Lista de domicilios seleccionados.
   * @type {DomicilioInfo[]}
   */
  domiciliosSeleccionados: DomicilioInfo[] = [];

  /**
   * Variable para definir el tipo de selección en la tabla (por defecto es RADIO).
   * @type {TablaSeleccion}
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * Configuración de las columnas de la tabla, utilizando el tipo DomicilioInfo.
   * @type {ConfiguracionColumna<DomicilioInfo>[]}
   */
  configuracionTabla: ConfiguracionColumna<DomicilioInfo>[] =
    CONFIGURACION_DOMICILIOS;

  /**
   * Datos de ejemplo basados en la interfaz DomicilioInfo.
   * @type {Observable<DomicilioInfo[]>}
   */
  datos$: Observable<DomicilioInfo[]>;

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false; 

  /**
   * Constructor de la clase.
   * @param {FormBuilder} fb - El servicio para construir formularios reactivos.
   * @param {ModificacionSolicitudeService} modificionService - Servicio para la modificación de solicitudes.
   */
  constructor(
    private fb: FormBuilder,
    public modificionService: ModificacionSolicitudeService,
    private toastr: ToastrService,
    private store: Tramite80308Store,
    private tramiteQuery: Tramite80308Query,
    private consultaioQuery: ConsultaioQuery,
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
       takeUntil(this.destroyNotifier$),
       map((seccionState)=>{
         this.esFormularioSoloLectura = seccionState.readonly; 
         this.inicializarEstadoFormulario();
       })
     )
     .subscribe()

    // Inicialización del formulario para la entidad federativa.
    this.formulario = this.fb.group({
      entidadFederativa: ['', [Validators.required, Validators.min(0)]],
    });
   
    this.tramiteQuery.selectEstado$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe(estado => {
      if(estado) {
        this.formulario.patchValue({
          entidadFederativa: estado.id
        });
      }
      this.store.setFormValida({entidadFederativa: this.formulario.valid})
    });
    this.datos$ = this.tramiteQuery.selectBuscarDomicilios$;
    this.estados$ = this.tramiteQuery.selectAltaPlanta$;
    this.domicilios$ = this.tramiteQuery.selectDomicilios$;
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.formulario.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formulario.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    }
  }

  /**
   * Getter para obtener el control del formulario de la entidad federativa.
   * @returns {FormControl} El control para la entidad federativa.
   */
  get formularioControl(): FormControl {
    return this.formulario.get('entidadFederativa') as FormControl;
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Carga la lista de estados.
   */
  ngOnInit(): void {
    this.cargarEstados();
  }

  /**
   * Método para cargar los estados mediante el servicio.
   * Realiza una llamada al servicio para obtener la lista de estados.
   */
  cargarEstados(): void {
    this.modificionService
      .obtenerListaEstado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setaltaPlanta(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  /**
   * Método para buscar domicilios según la entidad seleccionada en el formulario.
   * Realiza una llamada al servicio para obtener los domicilios de la entidad seleccionada.
   */
  buscarDomicilios(): void {
    const ENTIDAD = this.formularioControl?.value;

    if (ENTIDAD && ENTIDAD !== '-1') {
      this.modificionService
        .obtenerDomicilios()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe(
          (data: DomicilioInfo[]) => {
            this.store.setbuscarDomicilios(data);
          },
          () => {
            this.toastr.error('Error al buscar domicilios')
          }
        );
    } else {
      // Maneja el caso donde la selección de la entidad no es válida.
      this.toastr.error('Seleccione una entidad federativa válida.')
    }
  }

  /**
   * Método para seleccionar un domicilio de la lista.
   * @param {DomicilioInfo} domicilios - El domicilio que se selecciona.
   */
  seleccionarDomicilios(domicilios: DomicilioInfo): void {
    this.domiciliosSeleccionados = [{ ...domicilios }];
  }

  /**
   * Método para aplicar la acción seleccionada, asignando los domicilios seleccionados.
   */
  aplicarAccion(): void {
    if(this.domiciliosSeleccionados.length) {
      // Create notification object with correct field names
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert', // Using TipoNotificacionEnum.ALERTA
        categoria: 'info', // Using CategoriaMensaje.INFORMACION
        modo: 'confirmacion', // Mode for confirmation
        titulo: 'Confirmar Acción',
        mensaje: 'Selecciona al menos una planta donde se realizarán las operaciones IMMEX.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: 'Cancelar',
        tamanioModal: 'md', // Optional: small, medium, large
        alineacionTexto: 'center' // Optional: text alignment
      };
    } else {
      // Create notification for error case without toaster
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'confirmacion',
        titulo: '',
        mensaje: 'Selecciona al menos una planta donde se realizarán las operaciones IMMEX..',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
        tamanioModal: 'md',
        alineacionTexto: 'center'
      };
    }
  }

  /**
   * Handles the confirmation modal response
   * @param confirmacion - Boolean indicating user's choice
   */
  confirmacionModal(confirmacion: boolean): void {
    if (confirmacion) {
      // User confirmed - proceed with adding the plant
      if(this.domiciliosSeleccionados.length) {
        this.store.aggregarDomicilios(this.domiciliosSeleccionados[0]);
        this.toastr.success('Planta agregada exitosamente');
      }
    }
    // Hide the notification modal
    this.nuevaNotificacion = null;
  }

  /**
   * Método para eliminar una planta de los domicilios seleccionados.
   * @param {DomicilioInfo} plantas - El domicilio que se quiere eliminar.
   */
  eliminarPlantas(): void {
    if(this.domiciliosSeleccionados.length) {
      this.store.eliminarDomicilios(this.domiciliosSeleccionados[0]);
    }
  }

  /**
   * Establece el estado en el almacén (store) con el valor proporcionado.
   * 
   * @param {Catalogo} estado - El estado que se desea establecer en el almacén. Este parámetro debe ser de tipo `Catalogo`.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  tipoEstadoSeleccion(estado: Catalogo): void {
    this.store.setEstado(estado);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Utiliza un Subject para notificar a todos los observables suscritos que deben completarse.
   * Esto ayuda a evitar posibles fugas de memoria al completar el Subject y finalizar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
