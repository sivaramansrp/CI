import { Component, Input, OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { InputCheckComponent, TablaDinamicaComponent, TablaSeleccion, TablePaginationComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Programa140101State, Tramite140101Store } from '../../../../estados/tramites/tramite140101.store';
import { ProgramaACancelar,TABLE_ID} from '../../../../shared/models/programa-cancelar.model';
import { PROGRAMA_TABLA } from '../../../../shared/constantes/programa.enum';
import { ProgramaACancelarService } from '../../services/programACancelar.service';
import { Tramite140101Query } from '../../../../estados/queries/tramite140101.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src/core/services/shared/validaciones-formulario/validaciones-formulario.service';

/**
 * Componente encargado de gestionar la sección "Programa a Cancelar" dentro del trámite 140101.
 * Permite visualizar, seleccionar y confirmar la cancelación de un programa, mostrando los datos
 * en una tabla dinámica y gestionando el formulario asociado.
 *
 * - Inicializa y mantiene el estado del formulario reactivo.
 * - Carga los datos de los programas disponibles para cancelar.
 * - Permite la selección de un programa y actualiza el estado global.
 * - Soporta modo solo lectura para escenarios donde la edición no está permitida.
 * - Gestiona la suscripción y limpieza de recursos para evitar fugas de memoria.
 *
 * @example
 * <app-programa-a-cancelar [soloLectura]="true"></app-programa-a-cancelar>
 *
 * @see ProgramaACancelarService
 * @see Tramite140101Store
 * @see Tramite140101Query
 */
@Component({
  selector: 'app-programa-a-cancelar',
  templateUrl: './programaACancelar.component.html',
  styleUrls: ['./programaACancelar.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputCheckComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    TablePaginationComponent,
    TituloComponent
  ]
})
export class ProgramaACancelarComponent implements OnInit, OnDestroy {
  /**
   * Grupo de formularios para gestionar los controles del formulario en el componente.
   */
  public ProgramaForm!: FormGroup;
  
  /**
   * Notificador utilizado para destruir suscripciones activas en el componente.
   * Se utiliza comúnmente en el patrón de diseño para evitar fugas de memoria
   * al desuscribirse de observables cuando el componente se destruye.
   *
   * @example
   * ```typescript
   * this.someObservable.pipe(
   *   takeUntil(this.destroyNotifier$)
   * ).subscribe(data => {
   *   // Manejo de datos
   * });
   * ```
   *
   * @see {@link Subject}
   */
  public destroyNotifier$: Subject<void> = new Subject();
  
  /**
   * Estado de la sección Programa A Cancelar.
   */
  public ProgramaState!: Programa140101State;
  
  /**
   * Identificador único asociado a la tabla.
   * Este valor se inicializa con el identificador proporcionado por `TableId`.
   */
  public Id:string = TABLE_ID;
  

  /**
   * Encabezado de la tabla utilizado en el componente.
   * 
   * Esta propiedad almacena la configuración de los encabezados de la tabla
   * para el programa a cancelar, utilizando la constante `PROGRAMA_TABLA`.
   * 
   * @see PROGRAMA_TABLA
   */
  public encabezadoDeTabla = PROGRAMA_TABLA;

  /**
   * Datos que se mostrarán en la tabla.
   */
  public datosTabla: ProgramaACancelar[] = [];

  /**
   * Número total de elementos en la tabla.
   */
  public totalItems = 0;

  /**
   * Número de página actual para la paginación.
   */
  public currentPage = 1;

  /**
   * Número de elementos por página para la paginación.
   */
  public itemsPerPage = 5;

  /**
   * Enumeración para la selección de la tabla.
   */
  public TablaSeleccion = TablaSeleccion;

  /**
   * ID del botón de radio seleccionado en la tabla.
   */
  public radioId!: number;

  /**
   * Indica si el componente debe estar en modo solo lectura.
   * Cuando es `true`, los elementos del componente no serán editables.
   * @default false
   */
  @Input() soloLectura: boolean = false;

  /**
   * Constructor del componente ProgramaACancelar.
   * 
   * @param fb Servicio para la creación y gestión de formularios reactivos.
   * @param programaACancelarService Servicio encargado de la lógica relacionada con el programa a cancelar.
   * @param formValidator Servicio para validaciones personalizadas de formularios.
   * @param tramite140101Store Almacén de estado para el trámite 140101.
   * @param tramite140101Query Consultas y selectores para el estado del trámite 140101.
   * 
   * El constructor se utiliza para la inyección de dependencias necesarias en el componente.
   */
  constructor(
    private fb: FormBuilder,
    private programaACancelarService: ProgramaACancelarService,
    private formValidator: ValidacionesFormularioService,
    private tramite140101Store: Tramite140101Store,
    private tramite140101Query: Tramite140101Query
  ) {
   // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Hook del ciclo de vida que se llama después de que el componente se inicializa.
   * Carga los datos e inicializa el formulario.
   */
  ngOnInit(): void {
    this.cargarDatos();
    this.inicializarFormulario();
  }
  
  /**
   * Inicializa el formulario `ProgramaForm` con los valores actuales del estado `ProgramaState`.
   * 
   * - Suscribe al observable `selectSolicitud$` para actualizar el estado local `ProgramaState` cuando cambie.
   * - Crea el formulario reactivo con los valores correspondientes, algunos de ellos deshabilitados según el contexto.
   * - Asigna valores auxiliares como `radioId` y `datosTabla` desde el estado.
   * - Si la propiedad `soloLectura` es verdadera, deshabilita todo el formulario para evitar modificaciones.
   * 
   * @remarks
   * Este método debe llamarse durante la inicialización del componente para asegurar que el formulario refleje el estado más reciente.
   */
  inicializarFormulario(): void {
      this.tramite140101Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.ProgramaState = seccionState;
          })
        )
        .subscribe();

      this.ProgramaForm = this.fb.group({
      folioPrograma: [{ value: this.ProgramaState?.programaACancelar?.folioPrograma, disabled: true }],
      idProgramaSeleccionado: [this.ProgramaState?.programaACancelar?.idProgramaSeleccionado],
      modalidad: [{ value: this.ProgramaState?.programaACancelar?.modalidad, disabled: true }],
      representacionFederal: [{ value: this.ProgramaState?.programaACancelar?.representacionFederal, disabled: true }],
      tipoPrograma: [{ value: this.ProgramaState?.programaACancelar?.tipoPrograma, disabled: true }],
      estatus: [{ value: this.ProgramaState?.programaACancelar?.estatus, disabled: true }],
      solicitudObservaciones: [this.ProgramaState?.solicitudObservaciones, Validators.required],
      confirmar: [this.ProgramaState?.confirmar, Validators.requiredTrue],
    });

    this.radioId = this.ProgramaState?.radio;
    this.datosTabla = this.ProgramaState?.datos;
    if(this.soloLectura) {
      this.ProgramaForm.disable();
    }
  }

    /**
     * Carga los datos utilizando el servicio `programaACancelarService` y actualiza la tabla de datos.
     * 
     * - Realiza una suscripción al observable devuelto por `obtenerDatos()`.
     * - Convierte la respuesta en un arreglo si no lo es.
     * - Actualiza la propiedad `datosTabla` con los datos obtenidos.
     * - Almacena los datos en el store `tramite140101Store`.
     * - La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$`.
     * 
     * @returns {void} No retorna ningún valor.
     */
    cargarDatos(): void {
    this.programaACancelarService.obtenerDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.datosTabla = Array.isArray(data) ? data : [data];
        this.tramite140101Store.setDatosData(this.datosTabla);
      });
  }

  /**
   * Actualiza el store con el valor de un campo específico del formulario.
   * 
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo a actualizar.
   * @param metodoNombre - El nombre del método del store a llamar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite140101Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite140101Store[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Verifica si un campo específico del formulario es válido.
   *
   * @param field - El nombre del campo del formulario a validar.
   * @returns `true` si el campo es válido, `false` si no lo es, o `null` si no se puede determinar.
   */
  isValid(field: string): boolean | null {
    return this.formValidator.isValid(this.ProgramaForm, field);
  }

  /**
   * Maneja la selección de una fila en la tabla.
   * Actualiza el formulario y el store con los datos de la fila seleccionada.
   * 
   * @param row - Los datos de la fila seleccionada.
   */
  valorDeAlternancia(row: ProgramaACancelar): void {
    this.tramite140101Store.setPrograma(row);
    const INDEX = this.datosTabla.findIndex((x) => x.idProgramaSeleccionado === row.idProgramaSeleccionado);
    this.radioId = INDEX;
    this.tramite140101Store.setRadioSelection(INDEX);
    this.ProgramaForm.patchValue({
      folioPrograma: row.folioPrograma,
      idProgramaSeleccionado: row.idProgramaSeleccionado,
      modalidad: row.modalidad,
      representacionFederal: row.representacionFederal,
      tipoPrograma: row.tipoPrograma,
      estatus: row.estatus,
    });
  }

  /**
   * Hook del ciclo de vida que se llama cuando el componente se destruye.
   * Limpia las suscripciones y notifica a los observables para que se completen.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
