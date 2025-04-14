export const CROSLISTA_DE_PAISES: string[] = [
  'AFGANISTÁN (EMIRATO ISLÁMICO)',
  'ALBANIA (REPÚBLICA DE)',
  'ALEMANIA (REPÚBLICA FEDERAL DE)',
  'ANDORRA (PRINCIPADO DE)',
  'ANGOLA (REPÚBLICA DE)',
  'ANGUILLA',
  'ANTIGUA Y BARBUDA',
  'ARABIA SAUDITA (COMUNIDAD ECONÓMICA EUROPEA)',
  'ARGELIA (REPÚBLICA DEMOCRÁTICA Y POPULAR DE)',
  'ARGENTINA (REPÚBLICA)',
  'AUSTRALIA (COMMONWEALTH OF)',
  'AUSTRIA (REPUBLIC OF)',
  'BAHAMAS (COMMONWEALTH OF THE)',
  'BAHRAIN (KINGDOM OF)',
  "BANGLADESH (PEOPLE'S REPUBLIC OF)",
  'BARbados',
  'BELGIUM (KINGDOM OF)',
  'BELIZE',
  'BENIN (REPUBLIC OF)',
  'BHUTAN (KINGDOM OF)',
];

export const CONTINUAR: string = 't';
export const MENSAJE_DE_ALERTA: string =
  'Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una autoridad. Asimismo acepto que la notificación de este trámite, sea a través de la Ventanilla Única de Comercio Exterior por los mecanismos de la misma.';

export const INPUT_FECHA_CONFIG = {
  labelNombre: 'Fecha de pago',
  required: true,
  habilitado: true,
};

export const INPUT_FECHA_CADUCIDAD_CONFIG = {
  labelNombre: 'Fecha de caducidad',
  required: false,
  habilitado: true,
};

/**
 * Encabezados para la tabla de terceros relacionados.
 * Cada cadena representa una columna en la tabla.
 */
export const TERCEROS_RELACIONADOS_TABLE_HEADER_DATA = [
  'Nombre/denominación o razón social',
  'R.F.C',
  'CURP',
  'Teléfono',
  'Correo electrónico',
  'Calle',
  'Número exterior',
  'Número interior',
  'País',
  'Colonia',
  'Municipio o alcaldía',
  'Localidad',
  'Entidad federativa',
  'Estado/localidad',
  'Código postal',
];

export const DEFAULT_TABLE_ORDER = [
  { name: 'Fabricante', order: 1, isVisible: true },
  { name: 'Formulador', order: 2, isVisible: true },
  { name: 'Proveedor', order: 3, isVisible: true },
];
