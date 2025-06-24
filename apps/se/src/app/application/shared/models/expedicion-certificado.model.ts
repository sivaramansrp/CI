


/**
 * Interfaz que representa las licitaciones disponibles.
 */
export interface LicitacionesDisponibles {
    /**
     * Número de la licitación.
     */
    numeroDeLicitacion: string;

    /**
     * Fecha de la licitación.
     */
    fechaDeLicitacion: string;

    /**
     * Descripción de la licitación.
     */
    descripcion: string;

    /**
     * Monto adjudicado en la licitación.
     */
    montoAdjudicado: string;

    /**
     * Fecha de inicio de vigencia de la licitación.
     */
    fechaInicioVigencia: string;

    /**
     * Fecha de fin de vigencia de la licitación.
     */
    fechaFinVigencia: string;
}

/**
 * Interfaz que representa la distribución de saldo para la expedición de un certificado.
 */
export interface DistribucionSaldo {
   
    /**
     * Monto que se desea expedir.
     * @type {string}
     */
    montoAExpedir: string;


    /**
     * Indicador booleano que verifica si el monto a expedir está seleccionado.
     * @type {boolean}
     */
    montoAExpedirCheck: boolean;

     /**
     * Monto disponible para la expedición.
     * @type {string}
     */
     montoDisponible: string;


    /**
     * Total acumulado que se va a expedir.
     * @type {string}
     */
    totalAExpedir: string;
}

/**
 * Representa el detalle de una licitación.
 * 
 * @interface DetalledelaLicitacion
 * @property {string} numeraDelicitacion - Número de la licitación.
 * @property {string} fechaDelEventoDelicitacion - Fecha del evento de la licitación.
 * @property {string} descripcionDelProducto - Descripción del producto relacionado con la licitación.
 */
export interface DetalledelaLicitacion{
        numeraDelicitacion:string,
        fechaDelEventoDelicitacion:string,
        descripcionDelProducto:string   
}

/**
 * Configuración de la tabla para mostrar información de accionistas.
 * 
 * Cada objeto en el arreglo representa una columna de la tabla con las siguientes propiedades:
 * 
 * - `encabezado`: El título de la columna que se mostrará en la tabla.
 * - `clave`: Una función que toma un objeto de tipo `LicitacionesDisponibles` y devuelve el valor correspondiente a mostrar en la columna.
 * - `orden`: El orden en el que se mostrará la columna en la tabla.
 * 
 * Propiedades de las columnas:
 * 
 * 1. **Número de licitación**: Muestra el número de la licitación.
 * 2. **Fecha de evento de licitación pública**: Muestra la fecha del evento de licitación pública.
 * 3. **Descripción del producto**: Muestra la descripción del producto.
 * 4. **Monto adjudicado**: Muestra el monto adjudicado en la licitación.
 * 5. **Fecha inicio vigencia**: Muestra la fecha de inicio de vigencia.
 * 6. **Fecha fin vigencia**: Muestra la fecha de fin de vigencia.
 */
export const CONFIGURACION_ACCIONISTAS_TABLA = [
    {
        encabezado: 'Número de licitación',
        clave: (ele: LicitacionesDisponibles):string => ele.numeroDeLicitacion,
        orden: 1
      },
      {
        encabezado: 'Fecha de evento de licitación pública',
        clave: (ele: LicitacionesDisponibles):string => ele.fechaDeLicitacion,
        orden: 2
      },
      {
        encabezado: 'Descripción del producto ',
        clave: (ele: LicitacionesDisponibles):string => ele.descripcion,
        orden: 3
      },
      {
        encabezado: 'Monto adjudicado',
        clave: (ele: LicitacionesDisponibles):string => ele.montoAdjudicado,
        orden: 4
      },
      {
        encabezado: 'Fecha inicio vigencia',
        clave: (ele: LicitacionesDisponibles):string => ele.fechaInicioVigencia,
        orden: 5
      },
      {
        encabezado: 'Fecha fin vigencia',
        clave: (ele: LicitacionesDisponibles):string => ele.fechaFinVigencia,
        orden: 6
      }
]