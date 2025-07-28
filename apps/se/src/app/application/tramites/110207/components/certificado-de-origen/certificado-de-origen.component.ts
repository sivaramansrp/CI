import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConsultaioQuery,
  InputCheckComponent,
  InputFecha,
  REGEX_PATRON_DECIMAL_2,
  REGEX_SOLO_DIGITOS,
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
  SeleccionadasTabla,
} from '../../models/registro.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import {
  Solicitud110207State,
  Tramite110207Store,
} from '../../state/Tramite110207.store';
import { CommonModule } from '@angular/common';
import {ConsultaioState} from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { Modal } from 'bootstrap';
import { RegistroService } from '../../services/registro.service';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import mercanciaDisponsibleTable from '@libs/shared/theme/assets/json/110207/mercancia-disponsible.json';
import mercanciaSeleccionadasTable from '@libs/shared/theme/assets/json/110207/mercancias-seleccionadas.json';

// Texto de alerta que se muestra cuando no se ha agregado al menos una mercancía al trámite.
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
    InputCheckComponent,
  ],
  templateUrl: './certificado-de-origen.component.html',
  styleUrl: './certificado-de-origen.component.css',
})
export class CertificadoDeOrigenComponent implements OnInit, OnDestroy {
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
   * Catálogo de unidades de medida.
   */
  unidadMedida!: CatalogosSelect;

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
   * Indica si se está editando una mercancía.
   */
  esMercanciaEnEdicion = false;

  /**
   * Datos de la tabla de mercancías disponibles.
   */
  public getMercanciaDisponsibleTableData = mercanciaDisponsibleTable;

  /**
   * Datos de la tabla de mercancías seleccionadas.
   */
  public getmercanciaSeleccionadasTable = mercanciaSeleccionadasTable;

  /**
   * Lista de mercancías disponibles.
   */
  public mercanciasdisponibles: string[] = [];
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
  public solicitudState!: Solicitud110207State;

  /**
   * Tabla de selección de mercancías.
   */
  tablaSeleccion = TablaSeleccion;


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
   * Representa la configuración del campo de entrada para la fecha inicial en el formulario.
   */
  fechaInicialInput: InputFecha = FECHA_INICIAL;

  /**
   * Configuración de la fecha final.
   * Representa la configuración del campo de entrada para la fecha final en el formulario.
   */
  fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Configuración de la fecha de la factura.
   * Representa la configuración del campo de entrada para la fecha de la factura en el formulario.
   */
  fechaFacturaInput: InputFecha = FECHA_FACTURA;
  /**
   * Indica si se está mostrando el formulario.
   */
  esFormulario: boolean = false;
  /**
 * Notificador para destruir observables al destruir el componente.
 * Se utiliza para gestionar la cancelación de suscripciones activas y evitar fugas de memoria.
 */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Opciones del catálogo de tratados.
   * Contiene una lista de objetos del catálogo de tratados obtenidos desde el servicio.
   */
  optionsTratado!: Catalogo[];

  /**
   * Opciones del catálogo de países.
   * Contiene una lista de objetos del catálogo de países obtenidos desde el servicio.
   */
  optionsPais!: Catalogo[];

  /**
   * Opciones del catálogo de unidades de medida comercial (UMC).
   * Contiene una lista de objetos del catálogo de UMC obtenidos desde el servicio.
   */
  optionsUMC!: Catalogo[];

  /**
   * Opciones del catálogo de unidades de medida.
   * Contiene una lista de objetos del catálogo de unidades de medida obtenidos desde el servicio.
   */
  optionsUnidadMedida!: Catalogo[];

  /**
   * Opciones del catálogo de tipos de factura.
   * Contiene una lista de objetos del catálogo de tipos de factura obtenidos desde el servicio.
   */
  optionsTipoFactura!: Catalogo[];

  /**
   * Datos de la tabla de mercancías disponibles.
   * Representa una lista de objetos que contienen información sobre las mercancías disponibles
   * para ser seleccionadas en el formulario.
   */
  public mercanciaDisponsiblesTablaDatos: ColumnasTabla[] = [];
  /**
   * Datos de la tabla de mercancías seleccionadas.
   * Representa una lista de objetos que contienen información sobre las mercancías que han sido seleccionadas
   * por el usuario en el formulario.
   */
  public mercanciaSeleccionadasTablaData: SeleccionadasTabla[] = [];

