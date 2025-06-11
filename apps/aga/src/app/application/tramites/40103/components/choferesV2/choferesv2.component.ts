import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo, ConsultaioQuery, ConsultaioState, TituloComponent } from '@ng-mf/data-access-user';
import {
  Chofer40103Store,
  Choferesnacionales40103State,
} from '../../estados/chofer40103.store';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CHOFERES_PAGE } from '../../enum/transportista-terrestre.enum';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { ChangeDetectorRef } from '@angular/core';
import { Chofer40103Query } from '../../estados/chofer40103.query';
import { Chofer40103Service } from '../../estados/chofer40103.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { DatosDelChoferNacional } from '../../../40103/models/registro-muestras-mercancias.model';
import { Extranjero } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { HttpClient } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { Nacional } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { ReplaySubject } from 'rxjs';
import { SharedModule } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { choferesExtranjeros } from '../../../40103/models/registro-muestras-mercancias.model';
import { map } from 'rxjs/operators';
import mockData from '@libs/shared/theme/assets/json/40103/director-general-mockdata.json';
import { takeUntil } from 'rxjs';
import { ChofereNacionalComponent } from './chofere.nacional/chofere.nacional.component';
import { ChofereNacionalNotificationComponent } from './chofere.nacional.nofitication/chofere.nacional.notification.component';
import { ChofereNacionalModificacionComponent } from './chofere.nacional.modificacion/chofere.nacional.modificacion.component';
import { ChofereNacionalRetiradaComponent } from './chofere.nacional.retirada/chofere.nacional.retirada.component';

@Component({
  selector: 'app-choferes-v2',
  templateUrl: './choferesv2.component.html',
  styleUrls: ['./choferesv2.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    TituloComponent,
    ChofereNacionalComponent,
    ChofereNacionalNotificationComponent,
    ChofereNacionalModificacionComponent,
    ChofereNacionalRetiradaComponent
  ],
})
export class ChoferesV2Component implements OnInit, OnDestroy {
  CHOFERES_PAGE = CHOFERES_PAGE;
  modal: string = this.CHOFERES_PAGE.MODAL;
  nacional: Array<Nacional> = [];
  extranjero: Array<Extranjero> = [];
  activeTab: string = 'nacional';
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
   * @type {DatosDelChoferNacional[]}
   */

  /**
   * Estado de la solicitud.
   */
  public solicitud40103State!: Choferesnacionales40103State;

  DatosDelChoferNacional: DatosDelChoferNacional[] =
    [] as DatosDelChoferNacional[];
  municipios: unknown[] = [];
  colonias: unknown[] = [];
  paises: unknown[] = [];
  choferesExtranjero: unknown[] = [];
  choferes: unknown[] = [];
  formChoferes!: FormGroup;
  /**
   * Observable que contiene la lista de choferes nacionales.
   *
   * @type {Observable<unknown[]>}
   */
  choferesList$: Observable<unknown[]> = new Observable();

  /**
   * Observable que proporciona los datos del chofer nacional.
   *
   * @type {Observable<unknown[]>}
   */
  getDatosDelChoferNacional$: Observable<unknown[]> = new Observable();

  /**
   * Observable que proporciona la lista de choferes extranjeros.
   *
   * @type {Observable<unknown[]>}
   */
  getchoferesExtranjeros$: Observable<unknown[]> = new Observable();

  /**
   * Observable que contiene la lista de choferes extranjeros.
   *
   * @type {Observable<unknown[]>}
   */
  // choferesextranjerosList$: Observable<unknown[]> = new Observable();

