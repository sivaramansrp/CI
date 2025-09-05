import { AlertComponent,Catalogo,CatalogoSelectComponent,CatalogosSelect,ConfiguracionColumna,InputFecha,REGEX_CANTIDAD_15_4,REGEX_NUMERO_15_ENTEROS_4_DECIMALES,REGEX_SOLO_DIGITOS,TablaDinamicaComponent,TablaSeleccion,TableBodyData,TableComponent,TituloComponent,ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
 import { ColumnasTabla, FECHAFACTURA, FECHAFINAL, FECHAINICIAL, OPTIONS_PAIS, OPTIONS_TIPO_FACTURA, OPTIONS_TRATADO, OPTIONS_UMC, OPTIONS_UNIDAD_MEDIDA, SeleccionadasTabla} from '../../models/registro.model';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {ConsultaioQuery, ConsultaioState} from '@ng-mf/data-access-user';
import {FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import { HEADERS_DATA, HEADER_MAP_DATOS } from '../../enum/certificado.enum';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud110201State,Tramite110201Store } from '../../state/Tramite110201.store';
import { CommonModule } from '@angular/common';
import { InputFechaComponent } from '@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { Modal } from 'bootstrap';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import mercanciaDisponsibleTable from '@libs/shared/theme/assets/json/110201/mercancia-disponsible.json';
import mercanciaSeleccionadasTable from '@libs/shared/theme/assets/json/110201/mercancias-seleccionadas.json';
import mercanciaTable from '@libs/shared/theme/assets/json/110201/mercancia.json';

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
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;
  /**
   * Evento para comunicar datos al componente padre.
   */
  @Output() dataEvent = new EventEmitter<boolean>();
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
   * Referencia al modal para agregar/editar mercancía.
   */
  @ViewChild('modalAgregar') modalAgregar!: ElementRef;

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
  public solicitudState!: Solicitud110201State;
  /**
   * Tabla de selección de mercancías.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Descripciones de los tratados.
   */
  Tratadodescripcion: unknown[] = [];

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
   * Representa la configuración del campo de entrada para la fecha inicial en el formulario.
   */
  fechaInicialInput: InputFecha = FECHAINICIAL;

  /**
   * Configuración de la fecha final.
   * Representa la configuración del campo de entrada para la fecha final en el formulario.
   */
  fechaFinalInput: InputFecha = FECHAFINAL;

  /**
   * Configuración de la fecha de la factura.
   * Representa la configuración del campo de entrada para la fecha de la factura en el formulario.
   */
  fechaFacturaInput: InputFecha = FECHAFACTURA;
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
  public optionsTratado = OPTIONS_TRATADO;
  /**
   * Opciones del catálogo de países.
   * Contiene una lista de objetos del catálogo de países obtenidos desde el servicio.
   */
  public optionsPais = OPTIONS_PAIS;

  /**
   * Opciones del catálogo de unidades de medida comercial (UMC).
   * Contiene una lista de objetos del catálogo de UMC obtenidos desde el servicio.
   */
  public optionsUMC = OPTIONS_UMC;

  /**
   * Opciones del catálogo de unidades de medida.
   * Contiene una lista de objetos del catálogo de unidades de medida obtenidos desde el servicio.
   */
  optionsUnidadMedida = OPTIONS_UNIDAD_MEDIDA;

  /**
   * Opciones del catálogo de tipos de factura.
   * Contiene una lista de objetos del catálogo de tipos de factura obtenidos desde el servicio.
   */
  optionsTipoFactura = OPTIONS_TIPO_FACTURA;

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
  public headers: ConfiguracionColumna<ColumnasTabla>[] = [
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: ColumnasTabla) => ele.fraccionArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Nombre técnico',
      clave: (ele: ColumnasTabla) => ele.nombreTecnico,
      orden: 2,
    },
    {
      encabezado: 'Nombre comercial',
      clave: (ele: ColumnasTabla) => ele.nombreComercial,
      orden: 3,
    },
    {
      encabezado: 'Número de registro de productos',
      clave: (ele: ColumnasTabla) => ele.numeroRegistroProductos,
      orden: 4,
    },
    {
      encabezado: 'Fecha expedición',
      clave: (ele: ColumnasTabla) => ele.fechaExpedicion,
      orden: 5,
    },
    {
      encabezado: 'Fecha vencimíento',
      clave: (ele: ColumnasTabla) => ele.fechaVencimiento,
      orden: 6,
    },
  ];
  /**
   * Configuración de las columnas de la tabla de mercancías seleccionadas.
   * Define los encabezados y las claves asociadas a cada columna de la tabla de mercancías seleccionadas.
   */
  public headersData = HEADERS_DATA;

  /**
   * Bandera para mostrar la tabla de cargar archivo.
   */
  mostrarCargarArchivoTable: boolean = false;

  /**
   * Define los datos que se mostrarán en la tabla dinámica.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datosTabla: any[] = [];

  /**
   * Referencia al botón para cerrar el modal.
   *
   * Se utiliza para cerrar el modal de manera programada.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Referencia al elemento del modal de modificación.
   *
   * Se utiliza para abrir o cerrar el modal de modificación de mercancías.
   */
  modalInstances: Modal | null = null;

  /**
   * Indica si se debe mostrar un mensaje de error relacionado con el registro.
   * 
   * Cuando es `true`, se muestra el error de registro en la interfaz de usuario.
   * Cuando es `false`, el error no se muestra.
   */
  mostrarErrorRegistro: boolean = false;

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
    public store: Tramite110201Store,
    private query: Tramite110201Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {}

  /**
   * Maneja el evento de clic para habilitar el formulario de edición.
   * @param row Fila seleccionada.
   */
  manejarClic(_row: unknown): void {
    this.esFormulario = true;
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
    this.inicializarEstadoFormulario();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
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
          this.inicializarEstadoFormulario();
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
      this.mercanciaForm.disable();
    } else {
      this.registroForm.enable();
      this.mercanciaForm.enable();
    }
  }
  /**
   * Actualiza la fecha inicial en el formulario reactivo y en el estado de la tienda.
   * @param nuevo_fechaIncial Nueva fecha inicial seleccionada.
   */
  cambioFechaInicial(nuevo_fechaIncial: string): void {
    this.registroForm.patchValue({
      validacionForm: {
        fechaInicial: nuevo_fechaIncial,
      },
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
  buscarMercancias(): void {
    const FORM_VALUES = this.registroForm.get('validacionForm')?.value;
    const NEW_ROW = {
      fraccionArancelaria: FORM_VALUES.fraccionArancelaria,
      nombreTecnico: FORM_VALUES.nombreTecnico,
      nombreComercial: FORM_VALUES.nombreComercial,
      numeroRegistroProductos: FORM_VALUES.numeroRegistro,
      fechaExpedicion: FORM_VALUES.fechaInicial,
      fechaVencimiento: FORM_VALUES.fechaFinal,
    };
    this.mercanciaDisponsiblesTablaDatos = [NEW_ROW];
    this.hayMercanciasDisponibles = true;
  }

  /**
   * Abre el modal para agregar una mercancía desde la tabla de mercancías disponibles.
   * @param rowData Datos de la fila seleccionada de tipo ColumnasTabla
   */
  abrirModalMercancia(rowData: ColumnasTabla): void {
    if (rowData) {
      // Configurar el modal para agregar nueva mercancía
      this.esFormulario = true;
      this.esMercanciaEnEdicion = false;

      // Cargar catálogos necesarios
      this.getTratado();
      this.getPais();
      this.getUMC();
      this.getUnidadMedida();
      this.getTipoFactura();

      // Popuar el formulario con los datos de la mercancía disponible seleccionada
      this.mercanciaForm.patchValue({
        validacionMercanciaForm: {
          fraccionMercanciaArancelaria: rowData.fraccionArancelaria || '',
          nombreTecnico: rowData.nombreTecnico || '',
          nombreComercialDelaMercancia: rowData.nombreComercial || '',
          // Los demás campos se dejan vacíos para que el usuario los complete
          cantidad: '',
          valorDelaMercancia: '',
          tipoFactura: '',
          numeroFactura: '',
          complementoDelaDescripcion: '',
          fecha: rowData.fechaVencimiento || '',
          marca: '',
          umc: '',
          masaBruta: '',
          unidadMedida: '',
          criterioParaConferir: '',
          nombreEnIngles: '',
        },
      });

      // Abrir el modal usando Bootstrap
      const BOOTSTRAP_MODAL = new (
        window as unknown as {
          bootstrap: { Modal: new (element: Element) => { show(): void } };
        }
      ).bootstrap.Modal(this.modalAgregar.nativeElement);
      BOOTSTRAP_MODAL.show();
    }
  }

  /**
   * Agrega una mercancía al formulario.
   */
  agregar(): void {
  if (this.mercanciaForm.invalid) {
    this.mostrarErrorRegistro = true;
    this.mercanciaForm.markAllAsTouched();
    return;
  }
  this.mostrarErrorRegistro = false;

  const FORM_VALUES = this.mercanciaForm.value.validacionMercanciaForm;

  const NEW_ITEM: ColumnasTabla = {
        fraccionArancelaria: FORM_VALUES.fraccionMercanciaArancelaria,
        nombreTecnico: FORM_VALUES.nombreTecnico,
        nombreComercial: FORM_VALUES.nombreComercialDelaMercancia,
        numeroRegistroProductos: FORM_VALUES.numeroRegistroProductos || '',
        fechaExpedicion: FORM_VALUES.fechaExpedicion || '', 
        fechaVencimiento: FORM_VALUES.fechaVencimiento || ''
      };

      this.mercanciaDisponsiblesTablaDatos = [
        ...this.mercanciaDisponsiblesTablaDatos,
        NEW_ITEM,
      ];

  this.esMercanciaEnEdicion = true;
  this.esFormulario = true;
  this.cerrarModal();
}

  /**
   * Cierra el modal activo.
   *
   * Este método utiliza la referencia al botón de cierre del modal para cerrarlo.
   */
  cerrarModal(): void {
    this.mostrarErrorRegistro = false;
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Cancela la edición de una mercancía.
   */
  cancelar(): void {
    this.mostrarErrorRegistro = false;
    this.esMercanciaEnEdicion = true;
    this.esFormulario = false;
  }
  /**
   * Modifica una mercancía existente.
   */
  modificar(): void {
    this.abrirModalModificar();
  }

  abrirModalModificar(): void {
    // Cargar catálogos necesarios si es necesario
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
    // Abrir el modal usando Bootstrap
    if (this.modalAgregar && this.modalAgregar.nativeElement) {
      const BOOTSTRAP_MODAL = new (
        window as unknown as {
          bootstrap: { Modal: new (element: Element) => { show(): void } };
        }
      ).bootstrap.Modal(this.modalAgregar.nativeElement);
      BOOTSTRAP_MODAL.show();
    }
  }
  /**
   * Configura los encabezados y el cuerpo de la tabla de mercancías.
   * Asigna los valores de los encabezados y el cuerpo de la tabla desde los datos obtenidos.
   */
  public mercanciatable(): void {
    this.mercanciasHeader = this.getMercanciaTable.tableHeader;
    this.mercanciasBody = this.getMercanciaTable.tableBody;
  }
  /**
   * Activa el formulario para cargar un archivo.
   * Cambia el estado de la variable `cargarArchivo` a `true` para mostrar el formulario de carga de archivos.
   */
  cargaArchivo(): void {
    this.cargarArchivo = true;
    this.dataEvent.emit(true);
  }

  analizarGramaticalmenteCSV(csv: string): void {
    const LINES = csv.split('\n').filter((line) => line.trim() !== '');
    const HEADERS = LINES[0].split(',');
    const HEADER_MAP = HEADER_MAP_DATOS;
    const DATA = LINES.slice(1)
      .map((line) => {
        const VALUES = line.split(',');
        const OBJ: { [key: string]: string } = {};
        HEADERS.forEach((header, index) => {
          const KEY = HEADER_MAP[header.trim()] || header.trim();
          OBJ[KEY] = VALUES[index]?.trim();
        });
        return OBJ;
      })
      .filter((articulo) => Object.values(articulo).some((valor) => valor));
    this.mercanciaSeleccionadasTablaData = DATA.map((articulo) => ({
      fraccionArancelaria: articulo['fraccionArancelaria'] || '',
      cantidad: articulo['cantidad'] || '',
      unidadMedida: articulo['unidadMedida'] || '',
      valorMercancia: articulo['valorMercancia'] || '',
      nombreTecnico: articulo['nombreTecnico'] || '',
      nombreComercial: articulo['nombreComercial'] || '',
      numeroRegistroProductos: articulo['numeroRegistroProductos'] || '',
      fechaExpedicion: articulo['fechaExpedicion'] || '',
      fechaVencimiento: articulo['fechaVencimiento'] || '',
      tipoFactura: articulo['tipoFactura'] || '',
      numFactura: articulo['numFactura'] || '',
      complementoDescripcion: articulo['complementoDescripcion'] || '',
      fechaFactura: articulo['fechaFactura'] || ''
    }));
  }
  /**
   * Muestra errores en el formulario y desactiva la carga de archivos.
   * Cambia el estado de las variables `mostrarErrores` a `true` y `cargarArchivo` a `false`.
   */
  darError(): void {
    const FILE_INPUT = document.getElementById(
      'archivoAdjuntar'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      const READER = new FileReader();
      READER.onload = (e): void => {
        const TEXT = e.target?.result as string;
        this.analizarGramaticalmenteCSV(TEXT);
        this.esMercanciaEnEdicion = true;
      };
      READER.readAsText(FILE);
    }
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
        this.optionsTratado.catalogos = resp as Catalogo[];
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
        this.optionsPais.catalogos = resp as Catalogo[];
      });
  }
  /**
   * Obtiene el catálogo de UMC desde el servicio.
   */
  getUMC(): void {
    this.registroService
      .getUMC()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.optionsUMC.catalogos = resp as Catalogo[];
      });
  }
  /**
   * Obtiene el catálogo de unidades de medida desde el servicio.
   */
  getUnidadMedida(): void {
    this.registroService
      .getUnidadMedida()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.optionsUnidadMedida.catalogos = resp as Catalogo[];
      });
  }
  /**
   * Obtiene el catálogo de tipos de factura desde el servicio.
   */
  getTipoFactura(): void {
    this.registroService
      .getTipoFactura()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.optionsTipoFactura.catalogos = resp as Catalogo[];
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
    const FILE = INPUT.files && INPUT.files[0];
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
    metodoNombre: keyof Tramite110201Store
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
        tratado: [
          { value: this.solicitudState?.tratado, disabled: this.soloLectura },
          [Validators.required],
        ],
        pais: [
          { value: this.solicitudState?.pais, disabled: this.soloLectura },
          [Validators.required],
        ],
        fraccionArancelaria: [
          {
            value: this.solicitudState?.fraccionArancelaria,
            disabled: this.soloLectura,
          },
          [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],
        ],
        numeroRegistro: [
          {
            value: this.solicitudState?.numeroRegistro,
            disabled: this.soloLectura,
          },
          [Validators.required],
        ],
        nombreComercial: [
          {
            value: this.solicitudState?.nombreComercial,
            disabled: this.soloLectura,
          },
          [Validators.required],
        ],
        fechaInicial: [
          {
            value: this.solicitudState?.fechaInicial,
            disabled: this.soloLectura,
          },
          [Validators.required],
        ],
        fechaFinal: [
          {
            value: this.solicitudState?.fechaFinal,
            disabled: this.soloLectura,
          },
          [Validators.required],
        ],
        archivo: [
          { value: this.solicitudState?.archivo, disabled: this.soloLectura },
          [Validators.required],
        ],
      }),
    });
    this.mercanciaForm = this.fb.group({
      validacionMercanciaForm: this.fb.group({
        fraccionMercanciaArancelaria: [
          { value: '', disabled: this.soloLectura },
          [Validators.required],
        ],
        nombreTecnico: [
          { value: '', disabled: this.soloLectura },
          [Validators.required],
        ],
        nombreComercialDelaMercancia: [
          { value: '', disabled: this.soloLectura },
          [Validators.required],
        ],
        criterioParaConferir: [
          { value: '', disabled: this.soloLectura },
          [Validators.required],
        ],
        nombreEnIngles: [
          { value: '', disabled: this.soloLectura },
          [Validators.required],
        ],
        marca: [
          { value: this.solicitudState?.marca, disabled: this.soloLectura },
          [Validators.required],
        ],
        cantidad: [
          { value: this.solicitudState?.cantidad, disabled: this.soloLectura },
          [Validators.required, Validators.pattern(REGEX_CANTIDAD_15_4),Validators.maxLength(22)],
        ],
        umc: [
          { value: this.solicitudState?.umc, disabled: this.soloLectura },
          [Validators.required],
        ],
        valorDelaMercancia: [
          {
            value: this.solicitudState?.valorDelaMercancia,
            disabled: this.soloLectura,
          },
          [Validators.required, Validators.pattern(REGEX_CANTIDAD_15_4),Validators.maxLength(22)],
        ],
        complementoDelaDescripcion: [
          {
            value: this.solicitudState?.complementoDelaDescripcion,
            disabled: this.soloLectura,
          },
          [Validators.required,Validators.maxLength(200)],
        ],
        masaBruta: [
          { value: this.solicitudState?.masaBruta, disabled: this.soloLectura },
          [Validators.required, Validators.pattern(REGEX_NUMERO_15_ENTEROS_4_DECIMALES), Validators.maxLength(22)],
        ],
        unidadMedida: [
          {
            value: this.solicitudState?.unidadMedida,
            disabled: this.soloLectura,
          },
          [Validators.required],
        ],
        tipoFactura: [
          {
            value: this.solicitudState?.tipoFactura,
            disabled: this.soloLectura,
          },
          [Validators.required],
        ],
        fecha: [
          { value: this.solicitudState?.fecha, disabled: this.soloLectura },
          [Validators.required],
        ],
        numeroFactura: [
          {
            value: this.solicitudState?.numeroFactura,
            disabled: this.soloLectura,
          },
          [Validators.required, Validators.maxLength(50)],
        ],
      }),
    });
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
 * Formatea el valor del campo 'cantidad' en el formulario 'mercanciaForm' para asegurar que tenga exactamente cuatro decimales.
 *
 * - Si el valor es un número entero o no contiene decimales, se le agregan '.0000'.
 * - Si el valor ya contiene decimales, se ajusta para que tenga exactamente cuatro cifras decimales, rellenando con ceros si es necesario.
 * - No emite eventos de cambio al actualizar el valor del control.
 *
 * @remarks
 * Este método no realiza validaciones sobre el valor numérico, solo sobre el formato de los decimales.
 */
