import { DatosMercanciaState } from '../tramites/datos-mercancia110101.store';
import { DatosMercanciaStore } from '../tramites/datos-mercancia110101.store';
import { FormMercancia } from '../tramites/datos-mercancia110101.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';
/**
 * **Hace que el servicio esté disponible en toda la aplicación**  
 * Al usar `providedIn: 'root'`, Angular gestiona automáticamente la instancia del servicio,  
 * asegurando que sea un singleton y esté disponible sin necesidad de declararlo en los módulos.
 */
@Injectable({ providedIn: 'root' })

export class DatosMercanciaQuery extends Query<DatosMercanciaState> {
  /**
   * **Constructor del servicio de consultas (Query) para DatosDeLa**
   *
   * - Inyecta la tienda `DatosDeLaStore` y la pasa al constructor de la clase base.
   * - Permite acceder y suscribirse a los cambios en el estado de los datos de la mercancía.
   *
   * @param store - Instancia de `DatosDeLaStore` que gestiona el estado de los datos de la mercancía.
   */
  constructor(protected override store: DatosMercanciaStore) {
    super(store);
  }


  /**
   * **Obtiene un observable de los valores del formulario**
   * 
   * Este getter devuelve un `Observable` que emite los valores actuales del formulario almacenados en el estado.
   * Permite suscribirse a los cambios en los valores del formulario en tiempo real.
   * 
   * @returns {Observable<FormMercancia | null>} Observable con los valores del formulario o `null` si no hay datos.
   */
  get formValues$(): Observable<FormMercancia | null> {
    return this.select(state => state.formValues);
  }

}
