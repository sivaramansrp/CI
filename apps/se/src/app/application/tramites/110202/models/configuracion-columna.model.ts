/**
 * Interfaz que representa la configuración de una columna en una tabla.
 * 
 * @template T - Tipo de los datos de la fila.
 * 
 * @property {string} encabezado - Título de la columna.
 * @property {(ele: T) => string | number | undefined | boolean} clave - Función que devuelve el valor de la columna para cada fila.
 * @property {number} orden - Orden de la columna en la tabla.
 */
export interface ConfiguracionColumna<T> {
    encabezado: string; // Título de la columna
    clave: (ele: T) => string | number | undefined | boolean; // Función que devuelve el valor de la columna para cada fila
    orden: number; // Orden de la columna en la tabla
  }

  /**
 * Interfaz que representa los datos de la mercancía.
 * 
 * @property {string} descripcion - Descripción de la mercancía.
 * @property {string} marca - Marca de la mercancía.
 * @property {string} tipoEntrada - Tipo de entrada de la mercancía.
 * @property {string} fraccion - Fracción arancelaria de la mercancía.
 * @property {string} nico - NICO (Número de Identificación Comercial).
 * @property {string} umt - Unidad de medida tarifaria.
 * @property {string} facturaNumero - Número de la factura.
 * @property {string} facturaFecha - Fecha de la factura.
 * @property {string} umc - Unidad de medida comercial.
 * @property {string} otroUmc - Otro tipo de unidad de medida comercial (si aplica).
 * @property {string} cantidadUmc - Cantidad en unidades comerciales.
 * @property {string} factorConversion - Factor de conversión entre unidades.
 * @property {string} cantidadUmt - Cantidad en unidades de medida tarifarias.
 * @property {string} valorFactura - Valor total de la factura.
 * @property {string} monedaComercializacion - Moneda de comercialización de la mercancía.
 * @property {string} valorFacturaUsd - Valor total de la factura en USD.
 * @property {string} precioUnitarioUsd - Precio unitario en USD.
 * @property {string} paisExportador - País exportador de la mercancía.
 * @property {string} paisOrigen - País de origen de la mercancía.
 * @property {string} valorTotalFactura - Valor total de la factura (en moneda local).
 * @property {string} valorTotalFacturaUsd - Valor total de la factura en USD.
 */
export interface DatosMercancia {
    descripcion: string; // Descripción de la mercancía.
    marca: string; // Marca de la mercancía.
    tipoEntrada: string; // Tipo de entrada de la mercancía.
    fraccion: string; // Fracción arancelaria de la mercancía.
    nico: string; // NICO (Número de Identificación Comercial).
    umt: string; // Unidad de medida tarifaria.
    facturaNumero: string; // Número de la factura.
    facturaFecha: string; // Fecha de la factura.
    umc: string; // Unidad de medida comercial.
    otroUmc: string; // Otro tipo de unidad de medida comercial (si aplica).
    cantidadUmc: string; // Cantidad en unidades comerciales.
    factorConversion: string; // Factor de conversión entre unidades.
    cantidadUmt: string; // Cantidad en unidades de medida tarifarias.
    valorFactura: string; // Valor total de la factura.
    monedaComercializacion: string; // Moneda de comercialización de la mercancía.
    valorFacturaUsd: string; // Valor total de la factura en USD.
    precioUnitarioUsd: string; // Precio unitario en USD.
    paisExportador: string; // País exportador de la mercancía.
    paisOrigen: string; // País de origen de la mercancía.
    valorTotalFactura: string; // Valor total de la factura (en moneda local).
    valorTotalFacturaUsd: string; // Valor total de la factura en USD.
  }
  
  export interface Mercancia {
    fraccionArancelaria: string;
    numeroDeRegistrodeProductos: string;
    fechaExpedicion: string;
    fechaVencimiento: string;
    nombreTecnico: string;
    nombreComercial:string;
    normaOrigen?:string;
    id?:string;
    cantidad?:string;
    umc?:string;
    tipoFactura?:string;
    valorMercancia?:string;
    fechaFinalInput?:string;
    numeroFactura?:string;
    nalad?:string;
    nombreIngles?:string;
    criterioClasificacion?:string;
    marca?:string;
    masaBruta?:string;
    unidadMedidaMasaBruta?:string;
    complementoClasificacion?:string;
  }

