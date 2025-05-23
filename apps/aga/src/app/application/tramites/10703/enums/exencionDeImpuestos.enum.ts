import { Catalogo } from '@ng-mf/data-access-user'
import { RatioOption } from '../models/exencion-impuestos.model';
/**
 * Definición de las opciones disponibles para indicar si hay mercancía o no.
 * Se representan como un array de objetos `RatioOption` con etiquetas y valores asociados.
 */
export const MECANCIA_OPTIONS: RatioOption[] = [
  {
      /**
       * Opción para indicar que sí hay mercancía.
       */
      label: 'Si',
      value: '1',
  },
  {
      /**
       * Opción para indicar que no hay mercancía.
       */
      label: 'No',
      value: '0',
  },
];

/**
* Lista de documentos seleccionados que se requieren para un procedimiento.
* Se representan como un array de objetos `Catalogo`, cada uno con un `id` y una `descripción`.
*/
export const DOCUMENTOS_SELECCIONADOS: Catalogo[] = [
  {
      /**
       * Documento que respalda el valor de la mercancía.
       */
      id: 1,
      descripcion: 'Documentos que ampare el valor de la mercancía',
  },
  {
      /**
       * Documentos relacionados con el medio de transporte utilizado.
       * Incluye guías, conocimientos de embarque (`BL`), o carta porte según corresponda.
       */
      id: 2,
      descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)',
  },
];
