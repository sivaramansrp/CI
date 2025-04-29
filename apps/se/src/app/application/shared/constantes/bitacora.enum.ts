import { Bitacora } from "../models/bitacora.model";
import { ConfiguracionColumna } from "../models/modificacion.enum";

export const TABLA_BITACORA: ConfiguracionColumna<Bitacora>[] = [
    {
        encabezado: 'Tipo modificación',
        clave: (item: Bitacora) => item.tipoModificacion,
        orden: 1
    },
    {
        encabezado: 'Fecha modificación',
        clave: (item: Bitacora) => item.fechaModificacion,
        orden: 2
    },
    {
        encabezado: 'Valores anteriores',
        clave: (item: Bitacora) => item.valoresAnteriores,
        orden: 3
    },
    {
        encabezado: 'Valores nuevos',
        clave: (item: Bitacora) => item.valoresNuevos,
        orden: 4
    }
];