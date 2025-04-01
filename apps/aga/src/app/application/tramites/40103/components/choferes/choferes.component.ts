/* eslint-disable @typescript-eslint/naming-convention */

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

import { HttpClient } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { Nacional } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import {
  choferesExtranjeros,
  datosDelChoferNacional,
} from '../../../40103/models/registro-muestras-mercancias.model';
import { SharedModule } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { choferesEnum } from '../constantes/choferes.enum';
import { extranjero } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { map, take } from 'rxjs/operators';
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
  solicitudTituloChoferExtranjero: string = 'Datos del chofer extranjero';
  labelSolicitudPersonaNombre: string = 'Nombre';
  labelSolicitudPersonaPrimerApellido: string = 'Primer Apellido ';
  labelSolicitudPersonaSegundoApellido: string = 'Segundo Apellido';
  labelNacionalidad: string = 'Nacionalidad';
  labelSolicitudChoferExtGafete: string = 'Numero de gafete del chofer';
  labelSolicitudChoferExtVigenciaGafete: string = 'Vigencia del Gafete';
  labelSolicitudChoferExtNss: string = 'Número de Seguro Social (NSS)';
  labelSolicitudChoferExtIdeFiscal: string = 'Número de Identificación Fiscal';
  tooltipIdentificacionFiscal: string =
    'Número de identificación fiscal en el país de residencia';
  solicitudTituloDomicilioFiscal: string = 'Domicilio Fiscal';
  labelPais: string = 'País';
  labelSolicitudDomicilioCodigoPostal: string = 'Código Postal';
  labelEntidadFederativa: string = 'Estado';
  labelSolicitudDomicilioCalle: string = 'Calle';
  labelSolicitudDomicilioNumeroExterior: string = 'Número exterior';
  labelSolicitudDomicilioNumeroInterior: string = 'Número interior';
  labelPaisOrigen: string = 'País de residencia';
  labelSolicitudDomicilioCiudad: string = 'Ciudad';
  labelSolicitudCorreo: string = 'Correo electrónico';
  labelSolicitudTelefono: string = 'Teléfono';
  camposObligatorios: string = '* Campos obligatorios';
  botonBuscar: string = 'Buscar';
  botonLimpiar: string = 'Limpiar';
  botonCancelar: string = 'Cancelar';
  botonGuardar: string = 'Guardar';
  seleccionaUnValor: string = 'Selecciona un valor';
  labelPuntos: string = '...';
  seleccionadosTodos: boolean = false;
  modal: string = 'modal';
  nacional: Array<Nacional> = [];
  extranjero: Array<extranjero> = [];
  activeTab: string = 'nacional';
  Choferesextranjeros: string = 'Choferes extranjeros';
  estado$!: Observable<Catalogo[]>;
  entidadFederativaCHN: Catalogo[] = [];
  datosDelChoferNacional: datosDelChoferNacional[] =
    [] as datosDelChoferNacional[];
  municipios: any[] = [];
  colonias: any[] = [];
  paises: any[] = [];
  choferesExtranjero: any[] = [];
  choferes: any[] = [];
  formChoferes!: FormGroup;
  choferesList$: Observable<any[]> = new Observable();
  getdatosDelChoferNacional$: Observable<any[]> = new Observable();
  getchoferesExtranjeros$: Observable<any[]> = new Observable();
  choferesextranjerosList$: Observable<any[]> = new Observable();
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
  @Input() catalogo: Catalogo[] = [];
  public paisOrigenCHN!: Catalogo[];
  public delegacionCHN!: Catalogo[];
  public coloniaCHN!: Catalogo[];
  public nacionalidadCHE!: Catalogo[];

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
    // private storeService: StoreService,
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

      paisCHN: ['', [Validators.required]],
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
    this.ConfiguracionColumna = this.tableColumns;
  }
  /**
   * Obtiene los controles de formulario del formulario choferes.
   */
  get getFormValues() {
    return this.formChoferes.controls;
  }
  abrirModal(): void {
    this.modal = 'show';
  }
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

    const CHOFER_DATA = {
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaternoCHN: 'González',
      rfc: 'JUAN890123ABC',
      gafete: '123456',
      vigenciagafete: '2025-12-31',
      calle: 'Av. Reforma',
      numeroExterior: '123',
      numeroInterior: 'A1',
      paisCHN: 'MEX',
      entidadFederativaCHN: 'CDMX',
      delegacionCHN: 'Benito Juárez',
      coloniaCHN: 'Nápoles',
    };

    // Rellenar el formulario
    this.formChoferes.patchValue(CHOFER_DATA);
  }

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

  static loadEstados(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  loadMunicipios(claveEstado: string): void {
    if (!claveEstado) {
      return;
    }
    this.chofer40103Service.getMunicipios(claveEstado).subscribe((data) => {
      this.municipios = data;
    });
  }

  loadColonias(claveMunicipio: string): void {
    if (!claveMunicipio) {
      return;
    }

    this.chofer40103Service.getColonias(claveMunicipio).subscribe((data) => {
      this.colonias = data;
    });
  }
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
  toggleRowSelection(row: any): void {
    this.selectedRow = row;
    this.formChoferes.patchValue(row);
  }

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
  guardarFilaEditada(): void {
    if (this.selectedRow) {
      // Create a new object with the updated values
      const UPDATE_ROWS = { ...this.selectedRow, ...this.formChoferes.value };

      // Update the data source (choferesList$)
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

      //Actualizar la mesa
      this.choferesList$.subscribe();

      //cerrar el modal
      this.isEditing = false;
      const MODEL = Modal.getInstance(this.modalRef.nativeElement);
      if (MODEL) {
        MODEL.hide();
      }
    }
  }

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

  estadoSeleccion(): void {
    const ESTADO = this.formChoferes.get('estado')?.value;
    this.chofer40103Store.setEstado(ESTADO);
  }

  paisEmisorData(): void {
    this.chofer40103Service.getPaisOrigenChn().subscribe((data) => {
      this.paisOrigenCHN = data;
    });
  }
  delegacionChnData(): void {
    this.chofer40103Service.getDelegacionChn().subscribe((data) => {
      this.delegacionCHN = data;
    });
  }

  coloniaChnData(): void {
    this.chofer40103Service.getColoniaChn().subscribe((data) => {
      this.coloniaCHN = data;
    });
  }
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
