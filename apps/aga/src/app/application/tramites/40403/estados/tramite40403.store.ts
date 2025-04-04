import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Modelo de estado para el trámite 40403.
 */
export interface Tramitenacionales40403State {
  /**
   * Lista que indica el estado de cada sección del formulario (true si está activa, false si no).
   */
  seccion: boolean[];

  /**
   * Lista que indica si cada sección del formulario es válida (true si es válida, false si no).
   */
  formaValida: boolean[];
}

/**
 * Función para crear el estado inicial del trámite 40403.
 * @returns El estado inicial del trámite.
 */
export function createTramiteState(): Tramitenacionales40403State {
  return {
    seccion: [],
    formaValida: [],
  };
}

/**
 * Almacén de estado para gestionar los datos relacionados con el trámite 40403.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite40403', resettable: true })
export class Tramite40403Store extends Store<Tramitenacionales40403State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createTramiteState());
  }

  /**
   * Actualiza el estado de las secciones del formulario.
   * @param seccion - Lista que indica el estado de cada sección (true si está activa, false si no).
   */
  public establecerSeccion(seccion: boolean[]): void {
    this.update((state) => ({
      ...state,
      seccion,
    }));
  }

  /**
   * Actualiza el estado de validación de las secciones del formulario.
   * @param formaValida - Lista que indica si cada sección del formulario es válida (true si es válida, false si no).
   */
  public establecerFormaValida(formaValida: boolean[]): void {
    this.update((state) => ({
      ...state,
      formaValida,
    }));
  }
}