/**
 * @const PERMISO_MAQUILA
 * @description Constante que define los pasos del permiso de maquila.
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
  }
];

/**
 * @const TERCEROS_RELACIONADOS_FABRICANTE
 * @description Constante que define los encabezados de la tabla para los fabricantes relacionados.
 */
export const TERCEROS_RELACIONADOS_FABRICANTE = [
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
 * @const TERCEROS_RELACIONADOS_DESTINATARIO
 * @description Constante que define los encabezados de la tabla para los destinatarios relacionados.
 */
export const TERCEROS_RELACIONADOS_DESTINATARIO = [
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
 * @const TERCEROS_RELACIONADOS_PROVEEDOR
 * @description Constante que define los encabezados de la tabla para los proveedores relacionados.
 */
export const TERCEROS_RELACIONADOS_PROVEEDOR = [
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
 * @const TERCEROS_RELACIONADOS_FACTURADOR
 * @description Constante que define los encabezados de la tabla para los facturadores relacionados.
 */
export const TERCEROS_RELACIONADOS_FACTURADOR = [
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
export const DATOS_ALERT={
  DATOS_SOLICITUD:`<p>Al dar doble-clic en una Solicitud, se copiarán sus datos en esta Solicitud.<p>`,
  }

  export const MANIFIESTOS_ALERT={
    DATOS_MANIFIESTOS:`Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una autoridad. Asimismo acepto que la notificación de este trámite, sea a través de la Ventanilla Única de Comercio Exterior por los mecanismos de la misma.`,
    }
