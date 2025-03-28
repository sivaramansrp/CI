/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  CrossListLable,
  CrosslistComponent,
  InputFecha,
  InputFechaComponent,
  RespuestaCatalogos,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MERCANCIAS_DATA,
  MercanciasInfo,
  NICO_TABLA,
  NicoInfo,
} from '@libs/shared/data-access-user/src/core/models/260211/domicilo.model';
import {
  Solicitud260211State,
  Tramite260211Store,
} from '../../../../estados/tramites/tramite260211.store';
import { Subject,map, takeUntil } from 'rxjs';
import { CROSLISTA_DE_PAISES } from '@libs/shared/data-access-user/src/core/enums/260211/domicilo.enum';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Tramite260211Query } from '../../../../estados/queries/tramite260211.query';
import { FECHA_DE_PAGO } from '@libs/shared/data-access-user/src/core/enums/260211/manifiestos.enum';
import { SanitarioService } from '../../services/sanitario.service';
 
 
/**
 * Interfaz para la respuesta de la tabla de NICO.
 */
export interface RespuestaTabla {
  /**
   * Código de respuesta.
   */
  código: number;
  /**
   * Datos de la tabla NICO.
   */
  datos: NicoInfo[];
  /**
   * Mensaje de la respuesta.
   */
  mensaje: string;
}
 
/**
 * Interfaz para la respuesta de la tabla de mercancías.
 */
export interface MercanciasTabla {
  /**
   * Código de respuesta.
   */
  código: number;
  /**
   * Datos de la tabla de mercancías.
   */
  datos: MercanciasInfo[];
  /**
   * Mensaje de la respuesta.
   */
  mensaje: string;
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
    InputFechaComponent
  ],
  templateUrl: './domicillo.component.html',
  styleUrl: './domicillo.component.css',
})
export class DomicilloComponent implements OnInit,OnDestroy {
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
   * property {Subject<void>} destroyed$
   * description Sujeto utilizado para manejar la destrucción de observables.
   * private
   */
  private destroyed$ = new Subject<void>();
 
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
    private tramite260211Query: Tramite260211Query,
    private service: SanitarioService,
  ) {
    // Dependencia inyectada para uso posterior
  }
 
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
  nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;
 
  /**
   * Datos cargados para la tabla NICO.
   */
  nicoTablaDatos: NicoInfo[] = [];
 
  /**
   * Configuración de columnas para la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;
 
  /**
   * Datos cargados para la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];
 
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
  colapsableDos: boolean = false;
 
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
  seleccionarOrigenDelPaisDos: string[] = this.crosListaDePaises;
 
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
 * Configuración de las fechas de inicio y fin.
 * @type {InputFecha}
 */
public fechaCaducidadInput: InputFecha = FECHA_DE_PAGO;
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
    especificarClasificacionProducto: [this.solicitudState?.especificarClasificacionProducto, Validators.required],
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
 * Botones de acción para gestionar listas de países en la primera sección.
 */
paisDeProcedenciaBotons = [
  { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[0].agregar('t') },
  { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].agregar('') },
  { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList.toArray()[0].quitar('') },
  { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].quitar('t') },
];
 
/**
 * Botones de acción para gestionar listas de países en la segunda sección.
 */
paisDeProcedenciaBotonsDos = [
  { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[1].agregar('t') },
  { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList.toArray()[1].agregar('') },
  { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList.toArray()[1].quitar('') },
  { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[1].quitar('t') },
];
 
/**
 * Botones de acción para gestionar listas de países en la tercera sección.
 */
paisDeProcedenciaBotonsTres = [
  { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[2].agregar('t') },
  { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList.toArray()[2].agregar('') },
  { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList.toArray()[2].quitar('') },
  { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[2].quitar('t') },
];
 
/**
 * Obtiene la lista de estados desde un archivo JSON.
 */
obtenerEstadoList(): void {
  this.service.obtenerEstadoList()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      const DATOS = data?.data;
      this.estado = DATOS;
    });
}
 
/**
 * Obtiene los datos para la tabla de NICO desde un archivo JSON.
 */
obtenerTablaDatos(): void {
  this.service.obtenerTablaDatos()
  .pipe(takeUntil(this.destroyed$))
  .subscribe((data) => {
    const DATOS = data?.datos;
    this.nicoTablaDatos = DATOS;
  });
}
 
/**
 * Obtiene los datos de la tabla de mercancías desde un archivo JSON.
 */
obtenerMercanciasDatos(): void {
  this.service.obtenerMercanciasDatos()
  .pipe(takeUntil(this.destroyed$))
  .subscribe((data) => {
    const DATOS = data?.datos;
    this.mercanciasTablaDatos = DATOS;
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
  const CHECKBOX = event.target as HTMLInputElement;
  if (CHECKBOX.checked) {
    this.domicilio.get('licenciaSanitaria')?.disable();
  } else {
    this.domicilio.get('licenciaSanitaria')?.enable();
  }
  const VALOR = form.get(campo)?.value;
  (this.tramite260211Store[metodoNombre] as (value: any) => void)(VALOR);
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
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260211Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260211Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  
  /**
   * Cambia el valor de la fecha final en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  public cambioFechaFinal(nuevo_valor: string): void {

    this.formMercancias.get('fechaCaducidad')?.setValue(nuevo_valor);
    this.formMercancias.get('fechaCaducidad')?.markAsUntouched();
  }

}
