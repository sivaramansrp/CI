import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  CrosslistComponent,
  CrossListLable,
  RespuestaCatalogos,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  MERCANCIAS_DATA,
  mercanciasInfo,
  NICO_TABLA,
  nicoInfo,
} from '../../modelos/domicilo.model';
import {
  CONTINUAR,
  CROSLISTA_DE_PAISES,
} from '../../enum/domicilo.enum';
import {
  Solicitud260211State,
  Tramite260211Store,
} from '../../../../estados/tramites/tramite260211.store';
import { Tramite260211Query } from '../../../../estados/queries/tramite260211.query';
import { map, Subject, takeUntil } from 'rxjs';
 
/**
 * Interfaz para la respuesta de la tabla de NICO.
 */
export interface RespuestaTabla {
  /**
   * Código de respuesta.
   */
  code: number;
  /**
   * Datos de la tabla NICO.
   */
  data: nicoInfo[];
  /**
   * Mensaje de la respuesta.
   */
  message: string;
}
 
/**
 * Interfaz para la respuesta de la tabla de mercancías.
 */
export interface MercanciasTabla {
  /**
   * Código de respuesta.
   */
  code: number;
  /**
   * Datos de la tabla de mercancías.
   */
  data: mercanciasInfo[];
  /**
   * Mensaje de la respuesta.
   */
  message: string;
}
 
/**
 * Componente principal para gestionar el formulario de domicilio.
 */
@Component({
  selector: 'app-domicillo',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CrosslistComponent,
  ],
  templateUrl: './domicillo.component.html',
  styleUrl: './domicillo.component.css',
})
export class DomicilloComponent implements OnInit, AfterViewInit {
  /**
   * Lista de componentes Crosslist disponibles en la vista.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
 
  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud260211State;
 
  /**
   * Notificador para destruir los observables al finalizar.
   */
  private destroyNotifier$: Subject<void> = new Subject();
 
  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param httpServicios Cliente HTTP para servicios API.
   * @param tramite260211Store Almacén del trámite 260211.
   * @param tramite260211Query Consulta del trámite 260211.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly httpServicios: HttpClient,
    private tramite260211Store: Tramite260211Store,
    private tramite260211Query: Tramite260211Query
  ) {}
 
  /**
   * Grupo de formularios para domicilio.
   */
  domicilio!: FormGroup;
 
  /**
   * Grupo de formularios para agente.
   */
  formAgente!: FormGroup;
 
  /**
   * Grupo de formularios para mercancías.
   */
  formMercancias!: FormGroup;
 
  /**
   * Control para la fecha de aduanas de entrada.
   */
  aduanasDeEntradaFecha: FormControl = new FormControl('');
 
  /**
   * Control para la fecha seleccionada de aduanas de entrada.
   */
  aduanasDeEntradaFechaSeleccionada: FormControl = new FormControl('');
 
  /**
   * Lista de catálogos de estados.
   */
  estado: Catalogo[] = [];
 
  /**
   * Lista de países para la selección de origen.
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;
 
  /**
   * Configuración de tabla para selección de tipo checkbox.
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
 
  /**
   * Configuración de columnas para la tabla NICO.
   */
  nicoTabla: ConfiguracionColumna<nicoInfo>[] = NICO_TABLA;
 
  /**
   * Datos cargados para la tabla NICO.
   */
  nicoTablaDatos: nicoInfo[] = [];
 
  /**
   * Configuración de columnas para la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<mercanciasInfo>[] = MERCANCIAS_DATA;
 
  /**
   * Datos cargados para la tabla de mercancías.
   */
  mercanciasTablaDatos: mercanciasInfo[] = [];
 
  /**
   * Lista de aduanas seleccionadas.
   */
  aduanasDeEntradaSeleccionadas: string[] = [];
 
  /**
   * Lista de datos de aduanas de entrada.
   */
  aduanasDeEntradaDatos: string[] = [];
 
  /**
   * Indica si la sección es colapsable.
   */
  colapsable: boolean = false;
 
  /**
   * Indica si la sección "Duo" es colapsable.
   */
  colapsableDuos: boolean = false;
 
  /**
   * Indica si la sección "Tres" es colapsable.
   */
  colapsableTres: boolean = false;
 
  /**
   * Lista de países para seleccionar el origen de la primera sección.
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;
 
  /**
   * Lista de países para seleccionar el origen de la segunda sección.
   */
  seleccionarOrigenDelPaisDuos: string[] = this.crosListaDePaises;
 
  /**
   * Lista de países para seleccionar el origen de la tercera sección.
   */
  seleccionarOrigenDelPaisTres: string[] = this.crosListaDePaises;
 
  /**
   * Etiqueta para el crosslist de país de procedencia.
   */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };
