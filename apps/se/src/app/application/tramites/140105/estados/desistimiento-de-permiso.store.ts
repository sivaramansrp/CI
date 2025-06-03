import { Cancelacion,PermisosDatos,createDatosState} from '../models/cancelacion-de-solicitus.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'desistimiento-de-permiso', resettable: true })
export class DesistimientoStore extends Store<PermisosDatos> {
  constructor() {
    super(createDatosState());
  }

  /**
   * Método para actualizar los datos de la forma de cancelación en el estado.
   * Este método recibe un array de objetos de tipo Cancelacion y actualiza
   * el estado con la nueva información.
   *
   * @param datos Array de objetos de tipo Cancelacion que se va a actualizar en el estado.
   */

  public actualizarDatosForma(datos: Cancelacion[]): void {
    this.update((state) => ({
      datos,
    }));
  }
}
