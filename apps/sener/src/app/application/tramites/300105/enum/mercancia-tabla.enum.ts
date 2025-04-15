export interface SerieConfiguracionItem {
  serie: string;
}

export interface ConfiguracionItem {

  id: number;

    marca: string;

    modelo: string;

    serie: string;

    voltaje: string;

    unidadMedidaVoltaje: string;

    corriente: string;

    unidadMedidaCorriente: string;

    numEquipos: string;

  fraccionArancelaria: string;

  fraccionDescripcion: string;
}

export const SERIE_TABLA_CONFIGURACION = [
  {
    encabezado: 'Serie',
    clave: (item: SerieConfiguracionItem): string => item.serie,
    orden: 1,
  }
]

export const TABLA_CONFIGURACION = [
  {
    encabezado: 'Marca',
    clave: (item: ConfiguracionItem): string => item.marca,
    orden: 1,
  },
  {
    encabezado: 'Modelo',
    clave: (item: ConfiguracionItem): string => item.modelo,
    orden: 2,
  },
  {
    encabezado: 'Número de serie',
    clave: (item: ConfiguracionItem): string => item.serie,
    orden: 3,
  },
  {
    encabezado: 'Voltaje máximo del tubo de R-X',
    clave: (item: ConfiguracionItem): string => item.voltaje,
    orden: 4,
  },
  {
    encabezado: 'Unidad de voltaje',
    clave: (item: ConfiguracionItem): string => item.unidadMedidaVoltaje,
    orden: 5,
  },
  {
    encabezado: 'Corriente máxima del tubo de R-X',
    clave: (item: ConfiguracionItem): string => item.corriente,
    orden: 6,
  },
  {
    encabezado: 'Unidad de corriente',
    clave: (item: ConfiguracionItem): string => item.unidadMedidaCorriente,
    orden: 7,
  },
  {
    encabezado: 'Número de equipos',
    clave: (item: ConfiguracionItem): string => item.numEquipos,
    orden: 8,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (item: ConfiguracionItem): string => item.fraccionArancelaria,
    orden: 9,
  },
  {
    encabezado: 'Descripción de la fracción arancelaria',
    clave: (item: ConfiguracionItem): string => item.fraccionDescripcion,
    orden: 10,
  }
]