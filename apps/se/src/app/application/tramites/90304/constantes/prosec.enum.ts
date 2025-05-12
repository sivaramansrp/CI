import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

import { EmpresasLista } from "../models/prosec.model";

/**
 * Configuración de la tabla de empresas
 * @type {ConfiguracionColumna<EmpresasLista>[]}
 */
export const TABLA_EMPRESAS_LISTA: ConfiguracionColumna<EmpresasLista>[] = [
    {
        encabezado: 'Estatus',
        clave: (item: EmpresasLista) => item.estatus,
        orden: 1
    },
    {
        encabezado: 'RFC',
        clave: (item: EmpresasLista) => item.rfc,
        orden: 2
    },
    {
        encabezado: 'Razón social',
        clave: (item: EmpresasLista) => item.razonSocial,
        orden: 3
    },
    {
        encabezado: 'Calle',
        clave: (item: EmpresasLista) => item.calle,
        orden: 4
    },
    {
        encabezado: 'Número interior',
        clave: (item: EmpresasLista) => item.numeroInterior,
        orden: 5
    },
    {
        encabezado: 'Número exterior',
        clave: (item: EmpresasLista) => item.numeroExterior,
        orden: 6
    },
    {
        encabezado: 'Código postal',
        clave: (item: EmpresasLista) => item.codigoPostal,
        orden: 7
    }
];