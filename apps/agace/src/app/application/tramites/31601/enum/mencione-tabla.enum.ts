/**
 * Representa una fila en la tabla de configuración de Mencione.
 * Contiene datos como razón social, RFC, número de empleados y bimestre.
 * Se utiliza para renderizar y manipular la información en la tabla dinámica.
 */
export interface MencioneConfiguracionItem {
    id: string;
    social: string;
    rfc: string;
    noumero: string;
    bimestre: string
}
/**
 * Configuración de columnas para la tabla de "Mencione".
 * Define encabezado, clave a mostrar del modelo `MencioneConfiguracionItem`, y el orden.
 * Se usa para renderizar columnas dinámicamente en la tabla.
 */
export const MENCIONE_TABLA_CONFIGURACION = [
    {
        encabezado: 'Denominacion Social',
        clave: (item: MencioneConfiguracionItem): string => item.social,
        orden: 1,
    },
    {
        encabezado: 'RFC',
        clave: (item: MencioneConfiguracionItem): string => item.rfc,
        orden: 2,
    },
    {
        encabezado: 'Numero de Empleados',
        clave: (item: MencioneConfiguracionItem): string => item.noumero,
        orden: 3,
    },
    {
        encabezado: 'Bimestre',
        clave: (item: MencioneConfiguracionItem): string => item.bimestre,
        orden: 4,
    }
    
];
/**
 * @description
 * Representa la estructura de un destinatario que será mostrado en la tabla de destinatarios.
 * Contiene la información básica necesaria como RFC, denominación o razón social y domicilio.
 *
 * Propiedades:
 * - `rfc`: Clave del Registro Federal de Contribuyentes del destinatario.
 * - `denominacion`: Nombre o razón social del destinatario.
 * - `domicilio`: Dirección del destinatario.
 */
export interface DestinatarioItems {
  rfc: string;
  denominacion: string;
  domicilio: string;
}
/**
 * @description
 * Configuración de columnas para la tabla de destinatarios en su versión básica.
 * Define los encabezados, las claves de acceso a los datos dentro del modelo `DestinatarioItems`,
 * y el orden en que deben mostrarse en la tabla.
 * 
 * Cada objeto contiene:
 * - `encabezado`: El título que se mostrará como nombre de la columna en la tabla.
 * - `clave`: Una función que devuelve el valor a mostrar en esa columna, basado en el objeto `DestinatarioItems`.
 * - `orden`: El número que indica la posición de la columna en la tabla (de izquierda a derecha).
 */
export const CONFIGURATION_TABLA_DESTINATARIO_BASICO = [
  {
    encabezado: 'RFC',
    clave: (item: DestinatarioItems): string => item.rfc,
    orden: 1
  },
  {
    encabezado: 'Denominación o razón social',
    clave: (item: DestinatarioItems): string => item.denominacion,
    orden: 2
  },
  {
    encabezado: 'Domicilio',
    clave: (item: DestinatarioItems): string => item.domicilio,
    orden: 3
  }
];