import { ALERT, AlertComponent } from '@libs/shared/data-access-user/src';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Catalogo, ConfiguracionColumna, Notificacion, NotificacionesComponent, Pedimento, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { DatosSolicitudState, DatosSolicitudStore } from '../../estados/stores/datos-de-la-solicitud-modificacion.store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MANIFIESTOS_DECLARACION, MERCANCIAS_DATA } from '../../constantes/aviso-de-funcionamiento.enum';
import { MercanciasInfo, PropietarioTipoPersona, ScianModel } from '../../models/datos-de-la-solicitud.model';
import { Subject, map, takeUntil } from 'rxjs';
import { ALERT_INSUMOS } from '../../constantes/datos-domicilio-legal.enum';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDelEstablecimientoRFCComponent } from '../datos-del-establecimiento-rfc/datos-del-establecimiento-rfc.component';
import { DatosSolicitudQuery } from '../../estados/queries/datos-de-la-solicitud-modificacion.query';
import { EstablecimientoService } from '../../services/establecimiento.service';
import { InputCheckComponent } from '@libs/shared/data-access-user/src';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { RepresentanteLegalRfcComponent } from '../representante-legal-rfc/representante-legal-rfc.component';
import { SCIAN_DATA } from '../../constantes/datos-scian.enum';
import { ScianData } from '../../models/datos-modificacion.model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