  /**
   * Observable utilizado para manejar la limpieza de recursos al destruir el componente.
   * Se emite un valor cuando el componente se destruye, completando todas las suscripciones activas.
   *
   * @type {ReplaySubject<boolean>}
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  isEditing: boolean = false;
  selectedRow: unknown;
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;


  /**
   * Configuración de las columnas para la visualización de datos de choferes extranjeros.
   *
   * Cada objeto en el arreglo representa una columna con su encabezado, clave de acceso a los datos
   * y el orden en el que debe aparecer en la tabla.
   *
   * Propiedades de cada columna:
   * - `encabezado`: El título que se mostrará en la cabecera de la columna.
   * - `clave`: Una función que define cómo acceder al valor correspondiente en el objeto `choferesExtranjeros`.
   * - `orden`: La posición en la que la columna debe aparecer en la tabla.
   *
   * Campos incluidos:
   * 1. Número del seguro social
   * 2. Número
   * 3. Calle
   * 4. Número Exterior
   * 5. Número Interior
   * 6. País
   * 7. Estado
   * 8. Primer Apellido
   * 9. Segundo Apellido
   * 10. RFC
   * 11. Número de gafete del chofer
   * 12. Fecha fin de Vigencia Gafete
   * 13. Municipio o alcaldía
   * 14. Colonia
   * 15. País de residencia
   * 16. Ciudad
   */
  choferesextranjeros: ConfiguracionColumna<choferesExtranjeros>[] = [
    {
      encabezado: 'Número del seguro social',
      clave: (item: choferesExtranjeros) => item.numeroDelSeguroSocial,
      orden: 1,
    },
    {
      encabezado: 'Número',
      clave: (item: choferesExtranjeros) => item.numero,
      orden: 2,
    },
    {
      encabezado: 'Calle',
      clave: (item: choferesExtranjeros) => item.calle,
      orden: 3,
    },
    {
      encabezado: 'Número Exterior',
      clave: (item: choferesExtranjeros) => item.numeroExterior,
      orden: 4,
    },
    {
      encabezado: 'Número Interior',
      clave: (item: choferesExtranjeros) => item.numeroInterior,
      orden: 5,
    },
    {
      encabezado: 'País',
      clave: (item: choferesExtranjeros) => item.pais,
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
      clave: (item: choferesExtranjeros) => item.numeroDeGafete,
      orden: 11,
    },
    {
      encabezado: 'Fecha fin de Vigencia Gafete',
      clave: (item: choferesExtranjeros) => item.fechaFindDeVigencia,
      orden: 12,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: choferesExtranjeros) => item.municipioAlcaldia,
      orden: 13,
    },
    {
      encabezado: 'Colonia',
      clave: (item: choferesExtranjeros) => item.colonia,
      orden: 14,
    },
    {
      encabezado: 'País de residencia',
      clave: (item: choferesExtranjeros) => item.paisDeResidencia,
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
   * Se inicializa como un array vacío con la estructura de `DatosDelChoferNacional`.
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
  // public paisOrigenCHN!: Catalogo[];

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
   * @property {unknown[]} facturasDisponible - Array de datos de facturas disponibles.
   */
  facturasDisponible: DatosDelChoferNacional[] = [];
  ConfiguracionColumna!: ConfiguracionColumna<DatosDelChoferNacional>[];
  /**
   * @property {unknown[]} facturasAsociadas - Array de datos de facturas asociadas.
   */
  facturasAsociadas: choferesExtranjeros[] = [];

  datosConsulta!: ConsultaioState;

  /**
   * Establece la pestaña activa.
   * @param tab La pestaña que se establecerá como activa.
   */
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  /**
   * Observable para notificar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   * Contiene los datos relacionados con la modificación del trámite.
   */
  public derechoState: Choferesnacionales40103State =
    {} as Choferesnacionales40103State;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private chofer40103Store: Chofer40103Store,
    private chofer40103Service: Chofer40103Service,
    private chofer40103Query: Chofer40103Query,
    private consultaioQuery: ConsultaioQuery,
    private cdRef: ChangeDetectorRef
  ) {
    // Initialization logic can be added here if needed
  }

