/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { TableData } from '../../../core/models/shared/components.model';

import { NgxPaginationModule } from 'ngx-pagination';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports:[
    CommonModule,
    NgxPaginationModule, // Import it here
  ]
})
export class TableComponent implements OnInit{
  @Input() enablePagination: boolean = true; // Enable pagination by default
  @Input() itemsPerPage: number = 5; // Default items per page
    // Pagination
    currentPage: number = 1;
   
    paginatedTableBody: any[] = [];

   
  // Get total pages
  get totalPages(): number {
    return Math.ceil(this.tableData.tableBody.length / this.itemsPerPage);
  }

  // Get paginated data
  get paginatedData(): any[] {
    if (!this.enablePagination) {
      return this.tableData.tableBody; // Return full data if pagination is disabled
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.tableData.tableBody.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
  /**
   * @description 
   * commonTableHeader se utiliza para obtener datos de encabezado de tabla del componente 
   */
  @Input() commonTableHeader: string[] = [];
  /**
   * @description 
   * commonTableBody se utiliza para obtener datos del cuerpo de la tabla de la componente
   */
  @Input() commonTableBody: any =[];
  /**
   * @description
   * tableData se utiliza para obtener datos de la tabla de la componente
   */
  public tableData: TableData = {
    tableHeader: [],
    tableBody: []
  };
  
  /**
   * @description
   * ngOnInit se utiliza para inicializar la tabla de la componente
   */
  ngOnInit(): void {
    this.tableData = {
      tableHeader: this.commonTableHeader,
      tableBody: this.commonTableBody
    }
    
  }

}
