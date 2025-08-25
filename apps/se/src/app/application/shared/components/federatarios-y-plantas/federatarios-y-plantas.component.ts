import { Component, EventEmitter, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AlertComponent, Notificacion, NotificacionesComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
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
export class FederatariosYPlantasComponent implements OnInit {
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
   * Constructor de la clase FederatariosYPlantasComponent.
   * @param {Router} router - Servicio de Angular para la navegación.
   * @param {ActivatedRoute} activatedRoute - Servicio de Angular para obtener información sobre la ruta actual.
   */
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Si el formulario está deshabilitado (`formularioDeshabilitado` es verdadero),
   * deshabilita el grupo de controles `federatariosFormGroup` para evitar la interacción del usuario.
   */
  ngOnInit(): void {
    this.initFederatariosFormGroup();
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
   * Inicializa el formulario de federatarios con sus campos y validaciones
   * @method initFederatariosFormGroup
   * @returns {void}
   */
  initFederatariosFormGroup(): void {
    this.federatariosFormGroup = new FormGroup({
      nombre: new FormControl(
        this.datosFederatarios?.nombre,
        [Validators.required, Validators.maxLength(20)]
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
      estado: new FormControl('',
        Validators.required
      ),
      estadoOptions: new FormControl('',
        Validators.required
      ),
      
    });
    this.federatariosCatalogoGroup = new FormGroup({
      estadoUno: new FormControl('',
        Validators.required
      ),
      estadoDos: new FormControl('',
        Validators.required
      ),
      estadoTres: new FormControl('',
        Validators.required
      ),
    })
  }
  /**
   * Navega a la ruta de acciones
   * @param accionesPath
   */
  irAAcciones(accionesPath: string): void {
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
}

/**
 * Adds IMMEX plant data to the `plantasImmexDatos` array.
 * This method assigns the value of `INMEX_PLANTAS` to the `plantasImmexDatos` property.
 *
 * @remarks
 * Ensure that `INMEX_PLANTAS` is properly defined and contains the expected plant data.
 */
agregarPlantas(): void {
  this.plantasImmexDatos=[INMEX_PLANTAS]

}

}
