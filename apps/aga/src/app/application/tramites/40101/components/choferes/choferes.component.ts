import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CHOFERES_PAGE } from '../enum/transportista-terrestre.enum';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Extranjero } from '@libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { HttpClient } from '@angular/common/http';
import { Nacional } from '@libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { SharedModule } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { Tramite40101Query } from '../../estado/tramite40101.query';
import { Tramite40101Service } from '../../estado/tramite40101.service';
import { Tramite40101State } from '../../estado/tramite40101.store';
import { Tramite40101Store } from '../../estado/tramite40101.store';
import { takeUntil } from 'rxjs';

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
  selectedAll: boolean = false;
  modal: string = CHOFERES_PAGE.MODAL;
  nacional: Array<Nacional> = [];
  extranjero: Array<Extranjero> = [];
  activeTab: string = CHOFERES_PAGE.ACTIVETAB;
  Choferesextranjeros: string = CHOFERES_PAGE.CHOFERES_EXTRANJEROS;
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
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  @ViewChild('modalRef', { static: false }) modalRef!: ElementRef;
  @Input() catalogo: Catalogo[] = [];
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
    private tramite40101Store: Tramite40101Store,
    private tramite40101Service: Tramite40101Service,
    private tramite40101Query: Tramite40101Query,
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
    this.choferesList$ = this.tramite40101Query.getChoferes$;
    this.choferesextranjerosList$ =
      this.tramite40101Query.getchoferesextranjero$;

    // Comprobar si la tienda tiene datos sincrónicamente
    this.chofernacionalForm();
    this.loadStoredData();
    this.fetchChoferes();
    this.estado$ = this.tramite40101Store._select((state) => state.estado);
    this.loadEstados();
    this.estadoSeleccion();
  }
  /**
   * Obtiene los controles de formulario del formulario choferes.
   */
  get getFormValues() {
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
      const back_Drop = document.querySelector('.modal-backdrop');
      if (back_Drop) {
        back_Drop.remove();
      }
    } else {
      this.toastr.error('modalRef no está definida');
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
    this.tramite40101Service.addChofer(nuevoMiembro, true);

    //Restablecer el formulario
    this.formChoferes.reset();
    this.toastr.success('Chofer extranjero agregado exitosamente');
    // cerrar el modal
    this.cerrarModal();

    // Obtener una lista actualizada para garantizar que la tabla se actualice
    this.choferesextranjerosList$ =
      this.tramite40101Query.getchoferesextranjero$;
  }

  /**
   * Guarda los datos del formulario de selección.
   */
  Guardar(): void {
    localStorage.clear();
    const nuevoMiembro = this.formChoferes.getRawValue();
    if (!nuevoMiembro || Object.keys(nuevoMiembro).length === 0) {
      this.toastr.error(
        'Datos del formulario no válidos. Por favor inténtalo de nuevo.'
      );
      return;
    }

    // Llamar al método de servicio para agregar el nuevo miembro
    this.tramite40101Service.addChofer(nuevoMiembro);
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
        this.toastr.error('modalRef no está definida');
      }
    });
  }

  /**
   * Carga datos almacenados desde el almacenamiento de la sesión.
   */

  loadStoredData(): void {
    let STORED_DATA = sessionStorage.getItem('nacionalData');
    this.nacional = STORED_DATA ? JSON.parse(STORED_DATA) : [];
  }
  /**
   * Obtiene datos de los choferes del servicio.
   */
  fetchChoferes(): void {
    this.tramite40101Service
      .getChoferNacionalData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (response) => {
          this.choferes = response;
          this.municipios = response;
          this.colonias = response;
          this.paises = response;
        },
        (error) => {
          this.toastr.error('Error al obtener datos:', error);
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
      this.toastr.error('CURP está vacía');
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

  /**
   * Actualiza los dropdowns de municipios y colonias basados en los datos del chofer.
   *
   * @param choferData - Datos del chofer que contienen la información general.
   * @param choferData.datosGenerales - Información general del chofer.
   * @param choferData.datosGenerales.estados - Clave del estado del chofer.
   * @param choferData.datosGenerales.municipio - Clave del municipio del chofer.
   *
   * Si la clave del estado está presente, carga los municipios correspondientes.
   * Si la clave del municipio está presente, carga las colonias correspondientes.
   */
  updateDropdowns(choferData: any): void {
    const estadoClave = choferData.datosGenerales.estados;
    const municipioClave = choferData.datosGenerales.municipio;

    if (estadoClave) {
      this.loadMunicipios(estadoClave);
    }

    if (municipioClave) {
      this.loadColonias(municipioClave);
    }
  }

  /**
   * Método que se ejecuta cuando hay cambios en el formulario de choferes.
   * Se suscribe a los cambios de valor de los campos 'entidadFederativaCHN' y 'delegacionCHN'
   * del formulario 'formChoferes' y ejecuta las acciones correspondientes.
   *
   * @returns {void}
   */
  onChanges(): void {
    this.formChoferes
      .get('formChoferes.entidadFederativaCHN')
      ?.valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((valor) => {});

    this.formChoferes
      .get('formChoferes.delegacionCHN')
      ?.valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((valor) => {});
  }

  /**
   * Carga los estados.
   *
   * @returns {Promise<void>} Una promesa que se resuelve cuando la carga de estados se completa.
   */
  loadEstados(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  /**
   * Carga los municipios correspondientes a un estado dado.
   *
   * @param {string} claveEstado - La clave del estado para el cual se desean cargar los municipios.
   * @returns {void}
   *
   * @remarks
   * Este método utiliza el servicio `tramite40101Service` para obtener los municipios
   * correspondientes a la clave del estado proporcionada. Los resultados se asignan a la
   * propiedad `municipios` del componente. En caso de error, se muestra un mensaje de error
   * utilizando `toastr`.
   */
  loadMunicipios(claveEstado: string): void {
    if (!claveEstado) return;
    this.tramite40101Service
      .getMunicipios(claveEstado)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          this.municipios = data;
        },
        (error) => {
          this.toastr.error('Error al cargar municipios:', error);
        }
      );
  }

  /**
   * Carga las colonias correspondientes a un municipio dado.
   *
   * @param {string} claveMunicipio - La clave del municipio para el cual se desean cargar las colonias.
   * @returns {void}
   *
   * @example
   * this.loadColonias('12345');
   *
   * @remarks
   * Si la clave del municipio no es proporcionada, la función no realizará ninguna acción.
   *
   * @throws {Error} Si ocurre un error al cargar las colonias, se mostrará un mensaje de error mediante Toastr.
   */
  loadColonias(claveMunicipio: string): void {
    if (!claveMunicipio) return;
    this.tramite40101Service
      .getColonias(claveMunicipio)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          this.colonias = data;
        },
        (error) => {
          this.toastr.error('Error al cargar colonias:', error);
        }
      );
  }

  /**
   * Maneja el evento de cambio de país.
   *
   * @param {Event} event - El evento de cambio.
   */
  onPaisChange(event: Event): void {
    const PAIS = (event.target as HTMLSelectElement).value;
    if (PAIS) {
      this.loadEstados();
    }
  }

  /**
   * Maneja el cambio de estado cuando se selecciona una opción en el elemento HTML.
   *
   * @param {Event} event - El evento que se dispara cuando se selecciona una opción.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando se maneja el cambio de estado.
   */
  onEstadoChange(event: Event): Promise<void> {
    return new Promise((resolve) => {
      const selectedEstado = (event.target as HTMLSelectElement).value;
      resolve();
    });
  }

  /**
   * Maneja el evento de cambio de municipio.
   *
   * @param {Event} event - El evento de cambio que contiene el municipio seleccionado.
   * @returns {Promise<void>} Una promesa que se resuelve cuando el cambio de municipio ha sido manejado.
   */
  onMunicipioChange(event: Event): Promise<void> {
    return new Promise((resolve) => {
      const selectedMunicipio = (event.target as HTMLSelectElement).value;
      resolve();
    });
  }

  /**
   * Restablece el formato de choferes.
   */
  limpiarFormulario(): void {
    this.formChoferes.reset();
  }

  toggleAll(event: any): void {
    this.selectedAll = event.target.checked;
  }

  /**
   * Selecciona el estado actual del formulario y lo establece en el store.
   */
  estadoSeleccion(): void {
    const ESTADO = this.formChoferes.get('estado')?.value;
    this.tramite40101Store.setEstado(ESTADO);
  }

  agregarMiembro() {
    /**
     * agregarMiembro
     */
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
