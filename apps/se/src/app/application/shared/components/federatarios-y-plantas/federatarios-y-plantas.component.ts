import { Component, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Input, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AlertComponent, Catalogo, Notificacion, NotificacionesComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import {
  CatalogoDatosIdx,
  EstadoCatalogo,
  EstadoOptionCatalogo,
  FederatariosEncabezado,
} from '../../models/federatarios-y-plantas.model';
import { FederatariosYPlantasConfiguration } from '../../models/federatarios-y-plantas.model';
import { PlantasDisponibles } from '../../models/federatarios-y-plantas.model';
import { PlantasImmex } from '../../models/federatarios-y-plantas.model';
import { TEXTO_DE_ALERTA } from '../../models/federatarios-y-plantas.model';

import {
  DEFAULT_ESTADOS,
  FECHA_DE_PAGO,
  FECHA_DE_Tabla,
  INMEX_PLANTAS
} from '../../constantes/federatarios-y-plantas.enum';

import { Subject, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { ComplimentosService } from '../../services/complimentos.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';


/**
 * Componente para los federatarios y plantas
 * @export FederatariosYPlantasComponent
 */
@Component({
  selector: 'app-federatarios-y-plantas',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    AlertComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    FormsModule,
    NotificacionesComponent,
  ],
  templateUrl: './federatarios-y-plantas.component.html',
  styleUrl: './federatarios-y-plantas.component.scss',
})
export class FederatariosYPlantasComponent implements OnInit, OnChanges {
  /**
   * Datos de federatarios que se mostrarán en la tabla
   * @property {FederatariosEncabezado} datosFederatarios
   */
  @Input()
  datosFederatarios!: FederatariosEncabezado;
  /**
   * Configuración para la tabla de federatarios
   * @property {FederatariosYPlantasConfiguration<FederatariosEncabezado>} federatariosConfig
   */
  @Input()
  federatariosConfig!: FederatariosYPlantasConfiguration<FederatariosEncabezado>;

  /**
   * Configuración para la tabla de plantas disponibles
   * @property {FederatariosYPlantasConfiguration<PlantasDisponibles>} plantasDisponiblesConfig
   */
  @Input()
  plantasDisponiblesConfig!: FederatariosYPlantasConfiguration<PlantasDisponibles>;

  /**
   * Configuración para la tabla de plantas IMMEX
   * @property {FederatariosYPlantasConfiguration<PlantasImmex>} plantasImmexConfig
   */
  @Input() plantasImmexConfig!: FederatariosYPlantasConfiguration<PlantasImmex>;

  /**
   * Datos de federatarios para mostrar en la tabla
   * @property {FederatariosEncabezado[]} federatariosDatos
   */
  @Input() federatariosDatos!: FederatariosEncabezado[];

  /**
   * Datos de plantas disponibles para mostrar en la tabla
   * @property {PlantasDisponibles[]} plantasDisponiblesDatos
   */
  @Input() plantasDisponiblesDatos!: PlantasDisponibles[];

  /**
   * Datos de plantas IMMEX para mostrar en la tabla
   * @property {PlantasImmex[]} plantasImmexDatos
   */
  @Input() plantasImmexDatos!: PlantasImmex[];

  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Estado del catálogo para el formulario
   * @property {EstadoCatalogo} estadoIdx
   */
  @Input() public estadoIdx: EstadoCatalogo = DEFAULT_ESTADOS;

  /**
   * Opciones del catálogo de estados para el formulario
   * @property {EstadoOptionCatalogo} estadoOptionIdx
   */
  @Input() public estadoOptionIdx!: EstadoOptionCatalogo;

  /**
   * Configuración del input de fecha de inicio
   * @property {InputFecha} fechaInicioInput
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  /**
   * Opciones del catálogo de estados para el formulario
   * @property {CatalogoDatosIdx} estadoOptionsConfig
   */
  @Input() estadoOptionsConfig!: CatalogoDatosIdx;

  /**
   * @property {boolean} esFormularioUpdate - Indica si el formulario está en modo de actualización.
   */
  @Input() esFormularioUpdate: boolean = false;

  /**
   * Emite eventos relacionados con acciones en la sección.
   * @event accionSeccion
   */
  @Output() accionSeccion: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Opciones de estados disponibles
   * @property {[]} estadoOptions
   */
  estadoOptions: [] = [];

  /**
   * Arreglo que contiene el catálogo de municipios.
   * Cada elemento es de tipo `Catalogo`, representando la información de un municipio disponible.
   */
  municipioCatologo:Catalogo[]=[];

  /**
   * Arreglo que contiene las instancias del catálogo de representaciones.
   * Cada elemento representa una opción disponible en el catálogo.
   * 
   * @type {Catalogo[]}
   */
  RepresentacionCatalogo: Catalogo[] = [];

  /**
   * Texto para mostrar en la alerta
   * @property {string} textodAlerta
   */
  public textodAlerta = TEXTO_DE_ALERTA;

  /**
   * Formulario para los datos de federatarios
   * @property {FormGroup} federatariosFormGroup
   */
  public federatariosFormGroup!: FormGroup;

  /**
   * Grupo de controles del formulario para federatarios
   * @property {FormGroup} federatariosCatalogoGroup
   */
  public federatariosCatalogoGroup!: FormGroup;

  /**
   * Emisor de eventos para los datos del formulario de federatarios.
   * @type {EventEmitter<FederatariosEncabezado>}
   */
  @Output() datosFormaFedratario: EventEmitter<FederatariosEncabezado> =
    new EventEmitter<FederatariosEncabezado>(true);


  @Output() datosPlantaDisponibles: EventEmitter<PlantasDisponibles[]> = new EventEmitter<PlantasDisponibles[]>(true);

  @Output() datosPlantasImmex: EventEmitter<PlantasImmex[]> = new EventEmitter<PlantasImmex[]>(true);



  /**
   * Arreglo que almacena los datos seleccionados de plantas IMMEX.
   * 
   * Este arreglo contiene objetos de tipo `PlantasImmex` que representan
   * las plantas IMMEX seleccionadas por el usuario en la interfaz de usuario.
   * 
   * Uso:
   * - Este arreglo se utiliza para gestionar y procesar la información
   *   relacionada con las plantas IMMEX seleccionadas.
   * - Puede ser modificado dinámicamente en función de las acciones del usuario.
   * 
   * Propósito:
   * - Facilitar la manipulación y el acceso a los datos de las plantas IMMEX
   *   seleccionadas en el componente.
   * 
   * Ejemplo:
   * ```typescript
   * this.plantasImmexSeleccionadoDatos.push(nuevaPlantaImmex);
   * ```
   */
  public plantasImmexSeleccionadoDatos: PlantasImmex[] = [];

  /**
   * Arreglo que almacena los datos seleccionados de plantas disponibles.
   * 
   * Este arreglo contiene objetos de tipo `PlantasDisponibles` que representan
   * las plantas disponibles seleccionadas por el usuario en la interfaz de usuario.
   * 
   * Uso:
   * - Este arreglo se utiliza para gestionar y procesar la información
   *   relacionada con las plantas disponibles seleccionadas.
   * - Puede ser modificado dinámicamente en función de las acciones del usuario.
   * 
   * Propósito:
   * - Facilitar la manipulación y el acceso a los datos de las plantas
   *   disponibles seleccionadas en el componente.
   * 
   * Ejemplo:
   * ```typescript
   * this.plantasDisponiblesSeleccionadoDatos.push(nuevaPlantaDisponible);
   * ```
   */
  public federatariosSeleccionadoDatos: FederatariosEncabezado[] = [];

    /**
     * @description
     * Objeto que representa una nueva notificación.
     * Se utiliza para mostrar mensajes de alerta o información al usuario.
     */
    public miembrosNotificacion!: Notificacion;

  /**
* @description
* Objeto que representa una nueva notificación.
* Se utiliza para mostrar mensajes de alerta o información al usuario.
*/
  public plantasNotificacion!: Notificacion;

  /**
     * Notificador utilizado para manejar la destrucción o desuscripción de observables.
     * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
     *
     * @property {Subject<void>} destroyNotifier$
     */
    private destroyNotifier$: Subject<void> = new Subject();

    /**
     * Arreglo que contiene los elementos del catálogo de estado IMMEX.
     * Cada elemento representa una opción disponible en el catálogo.
     */
    estadoImmex: Catalogo[] = [];

  /**
   * Constructor de la clase FederatariosYPlantasComponent.
   * @param {Router} router - Servicio de Angular para la navegación.
   * @param {ActivatedRoute} activatedRoute - Servicio de Angular para obtener información sobre la ruta actual.
   */
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private validacionesService: ValidacionesFormularioService,private complimentosService: ComplimentosService) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Si el formulario está deshabilitado (`formularioDeshabilitado` es verdadero),
   * deshabilita el grupo de controles `federatariosFormGroup` para evitar la interacción del usuario.
   */
  ngOnInit(): void {
    this.obtenerEstados();
    this.initFederatariosFormGroup();
    this.obtenerRepresentacion('MEX');
    this.obtenerActividad();
    this.obtenerTipoDocumento(102);
    this.obtenerMunicipio("BCN");
    this.obtenerImex();
    if (this.formularioDeshabilitado) {
      this.federatariosFormGroup.disable();
    }
    if(!this.estadoOptionsConfig){
      this.estadoOptionsConfig = {
        estadosFederatarios: [],
        municipio: [],
        estadoImmex: [],
        representacionFederal: [],
        actividadProductiva: []
      };
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Si el formulario está deshabilitado (`formularioDeshabilitado` es verdadero),
   * deshabilita el grupo de controles `federatariosFormGroup` para evitar la interacción del usuario.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estadoOptionsConfig'] && this.esFormularioUpdate) {
      this.federatariosFormGroup.get('estado')?.setValue(this.estadoOptionsConfig.estadosFederatarios?.[0]?.id);
      this.federatariosFormGroup.get('estadoOptions')?.setValue(this.estadoOptionsConfig.municipio?.[0]?.id);
      this.federatariosCatalogoGroup.get('estadoUno')?.setValue(this.estadoOptionsConfig.estadoImmex?.[0]?.id);
      this.federatariosCatalogoGroup.get('estadoDos')?.setValue(this.estadoOptionsConfig.municipio?.[0]?.id);
      this.federatariosCatalogoGroup.get('estadoTres')?.setValue(this.estadoOptionsConfig.municipio?.[0]?.id);
    }
  }

  /**
   * Inicializa el formulario de federatarios con sus campos y validaciones
   * @method initFederatariosFormGroup
   * @returns {void}
   */
  initFederatariosFormGroup(): void {
    this.federatariosFormGroup = new FormGroup({
      nombre: new FormControl(
        this.datosFederatarios?.nombre,
        [Validators.required, Validators.maxLength(28)]
      ),
      fechaInicioInput: new FormControl(this.datosFederatarios?.fechaDelActa,
        Validators.required
      ),
      primerApellido: new FormControl(this.datosFederatarios?.primerApellido,
        [Validators.required, Validators.maxLength(20)]
      ),
      segundoApellido: new FormControl(this.datosFederatarios?.segundoApellido,
        [Validators.required, Validators.maxLength(20)]
      ),
      numeroDeActa: new FormControl(this.datosFederatarios?.numeroDeActa,
        [Validators.required, Validators.maxLength(6)]
      ),
      numeroDeNotaria: new FormControl(this.datosFederatarios?.numeroDeNotaria,
        [Validators.required, Validators.maxLength(6)]
      ),
      estado: new FormControl(this.datosFederatarios?.estado,
        Validators.required
      ),
      estadoOptions: new FormControl(this.datosFederatarios?.estadoOptions,
        Validators.required
      ),
      
    });
    this.federatariosCatalogoGroup = new FormGroup({
      estadoUno: new FormControl(this.datosFederatarios?.estadoUno,
        Validators.required
      ),
      estadoDos: new FormControl(this.datosFederatarios?.estadoDos,
        Validators.required
      ),
      estadoTres: new FormControl(this.datosFederatarios?.estadoTres,
        Validators.required
      ),
    })
  }

  /**
  * compo doc
  * @method esValido
  * @description 
  * Verifica si un campo específico del formulario es válido.
  * @param field El nombre del campo que se desea validar.
  * @returns {boolean | null} Un valor booleano que indica si el campo es válido.
  */
  public esValido(formgroup: FormGroup, campo: string): boolean | null {
    return this.validacionesService.isValid(formgroup, campo);
  }

  /**
   * Navega a la ruta de acciones
   * @param accionesPath
   */
  irAAcciones(accionesPath: string): void {
    if (accionesPath === '../proveedor-por-archivo' && this.accionSeccion.observers.length > 0){
    this.accionSeccion.emit(accionesPath);
    return;
    }
    if (!this.plantasImmexSeleccionadoDatos.length){
      this.abrirPlantasModal();
      return;
    }
  /**
   * Emite la acción seleccionada si existen observadores suscritos a `accionSeccion`.
   */
  if (this.accionSeccion.observers.length > 0) {
    this.accionSeccion.emit(accionesPath);
  }
  }

  /**
   * Verifica si un control del formulario es inválido.
   * @param nombreControl El nombre del control a verificar.
   * @returns Verdadero si el control es inválido y está tocado o modificado, de lo contrario, falso.
   */
  onFechaCambiada(fecha: string): void {
    if (fecha) {
      this.federatariosFormGroup.patchValue({ fechaInicioInput: fecha });
    }
  }

  /**
   * Agrega los datos del formulario de federatarios y los emite.
   * @returns {void}
   */
  aggregarDatos(): void {
    if (this.federatariosFormGroup.invalid) {
      this.agregarUnoModal();
      this.federatariosFormGroup.markAllAsTouched();
      return;
    }
    this.datosFormaFedratario.emit(this.federatariosFormGroup.value);
    this.federatariosFormGroup.reset();
  }

  /**
   * Elimina los datos seleccionados de la lista de federatarios.
   * 
   * Este método filtra los elementos seleccionados (`federatariosSeleccionadoDatos`)
   * y elimina aquellos que también están presentes en la lista de datos de federatarios (`federatariosDatos`).
   * 
   * @remarks
   * - La operación se realiza utilizando el método `filter` para crear una nueva lista
   *   que excluye los elementos comunes entre `federatariosSeleccionadoDatos` y `federatariosDatos`.
   * - Este método no modifica directamente la lista original de `federatariosDatos`.
   * 
   * @example
   * ```typescript
   * // Antes de llamar al método:
   * this.federatariosSeleccionadoDatos = ['A', 'B', 'C'];
   * this.federatariosDatos = ['B', 'C'];
   * 
   * this.eliminarDatos();
   * 
   * // Después de llamar al método:
   * this.federatariosSeleccionadoDatos = ['A'];
   * ```
   */
  eliminarDatos(): void {
    if (this.federatariosSeleccionadoDatos.length === 0) {
      this.abrirUnoModal();
      return;
    }
    this.federatariosDatos = this.federatariosDatos.filter(
      (item) => !this.federatariosSeleccionadoDatos.includes(item)
    );
  }

  /**
   * Abre un modal con una notificación para los miembros federados.
   * 
   * Este método configura un objeto de notificación con los detalles necesarios
   * para mostrar un mensaje de alerta en caso de que no se hayan seleccionado
   * datos de los miembros federados. La notificación incluye el tipo, categoría,
   * modo, título, mensaje, opciones de cierre, tiempo de espera y textos de los
   * botones de acción.
   * 
   * Propiedades configuradas en la notificación:
   * - `tipoNotificacion`: Define el tipo de notificación, en este caso, 'alert'.
   * - `categoria`: Especifica la categoría de la notificación, en este caso, 'danger'.
   * - `modo`: Indica el modo de la notificación, en este caso, 'action'.
   * - `titulo`: Título de la notificación (vacío en este caso).
   * - `mensaje`: Mensaje que se muestra en la notificación, indicando que no se
   *   seleccionaron datos de los miembros federados.
   * - `cerrar`: Indica si la notificación puede cerrarse manualmente.
   * - `tiempoDeEspera`: Tiempo en milisegundos antes de que la notificación se cierre automáticamente.
   * - `txtBtnAceptar`: Texto del botón de aceptación, en este caso, 'Aceptar'.
   * - `txtBtnCancelar`: Texto del botón de cancelación (vacío en este caso).
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  abrirUnoModal(): void {
    this.miembrosNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'No se seleccionaron datos de los miembros federados.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }
  /**
   * Abre un modal para agregar un nuevo miembro federado.
   */
  agregarUnoModal(): void {
    this.miembrosNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Introduzca el Nombre completo y correcto del Notario.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  /**
   * Método para manejar la selección de plantas IMMEX.
   * 
   * Este método recibe un evento de tipo `PlantasImmex` y lo agrega al arreglo
   * `plantasImmexSeleccionadoDatos`, asegurando que no se dupliquen entradas.
   * 
   * @param {PlantasImmex} event - Objeto de tipo `PlantasImmex` que representa la planta seleccionada.
   */
  closeModal(): void {
    this.miembrosNotificacion.cerrar = false;
  }

    /**
   * Método para manejar la selección de plantas IMMEX.
   * 
   * Este método recibe un evento de tipo `PlantasImmex` y lo agrega al arreglo
   * `plantasImmexSeleccionadoDatos`, asegurando que no se dupliquen entradas.
   * 
   * @param {PlantasImmex} event - Objeto de tipo `PlantasImmex` que representa la planta seleccionada.
   */
  closePlantasModal(): void {
    this.plantasNotificacion.cerrar = false;
  }

  /**
   * Abre un modal relacionado con las plantas Immex y configura una notificación
   * para alertar al usuario en caso de que no se hayan seleccionado datos de las plantas.
   *
   * La notificación configurada tiene las siguientes características:
   * - Tipo de notificación: 'alert'
   * - Categoría: 'danger'
   * - Modo: 'action'
   * - Título: vacío
   * - Mensaje: 'No se seleccionaron datos de las plantas Immex.'
   * - Cierre automático: habilitado
   * - Tiempo de espera: 2000 milisegundos
   * - Texto del botón Aceptar: 'Aceptar'
   * - Texto del botón Cancelar: vacío
   *
   * @returns {void} No retorna ningún valor.
   */
  abrirPlantasModal(): void {
    this.plantasNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'No se seleccionaron datos de las plantas Immex.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

/**
 * Searches and assigns available IMMEX plants data.
 *
 * This method sets the `plantasDisponiblesDatos` property with the value of `FECHA_DE_Tabla`.
 * Typically used to update the list of available plants for IMMEX operations.
 *
 * @remarks
 * Ensure that `FECHA_DE_Tabla` is defined and contains the expected data structure before calling this method.
 */
buscarPlantasImmex(): void {
  this.plantasDisponiblesDatos = [FECHA_DE_Tabla];
  this.datosPlantaDisponibles.emit(this.plantasDisponiblesDatos);
}

/**
 * Adds IMMEX plant data to the `plantasImmexDatos` array.
 * This method assigns the value of `INMEX_PLANTAS` to the `plantasImmexDatos` property.
 *
 * @remarks
 * Ensure that `INMEX_PLANTAS` is properly defined and contains the expected plant data.
 */
agregarPlantas(): void {
  this.plantasImmexDatos = [INMEX_PLANTAS];
  this.datosPlantasImmex.emit(this.plantasImmexDatos);
}

/**
   * Elimina todas las plantas seleccionadas, vaciando el arreglo `seleccionadas`.
   * 
   * @remarks
   * Esta función se utiliza para limpiar la selección de plantas en el componente.
   */
  eliminarPlantas(): void {
    if (this.plantasImmexSeleccionadoDatos?.length > 0) {
      this.plantasImmexSeleccionadoDatos.forEach(planta => {
        const INDEX = this.plantasImmexDatos.findIndex(row => row === planta);
        if (INDEX !== -1) {
          this.plantasImmexDatos.splice(INDEX, 1);
        }
    });
    this.plantasImmexDatos = [...this.plantasImmexDatos];
  }
}

/**
 * Obtiene la lista de estados llamando al servicio `complimentosService`.
 * Se suscribe al observable retornado por `getEstado()` y muestra la respuesta en la consola.
 * La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$`.
 */
obtenerEstados():void {
    this.complimentosService.getEstado().pipe(takeUntil(this.destroyNotifier$)).subscribe((res) => {
      this.estadoOptionsConfig.estadosFederatarios = res.datos;
    });
    
  }

  /**
   * Obtiene la representación de los estados federatarios desde el servicio `complimentosService`
   * y actualiza la configuración de opciones de estados federatarios con los datos recibidos.
   * 
   * La suscripción se cancela automáticamente cuando el observable `destroyNotifier$` emite un valor,
   * evitando posibles fugas de memoria.
   */
  obtenerRepresentacion(id:string):void {
    this.complimentosService.getRepresentacion(id).pipe(takeUntil(this.destroyNotifier$)).subscribe((res) => {
      this.RepresentacionCatalogo=res.datos
    });
    
  }

  /**
   * Obtiene la actividad productiva desde el servicio `complimentosService` y actualiza la propiedad
   * `estadosFederatarios` en la configuración de opciones de estado.
   * 
   * La suscripción se gestiona para finalizar automáticamente cuando se emite el notifier `destroyNotifier$`.
   * 
   * @remarks
   * Utiliza el método `getActividadProductiva` del servicio y espera que la respuesta contenga la propiedad `datos`.
   */
  obtenerActividad():void {
    this.complimentosService.getActividadProductiva().pipe(takeUntil(this.destroyNotifier$)).subscribe((res) => {
      this.estadoOptionsConfig.municipio=res.datos;

    });
    
  }

  /**
   * Obtiene el tipo de documento asociado al identificador proporcionado.
   * Realiza una petición al servicio `complimentosService` para recuperar los datos
   * del tipo de documento y actualiza la configuración de opciones de estado (`estadoOptionsConfig.municipio`)
   * con la respuesta obtenida.
   *
   * @param id - Identificador numérico del tipo de documento a consultar.
   */
   obtenerTipoDocumento(id:number):void {
    this.complimentosService.getTipoDocumento(id).pipe(takeUntil(this.destroyNotifier$)).subscribe((res) => {
      this.estadoOptionsConfig.municipio=res.datos;

    });
    
  }

  /**
   * Obtiene el catálogo de municipios correspondientes a una entidad especificada.
   * 
   * Realiza una solicitud al servicio `complimentosService` para obtener los municipios
   * asociados al parámetro `entidad`. Los resultados se asignan a la propiedad `municipioCatologo`.
   * La suscripción se gestiona para finalizar automáticamente cuando se emite `destroyNotifier$`.
   *
   * @param entidad - Clave o nombre de la entidad para la cual se desean obtener los municipios.
   */
   obtenerMunicipio(entidad:string):void {
    this.complimentosService.getmunicipio(entidad).pipe(takeUntil(this.destroyNotifier$)).subscribe((res) => {
  this.municipioCatologo = res.datos;
    });
    
  }

  /**
   * Obtiene el estado IMEX de una entidad específica y actualiza la propiedad `estadoImmex` con los datos recibidos.
   * 
   * @param entidad - El identificador de la entidad para la cual se desea obtener el estado IMEX.
   */
  obtenerImex():void {
    this.complimentosService.getEstado().pipe(takeUntil(this.destroyNotifier$)).subscribe((res) => {
  this.estadoImmex = res.datos;
    });
    
  }

}
