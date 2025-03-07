import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Estado del formulario de solicitante.
 */
export interface Solicitante110101State {
  rfc: string;
  denominacion: string;
  actividadEconomica: string;
  correoElectronico: string;
}

/**
 * Función para crear el estado inicial de solicitante.
 */
export function createSolicitanteInitialState(): Solicitante110101State {
  return {
    rfc: '',
    denominacion: '',
    actividadEconomica: '',
    correoElectronico: ''
  };
}

/**
 * Store para gestionar el estado de los datos del solicitante.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitante', resettable: true })
export class Tramite110101Store extends Store<Solicitante110101State> {
  constructor() {
    super(createSolicitanteInitialState());
  }

  /**
   * Establece el valor del RFC en el estado de la tienda.
   * 
   * @param rfc - El RFC a actualizar en el estado.
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }


  /**
   * Establece el valor de la denominación en el estado de la tienda.
   * 
   * @param denominacion - El valor de la denominación a actualizar en el estado.
   */
  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }


  /**
   * Establece el valor de la actividad económica en el estado de la tienda.
   * 
   * @param actividadEconomica - El valor de la actividad económica a actualizar en el estado.
   */
  public setActividadEconomica(actividadEconomica: string): void {
    this.update((state) => ({
      ...state,
      actividadEconomica,
    }));
  }


  /**
   * Establece el valor del correo electrónico en el estado de la tienda.
   * 
   * @param correoElectronico - El correo electrónico a actualizar en el estado.
   */
  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }


  /**
   * Limpiar los datos del solicitante
   */
  public limpiarSolicitante():void{
    this.reset();
  }
}
