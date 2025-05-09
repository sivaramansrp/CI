import { CatalogosSelect } from "@libs/shared/data-access-user/src";

export const FECHA_FIN = {
  labelNombre: 'Fecha fin',
  required: true,
  habilitado: true,
};

export const RADIO_OPCIONS = [
  { label: 'Ampliación de vigencia', value: 'vigencia' },
  { label: 'Ampliación de monto', value: 'monto' }
];

export const ANO_CATALOGO: CatalogosSelect = {
  labelNombre: 'Año del oficio de asignación',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
};