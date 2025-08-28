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

/**
 * Arreglo de configuraciones de columnas para la tabla de Domicilios de Plantas.
 * Cada objeto define la configuración de una columna, incluyendo el encabezado,
 * el campo asociado y otras propiedades de estilo.
 */
export interface MercanciasTabla {
  fraccion: string;
  claveDel: string;
}

export interface FraccionTabla {
  fraccion: string;
  claveDel: string;
}