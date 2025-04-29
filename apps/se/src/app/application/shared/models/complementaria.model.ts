export interface PlantasTabla{
    calle:string;
    numeroExterior:number;
    numeroInterior:number;
    codigoPostal:number;
    colonia:string;
    municipioOAlcaldia:string;
    estado:string;
    pais:string;
    registroFederal:string;
    razonSocial:string;
    domicilioFiscal:string;
    estatus:string;
    }

export interface SectorTabla{
    listaDeSectores: string;
    claveDelSector: string;
    estatus: string;
}

export interface Mercancias {
    fraccionArancelaria: string;
    claveDelSector: string;
    eStatus: string;
}

export interface MercanciasResquesta {
    code: number;
    data: Mercancias[];
    message: string;
}

export interface ProductorIndirecto {
    registroFederal: string;
    denominacion: string;
    correo: string;
    eStatus: string;
}

export interface ProductorIndirectoResquesta {
    code: number;
    data: ProductorIndirecto[];
    message: string;
}