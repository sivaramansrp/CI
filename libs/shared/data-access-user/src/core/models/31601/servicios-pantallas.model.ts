export interface AccionBoton {
  accion: string;
  valor: number;
}

export interface PagoData {
  claveReferencia: string;
  numeroOperacion: string;
  cadenaDependencia: string;
  banco: string;
  llavePago: string;
  fechaPago: string;
  importePago: string | number;
}

export interface Tipos {
  tiposData: string; // Tipo de documento.
}

export interface Personas {
  rfc: string; // RFC de la persona
  curp: string; // CURP de la persona
  nombre: string; // Nombre de la persona
  apellidoPaterno: string; // Apellido paterno de la persona
  apellidoMaterno: string; // Apellido materno de la persona
}
export interface TableData {
  tableHeader: string[];
  tableBody: TableBodyRow[];
}

export interface TableBodyRow {
  tbodyData: string[][];
}
