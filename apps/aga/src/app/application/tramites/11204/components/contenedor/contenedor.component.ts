import moment from 'moment';
import { Modal } from 'bootstrap';
import { map, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Aduanas, DatosDelContenedor } from '../../models/datos-tramite.model';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { Solicitud11204State } from '../../estados/tramite11204.store';
import { Tramite11204Query } from '../../estados/tramite11204.query';
import { Tramite11204Store } from '../../estados/tramite11204.store';

import { TEXTOS, AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TituloComponent, ValidacionesFormularioService, RespuestaCatalogos } from '@libs/shared/data-access-user/src';

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
    AlertComponent,
    TablaDinamicaComponent
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
  showSeccionArchivoCsv: boolean = false;

  /**
   * Bandera para mostrar la sección de aduana y fecha.
   */
  showSeccionAduanaaFecha: boolean = false;

  /**
   * Bandera para mostrar la sección de contenedor.
   */
  showSeccionContenedor: boolean = false;

  /**
   * Bandera para mostrar la tabla de archivo seleccionado.
   */
  showArchivoSeleccionadoTable: boolean = false;

  /**
   * Bandera para mostrar la sección de Excel.
   */
  showSeccionExcel: boolean = false;

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
   * Índice actual.
   */
  currentIdx: number = 0;

  /**
   * Bandera para mostrar el tipo de contenedor.
   */
  mostrarAgregarTipoContenedor: boolean = false;

  /**
   * Bandera para mostrar los botones.
   */
  showButtons: boolean = true;

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
   * Monto de la solicitud.
   */
  amount: number = 328.5;

  /**
   * Configuración de las columnas de la tabla.
   */
  public encabezadoDeTabla: ConfiguracionColumna<DatosDelContenedor>[] = [
    { encabezado: '', clave: (artículo) => artículo.id, orden: 1 },
    { encabezado: 'Iniciales del equipo', clave: (artículo) => artículo.inicialesEquipo, orden: 1 },
    { encabezado: 'Número de equipo', clave: (artículo) => artículo.numeroEquipo, orden: 2 },
    { encabezado: 'Dígito Verificador', clave: (artículo) => artículo.digitoVerificador, orden: 3 },
    { encabezado: 'Tipo de Documento', clave: (artículo) => artículo.tipoEquipo, orden: 4 },
    { encabezado: 'Fecha Ingreso', clave: (artículo) => artículo.fechaIngreso, orden: 5 },
    { encabezado: 'vigencia', clave: (artículo) => artículo.vigencia, orden: 6 },
    { encabezado: 'Aduana', clave: (artículo) => artículo.aduana, orden: 7 }
  ];

  /**
   * Datos del contenedor.
   */
  public datosDelContenedor: DatosDelContenedor[] = [];

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
  ) {
    this.aduana = {
      catalogos: [],
      labelNombre: 'Aduana/sección aduanera',
      primerOpcion: 'Seleccione un valor',
    };
    this.contenedores = {
      catalogos: [],
      labelNombre: 'Tipo de Documento',
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
      vigencia: [this.solicitud11204State?.Vigencia, Validators.required],
      inicialesContenedor: [this.solicitud11204State?.inicialesContenedor, [Validators.required, Validators.maxLength(10), Validators.pattern('^[a-zA-Z0-9]+$')]],
      numeroContenedor: [this.solicitud11204State?.numeroContenedor, [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      digitoDeControl: [this.solicitud11204State?.digitoDeControl, [Validators.maxLength(1), Validators.pattern('^[0-9]$')]],
      contenedores: [this.solicitud11204State?.contenedores, Validators.required],
      aduanaMenúDesplegable: [
        this.solicitud11204State.aduanaMenúDesplegable,
        Validators.required,
      ],
      archivoSeleccionado: [this.solicitud11204State?.archivoSeleccionado, Validators.required]
    });
    this.mostrarCampos();
    this.solicitudForm
      .get('inicialesContenedor')
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe((valor) => {
        if (valor) {
          const SANITIZED = valor.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
          this.solicitudForm
            .get('inicialesContenedor')
            ?.setValue(SANITIZED, { emitEvent: false });
          this.setValoresStore(
            this.solicitudForm,
            'inicialesContenedor',
            'setInicialesContenedor'
          );
        }
      });

    this.solicitudForm
      .get('numeroContenedor')
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe((valor) => {
        if (valor) {
          const SANITIZED = valor.replace(/[^a-zA-Z0-9]/g, '');
          this.solicitudForm
            .get('numeroContenedor')
            ?.setValue(SANITIZED, { emitEvent: false });
          this.setValoresStore(this.solicitudForm, 'numeroContenedor', 'setNumeroContenedor');
        }
      });
    this.solicitudForm
      .get('digitoDeControl')
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe((valor) => {
        if (valor) {
          const SANITIZED = valor.replace(/[^0-9]/g, '');
          this.solicitudForm
            .get('digitoDeControl')
            ?.setValue(SANITIZED, { emitEvent: false });
          this.setValoresStore(this.solicitudForm, 'digitoDeControl', 'setDigitoDeControl');
        }
      });
    // Escuchar cambios en tipoBusqueda para mostrar secciones
    this.solicitudForm.get('tipoBusqueda')?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe(() => {
      this.setValoresStore(this.solicitudForm, 'tipoBusqueda', 'setTipoBusqueda');
      this.mostrarCampos();
    });

    // Escuchar cambios en tipoTransporte
    this.solicitudForm.get('aduana')?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe(() => {
      this.setValoresStore(this.solicitudForm, 'aduana', 'setAduana');
      this.solicitudForm.get('fechaIngreso')?.setValue(moment().format('YYYY-MM-DD'));
      this.setValoresStore(this.solicitudForm, 'fechaIngreso', 'setFechaIngreso');
      this.solicitudForm.get('vigencia')?.setValue(moment().format('YYYY-MM-DD'));
      this.setValoresStore(this.solicitudForm, 'vigencia', 'setVigencia');
    });
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
   * Mostrar campos según el tipo de búsqueda seleccionado.
   */
  mostrarCampos(): void {
    const TIPO_BUSQUEDA = this.solicitudForm.get('tipoBusqueda')?.value;
    this.showSeccionArchivoCsv = false;
    this.showSeccionAduanaaFecha = false;
    this.showSeccionContenedor = false;
    this.showSeccionExcel = false;

    switch (TIPO_BUSQUEDA) {
      case 'Contenedor':
        this.showSeccionContenedor = true;
        this.showSeccionAduanaaFecha = true;
        break;
      case 'Archivo CSV':
        this.showSeccionArchivoCsv = true;
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
    this.showSeccionArchivoCsv = false;
    this.showSeccionAduanaaFecha = false;
    this.showSeccionContenedor = false;
    this.showSeccionExcel = false;
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
    this.solicitudForm.markAllAsTouched();
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
    this.showButtons = false;
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
   * Validar el dígito verificador y agregar la solicitud.
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
        this.showArchivoSeleccionadoTable = true;
      };
      READER.readAsText(FILE);
    }
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
      'N�mero de equipo': 'numeroEquipo',
      'D�gito Verificador': 'digitoVerificador',
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
    }).filter(artículo => Object.values(artículo).some(valor => valor));
    this.datosTabla = DATA;
  }

  /**
   * Seleccionar pestaña actual.
   */
  tabSeleccionado(): void {
    const CURRENT_IDX = localStorage.getItem('currentIdx');
    if (CURRENT_IDX !== null) {
      this.currentIdx = Number(CURRENT_IDX);
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
        this.contenedores.catalogos = data.data.map((contenedor: any) => ({
          id: contenedor.id,
          descripcion: contenedor.descripcion || ''
        }));
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
   * Emitir evento de continuar.
   * Este método emite un evento para continuar con el proceso.
   */
  continuar(): void {
    this.continuarEvento.emit('');
  }

}