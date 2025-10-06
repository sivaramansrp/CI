/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import {
  BtnContinuarComponent,
  CERTIFICATE_OF_ORIGIN_NUMBER,
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionColumna,
  ConsultaioQuery,
  ConsultaioState,
  DatosPasos,
  InputFecha,
  ListaPasosWizard,
  PASOS,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import {ColumnasTabla,FECHAI_NICIAL, FECHA_FINAL } from '../../models/certificado.model';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject,map, takeUntil } from 'rxjs';
import { Solicitud110219State, Tramite110219Store } from '../../estados/Tramite110219.store';
import { AlertComponent } from '@libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { CatalogoServices } from '@ng-mf/data-access-user';
import { CertificadoService } from '../../services/certificado.service';
import { CommonModule } from '@angular/common';
import { InputFechaComponent } from "@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component";
import { TablaDinamicaComponent } from "@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component";
import { Tramite110219Query } from '../../estados/Tramite110219.query';
/** 
 * Texto de alerta que se muestra para indicar los certificados disponibles.
 */
const TERCEROS_TEXTO_DE_ALERTA = 'Certificados Disponibles';

/**
 * Componente para gestionar la cancelación de certificados.
 */
@Component({
  selector: 'app-cancelacion-de-certificado',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputFechaComponent,
    BtnContinuarComponent,
  ],
  templateUrl: './cancelacion-de-certificado.component.html',
  styleUrl: './cancelacion-de-certificado.component.css',
})
export class CancelacionDeCertificadoComponent implements OnInit, OnDestroy {
  /**
   * Estado de consulta de datos (readonly, etc).
   */
  consultaDatos!: ConsultaioState;

 /**
   * Identificador del trámite actual.
   * 
   * @remarks
   * Este valor representa el código único asociado al trámite que se está gestionando en el componente.
   */
  tramiteId: string = '110219';

   /**
     * Lista de objetos de tipo Catalogo que representa los tratados o acuerdos disponibles para la búsqueda.
     * Se utiliza para mostrar las opciones en el componente de datos de búsqueda.
     */
    tratadoAcuerdo: Catalogo[] = [];
  
    /**
     * Lista de objetos de tipo Catalogo que representa los países disponibles para seleccionar en el bloque correspondiente.
     * Se utiliza para mostrar opciones de países en el componente de búsqueda.
     */
    paisBloque: Catalogo[] = [];

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

  /**
   * Formulario reactivo para la cancelación de certificados.
   */
  cancelacionForm!: FormGroup;

  /**
   * Sujeto para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Datos de la tabla de certificados disponibles.
   */
  public certificadoDisponsiblesTablaDatos: ColumnasTabla[] = [];

  /**
   * Evento para emitir datos al componente padre.
   */
  @Output() dataEvent = new EventEmitter<number>();

  /**
   * Evento para indicar si el número de certificado es válido.
   */
  @Output() isNumeroCertificado = new EventEmitter<boolean>();

  /**
   * Evento para indicar si el patrón del número de certificado es válido.
   */
  @Output() isNumeroCertificadoPattern = new EventEmitter<boolean>();

  /**
   * Evento para habilitar el certificado de origen.
   */
  @Output() certificadoOriginEnable = new EventEmitter<boolean>();

  /**
   * Texto de alerta para mostrar en el componente.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Fecha inicial para el formulario.
   */
  fechaInicialInput: InputFecha = FECHAI_NICIAL;

  /**
   * Fecha final para el formulario.
   */
  fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Estado de la solicitud actual.
   */
  public solicitudState!: Solicitud110219State;

  /**
   * Lista de pasos del asistente (wizard).
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Enumeración para la selección de la tabla.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Indica si se deben mostrar errores en el formulario.
   */
  mostrarErrores: boolean = true;

  /**
   * Indica si se está buscando un certificado.
   */
  estaBuscando: boolean = true;

