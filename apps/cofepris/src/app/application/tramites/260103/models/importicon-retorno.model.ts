
import { TablaMercanciasDatos } from "../../../shared/models/datos-solicitud.model";
/**
 * Represents the data model for imported goods in a table format.
 * Extends the `TablaMercanciasDatos` interface to include additional properties.
 *
 * @property {string} [cantidadUmtValor] - The value of the quantity in the unit of measurement for transport (UMT).
 * @property {string} [cantidadUmcValor] - The value of the quantity in the unit of measurement for commerce (UMC).
 * @property {string} [marca] - The brand or trademark of the imported goods.
 */
export interface TablaMercanciasImportacion extends TablaMercanciasDatos {
    cantidadUmtValor?:string;
    cantidadUmcValor?:string;
    marca?:string;
  }


  /**
 * @interface Facturador
 * @description Representa los datos correspondientes a un facturador.
 */
/**
 * @description
 * Interfaz que representa la información de un facturador.
 * 
 * @property {number} [id] - Identificador único del facturador (opcional).
 * @property {string} curp - CURP del facturador.
 * @property {string} [rfc] - RFC del facturador (opcional).
 * @property {string} nombreDescripcion - Nombre o descripción del facturador.
 * @property {string} nacionalidad - Nacionalidad del facturador.
 * @property {string} tipoPersona - Tipo de persona (física o moral).
 * @property {string} nombres - Nombres del facturador.
 * @property {string} primerApellido - Primer apellido del facturador.
 * @property {string} segundoApellido - Segundo apellido del facturador.
 * @property {string} pais - País de residencia del facturador.
 * @property {string} estado - Estado de residencia del facturador.
 * @property {string} codigoPostal - Código postal del domicilio del facturador.
 * @property {string} colonia - Colonia del domicilio del facturador.
 * @property {string} calle - Calle del domicilio del facturador.
 * @property {string} numeroExterior - Número exterior del domicilio.
 * @property {string} numeroInterior - Número interior del domicilio.
 * @property {string} lada - Lada telefónica.
 * @property {string} telefono - Número de teléfono.
 * @property {string} correoElectronico - Correo electrónico de contacto.
 * @property {string} localidad - Localidad del domicilio.
 * @property {string} municipioAlcaldia - Municipio o alcaldía del domicilio.
 * @property {string} denominacionRazon - Denominación o razón social.
 */
export interface Facturador {
  id?: number;
  curp: string;
  rfc?: string;
  nombreDescripcion: string;
  nacionalidad: string;
  tipoPersona: string;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  pais: string;
  estado: string;
  codigoPostal: string;
  colonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  lada: string;
  telefono: string;
  correoElectronico: string;
  localidad: string;
  municipioAlcaldia: string;
  denominacionRazon: string;


}