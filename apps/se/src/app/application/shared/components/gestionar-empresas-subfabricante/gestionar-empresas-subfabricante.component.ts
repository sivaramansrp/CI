import {
  Catalogo,
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  DatosSubcontratista,
  PlantasSubfabricante,
} from '../../models/empresas-subfabricanta.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ComplimentosService } from '../../services/complimentos.service';
import { ContenedorComplementarPlantasComponent } from '../../../tramites/80101/component/contenedor-complementar-plantas/contenedor-complementar-plantas.component';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-gestionar-empresas-subfabricante',
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    ContenedorComplementarPlantasComponent
  ],
  templateUrl: './gestionar-empresas-subfabricante.component.html',
  styleUrl: './gestionar-empresas-subfabricante.component.scss',
})
/**
 * Componente para gestionar las empresas subfabricantes.
 * Este componente permite gestionar los datos de las empresas subfabricantes,
 * incluyendo la selección de plantas, la configuración de la tabla y el cambio de estados.
 */
export class GestionarEmpresasSubfabricantesComponent implements OnInit {
  /**
   * Lista de estados del catálogo. Esta propiedad almacena los diferentes estados disponibles para ser seleccionados.
   * @property {Catalogo[]} _estadoCatalogo
   * @private
   * @description Esta propiedad privada contiene un array de objetos `Catalogo`, que representan los diferentes estados disponibles.
   */
  private _estadoCatalogo: Catalogo[] = [];

  /**
   * Datos de las plantas subfabricantes disponibles. Esta propiedad almacena las plantas que están disponibles para el proceso.
   * @property {PlantasSubfabricante[]} _datosTablaSubfabricantesDisponibles
   * @private
   * @description Esta propiedad privada contiene un array de objetos `PlantasSubfabricante`, que representan las plantas disponibles para ser seleccionadas.
   */
  private _datosTablaSubfabricantesDisponibles: PlantasSubfabricante[] = [];

  /**
   * Configuración de la tabla para las plantas disponibles. Define cómo se deben mostrar las columnas de las plantas disponibles en la tabla.
   * @property {ConfiguracionColumna<PlantasSubfabricante>[]} _configuracionTablaDisponibles
   * @private
   * @description Esta propiedad privada contiene un array de objetos `ConfiguracionColumna`, que describen la configuración de la tabla para las plantas disponibles.
   */
  private _configuracionTablaDisponibles: ConfiguracionColumna<PlantasSubfabricante>[] =
    [];

  /**
   * Configuración de la tabla para las plantas seleccionadas. Define cómo se deben mostrar las columnas de las plantas seleccionadas en la tabla.
   * @property {ConfiguracionColumna<PlantasSubfabricante>[]} _configuracionTablaSeleccionadas
   * @private
   * @description Esta propiedad privada contiene un array de objetos `ConfiguracionColumna`, que describen la configuración de la tabla para las plantas seleccionadas.
   */
  private _configuracionTablaSeleccionadas: ConfiguracionColumna<PlantasSubfabricante>[] =
    [];
  /**
   * Datos de las plantas subfabricantes seleccionadas. Esta propiedad almacena las plantas que han sido seleccionadas por el usuario.
   * @property {PlantasSubfabricante[]} _datosTablaSubfabricantesSeleccionadas
   * @private
   * @description Esta propiedad privada contiene un array de objetos `PlantasSubfabricante`, que representan las plantas seleccionadas por el usuario.
   */
  private _datosTablaSubfabricantesSeleccionadas: PlantasSubfabricante[] = [];
  /**
   * Formulario de datos del subcontratista. Este formulario contiene los campos necesarios para registrar o editar los datos de un subcontratista.
   * @property {FormGroup} _formularioDatosSubcontratista
   * @private
   * @description Esta propiedad privada almacena el formulario de datos del subcontratista, que incluye campos como el RFC y estado del subcontratista.
   */
  private _formularioDatosSubcontratista!: FormGroup;

  @Input() tabIndex: number = 0;

    /**
     * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
     */
    private destroyNotifier$: Subject<void> = new Subject();

  
  /**
   * Recibe un arreglo de objetos de tipo Catalogo que representa el estado actual del catálogo.
   * Este input se utiliza para mostrar o manipular la información relacionada con el catálogo en el componente.
   *
   * @type {Catalogo[]}
   */
  estadoCatalogo!:Catalogo[];

  /**
   * Indica si se debe mostrar la tabla inicial.
   * Esta propiedad se utiliza para controlar la visibilidad de la tabla de subfabricantes.
   *
   * @type {boolean}
   * @default false
   */
  @Input() showTablaInicial: boolean = false;

