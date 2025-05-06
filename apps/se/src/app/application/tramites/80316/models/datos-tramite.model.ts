export interface DatosSolicitante {
  rfc: string;
  denominacion: string;
  actividadEconomica: string;
  correoElectronico: string;
}

export interface DatosModificacion {
  rfc: string;
  federal: string;
  tipo: string;
  programa: string;
  actividadActual: string;
  actividadProductiva: string | null;
}

export interface DatosDelModificacion {
  id?: number;
  calle?: string;
  numeroExterior?: number;
  numeroInterior?: number;
  codigoPosta?: number;
  colonia?: string;
  municipioOAlcaldia?: string;
  entidadFederativa?: string;
  pais?: string;
  rfc?: string;
  domicilioFiscal?: string;
  razonSocial?: string;
  desEstatus?: string;
}

export interface Complimentaria {
  rfc?: string;
  nombre?: string;
  apellidoPrimer?: string;
  apellidoSegundo?: string;
}

export interface Federetarios {
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  numeroActa?: string;
}

export interface Operacions {
  id?: number;
  calle?: string; // Calle de la dirección
  numeroExterior?: string; // Número exterior de la dirección
  numeroInterior?: string; // Número interior de la dirección
  codigoPostal?: string; // Código postal
  localidad?: string; // Localidad
  colonia?: string; // Colonia
}

export interface Bitacora {
  tipoModificion: string;
  fetchModificion: string;
  valoresAnteriores: string;
  valoresNuevos: string;
}

export interface Empresas {
  id?: number;
  rfc?: string;
  razonSocial?: string;
  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  codigoPostal?: string;
  colonia?: string;
  delegacionMunicipio?: string;
  entidadFederativa?: string;
  pais?: string;
  telefono?: string;
  estatus?: boolean;
}

export interface Plantas {
  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  codigoPostal?: string;
  colonia?: string;
  delegacionMunicipio?: string;
}

export interface Servicios {
  id?: number;
  descripciondeservicio?: string;
  tipoServicio?: string;
  testado?: string;
  estatus?: string;
}

export interface FraccionSensible {
  id?: number;
  fraccionArancelariaExportacion?: number;
  cantidad?: number;
  valor?: number;
  unidadMedidaTarifaria?: string;
}

export interface Anexo {
  tipoFraccion?: string;
  fraccionArancelariaExportacion?: string;
  fraccionArancelariaImportacion?: string;
  descripcion?: string;
  valoresAnteriores?: string;
}

export interface datosDeLaTabla {
  id: number;
  folioDePrograma: string;
  tipoDePrograma: string;
}
