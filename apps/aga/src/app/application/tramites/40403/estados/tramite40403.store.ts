import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
export interface Tramitenacionales40403State {
  seccion: boolean[];
  formaValida: boolean[];
}

export function createTramiteState(): Tramitenacionales40403State {
  return {
    seccion: [],
    formaValida: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite40403', resettable: true })
export class Tramite40403Store extends Store<Tramitenacionales40403State> {
  constructor() {
    super(createTramiteState());
  }

  /**
   * Guarda un elemento por cada sección que se encuentre.
   * @param seccion La validación de la sección.
   */
  public establecerSeccion(seccion: boolean[]) {
    this.update((state) => ({
      ...state,
      seccion,
    }));
  }

  /**
   * Agrega elementos por cada sección indicando si el formulario es válido o no.
   * @param formaValida La validación del formulario.
   */
  public establecerFormaValida(formaValida: boolean[]) {
    this.update((state) => ({
      ...state,
      formaValida,
    }));
  }

}