  /**
   * Indica si el certificado de origen está habilitado.
   */
  isCertificadoOriginEnable: boolean = false;

  /**
   * Catálogo de tratados.
   */
  tratado!: CatalogosSelect;

  /**
   * Catálogo de países.
   */
  pais!: CatalogosSelect;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Mensaje de error a mostrar.
   */
  mensajeError: string = '';

  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Configuración del catálogo de tratados.
   */
  public tratadoCatalogo: CatalogosSelect = {
    labelNombre: 'Tratado / Acuerdo:',
    required: false,
    primerOpcion: 'Selecciona un VALOR',
    catalogos: [],
  };

  /**
   * Configuración del catálogo de países.
   */
  public paisCatalogo: CatalogosSelect = {
    labelNombre: 'País / Bloque:',
    required: false,
    primerOpcion: 'Selecciona un VALOR',
    catalogos: [],
  };

  /**
   * Encabezados de la tabla de certificados disponibles.
   */
  public headers: ConfiguracionColumna<ColumnasTabla>[] = [
    { encabezado: 'Numero de certificado', clave: (ele: ColumnasTabla) => ele.numeroCertificado, orden: 1 },
    { encabezado: 'País/Bloque', clave: (ele: ColumnasTabla) => ele.pais, orden: 2 },
    { encabezado: 'Tratado/Acuerdo', clave: (ele: ColumnasTabla) => ele.tratado, orden: 3 },
    { encabezado: 'Fecha expedicion', clave: (ele: ColumnasTabla) => ele.fechaExpedicion, orden: 4 },
    { encabezado: 'Fecha vencimiento', clave: (ele: ColumnasTabla) => ele.fechaVencimiento, orden: 5 },
  ];

  /**
   * Constructor del componente.
   * @param certificadoService Servicio para gestionar certificados.
   * @param fb Constructor de formularios.
   * @param validacionesService Servicio para validar formularios.
   * @param store Almacén de datos del trámite.
   * @param query Consulta de datos del trámite.
   * @param consultaioQuery Consulta de estado de sección.
   */
  constructor(
    private certificadoService: CertificadoService,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private store: Tramite110219Store,
    private query: Tramite110219Query,
    private consultaioQuery: ConsultaioQuery,
    private catalogoServices: CatalogoServices,

  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }

  /**
   * Inicializa el componente, el formulario y carga catálogos y datos de la tabla.
   */
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * - Inicializa el formulario `cancelacionForm` con los valores actuales del estado de la solicitud y validadores requeridos.
   * - Obtiene los datos necesarios para los campos de tratado y país utilizando el `tramiteId`.
   * - Recupera las solicitudes para la tabla.
   * - Inicializa el estado del formulario.
   * - Se suscribe a los cambios del estado de la solicitud para mantener sincronizado el formulario.
   * - Llama al método para obtener el domicilio del donante.
   */
  ngOnInit(): void {
    this.cancelacionForm = new FormGroup({
      numeroCertificado: new FormControl(this.solicitudState?.numeroCertificado, [Validators.required]),
      tratado: new FormControl(this.solicitudState?.tratado, [Validators.required]),
      pais: new FormControl(this.solicitudState?.pais, [Validators.required]),
      fechaInicial: new FormControl(this.solicitudState?.fechaInicial, [Validators.required]),
      fechaFinal: new FormControl(this.solicitudState?.fechaFinal, [Validators.required]),
    });
   

    this.getTratadoData(this.tramiteId);
    this.getPaisdata(this.tramiteId);
    this.getSolicitudesTabla();
    this.inicializarEstadoFormulario();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
  }

