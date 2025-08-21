import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AlertComponent,
  Catalogo,
  CatalogosSelect,
  InputFecha,
  Notificacion,
  NotificacionesComponent,
  REGEX_PATRON_DECIMAL_2,
  REGEX_SOLO_DIGITOS,
  REG_X,
  TablaDinamicaComponent,
  TablaSeleccion,
  TableBodyData,
  TableComponent,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { 
  ColumnasTabla,
  FECHA_FACTURA,
  FECHA_FINAL,
  FECHA_INICIAL,
  HEADERS,
  HEADERS_DATA,
  SeleccionadasTabla, } from '../../models/registro.model';
import {
  ConsultaioQuery,
  ConsultaioState,
} from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import { Tramite110221State, Tramite110221Store } from '../../estados/tramite110221.store';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { InputFechaComponent } from '@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { Modal } from 'bootstrap';
import { Tramite110221Query } from '../../estados/tramite110221.query';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';
import mercanciaDisponsibleTable from '@libs/shared/theme/assets/json/110221/mercancia-disponsible.json';
import mercanciaSeleccionadasTable from '@libs/shared/theme/assets/json/110221/mercancias-seleccionadas.json';
import mercanciaTable from '@libs/shared/theme/assets/json/110221/mercancia.json';


const TERCEROS_TEXTO_DE_ALERTA =
  'Para continuar con el trámite, debes agregar por lo menos una mercancía.';
/**
 * Componente que representa el formulario de certificado de origen en el trámite.
 */
@Component({
  selector: 'app-certificado-de-origen',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    FormsModule,
    ReactiveFormsModule,
    TableComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputFechaComponent,
    NotificacionesComponent
  ],
  templateUrl: './certificado-de-origen.component.html',
  styleUrl: './certificado-de-origen.component.css',
})
export class CertificadoDeOrigenComponent implements OnInit, OnDestroy,AfterViewInit {
  /**
   * Texto de alerta mostrado en el componente.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Formulario reactivo para los datos del certificado.
   */
  registroForm!: FormGroup;

  /**
   * Formulario reactivo para los datos de la mercancía.
   */
  mercanciaForm!: FormGroup;

  /**
   * Catálogo de países.
   */
  pais!: CatalogosSelect;

  /**
   * Catálogo de tratados.
   */
  tratado!: CatalogosSelect;

  /**
   * Catálogo de unidades de medida comercial (UMC).
   */
  umc!: CatalogosSelect;

  /**
   * Catálogo de tipos de factura.
   */
  tipoFactura!: CatalogosSelect;

  /**
   * Indica si se debe mostrar el formulario para cargar un archivo.
   */
  cargarArchivo: boolean = false;

  /**
   * Indica si se deben mostrar errores en el formulario.
   */
  mostrarErrores: boolean = false;

  /**
   * Indica si hay mercancías disponibles.
   */
  hayMercanciasDisponibles: boolean = false;

  /**
   * Datos de la tabla de mercancías disponibles.
   */
  public getMercanciaDisponsibleTableData = mercanciaDisponsibleTable;

  /**
   * Datos de la tabla de mercancías seleccionadas.
   */
  public getmercanciaSeleccionadasTable = mercanciaSeleccionadasTable;

  /**
   * Datos de la tabla de mercancías.
   */
  public getMercanciaTable = mercanciaTable;

  /**
   * Lista de mercancías disponibles.
   */
  public mercanciasdisponibles: string[] = [];

  /**
   * Encabezados de las tablas.
   */
  public encabezadosTablas: string[] = [];

  /**
   * Encabezados de la tabla de mercancías.
   */
  public mercanciasHeader: string[] = [];

  /**
   * Cuerpo de la tabla de mercancías.
   */
  public mercanciasBody: TableBodyData[] = [];

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Tramite110221State;

  /**
   * Notificador para destruir observables al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Tabla de selección de mercancías.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * Valores de las unidades de medida.
   */
  unidadMedidaValue: unknown[] = [];

  /**
   * Tratado seleccionado.
   */
  seleccioneTratado: string | null = null;

  /**
   * Nombre del archivo seleccionado.
   */
  nombreArchivo: string = '';

  /**
   * Configuración de la fecha inicial.
   */
  fechaInicialInput: InputFecha = FECHA_INICIAL;

  /**
   * Configuración de la fecha final.
   */
  fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Configuración de la fecha de la factura.
   */
  fechaFacturaInput: InputFecha = FECHA_FACTURA;

  /**
   * Indica si se está mostrando el formulario.
   */
  esFormulario: boolean = false;

