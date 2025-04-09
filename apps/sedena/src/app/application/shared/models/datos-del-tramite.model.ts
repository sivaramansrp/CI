import { ConfiguracionColumna } from '@ng-mf/data-access-user';

export interface MercanciaDetalle {
  fraccionArancelaria: string;
  descripcionFraccion: string;
  unidadMedidaTarifa: string; // UMT
  umc: string;
  cantidadUMT: number;
  valorComercial: number;
  tipoMoneda: string;
  descripcion: string;
  paisOrigen: string;
}

export const MERCANCIA_ENCABEZADO_DE_TABLA: ConfiguracionColumna<MercanciaDetalle>[] =
  [
    {
      encabezado: 'Fracción arancelaria',
      clave: (fila) => fila.fraccionArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Descripción de la fracción',
      clave: (fila) => fila.descripcionFraccion,
      orden: 2,
    },
    {
      encabezado: 'Unidad de medida de tarifa (UMT)',
      clave: (fila) => fila.unidadMedidaTarifa,
      orden: 3,
    },
    {
      encabezado: 'UMC',
      clave: (fila) => fila.umc,
      orden: 4,
    },
    {
      encabezado: 'Cantidad en UMT',
      clave: (fila) => fila.cantidadUMT,
      orden: 5,
    },
    {
      encabezado: 'Valor comercial',
      clave: (fila) => fila.valorComercial,
      orden: 6,
    },
    {
      encabezado: 'Tipo moneda',
      clave: (fila) => fila.tipoMoneda,
      orden: 7,
    },
    {
      encabezado: 'Descripción',
      clave: (fila) => fila.descripcion,
      orden: 8,
    },
    {
      encabezado: 'País de origen',
      clave: (fila) => fila.paisOrigen,
      orden: 9,
    },
  ];