  /**
   * Establece los datos de las plantas subfabricantes disponibles en la tabla.
   * @param valor - Lista de plantas subfabricante disponibles.
   */
  @Input()
  set datosTablaSubfabricantesDisponibles(valor: PlantasSubfabricante[]) {
    this._datosTablaSubfabricantesDisponibles = valor;
  }

  /**
   * Obtiene los datos de las plantas subfabricantes disponibles.
   * @returns {PlantasSubfabricante[]} - Lista de plantas subfabricante disponibles.
   */
  get datosTablaSubfabricantesDisponibles(): PlantasSubfabricante[] {
    return this._datosTablaSubfabricantesDisponibles;
  }

  /**
   * Establece la configuración de la tabla de plantas subfabricantes disponibles.
   * @param valor - Configuración de columnas para las plantas disponibles.
   */
  @Input()
  set configuracionTablaDisponibles(
    valor: ConfiguracionColumna<PlantasSubfabricante>[]
  ) {
    this._configuracionTablaDisponibles = valor;
  }

  /**
   * Obtiene la configuración de la tabla de plantas subfabricantes disponibles.
   * @returns {ConfiguracionColumna<PlantasSubfabricante>[]} - Configuración de la tabla.
   */
  get configuracionTablaDisponibles(): ConfiguracionColumna<PlantasSubfabricante>[] {
    return this._configuracionTablaDisponibles;
  }

  /**
   * Establece la configuración de la tabla de plantas subfabricantes seleccionadas.
   * @param valor - Configuración de columnas para las plantas seleccionadas.
   */
  @Input()
  set configuracionTablaSeleccionadas(
    valor: ConfiguracionColumna<PlantasSubfabricante>[]
  ) {
    this._configuracionTablaSeleccionadas = valor;
  }

  /**
   * Obtiene la configuración de la tabla de plantas subfabricantes seleccionadas.
   * @returns {ConfiguracionColumna<PlantasSubfabricante>[]} - Configuración de la tabla.
   */
  get configuracionTablaSeleccionadas(): ConfiguracionColumna<PlantasSubfabricante>[] {
    return this._configuracionTablaSeleccionadas;
  }

  /**
   * Establece los datos de las plantas subfabricantes seleccionadas en la tabla.
   * @param valor - Lista de plantas subfabricante seleccionadas.
   */
  @Input()
  set datosTablaSubfabricantesSeleccionadas(valor: PlantasSubfabricante[]) {
    this._datosTablaSubfabricantesSeleccionadas = valor;
  }

  /**
   * Obtiene los datos de las plantas subfabricantes seleccionadas.
   * @returns {PlantasSubfabricante[]} - Lista de plantas subfabricante seleccionadas.
   */
  get datosTablaSubfabricantesSeleccionadas(): PlantasSubfabricante[] {
    return this._datosTablaSubfabricantesSeleccionadas;
  }

  @Input()
  /**
   * Establece el formulario de datos del subcontratista.
   * @param valor - Formulario reactivo con los datos del subcontratista.
   */
  set formularioDatosSubcontratista(valor: FormGroup) {
    this._formularioDatosSubcontratista.setValue(valor.value);
  }

  /**
   * Obtiene el formulario de datos del subcontratista.
   * @returns {FormGroup} - El formulario de datos del subcontratista.
   */
  get formularioDatosSubcontratista(): FormGroup {
    return this._formularioDatosSubcontratista;
  }

  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Evento emitido cuando cambia el RFC del subcontratista.
   * @event alCambiarRFC
   * @type {EventEmitter<DatosSubcontratista>}
   * @description Este evento se emite cuando se realiza un cambio en el RFC del subcontratista.
   */
  @Output() alCambiarRFC = new EventEmitter<DatosSubcontratista>();

  /**
   * Evento emitido cuando cambia el estado seleccionado.
   * @event alCambiarEstado
   * @type {EventEmitter<Catalogo>}
   * @description Este evento se emite cuando el usuario selecciona un nuevo estado para el subcontratista.
   */
  @Output() alCambiarEstado = new EventEmitter<Catalogo>();

  /**
   * Evento emitido para iniciar una búsqueda.
   * @event buscar
   * @type {EventEmitter}
   * @description Este evento se emite cuando el usuario solicita realizar una búsqueda.
   */
  @Output() buscar = new EventEmitter();