  /**
   * Notificador para destruir observables al destruir el componente.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Opciones del catálogo de tratados.
   */
  optionsTratado!: Catalogo[];

  /**
   * Opciones del catálogo de países.
   */
  optionsPais!: Catalogo[];

  /**
   * Opciones del catálogo de unidades de medida comercial (UMC).
   */
  optionsUMC!: Catalogo[];

  /**
   * Opciones del catálogo de unidades de medida.
   */
  optionsUnidadMedida!: Catalogo[];

  /**
   * Opciones del catálogo de tipos de factura.
   */
  optionsTipoFactura!: Catalogo[];

  /**
   * Datos de la tabla de mercancías disponibles.
   */
  public mercanciaDisponsiblesTablaDatos: ColumnasTabla[] = [] as ColumnasTabla[];

  /**
   * Datos de la tabla de mercancías seleccionadas.
   */
  public mercanciaSeleccionadasTablaData: SeleccionadasTabla[] = [];

  /**
   * Estado actual de la consulta.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario está en modo de solo lectura.
   */
  soloLectura: boolean = false;
  /**
   * Valor seleccionado en el grupo de opciones de radio.
   */
  valorSeleccionado!: string;
  /**
   * Configuración de las columnas de la tabla de mercancías disponibles.
   */
  public headers = HEADERS;

  /**
   * Configuración de las columnas de la tabla de mercancías seleccionadas.
   */
  public headersData = HEADERS_DATA;
   /**
   * Indica si se debe mostrar el mensaje de error.
   * @type {boolean}
   */
  public mostrarMensajeError: boolean = false;
 /**
   * Representa una nueva notificación que será utilizada en el componente.
   * @type {Notificacion}
   */
  public nuevaNotificacion!: Notificacion;
  mostrarModal:boolean = false;
  selectedRow!: SeleccionadasTabla;

    modalInstance!: Modal;
      modalInstance2!: Modal;
      /**
       * @descripcion
       * Referencia al elemento del modal de modificación.
       */
      @ViewChild('modifyModal', { static: false }) modifyModal!: ElementRef;
      @ViewChild('modifyModal2', { static: false }) modifyModal2!: ElementRef;
      
