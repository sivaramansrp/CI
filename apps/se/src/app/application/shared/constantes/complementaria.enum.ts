import { Mercancias, PlantasTabla, ProductorIndirecto, SectorTabla } from '../models/complementaria.model';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';

/**
 * Configuración de la tabla de Plantas.
 * @type {ConfiguracionColumna<PlantasTabla>[]}
 */
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

/**
 * Configuración de la tabla de sectores.
 * @type {ConfiguracionColumna<SectorTabla>[]}
 */
export const SECTOR: ConfiguracionColumna<SectorTabla>[] = [
    { encabezado: 'Lista de sectores', clave: (item: SectorTabla) => item.listaDeSectores, orden: 1 },
    { encabezado: 'Clave del sector', clave: (item: SectorTabla) => item.claveDelSector, orden: 2 },
    { encabezado: 'Estatus', clave: (item: SectorTabla) => item.estatus, orden: 3 }
];

/**
 * Configuración de la tabla de mercancías.
 * @type {ConfiguracionColumna<Mercancias>[]}
 */
export const TABLA_PRODUCIR_MERCANCIAS: ConfiguracionColumna<Mercancias>[] = [
    {
        encabezado: 'Fracción arancelaria',
        clave: (item: Mercancias) => item.fraccionArancelaria,
        orden: 1,
    },
    {
        encabezado: 'Clave del sector',
        clave: (item: Mercancias) => item.claveDelSector,
        orden: 2,
    },
    {
        encabezado: 'Estatus',
        clave: (item: Mercancias) => item.eStatus,
        orden: 3,
    }
];

/**
 * Configuración de la tabla de productores indirectos.
 * @type {ConfiguracionColumna<ProductorIndirecto>[]}
 */
export const TABLA_PRODUCTOR_INDIRECTO: ConfiguracionColumna<ProductorIndirecto>[] = [
    {
        encabezado: 'Registro federal de contribuyentes',
        clave: (item: ProductorIndirecto) => item.registroFederal,
        orden: 1
    },
    {
        encabezado: 'Denominación o razón social',
        clave: (item: ProductorIndirecto) => item.denominacion,
        orden: 2
    },
    {
        encabezado: 'Correo',
        clave: (item: ProductorIndirecto) => item.correo,
        orden: 3
    },
    {
        encabezado: 'Estatus',
        clave: (item: ProductorIndirecto) => item.eStatus,
        orden: 4
    }
];