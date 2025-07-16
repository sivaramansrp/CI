import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaEnlaceOperativo } from '../../tramites/32610/models/enlace-operativo-tabla.model';


/**
 * Interfaz que representa el estado de Tramite32610.
 */
export interface Tramite32610TercerosState {
  representanteRegistro: string;
  representanteRfc: string;
  representanteNombre: string;
  representanteApellidoPaterno: string;
  representanteApellidoMaterno: string;
  representanteTelefono: string;
  representanteCorreo: string;
  registro: string;
  rfc: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  ciudad: string;
  cargo: string;
  telefono: string;
  correo: string;
  suplente: boolean;
  enlaceOperativoData: TablaEnlaceOperativo[];
}
/**
 * Función para crear el estado inicial de Solicitud32610Terceros.
 * @returns {Tramite32610TercerosState} El estado inicial de Solicitud32610Terceros.
 */
export function createInitialState(): Tramite32610TercerosState {
    return {
        representanteRegistro: '',
        representanteRfc: '',
        representanteNombre: '',
        representanteApellidoPaterno: '',
        representanteApellidoMaterno: '',
        representanteTelefono: '',
        representanteCorreo: '',
        registro: '',
        rfc: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        ciudad: '',
        cargo: '',
        telefono: '',
        correo: '',
        suplente: false,
        enlaceOperativoData: [],
    };
}

 /**
 * Decorador Injectable para hacer que la tienda esté disponible a nivel raíz.
 */
@Injectable({
    providedIn: 'root',
})
/**
 * Decorador StoreConfig para configurar la tienda con un nombre y una opción de restablecimiento.
 * @param {Object} config - El objeto de configuración.
 * @param {string} config.name - El nombre de la tienda.
 * @param {boolean} config.resettable - Indica si la tienda es restablecible.
 */
@StoreConfig({ name: 'tramite32610Terceros', resettable: true })

export class Tramite32610TercerosStore extends Store<Tramite32610TercerosState>{
    /**
     * Crea una instancia de Tramite32610Store.
     * Inicializa la tienda con el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }
  public actualizarEstado(valores: Partial<Tramite32610TercerosState>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  } 
} 
  