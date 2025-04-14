import { Component, OnInit } from '@angular/core';
import { ConfiguracionColumna, InputFecha, InputFechaComponent, ListaPendientes, TablaAcciones, TablaDinamicaComponent, TablePaginationComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TablerosService } from '../../core/service/tabletos.service';
import data from '@libs/shared/theme/assets/json/funcionario/lista-pendientes.json'


@Component({
  selector: 'app-seleccion-modulo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputFechaComponent, TablaDinamicaComponent, TablePaginationComponent],
  templateUrl: './seleccion-modulo.component.html',
  styleUrl: './seleccion-modulo.component.scss',
})
export class SeleccionModuloComponent implements OnInit {
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
  public FormBusqueda!: FormGroup;
  public fechaInicioInput: InputFecha = this.FECHA_INICIO;
  public fechaFinalInput: InputFecha = this.FECHA_FINAL;
  public accionesServcios: TablaAcciones[] = [];
  public todosPendientes: ListaPendientes[] = [];

  public listaPendientesPaginados: ListaPendientes[] = [];
  public totalItems: number = 0;
  public itemsPerPage: number = 5;
  public currentPage: number = 1;
  public todosPendientesOriginales: ListaPendientes[] = [];

  public configurarTabla: ConfiguracionColumna<ListaPendientes>[] = [
      { encabezado: 'Folio tramite', clave: (item: ListaPendientes) => item.folio, orden: 1 },
      { encabezado: 'Tipo de trámite', clave: (item: ListaPendientes) => item.tipoTramite, orden: 2 },
      { encabezado: 'Nombre de la tarea', clave: (item: ListaPendientes) => item.nombreTarea, orden: 3 },
      { encabezado: 'Fecha de asignación', clave: (item: ListaPendientes) => item.fechaAsignacion, orden: 4 },
      { encabezado: 'Estado de tramite', clave: (item: ListaPendientes) => item.estatusTramite, orden: 5 }
    ]

  listaPendientes!: ListaPendientes[];
  constructor(
    private fb: FormBuilder,
    private servicioFuncionario: TablerosService
  ) {
    this.FormBusqueda = this.fb.group({
      folio: [''],
      info: [''],
      fechaInicio: [''],
      fechaFinal: ['']
    });
  }

  ngOnInit(): void {
    this.getPendientesTabla();
  }

  public cambioFechaInicio(nuevo_valor: string) {
    this.FormBusqueda.get('fechaInicio')?.setValue(nuevo_valor);
    this.FormBusqueda.get('fechaInicio')?.markAsUntouched();
  }

  public cambioFechaFinal(nuevo_valor: string) {
    this.FormBusqueda.get('fechaFinal')?.setValue(nuevo_valor);
    this.FormBusqueda.get('fechaFinal')?.markAsUntouched();
  }

  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  public getPendientesTabla(): void {
    this.accionesServcios = [TablaAcciones.EDITAR];
    this.servicioFuncionario.getTableroPendientes().subscribe((data) => {
      this.todosPendientesOriginales = data;
      this.todosPendientes = [...data];
      this.totalItems = data.length;
      this.updatePagination();
    });
  }

  public updatePagination(): void {
    const STARTINDEX = (this.currentPage - 1) * this.itemsPerPage;
    const ENDINDEX = STARTINDEX + this.itemsPerPage;
    this.listaPendientesPaginados = this.todosPendientes.slice(STARTINDEX, ENDINDEX);
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

  buscarPendiente() {
    const { FOLIO, INFO, FECHAINICIO, FECHAFINAL } = this.FormBusqueda.value;
  
    const FILTROS = {
      folio: FOLIO || '',
      INFO: INFO || '',
      fechaInicio: FECHAINICIO || '',
      fechaFinal: FECHAFINAL || ''
    };
  
    this.servicioFuncionario.getPendientesFiltrados(FILTROS).subscribe((data) => {
      this.todosPendientes = data;
      this.totalItems = data.length;
      this.currentPage = 1;
      this.updatePagination();
    });
  }
}