  /**
   * Inicializa el estado del formulario según el modo de consulta (lectura/edición).
   *
   * Este método evalúa el estado actual de la consulta para determinar si el formulario
   * debe estar en modo de solo lectura o en modo de edición. Dependiendo del estado,
   * ejecuta las acciones correspondientes para configurar correctamente el formulario.
   *
   * @returns void - No retorna valor, pero configura el estado del formulario
   * 
   * @example
   * ```typescript
   * this.inicializarEstadoFormulario();
   * // El formulario se configura según el estado de consulta actual
   * ```
   * 
   * @remarks
   * - Si `soloLectura` es true, llama a `guardarDatosFormulario()` para cargar datos existentes
   * - Si `soloLectura` es false, llama a `donanteDomicilio()` para inicializar el formulario vacío
   * - Se ejecuta durante la inicialización del componente y cuando cambia el estado de consulta
   * - Es crucial para mantener la consistencia del estado del formulario
   * 
   * @see guardarDatosFormulario
   * @see donanteDomicilio
   * @see ConsultaioState
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.donanteDomicilio();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.donanteDomicilio();
    if (this.soloLectura) {
      this.cancelacionForm.disable();
    } else {
      this.cancelacionForm.enable();
    }
  }

  /**
   * Cambia la fecha inicial en el formulario.
   * @param nuevo_fechaIncial Nueva fecha inicial.
   */
  cambioFechaInicial(nuevo_fechaIncial: string): void {
    this.cancelacionForm.patchValue({
      validacionForm: {
        fechaInicial: nuevo_fechaIncial,
      },
    });
    this.setValoresStore(this.validacionForm, 'fechaInicial', 'setFechaInicial');
  }

  /**
   * Cambia la fecha final en el formulario.
   * @param nuevo_fechaFinal Nueva fecha final.
   */
  cambioFechaFinal(nuevo_fechaFinal: string): void {
    this.cancelacionForm.patchValue({
      validacionForm: {
        fechaFinal: nuevo_fechaFinal,
      },
    });

    this.setValoresStore(this.validacionForm, 'fechaFinal', 'setFechaFinal');
  }

  /**
   * Valida el formulario del destinatario. Marca todos los campos como tocados si es inválido.
   */
  validarDestinatarioFormulario(): void {
    if (this.cancelacionForm.invalid) {
      this.cancelacionForm.markAllAsTouched();
    }
  }

  /**
   * Activa el estado de búsqueda y emite eventos relacionados con el número de certificado.
   * Pattern validation: ^[A-Za-z0-9]{8,20}$ (8-20 alphanumeric characters)
   * 
   * Flow:
   * 1. Empty input → isNumeroCertificado.emit(true) → shows "campo requerido"
   * 2. Invalid pattern → isNumeroCertificadoPattern.emit(true) → shows "El certificado de origen no existe"
   * 3. Valid pattern → both emit(false) → shows certificate table
   */
  alBuscarClic(): void {
    const CONTROL = this.cancelacionForm.get('validacionForm.numeroCertificado');
    const NUMERO_CERTIFICADO = CONTROL?.value;
    
    // Restablecer mensaje de error
    this.mensajeError = '';

    // Comprobar si el campo está vacío (nulo, indefinido o solo espacios en blanco)
    if (!NUMERO_CERTIFICADO || NUMERO_CERTIFICADO.trim() === '') {
      this.estaBuscando = true;
      this.mensajeError = '1.(Número de certificado) es un campo requerido';
      this.isNumeroCertificado.emit(this.estaBuscando);
      this.isNumeroCertificadoPattern.emit(false);
      return;
    }

    // Comprobar si el campo tiene errores de validación (patrón, formato, etc.)
    if (CONTROL?.invalid) {
      this.estaBuscando = true;
      
      if (CONTROL.hasError('pattern')) {
        // Fallo en la validación de patrón: no 8-20 caracteres alfanuméricos
        this.mensajeError = 'El certificado de origen no existe';
        // Para errores de patrón, no emitir isNumeroCertificado como verdadero (para evitar mostrar el error de campo vacío)
        this.isNumeroCertificado.emit(false);
        this.isNumeroCertificadoPattern.emit(true);
      } else {
        this.mensajeError = '1.(Número de certificado) es inválido';
        this.isNumeroCertificado.emit(this.estaBuscando);
        this.isNumeroCertificadoPattern.emit(true);
      }
      return;
    }

    // Entrada válida: mostrar datos de la tabla
    this.estaBuscando = false;
    this.mostrarErrores = false;
    
    // Actualice siempre los datos del certificado independientemente de si ya existen
    // Esto asegura que los cambios dinámicos se reflejen cada vez que el usuario busca
    this.buscarYActualizarCertificado(NUMERO_CERTIFICADO.trim());

    // Siempre emita el estado de éxito para mostrar la tabla con los certificados disponibles
    this.isNumeroCertificado.emit(false);
    this.isNumeroCertificadoPattern.emit(false);
  }

