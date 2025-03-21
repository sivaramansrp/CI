import { CatalogosSelect } from '@libs/shared/data-access-user/src';

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

export interface MercanciaCatalogos {
  productosCatalogo: CatalogosSelect;
  especificarCatalogo: CatalogosSelect;
  tipoProductoCatalogo: CatalogosSelect;
  umcCatalogo: CatalogosSelect;
}

export interface CrossListLable {
  tituluDeLaIzquierda: string;
  derecha: string;
}

export interface CrossList {
  label: CrossListLable;
  fechas: string[];
}
export interface MercanciaCrossList {
  paisOrigenCrossList: CrossList;
  paisProcedencisCrossList: CrossList;
  usoEspecificoCrossList: CrossList;
}
export interface DestinatarioImitar {
  tipoPersona: string;
  modificarRFC: string;
  denominacion: string;
  domicilioPais: number;
  domicilioEstado: string;
  domicilioMunicipio: string;
  domicilioLocalidad: string;
  domicilioCodigo: string;
  domicilioColonia: string;
  domiciliCalle: string;
  domiciliNumeroExterior: string;
  domiciliNumeroInterior: string;
  domiciliLada: string;
  domiciliTelefono: string;
  domiciliCorreoElectronioco: string;
}

