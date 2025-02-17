import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

import preOperativo from '../../../../../assets/json/31601/preOperativo.json'

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import productivo from '../../../../../assets/json/31601/productivo.json';
import serviciosAgace from '../../../../../assets/json/31601/serviciosAgace.json';

import comboBimestres from '../../../../../assets/json/31601/comboBimestres.json';

import { Catalogo } from '../../../../core/models/shared/catalogos.model';

import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import establecimientoTable from '../../../../../assets/json/220401/establecimiento-table.json';

import destinatarioTable from '../../../../../assets/json/220401/destinatario-table.json';
import importardorTable from '../../../../../assets/json/220401/importador-table.json';

import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-aduanero',
  templateUrl: './aduanero.component.html',
  styleUrl: './aduanero.component.scss',
  standalone:true,
  imports: [
     CommonModule,
     ReactiveFormsModule,
     InputRadioComponent,
     CatalogoSelectComponent,
     TableComponent
],
})
export class AduaneroComponent implements OnInit {
  preOperativeForm! : FormGroup;
  radioOptions = preOperativo; // Use imported JSON data
  public establecimientoBodyData: unknown = [];
  sectorProductivoAgace :Catalogo[] =productivo;
  serviciosAgace : Catalogo[] = serviciosAgace;
  comboBimestresIDC :Catalogo[] = comboBimestres;
  public establecimientoHeaderData: string[] = [];
  public getEstablecimientoTableData = establecimientoTable;
  public getDestinatarioTableData = destinatarioTable;
  public getImportadorTableData = importardorTable;
ngOnInit(){
this.getEstablecimiento();
}
  public getEstablecimiento() {
    this.establecimientoHeaderData = this.getEstablecimientoTableData.tableHeader;
    this.establecimientoBodyData = this.getEstablecimientoTableData.tableBody;
  }
}
