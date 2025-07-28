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

export const OPTIONS_TRATADO: CatalogosSelect = {
  labelNombre: 'Tratado/Acuerdo',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
}

export const OPTIONS_PAIS: CatalogosSelect = {
  labelNombre: 'País / Bloque',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
}

export const OPTIONS_UMC: CatalogosSelect = {
  labelNombre: 'UMC',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
}

export const OPTIONS_UNIDAD_MEDIDA: CatalogosSelect = {
  labelNombre: 'Unidad de medida de la masa bruta',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
}

export const OPTIONS_TIPO_FACTURA: CatalogosSelect = {
  labelNombre: 'Tipo de factura',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
}

export const OPTIONS_IDIOMA: CatalogosSelect = {
  labelNombre: 'Idioma',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
}

export const OPTIONS_ENTIDAD_FEDERATIVA: CatalogosSelect = {
  labelNombre: 'Entidad federativa',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
}

export const OPTIONS_REPRESENTACION_FEDERAL: CatalogosSelect = {
  labelNombre: 'Representación federal',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
}

export const OPTIONS_NACION: CatalogosSelect = {
  labelNombre: 'País destino',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
}
export const OPTIONS_TRANSPORTE: CatalogosSelect = {
  labelNombre: 'Medio de transporte',
  required: false,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
};

export const DESPACHO_LDA = {
  labelNombre: 'Sí',
  maxlength: 10,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};