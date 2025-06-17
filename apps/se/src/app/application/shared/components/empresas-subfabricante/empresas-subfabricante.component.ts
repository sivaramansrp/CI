import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
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
import { CommonModule } from '@angular/common';
import { DetallesPlantasComponent } from '../detalles-plantas/detalles-plantas.component';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'empresass-subfabricante',
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    DetallesPlantasComponent
  ],
  templateUrl: './empresas-subfabricante.component.html',
  styleUrl: './empresas-subfabricante.component.scss',
})
/**
 * Componente para gestionar las empresas subfabricantes.
 * Este componente permite gestionar los datos de las empresas subfabricantes,
 * incluyendo la selección de plantas, la configuración de la tabla y el cambio de estados.
 */
export class EmpresasSubfabricantesComponent implements OnInit {

  /**
   * Referencia al elemento modal para complementar plantas.
   * 
   * Esta propiedad utiliza el decorador `@ViewChild` para obtener una referencia
   * al elemento del DOM identificado por el template variable `complementarPlantas`.
   * 
   * @type {ElementRef} modalElement - Referencia al elemento modal.
   */
  @ViewChild('complementarPlantas') modalElement!: ElementRef;
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
   * Establece el estado del catálogo de las plantas subfabricantes.
   * @param valor - Lista de estados del catálogo.
   */
  @Input()
  set estadoCatalogo(valor: Catalogo[]) {
    this._estadoCatalogo = valor;
  }

  /**
   * Obtiene el estado del catálogo.
   * @returns {Catalogo[]} - Lista de estados del catálogo.
   */
  get estadoCatalogo(): Catalogo[] {
    return this._estadoCatalogo;
  }

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
  /** Indica si el formulario debe mostrarse en modo solo lectura.  
 *  Controla la habilitación o deshabilitación de los campos. */
  esFormularioSoloLectura: boolean = false;
  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Constructor para inicializar el formulario de datos del subcontratista.
   * @param fb - FormBuilder para la creación del formulario reactivo.
   */
  constructor(private fb: FormBuilder, private router: Router,private consultaioQuery: ConsultaioQuery,  
  ) { 
       this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        
          this.inicializarCertificadoFormulario();
        })
      )
      .subscribe();
    }
     /**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarCertificadoFormulario();
  }
 /**
   * Método para inicializar el formulario reactivo con los datos de la solicitud.
   * 
   * Este método configura los campos del formulario con los valores actuales del estado de la solicitud
   * y aplica las validaciones necesarias. También deshabilita ciertos campos y establece valores predeterminados.
   */
  inicializarCertificadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     this.inicializarFormularioDatosSubcontratista();
    }  
  }
    /**
   * @comdoc
   * Guarda los datos del formulario de combinación requerida.
   * 
   * Inicializa el formulario y ajusta su estado de habilitación según si es de solo lectura.
   * - Si el formulario es de solo lectura, lo deshabilita.
   * - Si no es de solo lectura, lo habilita.
   * - Si no aplica ninguna de las condiciones anteriores, no realiza ninguna acción adicional.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormularioDatosSubcontratista();
      if (this.esFormularioSoloLectura) {
        this._formularioDatosSubcontratista.disable();        
      } else {
        this._formularioDatosSubcontratista.enable();       
      }
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
    this.plantasPorAgrupar.emit(this.plantasDisponiblesSeleccionadas);
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
      this.plantasPorEliminar.emit(this.plantasSeleccionadas);
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
   * Abre un diálogo modal para complementar la información de una planta.
   * 
   * Este método verifica si el elemento modal (`modalElement`) está definido.
   * Si está definido, crea una instancia de la clase `Modal` utilizando el 
   * elemento nativo del modal y muestra el modal llamando al método `show()`.
   * 
   * @returns {void} Este método no devuelve ningún valor.
   */
  abrirDialogoComplementarPlanta(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
}
