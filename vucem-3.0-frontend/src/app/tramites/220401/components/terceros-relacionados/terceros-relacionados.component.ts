import { Component } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import establecimientoTable from '../../../../../assets/json/220401/establecimiento-table.json'
// eslint-disable-next-line sort-imports
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
  public establecimientoBodyData = [{}];
  public destinatarioHeaderData: string[] = [];
  public destinatarioBodyData = [{}];
  public importadorHeaderData: string[] = [];
  public importadorBodyData = [{}];
  public getEstablecimientoTableData = establecimientoTable;
  public getDestinatarioTableData = destinatarioTable;
  public getImportadorTableData = importardorTable;
  public TEXTOS = MENSAJEDEALERTA;


  constructor() {
    // console.log('TercerosRelacionadosComponent====>',this.getEstablecimientoTableData);
  }

  ngOnInit(): void {
    this.getEstablecimiento();
    this.getDestinatario();
    this.getImportador();
  }

  public getEstablecimiento() {
    this.establecimientoHeaderData = this.getEstablecimientoTableData.tableHeader;
    this.establecimientoBodyData = this.getEstablecimientoTableData.tableBody;
  }

  public getDestinatario() {
    this.destinatarioHeaderData = this.getDestinatarioTableData.tableHeader;
    this.destinatarioBodyData = this.getDestinatarioTableData.tableBody;
  }

  public getImportador() {
    this.importadorHeaderData = this.getImportadorTableData.tableHeader;
    this.importadorBodyData = this.getImportadorTableData.tableBody;
  }


}
