import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionColumna,
  InputCheckComponent,
  InputFecha,
  Pedimento,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService
} from '@libs/shared/data-access-user/src';
import { ColumnasTabla, CrossList, FECHA_FINAL, FECHA_INICIAL, ListaClave, Mercancia } from '../../models/consulta.model';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CrosslistComponent, InputFechaComponent, InputRadioComponent, Notificacion, NotificacionesComponent, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud260704State, Tramite260704Store } from '../../estados/Tramite260704.store';
import { AVISO_PRIVACIDAD, CATALOGO_CLAVE, ENCABEZADOS_SCIAN, ESTADO_CATALOGO, LISTA_CLAVE, MERCANCIAS_DATOS, OPCIONES_RADIO_HACERLOS, RADIO_OPCIONS } from '../../constantes/consulta.enum';
import { CommonModule } from '@angular/common';
import { ConsultaService } from '../../service/consulta.service';
import { Modal } from 'bootstrap';
import { Tramite260704Query } from '../../estados/Tramite260704.query';
/**
 * Componente que gestiona los datos de la solicitud.
 *
 * Este componente se encarga de inicializar y manejar el formulario reactivo que contiene
 * la información de la solicitud, incluyendo datos del establecimiento, SCIAN, mercancías, etc.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    InputFechaComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    CrosslistComponent,
    TituloComponent,
    CommonModule,
    NotificacionesComponent,
    InputCheckComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.css'],
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  // Notificación utilizada para mostrar mensajes o alertas en la interfaz.
  public nuevaNotificacion!: Notificacion;

  public nuevaNotificacion2!: Notificacion;

  // Índice del pedimento marcado para eliminación.
  public elementoParaEliminar!: number;

  // Arreglo que contiene los pedimentos registrados.
  public pedimentos: Array<Pedimento> = [];
  /**
   * Referencia al elemento modal de alerta.
   */
  @ViewChild('modalAlerta') modalElement!: ElementRef;

  /**
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Formulario reactivo que almacena los datos del establecimiento.
   */
  datosDelEstablecimientoForm!: FormGroup;

  /**
   * Formulario reactivo para la modificación de datos.
   */
  modificacionForm!: FormGroup;

  /**
   * Formulario reactivo relacionado con SCIAN.
   */
  scianForm!: FormGroup;

  /**
   * Valor seleccionado en alguna opción (por ejemplo, de radio).
   */
  valorSeleccionado: string = '';

  /**
   * Variable para almacenar los hercelos seleccionados.
   */
  hercelosSeleccionados!: string;

  /**
   * Bandera que indica si se muestra la sección de país de origen.
   */
  paisOrigen = false;

  /**
   * Bandera que indica si la sección de país de procedencia es colapsable.
   */
  paisProcedencisColapsable = false;

  /**
   * Bandera para indicar el uso específico.
   */
  usoEspecifico = false;

  /**
   * Bandera para habilitar o deshabilitar el estado.
   */
  habilitarEstado: boolean = true;

  /**
   * Bandera que indica si se seleccionó el aviso de funcionamiento.
   */
  esAvisoFuncionamientoSeleccionado: boolean = false;

  /**
   * Bandera que indica si se seleccionó alguna casilla (checkbox).
   */
  esCheckboxSeleccionado: boolean = false;

  /**
   * Bandera que indica si se seleccionaron datos del SCIAN.
   */
  esDatosSCIANSeleccionado: boolean = false;

  /**
   * Bandera que indica si se seleccionó el tipo de operación.
   */
  esTipoOperacionSeleccionado: boolean = true;

  /**
   * Objeto CrossList para país de origen.
   */
  paisOrigenCrossList: CrossList = {} as CrossList;

  /**
   * Objeto CrossList para país de procedencia.
   */
  paisProcedencisCrossList: CrossList = {} as CrossList;

  /**
   * Objeto CrossList para uso específico.
   */
  usoEspecificoCrossList: CrossList = {} as CrossList;

  /**
   * Configuración de la fecha inicial.
   */
  fechaInicialInput: InputFecha = FECHA_INICIAL;

  /**
   * Configuración de la fecha final.
   */
  fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Constante que representa el aviso de privacidad.
   */
  AVISO_PRIVACIDAD = AVISO_PRIVACIDAD;

  /**
   * Datos disponibles para la tabla de certificado.
   */
  certificadoDisponsiblesTablaDatos: ColumnasTabla[] = [];

  /**
   * Configuración de la tabla de mercancías.
   */
  mercanciasConfiguracionTabla: Mercancia[] = [];

  /**
   * Datos para la tabla de clave.
   */
  listaClaveTabla: ListaClave[] = [];

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud260704State;

  /**
   * Constante para el tipo de selección en la tabla.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Array de catálogo para la descripción del SCIAN.
   */
  descripcionScian!: Catalogo[];

  /**
   * Array de catálogo para la clave SCIAN.
   */
  claveScian!: Catalogo[];
