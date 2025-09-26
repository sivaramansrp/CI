/**
 * Request para guardar una solicitud del trámite 231001.
 *
 * Contiene los datos del solicitante, la aduana de la solicitud,
 * información genérica y la lista de mercancías asociadas.
 */
export interface GuardarSolicitud231001Request {
  /**
   * Datos del solicitante que realiza la solicitud.
   */
  solicitante: {
    /**
     * RFC del solicitante (persona física o moral).
     * Ejemplo: 'XAXX010101000'
     */
    rfc: string;
    /**
     * Nombre completo o razón social del solicitante.
     */
    nombre: string;
    /**
     * Indicador si el solicitante es persona moral (true) o física (false).
     */
    es_persona_moral: boolean;
    /**
     * Número de serie del certificado del solicitante.
     * Usado para validación/autenticación digital.
     */
    certificado_serial_number: string;
  };
  /**
   * Información relacionada con la aduana de la solicitud.
   */
  aduana_solicitud: {
    /**
     * Clave de la aduana (formato según catálogo de aduanas).
     * Ejemplo: '2401'
     */
    cve_aduana: string;
  };
  /**
   * Descripción genérica 1 asociada a la solicitud.
   * Campo libre para información adicional.
   */
  descripcionGenerica1: string;
  /**
   * Identificador de la solicitud.
   * Nota: en el esquema actual se define como null (campo reservado).
   */
  id_solcitud: null;
  /**
   * Lista de mercancías asociadas a la solicitud.
   */
  mercancias: Mercancia[];
  /**
   * Número de programa IMMEX relacionado (si aplica).
   * Puede estar vacío si no aplica.
   */
  numeroProgramaImmex: string;
  /**
   * Número de registro ambiental (si aplica).
   */
  numeroRegistroAmbiental: string;
}

/**
 * Representa una mercancía dentro de la solicitud aduanera.
 */
export interface Mercancia {
  /**
   * Cantidad en letra (texto).
   * Ejemplo: 'cien'
   */
  cantidad_en_letra: string;
  /**
   * Capítulo y fracción arancelaria.
   * Ejemplo: '01.02'
   */
  capitulo_fraccion: string;
  /**
   * Clave de la partida arancelaria.
   */
  cve_partida: string;
  /**
   * Clave de la subpartida arancelaria.
   */
  cve_subpartida: string;
  /**
   * Descripción de la fracción arancelaria.
   */
  desc_fraccion: string;
  /**
   * Descripción de la unidad de medida comercial.
   */
  desc_unidad_medida_comercial: string;
  /**
   * Descripción de la mercancía.
   */
  descripcion_mercancia: string;
  /**
   * Campo genérico 2 para uso libre según requisitos del trámite.
   */
  generica2: string;
  /**
   * Cantidad en formato numérico (string).
   * Ejemplo: '1000'
   */
  cantidad: string;
  /**
   * Clave de la unidad de medida comercial.
   * Ejemplo: 'Tonelada' para kilogramos
   */
  cve_unidad_medida_comercial: string;
}
