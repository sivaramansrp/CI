import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
}
/**
 * Estado inicial para la interfaz del trámite 90303.
 */
export interface Solicitud90303State {
  estatus: string;
  registroFederalContribuyentes: string;
  representacionFederal: string;
  tipoModificacion: string;
  modificacionPrograma: string;
}
/**
 * Crea el estado inicial para la solicitud del trámite 90303.
 * @returns Estado inicial de tipo `Solicitud90303State`.
 */
export function createInitialState(): Solicitud90303State {
  return {
    estatus:'',
    registroFederalContribuyentes: '',
    representacionFederal: '',  
    tipoModificacion: '',
    modificacionPrograma: ''
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite90303', resettable: true })
export class Tramite90303Store extends Store<Solicitud90303State> {
  constructor() {
    super(createInitialState());
  }
  /**
   * Actualiza el estado del store con los nuevos valores.
   * @param updateFunc Función que recibe el estado actual y retorna el nuevo estado.
   */   
  public setEstatus(estatus: string) {
   this.update((state) => ({...state,  estatus, }));
  }
  /**
   * Actualiza el estado del store con los nuevos valores.
   * @param updateFunc Función que recibe el estado actual y retorna el nuevo estado.
   */
  public setRegistroFederalContribuyentes(registroFederalContribuyentes: string) {
    this.update((state) => ({...state, registroFederalContribuyentes, }));
  }
  /**
   * Actualiza el estado del store con los nuevos valores.
   * @param updateFunc Función que recibe el estado actual y retorna el nuevo estado.
   */
  public setRepresentacionFederal(representacionFederal: string) {
    this.update((state) => ({...state, representacionFederal, }));
  }
  /**
   * Actualiza el estado del store con los nuevos valores.
   * @param updateFunc Función que recibe el estado actual y retorna el nuevo estado.
   */
  public setTipoModificacion(tipoModificacion: string) {
    this.update((state) => ({...state, tipoModificacion, }));
  }
  /**
   * Actualiza el estado del store con los nuevos valores.
   * @param updateFunc Función que recibe el estado actual y retorna el nuevo estado.
   */
  public setModificacionPrograma(modificacionPrograma: string) {
    this.update((state) => ({...state, modificacionPrograma, }));
  }
  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
