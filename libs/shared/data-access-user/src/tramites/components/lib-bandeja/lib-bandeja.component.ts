import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../../../core/models/shared/configuracion-columna.model';
import { FormasDinamicasComponent } from '../formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TablaDinamicaComponent } from '../tabla-dinamica/tabla-dinamica.component';
import { TramiteDetails } from '../../../core/models/tramiteDetails';
import tramiteDetailsData from '@libs/shared/theme/assets/json/tramiteList.json'
import { ConsultaioStore } from '../../../core/estados/consulta.store';


@Component({
  selector: 'lib-bandeja',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    RouterModule,
    TablaDinamicaComponent,
  ],
  templateUrl: './lib-bandeja.component.html',
  styleUrl: './lib-bandeja.component.scss',
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
        item.encabezado !== 'Departamento' && item.encabezado !== 'Número de procedimiento'
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
      let PROCEDURE:unknown;
      this.configuracionTablaDatos.forEach((datos) => {
        if (datos.numeroDeProcedimiento === ROW_OBJETO.numeroDeProcedimiento) {
          PROCEDURE = Number(datos.numeroDeProcedimiento);
        }
      });
      this.tramiteData = tramiteDetailsData.filter((v) => v.tramite === PROCEDURE);
      this.procedureUrl = this.tramiteData[0].linkDashboard;
      //this.consultaioStore.establecerConsultaio('301','BANDEJA_SOLICUD','AGA',false,false,false);

      this.router.navigate([this.procedureUrl + '/' + ROW_OBJETO.numeroDeProcedimiento]);
    }

    public mostrarColapsable(orden:number): void {
      if (orden === 1) {
        this.paisDeOriginColapsable = !this.paisDeOriginColapsable;
      }
    }


}
