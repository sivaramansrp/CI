import { CatalogosSelect } from "@libs/shared/data-access-user/src";

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
  labelNombre: 'Fecha de inicio de vigencia de la asignación',
  required: false,
  habilitado: true,
};

export const FECHA_FINAL = {
  labelNombre: 'Fecha de fin vigencia de la asignacion',
  required: false,
  habilitado: true,
};

export const FECHA_FIN = {
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

  export const RADIO_OPCIONS = [
    { label: 'Ampliación de vigencia', value: 'ampliacion de vigencia' },
    { label: 'Ampliación de monto', value: 'ampliacion de monto' }
  ];

  export const ANO_CATALOGO: CatalogosSelect = {
    labelNombre: 'Año del oficio de asignación',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };