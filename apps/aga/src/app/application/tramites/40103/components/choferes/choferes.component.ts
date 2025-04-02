import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { ChangeDetectorRef } from '@angular/core';
import { Chofer40103Query } from '../../estados/chofer40103.query';
import { Chofer40103Service } from '../../estados/chofer40103.service';
import { Chofer40103Store } from '../../estados/chofer40103.store';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';

import { CHOFERES_PAGE } from '../../enum/transportista-terrestre.enum';
import { HttpClient } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { Nacional } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { SharedModule } from '@ng-mf/data-access-user';
import { choferesEnum } from '../constantes/choferes.enum';
import { choferesExtranjeros } from '../../../40103/models/registro-muestras-mercancias.model';
import { datosDelChoferNacional } from '../../../40103/models/registro-muestras-mercancias.model';
import { extranjero } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import mockData from '@libs/shared/theme/assets/json/40103/director-general-mockdata.json';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
})
export class ChoferesComponent implements OnInit, OnDestroy {
  solicitudTituloChoferExtranjero: string =
    CHOFERES_PAGE.SOLICITUD_TITULO_CHOFER_EXTRANJERO;
  labelSolicitudPersonaNombre: string =
    CHOFERES_PAGE.LABEL_SOLICITUD_PERSONA_NOMBRE;
  labelSolicitudPersonaPrimerApellido: string =
    CHOFERES_PAGE.LABEL_SOLICITUD_PERSONA_PRIMER_APELLIDO;
  labelSolicitudPersonaSegundoApellido: string =
    CHOFERES_PAGE.LABEL_SOLICITUD_PERSONA_SEGUNDO_APELLIDO;
  labelNacionalidad: string = CHOFERES_PAGE.LABEL_NACIONALIDAD;
  labelSolicitudChoferExtGafete: string =
    CHOFERES_PAGE.LABEL_SOLICITUD_CHOFER_EXT_GAFETE;
  labelSolicitudChoferExtVigenciaGafete: string =
    CHOFERES_PAGE.LABEL_SOLICITUD_CHOFER_EXT_VIGENCIA_GAFETE;
  labelSolicitudChoferExtNss: string =
    CHOFERES_PAGE.LABEL_SOLICITUD_CHOFER_EXT_NSS;
  labelSolicitudChoferExtIdeFiscal: string =
    CHOFERES_PAGE.LABEL_SOLICITUD_CHOFER_EXT_IDE_FISCAL;
  tooltipIdentificacionFiscal: string =
    CHOFERES_PAGE.TOOL_TIP_IDENTIFICACION_FISCAL;
  solicitudTituloDomicilioFiscal: string =
    CHOFERES_PAGE.SOLICITUD_TITULO_DOMICILIO_FISCAL;
  labelPais: string = CHOFERES_PAGE.LABEL_PAIS;
  labelSolicitudDomicilioCodigoPostal: string =
    CHOFERES_PAGE.LABEL_SOLICITUD_DOMICILIO_CODIGO_POSTAL;
  labelEntidadFederativa: string = CHOFERES_PAGE.LABEL_ENTIDAD_FEDERATIVA;
  labelSolicitudDomicilioCalle: string =
    CHOFERES_PAGE.LABEL_SOLICITUD_DOMICILIO_CALLE;
  labelSolicitudDomicilioNumeroExterior: string =
    CHOFERES_PAGE.LABEL_SOLICITUD_DOMICILIO_NUMERO_EXTERIOR;
  labelSolicitudDomicilioNumeroInterior: string =
    CHOFERES_PAGE.LABEL_SOLICITUD_DOMICILIO_NUMERO_INTERIOR;
  labelPaisOrigen: string = CHOFERES_PAGE.LABEL_PAIS_ORIGEN;
  labelSolicitudDomicilioCiudad: string =
    CHOFERES_PAGE.LABEL_SOLICITUD_DOMICILIO_CIUDAD;
  labelSolicitudCorreo: string = CHOFERES_PAGE.LABEL_SOLICITUD_CORREO;
  labelSolicitudTelefono: string = CHOFERES_PAGE.LABEL_SOLICITUD_TELEFONO;
  camposObligatorios: string = CHOFERES_PAGE.CAMPOS_OBLIGATORIOS;
  botonBuscar: string = CHOFERES_PAGE.BOTON_BUSCAR;
  botonLimpiar: string = CHOFERES_PAGE.BOTON_LIMPIAR;
  botonCancelar: string = CHOFERES_PAGE.BOTON_CANCELAR;
  botonGuardar: string = CHOFERES_PAGE.BOTON_GUARDAR;
  seleccionaUnValor: string = CHOFERES_PAGE.SELECCIONA_UNVALOR;
  labelPuntos: string = '...';
  seleccionadosTodos: boolean = false;
  modal: string = 'modal';
  nacional: Array<Nacional> = [];
  extranjero: Array<extranjero> = [];
  activeTab: string = 'nacional';
  Choferesextranjeros: string = 'Choferes extranjeros';
  /**
   * Observable que contiene la lista de estados disponibles.
   *
   * @type {Observable<Catalogo[]>}
   */
  estado$!: Observable<Catalogo[]>;

