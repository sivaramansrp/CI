/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
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
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Catalogo,
  extranjero,
} from 'libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { ChangeDetectorRef } from '@angular/core';
import { Chofer40101Query } from '../../estados/chofer40101.query';
import { Chofer40101Service } from '../../estados/chofer40101.service';
import { Chofer40101Store } from '../../estados/chofer40101.store';
import { Nacional } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { SharedModule } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import mockData from 'libs/shared/theme/assets/json/40103/director-general-mockdata.json';
@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    CatalogoSelectComponent,
    FormsModule,
  ],
})
export class ChoferesComponent implements OnInit {
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
  selectedAll: boolean = false;
  modal: string = 'modal';
  nacional: Array<Nacional> = [];
  extranjero: Array<extranjero> = [];
  activeTab: string = 'nacional';
  Choferesextranjeros: string = 'Choferes extranjeros';
  // estados: any[] = [];
  estado$!: Observable<Catalogo[]>;
  municipios: any[] = [];
  paisOrigenCHN: any[] = [];
  entidadFederativaCHN: any[] = [];
  colonias: any[] = [];
  paises: any[] = [];
  choferesextranjero: any[] = [];
  choferes: any[] = [];
  formChoferes!: FormGroup;
  choferesList$: Observable<any[]> = new Observable();
  choferesextranjerosList$: Observable<any[]> = new Observable();
  isEditing: boolean = false;
  selectedRow: any;
  @ViewChild('modalRef', { static: false }) modalRef!: ElementRef;
  @Input() catalogo: Catalogo[] = [];
  onEstadoChange: any;
  onMunicipioChange: any;
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
    private chofer40101Store: Chofer40101Store,
    private chofer40101Service: Chofer40101Service,
    private chofer40101Query: Chofer40101Query,
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
    this.choferesList$ = this.chofer40101Query.getChoferes$;
    this.choferesextranjerosList$ =
      this.chofer40101Query.getchoferesextranjero$;

    // eslint-disable-next-line no-empty-function
    this.choferesList$.subscribe((_choferes: unknown) => {});

    this.choferesextranjerosList$.subscribe(
      // eslint-disable-next-line no-empty-function
      (_choferesextranjeros: unknown) => {}
    );

    // Comprobar si la tienda tiene datos sincrónicamente
    this.chofernacionalForm();
    this.loadStoredData();
    this.fetchChoferes();
    this.estado$ = this.chofer40101Store._select((state) => state.estado);

    ChoferesComponent.loadEstados();
    this.estadoSeleccion();
    this.setFormValues();
  }
  /**
   * Obtiene los controles de formulario del formulario choferes.
   */
  get f() {
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
    } else {
      console.error('modalRef is undefined');
    }
  }

  /**
   * Guarda los datos del formulario del chofer extranjero.
   */

  extranjeroGuardar(): void {
    if (this.formChoferes.invalid) {
      /* empty */
    }
    const NUEVO_MIEMBRO = this.formChoferes.getRawValue();

    if (!NUEVO_MIEMBRO || Object.keys(NUEVO_MIEMBRO).length === 0) {
      this.toastr.error('Invalid form data. Please try again.');
      return;
    }
    // Utilice el servicio para agregar el nuevo registro a la lista de extranjeros
    this.chofer40101Service.addChofer(NUEVO_MIEMBRO, true);

    //Restablecer el formulario
    this.formChoferes.reset();
    this.toastr.success('Chofer extranjero added successfully');
    // cerrar el modal
    this.cerrarModal();

    // Obtener una lista actualizada para garantizar que la tabla se actualice
    this.choferesextranjerosList$ =
      this.chofer40101Query.getchoferesextranjero$;
  }

  /**
   * Guarda los datos del formulario de selección.
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
    this.chofer40101Service.addChofer(NUEVO_MIEMBRO);
    this.toastr.success('Chofer Nacional forms data added successfully');
    this.formChoferes.reset();
    this.cerrarModal();
    setTimeout(() => {
      if (this.modalRef) {
        this.modalRef.nativeElement.classList.remove('show');
        this.modalRef.nativeElement.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.getElementsByClassName('modal-backdrop')[0]?.remove();
      } else {
        console.error('modalRef is undefined');
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
   * Obtiene datos de los choferes del servicio.
   */
  fetchChoferes(): void {
    this.chofer40101Service.getChoferNacionalData().subscribe(
      (response) => {
        this.choferes = response;
        this.municipios = response;
        this.colonias = response;
        this.paises = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
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
      console.warn('CURP is empty!');
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

    // Asegúrese de que `estados` estén cargados antes de configurar `entidadFederativaCHN`
    ChoferesComponent.loadEstados().then(() => {
      this.formChoferes.patchValue({
        entidadFederativaCHN: CHOFER_DATA.entidadFederativaCHN,
      });
      this.onEstadoChange({
        target: { value: CHOFER_DATA.entidadFederativaCHN },
      } as unknown as Event).then(() => {
        setTimeout(() => {
          this.formChoferes.patchValue({
            delegacionCHN: CHOFER_DATA.delegacionCHN,
          });
          this.onMunicipioChange({
            target: { value: CHOFER_DATA.delegacionCHN },
          } as unknown as Event).then(() => {
            setTimeout(() => {
              this.formChoferes.patchValue({
                coloniaCHN: CHOFER_DATA.coloniaCHN,
              });
            }, 300);
          });
        }, 500);
      });
    });
  }

  updateDropdowns(choferData: any): void {
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
    this.chofer40101Service.getMunicipios(claveEstado).subscribe(
      (data) => {
        this.municipios = data;
      },
      (error) => {
        console.error('Error loading municipalities:', error);
      }
    );
  }

  loadColonias(claveMunicipio: string): void {
    if (!claveMunicipio) {
      return;
    }

    this.chofer40101Service.getColonias(claveMunicipio).subscribe(
      (data) => {
        this.colonias = data;
      },
      (error) => {
        console.error('Error loading colonies:', error);
      }
    );
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
      } else {
        console.error('modalRef is undefined');
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
  extranjeroGuardars(): void {
    if (this.selectedRow) {
      // Crea un nuevo objeto con los valores actualizados
      const UPDATE_ROWS = { ...this.selectedRow, ...this.formChoferes.value };

      // Actualizar la fuente de datos (choferesList$)
      this.choferesextranjerosList$ = this.choferesextranjerosList$.pipe(
        map((choferesextranjero: any) => {
          return choferesextranjero.map((choferesextranjero: any) => {
            if (
              (choferesextranjero as any).id === (this.selectedRow as any).id
            ) {
              return UPDATE_ROWS;
            }
            return choferesextranjero;
          });
        })
      );

      // Actualizar la mesa
      this.choferesextranjerosList$.subscribe();

      // cerrar el modal
      this.isEditing = false;
      const MODEL = Modal.getInstance(this.modalRef.nativeElement);
      if (MODEL) {
        MODEL.hide();
      }
    }
  }
  estadoSeleccion(): void {
    const ESTADO = this.formChoferes.get('estado')?.value;
    this.chofer40101Store.setEstado(ESTADO);
  }
}
