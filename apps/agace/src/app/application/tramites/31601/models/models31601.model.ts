export interface Tabla {
  tableHeader: string[];
  tableBody: TableBody[];
}

export interface TableBody {
  tbodyData: string[];
  lastColumnSelected?: boolean;
}
