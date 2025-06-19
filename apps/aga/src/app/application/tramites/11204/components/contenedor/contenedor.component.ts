import { Aduanas, DatosDelContenedor, DatosDelCsvArchivo } from '../../models/datos-tramite.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputFecha, InputFechaComponent, REGEX_NUMEROS, REGEX_REEMPLAZAR, TEXTOS, TablaDinamicaComponent, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FECHA_INGRESO, VIGENCIA } from '../../enums/datos-tramite.enum';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { Modal } from 'bootstrap';
import { Solicitud11204State } from '../../estados/tramite11204.store';
import { Tramite11204Query } from '../../estados/tramite11204.query';
import { Tramite11204Store } from '../../estados/tramite11204.store';
import moment from 'moment';

/**
 * Componente para gestionar la solicitud de contenedores.
 */
@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    InputFechaComponent
  ],
  providers: [BsModalService]
})
export class ContenedorComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal de la solicitud.
   */
  solicitudForm!: FormGroup;

  /**
   * Bandera para mostrar la sección de adjuntar archivo.
   */
  mostrarSeccionArchivoCsv: boolean = false;

  /**
   * Bandera para mostrar la sección de aduana y fecha.
   */
  mostrarSeccionAduanaaFecha: boolean = false;

  /**
   * Bandera para mostrar la sección de contenedor.
   */
  mostrarSeccionContenedor: boolean = false;

  /**
   * Bandera para mostrar la tabla de archivo seleccionado.
   */
  mostrarArchivoSeleccionadoTable: boolean = false;

  /**
   * Bandera para mostrar la sección de Excel.
   */
  mostrarSeccionExcel: boolean = false;

  /**
   * Lista de aduanas.
   */
  aduanaList: Aduanas[] = [];

  /**
   * Contenedores.
   */
  contenedores: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };

  /**
   * indice actual.
   */
  idxActual: number = 0;

  /**
   * Bandera para mostrar el tipo de contenedor.
   */
  mostrarAgregarTipoContenedor: boolean = false;

  /**
   * Bandera para mostrar los botones.
   */
  mostrarButtons: boolean = true;

  /**
   * Lista de catálogos.
   */
  @Input() catalogoList: Catalogo[] = [];

  /**
   * Aduana.
   */
  aduana: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };

  /**
   * Datos que se mostrarán en la tabla dinámica.
   */
  datosTabla: Record<string, string>[] = [];

  /**
   * Textos.
   */
  TEXTOS = TEXTOS;

  /**
   * Estado de la solicitud.
   */
  public solicitud11204State!: Solicitud11204State;

  /**
   * Sujeto para notificar la destrucción del componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Representa la fecha de inicio ingresada por el usuario.
   * 
   * @type {InputFecha}
   * @default FECHA_INGRESO
   */
  public fechaIngreso: InputFecha = FECHA_INGRESO;

  /**
   * Representa la Vigencia ingresada por el usuario.
   * 
   * @type {InputFecha}
   * @default VIGENCIA
   */
  public Vigencia: InputFecha = VIGENCIA;

  /** 
   * Desactiva el radio de "Contenedor" cuando se selecciona "Archivo CSV"
   */
  radioContenedor:boolean = false;

  /**
   * Desactiva el radio de "Archivo CSV" cuando se selecciona "Contenedor"
   */
  radioArchivoCsv:boolean = false;

  /**
   * Configuración de las columnas de la tabla.
   */
  public encabezadoDeTabla: ConfiguracionColumna<DatosDelContenedor>[] = [
    { encabezado: '', clave: (articulo) => articulo.id, orden: 1 },
    { encabezado: 'Iniciales del equipo', clave: (articulo) => articulo.inicialesEquipo, orden: 1 },
    { encabezado: 'Número de equipo', clave: (articulo) => articulo.numeroEquipo, orden: 2 },
    { encabezado: 'Dígito verificador', clave: (articulo) => articulo.digitoVerificador, orden: 3 },
    { encabezado: 'Tipo de equipo', clave: (articulo) => articulo.tipoEquipo, orden: 4 },
    { encabezado: 'Fecha Ingreso', clave: (articulo) => articulo.fechaIngreso, orden: 5 },
    { encabezado: 'Vigencia', clave: (articulo) => articulo.vigencia, orden: 6 },
    { encabezado: 'Aduana', clave: (articulo) => articulo.aduana, orden: 7 },
    { encabezado: 'Estado de constancia', clave: (articulo) => articulo.estado, orden: 8 },
    { encabezado: 'Existe en VUCEM', clave: (articulo) => articulo.existe, orden: 9 }
  ];

  /**
   * Configuración de las columnas de la tabla.
   */
  public csvTabla: ConfiguracionColumna<DatosDelCsvArchivo>[] = [
    { encabezado: '', clave: (articulo) => articulo.id, orden: 1 },
    { encabezado: 'Iniciales del equipo', clave: (articulo) => articulo.inicialesEquipo, orden: 1 },
    { encabezado: 'Número de equipo', clave: (articulo) => articulo.numeroEquipo, orden: 2 },
    { encabezado: 'Dígito verificador', clave: (articulo) => articulo.digitoVerificador, orden: 3 },
    { encabezado: 'Tipo de equipo', clave: (articulo) => articulo.tipoEquipo, orden: 4 },
    { encabezado: 'Fecha Ingreso', clave: (articulo) => articulo.fechaIngreso, orden: 5 },
    { encabezado: 'Vigencia', clave: (articulo) => articulo.vigencia, orden: 6 },
    { encabezado: 'Aduana', clave: (articulo) => articulo.aduana, orden: 7 },
    { encabezado: 'Estado de constancia', clave: (articulo) => articulo.estado, orden: 8 },
    { encabezado: 'Existe en VUCEM', clave: (articulo) => articulo.existe, orden: 9 }
  ];

  /**
   * Datos del contenedor.
   */
  public datosDelContenedor: DatosDelContenedor[] = [];

 /**
   * Datos del contenedor.
   */
 public datosDelCsvArchivo: DatosDelCsvArchivo[] = [];

  /**
   * Referencia al modal.
   */
  modalRef?: BsModalRef | null;

  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modalAgregarConstanciaTransferencia') modalElement!: ElementRef;

  /**
   * Evento para continuar.
   */
  @Output() continuarEvento = new EventEmitter<string>();

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 

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
   * Constructor del componente.
   * @param fb Constructor de formularios.
   * @param datosTramiteService Servicio de datos del trámite.
   * @param validacionesService Servicio de validaciones de formulario.
   * @param Tramite11204Store Store del trámite 11204.
   * @param Tramite11204Query Query del trámite 11204.
   * @param modalService Servicio de modal.
   */
  constructor(
    private fb: FormBuilder,
    private datosTramiteService: DatosTramiteService,
    private validacionesService: ValidacionesFormularioService,
    public Tramite11204Store: Tramite11204Store,
    private Tramite11204Query: Tramite11204Query,
    private modalService: BsModalService,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.aduana = {
      catalogos: [],
      labelNombre: 'Aduana/sección aduanera',
      primerOpcion: 'Seleccione un valor',
    };
    this.contenedores = {
      catalogos: [],
      labelNombre: 'Tipo de equipos',
      primerOpcion: 'Seleccione un valor',
    };
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.Tramite11204Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          if (typeof seccionState === 'object' && seccionState !== null) {
            this.solicitud11204State = {
              ...this.solicitud11204State,
              ...seccionState,
            };
          }
        })
      )
      .subscribe();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.tabSeleccionado();
    this.cargarCatalogos();
    this.fetchgetaduanaLista();
    this.loadDatosTablaData();
  }

  /**
   * Método de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Inicializa el formulario reactivo.
   */
  inicializarFormulario(): void {
    this.solicitudForm = this.fb.group({
      tipoBusqueda: [this.solicitud11204State?.tipoBusqueda, Validators.required],
      aduana: [this.solicitud11204State?.aduana, Validators.required],
      fechaIngreso: [this.solicitud11204State?.fechaIngreso, Validators.required],
      vigencia: [this.solicitud11204State?.vigencia, Validators.required],
      inicialesContenedor: [this.solicitud11204State?.inicialesContenedor, [Validators.required, Validators.maxLength(10), Validators.pattern(REGEX_REEMPLAZAR)]],
      numeroContenedor: [this.solicitud11204State?.numeroContenedor, [Validators.required,Validators.minLength(6), Validators.maxLength(15), Validators.pattern(REGEX_REEMPLAZAR)]],
      digitoDeControl: [this.solicitud11204State?.digitoDeControl, [Validators.maxLength(1), Validators.pattern(REGEX_NUMEROS)]],
      contenedores: [this.solicitud11204State?.contenedores, Validators.required],
      aduanaMenuDesplegable: [
        this.solicitud11204State.aduanaMenuDesplegable,
        Validators.required,
      ],
      archivoSeleccionado: [this.solicitud11204State?.archivoSeleccionado, Validators.required]
    });
    this.mostrarCampos();
    if (this.soloLectura) {
      this.solicitudForm?.disable();
    } else {
      this.solicitudForm?.enable();
    }
  }

  onChange(controlName: string, event: any): void {
    const VALUE = event.target.value;
   
    if (controlName === 'inicialesContenedor') {
      const SANITIZED = VALUE.replace(REGEX_REEMPLAZAR,'').toUpperCase();
      this.solicitudForm.get(controlName)?.setValue(SANITIZED);
      this.setValoresStore(this.solicitudForm, controlName, 'setInicialesContenedor');
    } else if (controlName === 'numeroContenedor') {
      const SANITIZED = VALUE.replace(REGEX_REEMPLAZAR, '');
      this.solicitudForm.get(controlName)?.setValue(SANITIZED);
      this.setValoresStore(this.solicitudForm, controlName, 'setNumeroContenedor');
    } else if (controlName === 'digitoDeControl') {
      const SANITIZED = VALUE.replace(REGEX_NUMEROS, '');
      this.solicitudForm.get(controlName)?.setValue(SANITIZED);
      this.setValoresStore(this.solicitudForm, controlName, 'setDigitoDeControl');
    } else if (controlName === 'tipoBusqueda') {
      this.setValoresStore(this.solicitudForm, controlName, 'setTipoBusqueda');
      this.mostrarCampos();
    } else if (controlName === 'aduana') {
      this.setValoresStore(this.solicitudForm, controlName, 'setAduana');
      const CURRENT_DATE = moment().format('YYYY-MM-DD');
      this.solicitudForm.get('fechaIngreso')?.setValue(CURRENT_DATE);
      this.setValoresStore(this.solicitudForm, 'fechaIngreso', 'setFechaIngreso');
      this.solicitudForm.get('vigencia')?.setValue(CURRENT_DATE);
      this.setValoresStore(this.solicitudForm, 'vigencia', 'setVigencia');
    }
  }
  
  /**
   * Cargar datos de la tabla.
   */
  loadDatosTablaData(): void {
    this.datosTramiteService.getDatosTableData().pipe(takeUntil(this.destroyNotifier$)).subscribe(
      (data) => {
        this.contenedores.catalogos = data.data.map((contenedor: any) => ({
          id: contenedor.id,
          descripcion: contenedor.descripcion || ''
        }));
      },
    );
  }

  /**
   * Establecer valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite11204Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.Tramite11204Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

  /**
   * Mostrar campos segun el tipo de busqueda seleccionado.
   */
  mostrarCampos(): void {
    const TIPO_BUSQUEDA = this.solicitudForm.get('tipoBusqueda')?.value;
    this.mostrarSeccionArchivoCsv = false;
    this.mostrarSeccionAduanaaFecha = false;
    this.mostrarSeccionContenedor = false;
    this.mostrarSeccionExcel = false;

    switch (TIPO_BUSQUEDA) {
      case 'Contenedor':
        this.mostrarSeccionContenedor = true;
        this.mostrarSeccionAduanaaFecha = true;
        this.radioContenedor = false;
        this.radioArchivoCsv = true;
        break;
      case 'Archivo CSV':
        this.mostrarSeccionArchivoCsv = true;
        this.radioArchivoCsv = false;
        this.radioContenedor = true;
        this.mostrarArchivoSeleccionadoTable = true;
        break;
      default:
        break;
    }
  }

  /**
   * Limpiar campos del formulario.
   */
  limpiarCampos(): void {
    this.solicitudForm.reset();
    this.radioContenedor = false;
    this.radioArchivoCsv = false;
    this.mostrarSeccionArchivoCsv = false;
    this.mostrarSeccionAduanaaFecha = false;
    this.mostrarSeccionContenedor = false;
    this.mostrarSeccionExcel = false;
    this.mostrarAgregarTipoContenedor = false;
    this.solicitudForm.get('archivoSeleccionado')?.disable();
  }

  /**
   * Mostrar tipo de contenedor.
   */
  mostrarTipoContenedor(): void {
    this.mostrarAgregarTipoContenedor = true;
  }

  /**
   * Mostrar modal de captura de datos.
   */
  datosCapturaModal(): void {
    if (this.solicitudForm.value.aduana && this.solicitudForm.value.inicialesContenedor && this.solicitudForm.value.numeroContenedor) {
      if (this.modalElement) {
        const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
        MODAL_INSTANCE.show();
        this.mostrarButtons = false;
        this.solicitudForm.reset();
      }
    } else {
      this.solicitudForm.markAllAsTouched();
    }
  }

  /** 
  * Cierra el modal manualmente desde el componente
  */
  hideModal(): void {
    const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
    MODAL_INSTANCE.hide();
    this.mostrarButtons = true;
  }

  /**
   * Validar si un campo es válido.
   * @param field Nombre del campo.
   * @returns Verdadero si el campo es válido, falso en caso contrario.
   */
  isValid(field: string): boolean {
    const VALIDATIONRESULT = this.validacionesService.isValid(
      this.solicitudForm,
      field
    );
    return VALIDATIONRESULT === null ? false : VALIDATIONRESULT;
  }

  /**
   * Verifica si el control del formulario es inválido y ha sido tocado.
   * @param {string} id El nombre del control del formulario.
   * @returns {boolean | undefined} `true` si el control es inválido y tocado, `null` si no existe el control.
   */
  isInvalid(id: string): boolean | undefined {
    const CONTROL = this.solicitudForm.get(id);
    return CONTROL ? CONTROL.invalid && CONTROL.touched : undefined;
  }

  /**
   * Validar el Dígito verificador y agregar la solicitud.
   */
  datosCaptura(): void {
    this.solicitudForm.markAllAsTouched();
    const ADUANA = this.solicitudForm.value.aduana;
    const FECHAINGRESO = this.solicitudForm.value.fechaIngreso;
    const VIGENCIA = this.solicitudForm.value.vigencia;
    const INICIALESCONTENEDOR = this.solicitudForm.value.inicialesContenedor;
    const NUMEROCONTENEDOR = this.solicitudForm.value.numeroContenedor;
    const CONTENEDORES = this.solicitudForm.value.contenedores;
    if (INICIALESCONTENEDOR && NUMEROCONTENEDOR && ADUANA && FECHAINGRESO && VIGENCIA && CONTENEDORES) {
      this.agregarSolicitud();
    }
  }

  /**
   * Adjuntar archivo CSV y parsear su contenido.
   */
  adjuntarArchivo(): void {
    const FILE_INPUT = document.getElementById(
      'archivoSeleccionado'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      const READER = new FileReader();
      READER.onload = (e): void => {
        const TEXT = e.target?.result as string;
        this.parseCSV(TEXT);
        this.mostrarArchivoSeleccionadoTable = true;
      };
      READER.readAsText(FILE);
    }
    this.datosTramiteService.agregarSolicitud().pipe(takeUntil(this.destroyNotifier$)).subscribe(
      (respuesta) => {
        if (respuesta?.success) {
          respuesta.datos.id = this.datosDelCsvArchivo.length + 1;
          this.datosDelCsvArchivo.push(respuesta.datos);
          (this.Tramite11204Store.setDelCsv as (valor: DatosDelCsvArchivo[]) => void)(this.datosDelCsvArchivo);
        }
      }
    );
  }

  /**
   * Parsear contenido CSV.
   * @param csv Contenido CSV.
   */
  parseCSV(csv: string): void {
    const LINES = csv.split('\n').filter(line => line.trim() !== '');
    const HEADERS = LINES[0].split(',');
    const HEADER_MAP: { [key: string]: string } = {
      'Aduana': 'aduana',
      'Iniciales del equipo': 'inicialesEquipo',
      'Tipo de documento': 'tipoEquipo',
      'Número de equipo': 'numeroEquipo',
      'Dígito verificador': 'digitoVerificador',
      'Fecha Ingreso': 'fechaIngreso',
      'Vigencia': 'vigencia'
    };
    const DATA = LINES.slice(1).map((line) => {
      const VALUES = line.split(',');
      const OBJ: Record<string, string> = {};
      HEADERS.forEach((header, index) => {
        const KEY = HEADER_MAP[header.trim()] || header.trim();
        OBJ[KEY] = VALUES[index]?.trim();
      });
      return OBJ;
    }).filter(articulo => Object.values(articulo).some(valor => valor));
    this.datosTabla = DATA;
  }

  /**
   * Seleccionar pestaña actual.
   */
  tabSeleccionado(): void {
    const CURRENT_IDX = localStorage.getItem('idxActual');
    if (CURRENT_IDX !== null) {
      this.idxActual = Number(CURRENT_IDX);
    }
  }

  /**
   * Agregar solicitud.
   */
  agregarSolicitud(): void {
      this.datosTramiteService.agregarSolicitud().pipe(takeUntil(this.destroyNotifier$)).subscribe(
      (respuesta) => {
        if (respuesta?.success) {
          respuesta.datos.id = this.datosDelContenedor.length + 1;
          this.datosDelContenedor.push(respuesta.datos);
          (this.Tramite11204Store.setDelContenedor as (valor: DatosDelContenedor[]) => void)(this.datosDelContenedor);
          this.solicitudForm.patchValue({
            aduana: '',
            fechaIngreso: '',
            vigencia: '',
            digitoDeControl: '',
            inicialesContenedor: '',
            numeroContenedor: '',
            contenedores: ''
          });
          this.solicitudForm.reset();
          this.solicitudForm.markAsUntouched();
          this.solicitudForm.markAsPristine();
        }
      }
    );
  }

  /**
   * Cargar catálogos de datos.
   */
  cargarCatalogos(): void {
    this.datosTramiteService.getContenedores().pipe(takeUntil(this.destroyNotifier$)).subscribe(
      (data) => {
        this.contenedores.catalogos = data.data;
      },
    );
  }

  /**
   * Obtener la lista de aduanas.
   */
  public fetchgetaduanaLista(): void {
    this.datosTramiteService
      .getAduanaLista('aduanaLista')
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((respuesta) => {
        this.catalogoList = respuesta.data;
      });
  }

  /**
   * Cambia la fecha de ingreso en el formulario de solicitud.
   *
   * @param nuevo_valor - El nuevo valor de la fecha de ingreso en formato de cadena.
   */
  public cambioFechaIngreso(nuevo_valor: string): void {
    this.solicitudForm.get('fechaIngreso')?.setValue(nuevo_valor);
    this.solicitudForm.get('fechaIngreso')?.markAsUntouched();
  }

  /**
   * Cambia la vigencia en el formulario de solicitud.
   *
   * @param nuevo_valor - El nuevo valor de la vigencia en formato de cadena.
   */
  public cambioVigencia(nuevo_valor: string): void {
    this.solicitudForm.get('vigencia')?.setValue(nuevo_valor);
    this.solicitudForm.get('vigencia')?.markAsUntouched();
  }

  /**
   * Emitir evento de continuar.
   * Este método emite un evento para continuar con el proceso.
   */
  continuar(): void {
    this.continuarEvento.emit('');
  }

}