  /**
   * Busca un certificado en la tabla de certificados disponibles.
   * @param numero Número de certificado a buscar.
   * @returns `true` si el certificado existe, de lo contrario `false`.
   */
  buscarCertificado(numero: string): boolean {
    if (!numero || numero.trim() === '') {
      return false;
    }
    
    return this.certificadoDisponsiblesTablaDatos.some(
      certificado => String(certificado.numeroCertificado).trim() === numero.trim()
    );
  }

  /**
   * Busca y actualiza el certificado en la tabla con el nuevo número.
   * Si no existe, reemplaza el primer registro o crea uno nuevo.
   * @param numero Número de certificado a buscar y actualizar.
   */
  buscarYActualizarCertificado(numero: string): void {
    if (!numero || numero.trim() === '') {
      return;
    }

    const NUMERO_LIMPIO = numero.trim();
    
    // Actualice siempre los datos de la tabla con el nuevo número de certificado
    // Esto asegura que los cambios dinámicos se reflejen inmediatamente
    if (this.certificadoDisponsiblesTablaDatos.length > 0) {
      // Actualizar el primer registro con el nuevo número de certificado
      this.certificadoDisponsiblesTablaDatos[0] = {
        ...this.certificadoDisponsiblesTablaDatos[0],
        numeroCertificado: NUMERO_LIMPIO
      };
    } else {
      // Si no existen datos, crear un nuevo registro
      this.certificadoDisponsiblesTablaDatos = [{
        numeroCertificado: NUMERO_LIMPIO,
        pais: 'México',
        tratado: 'TLCAN/T-MEC', 
        fechaExpedicion: new Date().toLocaleDateString('es-ES'),
        fechaVencimiento: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES')
      }];
    }

    // Forzar la detección de cambios para actualizar la vista
    this.certificadoDisponsiblesTablaDatos = [...this.certificadoDisponsiblesTablaDatos];
  }

  /**
   * Limpia el formulario y resetea la tabla de certificados.
   */
  limpiarBusqueda(): void {
    this.cancelacionForm.get('validacionForm.numeroCertificado')?.setValue('');
    this.estaBuscando = true;
    this.mostrarErrores = true;
    this.mensajeError = '';
    this.isNumeroCertificado.emit(false);
    this.isNumeroCertificadoPattern.emit(false);
  }

