import { ChoferesExtranjeros, DatosDelChoferNacional } from "../models/registro-muestras-mercancias.model";
import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

export const CHOFERES_NACIONALES_ALTA: ConfiguracionColumna<DatosDelChoferNacional>[] = [
    {
        encabezado: 'CURP',
        clave: (item: DatosDelChoferNacional) => item.curp,
        orden: 1,
    },
    {
        encabezado: 'Número',
        clave: (item: DatosDelChoferNacional) => item.nombre,
        orden: 2,
    },
    {
        encabezado: 'calle',
        clave: (item: DatosDelChoferNacional) => item.calle,
        orden: 3,
    },
    {
        encabezado: 'Numero exterior',
        clave: (item: DatosDelChoferNacional) => item.numeroExterior,
        orden: 4,
    },
    {
        encabezado: 'Numero interior',
        clave: (item: DatosDelChoferNacional) => item.numeroInterior,
        orden: 5,
    },
    {
        encabezado: 'País',
        clave: (item: DatosDelChoferNacional) => item.pais,
        orden: 6,
    },
    {
        encabezado: 'Estado',
        clave: (item: DatosDelChoferNacional) => item.estado,
        orden: 7,
    },
    {
        encabezado: 'Municipio o Alcaldía',
        clave: (item: DatosDelChoferNacional) => item.municipioAlcaldia,
        orden: 8,
    },
    {
        encabezado: 'Colonia',
        clave: (item: DatosDelChoferNacional) => item.colonia,
        orden: 9,
    },
    {
        encabezado: 'Localidad',
        clave: (item: DatosDelChoferNacional) => item.localidad,
        orden: 10,
    },
    {
        encabezado: 'Codigo Postal',
        clave: (item: DatosDelChoferNacional) => item.codigoPostal,
        orden: 11,
    },
    {
        encabezado: 'País de Residencia',
        clave: (item: DatosDelChoferNacional) => item.paisDeResidencia,
        orden: 12,
    }
];

export const CHOFERES_EXTRANJEROS_TABLA: ConfiguracionColumna<ChoferesExtranjeros>[] = [
    {
        encabezado: 'Número del seguro social',
        clave: (item: ChoferesExtranjeros) => item.numeroDelSeguroSocial,
        orden: 1,
    },
    {
        encabezado: 'Número',
        clave: (item: ChoferesExtranjeros) => item.numero,
        orden: 2,
    },
    {
        encabezado: 'Calle',
        clave: (item: ChoferesExtranjeros) => item.calle,
        orden: 3,
    },
    {
        encabezado: 'Número Exterior',
        clave: (item: ChoferesExtranjeros) => item.numeroExterior,
        orden: 4,
    },
    {
        encabezado: 'Número Interior',
        clave: (item: ChoferesExtranjeros) => item.numeroInterior,
        orden: 5,
    },
    {
        encabezado: 'País',
        clave: (item: ChoferesExtranjeros) => item.pais,
        orden: 6,
    },
    {
        encabezado: 'Estado',
        clave: (item: ChoferesExtranjeros) => item.estado,
        orden: 7,
    },
    {
        encabezado: 'Primer Apellido',
        clave: (item: ChoferesExtranjeros) => item.primerApellido,
        orden: 8,
    },
    {
        encabezado: 'Segundo Apellido',
        clave: (item: ChoferesExtranjeros) => item.segundoApellido,
        orden: 9,
    },
    {
        encabezado: 'RFC',
        clave: (item: ChoferesExtranjeros) => item.rfc,
        orden: 10,
    },
    {
        encabezado: 'Número de gafete del chofer',
        clave: (item: ChoferesExtranjeros) => item.numeroDeGafete,
        orden: 11,
    },
    {
        encabezado: 'Fecha fin de Vigencia Gafete',
        clave: (item: ChoferesExtranjeros) => item.fechaFindDeVigencia,
        orden: 12,
    },
    {
        encabezado: 'Municipio o alcaldía',
        clave: (item: ChoferesExtranjeros) => item.municipioAlcaldia,
        orden: 13,
    },
    {
        encabezado: 'Colonia',
        clave: (item: ChoferesExtranjeros) => item.colonia,
        orden: 14,
    },
    {
        encabezado: 'País de residencia',
        clave: (item: ChoferesExtranjeros) => item.paisDeResidencia,
        orden: 15,
    },
    {
        encabezado: 'Ciudad',
        clave: (item: ChoferesExtranjeros) => item.ciudad,
        orden: 16,
    },
];

export const TEXTOS = {
    MENSAJE_NACIONAL: `<p>Para modificar o dar de baja un chófer nacional existente en su CAAT, primero debe realizar su búsqueda.</p>`,
    MENSAJE_EXTRANJERO: `<p>Para modificar o dar de baja un chófer extranjero existente en su CAAT, primero debe realizar su búsqueda.</p>`,
};
