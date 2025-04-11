export interface HeaderTablaAcuses {
    key: keyof BodyTablaAcuses;
    valor: string;
  }
  
  export interface BodyTablaAcuses {
    id: number;
    idDocumento: string;
    documento: string;
    urlPdf: string;
  }

  export interface BodyTablaResolucion {
    id: number;
    idDocumento: string;
    documento: string;
    urlPdf: string;
  }

  export interface HeaderTablaRequerimientos {
    key: keyof BodyTablaRequerimiento;
    valor: string;
  }
  export interface BodyTablaRequerimiento {
    id: number;
    fechaCreacion: string;
    fechaGeneracion: string;
    fechaAtencion: string;
    estatus: string;
    urlPdf: string;
}

export interface HeaderTablaTareasTramite {
  key: keyof BodyTablaTareasTramite;
  valor: string;
}
export interface BodyTablaTareasTramite {
  id: number;
  nombreTarea: string;
  nombreUsuarioAsignado: string;
  claveUsuarioAsignado: string;
  fechaAsignacion: string;
  fechaAtencion: string|null;
}

export interface HeaderTablaDictamenes {
  key: keyof BodyTablaDictamenes;
  valor: string;
}
export interface BodyTablaDictamenes {
  id: number;
  fechaCreacion: string;
  fechaGeneracion: string;
  fechaAutorizacion: string;
  tipo: string;
  estatus: string;
  sentido: string;
  urlPdf: string;
}

export interface HeaderTablaDocumentos {
  key: keyof BodyTablaDocumentos;
  valor: string;
}
export interface BodyTablaDocumentos {
  tipoDocumento: string;
  estatus: string;
  fechaAdjunto: string;
  nombreArchivo: string;
  urlPdf: string;
}

export interface HeaderTablaEnvioDigital {
  key: keyof BodyTablaEnvioDigital;
  valor: string;
}
export interface BodyTablaEnvioDigital {
  id: number;
  fecha: string;
  transaccion: string;
  estado: string;
  observaciones: string;
}

export interface HeaderTablaOpinion {
  key: keyof BodyTablaOpinion;
  valor: string;
}
export interface BodyTablaOpinion {
  id: number;
  documento: string;
  urlPdf: string;
}

/*
* Tabla de opiniones
* Se utiliza para mostrar la tabla de opiniones en el componente opinion.  
* Es la primera pestaña que se muestra al abrir el componente.
*/ 
export interface HeaderTablaOpiniones {
  key: keyof BodyTablaOpiniones;
  valor: string;
}
export interface BodyTablaOpiniones {
  id: number;
  fechaSolicitud: string;
  areaSolicitante: string;
  areaResponsable: string;
  estatus: string;
  urlPdf: string;
}

export interface SolicitudDetalleOpiniones {
  id: number;
  areaSolicitante: string;
  estatus: string;
  fechaCreacion: string;
  fechaSolicitud: string;
  justificacionOpinion: string;  
}
export interface OpinionDetalleOpiniones {
  id: number;
  areaResponsable: string;
  sentido: string;
  generadoPor: string;
  fechaGeneracion: string;
  opinion: string;  
}