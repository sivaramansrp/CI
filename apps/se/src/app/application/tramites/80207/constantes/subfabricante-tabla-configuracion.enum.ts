/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { SubfabricanteDireccionModelo } from "../modelos/subfabricante.model";


export const SUBFABRICANTE_TABLA_CONFIGURACION = 
    [
        {
          encabezado: 'Calle',
          clave: (ele: SubfabricanteDireccionModelo) => ele.calle ,
          orden: 1
        },
        {
          encabezado: 'Num.exterior', 
          clave: (ele: SubfabricanteDireccionModelo) => ele.numExterior, 
          orden: 2,
        },
        {
          encabezado: 'Num.interior', 
          clave: (ele: SubfabricanteDireccionModelo) => ele.numInterior, 
          orden: 3, 
        },
        {
          encabezado: 'Código postal', // Título de la columna
          clave: (ele: SubfabricanteDireccionModelo) => ele.codigoPostal, // Función que devuelve el valor de la columna para cada fila
          orden: 4, 
        },
        {
          encabezado: 'Colonia', // Título de la columna
          clave: (ele: SubfabricanteDireccionModelo) => ele.colonia, // Función que devuelve el valor de la columna para cada fila
          orden: 5, // Orden de la columna en la tabla
        },
      ];
