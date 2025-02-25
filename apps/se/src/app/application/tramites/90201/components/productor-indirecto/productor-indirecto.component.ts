/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import ProductorIndirectoTabla from 'libs/shared/theme/assets/json/90201/productor-indirecto-tabla.json';


@Component({
  selector: 'app-productor-indirecto',
  standalone: true,
  imports: [CommonModule,TituloComponent,TableComponent],
  templateUrl: './productor-indirecto.component.html',
  styleUrl: './productor-indirecto.component.scss',
})
export class ProductorIndirectoComponent {


  public tableHeader = ProductorIndirectoTabla.tableHeader;
  public cuerpoTabla = ProductorIndirectoTabla.tableBody;
}
