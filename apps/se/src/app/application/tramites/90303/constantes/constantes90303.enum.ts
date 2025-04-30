import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { ListaTabla, ListaTablaBaja } from "../models/registro.model";

export const LISTA_DE_SECTORS: ConfiguracionColumna<ListaTabla>[] = [
    {
        encabezado: 'Estatus',
        clave: (ele: ListaTabla) => ele.estatus,
        orden: 1,
    },
    {
        encabezado: 'Clave de sector',
        clave: (ele: ListaTabla) => ele.claveDeSector,
        orden: 2,
    },
    {
        encabezado: 'Sector',
        clave: (ele: ListaTabla) => ele.sector,
        orden: 3,
    },
    ];

    export const LISTA_DE_SECTORS_Baja: ConfiguracionColumna<ListaTablaBaja>[] = [
        {
            encabezado: 'Estatus',
            clave: (ele: ListaTablaBaja) => ele.estatus,
            orden: 1,
        },
        {
            encabezado: 'Clave de sector',
            clave: (ele: ListaTablaBaja) => ele.claveDeSector,
            orden: 2,
        },
        {
            encabezado: 'Sector',
            clave: (ele: ListaTablaBaja) => ele.sector,
            orden: 3,
        },
        ];

    