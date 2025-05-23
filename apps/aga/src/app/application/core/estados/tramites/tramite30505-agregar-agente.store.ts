import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AvisoAgente } from '../../models/30505/aviso-modificacion.model';

/**
 * Interfaz que representa el estado de Solicitud30505AgregarAgente.
 */
export interface Solicitud30505AgregarAgenteState {
    /**
     * El valor de tipoFigura.
     */
    tipoFigura: string;
    /**
     * El valor de numPatenteModal.
     */
    numPatenteModal: string;
    /**
     * El valor de obligFisc.
     */
    obligFisc: string;
    /**
     * El valor de autPantente.
     */
    autPantente: string;
    /**
     * El valor de patente2.
     */
    patente2: string;
    /**
     * El valor de razonAgencia.
     */
    razonAgencia: string;

    agenteDatos:AvisoAgente[];
}
/**
 * Función para crear el estado inicial de Solicitud30505AgregarAgente.
 * @returns {Solicitud30505AgregarAgenteState} El estado inicial de Solicitud30505AgregarAgente.
 */
export function createInitialState(): Solicitud30505AgregarAgenteState {
    return {
        /**
         * El valor de tipoFigura.
         */
        tipoFigura: '',
        /**
         * El valor de numPatenteModal.
         */
        numPatenteModal: '',
        /**
         * El valor de obligFisc.
         */
        obligFisc: '',
        /**
         * El valor de autPantente.
         */
        autPantente: '',
        /**
         * El valor de patente2.
         */
        patente2: '',
        /**
         * El valor de razonAgencia.
         */
        razonAgencia: '',

        agenteDatos:[]
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
@StoreConfig({ name: 'tramite30505AgregarAgente', resettable: true })

export class Tramite30505AgregarAgenteStore extends Store<Solicitud30505AgregarAgenteState>{
    /**
     * Crea una instancia de Tramite30505AgregarAgenteStore.
     * Inicializa la tienda con el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece el estado de tipoFigura.
     * @param tipoFigura - El valor de tipoFigura.
     */
    public setTipoFigura(tipoFigura: string) {
        this.update((state) => ({
            ...state,
            tipoFigura,
        }));
    }
    /**
     * Establece el estado de numPatenteModal.
     * @param numPatenteModal - El valor de numPatenteModal.
     */
    public setNumPatenteModal(numPatenteModal: string) {
        this.update((state) => ({
            ...state,
            numPatenteModal,
        }));
    }
    /**
     * Establece el estado de obligFisc.
     * @param obligFisc - El valor de obligFisc.
     */
    public setObligFisc(obligFisc: string) {
        this.update((state) => ({
            ...state,
            obligFisc,
        }));
    }
    /**
     * Establece el estado de autPantente.
     * @param autPantente - El valor de autPantente.
     */
    public setAutPantente(autPantente: string) {
        this.update((state) => ({
            ...state,
            autPantente,
        }));
    }
    /**
     * Establece el estado de patente2.
     * @param patente2 - El valor de patente2.
     */
    public setPatente2(patente2: string) {
        this.update((state) => ({
            ...state,
            patente2,
        }));
    }
    /**
     * Establece el estado de razonAgencia.
     * @param razonAgencia - El valor de razonAgencia.
     */
    public setRazonAgencia(razonAgencia: string) {
        this.update((state) => ({
            ...state,
            razonAgencia,
        }));
    }

    public updateAgenteDatos(newAgente: AvisoAgente[]): void {
        this.update((state) => ({
          ...state,
          agenteDatos: [...state.agenteDatos,...newAgente],
        }));
      }

    
    public eliminarAgento(Agente: AvisoAgente): void {
    this.update((state) => {
      const INDICE_BORROR = state.agenteDatos.findIndex((ele) =>
        Object.entries(Agente).every(([key, value]) => ele[key as keyof AvisoAgente] === value)
      );

      if (INDICE_BORROR !== -1) {
        state.agenteDatos.splice(INDICE_BORROR, 1);
      }

      return {
        ...state,
        agenteDatos: [...state.agenteDatos],
      };
    });
  }

 
} 
  