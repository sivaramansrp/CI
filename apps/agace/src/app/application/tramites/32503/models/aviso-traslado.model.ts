
export interface Catalogo {
  id: number;
  descripcion: string;
}
export interface CatalogoLista {
  datos: Catalogo[];
}
export interface AccionBoton {
  accion: string;
  valor: number;
}
export interface RespuestaCatalogos {
  code: number;
  data: Catalogo[]
  message: string;
}
export interface DatosSolicitante {
  rfc: string;
  denominacion: string;
  actividadEconomica: string;
  correoElectronico: string;
  pais: string;
  codigoPostal: string;
  entidadFederativa: string;
  municipio: string;
  localidad: string;
  colonia: string;
  calle: string;
  nExt: string;
  nInt: string;
  lada: string;
  telefono: string;
  adace: string;
}
export interface ColumnasTabla {
  rfc: string,
  nombreComercial: string,
  entidadFederativa: string,
  alcaldioOMuncipio: string,
  colonia: string,
}