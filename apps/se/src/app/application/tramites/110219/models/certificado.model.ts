export interface ColumnasTabla {
  numeroCertificado: string;
  pais: string;
  tratado: string;
  fechaExpedicion: string;
  fechaVencimiento: string;
}

export interface CertificadoApiData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  numeroCertificado?: string;
  paisAsociado?: {
    nombre?: string;
    codigo?: string;
    descripcion?: string;
  };
  tratadoAsociado?: {
    nombre?: string;
    codigo?: string;
    descripcion?: string;
  };
  fechaExpedicion?: string;
  fechaVencimiento?: string;
  nombre: string;
  observaciones?: string;
  nombreEmbarcacion?: string;
}

export interface MercanciaCertificado {
  numeroOrden: string;
  fraccionArancelaria: string;
  nombreTecnico: string;
  nombreComercial: string;
  nombreIngles: string;
  complementoDescripcion: string;
  marca: string;
  criterio: string;
  norma: string;
  cantidadExportar: string;
  unidad: string;
  masaBruta : string;
  comercializacion : string;
  valorMercancia: string;
  numeroFactura: string;
  fechaFactura: string;
  registroProductos: string;
}

export interface ProductoresAsociados {
  nombreProductor: string;
  numeroRegistroFiscal: string;
  direccion: string;
  correoElectronico: string;
  telefono: string;
  fax: string;
}

export const FECHAI_NICIAL = {
  labelNombre: 'Fecha inicial:',
  required: false,
  habilitado: true,
};

export const FECHA_FINAL = {
  labelNombre: 'Fecha final:',
  required: false,
  habilitado: true,
};

export const FECHA_EXPEDICION = {
  labelNombre: 'Fecha de expedición',
  required: false,
  habilitado: true,
};

export const FECHA_VENCIMIENTO = {
  labelNombre: 'Fecha de vencimiento',
  required: false,
  habilitado: true,
  readonly: true,
 
};