  /**
   * Maneja los cambios en el input del número de certificado
   * @param event Evento del input
   */
  onNumeroCertificadoChange(event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    const VALOR = TARGET.value;
    
    // Actualizar la tienda con el nuevo valor
    this.setValoresStore(this.validacionForm, 'numeroCertificado', 'setNumeroCertificado');

    // Resetear el estado de búsqueda cuando el usuario modifica la entrada
    if (VALOR && VALOR.trim() !== '') {
      this.estaBuscando = true;
      this.mostrarErrores = true;
      this.mensajeError = '';
    }
  }

 
  /**
   * Obtiene los datos del catálogo de tratados/acuerdos para un trámite específico.
   * 
   * Este método realiza una consulta al servicio de catálogos para recuperar información
   * sobre tratados comerciales y acuerdos internacionales disponibles para el trámite especificado.
   * Los datos obtenidos se utilizan para poblar el selector de tratados en el formulario.
   * 
   * @param tramiteId - Identificador único del trámite (ej: '110219') para el cual se consultan
   *                    los datos del catálogo de tratados y acuerdos comerciales
   * 
   * @returns void - No retorna valor, pero actualiza la propiedad `tratadoCatalogo.catalogos`
   *                 con los datos obtenidos del servicio
   * 
   * @throws Error - Puede lanzar errores si la consulta al servicio falla
   * 
   * @example
   * ```typescript
   * this.getTratadoData('110219');
   * // Después de la ejecución, tratadoCatalogo.catalogos contendrá los tratados disponibles
   * ```
   * 
   * @see CatalogoServices.tratadoAcuerdoCatalogo
   * @see Catalogo
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  getTratadoData(tramiteId: string): void {
    this.catalogoServices
    .tratadosAcuerdosCatalogo(tramiteId,"TITRAC.TA")
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.tratadoCatalogo.catalogos = resp.datos as Catalogo[];
      });
  }

 
  /**
   * Obtiene el catálogo de países y bloques comerciales asociados a un trámite específico.
   *
   * Este método consulta el servicio de catálogos para recuperar la lista de países y bloques
   * comerciales disponibles para el trámite especificado. Los datos se utilizan para poblar
   * el selector de países en el formulario de cancelación de certificados.
   *
   * @param tramiteId - Identificador único del trámite (ej: '110219') para el cual se requiere
   *                    obtener el catálogo de países y bloques comerciales
   * 
   * @returns void - No retorna valor, pero actualiza la propiedad `paisCatalogo.catalogos`
   *                 con los datos de países obtenidos del servicio
   * 
   * @throws Error - Puede lanzar errores si la consulta al servicio de catálogos falla
   * 
   * @example
   * ```typescript
   * this.getPaisdata('110219');
   * // Después de la ejecución, paisCatalogo.catalogos contendrá los países disponibles
   * ```
   * 
   * @remarks
   * - La suscripción se gestiona automáticamente con `takeUntil(this.destroyed$)`
   * - Se cancela automáticamente cuando el componente se destruye para evitar memory leaks
   * - Los datos incluyen tanto países individuales como bloques comerciales
   * 
   * @see CatalogoServices.paisBloqueCatalogo
   * @see Catalogo
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  getPaisdata(tramiteId: string): void {
    this.catalogoServices
      .paisBloqueCatalogo(tramiteId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.paisCatalogo.catalogos = resp.datos as Catalogo[];
      });
  }

  /**
   * Obtiene y carga los datos de la tabla de certificados disponibles para cancelación.
   *
   * Este método consulta el servicio de certificados para recuperar la lista de certificados
   * disponibles que pueden ser cancelados. Los datos se muestran en una tabla dinámica
   * que permite al usuario seleccionar el certificado que desea cancelar.
   *
   * @returns void - No retorna valor, pero actualiza la propiedad `certificadoDisponsiblesTablaDatos`
   *                 con los datos de certificados obtenidos del servicio
   * 
   * @throws Error - Puede lanzar errores si la consulta al servicio de certificados falla
   * 
   * @example
   * ```typescript
   * this.getSolicitudesTabla();
   * // Después de la ejecución, certificadoDisponsiblesTablaDatos contendrá los certificados
   * ```
   * 
   * @remarks
   * - Los datos incluyen información como número de certificado, país, tratado, fechas, etc.
   * - La suscripción se gestiona automáticamente con `takeUntil(this.destroyed$)`
   * - Se ejecuta durante la inicialización del componente
   * - Los datos se utilizan para poblar la tabla de certificados disponibles
   * 
   * @see CertificadoService.getSolicitudesTabla
   * @see ColumnasTabla
   * @see TablaDinamicaComponent
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  public getSolicitudesTabla(): void {
    this.certificadoService.getSolicitudesTabla().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.certificadoDisponsiblesTablaDatos = data;
    });
  }

  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario.
   * @param field Campo a verificar.
   * @returns `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Establece valores en el almacén de datos.
   * @param form Formulario.
   * @param campo Campo del formulario.
   * @param metodoNombre Nombre del método en el almacén.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110219Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Obtiene el formulario de validación anidado.
   */
  get validacionForm(): FormGroup {
    return this.cancelacionForm.get('validacionForm') as FormGroup;
  }

