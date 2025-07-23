import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

export interface VehiculoParque {
  numeroEconomico: string;
  tipoVehiculo: string;
  marca: string;
  modelo: string;
  placas: string;
  capacidad: string;
  propietario: string;
}

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

export const TEXTOS_PARQUE_VEHICULAR = {
  MENSAJE_MODIFICACION: `<p>Para modificar o dar de baja un vehículo existente, primero debe seleccionarlo de la tabla.</p>`,
};
