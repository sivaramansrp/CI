import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  Input,
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

import { SharedModule } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Nacional } from 'libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';


import {
  extranjero,
  Catalogo,
} from 'libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
// import { StoreService } from 'libs/shared/data-access-user/src/core/services/40101/store/store.service';
import { ChangeDetectorRef } from '@angular/core';
import {
  Chofer40101Store,
  Choferesnacionales40101State,
} from '../../estados/chofer40101.store';
import { Chofer40101Query } from '../../estados/chofer40101.query';
import { Chofer40101Service } from '../../estados/chofer40101.service';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
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
    FormsModule
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
    // private storeService: StoreService,
    private chofer40101Store: Chofer40101Store,
    private chofer40101Service: Chofer40101Service,
    private chofer40101Query: Chofer40101Query,
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
    
    this.choferesList$ = this.chofer40101Query.getChoferes$;
    this.choferesextranjerosList$ =
      this.chofer40101Query.getchoferesextranjero$;

    this.choferesList$.subscribe((choferes) => {
    });

    this.choferesextranjerosList$.subscribe((choferesextranjeros) => {
    });

    // Comprobar si la tienda tiene datos sincrónicamente
    this.chofernacionalForm();
    this.loadStoredData();
    this.fetchChoferes();
    this.estado$ = this.chofer40101Store._select((state) => state.estado);

    this.loadEstados();
    this.estadoSeleccion();
    this.setFormValues();
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
      this.toastr.error('Invalid form data. Please try again.');
      return;
    }
    // Utilice el servicio para agregar el nuevo registro a la lista de extranjeros
    this.chofer40101Service.addChofer(nuevoMiembro, true);

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
  Guardar() {

    if (this.formChoferes.invalid) {
    }

    const nuevoMiembro = this.formChoferes.getRawValue();

    if (!nuevoMiembro || Object.keys(nuevoMiembro).length === 0) {
      this.toastr.error('Invalid form data. Please try again.');
      return;
    }
    

    // Llamar al método de servicio para agregar el nuevo miembro
    this.chofer40101Service.addChofer(nuevoMiembro);
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
    if (!claveMunicipio) return;

    this.chofer40101Service.getColonias(claveMunicipio).subscribe(
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
  

  toggleRowSelection(row: any) {
    this.selectedRow = row;
    this.formChoferes.patchValue(row);
  }

  editarFilaSeleccionada() {
    if (this.selectedRow) {
      this.isEditing = true;
      this.formChoferes.patchValue(this.selectedRow);
      if (this.modalRef) {
        const modal = new Modal(this.modalRef.nativeElement);
        modal.show();
      } else {
        console.error('modalRef is undefined');
      }
    }
  }
  guardarFilaEditada() {
    if (this.selectedRow) {
      // Create a new object with the updated values
      const updatedRow = { ...this.selectedRow, ...this.formChoferes.value };
  
      // Update the data source (choferesList$)
      this.choferesList$ = this.choferesList$.pipe(
        map((choferes: any) => {
          return choferes.map((chofer: any) => {
            if (chofer.id === this.selectedRow.id) {
              return updatedRow;
            }
            return chofer;
          });
        })
      );
  
      // Refresh the table
      this.choferesList$.subscribe();
  
      // Close the modal
      this.isEditing = false;
      const modal = Modal.getInstance(this.modalRef.nativeElement);
      if (modal) {
        modal.hide();
      }
    }
  }
  extranjeroGuardars(){
    if (this.selectedRow) {
      // Create a new object with the updated values
      const updatedRow = { ...this.selectedRow, ...this.formChoferes.value };
  
      // Update the data source (choferesList$)
      this.choferesextranjerosList$ = this.choferesextranjerosList$.pipe(
        map((choferesextranjero: any) => {
          return choferesextranjero.map((choferesextranjero: any) => {
            if (choferesextranjero.id === this.selectedRow.id) {
              return updatedRow;
            }
            return choferesextranjero;
          });
        })
      );
  
      // Refresh the table
      this.choferesextranjerosList$.subscribe();
  
      // Close the modal
      this.isEditing = false;
      const modal = Modal.getInstance(this.modalRef.nativeElement);
      if (modal) {
        modal.hide();
      }
    }

  }
  estadoSeleccion(): void {
    const estado = this.formChoferes.get('estado')?.value;
    this.chofer40101Store.setEstado(estado);
  }
  eliminar() {
    // this.personas.splice(i, 1);
    //modal de confirmacion de elimincacion
  }

  
}
