import { Component, Input } from '@angular/core';
import { TableData } from '../../../core/models/shared/components.model';

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
})
export class TableComponent {

  @Input() commonTableHeader: any;
  @Input() commonTableBody: any;

  public tableData: TableData = {
    tableHeader: [],
    tableBody: []
  };

  constructor() {
  }

  ngOnInit(): void {
    this.tableData = {
      tableHeader: this.commonTableHeader,
      tableBody: this.commonTableBody
    }
  }

}
