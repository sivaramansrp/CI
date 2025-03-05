import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {
  FormControl,
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
import { Nacional } from 'libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { extranjero } from 'libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { LayoutChoferNacionalService } from 'libs/shared/data-access-user/src/core/services/40101/layout-chofer-nacional.service';
import { StoreService } from 'libs/shared/data-access-user/src/core/services/40101/store/store.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SharedModule],
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
  estados: any[] = [];
  municipios: any[] = [];
  paisOrigenCHN: any[] = [];
  entidadFederativaCHN: any[] = [];
  colonias: any[] = [];
  paises: any[] = [];
  choferes: any[] = [];
  formChoferes!: FormGroup;

  @ViewChild('modalRef', { static: false }) modalRef!: ElementRef;
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
    private layoutChoferNacionalService: LayoutChoferNacionalService,
    private storeService: StoreService,
    private cdRef: ChangeDetectorRef
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
    this.chofernacionalForm();
    this.loadStoredData();
    this.fetchChoferes();
    this.storeService.nacionalData$.subscribe((data) => {
      this.nacional = data;
    });
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
      this.modalRef.nativeElement.style.display = 'none';
    } else {
      console.error('modalRef is undefined');
    }
  }
  /**
   * Guarda los datos del formulario del chofer extranjero.
   */

  extranjeroGuardar() {
    if (this.formChoferes.invalid) {
      // this.toastr.error('Please fill out all required fields.');
      // return;
    }
    const nuevoMiembro = this.formChoferes.getRawValue();
    console.log('Form Values:', nuevoMiembro);
    if (!nuevoMiembro || Object.keys(nuevoMiembro).length === 0) {
      this.toastr.error('Invalid form data. Please try again.');
      return;
    }

    let storedData = sessionStorage.getItem('nacionalData');
    let nacionalArray = storedData ? JSON.parse(storedData) : [];
    nacionalArray.push(nuevoMiembro);
    sessionStorage.setItem('nacionalData', JSON.stringify(nacionalArray));
    this.nacional = [...nacionalArray];
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
* Guarda los datos del formulario de selección.
*/
  Guardar() {
    console.log('Adding a new member...');
    if (this.formChoferes.invalid) {
      // this.toastr.error('Please fill out all required fields.');
      // return;
    }
    const nuevoMiembro = this.formChoferes.getRawValue();
    console.log('Form Values:', nuevoMiembro);
    if (!nuevoMiembro || Object.keys(nuevoMiembro).length === 0) {
      this.toastr.error('Invalid form data. Please try again.');
      return;
    }

    let storedData = sessionStorage.getItem('nacionalData');
    let nacionalArray = storedData ? JSON.parse(storedData) : [];
    nacionalArray.push(nuevoMiembro);

    sessionStorage.setItem('nacionalData', JSON.stringify(nacionalArray));
    this.nacional = [...nacionalArray];

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
    this.layoutChoferNacionalService.getChoferNacionalData().subscribe(
      (response) => {
        this.choferes = response;
        this.estados = response;
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
  ngAfterViewInit() {
    console.log('modalRef:', this.modalRef);
  }

  /**
* Busca un chofer por CURP.
* @param curp La CURP a buscar.
*/
  buscarChoferNacional(curp: string | null | undefined) {
    console.log('Searching CURP:', curp);

    if (!curp) {
      alert('Por favor ingrese una CURP válida');
      return;
    }

    if (!Array.isArray(this.choferes) || this.choferes.length === 0) {
      alert('No hay choferes disponibles para buscar');
      return;
    }

    const choferEncontrado = this.choferes.find((chofer) => {
      try {
        if (!chofer.data || typeof chofer.data !== 'string') {
          console.warn('Invalid chofer data format:', chofer);
          return false;
        }

        const cleanedData = chofer.data.trim();
        const choferData = JSON.parse(cleanedData);

        if (!choferData?.datosGenerales?.curp) {
          console.warn('Missing CURP in choferData:', choferData);
          return false;
        }

        return (
          choferData.datosGenerales.curp.toLowerCase() === curp.toLowerCase()
        );
      } catch (error) {
        console.error(
          'Error parsing chofer data:',
          error,
          'Invalid Data:',
          chofer.data
        );
        return false;
      }
    });

    if (choferEncontrado) {
      try {
        const choferData = JSON.parse(choferEncontrado.data.trim());
        console.log('Chofer encontrado:', choferData);

        this.formChoferes.patchValue({
          nombre: choferData.datosGenerales.nombreRazonSocial || '',
          apellidoPaterno: choferData.datosGenerales.primerApellido || '',
          apellidoMaternoCHN: choferData.datosGenerales.segundoApellido || '',
          vigenciagafete: choferData.datosGenerales.actEconomica || '',
          gafete: choferData.datosGenerales.correo || '',
          entidadFederativaCHN: choferData.datosGenerales.estados || '',
          delegacionCHN: choferData.datosGenerales.municipio || '',
          coloniaCHN: choferData.datosGenerales.colonia || '',
          paisCHN: choferData.datosGenerales.paises || '',
        });

        this.updateDropdowns(choferData);
      } catch (error) {
        console.error('Error parsing found chofer data:', error);
      }
    } else {
      alert('Chofer no encontrado');
    }
  }
  /**
* Actualiza los menús desplegables con los datos del chofer.
* @param choferData Los datos del chofer con los que se actualizarán los menús desplegables.
*/

  updateDropdowns(choferData: any) {
    this.estados = [
      {
        clave: choferData.datosGenerales.entidadFederativa,
        descripcion: choferData.datosGenerales.entidadFederativaDesc,
      },
    ];
    this.municipios = [
      {
        clave: choferData.datosGenerales.municipio,
        descripcion: choferData.datosGenerales.municipioDesc,
      },
    ];
    this.colonias = [
      {
        clave: choferData.datosGenerales.colonia,
        descripcion: choferData.datosGenerales.coloniaDesc,
      },
    ];
  }

  onChanges(): void {
    this.formChoferes
      .get('solicitud.entidadFederativaCHN')
      ?.valueChanges.subscribe((valor) => {});

    this.formChoferes
      .get('solicitud.delegacionCHN')
      ?.valueChanges.subscribe((valor) => {});
  }

  loadEstados(): void {
    this.layoutChoferNacionalService.getChoferNacionalData().subscribe(
      (data) => {
        this.estados = data.estados; 
      },
      (error) => {
        console.error('Error loading states:', error);
      }
    );
  }

  loadMunicipios(claveEstado: string): void {
    this.layoutChoferNacionalService.getChoferNacionalData().subscribe(
      (data) => {
        this.municipios = data.municipios.filter(
          (m: any) => m.estadoClave === claveEstado
        );
      },
      (error) => {
        console.error('Error loading municipalities:', error);
      }
    );
  }
  loadColonias(claveMunicipio: string): void {
    this.layoutChoferNacionalService.getChoferNacionalData().subscribe(
      (data) => {
        this.colonias = data.colonias.filter(
          (c: any) => c.municipioClave === claveMunicipio
        );
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

  onEstadoChange(event: Event): void {
    const estado = (event.target as HTMLSelectElement).value;
    if (estado) {
      this.loadMunicipios(estado);
    } else {
      this.municipios = [];
      this.colonias = [];
    }
  }

  onMunicipioChange(event: Event): void {
    const municipio = (event.target as HTMLSelectElement).value;
    if (municipio) {
      this.loadColonias(municipio);
    } else {
      this.colonias = [];
    }
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
    // this.nacional.forEach(nacion => nacion.selected = this.selectedAll);
  }
}
