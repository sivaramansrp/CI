
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