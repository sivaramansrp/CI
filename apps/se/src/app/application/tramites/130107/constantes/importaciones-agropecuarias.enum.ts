import { Partidas } from '../models/partidas.model';

/**
 * @constant PANTA_PASOS
 * @description
 * Representa los pasos para un proceso específico en la aplicación.
 * Cada paso contiene un índice, título y banderas de estado que indican si
 * el paso está activo o completado.
 * 
 * @type {Array<{ indice: number; titulo: string; activo: boolean; completado: boolean }>}
 */
export const PANTA_PASOS = [
    {
        indice: 1,
        titulo: 'Capturar solicitud',
        activo: true,
        completado: false,
    },
    {
        indice: 2,
        titulo: 'Anexar requisitos',
        activo: false,
        completado: false,
    },
    {
        indice: 3,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    },
];

/**
 * @constant TITULO_PASO_UNO
 * @description
 * Constante que representa el título para el paso uno en el proceso.
 * Se utiliza para mostrar la etiqueta "Importaciones Agropecuarias" en la interfaz de usuario.
 * 
 * @type {string}
 */
export const TITULO_PASO_UNO = 'Solicitud Importación Productos Agropecuarios';

/**
 * @constant TITULO_PASO_DOS
 * @description
 * Constante que representa el título para el paso dos en el proceso.
 * Se utiliza para mostrar la etiqueta "Cargar archivos" en la interfaz de usuario.
 * 
 * @type {string}
 */
export const TITULO_PASO_DOS = 'Cargar archivos';

/**
 * @constant TITULO_PASO_TRES
 * @description
 * Constante que representa el título para el paso tres en el proceso.
 * Se utiliza para mostrar la etiqueta "Firmar" en la interfaz de usuario.
 * 
 * @type {string}
 */
export const TITULO_PASO_TRES = 'Firmar';

/**
 * @constant PARTIDAS_TABLA
 * @description
 * Configuración de las columnas de la tabla de partidas.
 * Cada columna incluye un encabezado, una clave para obtener el valor correspondiente
 * de un objeto de tipo `Partidas` y un orden para definir la posición de la columna.
 * 
 * @type {Array<{ encabezado: string; clave: (item: Partidas) => any; orden: number }>}
 */
export const PARTIDAS_TABLA = [
    {
        encabezado: 'Cantidad',
        clave: (item: Partidas): number => item.cantidad || 0,
        orden: 1
    },
    {
        encabezado: 'Unidad de medida',
        clave: (item: Partidas): string => item.unidadDeMedida || '',
        orden: 2
    },
    {
        encabezado: 'Fracción Arancelaria',
        clave: (item: Partidas): string => item.fraccionArancelaria || '',
        orden: 3
    },
    {
        encabezado: 'Descripción',
        clave: (item: Partidas): string => item.descripcion || '',
        orden: 4
    },
    {
        encabezado: 'Precio unitario USD',
        clave: (item: Partidas): number => item.precioUnitario || 0,
        orden: 5
    },
    {
        encabezado: 'Total USD',
        clave: (item: Partidas): number => item.totalUsd || 0,
        orden: 6
    },
];

/**
 * Constante que contiene el aviso de privacidad simplificado utilizado en la Ventanilla Digital Mexicana de Comercio Exterior (VUCE).
 *
 * @constant
 * @property {string} Aviso - Texto en formato HTML que describe el aviso de privacidad simplificado.
 * Este aviso informa sobre el tratamiento de los datos personales recabados por el Servicio de Administración Tributaria (SAT),
 * su uso, transferencia a autoridades competentes y su protección conforme a la legislación aplicable.
 */
export const AVISO = {
    Aviso: `<p style="text-align: center; font-weight: bold;">Aviso de privacidad simplificado</p>
      <p>El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federación el 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal. </p>
      <br>
      <div class="row"><div class="col-md-12 text-center"><a href="">Aviso de privacidad integral</a></div>`,
  };
