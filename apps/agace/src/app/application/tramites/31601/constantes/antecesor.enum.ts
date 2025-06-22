import { Antecesor } from "../modelos/antecesor.modal";

// Configuración de las columnas para mostrar información de los antecesores
export const CONFIGURACION_ANTECESORES = [
    {
        // Encabezado de la columna
        encabezado: 'Tipo de persona',
        // Función para obtener el valor de la columna
        clave: (ele: Antecesor): string => ele.tipoDePersonaMiembro ?? '',
        // Orden de la columna
        orden: 1,
    },
    {
        encabezado: 'Nombre',
        clave: (ele: Antecesor): string => ele.nombreMiembro ?? '',
        orden: 2,
    },
    {
        encabezado: 'RFC',
        clave: (ele: Antecesor): string => ele.rfc,
        orden: 3,
    },
    {
        encabezado: 'Carácter',
        clave: (ele: Antecesor): string => String(ele.ensucaracterde),
        orden: 4,
    },
    {
        encabezado: 'Nacionalidad',
        clave: (ele: Antecesor): string => String(ele.nacionalidad),
        orden: 5,
    },
    {
        encabezado: 'Obligado a tributar en México',
        clave: (ele: Antecesor): string => ele.obligadoaTributarenMexico,
        orden: 6,
    },
    {
        encabezado: 'Nombre de la empresa',
        // Si existe nombre de la empresa, lo muestra; si no, concatena nombre y apellidos
        clave: (ele: Antecesor): string => ele.nombreDeLaEmpresaMiembro ? ele.nombreDeLaEmpresaMiembro : ele.nombreMiembro + ' ' + ele.apellidoPaternoMiembro + ' ' + ele.apellidoMaternoMiembro,
        orden: 7,
    },
];
