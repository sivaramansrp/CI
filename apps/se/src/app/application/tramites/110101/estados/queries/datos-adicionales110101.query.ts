import { DatosAdicionalesState } from '../tramites/datos-adicionales110101.store';
import { DatosAdicionalesStore } from '../tramites/datos-adicionales110101.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';
/**
 * **Proporciona este servicio a nivel global en la aplicación**  
 * La opción `providedIn: 'root'` permite que Angular gestione este servicio como un singleton,  
 * asegurando que esté disponible en toda la aplicación sin necesidad de importarlo en un módulo específico.
 */
@Injectable({ providedIn: 'root' })

export class DatosAdicionalesQuery extends Query<DatosAdicionalesState> {
  /**
 * **Constructor del servicio de consultas (Query) para DatosAdicionales**
 *
 * - Inyecta la tienda `DatosAdicionalesStore` y la pasa al constructor de la clase base.
 * - Permite acceder y suscribirse a los cambios en el estado de los datos adicionales.
 *
 * @param store - Instancia de `DatosAdicionalesStore` que gestiona el estado de los datos adicionales.
 */
  constructor(protected override store: DatosAdicionalesStore) {
    super(store);
  }

  /**
   * **Observable para obtener los valores del formulario desde el estado**
   *
   * - Permite suscribirse a los valores almacenados en el estado.
   * - Se actualiza automáticamente cuando cambian los datos en el store.
   * - Retorna un objeto `DatosAdicionalesForm` o `null` si no hay datos almacenados.
   *
   * @returns {Observable<DatosAdicionalesState['formValues']>}
   */
  get formValues$(): Observable<DatosAdicionalesState['formValues']> {
    return this.select(state => state.formValues);
  }

}
