import { PartidasDeLaMercanciaModelo } from '../models/partidas-de-la-mercancia.model'
  
  export const PARTIDASDELAMERCANCIA_TABLA = [
    {
      encabezado: 'Cantidad',
      clave: (ele: PartidasDeLaMercanciaModelo) => ele.cantidad,
      orden: 1
    },
    {
      encabezado: 'Unidad de medida',
      clave: (ele: PartidasDeLaMercanciaModelo) => ele.unidadDeMedida,
      orden: 2
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: PartidasDeLaMercanciaModelo) => ele.fraccionFrancelaria,
      orden: 3
    },
    {
      encabezado: 'Descripción',
      clave: (ele: PartidasDeLaMercanciaModelo) => ele.descripcion,
      orden: 4
    },
    {
      encabezado: 'Precio unitario USD',
      clave: (ele: PartidasDeLaMercanciaModelo) => ele.precioUnitarioUSD,
      orden: 5
    },
    {
      encabezado: 'Total USD',
      clave: (ele: PartidasDeLaMercanciaModelo) => ele.totalUSD,
      orden: 6
    }
  ]
  