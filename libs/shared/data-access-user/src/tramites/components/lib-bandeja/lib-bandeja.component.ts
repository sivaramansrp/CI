import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../../../core/models/shared/configuracion-columna.model';
import { FormasDinamicasComponent } from '../formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TablaDinamicaComponent } from '../tabla-dinamica/tabla-dinamica.component';
import { TramiteDetails } from '../../../core/models/tramiteDetails';
import tramiteDetailsData from '@libs/shared/theme/assets/json/tramiteList.json'
import { ConsultaioStore } from '../../../core/estados/consulta.store';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';
import { TablaAcciones } from '../../../core/enums/tabla-seleccion.enum';


@Component({
  selector: 'lib-bandeja',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    RouterModule,
    TablaDinamicaComponent,
    TablePaginationComponent
  ],
  templateUrl: './lib-bandeja.component.html',
  styleUrl: './lib-bandeja.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LibBandejaComponent<T> implements OnInit {

    @Input() public titulo!: string;
    @Input() public tieneBandeja: boolean = false;
    @Input() public tablaTitulo!: string;
    @Input() configuracionTabla: ConfiguracionColumna<T>[] = [];
    @Input() configuracionTablaDatos: any[] = [];
    @Input() public bandejaSolicitudeDatos: any[] = [];
    public procedureUrl!: string;
    public hasValidForm: boolean = false;

    public dinamicasBandejaForma: FormGroup = new FormGroup({
      bandejaSolicitudeFormGroup: new FormGroup({})
    });

    public originalConfiguracionTabla: any[] = [];
    public tramiteData: TramiteDetails[] = [];
    public paisDeOriginColapsable = false;
    public totalItems: number = 0;
    public currentPage: number = 1;
    public itemsPerPage: number = 5;
    public miembroDeLaEmpresaBodyData: unknown[] = [];
    public tablaAcciones: TablaAcciones[] = [TablaAcciones.EDITAR];


    constructor(
      public router: Router,
      private consultaioStore: ConsultaioStore
    ) {
      
    }

    ngOnInit(): void {
      if(this.tieneBandeja) {
        this.hasValidForm = true;
      }
      this.filterConfiguracionTabla();
    }

    get bandejaSolicitudeFormGroup(): FormGroup {
      return this.dinamicasBandejaForma.get('bandejaSolicitudeFormGroup') as FormGroup;
    }

    public filterConfiguracionTabla(): void {
      this.configuracionTabla = this.configuracionTabla.filter(item => 
        item.encabezado !== 'Departamento' && item.encabezado !== 'Número de procedimiento' && item.encabezado !== 'Origin'
      );
    }

    public enviarDatos(): void {
      this.hasValidForm = true;
      if (this.dinamicasBandejaForma.valid) {
        this.hasValidForm = true;
      }
    }

    public onFilaClic(event:any):void {
      const ROW_OBJETO = event;
      let PROCEDURE: unknown;
      let ORIGIN: string = ''; // Inicializar ORIGEN con un valor predeterminado
      this.configuracionTablaDatos.forEach((datos) => {
        if (datos.numeroDeProcedimiento === ROW_OBJETO.numeroDeProcedimiento) {
          ORIGIN = datos.origin;
          PROCEDURE = Number(datos.numeroDeProcedimiento);
        }
      });
      this.tramiteData = tramiteDetailsData.filter((v) => v.tramite === PROCEDURE);
      this.procedureUrl = this.tramiteData[0].linkDashboard;
      //this.consultaioStore.establecerConsultaio('301','BANDEJA_SOLICUD','AGA',false,false,false);
      this.consultaioStore.establecerConsultaio(String(PROCEDURE),ORIGIN,this.tramiteData[0].department,true,false,false);

      this.router.navigate([this.procedureUrl]);
    }

    public mostrarColapsable(orden:number): void {
      if (orden === 1) {
        this.paisDeOriginColapsable = !this.paisDeOriginColapsable;
      }
    }

  public onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  public updatePagination(): void {
    const START_INDEX = (this.currentPage - 1) * this.itemsPerPage;
    this.miembroDeLaEmpresaBodyData = this.miembroDeLaEmpresaBodyData.slice(
      START_INDEX,
      START_INDEX + this.itemsPerPage
    );
  }

  public onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }


}