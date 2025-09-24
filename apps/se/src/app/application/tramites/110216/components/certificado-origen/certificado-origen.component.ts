import {
  AlertComponent,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  InputFecha,
  InputFechaComponent,
  REGEX_PATRON_DECIMAL_2,
  REGEX_SOLO_DIGITOS,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService
} from "@libs/shared/data-access-user/src";
import {
  Catalogo,
  CatalogoLista,
  DisponiblesTabla,
  SeleccionadasTabla
} from "../../models/certificado-origen.model.js";
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  ConsultaioQuery,
  ConsultaioState
} from "@ng-mf/data-access-user";
import {
  DISPONIBLES_ENCABEZADOS,
  FECHAFACTURA,
  FECHAFINAL,
  FECHAINICIAL,
  SELECCIONADAS_ENCABEZADOS,
  TERCEROS_TEXTO_DE_ALERTA
} from '../../constants/inicialmente-certificado-origen.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, map, takeUntil } from "rxjs";
import {
  Tramite110216State,
  Tramite110216Store
} from "../../../../estados/tramites/tramite110216.store";
import { CertificadosOrigenService } from "../../services/certificado-origen.service";
import { CommonModule } from "@angular/common";
import { Modal } from 'bootstrap';
import { ToastrService } from "ngx-toastr";
import {
  Tramite110216Query
} from "../../../../estados/queries/tramite110216.query";

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
    InputFechaComponent
  ],
  providers: [ToastrService],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
})
export class CertificadoOrigenComponent implements OnInit, OnDestroy {

  /**
 * Formulario principal para capturar los datos del Certificado de Origen.
 */
  formularioCertificado!: FormGroup;

  /**
   * Estado actual del trámite 110216.
   * 
   * Contiene toda la información relacionada con el estado del trámite.
   */
  public solicitudState!: Tramite110216State;

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
  public seleccionadasEncabezados: ConfiguracionColumna<SeleccionadasTabla>[] = SELECCIONADAS_ENCABEZADOS;
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
   * Referencia al elemento del modal de modificación.
   * 
   * Se utiliza para abrir o cerrar el modal de modificación de mercancías.
   */
  modalInstances: Modal | null = null;
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
  optionsTratado!: Catalogo[];

  /**
   * Opciones disponibles para los países.
   * 
   * Contiene una lista de países que el usuario puede seleccionar.
   */
  optionsPais!: Catalogo[];

  /**
   * Fecha inicial predefinida para el formulario.
   * 
   * Se utiliza como valor inicial para el campo de fecha inicial.
   */
  fechaInicialInput: InputFecha = FECHAINICIAL;

  /**
   * Fecha final predefinida para el formulario.
   * 
   * Se utiliza como valor inicial para el campo de fecha final.
   */
  fechaFinalInput: InputFecha = FECHAFINAL;

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
  fechaFacturaInput: InputFecha = FECHAFACTURA;

