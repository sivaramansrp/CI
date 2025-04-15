import { ALERT, AlertComponent } from '@libs/shared/data-access-user/src';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Catalogo, ConfiguracionColumna, Notificacion, NotificacionesComponent, Pedimento, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { DatosSolicitudState, DatosSolicitudStore, } from '../../estados/stores/datos-de-la-solicitud-modificacion.store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MANIFIESTOS_DECLARACION, MERCANCIAS_DATA } from '../../constantes/aviso-de-funcionamiento.enum';
import { MercanciasInfo, PropietarioTipoPersona, ScianModel } from '../../models/datos-de-la-solicitud.model';
import { Subject, map, takeUntil, } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosSolicitudQuery } from '../../estados/queries/datos-de-la-solicitud-modificacion.query';
import { EstablecimientoService } from '../../services/establecimiento.service';
import { InputCheckComponent } from '@libs/shared/data-access-user/src';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { SCIAN_DATA } from '../../constantes/datos-scian.enum';
import { ScianData } from '../../models/datos-modificacion.model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-de-la-solicitud-modificacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificacionesComponent, InputRadioComponent, TituloComponent, TablaDinamicaComponent, CatalogoSelectComponent, InputCheckComponent, AlertComponent],
  templateUrl: './datos-de-la-solicitud-modificacion.component.html',
  styleUrl: './datos-de-la-solicitud-modificacion.component.scss',
})
export class DatosDeLaSolicitudModificacionComponent implements OnInit, AfterViewInit, OnDestroy {
  datosSolicitudform!: FormGroup;
  manifiestosRepresentanteForm!: FormGroup;
  /**
 * Formulario para datos SCIAN.
 */
  scianForm!: FormGroup;
  /**
* Datos SCIAN agregados por el usuario.
*/
  personaparas: ScianModel[] = [];
  /**
  * Datos del catálogo SCIAN.
  */
  scianJson: Catalogo[] = [];
  /**
    * Instancia del modal de Bootstrap.
    */
  modalInstance!: Modal;
  /**
     * Referencia al modal del establecimiento.
     */
  @ViewChild('establecimientoModal', { static: false })
  establecimientoModal!: ElementRef;
  /**
  * Textos de alerta.
  */
  TEXTOS = ALERT;
  /**
 * Clase de alerta.
 */
  class = 'alert-warning';
  /**
    * Configuración de columnas para la tabla de datos SCIAN.
    */
  configuracionTabla: ConfiguracionColumna<ScianData>[] = SCIAN_DATA;
  /**
* Configuración de selección de tabla.
*/
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  /**
* Datos cargados dinámicamente para la tabla SCIAN.
*/
  datosData: ScianData[] = [];
  /**
   * Enum para la selección de tablas.
   */
  tipoSeleccionTabla = TablaSeleccion;
  private destroy$ = new Subject<void>();
  /**
 * Notificación actual que se muestra en el componente.
 * 
 * Esta propiedad almacena los datos de la notificación que se mostrará al usuario.
 * Se utiliza para configurar el tipo, categoría, mensaje y otros detalles de la notificación.
 */
  /**
* Índice del elemento que se desea eliminar.
* 
* Esta propiedad almacena el índice del elemento seleccionado para su eliminación
* en la lista de pedimentos.
*/
  elementoParaEliminar!: number;
  public nuevaNotificacion!: Notificacion;
  /**
   * Lista de pedimentos.
   * 
   * Esta propiedad almacena un arreglo de objetos de tipo `Pedimento`, que representan
   * los pedimentos gestionados en el componente.
   */
  pedimentos: Array<Pedimento> = [];
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
   * Configuración de columnas de la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;
  /**
   * Datos de la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];
  /**
     * Texto de los manifiestos.
     */
  mensajeManifiestos: string = '';
  /**
   * Lista de estados.
   */
  estado: Catalogo[] = [];
  /**
    * Opciones genéricas para el formulario.
    */
  datosGenericos: PropietarioTipoPersona[] = [];
  /**
* Opciones para el radio de información confidencial.
*/
  informacionConfidencialRadioOption: PropietarioTipoPersona[] = [];
  /**
   * @description
   * Estado actual de la solicitud.
   */
  public solicitudState!: DatosSolicitudState;

  constructor(private formBuilder: FormBuilder,
    private establecimientoService: EstablecimientoService,
    private datosSolicitudStore: DatosSolicitudStore,
    private datosSolicitudQuery: DatosSolicitudQuery
  ) {
    //Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  ngOnInit(): void {
    this.mensajeManifiestos = MANIFIESTOS_DECLARACION.MANIFIESTOS;
    this.cargarEstado();
    this.cargarScian();
    this.establecerOpcionesGenericas();
    this.manejarConfidencial();

    this.datosSolicitudQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          // eslint-disable-next-line no-console
          console.log('Estado de la solicitud:', this.solicitudState);
        })
      )
      .subscribe();

    this.configurarGrupoForm();
  }

  /**
  * Carga los datos del catálogo de justificación.
  */

  configurarGrupoForm(): void {

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
  }

  /**
     * @description
     * Método que actualiza el estado del store con los valores del formulario.
     * @param form Formulario reactivo.
     * @param campo Campo del formulario que se desea actualizar.
     * @param metodoNombre Nombre del método del store que se invocará.
     */
  actualizarValoresStore(form: FormGroup, campo: string, metodoNombre: keyof DatosSolicitudStore): void {
    const VALOR = form.get(campo)?.value;
    (this.datosSolicitudStore[metodoNombre] as (value: string | number) => void)(VALOR);
  }

  establecerOpcionesGenericas(): void {
    this.establecimientoService
      .getJustificationData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PropietarioTipoPersona[]) => {
        this.datosGenericos = data;
      });
  }

  manejarConfidencial(): void {
    this.establecimientoService
      .getInformacionConfidencialRadioOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PropietarioTipoPersona[]) => {
        this.informacionConfidencialRadioOption = data;

      });
  }

  cargarEstado(): void {
    this.establecimientoService
      .getEstadodata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.estado = resp;
      });
  }
  cargarScian(): void {
    this.establecimientoService
      .getSciandata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.scianJson = resp;
      });
  }
  /**
   * Cierra el modal SCIAN.
   */
  cerrarModalScian(): void {
    this.modalInstance.hide();
  }
  /**
  * Limpia el formulario SCIAN.
  */
  limpiarScianForm(): void {
    this.scianForm.reset();
  }
  /**
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
 * Elimina un pedimento de la lista.
 * 
 * Este método elimina el pedimento seleccionado de la lista de pedimentos si
 * el usuario confirma la acción en el modal de confirmación.
 * 
 * @param borrar - Indica si se debe proceder con la eliminación. Si es `true`,
 * se elimina el pedimento correspondiente.
 */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }
  /**
    * Muestra el modal para la clave SCIAN.
    */
  public mostrarModeloClave(): void {
    this.modalInstance.show();
  }
  /**
   * Ciclo de vida `AfterViewInit`.
   * Inicializa la instancia del modal de Bootstrap.
   */
  ngAfterViewInit(): void {
    if (this.establecimientoModal) {
      this.modalInstance = new Modal(this.establecimientoModal.nativeElement);
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
