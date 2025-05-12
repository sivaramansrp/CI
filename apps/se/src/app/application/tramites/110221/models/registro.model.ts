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
  
  export const FECHA_INICIAL = {
    labelNombre: 'Fecha inicio',
    required: false,
    habilitado: true,
  };
  
  export const FECHA_FINAL = {
    labelNombre: 'Fecha fin',
    required: false,
    habilitado: true,
  };
  
  export const FECHA_FACTURA = {
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