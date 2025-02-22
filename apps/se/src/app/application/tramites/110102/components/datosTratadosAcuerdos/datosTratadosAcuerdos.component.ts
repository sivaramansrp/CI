import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { TableComponent } from '@ng-mf/data-access-user';
import datosTratadosAcuerdos from 'libs/shared/theme/assets/json/110102/datosTratadosAcuerdos.json';


@Component({
  selector: 'app-datos-tratados-acuerdos',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './datosTratadosAcuerdos.component.html',
  styleUrl: './datosTratadosAcuerdos.component.scss',
})
export class DatosTratadosAcuerdosComponent{
  tableHeader=datosTratadosAcuerdos.tableHeader;
  tableBody=datosTratadosAcuerdos.tableBody;



}

