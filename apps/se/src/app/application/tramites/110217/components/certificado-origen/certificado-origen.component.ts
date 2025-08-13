import {
  AlertComponent,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  InputFecha,
  InputFechaComponent,
  REGEX_CORREO_ELECTRONICO,
  REGEX_SOLO_DIGITOS,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService
} from '@libs/shared/data-access-user/src';
import {
  Catalogo,
  CatalogoLista,
  DisponiblesTabla,
  SeleccionadasTabla
} from '../../models/certificado-origen.model.js';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState
} from '@ng-mf/data-access-user';
import {
  DISPONIBLES_ENCABEZADOS,
  FECHA_FACTURA,
  FECHA_FINAL,
  FECHA_INICIAL,
  SLECCIONADAS_ENCABEZADOS,
  TERCEROS_TEXTO_DE_ALERTA
} from '../../constants/certificado-origen.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ReplaySubject,
  Subject,
  map,
  takeUntil
} from 'rxjs';
import {
  Tramite110217State,
  Tramite110217Store
} from '../../../../estados/tramites/tramite110217.store';
import { CertificadosOrigenService } from '../../services/certificado-origen.service.ts';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Tramite110217Query } from '../../../../estados/queries/tramite110217.query';

/**
 * Componente para gestionar el Certificado de Origen.
 *
 * Este componente permite al usuario capturar, editar y gestionar la información
 * relacionada con el Certificado de Origen, incluyendo datos de mercancías, fechas,
 * y archivos adjuntos.
 */

@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    TablaDinamicaComponent,
    AlertComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    TooltipModule,
  ],
  providers: [ToastrService],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
})
export class CertificadoOrigenComponent implements OnInit, OnDestroy {
  /**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

  /**
   * Formulario principal para capturar los datos del Certificado de Origen.
   */
  formularioCertificado!: FormGroup;

  /**
   * Estado actual del trámite 110217.
   *
   * Contiene toda la información relacionada con el estado del trámite.
   */
  public solicitudState!: Tramite110217State;

  /**
   * Sujeto para manejar la destrucción de observables.
   *
   * Se utiliza para evitar fugas de memoria al destruir el componente.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Formulario para capturar datos adicionales relacionados con el registro.
   */
  registroFormulario!: FormGroup;

  /**
   * Indica si los campos del formulario están deshabilitados.
   *
   * @type {boolean}
   */
  estaDeshabilitado: boolean = false;

    /**
   * Indica si el formulario tiene errores de validación.
   *
   * Se utiliza para mostrar/ocultar el alert de errores en el modal.
   */
  esFormaValido: boolean = false;

  /**
   * Mensaje de error del formulario para mostrar en el alert.
   *
   * Contiene el HTML del mensaje de error a mostrar cuando hay validaciones fallidas.
   */
  formErrorAlert: string = '<strong>¡Error de registro! </strong> Faltan campos por capturar';

  /**
   * Configuración de las columnas para la tabla de mercancías disponibles.
   *
   * Define los encabezados y las claves para mostrar los datos de las mercancías disponibles.
   */
  public disponiblesEncabezados: ConfiguracionColumna<DisponiblesTabla>[] = DISPONIBLES_ENCABEZADOS;


  /**
   * Datos de la tabla de mercancías disponibles.
   *
   * Contiene la lista de mercancías que están disponibles para selección.
   */
  mercanciaDisponsiblesTablaDatos: DisponiblesTabla[] = [];

  /**
   * Fila seleccionada en la tabla de mercancías disponibles.
   *
   * Representa la mercancía seleccionada actualmente en la tabla.
   */
  disponiblesSeleccionadasFila!: DisponiblesTabla | null;

  /**
   * Configuración de las columnas para la tabla de mercancías seleccionadas.
   *
   * Define los encabezados y las claves para mostrar los datos de las mercancías seleccionadas.
   */
  public seleccionadasEncabezados: ConfiguracionColumna<SeleccionadasTabla>[] =SLECCIONADAS_ENCABEZADOS;
    
