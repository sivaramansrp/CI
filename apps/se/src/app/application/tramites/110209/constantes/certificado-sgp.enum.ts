/**
 * Constante que define los pasos del asistente.
 */
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * Interfaz que define la estructura de las mercancías.
 */
export interface Mercancias {
  numeroDeOrden: string;
  fraccionArancelaria: string;
  nombreTecnico: string;
  nombreComercial: string;
  nombreIngles: string;
  numeroDeRegistro: string;
}
/**
 * Interfaz que define la estructura de la acción del botón.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Configuración de las mercancías para la tabla dinámica.
 */
export const CONFIGURACION_MERCANCIAS = [
  {
    encabezado: 'Número de orden',
    clave: (ele: Mercancias): string => ele.numeroDeOrden,
    orden: 1
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: Mercancias): string => ele.fraccionArancelaria,
    orden: 2
  },
  {
    encabezado: 'Nombre técnico',
    clave: (ele: Mercancias): string => ele.nombreTecnico,
    orden: 3
  },
  {
    encabezado: 'Nombre comercial',
    clave: (ele: Mercancias): string => ele.nombreComercial,
    orden: 4
  },
  {
    encabezado: 'Nombre inglés',
    clave: (ele: Mercancias): string => ele.nombreIngles,
    orden: 5
  },
  {
    encabezado: 'Número de registro',
    clave: (ele: Mercancias): string => ele.numeroDeRegistro,
    orden: 6
  }
];