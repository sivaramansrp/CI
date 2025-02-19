import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import enlace from '../../../../../assets/json/31601/enlace.json';

@Component({
  selector: 'app-enlace',
  standalone: true,
  imports: [TableComponent,TituloComponent],
  templateUrl: './enlace.component.html',
  styleUrl: './enlace.component.scss'
})
export class EnlaceComponent implements OnInit {
  public enlaceHeaderData: string[] = [];
  public enlanceBodyData: unknown = [];
  public enlaceTableData = enlace;
  ngOnInit(): void {
    this.getEnlace();
  }
  public getEnlace() {
    this.enlaceHeaderData = this.enlaceTableData.tableHeader;
    
  }
  

}
