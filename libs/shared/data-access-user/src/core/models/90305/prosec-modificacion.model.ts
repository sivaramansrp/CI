

export interface PROSEC_MODIFICATION_MODEL {
  calle: string; 
  numeroExterior: string; 
  numeroInterior : string; 
  codigoPostal: string; 
  colonia: string; 
  localidad:string;
  municipioOAlcaldia:string;
  entidadFederativa:string;
  pais:string;
  telefono:string;
  }


  export interface PLANTAS{
    calle: string; 
    numeroExterior: string; 
    numeroInterior : string; 
    codigoPostal: string; 
    colonia: string; 
    municipioOAlcaldia:string;
    entidadFederativa:string;
    pais:string;
    telefono:string;  
  }
  export interface  SECTOR_MODEL{
    listaDeSectores:string;
    claveDelSector:string;
    eStatus:string;
  }
  export interface MERCANCIAS_MODEL{
    fraccionArancelaria : string;
    claveDelSector :string;
    eStatus:string;
  }
  export interface PRODUCTOR_INDIRECTO{
    registroFederal :string;
    denominacion:string;
    correo :string;
    eStatus:string;
  }
  export interface BITACORA_MODEL{
    tipoModificacion:string;
    fechaModificacion:string;
    valoresAnteriores:string;
    valoresNuevos:string;
  }
  export interface MODIFICACAION_INFO{
    registroFederalContribuyentes:string;
    representacionFederal:string;
    tipoModificacion:string;
    modificacionPrograma:string
  }