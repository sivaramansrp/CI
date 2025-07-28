import { Cancelacion, PermisosDatos, createDatosState } from '../models/cancelacion-de-solicitus.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

@StoreConfig({ name: 'desistimiento-de-permiso', resettable: true })
/**
 * Tienda (store) Akita para gestionar el estado relacionado con la cancelación o desistimiento
 * de solicitudes de permiso.
 *
 * @description
 * Esta clase extiende de `Store` de Akita y permite inicializar y actualizar el estado
 * de tipo `PermisosDatos`. Está diseñada para almacenar y manejar los datos relacionados
 * con los trámites de cancelación, como el folio del trámite, tipo de solicitud, fracción arancelaria, etc.
 */
export class DesistimientoStore extends Store<PermisosDatos> {

  /**
   * Constructor que inicializa la tienda con el estado inicial generado por `createDatosState()`.
   */
  constructor() {
    super(createDatosState());
  }

  /**
   * Actualiza los datos de la forma de cancelación en el estado.
   *
   * @remarks
   * Este método recibe un arreglo de objetos de tipo `Cancelacion` y reemplaza
   * los datos actuales en el estado por los nuevos.
   * 
   * Es útil cuando se modifica la información del formulario o cuando se cargan datos desde una fuente externa.
   *
   * @param datos - Arreglo de objetos de tipo `Cancelacion` que se utilizará para actualizar el estado.
   */
  public actualizarDatosForma(datos: Cancelacion[]): void {
    this.update((_state) => ({
      datos,
    }));
  }
}
