import { Antecesor } from "../modelos/antecesor.modal";
import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { ControlInventariosItem } from "../models/models31601.model";

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

/** 
 * Configuración de las columnas para la tabla de control de inventarios.
 * Esta configuración define cómo se mostrarán las columnas en la tabla de control de inventarios.
 */
export const CONTROL_INVENTARIOS_TABLA_CONFIGURACION: ConfiguracionColumna<ControlInventariosItem>[] = [
    {
      encabezado: 'Nombre del sistema o datos para su identificación',
      clave: (item: ControlInventariosItem) => item.nombreSistema,
      orden: 1,
    },
    {
      encabezado: 'Lugar de radicación',
      clave: (item: ControlInventariosItem) => item.lugarRadicacion,
      orden: 2,
    },
    {
      encabezado: 'Anexo 24',
      clave: (item: ControlInventariosItem) => item.anexo24 ? '☑' : '☐',
      orden: 3,
    }
  ];
