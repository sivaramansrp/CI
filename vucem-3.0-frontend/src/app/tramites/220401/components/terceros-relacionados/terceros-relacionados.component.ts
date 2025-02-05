import { Component } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import establecimientoTable from '../../../../../assets/json/220401/establecimiento-table.json'
import destinatarioTable from '../../../../../assets/json/220401/destinatario-table.json'
import importardorTable from '../../../../../assets/json/220401/importador-table.json'
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { MENSAJEDEALERTA } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { AgregarDestinatoriaComponent } from '../agregar-destinatoria/agregar-destinatoria.component';


@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
   standalone: true,
  imports: [TituloComponent,TableComponent,AlertComponent,AgregarDestinatoriaComponent],
})
export class TercerosRelacionadosComponent {


  public establecimientoHeaderData: string[] = [];
  public establecimientoBodyData: unknown = [];
  public destinatarioHeaderData: string[] = [];
  public destinatarioBodyData: unknown = [];
  public importadorHeaderData: string[] = [];
  public importadorBodyData: unknown = [];
  public getEstablecimientoTableData = establecimientoTable;
  public getDestinatarioTableData = destinatarioTable;
  public getImportadorTableData = importardorTable;
  public TEXTOS = MENSAJEDEALERTA;
  public hasAgregar:boolean = false;


  constructor() {
    // console.log('TercerosRelacionadosComponent====>',this.getEstablecimientoTableData);
  }

  ngOnInit(): void {
    this.getEstablecimiento();
    this.getDestinatario();
    this.getImportador();
  }

  /**
   * @description getEstablecimiento se utiliza para establecer el establecimientoHeaderData de getEstablecimientoTableData
   */

  public getEstablecimiento() {
    this.establecimientoHeaderData = this.getEstablecimientoTableData.tableHeader;
    this.establecimientoBodyData = this.getEstablecimientoTableData.tableBody;
  }

  /**
   * @description getDestinatario se utiliza para establecer el destinatarioHeaderData de getDestinatarioTableData
   */

  public getDestinatario() {
    this.destinatarioHeaderData = this.getDestinatarioTableData.tableHeader;
    this.destinatarioBodyData = this.getDestinatarioTableData.tableBody;
  }

  /**
   * @description getImportador se utiliza para establecer el importadorHeaderData de getImportadorTableData
   */

  public getImportador() {
    this.importadorHeaderData = this.getImportadorTableData.tableHeader;
    this.importadorBodyData = this.getImportadorTableData.tableBody;
  }

  /**
   * 
   * @param  agregar, que acepta datos de tipo cadena
   * @description agregar se utiliza para agregar un nuevo estable
   */
  public agregar(agregar:string) {
    if(agregar === 'Agregar'){
      this.hasAgregar = true;
    }
  }
}
