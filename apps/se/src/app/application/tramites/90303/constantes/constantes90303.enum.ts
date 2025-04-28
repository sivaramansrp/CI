import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { ListaTabla, PlantasTabla } from "../models/registro.model";

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

    export const PLANTAS: ConfiguracionColumna<PlantasTabla>[] = [
        { encabezado: 'Calle', clave: (item: PlantasTabla) => item.calle, orden: 1 },
        { encabezado: 'Número exterior', clave: (item: PlantasTabla) => item.numeroExterior, orden: 2 },
        { encabezado: 'Número interior', clave: (item: PlantasTabla) => item.numeroInterior, orden: 3 },
        { encabezado: 'Código postal', clave: (item: PlantasTabla) => item.codigoPostal, orden: 4 },
        { encabezado: 'Colonia', clave: (item: PlantasTabla) => item.colonia, orden: 5 },
        { encabezado: 'Municipio o alcaldía', clave: (item: PlantasTabla) => item.municipioOAlcaldia, orden: 6 },
        { encabezado: 'Estado', clave: (item: PlantasTabla) => item.estado, orden: 7 },
        { encabezado: 'País', clave: (item: PlantasTabla) => item.pais, orden: 8 },
        { encabezado: 'Registro federal de contribuyentes', clave: (item: PlantasTabla) => item.registroFederal, orden: 9 },
        { encabezado: 'Razón social', clave: (item: PlantasTabla) => item.razonSocial, orden: 10 },
        { encabezado: 'Domicilio fiscal del solicitante', clave: (item: PlantasTabla) => item.domicilioFiscal, orden: 11 },
        { encabezado: 'Estatus', clave: (item: PlantasTabla) => item.estatus, orden: 12 },
      ];