  /**
   * Evento emitido cuando se seleccionan plantas para agrupar.
   * @event plantasPorAgrupar
   * @type {EventEmitter<PlantasSubfabricante[]>}
   * @description Este evento se emite cuando el usuario selecciona plantas para agrupar.
   */
  @Output() plantasPorAgrupar = new EventEmitter<PlantasSubfabricante[]>();

  /**
   * Evento emitido cuando se seleccionan plantas para eliminar.
   * @event plantasPorEliminar
   * @type {EventEmitter<PlantasSubfabricante[]>}
   * @description Este evento se emite cuando el usuario selecciona plantas para eliminar.
   */
  @Output() plantasPorEliminar = new EventEmitter<PlantasSubfabricante[]>();

  @Output() plantasPorComplementar = new EventEmitter<PlantasSubfabricante[]>();

  /**
   * Tipo de selección de la tabla.
   * @property {TablaSeleccion} tablaSeleccion
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Lista de plantas disponibles seleccionadas por el usuario.
   * @property {PlantasSubfabricante[]} plantasDisponiblesSeleccionadas
   * @description Esta propiedad almacena las plantas que el usuario ha seleccionado de la lista de plantas disponibles.
   */
  plantasDisponiblesSeleccionadas: PlantasSubfabricante[] = [];

  /**
   * Lista de plantas seleccionadas para algún proceso posterior.
   * @property {PlantasSubfabricante[]} plantasSeleccionadas
   * @description Esta propiedad almacena las plantas que han sido seleccionadas por el usuario para realizar algún proceso (como eliminación o agrupación).
   */
  plantasSeleccionadas: PlantasSubfabricante[] = [];


/**
 * Reference to the currently open modal instance.
 * Used to control the modal's state and perform actions such as closing or updating its content.
 * 
 * @private
 * @type {Modal | null}
 */
private modalRef: Modal | null = null;

