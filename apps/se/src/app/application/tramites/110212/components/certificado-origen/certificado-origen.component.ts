import { AbstractControl, FormBuilder, FormGroup,ValidatorFn, Validators } from '@angular/forms';
import { AlertComponent, ConsultaioQuery, ConsultaioState, Notificacion, NotificacionesComponent, REGEX_CORREO_ELECTRONICO, REGEX_PATRON_DECIMAL_15_4, REGEX_SOLO_DIGITOS } from '@libs/shared/data-access-user/src';
import { COLUMNAS_DSPONIBLES, COLUMNAS_SELECCIONADAS, FECHAFACTURA } from '../../constants/validacion-posteriori.enum';
import { Catalogo } from '../../models/validacion-posteriori.model';
import { CatalogoLista } from '../../models/validacion-posteriori.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DisponiblesTabla } from '../../models/validacion-posteriori.model';
import { ElementRef } from '@angular/core';
import { FECHAFINAL } from '../../constants/validacion-posteriori.enum';
import { FECHAINICIAL } from '../../constants/validacion-posteriori.enum';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SeleccionadasTabla } from '../../models/validacion-posteriori.model';
import { Subject } from 'rxjs';
import { TERCEROS_TEXTO_DE_ALERTA } from '../../constants/validacion-posteriori.enum';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { ToastrService } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Tramite110212Query } from '../../../../estados/queries/tramite110212.query';
import { Tramite110212State } from '../../../../estados/tramites/tramite110212.store';
import { Tramite110212Store } from '../../../../estados/tramites/tramite110212.store';
import { ValidacionPosterioriService } from '../../service/validacion-posteriori.service';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

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
    NotificacionesComponent,
    TooltipModule
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
   * Estado actual del trámite 110212.
   *
   * Contiene toda la información relacionada con el estado del trámite.
   */
  public solicitudState!: Tramite110212State;

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
  public disponiblesEncabezados: ConfiguracionColumna<DisponiblesTabla>[] =
    COLUMNAS_DSPONIBLES;

  /**
   * Datos de la tabla de mercancías disponibles
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
  public seleccionadasEncabezados: ConfiguracionColumna<SeleccionadasTabla>[] =
    COLUMNAS_SELECCIONADAS;
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
   * Configuración de notificación para mostrar popups de validación.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Instancia del modal para gestionar archivos.
   *
   * Se utiliza para abrir o cerrar el modal de archivos.
   */
  modalInstances: Modal | null = null;

  /**
   * ID de la última fila seleccionada para detectar doble clic.
   */
  ultimaFilaSeleccionadaId: number | null = null;

  /**
   * Timestamp del último clic para detectar doble clic.
   */
  ultimoClickTimestamp: number = 0;

  /**
   * Tiempo máximo entre clics para considerar doble clic (en milisegundos).
   */
  tiempoMaximoDobleClick: number = 400;

  /**
   * Constructor del componente CertificadoOrigenComponent.
   *
   * Este constructor inicializa las dependencias necesarias para el funcionamiento del componente.
   *
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {CertificadosOrigenService} validacionPosterioriService - Servicio para gestionar datos relacionados con el Certificado de Origen.
   * @param {Tramite110212Store} store - Store para gestionar el estado del trámite 110212.
   * @param {Tramite110212Query} tramiteQuery - Query para consultar el estado del trámite 110212.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para realizar validaciones personalizadas en los formularios.
   */
  constructor(
    public fb: FormBuilder,
    private validacionPosterioriService: ValidacionPosterioriService,
    public store: Tramite110212Store,
    public tramiteQuery: Tramite110212Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery,
  ) { }

  /**
   * Validador personalizado para fechas que no permite fechas futuras.
   * @returns {ValidatorFn} Función de validación
   */
  static noFutureDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      if (!control.value) {
        return null; // No validar si no hay valor
      }

      // Parsear la fecha del formato DD/MM/YYYY
      const DATE_STRING = control.value;
      const DATE_PARTS = DATE_STRING.split('/');
      
      if (DATE_PARTS.length !== 3) {
        return null; // Formato inválido, dejar que otros validadores lo manejen
      }

      const DAY = parseInt(DATE_PARTS[0], 10);
      const MONTH = parseInt(DATE_PARTS[1], 10) - 1; // Los meses en JavaScript son 0-indexados
      const YEAR = parseInt(DATE_PARTS[2], 10);
      
      const SELECTED_DATE = new Date(YEAR, MONTH, DAY);
      const TODAY = new Date();
      TODAY.setHours(23, 59, 59, 999); // Establecer al final del día de hoy
      
      if (SELECTED_DATE > TODAY) {
        return { futureDate: true };
      }
      
      return null;
    };
  }

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
   * @param {keyof Tramite110212Store} metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110212Store
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
   * Obtiene el grupo de formulario relacionado con el operador.
   *
   * @returns {FormGroup} El grupo de formulario del operador.
   */
  get grupoDeDirecciones(): FormGroup {
    return this.formularioCertificado.get('grupoDeDirecciones') as FormGroup;
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
      grupoTratado: this.fb.group({
        tratado: [
          this.solicitudState?.grupoTratado?.tratado,
          [Validators.required],
        ],
        pais: [this.solicitudState?.grupoTratado?.pais, [Validators.required]],
        fraccionArancelaria: [
          this.solicitudState?.grupoTratado?.fraccionArancelaria,
          [],
        ],
        numeroRegistro: [this.solicitudState?.grupoTratado?.numeroRegistro, []],
        nombreComercial: [
          this.solicitudState?.grupoTratado?.nombreComercial,
          [],
        ],
        fechaFinal: [this.solicitudState?.grupoTratado?.fechaFinalInput, []],
        fechaInicial: [
          this.solicitudState?.grupoTratado?.fechaInicialInput,
          [],
        ],
      }),
     grupoDeDirecciones: this.fb.group({
           pais: [
             this.solicitudState?.grupoDeDirecciones?.pais,
           ],
           ciudad: [
             this.solicitudState?.grupoDeDirecciones?.ciudad,
           ],
           calle: [
             this.solicitudState?.grupoDeDirecciones?.calle,
           ],
           numeroLetra: [
             this.solicitudState?.grupoDeDirecciones?.numeroLetra,
            
           ],
           lada: [this.solicitudState?.grupoDeDirecciones?.lada, []],
           telefono: [
             this.solicitudState?.grupoDeDirecciones?.telefono,
             [Validators.pattern(REGEX_SOLO_DIGITOS)],
           ],
           fax: [
             this.solicitudState?.grupoDeDirecciones?.fax,
             [Validators.pattern(REGEX_SOLO_DIGITOS)],
           ],
           correoElectronico: [
             this.solicitudState?.grupoDeDirecciones?.correoElectronico,
             [Validators.pattern(REGEX_CORREO_ELECTRONICO)],
           ],
         }),
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * Inicializa el formulario relacionado con las mercancías.
   *
   * Este método configura los campos y validaciones del formulario de mercancías utilizando los datos del estado actual del trámite.
   */
  inicializarFormularioMercancia(): void {
    this.formularioMercancia = this.fb.group({
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
        this.solicitudState?.formularioMercancia?.nombreEnIngles || 'abc',
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
        [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_15_4)],
      ],
      pais: ['', [Validators.required]],
      valorDelaMercancia: [
        this.solicitudState?.formularioMercancia?.valorDelaMercancia,
        [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_15_4)],
      ],
      complementoDelaDescripcion: [
        this.solicitudState?.formularioMercancia?.complementoDelaDescripcion,
        [Validators.required, Validators.maxLength(200)],
      ],
      fecha: [
        this.solicitudState?.formularioMercancia?.fecha, 
        [Validators.required, CertificadoOrigenComponent.noFutureDateValidator()]
      ],
      numeroFactura: [
        this.solicitudState?.formularioMercancia?.numeroFactura,
        [Validators.required],
      ],
      tipoFactura: [this.solicitudState?.formularioMercancia?.tipoFactura, []],
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
    this.validacionPosterioriService
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
    this.validacionPosterioriService
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
    this.formularioCertificado.markAllAsTouched();

    if (!this.validarCamposRequeridos()) {
      this.mostrarNotificacionValidacion();
      return;
    }

    this.validacionPosterioriService
      .obtenerMercanciasDisponibles()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.mercanciaDisponsiblesTablaDatos = respuesta;
      });
  }

  /**
   * Valida que todos los campos requeridos estén completos.
   * 
   * @returns {boolean} true si todos los campos requeridos están completos, false en caso contrario
   */
  private validarCamposRequeridos(): boolean {
    // Validar campos de "Domicilio del tercer operador" si el checkbox está marcado
    if (this.solicitudState?.tercerOperador) {
      const GRUPO_OPERADOR = this.formularioCertificado.get('grupoOperador');
      if (GRUPO_OPERADOR?.get('numeroFiscal')?.invalid) {
        return false;
      }
    }
    // Validar campos de "Tratado y país o bloque"
    const GRUPO_TRATADO = this.formularioCertificado.get('grupoTratado');
    if (GRUPO_TRATADO?.get('tratado')?.invalid) {
      return false;
    }
    if (GRUPO_TRATADO?.get('pais')?.invalid) {
      return false;
    }

    return true;
  }

  /**
   * Muestra una notificación con los campos que faltan por completar.
   */
  private mostrarNotificacionValidacion(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'action',
      titulo: '',
      mensaje: 'Los datos marcados con asterisco son obligatorios. Favor de capturarlos.',
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  /**
   * Carga las mercancías seleccionadas para la tabla.
   *
   * Este método obtiene las mercancías seleccionadas desde el servicio `CertificadosOrigenService` y las asigna a `mercanciaSeleccionadasTablaDatos`.
   */
  cargarMercanciasSeleccionadas(): void {
    this.validacionPosterioriService
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
   * Ahora requiere doble clic para ejecutar la acción.
   *
   * @param {DisponiblesTabla} evento - La fila seleccionada en la tabla de mercancías disponibles.
   */
  disponiblesSeleccionDeFilas(evento: DisponiblesTabla): void {
    if (!this.soloLectura) {
      const AHORA = Date.now();
      const EVENTO_ID = evento.id ?? 0;
      
      // Verificar si es el mismo elemento y si el tiempo entre clics es válido para doble clic
      const ES_MISMA_FILA = this.ultimaFilaSeleccionadaId === EVENTO_ID;
      const TIEMPO_TRANSCURRIDO = AHORA - this.ultimoClickTimestamp;
      const ES_DOBLE_CLICK = ES_MISMA_FILA && TIEMPO_TRANSCURRIDO <= this.tiempoMaximoDobleClick && TIEMPO_TRANSCURRIDO > 50;

      if (ES_DOBLE_CLICK) {
        // Ejecutar acción de doble clic
        this.abrirModalMercancia(evento);
        
        // Resetear para evitar múltiples ejecuciones
        this.ultimaFilaSeleccionadaId = null;
        this.ultimoClickTimestamp = 0;
      } else {
        // Primer clic: solo guardar la información
        this.ultimaFilaSeleccionadaId = EVENTO_ID;
        this.ultimoClickTimestamp = AHORA;
        this.disponiblesSeleccionadasFila = evento;
      }
    }
  }

  /**
   * Abre el modal de mercancía con los datos seleccionados.
   * 
   * @param {DisponiblesTabla} evento - La fila seleccionada en la tabla de mercancías disponibles.
   */
  private abrirModalMercancia(evento: DisponiblesTabla): void {
    this.disponiblesSeleccionadasFila = evento;
    if (this.modalBuscar) {
      if (!this.modalInstances) {
        this.modalInstances = new Modal(this.modalBuscar.nativeElement);
      }
      
      // Resetear el estado de validación del formulario antes de abrir
      this.resetearEstadoValidacionFormulario();
      
      this.formularioMercancia.patchValue({
        id: this.disponiblesSeleccionadasFila.id,
        fraccionMercanciaArancelaria: this.disponiblesSeleccionadasFila.fraccionArancelaria,
        nombreComercialDelaMercancia: this.disponiblesSeleccionadasFila.nombreComercial,
        nombreTecnico: this.disponiblesSeleccionadasFila.nombreTecnico,
        nombreEnIngles: 'abc',
        criterioParaConferir: 'abc',
        fechaVencimiento: this.disponiblesSeleccionadasFila.fechaVencimiento,
      });
      this.modalInstances?.show();
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

  /**
   * Resetea el estado de validación del formulario de mercancía.
   * 
   * Este método marca todos los controles como no tocados y pristinos,
   * eliminando así las indicaciones visuales de validación.
   */
  private resetearEstadoValidacionFormulario(): void {
    if (this.formularioMercancia) {
      Object.keys(this.formularioMercancia.controls).forEach(key => {
        const CONTROL = this.formularioMercancia.get(key);
        if (CONTROL) {
          CONTROL.markAsUntouched();
          CONTROL.markAsPristine();
        }
      });
    }
  }

  /**
   * Cierra el modal activo.
   *
   * Este método utiliza la referencia al botón de cierre del modal para cerrarlo
   * y resetea el estado de validación del formulario de mercancía.
   */
  cerrarModal(): void {
    // Resetear el estado de validación del formulario
    this.resetearEstadoValidacionFormulario();
    this.formularioMercancia.reset();
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
    this.formularioMercancia.get('fecha')?.markAsTouched();
    this.setValoresStore(this.formularioMercancia, 'fecha', 'setFecha');
  }

  /**
   * Agrega una nueva mercancía a la tabla de mercancías seleccionadas.
   *
   * Este método valida el formulario de mercancía antes de procesar los datos.
   * Si el formulario es válido, toma los datos del formulario de mercancías y los transforma en un
   * objeto `SeleccionadasTabla` y actualiza el arreglo `mercanciaSeleccionadasTablaDatos`.
   * Si ya existe un elemento con el mismo ID, lo actualiza; de lo contrario, agrega el nuevo elemento.
   * El arreglo actualizado se almacena usando `store.setMercanciaTablaDatos`.
   * Finalmente, cierra el modal si está abierto.
   * Si el formulario es inválido, marca todos los campos como tocados para mostrar los mensajes de error.
   *
   * @param formularioMercancia - El formulario reactivo que contiene los datos de la mercancía.
   */
  activarModal(formularioMercancia: FormGroup): void {
    // Validar el formulario antes de procesar
    if (formularioMercancia.invalid) {
      // Marcar todos los campos como tocados para mostrar mensajes de error
      Object.keys(formularioMercancia.controls).forEach(key => {
        const CONTROL = formularioMercancia.get(key);
        if (CONTROL) {
          CONTROL.markAsTouched();
        }
      });
      return; // Salir de la función si el formulario es inválido
    }

    const FORM_VALUES = formularioMercancia.value;

    const NUEVA_MERCANCIA: SeleccionadasTabla = {
      id: FORM_VALUES.id || this.mercanciaSeleccionadasTablaDatos.length + 1,
      fraccionArancelaria: FORM_VALUES.fraccionMercanciaArancelaria,
      cantidad: FORM_VALUES.cantidad,
      unidadMedida: FORM_VALUES.pais,
      valorMercancia: FORM_VALUES.valorDelaMercancia,
      tipoFactura: FORM_VALUES.tipoFactura,
      numFactura: FORM_VALUES.numeroFactura,
      complementoDescripcion: FORM_VALUES.complementoDelaDescripcion,
      fechaFactura: FORM_VALUES.fecha,
    };

    const INDEX = this.mercanciaSeleccionadasTablaDatos.findIndex(
      item => item.id === NUEVA_MERCANCIA.id
    );

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
  const FORM_VALUES = mercanciaSeleccionadasTablaDatos;
     if (this.modalBuscar) {
        if (!this.modalInstances) {
          this.modalInstances = new Modal(this.modalBuscar.nativeElement);
        }
      }
      
      // Resetear el estado de validación del formulario antes de abrir
      this.resetearEstadoValidacionFormulario();
      
      this.modalInstances?.show();
      this.formularioMercancia.patchValue({
      id: FORM_VALUES.id,
      fraccionArancelaria: FORM_VALUES.fraccionArancelaria,
      cantidad: FORM_VALUES.cantidad,
      unidadMedida: FORM_VALUES.unidadMedida,
      valorMercancia: FORM_VALUES.valorMercancia,
      tipoFactura: FORM_VALUES.tipoFactura,
      numFactura: FORM_VALUES.numFactura,
      complementoDescripcion: FORM_VALUES.complementoDescripcion,
      fechaFactura: FORM_VALUES.fechaFactura,
    });
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
