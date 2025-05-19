import { CancelacionState, CancelacionStore } from './cancelacion-de-autorizaciones.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';


/**
 * Decorador que marca esta clase como inyectable y especifica que su proveedor
 * estará disponible en el nivel raíz del inyector.
 */
@Injectable({ providedIn: 'root' })

/**
 * Clase que representa una consulta para el estado de Tramite120101Store.
 * Proporciona métodos para seleccionar y observar el estado completo del formulario de la solicitud.
 */
export class CancelacionQuery extends Query<CancelacionState> {
  /**
   * Observable que selecciona el estado completo de la solicitud.
   * Permite observar los cambios en el estado del formulario SolicitudDeRegistroTpl120101.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor de la clase Tramite120101Store.
   * Inicializa la consulta con el almacén proporcionado.
   * 
   * @param store - Instancia del almacén Tramite120101Store.
   */
  constructor(protected override store: CancelacionStore) {
    super(store);
  }
}
