

export interface Sector {
  descripcion?: string;
  descripcionSector?: string;

}

export interface Arancelaria {
  fraccion: string;
  fraccionArancelaria: string;
  descripcionComercial: string;
  anexoII: string;
  tipo: string;
  umt: string;
  categoria: string;
  valorMensual: string;
  valorAnual: string;
  volumenrMensual: string;
  volumenAnual: string;

}
export interface ArancelariaImportacion {
  fraccion: string;
  fraccionArancelaria: string;
  descripcionComercial: string;
  fraccionArancelariaImportacion: string;
  descripcionComercialImportacion: string;
  anexoII: string;
  tipo: string;
  umt: string;
  categoria: string;
  valorMensual: string;
  valorAnual: string;
  volumenrMensual: string;
  volumenAnual: string;

}
export interface DatosResponse {
  code: number;
  data: {
    idsubmanufacturer: string;
    infoServicios: {
      seleccionaLaModalidad: string;
      folio: string;
      ano: string;
    };
  };
}




export interface InfoServicios {
  seleccionaLaModalidad: string;
  folio: string;
  ano: string;
}

export interface Servicios {
  seleccionaLaModalidad: string;
  folio: string;
  ano: string;
}
export interface ResponseData {
  idsubmanufacturer: string;
  infoServicios: InfoServicios;
}

export interface ApiResponse {
  code: number;
  data: ResponseData;
  infoServicios: InfoServicios;
}
export interface AccionBoton {
  accion: string;
  valor: number;
}