  /**
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos
   * @param store Tienda para gestionar el estado del trámite
   * @param query Consultas para obtener datos del estado del trámite
   * @param validacionesService Servicio para validar formularios
   * @param consultaioQuery Consulta del estado de la solicitud
   */
  constructor(
    private validarInicialmenteCertificadoService: ValidarInicialmenteCertificadoService,
    public fb: FormBuilder,
    private store: Tramite110221Store,
    private query: Tramite110221Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          // Set table data from solicitudState if available
          if (this.solicitudState) {
            this.mercanciaSeleccionadasTablaData = this.solicitudState.mercanciaSeleccionadasTablaData || [];
            this.mercanciaDisponsiblesTablaDatos = this.solicitudState.mercanciaDisponsiblesTablaDatos.length !== 0 ? this.solicitudState.mercanciaDisponsiblesTablaDatos: this.getMercanciaDisponsibleTableData;
          }
        })
      )
      .subscribe();

    this.donanteDomicilio();

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
          this.mercanciaSeleccionadasTablaData = this.solicitudState.mercanciaSeleccionadasTablaData || [];
          this.mercanciaDisponsiblesTablaDatos = this.solicitudState.mercanciaDisponsiblesTablaDatos.length !== 0 ? this.solicitudState.mercanciaDisponsiblesTablaDatos : this.getMercanciaDisponsibleTableData;
        })
      )
      .subscribe();
    this.mercanciatable();
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
  }
  ngAfterViewInit(): void {
    if (this.modifyModal) {
      this.modalInstance = new Modal(this.modifyModal.nativeElement);
    }
   if (this.modifyModal2) {
  this.modalInstance2 = new Modal(this.modifyModal2.nativeElement);
   }
  }
  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Maneja el evento de clic para habilitar el formulario de edición.
   * @param row Fila seleccionada
   */
  manejarClic(): void {
    if (this.soloLectura) {
      this.esFormulario = false;
    } else {
      this.esFormulario = true;
    }
  }

  /**
   * Valida el formulario del destinatario.
   */
  validarDestinatarioFormulario(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    }
  }

  /**
   * Valida el formulario de mercancías.
   */
  validarMercanciaForm(): void {
    if (this.mercanciaForm.invalid) {
      this.mercanciaForm.markAllAsTouched();
    }
  }

  /**
   * Actualiza la fecha inicial en el formulario.
   * @param nuevo_fechaIncial Nueva fecha inicial
   */
  cambioFechaInicial(nuevo_fechaIncial: string): void {
    this.registroForm.patchValue({
      validacionForm: {
        fechaInicial: nuevo_fechaIncial,
      },
    });
    this.setValoresStore(this.validacionForm, 'fechaInicial');
  }

  /**
   * Cambia el valor seleccionado en el grupo de radio y actualiza el almacén.
   * @param {string | number} value Nuevo valor seleccionado.
   */
  radioBotonSeleccionado(event: Event): void {
    const VAL = (event.target as HTMLInputElement).value;
    this.registroForm.patchValue({
      validacionForm: {
        rangoDeFecha: VAL,
      },
    });
  }

  /**
   * Actualiza la fecha final en el formulario.
   * @param nuevo_fechaFinal Nueva fecha final
   */
  cambioFechaFinal(nuevo_fechaFinal: string): void {
    this.registroForm.patchValue({
      validacionForm: {
        fechaFinal: nuevo_fechaFinal,
      },
    });
    this.setValoresStore(this.validacionForm, 'fechaFinal');
  }

  /**
   * Actualiza la fecha de la factura en el formulario.
   * @param nuevo_fechaFin Nueva fecha de factura
   */
  cambioFechaFactura(nuevo_fechaFin: string): void {
    this.mercanciaForm.patchValue({
      validacionMercanciaForm: {
        fecha: nuevo_fechaFin,
      },
    });
    this.setValoresStore(this.validacionMercanciaForm, 'fecha');
  }

  /**
   * Busca mercancías disponibles basándose en el tratado seleccionado.
   */
  buscarMercancias(): void {
    if (this.registroForm.get('validacionForm.tratado')?.value === 1) {
      this.hayMercanciasDisponibles = false;
    } else {
      this.hayMercanciasDisponibles = true;
    }
 if (this.registroForm.get('validacionForm.fechaInicial')?.value === this.registroForm.get('validacionForm.fechaFinal')?.value) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'info',
        titulo: 'Error de fechas',
        mensaje: 'La fecha inicial debe ser anterior a la fecha final.',
        cerrar: true,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.mostrarMensajeError = true;
      return;
    }
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
  }

  /**
   * Cancela la edición de la mercancía.
   */
  cancelar(): void {
  this.modalInstance.hide();
  }

  onFilaSeleccionada(event:ColumnasTabla):void{
    if(this.modalInstance){
this.modalInstance.show();
this.mercanciaForm.get('validacionMercanciaForm')?.patchValue(event);
    } 
  }

  /**
   * Agrega o actualiza una mercancía en la tabla.
   */
  agregar(): void {
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();

    const FORM_GROUP = this.mercanciaForm.get('validacionMercanciaForm');
    if (!FORM_GROUP?.valid) {
      FORM_GROUP?.markAllAsTouched();
      return;
    }

    const FORM_VALUE = FORM_GROUP.value;
    const IS_NEW = FORM_VALUE.id === 0;
    const ROW: SeleccionadasTabla = {
      ...FORM_VALUE,
      fraccionArancelaria: FORM_VALUE.fraccionMercanciaArancelaria,
      unidadMedida: FORM_VALUE.umc,
      valorMercancia: FORM_VALUE.valorDelaMercancia,
      complementoDescripcion: FORM_VALUE.complementoDelaDescripcion,
      fechaFactura: FORM_VALUE.fecha,
      numFactura: FORM_VALUE.numeroFactura,
      cantidad: FORM_VALUE.cantidad
    };
  
    if (IS_NEW) {
      ROW.id = Math.floor(Math.random() * 1000);
      this.mercanciaSeleccionadasTablaData = [...this.mercanciaSeleccionadasTablaData, ROW];
    } else {
      const IDX = this.mercanciaSeleccionadasTablaData.findIndex(item => item.id === FORM_VALUE.id);
        this.selectedRow = ROW;
      if (IDX !== -1) {
        this.mercanciaSeleccionadasTablaData[IDX] = ROW;
      } else {
        this.mercanciaSeleccionadasTablaData = [...this.mercanciaSeleccionadasTablaData, ROW];
      }
    }

    this.store.setMercanciaSeleccionadasTablaData([...this.mercanciaSeleccionadasTablaData]);
    FORM_GROUP.reset({
  id: 0,
  fraccionMercanciaArancelaria: '',
  nombreTecnico: '',
  nombreComercialDelaMercancia: '',
  criterioParaConferir: '',
  nombreEnIngles: '',
  valordeContenidoRegional: '',
  cantidad: '',
  umc: '',
  valorDelaMercancia: '',
  complementoDelaDescripcion: '',
  numeroDeSerie: '',
  tipoFactura: '',
  fecha: '',
  numeroFactura: '',
  otrasInstancias: ''
});

    this.modalInstance.hide();
    this.esFormulario = false;
  }

