import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.scss',
  standalone: true,
    imports:[
      CommonModule,
     
    ]
})
export class TablePaginationComponent {
  @Input() totalItems: number = 0; // Total number of items
  @Input() itemsPerPage: number = 5; // Items per page
  @Input() currentPage: number = 1; // Current page
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemsPerPageChange: EventEmitter<number> = new EventEmitter<number>(); 
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
  onItemsPerPageChange(event: any) {
    this.itemsPerPage = +event.target.value;
    this.itemsPerPageChange.emit(this.itemsPerPage);
  }
}