/**
 * @description
 * Componente que gestiona el formulario y las interacciones relacionadas con la modificación de datos de la solicitud.
 * Este componente permite al usuario capturar, visualizar y modificar datos relacionados con la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud-modificacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificacionesComponent,
    InputRadioComponent,
    TituloComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    InputCheckComponent,
    AlertComponent,
    DatosDelEstablecimientoRFCComponent,
    RepresentanteLegalRfcComponent
  ],
  templateUrl: './datos-de-la-solicitud-modificacion.component.html',
  styleUrl: './datos-de-la-solicitud-modificacion.component.scss',
})
export class DatosDeLaSolicitudModificacionComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * @Input
   * Indica si los insumos están habilitados o no.
   */
  @Input() insumos: boolean = false;

  /**
   * @description
   * Formulario principal para capturar los datos de la solicitud.
   */
  public datosSolicitudform!: FormGroup;

  /**
   * @description
   * Formulario para capturar los manifiestos del representante.
   */
  public manifiestosRepresentanteForm!: FormGroup;

  /**
   * @description
   * Formulario para capturar datos SCIAN.
   */
  public scianForm!: FormGroup;

  /**
   * @description
   * Datos SCIAN agregados por el usuario.
   */
  public personaparas: ScianModel[] = [];

  /**
   * @description
   * Datos del catálogo SCIAN.
   */
  public scianJson: Catalogo[] = [];

  /**
   * @description
   * Instancia del modal de Bootstrap.
   */
  public modalInstance!: Modal;

  /**
   * @description
   * Referencia al modal del establecimiento.
   */
  @ViewChild('establecimientoModal', { static: false })
  establecimientoModal!: ElementRef;

  /**
   * @description
   * Textos de alerta utilizados en el componente.
   */
  public TEXTOS = ALERT;
  /**
   * @description
   * Mensaje de alerta para insumos.
   */
  public TEXTOS_INSUMOS = ALERT_INSUMOS;

  /**
   * @description
   * Clase CSS para las alertas.
   */
  public class = 'alert-warning';

  /**
   * @description
   * Configuración de columnas para la tabla de datos SCIAN.
   */
  public configuracionTabla: ConfiguracionColumna<ScianData>[] = SCIAN_DATA;

  /**
   * @description
   * Configuración de selección de tabla.
   */
  public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @description
   * Datos cargados dinámicamente para la tabla SCIAN.
   */
  public datosData: ScianData[] = [];

  /**
   * @description
   * Enum para la selección de tablas.
   */
  public tipoSeleccionTabla = TablaSeleccion;

  /**
   * @description
   * Notificador para destruir observables y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * @description
   * Índice del elemento que se desea eliminar de la lista de pedimentos.
   */
  public elementoParaEliminar!: number;

  /**
   * @description
   * Notificación actual que se muestra en el componente.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @description
   * Lista de pedimentos gestionados en el componente.
   */
  public pedimentos: Array<Pedimento> = [];

  /**
   * @description
   * Configuración de columnas de la tabla de mercancías.
   */
  public mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;

  /**
   * @description
   * Datos de la tabla de mercancías.
   */
  public mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * @description
   * Texto de los manifiestos.
   */
  public mensajeManifiestos: string = '';

  /**
   * @description
   * Lista de estados disponibles.
   */
  public estado: Catalogo[] = [];

  /**
   * @description
   * Opciones genéricas para el formulario.
   */
  public datosGenericos: PropietarioTipoPersona[] = [];

  /**
   * @description
   * Opciones para el radio de información confidencial.
   */
  public informacionConfidencialRadioOption: PropietarioTipoPersona[] = [];

  /**
   * @description
   * Estado actual de la solicitud.
   */
  public solicitudState!: DatosSolicitudState;

  /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando es `true`, los campos del formulario no se pueden editar.
 */
  public esFormularioSoloLectura: boolean = false;

  /**
* Abre el modal de confirmación para eliminar un pedimento.
* 
* Este método configura los datos de la notificación que se mostrará en el modal
* de confirmación. También almacena el índice del elemento que se desea eliminar.
* 
* @param i - Índice del pedimento que se desea eliminar. Por defecto, es 0.
*/
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Por el momento no hay comunicación con el Sistema de COFEPRIS, favor de capturar su establecimiento.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };

    this.elementoParaEliminar = i;
  }
  /**
   * @description
   * Constructor del componente.
   * @param formBuilder Constructor de formularios reactivos.
   * @param establecimientoService Servicio para gestionar datos del establecimiento.
   * @param datosSolicitudStore Store para gestionar el estado de la solicitud.
   * @param datosSolicitudQuery Query para obtener datos del estado de la solicitud.
   */
  constructor(
    private formBuilder: FormBuilder,
    private establecimientoService: EstablecimientoService,
    private datosSolicitudStore: DatosSolicitudStore,
    private datosSolicitudQuery: DatosSolicitudQuery,
    private consultaioQuery: ConsultaioQuery,
  ) {
    //Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  /**
   * @description
   * Método del ciclo de vida `OnInit` que inicializa el componente.
   */
  ngOnInit(): void {

    /**
    * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
    * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
    * - Llama a `configurarGrupoForm()` para aplicar configuraciones basadas en el estado recibido.
    * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
    */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe()

    /**
     * Se suscribe al estado de `DatosSolicitud` para obtener información actualizada del estado de la solicitud.
     * - Asigna el estado de la solicitud a la propiedad `solicitudState`.
     * - La suscripción se cancela automáticamente cuando `destroy$` emite un valor (para evitar fugas de memoria).
     */

    this.datosSolicitudQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.mensajeManifiestos = MANIFIESTOS_DECLARACION.MANIFIESTOS;
    this.cargarEstado();
    this.cargarScian();
    this.establecerOpcionesGenericas();
    this.manejarConfidencial();
    this.configurarGrupoForm();
  }

  /**
   * @description
   * Configura los formularios reactivos del componente.
   */
  configurarGrupoForm(): void {
    // Configuración del formulario principal de datos de la solicitud
    this.datosSolicitudform = this.formBuilder.group({
      genericos: [this.solicitudState?.genericos, [Validators.required]],
      observaciones: [this.solicitudState?.observaciones, [Validators.required]],
      establecimientoRazonSocial: [this.solicitudState?.establecimientoRazonSocial, Validators.required],
      establecimientoCorreoElectronico: [this.solicitudState?.establecimientoCorreoElectronico, Validators.required],
      establecimientoDomicilioCodigoPostal: [this.solicitudState?.establecimientoDomicilioCodigoPostal, [Validators.required]],
      establecimientoEstados: [this.solicitudState?.establecimientoEstados, Validators.required],
      descripcionMunicipio: [this.solicitudState?.descripcionMunicipio, Validators.required],
      localidad: [this.solicitudState?.localidad],
      establishomentoColonias: [this.solicitudState?.establishomentoColonias],
      calle: [this.solicitudState?.calle, Validators.required],
      lada: [this.solicitudState?.lada],
      telefono: [this.solicitudState?.telefono, Validators.required],
      avisoCheckbox: [this.solicitudState?.avisoCheckbox],
      noLicenciaSanitaria: [this.solicitudState?.noLicenciaSanitaria],
      regimen: [this.solicitudState?.regimen, Validators.required],
      aduanasEntradas: [this.solicitudState?.aduanasEntradas, Validators.required],
      aifaCheckbox: [this.solicitudState?.aifaCheckbox, Validators.required],
    });

    this.manifiestosRepresentanteForm = this.formBuilder.group({
      manifests: [this.solicitudState?.manifests, Validators.required],
      informacionConfidencialRadio: [this.solicitudState?.informacionConfidencialRadio, Validators.required],
    });

    this.scianForm = this.formBuilder.group({
      scian: [this.solicitudState?.scian, Validators.required],
      descripcionScian: [this.solicitudState?.descripcionScian],
    });

    if (this.datosSolicitudform && this.manifiestosRepresentanteForm && this.scianForm) {
      this.datosSolicitudform.disable();
      this.manifiestosRepresentanteForm.disable();
      this.scianForm.disable();
    } else {
      this.datosSolicitudform.enable();
      this.manifiestosRepresentanteForm.enable();
      this.scianForm.enable();
    }
  }

  /**
   * @description
   * Actualiza el estado del store con los valores del formulario.
   * @param form Formulario reactivo.
   * @param campo Campo del formulario que se desea actualizar.
   * @param metodoNombre Nombre del método del store que se invocará.
   */
  actualizarValoresStore(form: FormGroup, campo: string, metodoNombre: keyof DatosSolicitudStore): void {
    const VALOR = form.get(campo)?.value;
    (this.datosSolicitudStore[metodoNombre] as (value: string | number) => void)(VALOR);
  }

  /**
   * @description
   * Establece las opciones genéricas para el formulario.
   */
  establecerOpcionesGenericas(): void {
    this.establecimientoService
      .getJustificationData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PropietarioTipoPersona[]) => {
        this.datosGenericos = data;
      });
  }

  /**
   * @description
   * Maneja las opciones de información confidencial.
   */
  manejarConfidencial(): void {
    this.establecimientoService
      .getInformacionConfidencialRadioOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PropietarioTipoPersona[]) => {
        this.informacionConfidencialRadioOption = data;
      });
  }

  /**
   * @description
   * Carga los datos del estado desde el servicio.
   */
  cargarEstado(): void {
    this.establecimientoService
      .getEstadodata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.estado = resp;
      });
  }

  /**
   * @description
   * Carga los datos SCIAN desde el servicio.
   */
  cargarScian(): void {
    this.establecimientoService
      .getSciandata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.scianJson = resp;
      });
  }

  /**
   * @description
   * Cierra el modal SCIAN.
   */
  cerrarModalScian(): void {
    this.modalInstance.hide();
  }

  /**
   * @description
   * Limpia el formulario SCIAN.
   */
  limpiarScianForm(): void {
    this.scianForm.reset();
  }

  /**
   * @description
   * Guarda un nuevo dato SCIAN y lo agrega a la tabla.
   */
  guardarScian(): void {
    if (this.scianForm.valid) {
      const SCIAN_DATA: ScianModel = {
        claveScian: this.scianForm.get('scian')?.value,
        descripcionScian: this.scianForm.get('descripcionScian')?.value,
      };

      // Agregar el nuevo dato a la tabla
      this.personaparas.push(SCIAN_DATA);

      // Limpiar el formulario
      this.scianForm.reset();

      // Cerrar el modal
      this.cerrarModalScian();
    }
  }

  /**
   * @description
   * Elimina un pedimento de la lista.
   * @param borrar Indica si se debe proceder con la eliminación.
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * @description
   * Muestra el modal para la clave SCIAN.
   */
  public mostrarModeloClave(): void {
    this.modalInstance.show();
  }

  /**
   * @description
   * Ciclo de vida `AfterViewInit`.
   * Inicializa la instancia del modal de Bootstrap.
   */
  ngAfterViewInit(): void {
    if (this.establecimientoModal) {
      this.modalInstance = new Modal(this.establecimientoModal.nativeElement);
    }
  }

  /**
   * @description
   * Ciclo de vida `OnDestroy`.
   * Limpia los observables para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
