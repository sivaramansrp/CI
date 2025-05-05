import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
/**
 * Estado del trámite con clave 250101. Contiene toda la información capturada
 * durante el proceso del trámite, incluyendo datos del destinatario, agente aduanal,
 * mercancía, y aspectos administrativos.
 */
export interface Tramite250102State {

}


/**
 * Crea y retorna el estado inicial para el trámite 250101.
 *
 * Esta función se utiliza para inicializar todos los campos del estado
 * con valores por defecto (nulos, cadenas vacías o arreglos vacíos),
 * asegurando una estructura limpia para comenzar el flujo del trámite.
 *
 * @returns {Tramite250102State} Estado inicial del trámite.
 */
export function createInitialState(): Tramite250102State {
  return {
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite250101', resettable: true })
export class Tramite250102Store extends Store<Tramite250102State> {
  constructor() {
    super(createInitialState());
  }


}
