import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, ConfiguracionColumna, TableComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { MENSAJEDEALERTA, TituloComponent } from '@ng-mf/data-access-user';
// import terceros from 'libs/shared/theme/assets/json/260211/terceros.json';
import { SanitarioService } from '../../services/sanitario.service';
import { FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
// import { PermisoModel} from ''
import { PermisoModel } from '../detos.model';



@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule,TituloComponent,TableComponent,AlertComponent,TablaDinamicaComponent ],
  templateUrl: './tercerosRelacionados.component.html',
  styleUrl: './tercerosRelacionados.component.css',
})
export class TercerosRelacionadosComponent {
  private destroyed$ = new Subject<void>();
  tableHeaderData: string[] = [  'Nombre/denominacion o razon social', 'RFC', 'CURP','Telefono','corro electronica','calle'];
  // public derechosList!: tableHeaderData[];
  TablaSeleccion = TablaSeleccion;
  tercerosProd: PermisoModel [] = [];
  tableBodyData: { tbodyData: string[] }[] = [];
  public establecimientoHeaderData: string[] = [];
  public establecimientoBodyData: unknown = [];
  public destinatarioHeaderData: string[] = [];
  public destinatarioBodyData: unknown = [];
  public importadorHeaderData: string[] = [];
  public importadorBodyData: unknown = [];
  public TEXTOS = MENSAJEDEALERTA;
  public infoAlert = 'alert-info';
  // public getEstablecimientoTableData = tercerostable;
  constructor(private fb: FormBuilder,private service:SanitarioService){}


  configuracionTabla: ConfiguracionColumna<PermisoModel >[] = [
    {
      encabezado: 'Fracción arancelaria',
      clave: (item: PermisoModel ) => item.Nombre,
      orden: 1,
    },
    {
      encabezado: 'Clave del sector',
      clave: (item: PermisoModel ) => item.RFC,
      orden: 2,
    },
    {
      encabezado: 'Estatus',
      clave: (item: PermisoModel ) => item.CURP,
      orden: 3,
    },
    {
      encabezado: 'Estatus',
      clave: (item: PermisoModel ) => item.Teléfono,
      orden: 3,
    },
    {
      encabezado: 'Estatus',
      clave: (item: PermisoModel ) => item.CorreoElectrónico,
      orden: 4,
    },{
      encabezado: 'Estatus',
      clave: (item: PermisoModel ) => item.calle,
      orden: 5,
    }
  ];
  ngOnInit():void {
    this.loadMercancias();
  }

  loadMercancias(): void {
    this.service.getTable()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((resp) => {
      this.tercerosProd = resp;
    });
  }
}