/**
 * Método que se ejecuta al inicializar el componente.
 */
ngOnInit(): void {
  this.tramite260211Query
    .selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
    .subscribe();
 
  this.obtenerEstadoList();
  this.obtenerTablaDatos();
  this.obtenerMercanciasDatos();
 
  /**
   * Inicialización del formulario de domicilio.
   */
  this.domicilio = this.fb.group({
    codigoPostal: [this.solicitudState?.codigoPostal, Validators.required],
    estado: [this.solicitudState?.estado, Validators.required],
    muncipio: [this.solicitudState?.muncipio, Validators.required],
    localidad: [this.solicitudState?.localidad],
    colonia: [this.solicitudState?.colonia],
    calle: [this.solicitudState?.calle],
    lada: [this.solicitudState?.lada],
    telefono: [this.solicitudState?.telefono, Validators.required],
    avisoCheckbox: [this.solicitudState?.avisoCheckbox],
    licenciaSanitaria: [{ value: this.solicitudState?.licenciaSanitaria, disabled: false }],
    regimen: [this.solicitudState?.regimen],
    aduanasEntradas: [this.solicitudState?.aduanasEntradas],
    numeroPermiso: [this.solicitudState?.numeroPermiso],
  });
 
  /**
   * Inicialización del formulario de agente.
   */
  this.formAgente = this.fb.group({
    claveScianModal: [this.solicitudState?.claveScianModal, Validators.required],
    claveDescripcionModal: [this.solicitudState?.claveDescripcionModal],
  });
 
  /**
   * Inicialización del formulario de mercancías.
   */
  this.formMercancias = this.fb.group({
    clasificacion: [this.solicitudState?.clasificacion, Validators.required],
    especificar: [this.solicitudState?.especificar, Validators.required],
    denominacionEspecifica: [this.solicitudState?.denominacionEspecifica, Validators.required],
    denominacionDistintiva: [this.solicitudState?.denominacionDistintiva, Validators.required],
    denominacionComun: [this.solicitudState?.denominacionComun, Validators.required],
    tipoDeProducto: [this.solicitudState?.tipoDeProducto, Validators.required],
    estadoFisico: [this.solicitudState?.estadoFisico, Validators.required],
    fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, Validators.required],
    descripcionFraccion: [{ value: this.solicitudState?.descripcionFraccion, disabled: true }, Validators.required],
    cantidadUMT: [this.solicitudState?.cantidadUMT, Validators.required],
    UMT: [{ value: this.solicitudState?.UMT, disabled: true }, Validators.required],
    cantidadUMC: [this.solicitudState?.cantidadUMC, Validators.required],
    UMC: [this.solicitudState?.UMC, Validators.required],
    presentacion: [this.solicitudState?.presentacion, Validators.required],
    numeroRegistro: [this.solicitudState?.numeroRegistro, Validators.required],
    fechaCaducidad: [this.solicitudState?.fechaCaducidad],
  });
}
 
/**
 * Método que se ejecuta después de que la vista ha sido inicializada.
 */
ngAfterViewInit(): void {}
 
/**
 * Botones de acción para gestionar listas de países en la primera sección.
 */
