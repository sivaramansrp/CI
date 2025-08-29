import { PartidasDeLaMercanciaModelo } from '../models/partidas-de-la-mercancia.model'
  
  export const PARTIDASDELAMERCANCIA_TABLA = [
    {
      encabezado: 'Cantidad',
      clave: (ele: PartidasDeLaMercanciaModelo):string => ele.cantidad,
      orden: 1
    },
    {
      encabezado: 'Unidad de medida',
      clave: (ele: PartidasDeLaMercanciaModelo):string => ele.unidadDeMedida,
      orden: 2
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: PartidasDeLaMercanciaModelo):string => ele.fraccionFrancelaria,
      orden: 3
    },
    {
      encabezado: 'Descripción',
      clave: (ele: PartidasDeLaMercanciaModelo):string => ele.descripcion,
      orden: 4
    },
    {
      encabezado: 'Precio unitario USD',
      clave: (ele: PartidasDeLaMercanciaModelo):string => ele.precioUnitarioUSD,
      orden: 5
    },
    {
      encabezado: 'Total USD',
      clave: (ele: PartidasDeLaMercanciaModelo):string => ele.totalUSD,
      orden: 6
    }
  ]
  
  export const TEXTOS = {
  INSTRUCCIONES: `<h5 style="text-align: center;">El formato del archivo a cargar no es válido. Favor de verificar</h5>
 `
  }

  export const ALERTARCHIVOMSG = {
    INSTRUCCIONES: `<h5 style="text-align: center;">No se ha seleccionado ningún archivo</h5>
 `
  }