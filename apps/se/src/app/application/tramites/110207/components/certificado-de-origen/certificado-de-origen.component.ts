import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  InputCheckComponent,
  InputFecha,
  REGEX_PATRON_DECIMAL_2,
  REGEX_SOLO_DIGITOS,
  TablaDinamicaComponent,
  TablaSeleccion,
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
  public mercanciasBody: unknown[] = [];

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
    private store: Tramite110207Store,
    private query: Tramite110207Query,
    private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  /**
   * Maneja el evento de clic para habilitar el formulario de edición.
   * @param row Fila seleccionada.
   */
  manejarClic(row: unknown) {
    this.esFormulario = true;
    const MODALEI = document.getElementById('datosMercancia')!;
    new Modal(MODALEI).show();
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
  buscarMercancias() {
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
  agregar() {
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
  modificar() {
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
  cargaArchivo() {
    this.cargarArchivo = true;
  }
  /**
   * Muestra errores en el formulario y desactiva la carga de archivos.
   * Cambia el estado de las variables `mostrarErrores` a `true` y `cargarArchivo` a `false`.
   */
  darError() {
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
  alSeleccionarArchivo(event: Event) {
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
        tratado: [this.solicitudState?.tratado, [Validators.required]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],],
        numeroRegistro: [this.solicitudState?.numeroRegistro, [Validators.required],],
        nombreComercial: [this.solicitudState?.nombreComercial, [Validators.required],],
        fechaInicial: [this.solicitudState?.fechaInicial, [Validators.required],],
        fechaFinal: [this.solicitudState?.fechaFinal, [Validators.required]],
        archivo: [this.solicitudState?.archivo, [Validators.required]],
        siCasilla: [this.solicitudState?.siCasilla, [Validators.required]],
      }),
    });
    this.mercanciaForm = this.fb.group({
      validacionMercanciaForm: this.fb.group({
        fraccionMercanciaArancelaria: ['', [Validators.required]],
        nombreTecnico: ['', [Validators.required]],
        nombreComercialDelaMercancia: ['', [Validators.required]],
        criterioParaConferir: ['', [Validators.required]],
        nombreEnIngles: ['', [Validators.required]],
        marca: [this.solicitudState?.marca, [Validators.required]],
        cantidad: [this.solicitudState?.cantidad,[Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],],
        umc: [this.solicitudState?.umc, [Validators.required]],
        valorDelaMercancia: [this.solicitudState?.valorDelaMercancia,[Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)],],
        complementoDelaDescripcion: [this.solicitudState?.complementoDelaDescripcion,[Validators.required],],
        masaBruta: [this.solicitudState?.masaBruta,[Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)],],
        unidadMedida: [this.solicitudState?.unidadMedida,[Validators.required],],
        tipoFactura: [this.solicitudState?.tipoFactura, [Validators.required]],
        fecha: [this.solicitudState?.fecha, [Validators.required]],
        numeroFactura: [this.solicitudState?.numeroFactura,[Validators.required],],
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
