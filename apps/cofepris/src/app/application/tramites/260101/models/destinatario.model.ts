import { CatalogosSelect } from '@libs/shared/data-access-user/src';

export interface Destinatario {
  nombre: string;
  rfc: string;
  curp: string;
  telefono: string;
  correoElectronico: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  pais: string;
  colonia: string;
  municipio: string;
  localidad: string;
  estado: string;
  estado2: string;
  codigo: string;
}

export interface DestinatarioCatalogos {
  paisCatalogo: CatalogosSelect;
  estadoCatalogo: CatalogosSelect;
  municipioCatalogo: CatalogosSelect;
  localidadCatalogo: CatalogosSelect;
  codigoCatalogo: CatalogosSelect;
  coloniaCatalogo: CatalogosSelect;
}
