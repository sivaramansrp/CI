export interface AcuseTablaDatos {
  no: string;
  documento: string;
  descargar: string;
}

export interface ProductorIndirectoTabla {
  registro: string;
  denominacion: string;
  correo: string;
}

export interface DomiciliosDePlantasTabla {
  Calle: string;
  'Número exterior': string;
  'Número interior': string;
  'Código postal': string;
  Colonia: string;
  'Municipio o alcaldía': string;
  Estado: string;
}

export interface SectoresTabla {
  'Lista de sectores': string;
  'Clave del sector': string;
}