  /**
   * Constructor para inicializar el formulario de datos del subcontratista.
   * @param fb - FormBuilder para la creación del formulario reactivo.
   */
  constructor(private fb: FormBuilder, private router: Router,private complimentosService: ComplimentosService) {
    this.inicializarFormularioDatosSubcontratista();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Si el formulario está deshabilitado (`formularioDeshabilitado` es verdadero),
   * desactiva el formulario de datos del subcontratista para evitar modificaciones.
   */
  ngOnInit(): void {
    if (this.formularioDeshabilitado) {
      this._formularioDatosSubcontratista.disable();
    }
    this.obtenerEstados();
  }
  /**
   * Inicializa el formulario de datos del subcontratista con los campos `rfc` y `estado`, ambos requeridos.
   * @method inicializarFormularioDatosSubcontratista
   * @description Este método configura el formulario de datos del subcontratista con los campos `rfc` y `estado`, ambos con validación requerida.
   */
  inicializarFormularioDatosSubcontratista(): void {
    this._formularioDatosSubcontratista = this.fb.group({
      rfc: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  /**
   * Emite el evento con el RFC y el estado actual del subcontratista.
   * @method cambiarRFC
   * @description Este método emite el evento `alCambiarRFC` con los valores del RFC y estado del formulario actual.
   */
  cambiarRFC(): void {
    this.alCambiarRFC.emit({
      rfc: this.formularioDatosSubcontratista.get('rfc')?.value,
      estado: this.formularioDatosSubcontratista.get('estado')?.value,
    });
  }

  /**
   * Emite el evento con el estado seleccionado si el RFC está presente en el formulario.
   * @method cambiarEstado
   * @param {Catalogo} estadoSeleccionado - El objeto que contiene el estado seleccionado por el usuario.
   * @description Este método emite el evento `alCambiarEstado` con el estado seleccionado solo si el RFC ya está ingresado en el formulario.
   */
  cambiarEstado(estadoSeleccionado: Catalogo): void {
    if (this.formularioDatosSubcontratista.get('rfc')?.value) {
      this.alCambiarEstado.emit(estadoSeleccionado);
    }
  }

  /**
   * Emite el evento de búsqueda.
   * @method onBuscar
   * @description Este método emite el evento `buscar` para iniciar el proceso de búsqueda.
   */
  onBuscar(): void {
    this.buscar.emit();
  }

  /**
   * Hides the modal dialog associated with the 'complementarPlanta' element.
   * Initializes the modal reference if the element exists and then hides the modal.
   */
  setGuardar(): void {
   const modalElement = document.getElementById('complementarPlanta');
    if (modalElement) {
      this.modalRef = new Modal(modalElement);
      this.modalRef.hide();
    }
  }

  /**
   * Asigna las plantas seleccionadas de la lista de plantas disponibles.
   * @method onPlantasDisponiblesSeleccionadas
   * @param {PlantasSubfabricante[]} plantasDisponiblesSeleccionadas - Lista de plantas seleccionadas por el usuario.
   * @description Este método asigna las plantas seleccionadas a la propiedad `plantasDisponiblesSeleccionadas` si hay elementos seleccionados.
   */
  onPlantasDisponiblesSeleccionadas(
    plantasDisponiblesSeleccionadas: PlantasSubfabricante[]
  ): void {
    if (plantasDisponiblesSeleccionadas.length > 0) {
      this.plantasDisponiblesSeleccionadas = plantasDisponiblesSeleccionadas;
    }
  }

  /**
   * Emite el evento para agrupar las plantas seleccionadas.
   * @method agregarPlantas
   * @description Este método emite el evento `plantasPorAgrupar` con las plantas disponibles seleccionadas.
   */
  agregarPlantas(): void {
    if (this.plantasDisponiblesSeleccionadas.length > 0) {
      // Emitir el evento con las plantas seleccionadas
      this.plantasPorAgrupar.emit(this.plantasDisponiblesSeleccionadas);
      
      // Remover las plantas seleccionadas de la lista de disponibles
      this._datosTablaSubfabricantesDisponibles = this._datosTablaSubfabricantesDisponibles.filter(
        planta => !this.plantasDisponiblesSeleccionadas.some(
          plantaSeleccionada => planta.rfc === plantaSeleccionada.rfc && 
                               planta.razonSocial === plantaSeleccionada.razonSocial &&
                               planta.calle === plantaSeleccionada.calle &&
                               planta.numExterior === plantaSeleccionada.numExterior
        )
      );
      
      // Limpiar la selección
      this.plantasDisponiblesSeleccionadas = [];
    }
  }

  /**
   * Asigna las plantas seleccionadas para algún proceso posterior.
   * @method onPlantasSeleccionadas
   * @param {PlantasSubfabricante[]} plantasSeleccionadas - Lista de plantas seleccionadas por el usuario.
   * @description Este método asigna las plantas seleccionadas a la propiedad `plantasSeleccionadas`.
   */
  onPlantasSeleccionadas(plantasSeleccionadas: PlantasSubfabricante[]): void {
    if (plantasSeleccionadas.length > 0) {
      this.plantasSeleccionadas = plantasSeleccionadas;
    }
  }

  /**
   * Emite el evento para eliminar las plantas seleccionadas.
   * @method eliminarPlantas
   * @description Este método emite el evento `plantasPorEliminar` con las plantas seleccionadas para ser eliminadas.
   */
  eliminarPlantas(): void {
    if (this.plantasSeleccionadas.length > 0) {
      // Agregar las plantas de vuelta a la lista de disponibles
      const PLANTAS_A_RESTAURAR = this.plantasSeleccionadas.filter(plantaSeleccionada => {
        // Verificar que la planta no esté ya en la lista de disponibles
        return !this._datosTablaSubfabricantesDisponibles.some(
          planta => planta.rfc === plantaSeleccionada.rfc && 
                   planta.razonSocial === plantaSeleccionada.razonSocial &&
                   planta.calle === plantaSeleccionada.calle &&
                   planta.numExterior === plantaSeleccionada.numExterior
        );
      });
      
      // Crear nueva array de disponibles con las plantas restauradas
      this._datosTablaSubfabricantesDisponibles = [
        ...this._datosTablaSubfabricantesDisponibles,
        ...PLANTAS_A_RESTAURAR
      ];
      
      // Emitir el evento para eliminar
      this.plantasPorEliminar.emit(this.plantasSeleccionadas);
      
      // Limpiar la selección
      this.plantasSeleccionadas = [];
    }
  }

  /**
   * Emite el evento para complementar las plantas seleccionadas.
   * @returns {void}
   */
  complementarPlantas(): void {
    if (this.plantasSeleccionadas.length > 0) {
      this.plantasPorComplementar.emit(this.plantasSeleccionadas);
    }
    
  }

    /**
   * Obtiene la lista de estados llamando al servicio `complimentosService`.
   * Se suscribe al observable retornado por `getEstado()` y muestra la respuesta en la consola.
   * La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$`.
   */
  obtenerEstados():void {
      this.complimentosService.getEstado().pipe(takeUntil(this.destroyNotifier$)).subscribe((res) => {
        this.estadoCatalogo = res.datos;
      });
      
    }
}