  /**
    * Configuración de las columnas de la tabla de mercancías disponibles.
    */
  public headers = HEADERS;
  /**
   * Configuración de las columnas de la tabla de mercancías seleccionadas.
   */
  public headersData = HEADERS_DATA;


  /**
   * Constructor del componente.
   * @param registroService Servicio para obtener datos de catálogos.
   * @param fb Constructor de formularios reactivos.
   * @param store Tienda para gestionar el estado del trámite.
   * @param query Consultas para obtener datos del estado del trámite.
   * @param validacionesService Servicio para validar formularios.
   */
  constructor(
    private registroService: RegistroService,
    public fb: FormBuilder,
    public store: Tramite110207Store,
    private query: Tramite110207Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
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
   * Maneja el evento de clic para habilitar el formulario de edición.
   * @param row Fila seleccionada.
   */
  manejarClic(_row: unknown):void {
    this.esFormulario = true;
    const MODALEI = document.getElementById('datosMercancia');
    if (MODALEI) {
      new Modal(MODALEI).show();
    }
  }

  /**
   * Establece la selección del aviso de funcionamiento basado en el evento.
   * @param evento Evento del checkbox.
   */
  establecerSiCasilla(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.store.setEstablecerSiCasilla(VALOR);
  }
  /**
   * Valida el formulario del destinatario.
   * Marca todos los campos como tocados si el formulario es inválido.
   */
  validarDestinatarioFormulario(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    }
  }

