import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Crea el estado inicial de la tienda con valores por defecto.
 *
 * @returns Un objeto con la estructura de `CatalogosSelect`.
 */
export function crearEstadoInicial(): CatalogosSelect {
  return {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: {} as Catalogo[],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'responsable-inspeccion-en-punto', resettable: true })
/**
 * Clase que representa el store para el responsable de inspección en punto.
 * Extiende de `Store<CatalogosSelect>` y gestiona el estado relacionado.
 */
export class ResponsableInspeccionEnPuntoStore extends Store<CatalogosSelect> {
  /**
   * Constructor de la tienda `ResponsableInspeccionEnPuntoStore`.
   * Inicializa el estado con valores predeterminados.
   */
  constructor() {
    super(crearEstadoInicial());
  }

  /**
   * Actualiza los datos iniciales del store con la información proporcionada.
   *
   * @param datos - Objeto que contiene el nuevo valor de `tipoContenedor`.
   */
  public actualizarDatosIniciales(datos: { tipoContenedor: CatalogosSelect }): void {
    this.update((state) => ({
      ...state,
      ...datos,
    }));
  }

  /**
   * Limpia los datos de la sección restableciendo el estado a su valor inicial.
   */
  public limpiarSeccion(): void {
    this.reset();
  }
}