  /**
   * Lista de entidades federativas (estados) para choferes nacionales.
   *
   * @type {Catalogo[]}
   */
  entidadFederativaCHN: Catalogo[] = [];

  /**
   * Lista de datos de los choferes nacionales.
   *
   * @type {datosDelChoferNacional[]}
   */
  datosDelChoferNacional: datosDelChoferNacional[] =
    [] as datosDelChoferNacional[];
  municipios: any[] = [];
  colonias: any[] = [];
  paises: any[] = [];
  choferesExtranjero: any[] = [];
  choferes: any[] = [];
  formChoferes!: FormGroup;
  /**
   * Observable que contiene la lista de choferes nacionales.
   *
   * @type {Observable<any[]>}
   */
  choferesList$: Observable<any[]> = new Observable();

  /**
   * Observable que proporciona los datos del chofer nacional.
   *
   * @type {Observable<any[]>}
   */
  getdatosDelChoferNacional$: Observable<any[]> = new Observable();

  /**
   * Observable que proporciona la lista de choferes extranjeros.
   *
   * @type {Observable<any[]>}
   */
  getchoferesExtranjeros$: Observable<any[]> = new Observable();

  /**
   * Observable que contiene la lista de choferes extranjeros.
   *
   * @type {Observable<any[]>}
   */
  choferesextranjerosList$: Observable<any[]> = new Observable();

  /**
   * Observable utilizado para manejar la limpieza de recursos al destruir el componente.
   * Se emite un valor cuando el componente se destruye, completando todas las suscripciones activas.
   *
   * @type {ReplaySubject<boolean>}
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  isEditing: boolean = false;
  selectedRow: any;
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla.
   * Define el encabezado, la clave de acceso a los datos y el orden de las columnas.
   */
  tableColumns: ConfiguracionColumna<datosDelChoferNacional>[] = [
    {
      encabezado: 'CURP',
      clave: (item: datosDelChoferNacional) => item.curp,
      orden: 1,
    },
    {
      encabezado: 'RFC',
      clave: (item: datosDelChoferNacional) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'Número',
      clave: (item: datosDelChoferNacional) => item.nombre,
      orden: 3,
    },
    {
      encabezado: 'País',
      clave: (item: datosDelChoferNacional) => item.pais,
      orden: 4,
    },
    {
      encabezado: 'Apellido Paterno',
      clave: (item: datosDelChoferNacional) => item.apellidoPaterno,
      orden: 5,
    },
    {
      encabezado: 'Apellido Materno',
      clave: (item: datosDelChoferNacional) => item.apellidoMaterno,
      orden: 6,
    },
    {
      encabezado: 'RFC',
      clave: (item: datosDelChoferNacional) => item.rfc,
      orden: 7,
    },
    {
      encabezado: 'Gafete',
      clave: (item: datosDelChoferNacional) => item.gafete,
      orden: 8,
    },
    {
      encabezado: 'Vigencia Gafete',
      clave: (item: datosDelChoferNacional) => item.vigenciaGafete,
      orden: 9,
    },
    {
      encabezado: 'Municipio o Alcaldía',
      clave: (item: datosDelChoferNacional) => item.municipio,
      orden: 10,
    },
    {
      encabezado: 'Colonia',
      clave: (item: datosDelChoferNacional) => item.colonia,
      orden: 11,
    },
    {
      encabezado: 'País de Origen',
      clave: (item: datosDelChoferNacional) => item.paisOrigen,
      orden: 12,
    },
    {
      encabezado: 'Ciudad',
      clave: (item: datosDelChoferNacional) => item.ciudad,
      orden: 13,
    },
  ];

