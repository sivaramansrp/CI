import { CommonModule } from '@angular/common';

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import preOperativo from '../../../../../assets/json/31601/preOperativo.json';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import productivo from '../../../../../assets/json/31601/productivo.json';
import serviciosAgace from '../../../../../assets/json/31601/serviciosAgace.json';

import comboIMMEXJson from '../../../../../assets/json/31601/comboIMMEX.json';

import comboBimestres from '../../../../../assets/json/31601/comboBimestres.json';



import { Catalogo } from '../../../../core/models/shared/catalogos.model';

import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import establecimientoTable from '../../../../../assets/json/220401/establecimiento-table.json';

import destinatarioTable from '../../../../../assets/json/220401/destinatario-table.json';
import importardorTable from '../../../../../assets/json/220401/importador-table.json';

import { TableComponent } from '../../../../shared/components/table/table.component';

import { Modal } from 'bootstrap';

@Component({
  selector: 'app-aduanero',
  templateUrl: './aduanero.component.html',
  styleUrl: './aduanero.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent,
    TableComponent,
  ],
})
export class AduaneroComponent implements OnInit, AfterViewInit {
  @ViewChild('modifyModal', { static: false }) modifyModal!: ElementRef;
  @ViewChild ('instalacionesModal',{static :false}) instalacionesModal!:ElementRef;
  modalInstance!: Modal;
  modalInstanceInstaciones!:Modal;

  preOperativeForm!: FormGroup;
  radioOptions = preOperativo; // Use imported JSON data
  public establecimientoBodyData: unknown = [];
  sectorProductivoAgace: Catalogo[] = productivo;
  serviciosAgace: Catalogo[] = serviciosAgace;
  comboBimestresIDC: Catalogo[] = comboBimestres;
  comboIMMEX :Catalogo[]=comboIMMEXJson;
  public establecimientoHeaderData: string[] = [];
  public getEstablecimientoTableData = establecimientoTable;
  public getDestinatarioTableData = destinatarioTable;
  public getImportadorTableData = importardorTable;
  contextPath: string = 'https://your-server.com'; 

  ngOnInit() {
    this.getEstablecimiento();
   
  }
  ngAfterViewInit() {
    // Initialize Modify Modal
    if (this.modifyModal) {
      this.modalInstance = new Modal(this.modifyModal.nativeElement);
      console.log('Modify Modal Initialized:', this.modalInstance);
    }

    // Initialize Instalaciones Modal
    if (this.instalacionesModal) {
      this.modalInstanceInstaciones = new Modal(this.instalacionesModal.nativeElement);
    }
  }
  openModifyModal() {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }
  closeModifyModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
  openInstacionesModal(){
    if(this.modalInstanceInstaciones){
      this.modalInstanceInstaciones.show();
    }
    else{
//
    }
  }
  

  public getEstablecimiento() {
    this.establecimientoHeaderData =
      this.getEstablecimientoTableData.tableHeader;
    this.establecimientoBodyData = this.getEstablecimientoTableData.tableBody;
  }
}
