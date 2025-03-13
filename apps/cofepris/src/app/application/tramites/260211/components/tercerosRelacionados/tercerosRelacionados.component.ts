import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, TableComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { MENSAJEDEALERTA, TituloComponent } from '@ng-mf/data-access-user';
// import terceros from 'libs/shared/theme/assets/json/260211/terceros.json';
import { SanitarioService } from '../../services/sanitario.service';
import { FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule,TituloComponent,TableComponent,AlertComponent,],
  templateUrl: './tercerosRelacionados.component.html',
  styleUrl: './tercerosRelacionados.component.css',
})
export class TercerosRelacionadosComponent {
  private destroyed$ = new Subject<void>();
  tableHeaderData: string[] = [  'Nombre/denominacion o razon social', 'RFC', 'CURP','Telefono','corro electronica','calle'];
  // public derechosList!: tableHeaderData[];
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


  // public getEstablecimiento(): void {
  //   this.tableHeaderData = this.derechosList.tableHeader;
  //   this.tableBodyData = this.getEstablecimientoTableData.tableBody;
  // }

  // loadComboUnidadMedida(): void {
  //     this.service.getDatos().pipe(
  //       takeUntil(this.destroyed$)
  //     ).subscribe((data): void => {
  //       this.derechosList = data as tableHeaderData;
  //     });
  //   }
}