  choferesextranjeros: ConfiguracionColumna<choferesExtranjeros>[] = [
    {
      encabezado: 'Número del seguro social',
      clave: (item: choferesExtranjeros) => item.númeroDelSeguroSocial,
      orden: 1,
    },
    {
      encabezado: 'Número',
      clave: (item: choferesExtranjeros) => item.número,
      orden: 2,
    },
    {
      encabezado: 'Calle',
      clave: (item: choferesExtranjeros) => item.calle,
      orden: 3,
    },
    {
      encabezado: 'Número Exterior',
      clave: (item: choferesExtranjeros) => item.númeroExterior,
      orden: 4,
    },
    {
      encabezado: 'Número Interior',
      clave: (item: choferesExtranjeros) => item.númeroInterior,
      orden: 5,
    },
    {
      encabezado: 'País',
      clave: (item: choferesExtranjeros) => item.país,
      orden: 6,
    },
    {
      encabezado: 'Estado',
      clave: (item: choferesExtranjeros) => item.estado,
      orden: 7,
    },
    {
      encabezado: 'Primer Apellido',
      clave: (item: choferesExtranjeros) => item.primerApellido,
      orden: 8,
    },
    {
      encabezado: 'Segundo Apellido',
      clave: (item: choferesExtranjeros) => item.segundoApellido,
      orden: 9,
    },
    {
      encabezado: 'RFC',
      clave: (item: choferesExtranjeros) => item.rfc,
      orden: 10,
    },
    {
      encabezado: 'Número de gafete del chofer',
      clave: (item: choferesExtranjeros) => item.númeroDeGafete,
      orden: 11,
    },
    {
      encabezado: 'Fecha fin de Vigencia Gafete',
      clave: (item: choferesExtranjeros) => item.fechaFindDeVigencia,
      orden: 12,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: choferesExtranjeros) => item.municipioAlcaldía,
      orden: 13,
    },
    {
      encabezado: 'Colonia',
      clave: (item: choferesExtranjeros) => item.colonia,
      orden: 14,
    },
    {
      encabezado: 'País de residencia',
      clave: (item: choferesExtranjeros) => item.PaísDeResidencia,
      orden: 15,
    },
    {
      encabezado: 'Ciudad',
      clave: (item: choferesExtranjeros) => item.ciudad,
      orden: 16,
    },
  ];
  /**
   * Lista de pagos de derechos asociados a la solicitud.
   * Se inicializa como un array vacío con la estructura de `datosDelChoferNacional`.
   */

  @ViewChild('modalRef', { static: false }) modalRef!: ElementRef;
  /**
   * Catálogo de datos que se recibe como entrada desde el componente padre.
   *
   * @type {Catalogo[]}
   */
  @Input() catalogo: Catalogo[] = [];

  /**
   * Lista de países de origen para choferes nacionales.
   *
   * @type {Catalogo[]}
   */
  public paisOrigenCHN!: Catalogo[];

  /**
   * Lista de delegaciones para choferes nacionales.
   *
   * @type {Catalogo[]}
   */
  public delegacionCHN!: Catalogo[];

  /**
   * Lista de estados disponibles.
   *
   * @type {Catalogo[]}
   */
  public estado!: Catalogo[];

  /**
   * Lista de colonias para choferes nacionales.
   *
   * @type {Catalogo[]}
   */
  public coloniaCHN!: Catalogo[];

  /**
   * Lista de nacionalidades para choferes extranjeros.
   *
   * @type {Catalogo[]}
   */
  public nacionalidadCHE!: Catalogo[];

  /**
   * Lista de países para choferes nacionales.
   *
   * @type {Catalogo[]}
   */
  public paisChn!: Catalogo[];

  /**
   * @property {any[]} facturasDisponible - Array de datos de facturas disponibles.
   */
  facturasDisponible: datosDelChoferNacional[] = [];
  ConfiguracionColumna!: ConfiguracionColumna<datosDelChoferNacional>[];
  /**
   * @property {any[]} facturasAsociadas - Array de datos de facturas asociadas.
   */
  facturasAsociadas: choferesExtranjeros[] = [];

  /**
   * Establece la pestaña activa.
   * @param tab La pestaña que se establecerá como activa.
   */
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private chofer40103Store: Chofer40103Store,
    private chofer40103Service: Chofer40103Service,
    private chofer40103Query: Chofer40103Query,
    private cdRef: ChangeDetectorRef
  ) {
    // Initialization logic can be added here if needed
  }
  /**
   * Inicializa el formulario para chofer nacional.
   */
  chofernacionalForm(): void {
    this.formChoferes = this.fb.group({
      curp: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^[A-Z]{4}\d{6}[HM]{1}[A-Z]{5}[0-9A-Z]{2}$/), // CURP regex
        ],
      ],
      rfc: ['', [Validators.required, Validators.maxLength(13)]],
      nombre: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(20)],
      ],
      apellidoPaterno: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(120)],
      ],
      apellidoMaternoCHN: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(120)],
      ],

      gafete: [{ value: '', disabled: true }, [Validators.maxLength(24)]],
      vigenciagafete: [
        { value: '', disabled: true },
        [Validators.maxLength(10)],
      ],
      calle: ['', [Validators.required, Validators.maxLength(100)]],
      numeroExterior: ['', [Validators.required, Validators.maxLength(55)]],
      numeroInterior: ['', [Validators.maxLength(55)]],
      ciudad: ['', [Validators.required, Validators.maxLength(20)]],
      localidad: ['', [Validators.required, Validators.maxLength(120)]],
      codigoPostal: ['', [Validators.required, Validators.maxLength(12)]],

      paisChn: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      numerodelsegurosocial: ['', [Validators.required]],
      entidadFederativaCHN: ['', [Validators.required]],
      delegacionCHN: ['', [Validators.required]],
      coloniaCHN: ['', [Validators.required]],
      paisOrigenCHN: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      apellidoMaternoCHE: ['', [Validators.required]],
      nacionalidadCHE: ['', [Validators.required]],
      nss: ['', [Validators.required]],
      ideFiscal: ['', [Validators.required]],
      paisCHE: ['', [Validators.required]],
      entidadFederativaCHE: ['', [Validators.required]],
      paisOrigenCHE: ['', [Validators.required]],
      apellidoPaternos: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
    });
  }
  /**
   * 
Gancho del ciclo de vida angular que se llama después de que se inicializan las propiedades enlazadas a datos.
   */

  ngOnInit(): void {
    this.getdatosDelChoferNacional$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        if (data && data.length > 0) {
          this.datosDelChoferNacional = data;
        }
      });

    this.choferesList$ = this.chofer40103Query.getChoferes$;
    this.choferesextranjerosList$ =
      this.chofer40103Query.getchoferesextranjero$;

    this.choferesList$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((_choferes: unknown) => {});

    this.choferesextranjerosList$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((_choferesextranjeros: unknown) => {});

    this.chofernacionalForm();
    this.loadStoredData();
    this.fetchChoferes();
    this.estado$ = this.chofer40103Store._select((state) => state.estado);

    ChoferesComponent.loadEstados();
    this.estadoSeleccion();
    this.setFormValues();
    this.paisEmisorData();
    this.delegacionChnData();
    this.coloniaChnData();
    this.nacionaliDadChe();
    this.recuperarDatos();
    this.estadoData();
    this.paisChnData();
    this.ConfiguracionColumna = this.tableColumns;
  }
  /**
   * Obtiene los controles de formulario del formulario choferes.
   */
  get getFormValues() {
    return this.formChoferes.controls;
  }
  /**
   * Abre el modal configurando su visibilidad.
   *
   * @returns {void}
   */
  abrirModal(): void {
    this.modal = 'show';
  }

  /**
   * Cierra el modal eliminando clases CSS y configurando su visibilidad.
   *
   * @returns {void}
   */
  cerrarModal(): void {
    if (this.modalRef) {
      this.modalRef.nativeElement.classList.remove('show');
      this.modalRef.nativeElement.style.display = 'none';
      document.body.classList.remove('modal-open');
      const BACK_DROP = document.querySelector('.modal-backdrop');
      if (BACK_DROP) {
        BACK_DROP.remove();
      }
    }
  }

  /**
   * Guarda los datos del formulario del chofer extranjero.
   */
  extranjeroGuardars(): void {
    if (
      !this.datosDelChoferNacional ||
      this.datosDelChoferNacional.length === 0
    ) {
      this.toastr.warning('No data to submit.');
      return;
    }

    const submittedData = this.datosDelChoferNacional.map((item) => ({
      ...item,
      clave: item?.calle || '',
      descripcion: item?.rfc || '',
    }));
    this.chofer40103Store.update((state) => {
      return {
        ...state,
        datosDelChoferNacional: [
          ...(state.datosDelChoferNacional || []),
          ...submittedData,
        ],
      };
    });

    this.toastr.success('Data submitted successfully!');
    this.datosDelChoferNacional = [];
  }

  /**
   * @method Guardar
   * @description
   * Guarda los datos del formulario de chofer nacional.
   * Valida el formulario, llama al servicio y muestra notificaciones.
   */
  Guardar(): void {
    if (this.formChoferes.invalid) {
      /* empty */
    }

    const NUEVO_MIEMBRO = this.formChoferes.getRawValue();

    if (!NUEVO_MIEMBRO || Object.keys(NUEVO_MIEMBRO).length === 0) {
      this.toastr.error('Invalid form data. Please try again.');
      return;
    }

    // Llamar al método de servicio para agregar el nuevo miembro
    this.chofer40103Service.addChofer(NUEVO_MIEMBRO);
    this.toastr.success('Chofer Nacional forms data added successfully');
    this.formChoferes.reset();
    this.cerrarModal();
    setTimeout(() => {
      if (this.modalRef) {
        this.modalRef.nativeElement.classList.remove('show');
        this.modalRef.nativeElement.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.getElementsByClassName('modal-backdrop')[0]?.remove();
      }
    });
  }

  /**
   * Carga datos almacenados desde el almacenamiento de la sesión.
   */

  loadStoredData(): void {
    const STORE_DATA = sessionStorage.getItem('nacionalData');
    this.nacional = STORE_DATA ? JSON.parse(STORE_DATA) : [];
  }

  /**
   * @method fetchChoferes
   * @description
   * Obtiene la lista de choferes nacionales desde el servicio.
   */
  fetchChoferes(): void {
    this.chofer40103Service.getChoferNacionalData().subscribe((response) => {
      this.choferes = response;
      this.municipios = response;
      this.colonias = response;
      this.paises = response;
    });
  }
  /**
   * Gancho de ciclo de vida angular que se llama después de que la vista del componente se haya inicializado por completo.
   */

  /**
   * Busca un chofer por CURP.
   * @param curp La CURP a buscar.
   */
  onCurpInput(): void {
    const CURP_VALUE = this.formChoferes.get('curp')?.value;
    if (CURP_VALUE && CURP_VALUE.length >= 18) {
      this.buscarChoferNacional(CURP_VALUE);
    }
  }
  buscarChoferNacional(curp: string): void {
    if (!curp) {
      return;
    }

    const CHOFER_DATA = {};

    // Rellenar el formulario
    this.formChoferes.patchValue(CHOFER_DATA);
  }
  /**
   * Actualiza los valores de los desplegables (listas desplegables) de municipios y colonias
   * basados en los datos del chofer proporcionados.
   *
   * @param choferData Objeto que contiene los datos del chofer, incluyendo las claves de estado y municipio.
   * @returns void
   */
  actualizarDesplegables(choferData: any): void {
    const ESTADO_CLAVE = choferData.datosGenerales.estados;
    const MUNICIPIO_CLAVE = choferData.datosGenerales.municipio;

    if (ESTADO_CLAVE) {
      this.loadMunicipios(ESTADO_CLAVE);
    }

    if (MUNICIPIO_CLAVE) {
      this.loadColonias(MUNICIPIO_CLAVE);
    }
  }

  /**
   * Método estático que simula la carga de los estados.
   * Retorna una promesa que se resuelve inmediatamente.
   *
   * @returns {Promise<void>} Una promesa de tipo void.
   */
  static loadEstados(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  /**
   * Carga la lista de municipios basados en la clave del estado proporcionada.
   *
   * @param {string} claveEstado - Clave del estado seleccionado. Si no se proporciona, el método no realiza ninguna acción.
   * @returns {void}
   */
  loadMunicipios(claveEstado: string): void {
    if (!claveEstado) {
      return;
    }
    this.chofer40103Service.getMunicipios(claveEstado).subscribe((data) => {
      this.municipios = data;
    });
  }

  /**
   * Carga la lista de colonias basadas en la clave del municipio proporcionada.
   *
   * @param {string} claveMunicipio - Clave del municipio seleccionado. Si no se proporciona, el método no realiza ninguna acción.
   * @returns {void}
   */
  loadColonias(claveMunicipio: string): void {
    if (!claveMunicipio) {
      return;
    }

    this.chofer40103Service.getColonias(claveMunicipio).subscribe((data) => {
      this.colonias = data;
    });
  }

  /**
   * Maneja el cambio de país en el formulario.
   * Si se selecciona un país, llama al método estático `loadEstados` para cargar los estados.
   *
   * @param {Event} event - Evento que contiene el valor del país seleccionado.
   * @returns {void}
   */
  static onPaisChange(event: Event): void {
    const PAIS = (event.target as HTMLSelectElement).value;
    if (PAIS) {
      ChoferesComponent.loadEstados();
    }
  }

  /**
   * Restablece el formato de choferes.
   */
  limpiarFormulario(): void {
    this.formChoferes.reset();
  }
  /**
   * Establece los valores del formulario de choferes utilizando datos simulados (`mockData`).
   *
   * @returns {void}
   */
  setFormValues(): void {
    if (mockData) {
      setTimeout(() => {
        this.formChoferes.patchValue({
          nombre: mockData.nombre || '',
          primerApellido: mockData.primerApellido || '',
          segundoApellido: mockData.segundoApellido || '',
        });
      });
    }
  }

  /**
   * Alterna la selección de una fila en la tabla de choferes y actualiza el formulario con los datos de la fila seleccionada.
   *
   * @param {any} row - Objeto que representa la fila seleccionada.
   * @returns {void}
   */
  toggleRowSelection(row: any): void {
    this.selectedRow = row;
    this.formChoferes.patchValue(row);
  }

  /**
   * Permite editar los datos de la fila seleccionada. Abre un modal para realizar la edición.
   *
   * @returns {void}
   */
  editarFilaSeleccionada(): void {
    if (this.selectedRow) {
      this.isEditing = true;
      this.formChoferes.patchValue(this.selectedRow);
      if (this.modalRef) {
        const MODEL = new Modal(this.modalRef.nativeElement);
        MODEL.show();
      }
    }
  }

  /**
   * Guarda los cambios realizados en la fila seleccionada y actualiza la lista de choferes.
   *
   * @returns {void}
   */
  guardarFilaEditada(): void {
    if (this.selectedRow) {
      const UPDATE_ROWS = { ...this.selectedRow, ...this.formChoferes.value };
      this.choferesList$ = this.choferesList$.pipe(
        map((choferes: any) => {
          return choferes.map((chofer: any) => {
            if ((chofer as any).id === (this.selectedRow as any).id) {
              return UPDATE_ROWS;
            }
            return chofer;
          });
        })
      );

      this.choferesList$.subscribe();

      this.isEditing = false;
      const MODEL = Modal.getInstance(this.modalRef.nativeElement);
      if (MODEL) {
        MODEL.hide();
      }
    }
  }

  /**
   * Recupera datos de choferes desde un archivo JSON utilizando el servicio `chofer40103Service`.
   *
   * @returns {void}
   */
  recuperarDatos(): void {
    this.chofer40103Service
      .obtenerTablaDatos<datosDelChoferNacional>('facturasDisponible.json')
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (response) => {
          this.datosDelChoferNacional = response;
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
        },
      });
  }

  /**
   * Actualiza el estado seleccionado en el store basado en los valores del formulario.
   *
   * @returns {void}
   */
  estadoSeleccion(): void {
    const ESTADO = this.formChoferes.get('estado')?.value;
    this.chofer40103Store.setEstado(ESTADO);
  }

  /**
   * Obtiene la lista de países emisores desde el servicio `chofer40103Service`.
   *
   * @returns {void}
   */
  paisEmisorData(): void {
    this.chofer40103Service.getPaisOrigenChn().subscribe((data) => {
      this.paisOrigenCHN = data;
    });
  }

  /**
   * Obtiene la lista de delegaciones desde el servicio `chofer40103Service`.
   *
   * @returns {void}
   */
  delegacionChnData(): void {
    this.chofer40103Service.getDelegacionChn().subscribe((data) => {
      this.delegacionCHN = data;
    });
  }

  /**
   * Obtiene la lista de estados desde el servicio `chofer40103Service` y la asigna a la propiedad `estado`.
   *
   * @returns {void}
   */
  estadoData(): void {
    this.chofer40103Service.getEstado().subscribe((data) => {
      this.estado = data;
    });
  }

  /**
   * Obtiene la lista de países emisores desde el servicio `chofer40103Service` y la asigna a la propiedad `paisChn`.
   *
   * @returns {void}
   */
  paisChnData(): void {
    this.chofer40103Service.getPaisEmisor().subscribe((data) => {
      this.paisChn = data;
    });
  }
  /**
   * Obtiene la lista de colonias desde el servicio `chofer40103Service`.
   *
   * @returns {void}
   */
  coloniaChnData(): void {
    this.chofer40103Service.getColoniaChn().subscribe((data) => {
      this.coloniaCHN = data;
    });
  }

  /**
   * Obtiene la lista de nacionalidades desde el servicio `chofer40103Service`.
   *
   * @returns {void}
   */
  nacionaliDadChe(): void {
    this.chofer40103Service.getNacionaliDadChe().subscribe((data) => {
      this.nacionalidadCHE = data;
    });
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa los observables y realiza limpieza de recursos.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