  /**
   * Valida el formulario de mercancías.
   * Marca todos los campos como tocados si el formulario es inválido.
   */
  validarMercanciaForm(): void {
    if (this.mercanciaForm.invalid) {
      this.mercanciaForm.markAllAsTouched();
    }
  }
  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura los formularios y obtiene los catálogos necesarios.
   */
  ngOnInit(): void {
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
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
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
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
      this.registroForm.disable();
    } else {
      this.registroForm.enable();
    }
  }
  /**
   * Actualiza la fecha inicial en el formulario reactivo y en el estado de la tienda.
   * @param nuevo_fechaIncial Nueva fecha inicial seleccionada.
   */
  cambioFechaInicial(nuevo_fechaIncial: string): void {
    this.registroForm.patchValue({
      validacionForm: { fechaInicial: nuevo_fechaIncial },
    });
    this.setValoresStore(this.validacionForm, 'fechaInicial', 'setFechInicioB');
  }
  /**
   * Actualiza la fecha final en el formulario reactivo y en el estado de la tienda.
   * @param nuevo_fechaFinal Nueva fecha final seleccionada.
   */
  cambioFechaFinal(nuevo_fechaFinal: string): void {
    this.registroForm.patchValue({
      validacionForm: {
        fechaFinal: nuevo_fechaFinal,
      },
    });

    this.setValoresStore(this.validacionForm, 'fechaFinal', 'setFechFinB');
  }
  /**
   * Actualiza la fecha de la factura en el formulario reactivo y en el estado de la tienda.
   * @param nuevo_fechaFin Nueva fecha de la factura seleccionada.
   */
  cambioFechaFactura(nuevo_fechaFin: string): void {
    this.mercanciaForm.patchValue({
      validacionMercanciaForm: {
        fecha: nuevo_fechaFin,
      },
    });
    this.setValoresStore(this.validacionMercanciaForm, 'fecha', 'setFecha');
  }
  /**
   * Busca mercancías disponibles basándose en la descripción del tratado.
   * Verifica si la lista `Tratadodescripcion` incluye el valor '1' para determinar si hay mercancías disponibles.
   * Si el valor está presente, establece `hayMercanciasDisponibles` en `true`; de lo contrario, lo establece en `false`.
   * Además, actualiza los catálogos necesarios llamando a los métodos `getTratado`, `getPais`, `getUMC`, `getUnidadMedida` y `getTipoFactura`.
   */
  buscarMercancias():void {
    if (this.registroForm.get('validacionForm.tratado')?.value === 0) {
      this.hayMercanciasDisponibles = false;
    } else {
      this.hayMercanciasDisponibles = true;
    }
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
  }
  /**
   * Agrega una mercancía al formulario.
   */
  agregar():void {
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();

    if (this.mercanciaForm.valid) {
      this.esMercanciaEnEdicion = true;
      this.mercanciaSeleccionadasTablaData.splice(0, 1, {
        fraccionArancelaria: this.mercanciaForm?.value.validacionMercanciaForm.fraccionMercanArancelaria,
        cantidad: this.mercanciaForm?.value.validacionMercanciaForm.cantidad,
        unidadMedida: this.mercanciaForm?.value.validacionMercanciaForm.unidadMedida,
        valorMercancia: this.mercanciaForm?.value.validacionMercanciaForm.valordelamercancia,
        tipoFactura: this.mercanciaForm?.value.validacionMercanciaForm.tipoFactura,
        numFactura:this.mercanciaForm?.value.validacionMercanciaForm.numeroFactura,
        complementoDescripcion: this.mercanciaForm?.value.validacionMercanciaForm.complementoDelaDescripcion,
        fechaFactura: this.mercanciaForm?.value.validacionMercanciaForm.fecha,
      });
    }
  }
  /**
   * Modifica una mercancía existente.
   */
  modificar():void {
    this.esMercanciaEnEdicion = false;

    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
  }

  /**
   * Activa el formulario para cargar un archivo.
   * Cambia el estado de la variable `cargarArchivo` a `true` para mostrar el formulario de carga de archivos.
   */
  cargaArchivo():void {
    this.cargarArchivo = true;
  }
  /**
   * Muestra errores en el formulario y desactiva la carga de archivos.
   * Cambia el estado de las variables `mostrarErrores` a `true` y `cargarArchivo` a `false`.
   */
  darError():void {
    this.mostrarErrores = true;
    this.cargarArchivo = false;
  }
  /**
   * Obtiene el catálogo de tratados desde el servicio.
   */
  getTratado(): void {
    this.registroService
      .getTratado().pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsTratado = resp.data as Catalogo[];
        }
      });
  }
  /**
   * Obtiene el catálogo de países desde el servicio.
   */
  getPais(): void {
    this.registroService
      .getPais().pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsPais = resp.data as Catalogo[];
        }
      });
  }
  /**
   * Obtiene el catálogo de UMC desde el servicio.
   */
  getUMC(): void {
    this.registroService
      .getUMC().pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsUMC = resp.data as Catalogo[];
        }
      });
  }
  /**
   * Obtiene el catálogo de unidades de medida desde el servicio.
   */
  getUnidadMedida(): void {
    this.registroService
      .getUnidadMedida().pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsUnidadMedida = resp.data as Catalogo[];
        }
      });
  }
  /**
   * Obtiene el catálogo de tipos de factura desde el servicio.
   */
  getTipoFactura(): void {
    this.registroService
      .getTipoFactura().pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsTipoFactura = resp.data as Catalogo[];
        }
      });
  }
  /**
   * Cierra el formulario para adjuntar un archivo de mercancías.
   * Cambia el estado de la variable `cargarArchivo` a `false` para ocultar el formulario de carga de archivos.
   */
  cerrarAdjuntarArchivoMercancias(): void {
    this.cargarArchivo = false;
  }
  /**
   * Maneja el evento de selección de un archivo.
   * Obtiene el archivo seleccionado por el usuario y asigna su nombre a la propiedad `nombreArchivo`.
   * Si no se selecciona ningún archivo, asigna el mensaje "No se eligió ningún archivo".
   * @param event Evento que contiene la información del archivo seleccionado.
   */
  alSeleccionarArchivo(event: Event):void {
    const FILE = (event.target as HTMLInputElement).files?.[0];
    this.nombreArchivo = FILE ? FILE.name : 'No se eligió ningún archivo';
  }
  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.registroForm.valid) {
      // Aquí se implementará la lógica para manejar el envío del formulario.
    }
  }
  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario reactivo.
   * @param field Nombre del campo a validar.
   * @returns `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }
  /**
   * Establece valores en el estado de la tienda.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo del formulario.
   * @param metodoNombre Método de la tienda para actualizar el estado.
   */
  setValoresStore(form: FormGroup,campo: string, metodoNombre: keyof Tramite110207Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
   * Obtiene el formulario de validación.
   */
  get validacionForm(): FormGroup {
    return this.registroForm.get('validacionForm') as FormGroup;
  }
  /**
   * Obtiene el formulario de validación de mercancías.
   */
  get validacionMercanciaForm(): FormGroup {
    return this.mercanciaForm.get('validacionMercanciaForm') as FormGroup;
  }
  /**
   * Configura el formulario reactivo con los valores iniciales del estado.
   */
 donanteDomicilio(): void {
  this.registroForm = this.fb.group({
    validacionForm: this.fb.group({
      tratado: [{ value: this.solicitudState?.tratado, disabled: this.soloLectura }, [Validators.required]],
      pais: [{ value: this.solicitudState?.pais, disabled: this.soloLectura }, [Validators.required]],
      fraccionArancelaria: [{ value: this.solicitudState?.fraccionArancelaria, disabled: this.soloLectura }, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
      numeroRegistro: [{ value: this.solicitudState?.numeroRegistro, disabled: this.soloLectura }, [Validators.required]],
      nombreComercial: [{ value: this.solicitudState?.nombreComercial, disabled: this.soloLectura }, [Validators.required]],
      fechaInicial: [{ value: this.solicitudState?.fechaInicial, disabled: this.soloLectura }, [Validators.required]],
      fechaFinal: [{ value: this.solicitudState?.fechaFinal, disabled: this.soloLectura }, [Validators.required]],
      archivo: [{ value: this.solicitudState?.archivo, disabled: this.soloLectura }, [Validators.required]],
      siCasilla: [{ value: this.solicitudState?.siCasilla, disabled: this.soloLectura }, [Validators.required]],
    }),
  });
  this.mercanciaForm = this.fb.group({
    validacionMercanciaForm: this.fb.group({
      fraccionMercanciaArancelaria: [{ value: '', disabled: this.soloLectura }, [Validators.required]],
      nombreTecnico: [{ value: '', disabled: this.soloLectura }, [Validators.required]],
      nombreComercialDelaMercancia: [{ value: '', disabled: this.soloLectura }, [Validators.required]],
      criterioParaConferir: [{ value: '', disabled: this.soloLectura }, [Validators.required]],
      nombreEnIngles: [{ value: '', disabled: this.soloLectura }, [Validators.required]],
      marca: [{ value: this.solicitudState?.marca, disabled: this.soloLectura }, [Validators.required]],
      cantidad: [{ value: this.solicitudState?.cantidad, disabled: this.soloLectura }, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
      umc: [{ value: this.solicitudState?.umc, disabled: this.soloLectura }, [Validators.required]],
      valorDelaMercancia: [{ value: this.solicitudState?.valorDelaMercancia, disabled: this.soloLectura }, [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)]],
      complementoDelaDescripcion: [{ value: this.solicitudState?.complementoDelaDescripcion, disabled: this.soloLectura }, [Validators.required]],
      masaBruta: [{ value: this.solicitudState?.masaBruta, disabled: this.soloLectura }, [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)]],
      unidadMedida: [{ value: this.solicitudState?.unidadMedida, disabled: this.soloLectura }, [Validators.required]],
      tipoFactura: [{ value: this.solicitudState?.tipoFactura, disabled: this.soloLectura }, [Validators.required]],
      fecha: [{ value: this.solicitudState?.fecha, disabled: this.soloLectura }, [Validators.required]],
      numeroFactura: [{ value: this.solicitudState?.numeroFactura, disabled: this.soloLectura }, [Validators.required]],
    }),
  });
}
  /**
   * Obtiene los datos de la tabla de mercancías disponibles desde el servicio.
   * Realiza una suscripción al método `getSolicitudesTabla` del servicio `RegistroService`
   * y asigna los datos obtenidos a la propiedad `mercanciaDisponsiblesTablaDatos`.
   */
  public getSolicitudesTabla(): void {
    this.registroService.getSolicitudesTabla().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.mercanciaDisponsiblesTablaDatos = data;
    });
  }
  /**
   * Obtiene los datos de la tabla de mercancías seleccionadas desde el servicio.
   * Realiza una suscripción al método `getSolicitudesDataTabla` del servicio `RegistroService`
   * y asigna los datos obtenidos a la propiedad `mercanciaSeleccionadasTablaData`.
   */
  public getSolicitudesDataTabla(): void {
    this.registroService.getSolicitudesDataTabla().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.mercanciaSeleccionadasTablaData = data;
    });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
