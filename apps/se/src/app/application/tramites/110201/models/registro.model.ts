export interface ColumnasTabla {
  fraccionArancelaria: string;
  nombreTecnico: string;
  nombreComercial: string;
  numeroRegistroProductos: string;
  fechaExpedicion: string;
  fechaVencimiento: string;
}

export interface SeleccionadasTabla {
  fraccionArancelaria: string;
  cantidad: string;
  unidadMedida: string;
  valorMercancia: string;
  tipoFactura: string;
  numFactura: string;
  complementoDescripcion: string;
  fechaFactura: string;
}

export const FECHAINICIAL = {
  labelNombre: 'Fecha inicio',
  required: false,
  habilitado: true,
};

export const FECHAFINAL = {
  labelNombre: 'Fecha fin',
  required: false,
  habilitado: true,
};

export const FECHAFACTURA = {
  labelNombre: 'Fecha fin',
  required: true,
  habilitado: true,
};

export const DESPACHO_LDA = {
    labelNombre: 'Sí',
    maxlength: 10,
    minlenght: 0,
    required: false,
    alfanumerico: true,
  };