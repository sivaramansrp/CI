import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { DatosDelChoferNacional } from "../models/registro-muestras-mercancias.model";

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

export const TEXTOS = {
  INSTRUCCIONES:`<p>Para modificar o dar de baja un chófer nacional existente en su CAAT, primero debe realizar su búsqueda.</p>`,
};
