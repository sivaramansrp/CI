import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';

import { TableComponent } from '@ng-mf/data-access-user';

//import LicitacionesDisponibles from '../../../../../../../../libs/shared/theme/assets/json/120501/licitaciones-disponibles.json';


@Component({
  selector: 'app-licitaciones-vigentes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, TableComponent],
  templateUrl: './licitaciones-vigentes.component.html',
  styleUrl: './licitaciones-vigentes.component.scss',
})
export class LicitacionesVigentesComponent implements OnInit {
  tableHeaderData: string[] = [];
  tableBodyData: { tbodyData: string[] }[] = [];
  //public getEstablecimientoTableData = LicitacionesDisponibles;

  ngOnInit(): void {
    // this.getEstablecimiento();
   
  }

  // public getEstablecimiento(): void {
  //   this.tableHeaderData = this.getEstablecimientoTableData.tableHeader;
  //   this.tableBodyData = this.getEstablecimientoTableData.tableBody;
  // }
}
