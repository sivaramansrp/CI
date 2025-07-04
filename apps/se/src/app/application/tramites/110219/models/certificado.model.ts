export interface ColumnasTabla {
  numeroCertificado: string;
  pais: string;
  tratado: string;
  fechaExpedicion: string;
  fechaVencimiento: string;
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
  labelNombre: 'Fecha incial',
  required: false,
  habilitado: true,
};

export const FECHA_FINAL = {
  labelNombre: 'Fecha final',
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
