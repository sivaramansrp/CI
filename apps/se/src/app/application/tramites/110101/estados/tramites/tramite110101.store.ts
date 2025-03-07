import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * **Estado del formulario de solicitante**
 *
 * Representa la estructura del estado para los datos del solicitante en el trámite 110101.
 */
export interface Solicitante110101State {
  /** RFC del solicitante. */
  rfc: string;
  
  /** Denominación o razón social del solicitante. */
  denominacion: string;
  
  /** Actividad económica principal del solicitante. */
  actividadEconomica: string;
  
  /** Correo electrónico de contacto del solicitante. */
  correoElectronico: string;
}


/**
 * **Función para crear el estado inicial del solicitante**
 *
 * Esta función devuelve un estado inicial vacío para los datos del solicitante en el trámite 110101.
 * Se utiliza para inicializar el store con valores predeterminados.
 *
 * @returns {Solicitante110101State} Estado inicial del solicitante con valores vacíos.
 */
export function createSolicitanteInitialState(): Solicitante110101State {
  return {
    /** RFC del solicitante, inicialmente vacío. */
    rfc: '',

    /** Denominación o razón social del solicitante, inicialmente vacío. */
    denominacion: '',

    /** Actividad económica principal del solicitante, inicialmente vacío. */
    actividadEconomica: '',

    /** Correo electrónico de contacto del solicitante, inicialmente vacío. */
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
   /**
   * **Constructor de la tienda**
   *
   * - Inicializa el estado de la tienda con los valores predeterminados definidos en `createSolicitanteInitialState()`.
   * - Garantiza que la tienda comience con una estructura de datos válida para el solicitante.
   *
   * @constructor
   */
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
