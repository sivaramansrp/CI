import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionColumna,
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
  SeleccionadasTabla,
} from '../../models/registro.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HEADER_DATA_MERCANCIA } from '../../enums/constantes-alertas.enum';
import { HEADER_DISPONIBLES } from '../../enums/constantes-alertas.enum';
import { InputFechaComponent } from '@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { RegistroService } from '../../services/registro.service';
import { Solicitud110223State } from '../../../../estados/tramites/Tramite110223.store';
import { Tramite110223Query } from '../../../../estados/queries/tramite110223.query';
import { Tramite110223Store } from '../../../../estados/tramites/Tramite110223.store';
import mercanciaDisponsibleTable from '@libs/shared/theme/assets/json/110223/mercancia-disponsible.json';
import mercanciaSeleccionadasTable from '@libs/shared/theme/assets/json/110223/mercancias-seleccionadas.json';
import mercanciaTable from '@libs/shared/theme/assets/json/110223/mercancia.json';

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
   * Catálogo de tipos de factura.
   */
  tipoFactura!: CatalogosSelect;

  /**
   * Indica si se debe mostrar el formulario para cargar un archivo.
   */
  cargarArchivo = false;

  /**
   * Indica si se deben mostrar errores en el formulario.
   */
  mostrarErrores = false;

  /**
   * Indica si hay mercancías disponibles.
   */
  hayMercanciasDisponibles = false;

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
  public solicitudState!: Solicitud110223State;

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
  nombreArchivo = '';

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
  esFormulario = false;

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
   * Estado actual de la consulta.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario está en modo de solo lectura.
   */
  soloLectura: boolean = false;

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
   * Define los encabezados y las claves asociadas a cada columna de la tabla de mercancías disponibles.
   */
  public headers: ConfiguracionColumna<ColumnasTabla>[] = HEADER_DISPONIBLES;

  /**
   * Configuración de las columnas de la tabla de mercancías seleccionadas.
   * Define los encabezados y las claves asociadas a cada columna de la tabla de mercancías seleccionadas.
   */
  public headersData: ConfiguracionColumna<SeleccionadasTabla>[] =
    HEADER_DATA_MERCANCIA;

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
    private store: Tramite110223Store,
    private query: Tramite110223Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Maneja el evento de clic para habilitar el formulario de edición.
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
    this.mercanciatable();
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
    this.getSolicitudesTabla();
    this.getSolicitudesDataTabla();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
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
        })
      )
      .subscribe();
  }

  /**
   * Actualiza la fecha inicial en el formulario reactivo y en el estado de la tienda.
   * @param nuevoFechaIncial Nueva fecha inicial seleccionada.
   */
  cambioFechaInicial(nuevoFechaIncial: string): void {
    this.registroForm.patchValue({
      validacionForm: {
        fechaInicial: nuevoFechaIncial,
      },
    });
    this.setValoresStore(this.validacionForm, 'fechaInicial', 'setFechInicioB');
  }

  /**
   * Actualiza la fecha final en el formulario reactivo y en el estado de la tienda.
   * @param nuevoFechaFinal Nueva fecha final seleccionada.
   */
  cambioFechaFinal(nuevoFechaFinal: string): void {
    this.registroForm.patchValue({
      validacionForm: {
        fechaFinal: nuevoFechaFinal,
      },
    });

    this.setValoresStore(this.validacionForm, 'fechaFinal', 'setFechFinB');
  }

  /**
   * Actualiza la fecha de la factura en el formulario reactivo y en el estado de la tienda.
   * @param nuevoFechaFin Nueva fecha de la factura seleccionada.
   */
  cambioFechaFactura(nuevoFechaFin: string): void {
    this.mercanciaForm.patchValue({
      validacionMercanciaForm: {
        fecha: nuevoFechaFin,
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
  buscarMercancias(): void {
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
   * Cancela la edición del formulario.
   */
  cancelar(): void {
    this.esFormulario = false;
    this.esMercanciaEnEdicion = true;
  }

  /**
   * Agrega una mercancía al formulario.
   */
  agregar(): void {
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();

    if (this.mercanciaForm.valid) {
      this.esMercanciaEnEdicion = true;
      this.esFormulario = false;
      this.mercanciaSeleccionadasTablaData.splice(0, 1, {
        fraccionArancelaria:
          this.mercanciaForm?.value.validacionMercanciaForm
            .fraccionMercanArancelaria,
        cantidad: this.mercanciaForm?.value.validacionMercanciaForm.cantidad,
        unidadMedida:
          this.mercanciaForm?.value.validacionMercanciaForm.unidadMedida,
        valorMercancia:
          this.mercanciaForm?.value.validacionMercanciaForm.valordelamercancia,
        tipoFactura:
          this.mercanciaForm?.value.validacionMercanciaForm.tipoFactura,
        numFactura:
          this.mercanciaForm?.value.validacionMercanciaForm.numeroFactura,
        complementoDescripcion:
          this.mercanciaForm?.value.validacionMercanciaForm
            .complementoDelaDescripcion,
        fechaFactura: this.mercanciaForm?.value.validacionMercanciaForm.fecha,
      });
    }
  }

  /**
   * Modifica una mercancía existente.
   */
  modificar(): void {
    this.esFormulario = true;
    this.esMercanciaEnEdicion = false;

    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
  }

  /**
   * Configura los encabezados y el cuerpo de la tabla de mercancías.
   * Asigna los valores de los encabezados y el cuerpo de la tabla desde los datos obtenidos.
   */
  public mercanciatable(): void {
    this.mercanciasHeader = this.getMercanciaTable?.tableHeader;
    this.mercanciasBody = this.getMercanciaTable?.tableBody;
  }

  /**
   * Activa el formulario para cargar un archivo.
   * Cambia el estado de la variable `cargarArchivo` a `true` para mostrar el formulario de carga de archivos.
   */
  cargaArchivo(): void {
    this.cargarArchivo = true;
  }

  /**
   * Muestra errores en el formulario y desactiva la carga de archivos.
   * Cambia el estado de las variables `mostrarErrores` a `true` y `cargarArchivo` a `false`.
   */
  darError(): void {
    this.mostrarErrores = true;
    this.cargarArchivo = false;
  }

  /**
   * Obtiene el catálogo de tratados desde el servicio.
   */
  getTratado(): void {
    this.registroService
      .getTratado()
      .pipe(takeUntil(this.destroyed$))
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
      .getPais()
      .pipe(takeUntil(this.destroyed$))
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
      .getUMC()
      .pipe(takeUntil(this.destroyed$))
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
      .getUnidadMedida()
      .pipe(takeUntil(this.destroyed$))
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
      .getTipoFactura()
      .pipe(takeUntil(this.destroyed$))
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
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110223Store
  ): void {
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
        tercerOperador: [this.solicitudState?.tercerOperador],
        tratado: [this.solicitudState?.tratado, [Validators.required]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        fraccionArancelaria: [
          this.solicitudState?.fraccionArancelaria,
          [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],
        ],
        numeroRegistro: [
          this.solicitudState?.numeroRegistro,
          [Validators.required],
        ],
        nombreComercial: [
          this.solicitudState?.nombreComercial,
          [Validators.required],
        ],
        fechaInicial: [
          this.solicitudState?.fechaInicial,
          [Validators.required],
        ],
        fechaFinal: [this.solicitudState?.fechaFinal, [Validators.required]],
        archivo: [this.solicitudState?.archivo, [Validators.required]],
      }),
    });

    this.mercanciaForm = this.fb.group({
      validacionMercanciaForm: this.fb.group({
        fraccionMercanciaArancelaria: ['', [Validators.required]],
        nombreTecnico: ['', [Validators.required]],
        nombreComercialDelaMercancia: ['', [Validators.required]],
        criterioParaPreferencial: ['', [Validators.required]],
        valorContenidoRegional: ['', [Validators.required]],
        otrasInstancias: ['', [Validators.required]],
        cantidad: [
          this.solicitudState?.cantidad,
          [
            Validators.required,
            Validators.pattern(REGEX_SOLO_DIGITOS),
            Validators.maxLength(15),
          ],
        ],
        umc: [this.solicitudState?.umc, [Validators.required]],
        valorDelaMercancia: [
          this.solicitudState?.valorDelaMercancia,
          [
            Validators.required,
            Validators.pattern(REGEX_PATRON_DECIMAL_2),
            Validators.maxLength(15),
          ],
        ],
        complementoDelaDescripcion: [
          this.solicitudState?.complementoDelaDescripcion,
          [Validators.required, Validators.maxLength(200)],
        ],
        tipoFactura: [this.solicitudState?.tipoFactura, [Validators.required]],
        fecha: [this.solicitudState?.fecha, [Validators.required]],
        numeroFactura: [
          this.solicitudState?.numeroFactura,
          [Validators.required],
        ],
        numeroSerie: [this.solicitudState?.numeroSerie, [Validators.required]],
      }),
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * Obtiene los datos de la tabla de mercancías disponibles desde el servicio.
   * Realiza una suscripción al método `getSolicitudesTabla` del servicio `RegistroService`
   * y asigna los datos obtenidos a la propiedad `mercanciaDisponsiblesTablaDatos`.
   */
  public getSolicitudesTabla(): void {
    this.registroService.getSolicitudesTabla().subscribe((data) => {
      this.mercanciaDisponsiblesTablaDatos = data;
    });
  }

  /**
   * Obtiene los datos de la tabla de mercancías seleccionadas desde el servicio.
   * Realiza una suscripción al método `getSolicitudesDataTabla` del servicio `RegistroService`
   * y asigna los datos obtenidos a la propiedad `mercanciaSeleccionadasTablaData`.
   */
  public getSolicitudesDataTabla(): void {
    this.registroService.getSolicitudesDataTabla().subscribe((data) => {
      this.mercanciaSeleccionadasTablaData = data;
    });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.registroForm?.disable();
      this.mercanciaForm?.disable();
      this.hayMercanciasDisponibles = true;
      this.esMercanciaEnEdicion = true;
    } else {
      this.registroForm?.enable();
      this.mercanciaForm?.enable();
    }
  }
}