onFilaSeleccionadaradio(event: SeleccionadasTabla): void {
this.selectedRow = event;
  }

  /**
   * Modifica una mercancía existente.
   */
  modificar(): void {
if(this.selectedRow){
  this.mercanciaForm.get('validacionMercanciaForm')?.patchValue(this.selectedRow);
  this.modalInstance.show();
}
else{
  this.errorMessageExportador();
}
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
  }

cerrarEdicionMercancia():void{
  
  if(this.selectedRow){
    this.eliminarMensajeConfirmacion();
  }
  else{
    this.errorMessageExportador();
  }
}
  /**
   * Configura los encabezados y cuerpo de la tabla de mercancías.
   */
  public mercanciatable(): void {
    this.mercanciasHeader = this.getMercanciaTable?.tableHeader;
    this.mercanciasBody = this.getMercanciaTable?.tableBody;
  }

  /**
   * Activa el formulario para cargar archivos.
   */
  cargaArchivo(): void {
    if(this.modifyModal2){
   this.modalInstance2.show();
    }
 
  }

  /**
   * Muestra errores en el formulario.
   */
  darError(): void {
    this.mostrarErrores = true;
    this.cargarArchivo = false;
    this.modalInstance2.hide();
  }

  /**
   * Obtiene el catálogo de tratados.
   */
  getTratado(): void {
    this.validarInicialmenteCertificadoService
      .getTratado()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsTratado = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene el catálogo de países.
   */
  getPais(): void {
    this.validarInicialmenteCertificadoService
      .getPaisDestino()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsPais = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene el catálogo de unidades de medida comercial.
   */
  getUMC(): void {
    this.validarInicialmenteCertificadoService
      .getUMC()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsUMC = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene el catálogo de unidades de medida.
   */
  getUnidadMedida(): void {
    this.validarInicialmenteCertificadoService
      .getUnidadMedida()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsUnidadMedida = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene el catálogo de tipos de factura.
   */
  getTipoFactura(): void {
    this.validarInicialmenteCertificadoService
      .getTipoFactura()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsTipoFactura = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Cierra el formulario de carga de archivos.
   */
  cerrarAdjuntarArchivoMercancias(): void {
    this.cargarArchivo=false;
  this.modalInstance2.hide();
  }

  /**
   * Maneja la selección de archivos.
   * @param event Evento de selección de archivo
   */
  alSeleccionarArchivo(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const FILE = INPUT.files?.[0];
    this.nombreArchivo = FILE ? FILE.name : 'No se eligió ningún archivo';
  }

  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.registroForm.valid) {
      // Lógica de envío
    }
  }


  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario a validar
   * @param field Campo a verificar
   * @returns Estado de validación del campo
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
   * @param form - El formulario reactivo.
   * @param campo - El nombre del campo en el formulario.
   */
  setValoresStore(form: FormGroup | null, campo: string): void {
    if (!form) {
      return;
    }
    const CONTROL = form.get(campo);
    if (CONTROL && CONTROL.value !== null && CONTROL.value !== undefined) {
      this.store.actualizarEstado({
        [campo]: CONTROL.value,
      });
    }
  }

  /**
   * Obtiene el grupo de validación del formulario principal.
   * @returns Grupo de formulario
   */
  get validacionForm(): FormGroup {
    return this.registroForm.get('validacionForm') as FormGroup;
  }

  /**
   * Obtiene el grupo de validación del formulario de mercancías.
   * @returns Grupo de formulario
   */
  get validacionMercanciaForm(): FormGroup {
    return this.mercanciaForm.get('validacionMercanciaForm') as FormGroup;
  }

  /**
   * Configura el formulario reactivo con valores iniciales.
   */
  donanteDomicilio(): void {
    this.registroForm = this.fb.group({
      validacionForm: this.fb.group({
        tercerOperador: [this.solicitudState?.tercerOperador],
        nombres: [this.solicitudState?.nombres, [Validators.required]],
        primerApellido: [this.solicitudState?.primerApellido, [Validators.required]],
        segundoApellido: [this.solicitudState?.segundoApellido],
        numeroDeRegistroFiscal: [this.solicitudState?.numeroDeRegistroFiscal, [Validators.required]],
        razonSocial: [this.solicitudState?.razonSocial, [Validators.required]],
        tratado: [this.solicitudState?.tratado, [Validators.required]],
        rangoDeFecha: [this.solicitudState?.rangoDeFecha || 'sola'],
        pais: [this.solicitudState?.pais, [Validators.required]],
        fraccionArancelaria: [
          this.solicitudState?.fraccionArancelaria,
          [
            Validators.pattern(REG_X.REGEX_FRACCION_ARANCELARIA),
            Validators.maxLength(8)
          ],
        ],
        numeroRegistro: [
          this.solicitudState?.numeroRegistro
        ],
        nombreComercial: [
          this.solicitudState?.nombreComercial,
        ],
        fechaInicial: [
          this.solicitudState?.fechaInicial,
        ],
        fechaFinal: [this.solicitudState?.fechaFinal],
        archivo: [this.solicitudState?.archivo, [Validators.required]],
      }),
    });

    this.mercanciaForm = this.fb.group({
      validacionMercanciaForm: this.fb.group({
        id: [0 , [Validators.required]],
        fraccionMercanciaArancelaria: [
          this.solicitudState?.fraccionMercanciaArancelaria || ''
        ],
        nombreTecnico: [
          this.solicitudState?.nombreTecnico || ''
        ],
        nombreComercialDelaMercancia: [
          this.solicitudState?.nombreComercialDelaMercancia || ''
        ],
        criterioParaConferir: [
          this.solicitudState?.criterioParaConferir || ''
        ],
        nombreEnIngles: [
          this.solicitudState?.nombreEnIngles,
          [Validators.required],
        ],
        valordeContenidoRegional: [
          this.solicitudState?.valordeContenidoRegional || '',
        ],
        cantidad: [
          this.solicitudState?.cantidad,
          [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],
        ],
        umc: [this.solicitudState?.umc, [Validators.required]],
        valorDelaMercancia: [
          this.solicitudState?.valorDelaMercancia,
          [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)],
        ],
        complementoDelaDescripcion: [
          this.solicitudState?.complementoDelaDescripcion,
          [Validators.required],
        ],
        numeroDeSerie: [
          this.solicitudState?.numeroDeSerie || ''
        ],
        tipoFactura: [this.solicitudState?.tipoFactura],
        fecha: [this.solicitudState?.fecha, [Validators.required]],
        numeroFactura: [
          this.solicitudState?.numeroFactura,
          [Validators.required],
        ],
        otrasInstancias:[this.solicitudState?.otrasInstancias || ''],
        
      }),
    });

    this.inicializarEstadoFormulario();
  }
isInvalid(controlName: string): boolean {
  const CONTROL = this.mercanciaForm.get(`validacionMercanciaForm.${controlName}`);
  return Boolean(CONTROL && CONTROL.invalid && CONTROL.touched);
}

getError(controlName: string, error: string): boolean {
  return this.mercanciaForm.get(`validacionMercanciaForm.${controlName}`)?.hasError(error) ?? false;
}


  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.registroForm?.disable();
      this.mercanciaForm?.disable();
      this.hayMercanciasDisponibles = true;
    } else {
      this.registroForm?.enable();
      this.mercanciaForm?.enable();
    }
  }

    eliminarErrorMessage(event: boolean):void {
      if(event){
    this.mercanciaSeleccionadasTablaData = this.mercanciaSeleccionadasTablaData.filter((item) => item.id !== this.selectedRow.id);
    this.store.setMercanciaSeleccionadasTablaData(this.mercanciaSeleccionadasTablaData);
    this.selectedRow = {} as SeleccionadasTabla;
      }
    this.mostrarMensajeError =false;
    }

  errorMessageExportador(): void {
        this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'info',
        titulo: 'Selección requerida',
        mensaje: 'Debe seleccionar al menos un exportador para continuar.',
        cerrar: true,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Cancelar',
        txtBtnCancelar: '',
        };
          this.mostrarMensajeError =true;
      }

        eliminarMensajeConfirmacion(): void {
        this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'info',
        titulo: 'Confirmación requerida',
        mensaje: '¿Desea eliminar este dato?',
        cerrar: true,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Sí',
        txtBtnCancelar: 'No',
        };
          this.mostrarMensajeError =true;
      }
    

  validatorCheck(): boolean {
  const IS_REGISTRO_FORM_VALID = this.registroForm.valid;
  const IS_MERCANCIA_FORM_VALID = this.mercanciaForm.valid;

  if (!IS_REGISTRO_FORM_VALID) {
    this.registroForm.markAllAsTouched();
  }
  if (!IS_MERCANCIA_FORM_VALID) {
    this.mercanciaForm.markAllAsTouched();
  }

  return IS_REGISTRO_FORM_VALID && IS_MERCANCIA_FORM_VALID;
}

    }
  
  
