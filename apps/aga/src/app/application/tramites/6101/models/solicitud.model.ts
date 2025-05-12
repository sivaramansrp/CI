import { CatalogosSelect } from '@libs/shared/data-access-user/src';

/**
 * Interfaz que representa los catálogos utilizados en la solicitud 6101,
 * incluyendo la aduana y la junta técnica derivada.
 */
export interface SolicitudCatologo {
  /**
   * @description Catálogo de aduanas.
   * Representa las aduanas disponibles para la solicitud.
   */
  aduana: CatalogosSelect;
  /**
   * @description Catálogo de juntas técnicas derivadas.
   * Representa las juntas técnicas derivadas disponibles para la solicitud.
   */
  juntaTecnicaDerivada: CatalogosSelect;
}

/**
 * Interfaz que representa la estructura de una fracción arancelaria dividida
 * en sus componentes: capítulo, partida, subpartida y subdivisión.
 */
export interface DivideFraccion {
  /**
   * @description Capítulo de la fracción arancelaria.
   * Representa la categoría general a la que pertenece la mercancía.
   */
  capitulo: string;
  /**
   * @description Partida de la fracción arancelaria.
   * Representa una subcategoría dentro del capítulo.
   */
  partida: string;
  /**
   * @description Subpartida de la fracción arancelaria.
   *  Representa una división más específica dentro de la partida.
   */
  subpartida: string;
  /**
   * @description Subdivisión de la fracción arancelaria.
   * Representa la división más específica dentro de la subpartida.
   */
  subdivision: string;
}
