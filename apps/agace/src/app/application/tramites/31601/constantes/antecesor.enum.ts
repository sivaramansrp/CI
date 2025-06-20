import { Antecesor } from "../modelos/antecesor.modal";

export const CONFIGURACION_ANTECESORES = [
    {
        encabezado: 'Tipo de persona',
        clave: (ele: Antecesor): string => ele.tipoPersona,
        orden: 1,
    },
    {
        encabezado: 'Nombre',
        clave: (ele: Antecesor): string => ele.nombre,
        orden: 2,
    },
    {
        encabezado: 'RFC',
        clave: (ele: Antecesor): string => ele.rfc,
        orden: 3,
    },
    {
        encabezado: 'Carácter',
        clave: (ele: Antecesor): string => ele.caracter,
        orden: 4,
    },
    {
        encabezado: 'Nacionalidad',
        clave: (ele: Antecesor): string => ele.nacionalidad,
        orden: 5,
    },
    {
        encabezado: 'Obligado a tributar en México',
        clave: (ele: Antecesor): string => ele.obligadoTributarMexico ? 'Sí' : 'No',
        orden: 6,
    },
    {
        encabezado: 'Nombre de la empresa',
        clave: (ele: Antecesor): string => ele.nombreEmpresa,
        orden: 7,
    },
];