  /**
   * Opciones disponibles para el tipo de factura.
   * 
   * Contiene una lista de tipos de factura que el usuario puede seleccionar.
   */
  optionsTipoFactura!: Catalogo[];
  /**
     * @property {ConsultaioState} consultaDatos
     * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
     */
  consultaDatos!: ConsultaioState;
  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  soloLectura: boolean = false;
  /**
   * Constructor del componente CertificadoOrigenComponent.
   * 
   * Este constructor inicializa las dependencias necesarias para el funcionamiento del componente.
   * 
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {CertificadosOrigenService} certificadosOrigenService - Servicio para gestionar datos relacionados con el Certificado de Origen.
   * @param {Tramite110216Store} store - Store para gestionar el estado del trámite 110216.
   * @param {Tramite110216Query} tramiteQuery - Query para consultar el estado del trámite 110216.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para realizar validaciones personalizadas en los formularios.
   * @param {ConsultaioQuery} consultaioQuery - Query para consultar el estado del trámite 110216.
   */
  constructor(
    public fb: FormBuilder,
    private certificadosOrigenService: CertificadosOrigenService,
    public store: Tramite110216Store,
    public tramiteQuery: Tramite110216Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery,
    private cdr: ChangeDetectorRef

  ) { }

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
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.mercanciaDisponsiblesTablaDatos = this.solicitudState.mercanciaDisponsiblesTablaDatos ?? [];
    this.mercanciaSeleccionadasTablaDatos = this.solicitudState.mercanciaSeleccionadasTablaDatos ?? [];
    this.inicializarFormularioCertificado();
    this.inicializarFormularioMercancia();
    this.inicializarFormularioArchivo();
    this.cargarTratado();
    this.cargarPais();
  }

  /**
   * Actualiza un valor en el store del trámite.
   * 
   * Este método permite actualizar un valor específico en el store del trámite utilizando el formulario y el método correspondiente.
   * 
   * @param {FormGroup} form - El formulario que contiene el valor a actualizar.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite110216Store} metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110216Store): void {
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
        nombre: [this.solicitudState?.grupoOperador?.nombre, [Validators.maxLength(25)]],
        apellidoPrimer: [this.solicitudState?.grupoOperador?.apellidoPrimer, [Validators.maxLength(15)]],
        apellidoSegundo: [this.solicitudState?.grupoOperador?.apellidoSegundo, [Validators.maxLength(15)]],
        numeroFiscal: [this.solicitudState?.grupoOperador?.numeroFiscal, [Validators.required]],
        razonSocial: [{ value: this.solicitudState?.grupoOperador?.razonSocial, disabled: true }],
      }),
      grupoDeDomicilio: this.fb.group({
        pais: [this.solicitudState?.grupoDeDomicilio?.pais, []],
        ciudad: [this.solicitudState?.grupoDeDomicilio?.ciudad, []],
        calle: [this.solicitudState?.grupoDeDomicilio?.calle, []],
        numeroLetra: [this.solicitudState?.grupoDeDomicilio?.numeroLetra, []],
        lada: [this.solicitudState?.grupoDeDomicilio?.lada, []],
        telefono: [this.solicitudState?.grupoDeDomicilio?.telefono, [Validators.pattern(REGEX_SOLO_DIGITOS)]],
        fax: [this.solicitudState?.grupoDeDomicilio?.fax, [Validators.pattern(REGEX_SOLO_DIGITOS)]],
        correoElectronico: [this.solicitudState?.grupoDeDomicilio?.correoElectronico, [Validators.email]],
      }),
      grupoTratado: this.fb.group({
        tratado: [this.solicitudState?.grupoTratado?.tratado, [Validators.required]],
        pais: [this.solicitudState?.grupoTratado?.pais, [Validators.required]],
        fraccionArancelaria: [this.solicitudState?.grupoTratado?.fraccionArancelaria, []],
        numeroRegistro: [this.solicitudState?.grupoTratado?.numeroRegistro, []],
        nombreComercial: [this.solicitudState?.grupoTratado?.nombreComercial, []],
        fechaFinal: [this.solicitudState?.grupoTratado?.fechaFinalInput, []],
        fechaInicial: [this.solicitudState?.grupoTratado?.fechaInicialInput, []],
      }),
    });
    this.inicializarEstadoFormulario();
  }

/**
 * Actualiza el estado habilitado o deshabilitado de los controles del formulario dentro del FormGroup 'grupoOperador'
 * según los valores actuales de 'razonSocial', 'nombre', 'apellidoPrimer' y 'apellidoSegundo'.
 *
 * - Si 'razonSocial' tiene un valor no vacío, deshabilita 'nombre', 'apellidoPrimer' y 'apellidoSegundo',
 *   y habilita 'razonSocial'.
 * - Si alguno de 'nombre', 'apellidoPrimer' o 'apellidoSegundo' tiene un valor no vacío, deshabilita 'razonSocial'
 *   y habilita los otros tres campos.
 * - Si todos los campos están vacíos, habilita todos los campos.
 *
 * Se suscribe a los cambios de valor en el FormGroup 'grupoOperador' para actualizar automáticamente el estado
 * cada vez que cambie alguno de los campos relevantes.
 */
