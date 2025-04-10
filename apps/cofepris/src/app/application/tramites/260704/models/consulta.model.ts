import { CatalogosSelect } from '@libs/shared/data-access-user/src';

export interface ColumnasTabla {
  claveScian: string;
  descripcionScian: string;
}
export interface ListaClave {
  claveDeLosLotes: string;
  fechaDeFabricacion: string;
  fechaDeCaducidad: string;
}

export interface Mercancia {
  clasificaionProductos: string;
  especificarProducto: number;
  nombreProductoEspecifico: string;
  marca: string;
  tipoProducto: number;
  fraccionArancelaria: string;
  descripcionFraccionArancelaria: string;
  cantidadUMT: string;
  umt: string;
  cantidadUMC: string;
  umc: number;
  paisDeOrigen: string;
  paisDeProcedencia: string;
  usoEspecifico: string;
}

export interface ClavesDeLotes {
  lotes: string;
  fabricacion: string;
  caducidad: string;
}
export interface CrossListLable {
  tituluDeLaIzquierda: string;
  derecha: string;
}
export interface CrossList {
  label: CrossListLable;
  fechas: string[];
}

export interface MercanciaCatalogos {
  productosCatalogo: CatalogosSelect;
  especificarCatalogo: CatalogosSelect;
  tipoProductoCatalogo: CatalogosSelect;
  umcCatalogo: CatalogosSelect;
}

export interface MercanciaCrossList {
  paisOrigenCrossList: CrossList;
  paisProcedencisCrossList: CrossList;
  usoEspecificoCrossList: CrossList;
}

export const FECHA_INICIAL = {
  labelNombre: 'Fecha de fabricación',
  required: true,
  habilitado: true,
};

export const FECHA_FINAL = {
  labelNombre: 'Fecha de caducidad',
  required: true,
  habilitado: true,
};

export const FECHA_PAGO = {
  labelNombre: 'Fecha de pago',
  required: true,
  habilitado: true,
};

export interface Asociados {
  folioTramite: string;
  tipoTramite: string;
  estatus: string;
  fechaRegistro: string;
}

export interface Fabricante {
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