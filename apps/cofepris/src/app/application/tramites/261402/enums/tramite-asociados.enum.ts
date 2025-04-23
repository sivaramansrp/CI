import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { TramiteAsociados } from "../../../shared/models/tramite-asociados.model";

/**
 * Configuración de las columnas para la tabla de trámites asociados.
 */
export const CONFIGURACIONCOLUMNA: ConfiguracionColumna<TramiteAsociados>[] = [
    /**
     * Columna vacía para el identificador único del trámite.
     * encabezado - Encabezado de la columna (vacío).
     * clave - Función que retorna el ID del trámite.
     * orden - Orden de la columna en la tabla.
     */
    { encabezado: '', clave: (item: TramiteAsociados) => item.id, orden: 1 },

    /**
     * Columna para mostrar el folio del trámite.
     * encabezado - Encabezado de la columna: "Folio trámite".
     * clave - Función que retorna el folio del trámite.
     * orden - Orden de la columna en la tabla.
     */
    {
      encabezado: 'Folio trámite',
      clave: (item: TramiteAsociados) => item.folioTramite,
      orden: 2,
    },

    /**
     * Columna para mostrar el tipo de trámite.
     * encabezado - Encabezado de la columna: "Tipo trámite".
     * clave - Función que retorna el tipo de trámite.
     * orden - Orden de la columna en la tabla.
     */
    {
      encabezado: 'Tipo trámite',
      clave: (item: TramiteAsociados) => item.tipoTramite,
      orden: 3,
    },

    /**
     * Columna para mostrar el estatus del trámite.
     * encabezado - Encabezado de la columna: "Estatus".
     * clave - Función que retorna el estatus del trámite.
     * orden - Orden de la columna en la tabla.
     */
    {
      encabezado: 'Estatus',
      clave: (item: TramiteAsociados) => item.estatus,
      orden: 4,
    },

    /**
     * Columna para mostrar la fecha de alta del registro.
     * encabezado - Encabezado de la columna: "Fecha alta de registro".
     * clave - Función que retorna la fecha de alta del registro.
     * orden - Orden de la columna en la tabla.
     */
    {
      encabezado: 'Fecha alta de registro',
      clave: (item: TramiteAsociados) => item.fetchaAltaDeRegistro,
      orden: 5,
    },
];