  /**
   * Inicializa el formulario con los datos del estado de la solicitud.
   */
  donanteDomicilio(): void {
   this.cancelacionForm = this.fb.group({
  validacionForm: this.fb.group({
    numeroCertificado: [{ value: this.solicitudState?.numeroCertificado, disabled: this.soloLectura }, [
      Validators.required, 
      Validators.pattern(CERTIFICATE_OF_ORIGIN_NUMBER)
    ]],
    tratado: [{ value: this.solicitudState?.tratado, disabled: this.soloLectura }, [Validators.required]],
    pais: [{ value: this.solicitudState?.pais, disabled: this.soloLectura }, [Validators.required]],
    fechaInicial: [{ value: this.solicitudState?.fechaInicial, disabled: this.soloLectura }, [Validators.required]],
    fechaFinal: [{ value: this.solicitudState?.fechaFinal, disabled: this.soloLectura }, [Validators.required]],
  }),
});
  }

  /**
   * Emite un evento al hacer clic en un botón.
   */
  emitirEventoClick(): void {
    this.dataEvent.emit(3);
  }

  /**
   * Getter para el número de certificado.
   */
  get numeroCertificado(): any {
    return this.cancelacionForm.get('validacionForm.numeroCertificado')?.value;
  }

  /**
   * Maneja el evento de doble clic en la tabla de certificados.
   * @param evt Evento de mouse.
   */
  onTablaDblClick(evt: MouseEvent): void {
    const TD = (evt.target as HTMLElement).closest('td');
    if (!TD) { return; }

    const TR = TD.parentElement;
    if (!TR) { return; }
    
    // Obtenga el índice de fila para encontrar los datos correspondientes
    const TABLE = TR.closest('table');
    if (!TABLE) { return; }
    
    /**
     * @desc Referencia al elemento `<tbody>` dentro de la tabla especificada por la constante `TABLE`.
     * @type {HTMLTableSectionElement | null}
     * @see https://developer.mozilla.org/es/docs/Web/API/HTMLTableSectionElement
     *
     * @remarks
     * Utilizado para manipular dinámicamente las filas del cuerpo de la tabla en el componente de cancelación de certificado.
     *
     * @author
     * Generado automáticamente por GitHub Copilot.
     */
    const TBODY = TABLE.querySelector('tbody');
    if (!TBODY) { return; }
    
    const ROWS = Array.from(TBODY.querySelectorAll('tr'));
    const ROW_INDEX = ROWS.indexOf(TR as HTMLTableRowElement);
    
    
    if (ROW_INDEX >= 0 && ROW_INDEX < this.certificadoDisponsiblesTablaDatos.length) {
      const MATCH = this.certificadoDisponsiblesTablaDatos[ROW_INDEX];
      
      if (MATCH) {
        this.isCertificadoOriginEnable = true;
        this.certificadoOriginEnable.emit(this.isCertificadoOriginEnable);
        this.handleCertificadoDblClick(MATCH);
      }
    }
  }

  /**
   * Maneja la lógica al hacer doble clic sobre un certificado.
   * @param cert Certificado seleccionado.
   */
  private handleCertificadoDblClick(_cert: ColumnasTabla):void {
    // Aquí tu lógica: navegar, abrir modal, etc.
    // p.ej. this.router.navigate(['/detalle', cert.numeroCertificado]);
  }

  /**
   * Limpia los recursos al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}