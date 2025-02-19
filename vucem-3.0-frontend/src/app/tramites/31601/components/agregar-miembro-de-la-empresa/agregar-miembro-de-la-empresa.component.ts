import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import miembrodelaempresaTable from '../../../../../assets/json/31601/miembroDeLaEmpresa .json';
import { TablePaginationComponent } from "../../../../shared/components/table-pagination/table-pagination.component";

@Component({
  selector: 'app-agregar-miembro-de-la-empresa',
  templateUrl: './agregar-miembro-de-la-empresa.component.html',
  styleUrls: ['./agregar-miembro-de-la-empresa.component.scss'],
  standalone: true,
  imports: [TableComponent, TablePaginationComponent]
})
export class AgregarMiembroDeLaEmpresaComponent implements OnInit {


  contextPath: string = 'https://your-server.com'; 
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit(): void {
    this.getEstablecimiento();
  }

  public miembrodelaempresaHeaderData: string[] = [];
  public miembrodelaempresaBodyData: unknown[] = [];
  public getEstablecimientoTableData = miembrodelaempresaTable;
  

public getEstablecimiento():void {
  this.miembrodelaempresaHeaderData =
    this.getEstablecimientoTableData.tableHeader;
  this.miembrodelaempresaBodyData = this.getEstablecimientoTableData.tableBody;
}

updatePagination() :void{
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  this.miembrodelaempresaBodyData = this.miembrodelaempresaBodyData.slice(startIndex, startIndex + this.itemsPerPage);
}

onPageChange(page: number) :void {
  this.currentPage = page;
  this.updatePagination();
}

onItemsPerPageChange(itemsPerPage: number):void {
  this.itemsPerPage = itemsPerPage;
  this.currentPage = 1;
  this.updatePagination();
}

}