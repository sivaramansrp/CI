/**
 * Constante que define los permisos para el proceso de maquila.
 * Cada objeto representa una etapa del proceso.
 */
export const PERMISO_MAQUILA = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

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
  'Colonia o equivalente',
];


/**
 * Mensajes de alerta para los manifiestos.
 * Contiene información sobre los requisitos y normatividad aplicable.
 */
export const MANIFIESTOS_ALERT = {
  DATOS_MANIFIESTOS: `Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.`,
};









