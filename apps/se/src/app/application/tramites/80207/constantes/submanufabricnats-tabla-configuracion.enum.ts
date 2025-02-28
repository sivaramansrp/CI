import { SubfacrintaTablaModelo } from "../modelos/submanufacturer-extension";

export const SUBFACRINTATABLACONFIGURACION = 
    [
        {
          encabezado: 'Calle',
          clave: (ele: SubfacrintaTablaModelo) => ele.calle ,
          orden: 1
        },
        {
          encabezado: 'Num.exterior', 
          clave: (ele: SubfacrintaTablaModelo) => ele.numExterior, 
          orden: 2,
        },
        {
          encabezado: 'Num.interior', 
          clave: (ele: SubfacrintaTablaModelo) => ele.numInterior, 
          orden: 3, 
        },
        {
          encabezado: 'Código postal', // Título de la columna
          clave: (ele: SubfacrintaTablaModelo) => ele.códigoPostal, // Función que devuelve el valor de la columna para cada fila
          orden: 4, // Orden de la columna en la tabla
        },
        {
          encabezado: 'Colonia', // Título de la columna
          clave: (ele: SubfacrintaTablaModelo) => ele.colonia, // Función que devuelve el valor de la columna para cada fila
          orden: 5, // Orden de la columna en la tabla
        },
      ];
