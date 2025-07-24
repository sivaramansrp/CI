
/**
 * Importa la definición de columna para tablas dinámicas.
 */
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';


/**
 * Interfaz que representa la estructura de un vehículo del parque vehicular.
 * Incluye los campos principales para identificar y describir un vehículo utilizado en el transporte.
 *
 * @interface VehiculoParque
 * @property {string} numeroEconomico - Número económico del vehículo.
 * @property {string} tipoVehiculo - Tipo de vehículo (ej. camión, tractocamión).
 * @property {string} marca - Marca del fabricante del vehículo.
 * @property {string} modelo - Modelo del vehículo.
 * @property {string} placas - Placas de circulación.
 * @property {string} capacidad - Capacidad de carga del vehículo.
 * @property {string} propietario - Nombre del propietario del vehículo.
 */
export interface VehiculoParque {
  numeroEconomico: string;
  tipoVehiculo: string;
  marca: string;
  modelo: string;
  placas: string;
  capacidad: string;
  propietario: string;
}

/**
 * Columnas de la tabla para mostrar los vehículos del parque vehicular.
 * Cada columna define el encabezado, la clave de acceso y el orden de aparición.
 *
 * @const PARQUE_VEHICULAR_COLUMNAS
 * @type {ConfiguracionColumna<VehiculoParque>[]}
 */
export const PARQUE_VEHICULAR_COLUMNAS: ConfiguracionColumna<VehiculoParque>[] = [
  {
    encabezado: 'Número económico',
    clave: (item: VehiculoParque) => item.numeroEconomico,
    orden: 1,
  },
  {
    encabezado: 'Tipo de vehículo',
    clave: (item: VehiculoParque) => item.tipoVehiculo,
    orden: 2,
  },
  {
    encabezado: 'Marca',
    clave: (item: VehiculoParque) => item.marca,
    orden: 3,
  },
  {
    encabezado: 'Modelo',
    clave: (item: VehiculoParque) => item.modelo,
    orden: 4,
  },
  {
    encabezado: 'Placas',
    clave: (item: VehiculoParque) => item.placas,
    orden: 5,
  },
  {
    encabezado: 'Capacidad',
    clave: (item: VehiculoParque) => item.capacidad,
    orden: 6,
  },
  {
    encabezado: 'Propietario',
    clave: (item: VehiculoParque) => item.propietario,
    orden: 7,
  },
];


/**
 * Textos y mensajes utilizados en la gestión del parque vehicular.
 *
 * @const TEXTOS_PARQUE_VEHICULAR
 * @property {string} MENSAJE_MODIFICACION - Mensaje de ayuda para modificar o eliminar un vehículo.
 */
export const TEXTOS_PARQUE_VEHICULAR = {
  MENSAJE_MODIFICACION: `<p>Para modificar o dar de baja un vehículo existente, primero debe seleccionarlo de la tabla.</p>`,
};
