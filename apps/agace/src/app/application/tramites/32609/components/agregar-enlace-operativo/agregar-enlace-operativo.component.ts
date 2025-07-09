import { ApiResponse, EntidadFederativa, InstalacionesInterface } from '../../modelos/oea-textil-registro.model';
import {
  Catalogo,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil} from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { INSTALACIONES_TABLA_DATOS, } from '../../enums/oea-textil-registro.enum';
import { OeaTextilRegistroService } from '../../services/oea-textil-registro.service';


/**
 * Componente NumeroEmpleadosBimestreComponent para la gestión de vehículos dentro del sistema.
 * 
 * Este componente independiente (`standalone`) se encarga de la interacción con la tabla dinámica,
 * el manejo de formularios reactivos, y la visualización de notificaciones. Proporciona una interfaz
 * intuitiva para la gestión de vehículos registrados.
 * 
 * @component
 * @selector app-vehiculos
 * @standalone true
 * @imports CommonModule, TablaDinamicaComponent, TituloComponent, ReactiveFormsModule, NotificacionesComponent
 * @templateUrl ./Empleado.component.html
 * @styleUrl ./Empleado.component.scss
 */
@Component({
  selector: 'app-agregar-enlace-operativo',
  standalone: true,
  imports: [
    CommonModule,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './agregar-enlace-operativo.component.html',
  styleUrl: './agregar-enlace-operativo.component.scss',
})
export class AgregarEnlaceOperativoComponent implements OnInit, OnDestroy, OnChanges {

  /**
   * Indica si el componente está en modo de edición.
   * Cuando es `true`, se permite la edición de los datos del formulario.
   */
  forma!: FormGroup;

    /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Lista de instalaciones que se mostrarán en la tabla.
   * Esta lista se utiliza para mostrar las instalaciones disponibles en el formulario.
   */
  @Input() instalacionesList: InstalacionesInterface[] = [] as InstalacionesInterface[];

  /**
   * Propiedad de entrada para resetear la selección de la tabla desde el componente padre.
   * Cuando cambia a true, se limpia la selección de la tabla.
   */
  @Input() resetTableSelection: boolean = false;

    /**
   * Tipo de selección de tabla (CHECKBOX).
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración para las columnas de la tabla de vehículos.
   */
  ParqueVehicular = INSTALACIONES_TABLA_DATOS;

  /**
   * Lista de filas seleccionadas en la tabla de mercancías.
   */
  listaFilaSeleccionadaEmpleado: InstalacionesInterface[] = [] as InstalacionesInterface[];

  
  /**
   * Fila seleccionada en la tabla de mercancías.
   */
  filaSeleccionadaNumeroEmpleados!: InstalacionesInterface;

  /**
   * Lista de entidades federativas para el catálogo.
   * Se utiliza para seleccionar la entidad federaliva en el formulario.
   */
  entidadFederalivaList: Catalogo[] = [] as Catalogo[];

  /**
   * Evento que se emite cuando se seleccionan instalaciones.
   * Envía los datos de las instalaciones seleccionadas al componente padre.
   */
  @Output() instalacionesSeleccionadas = new EventEmitter<InstalacionesInterface[]>();

  /**
   * Subject utilizado para rastrear la destrucción del componente.
   * Ayuda a cancelar la suscripción de observables para evitar fugas de memoria.
   */
  destroyed$: Subject<void> = new Subject();

  /**
   * Constructor para NumeroEmpleadosBimestreComponent.
   * Inicializa el formulario e inyecta los servicios necesarios.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param tramite32609Store - Store para gestionar el estado relacionado con el Trámite 32609.
   */
  constructor(
    public fb: FormBuilder,
    private consultaioQuery: ConsultaioQuery,
    private servicio: OeaTextilRegistroService
  ) {
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe();
  }

  /**
   * Método del ciclo de vida que se ejecuta cuando el componente se inicializa.
   * - Se suscribe a `selectTramite32609$` para obtener datos del estado.
   * - Actualiza `seccionState` con la información más reciente del estado.
   * - Asigna `InstalacionesInterfaceDatos` a `enlaceOperativoList`.
   *
   * La suscripción está gestionada con `takeUntil(this.destroyed$)`
   * para garantizar la limpieza cuando el componente se destruye.
   */
  ngOnInit(): void {
    this.getEntidadesFederativas();
    this.crearFormulario();
  }

  /**
   * Crea el formulario reactivo para el registro de vehículos.
   */
  crearFormulario(): void {
    this.forma = this.fb.group({
      entidadFederaliva: [null]
    });
  }

  /**
   * Método para guardar los datos del formulario.
   * Actualiza el estado del formulario en el store.
   */
  getEntidadesFederativas(): void {
      this.servicio.getEntidadesFederativas().pipe(takeUntil(this.destroyed$)).subscribe((resp: ApiResponse<EntidadFederativa>) => {
      this.entidadFederalivaList = resp.data;
      });
  }

  alCambiarEntidadFederaliva(_event: Event): void {
   this.servicio.getInstalacionesDatos().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((resp: ApiResponse<InstalacionesInterface>) => {
      this.instalacionesList = resp.data;
    });
  }

  /**
   * Maneja la fila seleccionada en la tabla de mercancías.
   * fila Fila seleccionada.
   */
  manejarFilaSeleccionada(fila: InstalacionesInterface[]): void {
    this.listaFilaSeleccionadaEmpleado = fila;
    if (fila.length > 0) {
      this.filaSeleccionadaNumeroEmpleados = fila[fila.length - 1];
    } else {
      this.filaSeleccionadaNumeroEmpleados = {} as InstalacionesInterface;
    }
    this.instalacionesSeleccionadas.emit(fila);
  }

  /**
   * Resetea la selección de la tabla.
   * Limpia la lista de filas seleccionadas y la fila seleccionada actual.
   */
  resetearSeleccionTabla(): void {
    this.listaFilaSeleccionadaEmpleado = [];
    this.filaSeleccionadaNumeroEmpleados = {} as InstalacionesInterface;
    
    // Resetear el formulario para limpiar el dropdown
    this.forma.reset();
    this.forma.patchValue({
      entidadFederaliva: null
    });
    
    // Limpiar la lista de instalaciones
    this.instalacionesList = [];
    
    // Emitir un array vacío para notificar al padre que la selección se ha limpiado
    this.instalacionesSeleccionadas.emit([]);
  }

  /**
   * Detecta cambios en las propiedades de entrada del componente.
   * @param changes - Objeto que contiene los cambios en las propiedades de entrada
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Si la propiedad resetTableSelection cambió y es true, resetear la selección
    if (changes['resetTableSelection'] && changes['resetTableSelection'].currentValue === true) {
      // Usar setTimeout para asegurar que la vista esté completamente renderizada
      setTimeout(() => {
        this.resetearSeleccionTabla();
      }, 0);
    }
  }

  /**
   * @method ngOnDestroy
   * Hook de ciclo de vida que se ejecuta al destruir el componente.
   * Libera recursos y suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