actualizarEstadoCampos(): void {
    const GRUPO_OPERADOR_GROUP = this.formularioCertificado.get('grupoOperador') as FormGroup;

    const ACTUALIZAR_ESTADO_CAMPOS = (): void => {
      const RAZON_SOCIAL = GRUPO_OPERADOR_GROUP.get('razonSocial')?.value?.trim();
      const NOMBRE = GRUPO_OPERADOR_GROUP.get('nombre')?.value?.trim();
      const APELLIDO_PRIMER = GRUPO_OPERADOR_GROUP.get('apellidoPrimer')?.value?.trim();
      const APELLIDO_SEGUNDO = GRUPO_OPERADOR_GROUP.get('apellidoSegundo')?.value?.trim();

      if (RAZON_SOCIAL) {
        GRUPO_OPERADOR_GROUP.get('nombre')?.disable({ emitEvent: false });
        GRUPO_OPERADOR_GROUP.get('apellidoPrimer')?.disable({ emitEvent: false });
        GRUPO_OPERADOR_GROUP.get('apellidoSegundo')?.disable({ emitEvent: false });
        GRUPO_OPERADOR_GROUP.get('razonSocial')?.enable({ emitEvent: false });
      } else if (NOMBRE || APELLIDO_PRIMER || APELLIDO_SEGUNDO) {
        GRUPO_OPERADOR_GROUP.get('razonSocial')?.disable({ emitEvent: false });
        GRUPO_OPERADOR_GROUP.get('nombre')?.enable({ emitEvent: false });
        GRUPO_OPERADOR_GROUP.get('apellidoPrimer')?.enable({ emitEvent: false });
        GRUPO_OPERADOR_GROUP.get('apellidoSegundo')?.enable({ emitEvent: false });
      } else {
        GRUPO_OPERADOR_GROUP.get('razonSocial')?.enable({ emitEvent: false });
        GRUPO_OPERADOR_GROUP.get('nombre')?.enable({ emitEvent: false });
        GRUPO_OPERADOR_GROUP.get('apellidoPrimer')?.enable({ emitEvent: false });
        GRUPO_OPERADOR_GROUP.get('apellidoSegundo')?.enable({ emitEvent: false });
      }
    };

    GRUPO_OPERADOR_GROUP.valueChanges.subscribe(() => {
      ACTUALIZAR_ESTADO_CAMPOS();
    });
  }

  /**
   * Inicializa el formulario relacionado con las mercancías.
   * 
   * Este método configura los campos y validaciones del formulario de mercancías utilizando los datos del estado actual del trámite.
   */
  inicializarFormularioMercancia(): void {
 this.formularioMercancia = this.fb.group({
  id: [''],
  fraccionMercanciaArancelaria: [this.solicitudState?.formularioMercancia?.fraccionMercanciaArancelaria],
  nombreComercialDelaMercancia: [this.solicitudState?.formularioMercancia?.nombreComercialDelaMercancia],
  nombreTecnico: [this.solicitudState?.formularioMercancia?.nombreTecnico],
  nombreEnIngles: [this.solicitudState?.formularioMercancia?.nombreEnIngles],
  otrasInstancias: [this.solicitudState?.formularioMercancia?.otrasInstancias],
  criterioParaConferir: [this.solicitudState?.formularioMercancia?.criterioParaConferir],
  cantidad: [
    this.solicitudState?.formularioMercancia?.cantidad,
    [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],
  ],
  pais: ['', [Validators.required]],
  valorDelaMercancia: [
    this.solicitudState?.formularioMercancia?.valorDelaMercancia,
    [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)],
  ],
  complementoDescripcion: [
    this.solicitudState?.formularioMercancia?.complementoDescripcion,
    [Validators.required],
  ],
  fecha: [this.solicitudState?.formularioMercancia?.fecha, [Validators.required]],
  numeroFactura: [
    this.solicitudState?.formularioMercancia?.numeroFactura,
    [Validators.required],
  ],
  tipoFactura: [
    this.solicitudState?.formularioMercancia?.tipoFactura,
    [Validators.required],
  ],
});

    this.inicializarEstadoFormulario();
  }
  /**
   * @method inicializarEstadoFormulario
   * @description Inicializa el estado de los formularios según el modo de solo lectura.
   * 
   * Si la propiedad `soloLectura` es verdadera, deshabilita todos los controles de los formularios:
   * - `formularioCertificado`
   * - `formularioMercancia`
   * - `formularioArchivo`
   * 
   * En caso contrario, habilita todos los controles de los formularios mencionados.
   * 
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
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
 * Inicializa el formulario para gestionar archivos.
 * 
 * Este método configura los campos y validaciones del formulario relacionado con los archivos adjuntos.
 */
  inicializarFormularioArchivo(): void {
    this.formularioArchivo = this.fb.group({
      archivo: ['', [Validators.required]],
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
 * Determina si un campo específico de un formulario es inválido.
 *
 * @param form - El `FormGroup` que contiene los controles del formulario.
 * @param fieldPath - La ruta al campo del formulario que se desea verificar.
 * @returns `true` si el campo especificado es inválido; de lo contrario, `false`.
 */
isInvalid(form: FormGroup, fieldPath: string): boolean {
  return this.checkControlValidity(form, fieldPath); // ✅ uses `this`
}

/**
 * Verifica la validez de un control específico dentro de un FormGroup.
 *
 * Este método retorna `true` si el control existe, es inválido y ha sido tocado o modificado (dirty).
 * Si el servicio de validaciones no está disponible, retorna `false`.
 *
 * @param form - El FormGroup que contiene el control a verificar.
 * @param fieldPath - La ruta al control dentro del FormGroup.
 * @returns `true` si el control es inválido y ha sido interactuado; de lo contrario, `false`.
 */
private checkControlValidity(form: FormGroup, fieldPath: string): boolean {
  if (!this.validacionesService) {
    return false;
  }
  const CONTROL = form.get(fieldPath);
  return Boolean(CONTROL && CONTROL.invalid && (CONTROL.touched || CONTROL.dirty));
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
      .subscribe(
        (datos: CatalogoLista) => {
          this.optionsTratado = datos.datos;
        }
      );
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
      .subscribe(
        (datos: CatalogoLista) => {
          this.optionsPais = datos.datos;
          this.optionsTipoFactura = datos.datos;
        }
      );
  }

  /**
   * Carga las mercancías disponibles para la tabla.
   * 
   * Este método obtiene las mercancías disponibles desde el servicio `CertificadosOrigenService` y las asigna a `mercanciaDisponsiblesTablaDatos`.
   */
  cargarMercanciasDisponibles(): void {
    this.certificadosOrigenService.obtenerMercanciasDisponibles()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.mercanciaDisponsiblesTablaDatos = respuesta;
        this.store.setMercanciaDisponsiblesTablaDatos(this.mercanciaDisponsiblesTablaDatos);
      });
  }

  /**
   * Carga las mercancías seleccionadas para la tabla.
   * 
   * Este método obtiene las mercancías seleccionadas desde el servicio `CertificadosOrigenService` y las asigna a `mercanciaSeleccionadasTablaDatos`.
   */
  cargarMercanciasSeleccionadas(): void {
    this.certificadosOrigenService.obtenerMercanciasSeleccionadas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.mercanciaSeleccionadasTablaDatos = respuesta;
      });
  }

  /**
   * Maneja la selección de filas en la tabla de mercancías disponibles.
   * 
   * Este método asigna la fila seleccionada a `disponiblesSeleccionadasFila` y muestra el modal de búsqueda si está disponible.
   * 
   * @param {DisponiblesTabla} evento - La fila seleccionada en la tabla de mercancías disponibles.
   */
  disponiblesSeleccionDeFilas(evento: DisponiblesTabla): void {
    if (!this.soloLectura) {      
      this.disponiblesSeleccionadasFila = evento;
      if (this.modalBuscar) {
        if (!this.modalInstances) {
          this.modalInstances = new Modal(this.modalBuscar.nativeElement);
        }
        this.formularioMercancia.reset()
        this.formularioMercancia.patchValue({
          id: this.disponiblesSeleccionadasFila.id,
          fraccionMercanciaArancelaria: this.disponiblesSeleccionadasFila.fraccionArancelaria,
          nombreComercialDelaMercancia: this.disponiblesSeleccionadasFila.nombreComercial,
          nombreTecnico: this.disponiblesSeleccionadasFila.nombreTecnico,
        });
        this.modalInstances?.show();
      }
    }
  }