  /**
   * Datos de la tabla de mercancías seleccionadas.
   *
   * Contiene la lista de mercancías que han sido seleccionadas por el usuario.
   */
  mercanciaSeleccionadasTablaDatos: SeleccionadasTabla[] = [];

  /**
   * Fila seleccionada en la tabla de mercancías seleccionadas.
   *
   * Representa la mercancía seleccionada actualmente en la tabla de mercancías seleccionadas.
   */
  mercanciaSeleccionadasFila!: SeleccionadasTabla | null;

  /**
   * Configuración para la selección de filas en las tablas.
   *
   * Define las opciones de selección para las tablas de mercancías.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * Texto de alerta para mostrar mensajes relacionados con terceros.
   *
   * Este texto se utiliza para advertir al usuario sobre ciertas acciones o restricciones.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Referencia al elemento del modal para gestionar archivos.
   *
   * Se utiliza para abrir o cerrar el modal de archivos.
   */
  @ViewChild('modalArchivo') modalArchivo!: ElementRef;

  /**
   * Referencia al elemento del modal para buscar mercancías.
   *
   * Se utiliza para abrir o cerrar el modal de búsqueda.
   */
  @ViewChild('modalBuscar') modalBuscar!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   *
   * Se utiliza para cerrar el modal de manera programada.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Formulario para gestionar los archivos adjuntos.
   *
   * Permite capturar y validar los datos relacionados con los archivos adjuntos.
   */
  formularioArchivo!: FormGroup;

  /**
   * Nombre del archivo seleccionado.
   *
   * Contiene el nombre del archivo que el usuario ha seleccionado para adjuntar.
   */
  nombreArchivo: string = '';

  /**
   * Opciones disponibles para el Tratado Comercial.
   *
   * Contiene una lista de opciones que el usuario puede seleccionar para el Tratado Comercial.
   */
  optionsTratado: Catalogo[] = [];

  /**
   * Opciones disponibles para los países.
   *
   * Contiene una lista de países que el usuario puede seleccionar.
   */
  optionsPais: Catalogo[] = [];

  /**
   * Fecha inicial predefinida para el formulario.
   *
   * Se utiliza como valor inicial para el campo de fecha inicial.
   */
  fechaInicialInput: InputFecha = FECHA_INICIAL;

  /**
   * Fecha final predefinida para el formulario.
   *
   * Se utiliza como valor inicial para el campo de fecha final.
   */
  fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Formulario para gestionar los datos de mercancías.
   *
   * Permite capturar y validar los datos relacionados con las mercancías.
   */
  formularioMercancia!: FormGroup;

  /**
   * Fecha de la factura predefinida para el formulario.
   *
   * Se utiliza como valor inicial para el campo de fecha de factura.
   */
  fechaFacturaInput: InputFecha = FECHA_FACTURA;

  /**
   * Opciones disponibles para el tipo de factura.
   *
   * Contiene una lista de tipos de factura que el usuario puede seleccionar.
   */
  optionsTipoFactura: Catalogo[] = [];

  /**
   * Indica si el modal está en modo edición.
   * 
   * Cuando es true, el modal está editando una mercancía existente.
   * Cuando es false, el modal está agregando una nueva mercancía.
   */
  modoEdicion: boolean = false;

  /**
   * ID de la mercancía que se está editando.
   * 
   * Se utiliza para identificar qué mercancía se está modificando.
   */
  mercanciaEditandoId: number | null = null;

