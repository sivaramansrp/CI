
import { Solicitud80301State } from './tramite80301.store';

/** Importa el decorador Injectable para inyección de dependencias */
import { Injectable } from '@angular/core';

/** Importa la clase base Query de Akita para manejar el estado */
import { Query } from '@datorama/akita';

/** Importa el store que contiene el estado del trámite 80301 */
import { Tramite80301Store } from './tramite80301.store';

/** Define un servicio inyectable disponible en la raíz de la aplicación */
@Injectable({ providedIn: 'root' })
/** Clase que permite consultar el estado del trámite 80301 */
export class Tramite80301Query extends Query<Solicitud80301State> {
  
   selectSolicitud$ = this.select((state) => {
     return state;
   });
   
   /**Guarda el estado completo del formulario de la solicitud */
   constructor(
     protected override store: Tramite80301Store) {
     super(store);
   }

  /**Guarda el estado completo del formulario de la solicitud */
}