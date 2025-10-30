
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Solicitud110218State,Tramite110218Store } from '../tramites/tramite110218.store';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class Tramite110218Query extends Query<Solicitud110218State> {
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });
    /**
   * Obtiene el valor seleccionado de la radio
   * @returns Observable<string | number>
   */
    public get valorSeleccionado$(): Observable<string | number> {
      return this.select('valorSeleccionado');
    }  

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite110218Store) {
    super(store);
  }
  
}
