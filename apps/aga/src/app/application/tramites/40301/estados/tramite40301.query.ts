import { Solicitud40301State, Solicitud40301Store } from './tramite40301.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * # Documentación - Solicitud40301Query
 *
 * ## Descripción
 * `Solicitud40301Query` es una clase que extiende `Query` de Akita y permite seleccionar observables específicos del estado `Solicitud40301State`.
 */
@Injectable({ providedIn: 'root' })
export class Solicitud40301Query extends Query<Solicitud40301State> {
  
  /**
   * ## Propiedad: selectedDirectorGeneralNombre$
   * Observable que selecciona el nombre del director general del estado.
   */
  selectedDirectorGeneralNombre$ = this.select((state) => state.directorGeneralNombre);

  /**
   * ## Propiedad: selectedPrimerApellido$
   * Observable que selecciona el primer apellido del estado.
   */
  selectedPrimerApellido$ = this.select((state) => state.primerApellido);

  /**
   * ## Propiedad: selectedSegundoApellido$
   * Observable que selecciona el segundo apellido del estado.
   */
  selectedSegundoApellido$ = this.select((state) => state.segundoApellido);

  /**
   * ## Constructor
   * Inicializa la clase con la tienda `Solicitud40301Store` para gestionar las consultas al estado.
   *
   * #### Parámetros
   * - **store**: La tienda que contiene el estado `Solicitud40301State`.
   */
  constructor(protected override store: Solicitud40301Store) {
    super(store);
  }
}