  /**
   * Subject para notificar la destrucción del componente.
   *
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Constructor del componente CertificadoOrigenComponent.
   *
   * Este constructor inicializa las dependencias necesarias para el funcionamiento del componente.
   *
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {CertificadosOrigenService} certificadosOrigenService - Servicio para gestionar datos relacionados con el Certificado de Origen.
   * @param {Tramite110217Store} store - Store para gestionar el estado del trámite 110217.
   * @param {Tramite110217Query} tramiteQuery - Query para consultar el estado del trámite 110217.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para realizar validaciones personalizadas en los formularios.
   */
  constructor(
    public fb: FormBuilder,
    private certificadosOrigenService: CertificadosOrigenService,
    public store: Tramite110217Store,
    public tramiteQuery: Tramite110217Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery,
    private cdr: ChangeDetectorRef 
  ) {}

  /**
   * Inicializa el componente.
   *
   * Este método configura los formularios y carga los datos iniciales necesarios para el Certificado de Origen.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {     
          this.consultaDatos = seccionState;     
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarFormulario();
        })
      )
      .subscribe();
    this.mercanciaDisponsiblesTablaDatos = this.solicitudState?.mercanciaDisponsiblesTablaDatos ?? [];
    this.mercanciaSeleccionadasTablaDatos = this.solicitudState?.mercanciaSeleccionadasTablaDatos ?? [];
    this.inicializarFormularioCertificado();
    this.inicializarFormularioMercancia();
    this.inicializarFormularioArchivo();
    this.cargarTratado();
    this.cargarPais();
  }

  /**
   * Inicializa el estado de los formularios según el modo de solo lectura.
   *
   * Este método habilita o deshabilita los formularios programáticamente según el valor de `soloLectura`.
   */
  inicializarFormulario(): void {
    if (this.soloLectura) {
      this.formularioCertificado?.disable();
      this.formularioMercancia?.disable();
      this.formularioArchivo?.disable();
    } else {
      this.formularioCertificado?.enable();
      this.formularioMercancia?.enable();
      this.formularioArchivo?.enable();
    }
  }
  /**
   * Actualiza un valor en el store del trámite.
   *
   * Este método permite actualizar un valor específico en el store del trámite utilizando el formulario y el método correspondiente.
   *
   * @param {FormGroup} form - El formulario que contiene el valor a actualizar.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite110217Store} metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110217Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Obtiene el grupo de formulario relacionado con el operador.
   *
   * @returns {FormGroup} El grupo de formulario del operador.
   */
  get grupoOperador(): FormGroup {
    return this.formularioCertificado.get('grupoOperador') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario relacionado con el domicilio.
   *
   * @returns {FormGroup} El grupo de formulario del domicilio.
   */
  get grupoDeDomicilio(): FormGroup {
    return this.formularioCertificado.get('grupoDeDomicilio') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario relacionado con el tratado.
   *
   * @returns {FormGroup} El grupo de formulario del tratado.
   */
  get grupoTratado(): FormGroup {
    return this.formularioCertificado.get('grupoTratado') as FormGroup;
  }

  /**
   * Inicializa el formulario principal del Certificado de Origen.
   *
   * Este método configura los campos y validaciones del formulario principal utilizando los datos del estado actual del trámite.
   */
  inicializarFormularioCertificado(): void {
    this.formularioCertificado = this.fb.group({
      tercerOperador: [this.solicitudState?.tercerOperador],
      grupoOperador: this.fb.group({
        nombre: [this.solicitudState?.grupoOperador?.nombre, []],
        apellidoPrimer: [
          this.solicitudState?.grupoOperador?.apellidoPrimer,
          [],
        ],
        apellidoSegundo: [
          this.solicitudState?.grupoOperador?.apellidoSegundo,
          [],
        ],
        numeroFiscal: [
          this.solicitudState?.grupoOperador?.numeroFiscal,
          [Validators.required],
        ],
        razonSocial: [this.solicitudState?.grupoOperador?.razonSocial, []],
      }),
      grupoDeDomicilio: this.fb.group({
        pais: [this.solicitudState?.grupoTratado?.pais, []],
        ciudad: [
          this.solicitudState?.grupoDeDomicilio?.ciudad,
          [Validators.maxLength(20)],
        ],
        calle: [
          this.solicitudState?.grupoDeDomicilio?.calle,
          [Validators.maxLength(90)],
        ],
        numeroLetra: [
          this.solicitudState?.grupoDeDomicilio?.numeroLetra,
          [Validators.maxLength(30)],
        ],
        lada: [this.solicitudState?.grupoDeDomicilio?.lada, []],
        telefono: [
          this.solicitudState?.grupoDeDomicilio?.telefono,
          [Validators.pattern(REGEX_SOLO_DIGITOS), Validators.maxLength(20)],
        ],
        fax: [
          this.solicitudState?.grupoDeDomicilio?.fax,
          [Validators.pattern(REGEX_SOLO_DIGITOS), Validators.maxLength(20)],
        ],
        correoElectronico: [
          this.solicitudState?.grupoDeDomicilio?.correoElectronico,
          [Validators.pattern(REGEX_CORREO_ELECTRONICO)],
        ],
      }),
      grupoTratado: this.fb.group({
        tratado: [
          this.solicitudState?.grupoTratado?.tratado,
          [Validators.required],
        ],
        pais: [this.solicitudState?.grupoTratado?.pais, [Validators.required]],
        fraccionArancelaria: [
          this.solicitudState?.grupoTratado?.fraccionArancelaria,
          [Validators.maxLength(8)],
        ],
        numeroRegistro: [
          this.solicitudState?.grupoTratado?.numeroRegistro,
          [Validators.maxLength(12)],
        ],
        nombreComercial: [
          this.solicitudState?.grupoTratado?.nombreComercial,
          [Validators.maxLength(200)],
        ],
        fechaFinal: [this.solicitudState?.grupoTratado?.fechaFinalInput, []],
        fechaInicial: [
          this.solicitudState?.grupoTratado?.fechaInicialInput,
          [],
        ],
      }),
    });
  }

  /**
   * Inicializa el formulario relacionado con las mercancías.
   *
   * Este método configura los campos y validaciones del formulario de mercancías utilizando los datos del estado actual del trámite.
   */
  inicializarFormularioMercancia(): void {
    this.formularioMercancia = this.fb.group({
      id: [null], // Campo ID agregado para rastrear elementos de mercancía
      fraccionMercanciaArancelaria: [
        this.solicitudState?.formularioMercancia?.fraccionMercanciaArancelaria,
        [],
      ],
      nombreComercialDelaMercancia: [
        this.solicitudState?.formularioMercancia?.nombreComercialDelaMercancia,
        [],
      ],
      nombreTecnico: [
        this.solicitudState?.formularioMercancia?.nombreTecnico,
        [],
      ],
      nombreEnIngles: [
        this.solicitudState?.formularioMercancia?.nombreEnIngles,
        [],
      ],
      otrasInstancias: [
        this.solicitudState?.formularioMercancia?.otrasInstancias,
        [],
      ],
      criterioParaConferir: [
        this.solicitudState?.formularioMercancia?.criterioParaConferir,
        [],
      ],
      cantidad: [
        this.solicitudState?.formularioMercancia?.cantidad,
        [Validators.required, Validators.pattern(/^\d+$/)],
      ],
      pais: [this.solicitudState?.formularioMercancia?.pais, [Validators.required]],
      valorDelaMercancia: [
        this.solicitudState?.formularioMercancia?.valorDelaMercancia,
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      complementoDelaDescripcion: [
        this.solicitudState?.formularioMercancia?.complementoDelaDescripcion,
        [Validators.required],
      ],
      fecha: [
        this.solicitudState?.formularioMercancia?.fecha,
        [Validators.required],
      ],
      numeroFactura: [
        this.solicitudState?.formularioMercancia?.numeroFactura,
        [Validators.required],
      ],
      tipoFactura: [
        this.solicitudState?.formularioMercancia?.tipoFactura,
        [Validators.required],
      ],
    });
    
  }

  /**
   * Inicializa el formulario para gestionar archivos.
   *
   * Este método configura los campos y validaciones del formulario relacionado con los archivos adjuntos.
   */
  inicializarFormularioArchivo(): void {
    this.formularioArchivo = this.fb.group({
      archivo: [this.solicitudState?.tercerOperador, [Validators.required]],
    });
  }

  /**
   * Verifica si un campo específico de un formulario es válido.
   *
   * Este método utiliza el servicio de validaciones para determinar si un campo es válido.
   *
   * @param {FormGroup} form - El formulario que contiene el campo a validar.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Deshabilita la funcionalidad del formulario.
   *
   * Este método establece la propiedad `estaDeshabilitado` en `true` para deshabilitar el formulario.
   */
  onClick(): void {
    this.estaDeshabilitado = true;
  }

  /**
   * Carga las opciones disponibles para el Tratado Comercial.
   *
   * Este método obtiene las opciones de tratado desde el servicio `CertificadosOrigenService` y las asigna a `optionsTratado`.
   */
  cargarTratado(): void {
    this.certificadosOrigenService
      .obtenerTratado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsTratado = datos.datos;
      });
  }

  /**
   * Carga las opciones disponibles para los países.
   *
   * Este método obtiene las opciones de países desde el servicio `CertificadosOrigenService` y las asigna a `optionsPais` y `optionsTipoFactura`.
   */
  cargarPais(): void {
    this.certificadosOrigenService
      .obtenerPais()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsPais = datos.datos;
        this.optionsTipoFactura = datos.datos;
      });
  }

  /**
   * Carga las mercancías disponibles para la tabla.
   *
   * Este método obtiene las mercancías disponibles desde el servicio `CertificadosOrigenService` y las asigna a `mercanciaDisponsiblesTablaDatos`.
   */
  cargarMercanciasDisponibles(): void {
    this.certificadosOrigenService
      .obtenerMercanciasDisponibles()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.mercanciaDisponsiblesTablaDatos = respuesta;
      });
  }

  /**
   * Carga las mercancías seleccionadas para la tabla.
   *
   * Este método obtiene las mercancías seleccionadas desde el servicio `CertificadosOrigenService` y las asigna a `mercanciaSeleccionadasTablaDatos`.
   */
  cargarMercanciasSeleccionadas(): void {
    this.certificadosOrigenService
      .obtenerMercanciasSeleccionadas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.mercanciaSeleccionadasTablaDatos = respuesta;
      });
  }

  /**
   * Maneja la selección de filas en la tabla de mercancías disponibles.
   *
   * Este método asigna la fila seleccionada a `disponiblesSeleccionadasFila`, 
   * popula el formulario de mercancías con los datos de la fila seleccionada
   * y muestra el modal de búsqueda si está disponible.
   *
   * @param {DisponiblesTabla} evento - La fila seleccionada en la tabla de mercancías disponibles.
   */
  disponiblesSeleccionDeFilas(evento: DisponiblesTabla): void {
    if (!this.soloLectura) {      
      this.disponiblesSeleccionadasFila = evento;
      this.modoEdicion = false;
      this.mercanciaEditandoId = null;
      // Restablecer bandera de error al abrir modal
      this.esFormaValido = false;
      
      if (this.modalBuscar) {
        if (!this.modalInstances) {
          this.modalInstances = new Modal(this.modalBuscar.nativeElement);
        }
        // Restablecer formulario y limpiar errores de validación
        this.formularioMercancia.reset();
        this.formularioMercancia.markAsUntouched();
        this.formularioMercancia.markAsPristine();
        
        // Limpiar estado de validación para todos los controles del formulario
        Object.keys(this.formularioMercancia.controls).forEach(key => {
          const CONTROL = this.formularioMercancia.get(key);
          if (CONTROL) {
            CONTROL.markAsUntouched();
            CONTROL.markAsPristine();
            CONTROL.setErrors(null);
          }
        });
        
        this.formularioMercancia.patchValue({
          id: null, // Limpiar ID para nueva mercancía
          fraccionMercanciaArancelaria: this.disponiblesSeleccionadasFila.fraccionArancelaria,
          nombreComercialDelaMercancia: this.disponiblesSeleccionadasFila.nombreComercial,
          nombreTecnico: this.disponiblesSeleccionadasFila.nombreTecnico,
        });
        this.modalInstances?.show();
      }
    }
  }
  /**
   * Maneja la selección de filas en la tabla de mercancías seleccionadas.
   *
   * Este método asigna la fila seleccionada a `mercanciaSeleccionadasFila`.
   *
   * @param {SeleccionadasTabla} evento - La fila seleccionada en la tabla de mercancías seleccionadas.
   */
  seleccionDeFilas(evento: SeleccionadasTabla): void {
    this.mercanciaSeleccionadasFila = evento;
  }

  /**
   * Elimina la fila seleccionada de la tabla de mercancías seleccionadas.
   *
   * Este método elimina la mercancía seleccionada de la lista `mercanciaSeleccionadasTablaDatos` y limpia la selección actual.
   */
  eliminar(): void {
    if (this.mercanciaSeleccionadasFila) {
      this.mercanciaSeleccionadasTablaDatos =
        this.mercanciaSeleccionadasTablaDatos.filter(
          (elementos) => this.mercanciaSeleccionadasFila?.id !== elementos.id
        );
      this.mercanciaSeleccionadasFila = null;
    }
  }

  /**
   * Muestra el modal para cargar un archivo.
   *
   * Este método utiliza el modal de Bootstrap para mostrar el modal de carga de archivos.
   */
  cargaArchivo(): void {
    if (this.modalArchivo) {
      const MODAL_INSTANCE = new Modal(this.modalArchivo.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Maneja la selección de un archivo en el input de carga de archivos.
   *
   * Este método actualiza el nombre del archivo seleccionado en la propiedad `nombreArchivo`.
   *
   * @param {Event} event - El evento generado al seleccionar un archivo.
   */
  alSeleccionarArchivo(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const FILE = INPUT?.files ? INPUT.files[0] : null;
    this.nombreArchivo = FILE ? FILE.name : 'Sin archivos seleccionados';
  }

  /**
   * Envía los datos y cierra el modal.
   *
   * Este método realiza el envío de datos y cierra el modal de manera programada.
   */
  enviar(): void {
    this.cerrarModal();
  }

    modalInstances: Modal | null = null;

  /**
   * Agrega una nueva mercancía a la tabla de mercancías seleccionadas.
   *
   * Este método toma los datos del formulario de mercancías y los transforma en un
   * objeto `SeleccionadasTabla` y actualiza el arreglo `mercanciaSeleccionadasTablaDatos`.
   * Si ya existe un elemento con el mismo ID, lo actualiza; de lo contrario, agrega el nuevo elemento.
   * El arreglo actualizado se almacena usando `store.setMercanciaTablaDatos`.
   * Finalmente, cierra el modal si está abierto.
   *
   * @param formularioMercancia - El formulario reactivo que contiene los datos de la mercancía.
   */
  activarModal(formularioMercancia: FormGroup): void {
    // Verificar específicamente cada campo requerido
    const REQUIRED_FIELDS = ['cantidad', 'pais', 'valorDelaMercancia', 'complementoDelaDescripcion', 'fecha', 'numeroFactura', 'tipoFactura'];
    let hasEmptyRequiredFields = false;
    
    REQUIRED_FIELDS.forEach(fieldName => {
      const CONTROL = formularioMercancia.get(fieldName);
      const VALUE = CONTROL?.value;
      
      if (!VALUE || VALUE === '' || VALUE === null || VALUE === undefined) {
        hasEmptyRequiredFields = true;
        // Establecer manualmente el error requerido si Angular no lo detectó
        if (CONTROL && CONTROL.valid) {
          CONTROL.setErrors({ required: true });
        }
      }
    });

    if (formularioMercancia.invalid || hasEmptyRequiredFields) {
      // Marcar todos los campos como tocados para mostrar mensajes de error
      Object.keys(formularioMercancia.controls).forEach(key => {
        const CONTROL = formularioMercancia.get(key);
        if (CONTROL) {
          CONTROL.markAsTouched();
          CONTROL.markAsDirty();
        }
      });
      // Forzar detección de cambios para mostrar errores de validación
      this.cdr.detectChanges();
      // Mostrar mensaje de error cuando el formulario es inválido
      this.esFormaValido = true;
      return; // Salir de la función si el formulario es inválido
    }

    // Ocultar mensaje de error cuando el formulario es válido
    this.esFormaValido = false;

    const FORM_VALUES = formularioMercancia.value;
    // Determinar el ID basado en el modo de edición
    let merchandiseId: number;
    if (this.modoEdicion && this.mercanciaEditandoId) {
      merchandiseId = this.mercanciaEditandoId;
    } else {
      merchandiseId = this.mercanciaSeleccionadasTablaDatos.length + 1;
    }
    
    const NUEVA_MERCANCIA: SeleccionadasTabla = {
      id: merchandiseId,
      fraccionArancelaria: FORM_VALUES.fraccionMercanciaArancelaria,
      cantidad: FORM_VALUES.cantidad,
      unidadMedida: FORM_VALUES.pais,
      valorMercancia: FORM_VALUES.valorDelaMercancia,
      tipoFactura: FORM_VALUES.tipoFactura,
      numFactura: FORM_VALUES.numeroFactura,
      complementoDescripcion: FORM_VALUES.complementoDelaDescripcion,
      fechaFactura: FORM_VALUES.fecha,
    };

    if (this.modoEdicion && this.mercanciaEditandoId) {
      // Actualizar mercancía existente
      const INDEX = this.mercanciaSeleccionadasTablaDatos.findIndex(
        item => item.id === this.mercanciaEditandoId
      );
      if (INDEX !== -1) {
        // Crear nueva referencia de array para detección de cambios adecuada
        const UPDATED_ARRAY = [...this.mercanciaSeleccionadasTablaDatos];
        UPDATED_ARRAY[INDEX] = NUEVA_MERCANCIA;
        this.mercanciaSeleccionadasTablaDatos = UPDATED_ARRAY;
        // Forzar detección de cambios para actualización de tabla
        this.cdr.detectChanges();
      }
    } else {
      // Agregar nueva mercancía
      this.mercanciaSeleccionadasTablaDatos = [
        ...this.mercanciaSeleccionadasTablaDatos,
        NUEVA_MERCANCIA
      ];
    }
    this.store.setMercanciaTablaDatos(this.mercanciaSeleccionadasTablaDatos);
    // Actualizar la referencia de la fila seleccionada si era la que se estaba editando
    if (this.modoEdicion && this.mercanciaEditandoId && this.mercanciaSeleccionadasFila) {
      const UPDATED_ROW = this.mercanciaSeleccionadasTablaDatos.find(
        item => item.id === this.mercanciaEditandoId
      );
      if (UPDATED_ROW) {
        this.mercanciaSeleccionadasFila = UPDATED_ROW;
      }
    }
    // Restablecer modo de edición
    this.modoEdicion = false;
    this.mercanciaEditandoId = null;
    if (this.modalInstances) {
      this.modalInstances.hide();
    }
  }

  /**
   * Abre el modal para modificar la mercancía seleccionada.
   * 
   * Este método popula el formulario con los datos de la mercancía seleccionada
   * y también incluye datos de las mercancías disponibles si hay una fila seleccionada.
   */
modificarMercanciaSeleccionada(mercanciaSeleccionadasTablaDatos: SeleccionadasTabla): void {
  
  this.mercanciaSeleccionadasFila = mercanciaSeleccionadasTablaDatos;
  this.modoEdicion = true;
  this.mercanciaEditandoId = mercanciaSeleccionadasTablaDatos.id;
  // Restablecer bandera de error al abrir modal
  this.esFormaValido = false;
  
  const FORM_VALUES = mercanciaSeleccionadasTablaDatos;
     if (this.modalBuscar) {
        if (!this.modalInstances) {
          this.modalInstances = new Modal(this.modalBuscar.nativeElement);
        }
      }
      this.modalInstances?.show();
      
    // Restablecer formulario y limpiar errores de validación
    this.formularioMercancia.reset();
    this.formularioMercancia.markAsUntouched();
    this.formularioMercancia.markAsPristine();
    
    // Limpiar estado de validación para todos los controles del formulario
    Object.keys(this.formularioMercancia.controls).forEach(key => {
      const CONTROL = this.formularioMercancia.get(key);
      if (CONTROL) {
        CONTROL.markAsUntouched();
        CONTROL.markAsPristine();
        CONTROL.setErrors(null);
      }
    });
    
    this.formularioMercancia.patchValue({
      id: FORM_VALUES.id,
      fraccionMercanciaArancelaria: FORM_VALUES.fraccionArancelaria,
      cantidad: FORM_VALUES.cantidad,
      pais: FORM_VALUES.unidadMedida,
      valorDelaMercancia: FORM_VALUES.valorMercancia,
      tipoFactura: FORM_VALUES.tipoFactura,
      numeroFactura: FORM_VALUES.numFactura,
      complementoDelaDescripcion: FORM_VALUES.complementoDescripcion,
      fecha: FORM_VALUES.fechaFactura,
    });
    
    // Forzar detección de cambios para asegurar que la UI se actualice
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
}

  /**
   * Cierra el modal activo.
   *
   * Este método utiliza la referencia al botón de cierre del modal para cerrarlo
   * y resetea el modo de edición.
   */
  cerrarModal(): void {
    // Resetear modo edición
    this.modoEdicion = false;
    this.mercanciaEditandoId = null;
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Cambia la fecha inicial en el formulario del Certificado de Origen.
   *
   * Este método actualiza el valor de la fecha inicial en el formulario y en el store del trámite.
   *
   * @param {string} nuevo_fechaIncial - La nueva fecha inicial a establecer.
   */
  cambioFechaInicial(nuevo_fechaIncial: string): void {
    this.formularioCertificado.patchValue({
      grupoTratado: {
        fechaInicial: nuevo_fechaIncial,
      },
    });
    this.setValoresStore(
      this.grupoTratado,
      'fechaInicial',
      'setGrupoTratadoFechaFinalInput'
    );
  }

  /**
   * Cambia la fecha final en el formulario del Certificado de Origen.
   *
   * Este método actualiza el valor de la fecha final en el formulario y en el store del trámite.
   *
   * @param {string} nuevo_fechaFinal - La nueva fecha final a establecer.
   */
  cambioFechaFinal(nuevo_fechaFinal: string): void {
    this.formularioCertificado.patchValue({
      grupoTratado: {
        fechaFinal: nuevo_fechaFinal,
      },
    });
    this.setValoresStore(
      this.grupoTratado,
      'fechaFinal',
      'setGrupoTratadoFechaInicialInput'
    );
  }

  /**
   * Cambia la fecha de la factura en el formulario de mercancías.
   *
   * Este método actualiza el valor de la fecha de la factura en el formulario y en el store del trámite.
   *
   * @param {string} nuevo_fechaFin - La nueva fecha de la factura a establecer.
   */
  cambioFechaFactura(nuevo_fechaFin: string): void {
    this.formularioMercancia.patchValue({ fecha: nuevo_fechaFin });
    this.setValoresStore(this.formularioMercancia, 'fecha', 'setFecha');
  }

  /**
   * Limpia los observables al destruir el componente.
   *
   * Este método emite un valor en el `destroyNotifier$` y completa el observable para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
