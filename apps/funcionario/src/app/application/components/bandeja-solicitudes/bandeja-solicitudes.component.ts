import { Component, OnInit } from '@angular/core';
import { ConfiguracionColumna, InputFecha, InputFechaComponent, ListaSolicitudes, TablaAcciones, TablaDinamicaComponent, TablePaginationComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TablerosService } from '../../core/service/tabletos.service';

@Component({
  selector: 'app-bandeja-solicitudes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputFechaComponent, TablaDinamicaComponent, TablePaginationComponent],
  templateUrl: './bandeja-solicitudes.component.html',
  styleUrl: './bandeja-solicitudes.component.scss',
})
export class BandejaSolicitudesComponent implements OnInit {
  FECHA_INICIO = {
    labelNombre: 'Fecha inicial',
    required: false,
    habilitado: true,
  };

  FECHA_FINAL = {
    labelNombre: 'Fecha final',
    required: false,
    habilitado: true,
  };

  colapsable: boolean = false;
  public FormSolicitud!: FormGroup;
  public fechaInicioInput: InputFecha = this.FECHA_INICIO;
  public fechaFinalInput: InputFecha = this.FECHA_FINAL;
  public accionesServcios: TablaAcciones[] = [];
  public todasSolicitudes: ListaSolicitudes[] = []; // <- Nueva propiedad con todos los datos

  // Esta lista es la que se muestra en la tabla
  public listaSolicitudesPaginadas: ListaSolicitudes[] = [];
  public totalItems: number = 0;
  public itemsPerPage: number = 5;
  public currentPage: number = 1;
  public todasSolicitudesOriginales: ListaSolicitudes[] = [];

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
    this.FormSolicitud = this.fb.group({
      idSolicitud: [''],
      fechaInicio: [''],
      fechaFinal: ['']
    });
  }

  ngOnInit(): void {
    this.getSolicitudesTabla();
  }

  public getSolicitudesTabla(): void {
    this.accionesServcios = [TablaAcciones.VER];
    this.servicioFuncionario.getTableroSolicitudesTabla().subscribe((data) => {
      this.todasSolicitudesOriginales = data;
      this.todasSolicitudes = [...data];
      this.totalItems = data.length;
      this.updatePagination();
    });
  }

  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  public cambioFechaInicioFucion(nuevo_valor: string) {
    this.FormSolicitud.get('fechaInicio')?.setValue(nuevo_valor);
    this.FormSolicitud.get('fechaInicio')?.markAsUntouched();
  }

  public cambioFechaFinalFuncion(nuevo_valor: string) {
    this.FormSolicitud.get('fechaFinal')?.setValue(nuevo_valor);
    this.FormSolicitud.get('fechaFinal')?.markAsUntouched();
  }

  public updatePagination(): void {
    const STARTINDEX = (this.currentPage - 1) * this.itemsPerPage;
    const ENDINDEX = STARTINDEX + this.itemsPerPage;
    this.listaSolicitudesPaginadas = this.todasSolicitudes.slice(STARTINDEX, ENDINDEX);
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  public onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

  buscarPendiente(): void {
    const FORM_DATA = this.FormSolicitud.value;
    const { IDSOLICITUD, FECHAINICIO, FECHAFINAL } = this.FormSolicitud.value;
  
    const FILTROS = {
      idSolicitud: IDSOLICITUD || '',
      fechaInicio: FECHAINICIO || '',
      fechaFinal: FECHAFINAL || ''
    };
  
    this.servicioFuncionario.getSolicitudesFiltradas(FILTROS).subscribe((data) => {
      this.todasSolicitudes = data;
      this.totalItems = data.length;
      this.currentPage = 1;
      this.updatePagination();
    });
  }

  resetFiltros(): void {
    this.FormSolicitud.reset();
    this.todasSolicitudes = [...this.todasSolicitudesOriginales];
    this.totalItems = this.todasSolicitudes.length;
    this.currentPage = 1;
    this.updatePagination();
  }
}
