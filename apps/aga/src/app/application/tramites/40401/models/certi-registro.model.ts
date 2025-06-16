/**
 * Interfaz que representa los detalles de un producto.
 */
export interface DetallesDelProducto {
    /**
 * Representa una lista de elementos de un catálogo.
 */

    /**
     * Tipo de mercancía, por ejemplo, "electrónica", "ropa", etc.
     */
    tipoDeMercancia: string;
    /**
     * Condición de la mercancía, como "nueva", "usada", etc.
     */
    condicionDeLaMercancia: string;
    /**
     * Cantidad de unidades de la mercancía.
     */
    cantidad: number;
    /**
     * Información adicional en caso de ser necesario.
     */
    enSucaso: string;
    /**
     * Unidad de medida utilizada, como "kilogramos", "litros", etc.
     */
    unidadDeMedida: string;
    /**
     * Año en el que se realizó la importación temporal.
     */
    anoDeImportacionTemporal: number;
    /**
     * Modelo del producto.
     */
    modelo: string;
    /**
     * Marca del producto.
     */
    marca: string;
    /**
     * Número de serie del producto.
     */
    numeroDeSerie: number;
}

/**
 * Representa una lista de catálogo que contiene un conjunto de datos de tipo `Catalogo`.
 */
export interface CatalogoLista {
    datos: Catalogo[];
  }
  /**
 * Representa un elemento de un catálogo.
 */
export interface Catalogo {
    id: number;
    descripcion: string;
  }

/**
 * Interfaz que define la estructura de los datos de CAAT Aéreo.
 * Esta interfaz incluye información sobre el tipo de CAAT Aéreo, el código de transportación y la empresa de transportación.
 * @interface CaatAereoData
 * @property {string} TipoDeCaatAereo - El tipo de CAAT Aéreo, por ejemplo, "Aéreo".
 * @property {string} DodigoDeTransportacion - El código de transportación asociado al CAAT Aéreo.
 * @property {string} EmpresaDeTransportacion - El nombre de la empresa de transportación que opera el CAAT Aéreo.
 */
  export interface CaatAereoData {
    TipoDeCaatAereo: string;
    DodigoDeTransportacion: string;
    EmpresaDeTransportacion: string;
  }