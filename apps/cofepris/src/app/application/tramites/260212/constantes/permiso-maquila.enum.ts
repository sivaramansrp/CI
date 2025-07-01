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
 * Mensajes de alerta para los datos de solicitud.
 * Contiene información sobre el comportamiento al dar doble clic en una solicitud.
 */
export const DATOS_ALERT = {
  DATOS_SOLICITUD: `<p class="text-center">Al dar doble-clic en una Solicitud, se copiarán sus datos en esta Solicitud.<p>`,
};

/**
 * Mensajes de alerta para los manifiestos.
 * Contiene información sobre los requisitos y normatividad aplicable.
 */
export const MANIFIESTOS_ALERT = {
  DATOS_MANIFIESTOS: `Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una autoridad. Asimismo acepto que la notificación de este trámite, sea a través de la Ventanilla Única de Comercio Exterior por los mecanismos de la misma.`,
};

export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago:',
  required: false,
  habilitado: false,
};

export const NACIONALIDAD_OPCIONES_DE_BOTON_DE_RADIO = [
  {
      label: 'Nacional',
      value: '1',
  },
  {
      label: 'Extranjero',
      value: '0',
  }
];

export const PERSONA_OPCIONES_DE_BOTON_DE_RADIO = [
  {
      label: 'Física',
      value: '1',
      hint: 'Física'
  },
  {
      label: 'Moral',
      value: '0',
      hint: 'Moral'
  }
];