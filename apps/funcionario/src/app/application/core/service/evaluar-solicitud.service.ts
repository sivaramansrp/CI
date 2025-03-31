import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EvaluarSolicitudService {
  /**
   * BehaviorSubject que mantiene el estado del boton.
   * Su valor inicial es `true` y se puede actualizar a través del método `setTabIndex`.
   */
  private buttonStatusSource = new BehaviorSubject<boolean>(true);
  /**
 * Observable que expone el estado del boton.
 * Los componentes pueden suscribirse para reaccionar a cambios en su valor.
 */
  buttonStatus$ = this.buttonStatusSource.asObservable();
  /**
 * Actualiza el valor del boton y notifica a los suscriptores.
 * 
 * @param status - Nuevo valor booleano que indica el estado botón.
 */
  setButtonStatus(status: boolean) {
    this.buttonStatusSource.next(status);
  }
}
