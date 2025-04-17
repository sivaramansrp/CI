import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, InputFecha, InputFechaComponent, ListaPendientes, TablaAcciones, TablaDinamicaComponent, TablePaginationComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import { TablerosService } from '../../core/service/tabletos.service';

@Component({
  selector: 'app-seleccion-modulo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputFechaComponent, TablaDinamicaComponent, TablePaginationComponent],
  templateUrl: './seleccion-modulo.component.html',
  styleUrl: './seleccion-modulo.component.scss',
})
export class SeleccionModuloComponent implements OnInit, OnDestroy {
  /** Configuración del campo de fecha inicial */
  FECHA_INICIO = {
    labelNombre: 'Fecha inicial',
    required: false,
    habilitado: true,
  };
  /** Configuración del campo de fecha final */
  FECHA_FINAL = {
    labelNombre: 'Fecha final',
    required: false,
    habilitado: true,
  };
   /** Observable para manejar la destrucción del componente */
   private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /** Indica si el bloque de filtros está colapsado */
  colapsable: boolean = false;
  /** Formulario de búsqueda */
  public FormBusqueda!: FormGroup;
  /** Configuración del input de fecha inicial */
  public fechaInicioInput: InputFecha = this.FECHA_INICIO;
  /** Configuración del input de fecha final */
  public fechaFinalInput: InputFecha = this.FECHA_FINAL;
  /** Acciones disponibles en la tabla */
  public accionesServcios: TablaAcciones[] = [];
  /** Lista completa de pendientes obtenida del backend */
  public todosPendientes: ListaPendientes[] = [];
  /** Lista de pendientes mostrada en la página actual */
  public listaPendientesPaginados: ListaPendientes[] = [];
  /** Total de elementos (para paginación) */
  public totalItems: number = 0;
  /** Cantidad de elementos por página */
  public itemsPerPage: number = 5;
  /** Página actual */
  public currentPage: number = 1;
  /** Copia original de los pendientes (sin filtros) */
  public todosPendientesOriginales: ListaPendientes[] = [];

   

  /** Configuración de columnas de la tabla */
  public configurarTabla: ConfiguracionColumna<ListaPendientes>[] = [
    { encabezado: 'Folio tramite', clave: (item: ListaPendientes) => item.folio, orden: 1 },
    { encabezado: 'Tipo de trámite', clave: (item: ListaPendientes) => item.tipoTramite, orden: 2 },
    { encabezado: 'Nombre de la tarea', clave: (item: ListaPendientes) => item.nombreTarea, orden: 3 },
    { encabezado: 'Fecha de asignación', clave: (item: ListaPendientes) => item.fechaAsignacion, orden: 4 },
    { encabezado: 'Estado de tramite', clave: (item: ListaPendientes) => item.estatusTramite, orden: 5 }
  ]

  constructor(
    private fb: FormBuilder,
    private servicioFuncionario: TablerosService
  ) {
  }

  /** Al inicializar el componente, se cargan los pendientes */
  ngOnInit(): void {
    this.inicializaFormConsulta();
    this.getPendientesTabla();
  }

   // Inicialización del formulario de búsqueda
   inicializaFormConsulta(): void {
    this.FormBusqueda = this.fb.group({
      folio: [''],
      info: [''],
      fechaInicio: [''],
      fechaFinal: ['']
    });
  }

  /**
 * Actualiza el valor del campo 'fechaInicio' en el formulario reactivo `FormBusqueda`
 * @param nuevoValor_fechaInicio - Nuevo valor a establecer para el campo 'fechaInicio'.
 */
  public cambioFechaInicio(nuevoValor_fechaInicio: string) {
    this.FormBusqueda.get('fechaInicio')?.setValue(nuevoValor_fechaInicio);
    this.FormBusqueda.get('fechaInicio')?.markAsUntouched();
  }

  /**
 * Actualiza el valor del campo 'fechaFinal' en el formulario reactivo `FormBusqueda`
 * @param nuevoValor_fechaFinal - Nuevo valor a establecer para el campo 'fechaFinal'.
 */
  public cambioFechaFinal(nuevoValor_fechaFinal: string) {
    this.FormBusqueda.get('fechaFinal')?.setValue(nuevoValor_fechaFinal);
    this.FormBusqueda.get('fechaFinal')?.markAsUntouched();
  }

  /** Alterna el estado del bloque colapsable (mostrar/ocultar filtros) */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /** Obtiene todos los pendientes desde el backend y aplica la paginación inicial */
  public getPendientesTabla(): void {
    this.accionesServcios = [TablaAcciones.EDITAR];
    this.servicioFuncionario.getListaPendientes().subscribe((data) => {
      this.todosPendientesOriginales = data;
      this.todosPendientes = [...data];
      this.totalItems = data.length;
      this.updatePagination();
    });
  }

  /**
   * Método que se ejecuta cuando se cambia de página en la paginación.
   * @param {number} page - Número de la página seleccionada.
   */
  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  /**
   * Método que se ejecuta cuando cambia el número de elementos por página.
   * @param {number} itemsPerPage - Número de elementos a mostrar por página.
   */
  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

   /** Actualiza los elementos paginados según la página e ítems por página seleccionados */
   public updatePagination(): void {
    const STARTINDEX = (this.currentPage - 1) * this.itemsPerPage;
    const ENDINDEX = STARTINDEX + this.itemsPerPage;
    this.listaPendientesPaginados = this.todosPendientes.slice(STARTINDEX, ENDINDEX);
  }

  /** Ejecuta la búsqueda de pendientes con los filtros del formulario */
  buscarPendiente() {
    /**
     * Se salta la regla de UPPER_CASE, ya que los valores que se recuperan en la constante 
     * son valores predefinidos como el formulario fueron declarados
     */
    //eslint-disable-next-line @typescript-eslint/naming-convention
    const { folio, info, fechaInicio, fechaFinal } = this.FormBusqueda.value;
    this.servicioFuncionario
      .getListaPendientes(folio || undefined, info || undefined, fechaInicio || undefined, fechaFinal || undefined)
      .subscribe((data) => {
        this.todosPendientesOriginales = data;
        this.todosPendientes = [...data];
        this.totalItems = data.length;
        this.currentPage = 1;
        this.updatePagination();
      });
  }

   /**
   * Reseteo de valores de la busqueda
   */
  resetFiltros(): void {
    this.FormBusqueda.reset();
    this.todosPendientes = [...this.todosPendientesOriginales];
    this.totalItems = this.todosPendientes.length;
    this.currentPage = 1;
    this.updatePagination();
  }

   /**
   * Método que se ejecuta al destruir el componente.
   */
   ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
