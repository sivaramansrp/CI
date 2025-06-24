/**
 * @fileoverview Este archivo define los modelos utilizados para manejar las respuestas relacionadas con 
 * las entidades "DestinoFinal" y "Proveedor" en la aplicación. Estas interfaces se utilizan 
 * para estructurar los datos de respuesta de la API para estas entidades.
 */

import { DestinoFinal } from '../../../shared/models/terceros-relacionados.model';
import { Proveedor } from '../../../shared/models/terceros-relacionados.model';

/**
 * @interface DestinoFinalRespuesta
 * @description Representa la estructura de la respuesta de la API para los datos de "DestinoFinal".
 * @property {number} code - El código de estado de la respuesta de la API.
 * @property {DestinoFinal[]} data - El arreglo de objetos "DestinoFinal" devueltos por la API.
 * @property {string} message - El mensaje asociado con la respuesta de la API.
 */
export interface DestinoFinalRespuesta {
    code: number;
    data: DestinoFinal[];
    message: string;
}

/**
 * @interface ProveedorRespuesta
 * @description Representa la estructura de la respuesta de la API para los datos de "Proveedor".
 * @property {number} code - El código de estado de la respuesta de la API.
 * @property {Proveedor[]} data - El arreglo de objetos "Proveedor" devueltos por la API.
 * @property {string} message - El mensaje asociado con la respuesta de la API.
 */
export interface ProveedorRespuesta {
    code: number;
    data: Proveedor[];
    message: string;
}