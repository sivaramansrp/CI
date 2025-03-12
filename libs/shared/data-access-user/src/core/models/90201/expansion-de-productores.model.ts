export interface AcuseTablaDatos {
  no: string;
  documento: string;
  descargar: string;
}

export interface ProductorIndirectoTabla {
  registro: string;
  denominacion: string;
  correo: string;
}

export interface DomiciliosDePlantasTabla {
   calle: string;
   numero: string;
   interior: string;
   postal: string;
   colonia: string;
  municipio: string;
  estado: string;
}

export interface SectoresTabla {
  sectores: string;
  claveDel: string;
}
