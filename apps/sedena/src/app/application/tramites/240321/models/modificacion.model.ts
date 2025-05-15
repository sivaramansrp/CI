/**
 * @fileoverview This file defines the models used for handling responses related to 
 * "DestinoFinal" and "Proveedor" entities in the application. These interfaces are 
 * used to structure the API response data for these entities.
 */

import { DestinoFinal } from '../../../shared/models/terceros-relacionados.model';
import { Proveedor } from '../../../shared/models/terceros-relacionados.model';

/**
 * @interface DestinoFinalRespuesta
 * @description Represents the structure of the API response for "DestinoFinal" data.
 * @property {number} code - The status code of the API response.
 * @property {DestinoFinal[]} data - The array of "DestinoFinal" objects returned by the API.
 * @property {string} message - The message associated with the API response.
 */
export interface DestinoFinalRespuesta {
    code: number;
    data: DestinoFinal[];
    message: string;
}

/**
 * @interface ProveedorRespuesta
 * @description Represents the structure of the API response for "Proveedor" data.
 * @property {number} code - The status code of the API response.
 * @property {Proveedor[]} data - The array of "Proveedor" objects returned by the API.
 * @property {string} message - The message associated with the API response.
 */
export interface ProveedorRespuesta {
    code: number;
    data: Proveedor[];
    message: string;
}