  /**
   * 
Gancho del ciclo de vida angular que se llama después de que se inicializan las propiedades enlazadas a datos.
   */
  ngOnInit(): void {
    this.solicitud40103State = this.chofer40103Query.getValue(); 
    this.chofer40103Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.derechoState = {
            ...this.derechoState,
            ...seccionState,
          };
        })
      )
      .subscribe();
    this.getDatosDelChoferNacional$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        if (data && data.length > 0) {
          this.DatosDelChoferNacional = data as DatosDelChoferNacional[];
        }
      });

    this.chofernacionalForm();
    this.loadStoredData();
    this.fetchChoferes();
    this.estado$ = this.chofer40103Store._select((state) => state.estado);

    ChoferesV2Component.loadEstados();
    this.estadoSeleccion();
    this.setFormValues();
    this.paisEmisorData();
    this.delegacionChnData();
    this.coloniaChnData();
    this.nacionaliDadChe();
    this.estadoData();
    this.paisChnData();
    // this.ConfiguracionColumna = this.tableColumns;

    this.consultaioQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        if (data) {
          this.datosConsulta = data;
          if(this.datosConsulta.readonly) {
            this.formChoferes.disable();

          }
        }
      });
  }

  /**
   * Inicializa el formulario para chofer nacional.
   */
  chofernacionalForm(): void {
    this.formChoferes = this.fb.group({
      curp: [
        this.solicitud40103State?.curp,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^[A-Z]{4}\d{6}[HM]{1}[A-Z]{5}[0-9A-Z]{2}$/), // CURP regex
        ],
      ],
      rfc: [
        this.solicitud40103State?.rfc,
        [Validators.required, Validators.maxLength(13)],
      ],
      nombre: [
        { value: this.solicitud40103State?.nombre, disabled: true },
        [Validators.required, Validators.maxLength(20)],
      ],
      apellidoPaterno: [
        { value: this.solicitud40103State?.apellidoPaterno, disabled: true },
        [Validators.required, Validators.maxLength(120)],
      ],
      apellidoMaternoCHN: [
        { value: this.solicitud40103State?.apellidoMaternoCHE, disabled: true },
        [Validators.required, Validators.maxLength(120)],
      ],

      gafete: [
        { value: this.solicitud40103State?.gafete, disabled: true },
        [Validators.maxLength(24)],
      ],
      vigenciagafete: [
        { value: this.solicitud40103State?.vigenciagafete, disabled: true },
        [Validators.maxLength(10)],
      ],
      calle: [
        this.solicitud40103State?.calle,
        [Validators.required, Validators.maxLength(100)],
      ],
      numeroExterior: [
        this.solicitud40103State?.numeroExterior,
        [Validators.required, Validators.maxLength(55)],
      ],
      numeroInterior: [
        this.solicitud40103State?.numeroInterior,
        [Validators.maxLength(55)],
      ],
      ciudad: [
        this.solicitud40103State?.ciudad,
        [Validators.required, Validators.maxLength(20)],
      ],
      localidad: [
        this.solicitud40103State?.localidad,
        [Validators.required, Validators.maxLength(120)],
      ],
      codigoPostal: [
        this.solicitud40103State?.codigoPostal,
        [Validators.required, Validators.maxLength(12)],
      ],

      paisChn: [this.solicitud40103State?.paisChn, [Validators.required]],
      estado: [this.solicitud40103State?.estado, [Validators.required]],
      numerodelsegurosocial: [
        this.solicitud40103State?.numerodelsegurosocial,
        [Validators.required],
      ],
      entidadFederativaCHN: [
        this.solicitud40103State?.entidadFederativaCHN,
        [Validators.required],
      ],
      delegacionCHN: [
        this.solicitud40103State?.delegacionCHN,
        [Validators.required],
      ],
      coloniaCHN: [this.solicitud40103State?.coloniaCHN, [Validators.required]],
      paisOrigenCHN: [
        this.solicitud40103State?.paisOrigenCHN,
        [Validators.required],
      ],
      correo: [this.solicitud40103State?.correo, [Validators.required]],
      telefono: [this.solicitud40103State?.telefono, [Validators.required]],
      apellidoMaternoCHE: [
        this.solicitud40103State?.apellidoMaternoCHE,
        [Validators.required],
      ],
      nacionalidadCHE: [
        this.solicitud40103State?.nacionalidadCHE,
        [Validators.required],
      ],
      nss: [this.solicitud40103State?.nss, [Validators.required]],
      ideFiscal: [this.solicitud40103State?.ideFiscal, [Validators.required]],
      paisCHE: [this.solicitud40103State?.paisCHE, [Validators.required]],
      entidadFederativaCHE: [
        this.solicitud40103State?.entidadFederativaCHE,
        [Validators.required],
      ],
      paisOrigenCHE: [
        this.solicitud40103State?.paisOrigenCHE,
        [Validators.required],
      ],
      apellidoPaternos: [
        this.solicitud40103State?.apellidoPaterno,
        [Validators.required],
      ],
      nombres: [this.solicitud40103State?.nombres, [Validators.required]],
    });
    console.log('Form choferes initialized:', this.formChoferes);
  }

  /**
   * Obtiene los controles de formulario del formulario choferes.
   */
  get getFormValues(): { [key: string]: AbstractControl } {
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
      !this.DatosDelChoferNacional ||
      this.DatosDelChoferNacional.length === 0
    ) {
      this.toastr.warning('No data to submit.');
      return;
    }

    const SUBMITTEDDATA = this.DatosDelChoferNacional.map((item) => ({
      ...item,
      clave: item?.calle || '',
      descripcion: item?.rfc || '',
    }));
    this.chofer40103Store.update((state) => {
      return {
        ...state,
        DatosDelChoferNacional: [
          ...(state.datosDelChoferNacional || []),
          ...SUBMITTEDDATA,
        ],
      };
    });

    this.toastr.success('Data submitted successfully!');
    this.DatosDelChoferNacional = [];
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
    // this.chofer40103Service
    //   .getChoferNacionalData()
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe((response) => {
    //     this.choferes = response;
    //     this.municipios = response;
    //     this.colonias = response;
    //     this.paises = response;
    //   });
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

  /**
   * Busca información de un chofer nacional utilizando su CURP.
   *
   * @param curp - La CURP del chofer nacional que se desea buscar.
   *               Si no se proporciona un valor, la función no realiza ninguna acción.
   *
   * @remarks
   * Esta función actualiza el formulario de choferes con los datos obtenidos.
   * Actualmente, los datos están representados por un objeto vacío.
   */
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
  actualizarDesplegables(choferData: unknown): void {
    const ESTADO_CLAVE = (choferData as { datosGenerales: { estados: string } })
      .datosGenerales.estados;
    const MUNICIPIO_CLAVE = (
      choferData as { datosGenerales: { municipio: string } }
    ).datosGenerales.municipio;

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
    this.chofer40103Service
      .getMunicipios(claveEstado)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
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

    this.chofer40103Service
      .getColonias(claveMunicipio)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
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
      ChoferesV2Component.loadEstados();
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
    // if (mockData) {
    //   setTimeout(() => {
    //     this.formChoferes.patchValue({
    //       nombre: mockData.nombre || '',
    //       primerApellido: mockData.primerApellido || '',
    //       segundoApellido: mockData.segundoApellido || '',
    //     });
    //   });
    // }
    const DATA = this.chofer40103Store.getValue();
    this.formChoferes.patchValue({
      curp: DATA.curp || '',
      rfc: DATA.rfc || '',
      nombre: DATA.nombre || '',
      apellidoPaterno: DATA.apellidoPaterno || '',
      segundoApellido: DATA.segundoApellido || '',
    });
    this.DatosDelChoferNacional = this.chofer40103Store.getValue().datosDelChoferNacional;
  }

  /**
   * Alterna la selección de una fila en la tabla de choferes y actualiza el formulario con los datos de la fila seleccionada.
   *
   * @param {unknown} row - Objeto que representa la fila seleccionada.
   * @returns {void}
   */
  toggleRowSelection(row: unknown): void {
    this.selectedRow = row;
    this.formChoferes.patchValue(row as { [key: string]: unknown });
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

  addNewRow() {
    this.selectedRow = {};
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
        map((choferes: unknown) => {
          return (choferes as DatosDelChoferNacional[]).map(
            (chofer: DatosDelChoferNacional) => {
              if (
                (chofer as DatosDelChoferNacional).id ===
                (this.selectedRow as DatosDelChoferNacional).id
              ) {
                return UPDATE_ROWS;
              }
              return chofer;
            }
          );
        })
      );

      this.choferesList$.pipe(takeUntil(this.destroyed$)).subscribe();

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
      .obtenerTablaDatos<DatosDelChoferNacional>('facturasDisponible.json')
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (response) => {
          this.DatosDelChoferNacional = response;
        }
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
    // this.chofer40103Service
    //   .getPaisOrigenChn()
    //   .pipe(
    //     takeUntil(this.destroyed$),
    //     map<Catalogo[], void>((data, i) => {
    //       this.paisOrigenCHN = data;
    //     })
    //   )
    //   .subscribe();
  }

  /**
   * Obtiene la lista de delegaciones desde el servicio `chofer40103Service`.
   *
   * @returns {void}
   */
  delegacionChnData(): void {
    this.chofer40103Service
      .getDelegacionChn()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.delegacionCHN = data;
      });
  }

  /**
   * Obtiene la lista de estados desde el servicio `chofer40103Service` y la asigna a la propiedad `estado`.
   *
   * @returns {void}
   */
  estadoData(): void {
    // this.chofer40103Service
    //   .getEstado()
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe((data) => {
    //     this.estado = data;
    //   });
  }

  /**
   * Obtiene la lista de países emisores desde el servicio `chofer40103Service` y la asigna a la propiedad `paisChn`.
   *
   * @returns {void}
   */
  paisChnData(): void {
    this.chofer40103Service
      .getPaisEmisor()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.paisChn = data;
      });
  }
  /**
   * Obtiene la lista de colonias desde el servicio `chofer40103Service`.
   *
   * @returns {void}
   */
  coloniaChnData(): void {
    this.chofer40103Service
      .getColoniaChn()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.coloniaCHN = data;
      });
  }

  /**
   * Obtiene la lista de nacionalidades desde el servicio `chofer40103Service`.
   *
   * @returns {void}
   */
  nacionaliDadChe(): void {
    this.chofer40103Service
      .getNacionaliDadChe()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
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

  /**
   * Establecer valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Chofer40103Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.chofer40103Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }
}
