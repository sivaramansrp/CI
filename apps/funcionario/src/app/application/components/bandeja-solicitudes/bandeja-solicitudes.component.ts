import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, InputFecha, InputFechaComponent, TablaAcciones, TablaDinamicaComponent, TablePaginationComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReplaySubject, catchError, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ListaSolicitudes } from '../../core/models/solicitudes.model';
import { TablerosService } from '../../core/service/tabletos.service';

@Component({
  selector: 'app-bandeja-solicitudes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputFechaComponent, TablaDinamicaComponent, TablePaginationComponent],
  templateUrl: './bandeja-solicitudes.component.html',
  styleUrl: './bandeja-solicitudes.component.scss',
})
export class BandejaSolicitudesComponent implements OnInit, OnDestroy {
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
  /** Lista completa de solicitudes obtenida del backend */
  public todasSolicitudes: ListaSolicitudes[] = [];
  /** Lista de solicitudes mostrada en la página actual */
  public listaSolicitudesPaginadas: ListaSolicitudes[] = [];
  /** Total de elementos (para paginación) */
  public totalItems: number = 0;
  /** Cantidad de elementos por página */
  public itemsPerPage: number = 5;
  /** Página actual */
  public currentPage: number = 1;
  /** Copia original de las solicitudes (sin filtros) */
  public todasSolicitudesOriginales: ListaSolicitudes[] = [];

  /** Configuración de columnas de la tabla */
  public configurarTabla: ConfiguracionColumna<ListaSolicitudes>[] = [
    { encabezado: 'Id solicitud', clave: (item: ListaSolicitudes) => item.idSolicitud, orden: 1 },
    { encabezado: 'Tipo de trámite', clave: (item: ListaSolicitudes) => item.tipoTramite, orden: 2 },
    { encabezado: 'Fecha de asignación', clave: (item: ListaSolicitudes) => item.fechaCreacion, orden: 3 },
    { encabezado: 'Fecha de actualización', clave: (item: ListaSolicitudes) => item.fechaActualizacion, orden: 4 },
    { encabezado: 'Dias trascurridos', clave: (item: ListaSolicitudes) => item.diasTrascurridos, orden: 5 }
  ]
  constructor(
    private fb: FormBuilder,
    private servicioFuncionario: TablerosService,
  ) {
  }
  /** Al inicializar el componente, se cargan las solicitudes */
  ngOnInit(): void {
    this.inicializaFormConsulta();
    this.getSolicitudesTabla();
  }

  // Inicialización del formulario de búsqueda
  inicializaFormConsulta(): void {
    this.FormBusqueda = this.fb.group({
      idSolicitud: [''],
      fechaInicio: [''],
      fechaFinal: ['']
    });
  }

  /** Alterna el estado del bloque colapsable (mostrar/ocultar filtros) */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
 * Actualiza el valor del campo 'fechaInicio' en el formulario reactivo `FormBusqueda`
 * @param nuevoValor_fechaInicio - Nuevo valor a establecer para el campo 'fechaInicio'.
 */
  public cambioFechaInicioFucion(nuevo_valor: string) {
    this.FormBusqueda.get('fechaInicio')?.setValue(nuevo_valor);
    this.FormBusqueda.get('fechaInicio')?.markAsUntouched();
  }

  /**
 * Actualiza el valor del campo 'fechaFinal' en el formulario reactivo `FormBusqueda`
 * @param nuevoValor_fechaFinal - Nuevo valor a establecer para el campo 'fechaFinal'.
 */
  public cambioFechaFinalFuncion(nuevo_valor: string) {
    this.FormBusqueda.get('fechaFinal')?.setValue(nuevo_valor);
    this.FormBusqueda.get('fechaFinal')?.markAsUntouched();
  }

  /** Obtiene todos las solicitudes desde el backend y aplica la paginación inicial */
  public getSolicitudesTabla(): void {
    this.accionesServcios = [TablaAcciones.VER];
    this.servicioFuncionario.getListaSolicitudes()
    .pipe(
      map((data)=>{
        this.todasSolicitudesOriginales = data;
        this.todasSolicitudes = [...data];
        this.totalItems = data.length;
        this.updatePagination();
      }),
      catchError((_error) => {
        return _error;
      })
    )
    .subscribe();
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
    this.listaSolicitudesPaginadas = this.todasSolicitudes.slice(STARTINDEX, ENDINDEX);
  }

  /** Ejecuta la búsqueda de solicitudes con los filtros del formulario */
  buscarSolicitudes() {
    /**
     * Se salta la regla de UPPER_CASE, ya que los valores que se recuperan en la constante 
     * son valores predefinidos como el formulario fueron declarados
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { idSolicitud, fechaInicio, fechaFinal } = this.FormBusqueda.value;
    this.servicioFuncionario
      .getListaSolicitudes(idSolicitud || undefined, fechaInicio || undefined, fechaFinal || undefined)
      .pipe(
        map((data) => {
          this.todasSolicitudesOriginales = data;
          this.todasSolicitudes = [...data];
          this.totalItems = data.length;
          this.currentPage = 1;
          this.updatePagination();
        }),
        catchError((_error) => {
          return _error;
        })
      )
      .subscribe();
  }

  /**
   * Reseteo de valores de la busqueda
   */
  resetFiltros(): void {
    this.FormBusqueda.reset();
    this.todasSolicitudes = [...this.todasSolicitudesOriginales];
    this.totalItems = this.todasSolicitudes.length;
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