formatearCantidad(): void {
  const CONTROL = this.mercanciaForm.get('validacionMercanciaForm.cantidad');
  let valor = CONTROL?.value;
  if (valor !== null && valor !== undefined && valor !== '') {
    valor = valor.toString();
    if (!valor.includes('.')) {
      valor = valor + '.0000';
    } else {
      const [ENTERO, DECIMALES] = valor.split('.');
      valor = ENTERO + '.' + (DECIMALES + '0000').slice(0, 4);
    }
    CONTROL?.setValue(valor, { emitEvent: false });
  }
}

/**
 * Formatea el valor de la mercancía en el formulario para asegurar que tenga exactamente cuatro decimales.
 *
 * - Si el valor no contiene decimales, se le agregan '.0000'.
 * - Si el valor ya contiene decimales, se ajusta para que tenga exactamente cuatro dígitos decimales,
 *   rellenando con ceros si es necesario o truncando si hay más de cuatro.
 * - El valor formateado se establece en el control del formulario sin emitir eventos.
 *
 * @remarks
 * Este método asume que el control 'validacionMercanciaForm.valorDelaMercancia' existe en el formulario 'mercanciaForm'.
 */
formatearValorDelaMercancia(): void {
  const CONTROL = this.mercanciaForm.get('validacionMercanciaForm.valorDelaMercancia');
  let valor = CONTROL?.value;
  if (valor !== null && valor !== undefined && valor !== '') {
    valor = valor.toString();
    if (!valor.includes('.')) {
      valor = valor + '.0000';
    } else {
      const [ENTERO, DECIMALES] = valor.split('.');
      valor = ENTERO + '.' + (DECIMALES + '0000').slice(0, 4);
    }
    CONTROL?.setValue(valor, { emitEvent: false });
  }
}

/**
 * Formatea el valor del campo 'masaBruta' en el formulario 'mercanciaForm' para asegurar que tenga exactamente cuatro decimales.
 * 
 * - Si el valor no contiene decimales, se le agregan '.0000'.
 * - Si el valor ya contiene decimales, se ajusta para que tenga exactamente cuatro dígitos decimales, rellenando con ceros si es necesario.
 * - El valor formateado se establece en el control sin emitir eventos.
 * 
 * @remarks
 * Este método no realiza validaciones numéricas, solo formatea la cadena del valor.
 */
formatearMasaBruta(): void {
  const CONTROL = this.mercanciaForm.get('validacionMercanciaForm.masaBruta');
  let valor = CONTROL?.value;
  if (valor !== null && valor !== undefined && valor !== '') {
    valor = valor.toString();
    if (!valor.includes('.')) {
      valor = valor + '.0000';
    } else {
      const [ENTERO, DECIMALES] = valor.split('.');
      valor = ENTERO + '.' + (DECIMALES + '0000').slice(0, 4);
    }
    CONTROL?.setValue(valor, { emitEvent: false });
  }
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
