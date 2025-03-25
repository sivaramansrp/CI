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
  numeroCertificado: string;
  pais: string;
  tratado: string;
  fechaExpedicion: string;
  fechaVencimiento: string;
}

export interface ProductoresAsociados {
  nombreProductor: string;
  numeroRegistroFiscal: string;
  direccion: string;
  correoElectronico: string;
  telefono: string;
  razonSocial: string;
}

export const FECHAINICIAL = {
  labelNombre: 'Fecha incial',
  required: false,
  habilitado: true,
};

export const FECHAFINAL = {
  labelNombre: 'Fecha final',
  required: false,
  habilitado: true,
};

export const FECHAEXPEDICIÓN = {
  labelNombre: 'Fecha de expedición',
  required: false,
  habilitado: true,
};

export const FECHAENCIMIENTO = {
  labelNombre: 'Fecha de vencimiento',
  required: false,
  habilitado: true,
  readonly: true,
 
};