paisDeProcedenciaBotons = [
  { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: () => this.crossList.toArray()[0].agregar('t') },
  { btnNombre: 'Agregar selección', class: 'btn-default', funcion: () => this.crossList.toArray()[0].agregar('') },
  { btnNombre: 'Restar selección', class: 'btn-danger', funcion: () => this.crossList.toArray()[0].quitar('') },
  { btnNombre: 'Restar todos', class: 'btn-default', funcion: () => this.crossList.toArray()[0].quitar('t') },
];
 
/**
 * Botones de acción para gestionar listas de países en la segunda sección.
 */
paisDeProcedenciaBotonsDuos = [
  { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: () => this.crossList.toArray()[1].agregar('t') },
  { btnNombre: 'Agregar selección', class: 'btn-default', funcion: () => this.crossList.toArray()[1].agregar('') },
  { btnNombre: 'Restar selección', class: 'btn-danger', funcion: () => this.crossList.toArray()[1].quitar('') },
  { btnNombre: 'Restar todos', class: 'btn-default', funcion: () => this.crossList.toArray()[1].quitar('t') },
];
 
/**
 * Botones de acción para gestionar listas de países en la tercera sección.
 */
paisDeProcedenciaBotonsTres = [
  { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: () => this.crossList.toArray()[2].agregar('t') },
  { btnNombre: 'Agregar selección', class: 'btn-default', funcion: () => this.crossList.toArray()[2].agregar('') },
  { btnNombre: 'Restar selección', class: 'btn-danger', funcion: () => this.crossList.toArray()[2].quitar('') },
  { btnNombre: 'Restar todos', class: 'btn-default', funcion: () => this.crossList.toArray()[2].quitar('t') },
];
 
/**
 * Obtiene la lista de estados desde un archivo JSON.
 */
obtenerEstadoList(): void {
  this.httpServicios
    .get<RespuestaCatalogos>('../../../../../assets/json/260211/seleccion.json')
    .subscribe((data): void => {
      const datos = data?.data;
      this.estado = datos;
    });
}
 
/**
 * Obtiene los datos para la tabla de NICO desde un archivo JSON.
 */
obtenerTablaDatos(): void {
  this.httpServicios
    .get<RespuestaTabla>('../../../../../assets/json/260211/tablaDatos.json')
    .subscribe((data): void => {
      this.nicoTablaDatos = data?.data;
    });
}
 
/**
 * Obtiene los datos de la tabla de mercancías desde un archivo JSON.
 */
obtenerMercanciasDatos(): void {
  this.httpServicios
    .get<MercanciasTabla>('../../../../../assets/json/260211/mercanciasDatos.json')
    .subscribe((data): void => {
      this.mercanciasTablaDatos = data?.data;
    });
}
 
/**
 * Maneja el cambio del checkbox en el formulario y actualiza el estado correspondiente.
 * @param event Evento del checkbox.
 * @param form Formulario en el que se realiza el cambio.
 * @param campo Nombre del campo afectado.
 * @param metodoNombre Método correspondiente del store para actualizar el valor.
 */
onAvisoCheckboxChange(
  event: Event,
  form: FormGroup,
  campo: string,
  metodoNombre: keyof Tramite260211Store
): void {
  const checkbox = event.target as HTMLInputElement;
  if (checkbox.checked) {
    this.domicilio.get('licenciaSanitaria')?.disable();
  } else {
    this.domicilio.get('licenciaSanitaria')?.enable();
  }
  const valor = form.get(campo)?.value;
  (this.tramite260211Store[metodoNombre] as (value: any) => void)(valor);
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
mostrar_colapsableDuos(): void {
  this.colapsableDuos = !this.colapsableDuos;
}
 
/**
 * Alterna el estado colapsable de la tercera sección.
 */
mostrar_colapsableTres(): void {
  this.colapsableTres = !this.colapsableTres;
}
 
  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260211Store): void {
    const valor = form.get(campo)?.value;
    (this.tramite260211Store[metodoNombre] as (value: any) => void)(valor);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
