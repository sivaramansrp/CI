import { CatalogosSelect, InputFecha } from '@libs/shared/data-access-user/src';

export const FECHA_DESTRUCCION_MERCANCIA: InputFecha = {
  /**
   * Etiqueta del campo de fecha de fin de vigencia.
   */
  labelNombre:
    'Fecha en la que se llevará a cabo la destrucción de la mercancía',
  /**
   * Indica si el campo es obligatorio.
   */
  required: true,
  /**
   * Indica si el campo está habilitado.
   */
  habilitado: true,
};

export const ENTIDAD_FEDERATIVA: CatalogosSelect = {
  labelNombre: 'Entidad federativa',
  required: true,
  primerOpcion: 'Seleccione un valor',
  catalogos: [],
};

export const MUNICIPIO_ALCALDIA: CatalogosSelect = {
  labelNombre: 'Municipio/ Alcaldía',
  required: true,
  primerOpcion: 'Seleccione un valor',
  catalogos: [],
};

export const COLONIA: CatalogosSelect = {
  labelNombre: 'Colonia',
  required: true,
  primerOpcion: 'Seleccione un valor',
  catalogos: [],
};