/**
 * Actualiza la fila de mercancía seleccionada y muestra el modal para editar.
 * 
 * Este método asigna los datos de la mercancía seleccionada, inicializa y muestra el modal
 * si aún no está abierto, y actualiza el formulario con los valores de la mercancía seleccionada.
 *
 * @param mercanciaSeleccionadasTablaDatos - Los datos de la mercancía seleccionada de la tabla.
 */
modificarMercanciaSeleccionada(mercanciaSeleccionadasTablaDatos: SeleccionadasTabla): void {
  this.mercanciaSeleccionadasFila = mercanciaSeleccionadasTablaDatos;
  const FORM_VALUES = mercanciaSeleccionadasTablaDatos;
     if (this.modalBuscar) {
        if (!this.modalInstances) {
          this.modalInstances = new Modal(this.modalBuscar.nativeElement);
        }
        this.modalInstances?.show();
      }
    setTimeout(() => {
      this.formularioMercancia.patchValue({
        fraccionMercanciaArancelaria: FORM_VALUES.fraccionArancelaria,
        cantidad: FORM_VALUES.cantidad,
        pais: FORM_VALUES.unidadMedida,
        valorDelaMercancia: FORM_VALUES.valorMercancia,
        tipoFactura: FORM_VALUES.tipoFactura,
        numeroFactura: FORM_VALUES.numFactura,
        complementoDescripcion: FORM_VALUES.complementoDescripcion,
        fecha: FORM_VALUES.fechaFactura,
      });
    }, 0);
  


}

