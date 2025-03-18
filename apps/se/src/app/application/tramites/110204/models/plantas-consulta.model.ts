
  /**
   * Interfaz que representa la información de una mercancía.
   * 
   * @property {string} fraccionNaladi - Fracción arancelaria Naladi.
   * @property {string} fraccionNaladiSa93 - Fracción arancelaria Naladi SA 93.
   * @property {string} fraccionNaladiSa96 - Fracción arancelaria Naladi SA 96.
   * @property {string} fraccionNaladiSa02 - Fracción arancelaria Naladi SA 02.
   * @property {string} nombreTecnico - Nombre técnico de la mercancía.
   * @property {string} nombreComercial - Nombre comercial de la mercancía.
   * @property {string} [normaOrigen] - Norma de origen de la mercancía (opcional).
   * @property {string} [id] - Identificador de la mercancía (opcional).
   * @property {string} [cantidad] - Cantidad de la mercancía (opcional).
   * @property {string} [umc] - Unidad de medida comercial (opcional).
   * @property {string} [tipoFactura] - Tipo de factura (opcional).
   * @property {string} [valorMercancia] - Valor de la mercancía (opcional).
   * @property {string} [fechaFinalInput] - Fecha final de entrada (opcional).
   * @property {string} [numeroFactura] - Número de factura (opcional).
   * @property {string} [nalad] - Código Nalad (opcional).
   * @property {string} [complementoClasificacion] - Complemento de clasificación (opcional).
   */
  export interface Mercancia {
    fraccionNaladi: string;
    fraccionNaladiSa93: string;
    fraccionNaladiSa96: string;
    fraccionNaladiSa02: string;
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
    complementoClasificacion?:string;
  }

