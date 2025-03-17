import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Nacional } from 'libs/shared/data-access-user/src/core/models/40102/transportista-terrestre.model';
import {
  extranjero,
  Catalogo,
} from 'libs/shared/data-access-user/src/core/models/40102/transportista-terrestre.model';
import { StoreService } from 'libs/shared/data-access-user/src/core/services/40102/store/store.service';
import { ChangeDetectorRef } from '@angular/core';
import {
  Chofer40102Store,
  Choferesnacionales40102State,
} from '../../estados/tramite40102.store';
import { Chofer40102Query } from '../../estados/tramite40102.query';
import { Chofer40102Service } from '../../estados/tramite40102.service';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

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
  @ViewChild('modalRef', { static: false }) modalRef!: ElementRef;
  @Input() catalogo: Catalogo[] = [];
  /**
   * Establece la pestaña activa.
   * @param tab La pestaña que se establecerá como activa.
   */
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private storeService: StoreService,
    private chofer40102Store: Chofer40102Store,
    private chofer40102Service: Chofer40102Service,
    private chofer40102Query: Chofer40102Query,
    private cdRef: ChangeDetectorRef,
    private catalogosService: CatalogosService
  ) {}
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
    this.choferesList$ = this.chofer40102Query.getChoferes$;
    this.choferesextranjerosList$ =
      this.chofer40102Query.getchoferesextranjero$;

    // Comprobar si la tienda tiene datos sincrónicamente
    this.chofernacionalForm();
    this.loadStoredData();
    this.fetchChoferes();
    this.storeService.nacionalData$.subscribe((data) => {
      this.nacional = data;
    });
    this.estado$ = this.chofer40102Store._select((state) => state.estado);

    this.loadEstados();
    this.estadoSeleccion();
  }
  /**
   * Obtiene los controles de formulario del formulario choferes.
   */
  get f() {
    return this.formChoferes.controls;
  }
  abrirModal() {
    this.modal = 'show';
  }
  cerrarModal() {
    if (this.modalRef) {
      this.modalRef.nativeElement.classList.remove('show');
      this.modalRef.nativeElement.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    } else {
      console.error('modalRef is undefined');
    }
  }

  /**
   * Guarda los datos del formulario del chofer extranjero.
   */

  extranjeroGuardar() {
    if (this.formChoferes.invalid) {
    }
    const nuevoMiembro = this.formChoferes.getRawValue();

    if (!nuevoMiembro || Object.keys(nuevoMiembro).length === 0) {
      this.toastr.error(
        'Datos del formulario no válidos. Por favor inténtalo de nuevo.'
      );
      return;
    }
    // Utilice el servicio para agregar el nuevo registro a la lista de extranjeros
    this.chofer40102Service.addChofer(nuevoMiembro, true);

    //Restablecer el formulario
    this.formChoferes.reset();
    this.toastr.success('Chofer extranjero agregado exitosamente');
    // cerrar el modal
    this.cerrarModal();

    // Obtener una lista actualizada para garantizar que la tabla se actualice
    this.choferesextranjerosList$ =
      this.chofer40102Query.getchoferesextranjero$;
  }

  /**
   * Guarda los datos del formulario de selección.
   */
  Guardar() {
    if (this.formChoferes.invalid) {
    }

    const nuevoMiembro = this.formChoferes.getRawValue();
    if (!nuevoMiembro || Object.keys(nuevoMiembro).length === 0) {
      this.toastr.error(
        'Datos del formulario no válidos. Por favor inténtalo de nuevo.'
      );
      return;
    }

    // Llamar al método de servicio para agregar el nuevo miembro
    this.chofer40102Service.addChofer(nuevoMiembro);
    this.toastr.success(
      'Datos de formularios del Chofer Nacional agregados exitosamente'
    );
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

  agregarMiembro() {}
  /**
   * Carga datos almacenados desde el almacenamiento de la sesión.
   */

  loadStoredData() {
    let storedData = sessionStorage.getItem('nacionalData');
    this.nacional = storedData ? JSON.parse(storedData) : [];
  }
  closeDialogoCaptura() {}
  agregarChoferNacional() {}
  /**
   * Obtiene datos de los choferes del servicio.
   */
  fetchChoferes(): void {
    this.chofer40102Service.getChoferNacionalData().subscribe(
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
  ngAfterViewInit() {}

  /**
   * Busca un chofer por CURP.
   * @param curp La CURP a buscar.
   */
  onCurpInput() {
    const curpValue = this.formChoferes.get('curp')?.value;
    if (curpValue && curpValue.length >= 18) {
      this.buscarChoferNacional(curpValue);
    }
  }
  buscarChoferNacional(curp: string) {
    if (!curp) {
      console.warn('CURP is empty!');
      return;
    }

    const choferData = {
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
    this.formChoferes.patchValue(choferData);

    // Asegúrese de que `estados` estén cargados antes de configurar `entidadFederativaCHN`
    this.loadEstados().then(() => {
      this.formChoferes.patchValue({
        entidadFederativaCHN: choferData.entidadFederativaCHN,
      });
      this.onEstadoChange({
        target: { value: choferData.entidadFederativaCHN },
      } as unknown as Event).then(() => {
        setTimeout(() => {
          this.formChoferes.patchValue({
            delegacionCHN: choferData.delegacionCHN,
          });
          this.onMunicipioChange({
            target: { value: choferData.delegacionCHN },
          } as unknown as Event).then(() => {
            setTimeout(() => {
              this.formChoferes.patchValue({
                coloniaCHN: choferData.coloniaCHN,
              });
            }, 300);
          });
        }, 500);
      });
    });
  }

  updateDropdowns(choferData: any) {
    const estadoClave = choferData.datosGenerales.estados;
    const municipioClave = choferData.datosGenerales.municipio;

    if (estadoClave) {
      this.loadMunicipios(estadoClave);
    }

    if (municipioClave) {
      this.loadColonias(municipioClave);
    }
  }

  onChanges(): void {
    this.formChoferes
      .get('formChoferes.entidadFederativaCHN')
      ?.valueChanges.subscribe((valor) => {});

    this.formChoferes
      .get('formChoferes.delegacionCHN')
      ?.valueChanges.subscribe((valor) => {});
  }
  loadEstados(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  loadMunicipios(claveEstado: string): void {
    if (!claveEstado) return;
    this.chofer40102Service.getMunicipios(claveEstado).subscribe(
      (data) => {
        this.municipios = data;
      },
      (error) => {
        console.error('Error loading municipalities:', error);
      }
    );
  }

  loadColonias(claveMunicipio: string): void {
    if (!claveMunicipio) return;

    this.chofer40102Service.getColonias(claveMunicipio).subscribe(
      (data) => {
        this.colonias = data;
      },
      (error) => {
        console.error('Error loading colonies:', error);
      }
    );
  }
  onPaisChange(event: Event): void {
    const pais = (event.target as HTMLSelectElement).value;
    if (pais) {
      this.loadEstados();
    }
  }

  onEstadoChange(event: Event): Promise<void> {
    return new Promise((resolve) => {
      const selectedEstado = (event.target as HTMLSelectElement).value;

      resolve();
    });
  }

  onMunicipioChange(event: Event): Promise<void> {
    return new Promise((resolve) => {
      const selectedMunicipio = (event.target as HTMLSelectElement).value;

      resolve();
    });
  }

  /**
   * Restablece el formato de choferes.
   */
  limpiarFormulario() {
    this.formChoferes.reset();
  }
  buscarChoferEx() {}

  toggleAll(event: any) {
    this.selectedAll = event.target.checked;
  }
  estadoSeleccion(): void {
    const estado = this.formChoferes.get('estado')?.value;
    this.chofer40102Store.setEstado(estado);
  }
}
