import { Component, OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TablePaginationComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Programa140101State, Tramite140101Store } from '../../../../estados/tramites/tramite140101.store';
import { programaACancelar,tableId} from '../../../../shared/models/ProgramaACancelar.model';
import { ProgramaACancelarService } from '../../services/programACancelar.service';
import { Tramite140101Query } from '../../../../estados/queries/tramite140101.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src/core/services/shared/validaciones-formulario/validaciones-formulario.service';


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
  formGroup: FormGroup;

  /**
   * Subject utilizado para notificar y completar observables cuando el componente se destruye.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Objeto de suscripción para gestionar y cancelar la suscripción de observables.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Estado de la sección Programa A Cancelar.
   */
  public ProgramaState!: Programa140101State;
  
  /**
   * Identificador único asociado a la tabla.
   * Este valor se inicializa con el identificador proporcionado por `TableId`.
   */
  Id:string = tableId;
  /**
   * Configuración de las columnas de la tabla mostrada en el componente.
   */

  public encabezadoDeTabla: ConfiguracionColumna<programaACancelar>[] = [
    { encabezado: 'Folio Programa', clave: (item:programaACancelar) => item.folioPrograma, orden: 1 },
    { encabezado: 'Selecciona de Modalidad',clave: (item:programaACancelar) => item.modalidad, orden: 2 },
    { encabezado: 'Representación Federal', clave: (item:programaACancelar) => item.representacionFederal, orden: 3 },
    { encabezado: 'Tipo Programa', clave: (item:programaACancelar) => item.tipoPrograma, orden: 4 },
    { encabezado: 'Estatus', clave: (item:programaACancelar) => item.estatus, orden: 5 },
  ];

  /**
   * Datos que se mostrarán en la tabla.
   */
  datosTabla: programaACancelar[] = [];

  /**
   * Número total de elementos en la tabla.
   */
  totalItems = 0;

  /**
   * Número de página actual para la paginación.
   */
  currentPage = 1;

  /**
   * Número de elementos por página para la paginación.
   */
  itemsPerPage = 5;

  /**
   * Enumeración para la selección de la tabla.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * ID del botón de radio seleccionado en la tabla.
   */
  radioId!: number;

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
    this.formGroup = this.fb.group({
      folioPrograma: [{ value: '', disabled: true }],
      idProgramaSeleccionado: [''],
      modalidad: [{ value: '', disabled: true }],
      representacionFederal: [{ value: '', disabled: true }],
      tipoPrograma: [{ value: '', disabled: true }],
      estatus: [{ value: '', disabled: true }],
      solicitudObservaciones: ['', Validators.required],
      confirmar: [false, Validators.requiredTrue],
      radio: ['']
    });
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
    this.subscription.add(
      this.tramite140101Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.ProgramaState = seccionState;
          })
        )
        .subscribe()
    );

    this.formGroup = this.fb.group({
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
    return this.formValidator.isValid(this.formGroup, field);
  }

  /**
   * Maneja la selección de una fila en la tabla.
   * Actualiza el formulario y el store con los datos de la fila seleccionada.
   * 
   * @param row - Los datos de la fila seleccionada.
   */
  valorDeAlternancia(row: programaACancelar): void {
    this.tramite140101Store.setPrograma(row);
    const INDEX = this.datosTabla.findIndex((x) => x.idProgramaSeleccionado === row.idProgramaSeleccionado);
    this.radioId = INDEX;
    this.tramite140101Store.setRadioSelection(INDEX);
    this.formGroup.patchValue({
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
