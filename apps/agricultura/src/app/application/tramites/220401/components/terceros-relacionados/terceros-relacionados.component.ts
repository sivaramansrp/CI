/* eslint-disable no-empty-function */
import { Component, OnInit } from '@angular/core';

import { MENSAJEDEALERTA, TableBodyData, TituloComponent } from '@ng-mf/data-access-user';

import { TableComponent } from '@ng-mf/data-access-user';

// eslint-disable-next-line @nx/enforce-module-boundaries
import establecimientoTable from '../../../../../../../../../libs/shared/theme/assets/json/220401/establecimiento-table.json'

// eslint-disable-next-line @nx/enforce-module-boundaries
import destinatarioTable from '../../../../../../../../../libs/shared/theme/assets/json/220401/destinatario-table.json'

// eslint-disable-next-line @nx/enforce-module-boundaries
import importardorTable from '../../../../../../../../../libs/shared/theme/assets/json/220401/importador-table.json'

import { AlertComponent } from '@ng-mf/data-access-user';

import { AgregarDestinatoriaComponent } from '../agregar-destinatoria/agregar-destinatoria.component';


@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
   standalone: true,
  imports: [TituloComponent,TableComponent,AlertComponent,AgregarDestinatoriaComponent],
})
export class TercerosRelacionadosComponent implements OnInit {


  public establecimientoHeaderData: string[] = [];
  public establecimientoBodyData: TableBodyData[] = [];
  public destinatarioHeaderData: string[] = [];
  public destinatarioBodyData: TableBodyData[] = [];
  public importadorHeaderData: string[] = [];
  public importadorBodyData: TableBodyData[] = [];
  public getEstablecimientoTableData = establecimientoTable;
  public getDestinatarioTableData = destinatarioTable;
  public getImportadorTableData = importardorTable;
  public TEXTOS = MENSAJEDEALERTA;
  public hasAgregar:boolean = false;
  public infoAlert = 'alert-info';


  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    this.getEstablecimiento();
    this.getDestinatario();
    this.getImportador();
  }

  /**
   * @description getEstablecimiento se utiliza para establecer el establecimientoHeaderData de getEstablecimientoTableData
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public getEstablecimiento() {
    this.establecimientoHeaderData = this.getEstablecimientoTableData.tableHeader;
    this.establecimientoBodyData = this.getEstablecimientoTableData.tableBody;
  }

  /**
   * @description getDestinatario se utiliza para establecer el destinatarioHeaderData de getDestinatarioTableData
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public getDestinatario() {
    this.destinatarioHeaderData = this.getDestinatarioTableData.tableHeader;
    this.destinatarioBodyData = this.getDestinatarioTableData.tableBody;
  }

  /**
   * @description getImportador se utiliza para establecer el importadorHeaderData de getImportadorTableData
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public getImportador() {
    this.importadorHeaderData = this.getImportadorTableData.tableHeader;
    this.importadorBodyData = this.getImportadorTableData.tableBody;
  }

  /**
   * 
   * @param  agregar, que acepta datos de tipo cadena
   * @description agregar se utiliza para agregar un nuevo estable
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public agregar(agregar:string) {
    if(agregar === 'Agregar'){
      this.hasAgregar = true;
    }
  }
}
