import { Component, Input, OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { InputCheckComponent, TablaDinamicaComponent, TablaSeleccion, TablePaginationComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Programa140101State, Tramite140101Store } from '../../../../estados/tramites/tramite140101.store';
import { ProgramaACancelar,TABLE_ID} from '../../../../shared/models/programa-cancelar.model';
import { ProgramaACancelarService } from '../../services/programACancelar.service';
import { Tramite140101Query } from '../../../../estados/queries/tramite140101.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src/core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { PROGRAMA_TABLA } from '../../../../shared/constantes/programa.enum';


/**
 * Componente que representa la sección de Programa A Cancelar.
 * Este componente es responsable de gestionar el formulario y los datos de la tabla
 * relacionados con la cancelación de un programa.
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
   * Configuración de las columnas de la tabla mostrada en el componente.
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

  @Input() soloLectura: boolean = false;

  /**
   * Constructor del componente.
   * Inicializa el grupo de formularios e inyecta los servicios requeridos.
   * 
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param programaACancelarService - Servicio para gestionar los datos de Programa A Cancelar.
   * @param tramite140101Store - Store para gestionar el estado de Trámite 140101.
   * @param tramite140101Query - Servicio de consulta para acceder al estado de Trámite 140101.
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
   * Inicializa el formulario con datos del estado.
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
   * Carga los datos para el componente utilizando el servicio.
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
