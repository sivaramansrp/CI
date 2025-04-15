/**
 * Representa una lista de elementos de un catálogo.
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
 * Representa los datos de la tabla de avisos.
 */
export interface AvisoTablaDatos {
  /**
   * Lista de avisos en la tabla.
   */
  datos: ColumnasTabla[];
}



  export interface ColumnasTabla {
    
    headerPropiedad: string;
    headerNombreTitulo: string;
    headerTipoRegistro: string;
    headerNIV: string,
    headerAnioModelo: string,
    headerMarca: string,
    headerModelo: string,
    headerTVV: string,
    headerNoTitulo: string,
    headerPais: string,
    headerEstado: string;
    headerPlacas: string,
    headerAdquisicion: string,
    headerTipoRegistro2: string,
    headerDocumentoExportacion: string,
    headerAduana: string,
    headerFolioCFDI: string,
    headerPatente: string,
    headerPedimento: string,
    headerKilometraje: string,
    headerValorDolares: string,
    headerValorAduana: string,
    headerMontoIGI: string,
    headerFormaPago: string,
    headerMontoDTA: string,
}