/**
 * Maneja la activación del modal para agregar o editar una mercancía.
 * 
 * Extrae los valores del formulario `formularioMercancia`, construye un nuevo
 * objeto `SeleccionadasTabla` y actualiza el arreglo `mercanciaSeleccionadasTablaDatos`.
 * Si ya existe un elemento con el mismo ID, lo actualiza; de lo contrario, agrega el nuevo elemento.
 * El arreglo actualizado se almacena usando `store.setMercanciaTablaDatos`.
 * Finalmente, cierra el modal si está abierto.
 *
 * @param formularioMercancia - El formulario reactivo que contiene los datos de la mercancía.
 */
activarModal(formularioMercancia: FormGroup): void {
  const FORM_VALUES = formularioMercancia.value;  
  let hasErrors = false;
  Object.keys(this.formularioMercancia.controls).forEach((key) => {
    const CONTROL = this.formularioMercancia.get(key);

    if (CONTROL?.validator && CONTROL.invalid) {
      CONTROL.markAsTouched();
      hasErrors = true;
    }
  });

  if (hasErrors) {
    return;
  }

  const NUEVA_MERCANCIA: SeleccionadasTabla = {
    id: this.mercanciaSeleccionadasFila?.id ?? this.mercanciaSeleccionadasTablaDatos.length + 1,
    fraccionArancelaria: FORM_VALUES.fraccionMercanciaArancelaria,
    cantidad: FORM_VALUES.cantidad,
    unidadMedida: FORM_VALUES.pais,
    valorMercancia: FORM_VALUES.valorDelaMercancia,
    tipoFactura: FORM_VALUES.tipoFactura,
    numFactura: FORM_VALUES.numeroFactura,
    complementoDescripcion: FORM_VALUES.complementoDescripcion,
    fechaFactura: FORM_VALUES.fecha,
  };

  const INDEX = this.mercanciaSeleccionadasTablaDatos.findIndex(
    item => item.id === NUEVA_MERCANCIA.id
  );
this.mercanciaSeleccionadasTablaDatos = []
  if (INDEX !== -1) {
    this.mercanciaSeleccionadasTablaDatos[INDEX] = NUEVA_MERCANCIA;
  } else {
    this.mercanciaSeleccionadasTablaDatos = [
      ...this.mercanciaSeleccionadasTablaDatos,
      NUEVA_MERCANCIA
    ];
  }
  this.store.setMercanciaTablaDatos(this.mercanciaSeleccionadasTablaDatos);

  if (this.modalInstances) {
    this.mercanciaSeleccionadasFila = null;
    this.modalInstances.hide();
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
      this.mercanciaSeleccionadasTablaDatos = this.mercanciaSeleccionadasTablaDatos.filter(elementos => this.mercanciaSeleccionadasFila?.id !== elementos.id);
      this.mercanciaSeleccionadasFila = null;
         this.store.setMercanciaTablaDatos(this.mercanciaSeleccionadasTablaDatos);
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
    this.cargarMercanciasSeleccionadas();
  }

  /**
   * Cierra el modal activo.
   * 
   * Este método utiliza la referencia al botón de cierre del modal para cerrarlo.
   */
  cerrarModal(): void {
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
    this.setValoresStore(this.grupoTratado, 'fechaInicial', 'setGrupoTratadoFechaFinalInput');
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
    this.setValoresStore(this.grupoTratado, 'fechaFinal', 'setGrupoTratadoFechaInicialInput');
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