/**
 * Bandera que indica si hay una fila seleccionada en la tabla de fabricantes.
 */
  public tieneFilaSeleccionadaFabricante: boolean = false;


  /**
   * Opciones de radio recibidas como @Input.
   */
  @Input() opcionesRadio: {
    label: string;
    value: string | number;
    hint?: string;
  }[] = [];

  /**
   * Opciones de radio internas del componente.
   */
  radioOpcions = RADIO_OPCIONS;

  /**
   * Opciones de radio para hacerlos.
   */
  opcionesRadioHacerlos = OPCIONES_RADIO_HACERLOS;

  /**
   * Configuración del catálogo para el estado.
   */
  public estadoCatalogo = ESTADO_CATALOGO;

  /**
   * Configuración del catálogo para la clave.
   */
  public catalogoClave = CATALOGO_CLAVE;

  /**
   * Encabezados para la tabla de SCIAN.
   */
  public encabezados = ENCABEZADOS_SCIAN;
  /**
   * Encabezados para la tabla de mercancías.
   */
  public mercanciasDatos = MERCANCIAS_DATOS;

  /**
   * Encabezados para la tabla de clave.
   */
  public listaClave = LISTA_CLAVE;

  /**
   * Constructor del componente que inyecta los servicios necesarios.
   * @param consulta Servicio para realizar consultas.
   * @param store Almacén de estado para Tramite260704.
   * @param query Consulta para Tramite260704.
   * @param fb FormBuilder para construir formularios reactivos.
   * @param validacionesService Servicio para validaciones de formularios.
   */
  constructor(
    private consulta: ConsultaService,
    public store: Tramite260704Store,
    private query: Tramite260704Query,
    public fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
  ) {
    // Constructor vacío, no requiere inicialización adicional.
  }

  /**
   * Inicializa el componente, suscribe a estados y carga datos.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
    this.obtenerTablaScian();
    this.obtenerDatosEstado();
    this.obtenerTablaMercancias();
    this.obtenerDatosClave();
    this.obtenerTablaListaClave();
  }

  /**
   * Obtiene los datos de la tabla SCIAN mediante el servicio de consulta.
   */
  public obtenerTablaScian(): void {
    this.consulta
      .obtenerTablaScian()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.certificadoDisponsiblesTablaDatos = data;
      });
  }

  /**
   * Obtiene los datos de la tabla de mercancías.
   */
  public obtenerTablaMercancias(): void {
    this.consulta
      .obtenerTablaMercancias()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.mercanciasConfiguracionTabla = data;
      });
  }

  /**
   * Obtiene los datos de la tabla de clave.
   */
  public obtenerTablaListaClave(): void {
    this.consulta
      .obtenerTablaListaClave()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaClaveTabla = data;
      });
  }

  /**
   * Habilita el formulario de establecimiento y deshabilita el estado.
   */
  public aceptar(): void {
    this.datosDelEstablecimientoForm.enable();
    this.habilitarEstado = false;
  }

  /**
   * Selecciona la clave SCIAN, actualiza el formulario y almacena el valor en el store.
   */
  public claveScianSeleccion(): void {
    const CLAVE_SCIAN = this.scianForm.get('cveSCIAN')?.value;
    this.consulta.getDescripcionScian()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          const SCIAN_DESCRIPCION = result.data[0].descripcion;
          this.scianForm.get('cveSCIANDescripcion')?.setValue(SCIAN_DESCRIPCION);
          this.store.setDescripcionScian(SCIAN_DESCRIPCION);
        }
      });
    this.store.setClaveScian(CLAVE_SCIAN);
  }

  /**
   * Muestra el modal para seleccionar el establecimiento.
   */
  public seleccionarEstablecimiento(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
    this.abrirModal();
  }

  /**
   * Obtiene los datos del catálogo de estado y los asigna al estadoCatalogo.
   */
  public obtenerDatosEstado(): void {
    this.consulta
      .obtenerDatosEstado()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.estadoCatalogo.catalogos = resp as Catalogo[];
      });
  }

  /**
   * Obtiene los datos del catálogo de clave y los asigna a catalogoClave.
   */
  obtenerDatosClave(): void {
    this.consulta
      .obtenerDatosClave()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.catalogoClave.catalogos = resp as Catalogo[];
      });
  }

  /**
   * Muestra el modal para agregar mercancías al grid.
   */
  public agregarMercanciaGrid(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Verifica la selección del checkbox y actualiza la bandera correspondiente.
   * @param event Evento del clic.
   */
  verificarSeleccionCheckbox(event: MouseEvent): void {
    const CHECKBOX = (event.target as HTMLInputElement).closest('input[type="checkbox"]');
    if (CHECKBOX) {
      this.esCheckboxSeleccionado = (CHECKBOX as HTMLInputElement).checked;
    } else {
      this.esCheckboxSeleccionado = false;
    }
  }

  /**
   * Getter para obtener el FormGroup de 'validacionForm' del formulario.
   */
  get validacionForm(): FormGroup {
    return this.datosDelEstablecimientoForm.get('validacionForm') as FormGroup;
  }

  /**
   * Getter para obtener el FormGroup de 'validacionMercanciaForm' del formulario.
   */
  get validacionMercanciaForm(): FormGroup {
    return this.datosDelEstablecimientoForm.get('validacionMercanciaForm') as FormGroup;
  }

  /**
   * Getter para obtener el FormGroup de 'validacionScionForm' del formulario.
   */
  get validacionScionForm(): FormGroup {
    return this.datosDelEstablecimientoForm.get('validacionScionForm') as FormGroup;
  }

  /**
   * Getter para obtener el FormGroup de 'validacionAduanaMercanciaForm' del formulario.
   */
  get validacionAduanaMercanciaForm(): FormGroup {
    return this.datosDelEstablecimientoForm.get('validacionAduanaMercanciaForm') as FormGroup;
  }

  /**
   * Getter para obtener el FormGroup de 'validacionDatosMercanciaForm' del formulario.
   */
  get validacionDatosMercanciaForm(): FormGroup {
    return this.datosDelEstablecimientoForm.get('validacionDatosMercanciaForm') as FormGroup;
  }

  /**
   * Cambia la selección y habilita o deshabilita controles basados en el valor del campo.
   * @param form Formulario que contiene el campo.
   * @param campo Nombre del campo a evaluar.
   */
  alCambiarSeleccion(form: FormGroup, campo: string): void {
    if (form.get(campo)?.value === 'modificacion') {
      this.esTipoOperacionSeleccionado = true;
      this.datosDelEstablecimientoForm.get('validacionForm.justificacion')?.enable();
      this.datosDelEstablecimientoForm.get('validacionForm.razonSocial')?.enable();
      this.datosDelEstablecimientoForm.get('validacionForm.correoElectronico')?.enable();
    } else if (form.get(campo)?.value === 'modificacionYProrroga' || form.get(campo)?.value === 'prorroga') {
      this.esTipoOperacionSeleccionado = false;
      this.datosDelEstablecimientoForm.get('validacionForm.justificacion')?.disable();
      this.datosDelEstablecimientoForm.get('validacionForm.razonSocial')?.disable();
      this.datosDelEstablecimientoForm.get('validacionForm.correoElectronico')?.disable();
    }
  }

  /**
   * Muestra el modal para eliminar mercancías del grid.
   */
  eliminarMercanciaGrid(): void {
    
    if (this.esCheckboxSeleccionado === false) {
      this.abrirModalmercancia();
    } else if (this.esCheckboxSeleccionado === true) {
      this.abrirModalmercanciaChecked();
    }
 

  }

  /**
   * Establece la selección del aviso de funcionamiento basado en el evento.
   * @param evento Evento del checkbox.
   */
  establecerAvisoDeFuncionamiento(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.esAvisoFuncionamientoSeleccionado = VALOR;
    this.store.setAvisoDeFuncionamiento(VALOR);
  }

  /**
   * Establece la licencia sanitaria en el store basado en el evento.
   * @param evento Evento del input.
   */
  establecerLicenciaSanitaria(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.store.setLicenciaSanitaria(VALOR);
  }

  /**
   * Alterna el estado de colapso para la sección de país de origen.
   */
  paisOrigenColapsable(): void {
    this.paisOrigen = !this.paisOrigen;
  }

  /**
   * Alterna el estado de colapso para la sección de país de procedencia.
   */
  paisProcedencis_colapsable(): void {
    this.paisProcedencisColapsable = !this.paisProcedencisColapsable;
  }

  /**
   * Establece la clave de los lotes en el store basado en el evento.
   * @param evento Evento del input.
   */
  establecerClaveDeLosLotes(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.store.setClaveDeLosLotes(VALOR);
  }

  /**
   * Alterna el estado de colapso para la sección de uso específico.
   */
  usoEspecificoColapsable(): void {
    this.usoEspecifico = !this.usoEspecifico;
  }

  /**
   * Agrega mercancías al grid usando los valores del formulario y actualiza el store.
   */
  agregarMercanias(): void {
    const OBJETO_JSON = {
      clasificaionProductos: this.datosDelEstablecimientoForm.get('clasificaionProductos')?.value,
      especificarProducto: this.datosDelEstablecimientoForm.get('especificarProducto')?.value,
      nombreProductoEspecifico: this.datosDelEstablecimientoForm.get('nombreProductoEspecifico')?.value,
      marca: this.datosDelEstablecimientoForm.get('marca')?.value,
      tipoProducto: this.datosDelEstablecimientoForm.get('tipoProducto')?.value,
      fraccionArancelaria: this.datosDelEstablecimientoForm.get('fraccionArancelaria')?.value,
      descripcionFraccionArancelaria: this.datosDelEstablecimientoForm.get('descripcionFraccionArancelaria')?.value,
      cantidadUMT: this.datosDelEstablecimientoForm.get('cantidadUMT')?.value,
      umt: this.datosDelEstablecimientoForm.get('umt')?.value,
      cantidadUMC: this.datosDelEstablecimientoForm.get('cantidadUMC')?.value,
      umc: this.datosDelEstablecimientoForm.get('umc')?.value,
      paisDeOrigen: 'paisDeOrigen',
      paisDeProcedencia: 'paisDeProcedencia',
      usoEspecifico: 'usoEspecifico',
    };
    this.store.addMercanciasDatos(OBJETO_JSON);
  }
  /**
  * Marca que los datos SCIAN han sido seleccionados.
  */
  AcceptarEliminarScian(): void {
    this.esDatosSCIANSeleccionado = true;
  }
 

 /**
     * Actualiza el estado que indica si hay filas seleccionadas en la tabla de "Fabricante".
     */
 public setTablaSeleccionFabricante(rowSeleccion: ColumnasTabla[]): void {
  this.tieneFilaSeleccionadaFabricante = rowSeleccion.length > 0 ? true : false;
}

  // Elimina un pedimento si se confirma la acción.
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  
  }

 

  // Abre el modal y configura la notificación para eliminar un pedimento.
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Por el momento no hay comunicación con el Sistema de COFEPRIS, favorde capturar su establecimiento. Acerar',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    }
    this.elementoParaEliminar = i;
  }

 

  // Abre el modal y configura la notificación para seleccionar un registro de mercancía.
  abrirModalmercancia(i: number = 0): void {
    this.nuevaNotificacion2 = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Selecciona un registro.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
    this.elementoParaEliminar = i;
  }

  // Elimina la mercancía marcada si se confirma la acción.
  eliminarMercanciaChecked(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  // Abre el modal y configura la notificación para confirmar la eliminación de registros marcados.
  abrirModalmercanciaChecked(i: number = 0): void {
    this.nuevaNotificacion2 = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: '¿Estás seguro que deseas eliminar los registros marcados?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    }
    this.elementoParaEliminar = i;
  }
  /**
   * Valida un campo del formulario usando el servicio de validaciones.
   * @param form Formulario a validar.
   * @param field Nombre del campo.
   * @returns Boolean indicando si el campo es válido.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Establece un valor en el store basado en el campo y llama a alCambiarSeleccion.
   * @param form Formulario que contiene el campo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store a ejecutar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260704Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
    this.alCambiarSeleccion(form, campo);
  }

  /**
   * Inicializa el formulario 'datosDelEstablecimientoForm' con sus grupos y controles.
   */
  donanteDomicilio(): void {
    this.datosDelEstablecimientoForm = this.fb.group({
      validacionForm: this.fb.group({
        tipoOperacion: [this.solicitudState?.tipoOperacion, [Validators.required]],
        justificacion: [this.solicitudState?.justificacion, [Validators.required]],
        establecimiento: [this.solicitudState?.establecimiento, [Validators.required]],
        razonSocial: [this.solicitudState?.razonSocial, [Validators.required]],
        correoElectronico: [this.solicitudState?.correoElectronico, [Validators.required]],
      }),
      validacionMercanciaForm: this.fb.group({
        codigoPostal: [this.solicitudState?.codigoPostal, [Validators.required]],
        estado: [this.solicitudState?.estado, [Validators.required]],
        municipio: [this.solicitudState?.municipio, [Validators.required]],
        localidad: [this.solicitudState?.localidad, [Validators.required]],
        colonia: [this.solicitudState?.colonia, [Validators.required]],
        calle: [this.solicitudState?.calle, [Validators.required]],
        lada: [this.solicitudState?.lada, [Validators.required]],
        telefono: [this.solicitudState?.telefono, [Validators.required]],
      }),
      validacionScionForm: this.fb.group({
        scian: [this.solicitudState?.scian, [Validators.required]],
        scianDatos: [this.solicitudState?.scianDatos, [Validators.required]],
        claveScian: [this.solicitudState?.claveScian, [Validators.required]],
        descripcionScian: [this.solicitudState?.descripcionScian, [Validators.required]],
      }),
      validacionAduanaMercanciaForm: this.fb.group({
        avisoDeFuncionamiento: [this.solicitudState?.avisoDeFuncionamiento, [Validators.required]],
        licenciaSanitaria: [this.solicitudState?.licenciaSanitaria, [Validators.required]],
        regimen: [this.solicitudState?.regimen, [Validators.required]],
        aduana: [this.solicitudState?.aduana, [Validators.required]],
        immex: [this.solicitudState?.immex, [Validators.required]],
        ano: [this.solicitudState?.ano, [Validators.required]],
      }),
      validacionDatosMercanciaForm: this.fb.group({
        clasificacionProducto: [this.solicitudState?.clasificacionProducto, [Validators.required]],
        especificarClasificacionProducto: [this.solicitudState?.especificarClasificacionProducto, [Validators.required]],
        denominacionProducto: [this.solicitudState?.denominacionProducto, [Validators.required]],
        marca: [this.solicitudState?.marca, [Validators.required]],
        tipoProducto: [this.solicitudState?.tipoProducto, [Validators.required]],
        especifique: [this.solicitudState?.especifique, [Validators.required]],
        fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, [Validators.required]],
        descripcionFraccionArancelaria: [this.solicitudState?.descripcionFraccionArancelaria, [Validators.required]],
        cantidadUMT: [this.solicitudState?.cantidadUMT, [Validators.required]],
        umt: [this.solicitudState?.umt, [Validators.required]],
        cantidadUMC: [this.solicitudState?.cantidadUMC, [Validators.required]],
        umc: [this.solicitudState?.umc, [Validators.required]],
        claveLote: [this.solicitudState?.claveLote, [Validators.required]],
        listaClave: [this.solicitudState?.listaClave, [Validators.required]],
      }),
      manfestosYDeclaraciones: [this.solicitudState?.manfestosYDeclaraciones, [Validators.required]],
      hacerlosPublicos: [this.solicitudState?.hacerlosPublicos, [Validators.required]],
      rfc: [this.solicitudState?.rfc, [Validators.required]],
    });
  }

  // Elimina la mercancía marcada si se confirma la acción.
 eliminarPedimentoMercancia(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  

  if(this.tieneFilaSeleccionadaFabricante  && this.esCheckboxSeleccionado === true) {
    this.certificadoDisponsiblesTablaDatos.pop();
  }
}

  /**
   * Método del ciclo de vida que limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
