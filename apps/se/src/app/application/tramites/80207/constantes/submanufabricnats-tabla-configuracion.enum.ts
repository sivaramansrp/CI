/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { SubmanufacturerDireccionModelo } from "../modelos/submanufacturer-modelos";


export const SUBMANUFACTURADORES_TABLA_CONFIGURACION = 
    [
        {
          encabezado: 'Calle',
          clave: (ele: SubmanufacturerDireccionModelo) => ele.calle ,
          orden: 1
        },
        {
          encabezado: 'Num.exterior', 
          clave: (ele: SubmanufacturerDireccionModelo) => ele.numExterior, 
          orden: 2,
        },
        {
          encabezado: 'Num.interior', 
          clave: (ele: SubmanufacturerDireccionModelo) => ele.numInterior, 
          orden: 3, 
        },
        {
          encabezado: 'Código postal', // Título de la columna
          clave: (ele: SubmanufacturerDireccionModelo) => ele.codigoPostal, // Función que devuelve el valor de la columna para cada fila
          orden: 4, 
        },
        {
          encabezado: 'Colonia', // Título de la columna
          clave: (ele: SubmanufacturerDireccionModelo) => ele.colonia, // Función que devuelve el valor de la columna para cada fila
          orden: 5, // Orden de la columna en la tabla
        },
      ];
