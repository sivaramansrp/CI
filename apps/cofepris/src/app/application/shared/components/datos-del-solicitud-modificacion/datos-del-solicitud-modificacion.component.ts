/**
 * @component DatosDelSolicitudModificacionComponent
 * @description
 * Este componente gestiona la modificación de datos relacionados con una solicitud.
 * Proporciona formularios reactivos para capturar información del establecimiento,
 * datos SCIAN, y otros detalles relacionados con la solicitud.
 * También incluye funcionalidades para manejar modales, tablas dinámicas y listas cruzadas.
 */
import {
  ALERT,
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  CrossListLable,
  CrosslistComponent,
  InputFecha,
  InputFechaComponent,
  InputRadioComponent,
  REGEX_RFC_SANITARIO,
  REGEX_SOLO_DIGITOS,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { CROSLISTA_DE_PAISES, FECHA_DE_PAGO, MERCANCIAS_DATA, TEXTOS } from '../../constantes/aviso-de-funcionamiento.enum';
import { CommonModule } from '@angular/common';
import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { Modal } from 'bootstrap';



import {
  MercanciasInfo,
  PropietarioTipoPersona,
  ScianModel,
} from '../../models/datos-de-la-solicitud.model';
import { Subject, takeUntil } from 'rxjs';
import { ScianData } from '../../../shared/models/datos-modificacion.model';

import { SCIAN_DATA } from '../../constantes/datos-scian.enum';

import { EstablecimientoService } from '../../services/establecimiento.service';
import { ManifiestosRepresentanteSeccionComponent } from '../manifiestos-representante-seccion/manifiestos-representante-seccion.component';/*
** component 
*/
@Component({
  selector: 'app-datos-del-solicitud-modificacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CrosslistComponent,
    ManifiestosRepresentanteSeccionComponent,
    InputFechaComponent,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    AlertComponent,
  ],

  templateUrl: './datos-del-solicitud-modificacion.component.html',
  styleUrl: './datos-del-solicitud-modificacion.component.scss',
})
export class DatosDelSolicitudModificacionComponent
  implements OnInit, OnDestroy ,AfterViewInit
{
  /**
   * @input showPreFillingOptions
   * Indica si se deben mostrar las opciones de prellenado.
   */
  @Input() showPreFillingOptions: boolean = true; 
  /**
   * Referencia al modal del establecimiento.
   */
  @ViewChild('establecimientoModal', { static: false })
  establecimientoModal!: ElementRef;
 /**
   * Referencia al botón del modal del establecimiento.
   */
  @ViewChild('establecimientoModalButton', { static: false })
  establecimientoModalButton!: ElementRef;
 /**
   * Fecha de caducidad para el formulario.
   */
  public fechaCaducidadInput: InputFecha = FECHA_DE_PAGO;
   /**
   * Instancia del modal de Bootstrap.
   */
   modalInstance!: Modal;

   /**
    * Formulario para gestionar mercancías.
    */
   formMercancias!: FormGroup;
  /**
   * Instancia del modal del establecimiento.
   */
  establecimientoModalInstance!: Modal;

  /**
   * Datos del catálogo SCIAN.
   */
  scianJson: Catalogo[] = [];

  /**
   * Formulario para datos SCIAN.
   */
  scianForm!: FormGroup;
   /**
   * Formulario para datos del establecimiento.
   */
   solicitudEstablecimientoForm!: FormGroup;

   /**
    * Referencias a los componentes de listas cruzadas.
    */
   @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
 
   /**
    * Opciones genéricas para el formulario.
    */
   genericOptions: PropietarioTipoPersona[] = [];

   /**
   * Nombre del modal.
   */
   public modal: string = 'modal';

   /**
    * Formulario principal.
    */
   form!: FormGroup;
 
   /**
    * Formulario de solicitud.
    */
   solicitudForm!: FormGroup;

  /**
   * Botones de acción para gestionar listas de países en la primera sección.
   */
  paisDeProcedenciaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  /**
   * Botones de acción para gestionar listas de países en la segunda sección.
   */
  paisDeProcedenciaBotonsDos = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[1].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[1].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[1].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[1].quitar('t'),
    },
  ];

  /**
   * Botones de acción para gestionar listas de países en la tercera sección.
   */
  paisDeProcedenciaBotonsTres = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[2].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[2].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[2].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[2].quitar('t'),
    },
  ];

  /**
   * Etiqueta para el crosslist de país de procedencia.
   */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };
  /**
   * Lista de países para la selección de origen.
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;
  /**
   * Indica si la sección es colapsable.
   */
  colapsable: boolean = false;

  /**
   * Indica si la sección "Duo" es colapsable.
   */
  colapsableDos: boolean = false;

  /**
   * Indica si la sección "Tres" es colapsable.
   */
  colapsableTres: boolean = false;
  /**
   * Indica si la sección "Uno" es colapsable.
   */
  public cambioFechaFinal(nuevo_valor: string): void {
    this.formMercancias.get('fechaCaducidad')?.setValue(nuevo_valor);
    this.formMercancias.get('fechaCaducidad')?.markAsUntouched();
  }
  /**
   * Alterna el estado colapsable de la primera sección.
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Alterna el estado colapsable de la segunda sección.
   */
  mostrar_colapsableDos(): void {
    this.colapsableDos = !this.colapsableDos;
  }

  /**
   * Alterna el estado colapsable de la tercera sección.
   */
  mostrar_colapsableTres(): void {
    this.colapsableTres = !this.colapsableTres;
  }
  /**
   * Lista de países para seleccionar el origen de la primera sección.
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;

  /**
   * Lista de países para seleccionar el origen de la segunda sección.
   */
  seleccionarOrigenDelPaisDos: string[] = this.crosListaDePaises;

  /**
   * Lista de países para seleccionar el origen de la tercera sección.
   */
  seleccionarOrigenDelPaisTres: string[] = this.crosListaDePaises;

  /**
   * Lista de estados.
   */
  estado: Catalogo[] = [];

  /**
   * Textos de alerta.
   */
  TEXTOS = ALERT;

  /**
   * Clase de alerta.
   */
  class = 'alert-warning';

  /**
   * Configuración de selección de tabla.
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Datos cargados dinámicamente para la tabla SCIAN.
   */
  datosData: ScianData[] = [];
  /**
   * Enum para la selección de tablas.
   */
  tipoSeleccionTabla = TablaSeleccion;
  /**
   * Formulario de domicilio.
   */
  domicilio!: FormGroup;
  /**
   * Formulario de establecimiento.
   */
  domicilioEstablecimiento!: FormGroup;
  /**
   * Muestra el modal para la clave SCIAN.
   */
  public mostrarModeloClave(): void {
    this.modalInstance.show();
  }

  /**
   * Cierra el modal de clave SCIAN.
   */
  openEstablecimientoModal(): void {
    this.establecimientoModalInstance.show();
  }
  /**
   * Ciclo de vida `AfterViewInit`.
   * Inicializa la instancia del modal de Bootstrap.
   */
  ngAfterViewInit(): void {
    if (this.establecimientoModalButton) {
      this.establecimientoModalInstance = new Modal(
        this.establecimientoModalButton.nativeElement
      );
    }
    if (this.establecimientoModal) {
      this.modalInstance = new Modal(this.establecimientoModal.nativeElement);
    }
  }

  /**
   * Formulario para gestionar el representante legal.
   */
  representanteLegal!: FormGroup;
  /**
   * Texto de los manifiestos.
   */
  TEXTOS1 = TEXTOS;
  /**
   * Texto de los manifiestos.
   */
  colapsable1: boolean = true;
  /**
   * Texto de los manifiestos.
   */
  private destroy$ = new Subject<void>();

  /**
   * Configuración de columnas de la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;

  /**
   * Datos de la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * Constructor del componente.
   *
   * @param fb FormBuilder para crear formularios.
   * @param httpServicios Servicio HTTP para realizar peticiones.
   * @param tramite260904Query Consulta de datos del trámite.
   * @param tramite260904Store Almacenamiento de datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private httpServicios: HttpClient,
    private establecimientoService: EstablecimientoService,
    private domicilioEstablecimientoStore: DatosDelSolicituteSeccionStateStore,
    private domicilioEstablecimientoQuery: DatosDelSolicituteSeccionQuery
  )  
  {
    // Constructor
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.loadScian();
    this.loadEstadoData();
    this.crearFormulario();
   
    this.domicilioEstablecimiento = this.fb.group({
      ideGenerica1: ['', Validators.required],
      observaciones: ['', [Validators.required, Validators.maxLength(2000)]],
      establecimientoRFCResponsableSanitario: ['', Validators.pattern(REGEX_RFC_SANITARIO)],
      establecimientoRazonSocial:['', Validators.required],
      establecimientoCorreoElectronico :['', [Validators.required, Validators.email]],
      establecimientoEstados :['', Validators.required],
      descripcionMunicipio: ['', Validators.required],
      localidad :[''],
      establishomentoColonias:[''],
      calle: ['', Validators.required],
      lada: ['', [Validators.maxLength(5), Validators.pattern(REGEX_SOLO_DIGITOS)]],
      telefono: ['', [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
      establecimientoDomicilioCodigoPostal :['', Validators.required],
      scian :['', Validators.required]
    });
    this.scianForm = this.fb.group({
      scian: ['', Validators.required],
      descripcionScian: ['', Validators.required],
    });

    this.solicitudEstablecimientoForm = this.fb.group({
      noLicenciaSanitaria: ['', Validators.required],
      avisoCheckbox: [false],
       licenciaSanitaria: [{ value: '', disabled: true }],
       regimen: [''],
       aduanasEntradas: [''],
       aifaCheckbox: [false],
    });
    this.formMercancias = this.fb.group({
      clasificacion: ['', Validators.required],
      especificarClasificacionProducto: ['', Validators.required],
      denominacionEspecifica: ['', Validators.required],
      denominacionDistintiva:['', Validators.required],
      denominacionComun: ['', Validators.required],
      tipoDeProducto: ['', Validators.required],
      estadoFisico: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: [ { value: '', disabled: true }, Validators.required],
      cantidadUMT: ['', Validators.required],
      UMT: [{ value: '', disabled: true }, Validators.required],
      cantidadUMC: ['', Validators.required],
      UMC: ['', Validators.required],
      presentacion:  ['', Validators.required],
      numeroRegistro: ['', Validators.required],
      fechaCaducidad: [''],
      
    });
    this.establecimientoService
      .getJustificationData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PropietarioTipoPersona[]) => {
        this.genericOptions = data; // Bind the fetched data
      });
      this.domicilioEstablecimientoQuery
      .select()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.domicilioEstablecimiento.patchValue(state, { emitEvent: false });
      });
      this.domicilioEstablecimientoQuery
      .select()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.solicitudEstablecimientoForm.patchValue(state, { emitEvent: false });
      });
  }

  
  mostrarColapsable(): void {
    this.colapsable1 = !this.colapsable1;
  }
  /**
   * Carga los datos del catálogo SCIAN.
   */
  loadScian(): void {
    this.establecimientoService
      .getSciandata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.scianJson = resp;
      });
  }
  loadEstadoData(): void {
    this.establecimientoService
      .getEstadodata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.estado = resp;
      });
  }

  /**
   * Carga los datos del catálogo de justificación.
   */
  onControlChange(controlName: string): void {
    
    const UPDATED_VALUE = {
      [controlName]: this.domicilioEstablecimiento.get(controlName)?.value,
    };
    
    this.domicilioEstablecimientoStore.update(UPDATED_VALUE);
  }
  /**
   * Actualiza el estado del formulario según los cambios en los controles.
   * @param controlName Nombre del control que cambió.
   */
  onControlChangeForm(controlName: string): void {
  
    const UPDATED_VALUE = {
      [controlName]: this.solicitudEstablecimientoForm.get(controlName)?.value,
    };
   
    this.domicilioEstablecimientoStore.update(UPDATED_VALUE);
  }
  /**
   * Habilita o deshabilita el campo "No Licencia Sanitaria" según el estado del checkbox.
   * @param event Evento del checkbox.
   */
  toggleNoLicenciaSanitaria(event: Event): void {
    const NO_LICENCIA_SANITARIA = this.solicitudEstablecimientoForm.get(
      'noLicenciaSanitaria'
    );

    if ((event.target as HTMLInputElement).checked) {
      NO_LICENCIA_SANITARIA?.disable();
    } else {
      NO_LICENCIA_SANITARIA?.enable();
    }
  }

  /**
   * Limpia el formulario SCIAN.
   */
  limpiarScianForm(): void {
    this.scianForm.reset();
  }
  /**
   * Datos SCIAN agregados por el usuario.
   */
  personaparas: ScianModel[] = [];
  /**
   * Guarda un nuevo dato SCIAN y lo agrega a la tabla.
   */
  guardarScian(): void {
    if (this.scianForm.valid) {
      const SCIAN_DATA: ScianModel = {
        claveScian: this.scianForm.get('scian')?.value,
        descripcionScian: this.scianForm.get('descripcionScian')?.value,
      };

      // Agregar el nuevo dato a la tabla
      this.personaparas.push(SCIAN_DATA);

      // Limpiar el formulario
      this.scianForm.reset();

      // Cerrar el modal
      this.closeScianModal();
    }
  }

  /**
   * Abre el modal SCIAN.
   */
  openScianModal(): void {
    this.modalInstance.show();
  }

  /**
   * Cierra el modal SCIAN.
   */
  closeScianModal(): void {
    this.modalInstance.hide();
  }

  /**
   * Configuración de columnas para la tabla de datos SCIAN.
   */
  configuracionTabla: ConfiguracionColumna<ScianData>[] = SCIAN_DATA;
  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Habilita todos los controles del formulario si están deshabilitados.
   * @returns {void}
   */
  public toggleFormControls(): void {
    Object.keys(this.solicitudForm.controls).forEach((controlName) => {
      const CONTROL = this.solicitudForm.get(controlName);
      if (CONTROL?.disabled) {
        CONTROL.enable();
      }
    });
  }
  /**
   * Método para crear el formulario.
   */
  crearFormulario(): void {
    this.solicitudForm = this.fb.group({
      ideGenerica1: ['', [Validators.required]],
      justificacionId: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      municipioOAlcaldia: ['', [Validators.required]],
      localidad: [''],
      colonias: [''],
      calle: ['', [Validators.required]],
      lada: [''],
      telefono: ['', [Validators.required]],
    });

 
  }
}
