/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/**
 * @interface DatosSolicitudFormaInt
 * @description Interfaz para el formulario de Datos de la solicitud.
 */
export interface DatosSolicitudFormaInt {
  claveDelPadron: string;
  observaciones: string;
  requiereInspeccionInmediata: string;
  informacionConfidencial: number;
}

/**
 * @interface RegionFormaInt
 * @description Interfaz para el formulario de Datos Generales.
 */
export interface RegionFormaInt {
  estado: string;
  productoCafe: string;
  descRegionCompra: string;
  descripTipoCafe: string;
  volumen: number;
}

/**
 * @interface BeneficiosFormaInt
 * @description Interfaz para el formulario de Pago de derechos(Revisión Documental).
 */
export interface BeneficiosFormaInt {
  razonSocial: string;
  propAlquil: string;
  calle: string;
  numeroExterior: number;
  numeroInterior: number;
  colonia: string;
  estado: number;
  codigoPostal: number;
  capacidadAlmacenaje: number;
  volumenAlmacenaje: number;
}
/**
 * @interface BodegasFormaInt
 * @description Interfaz para el formulario de Pago de derechos.
 */
export interface BodegasFormaInt {
  razonSocial: string;
  propAlquil: string;
  calle: string;
  numeroExterior: number;
  numeroInterior: number;
  colonia: string;
  estado: number;
  codigoPostal: number;
  capacidadAlmacenaje: number;
}


export interface CafExportFormaInt {
  descripcionMercancia: string;
  clasificacion: string;
  porcentajeConcentracion: number;
}

