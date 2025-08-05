/**
 * Store de estado para el trámite 32516 utilizando Akita para la gestión del estado.
 *
 * Este archivo contiene la configuración del store de estado que administra los datos del trámite 32516,
 * incluyendo la información de solicitud y mercancías. Utiliza el patrón de state management de Akita
 * para proporcionar una gestión reactiva y eficiente del estado de la aplicación.
 *
 * @module TramiteStore
 */
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { MercanciaForm } from '../modelos/acta-de-hechos.model';
import { SolicitudForm } from '../modelos/acta-de-hechos.model';
import { HechosInfo } from '../modelos/acta-de-hechos.model';

/**
 * Interfaz que define la estructura del estado del trámite 32516.
 *
 * Esta interfaz representa el estado completo del trámite, incluyendo los datos de la solicitud
 * y las mercancías asociadas. Se utiliza como tipo base para el store de Akita.
 *
 * @interface TramiteState
 */
export interface TramiteState {
    /**
     * @property {SolicitudForm} SolicitudState
     * Estado del formulario de solicitud que contiene la información básica del trámite.
     */
    SolicitudState: SolicitudForm;

    /**
     * @property {MercanciaForm} MercanciaState
     * Estado del formulario de mercancías que contiene los detalles de los productos.
     */
    MercanciaState: MercanciaForm;

    /**
     * @property {HechosInfo[]} HechosTableData
     * Array que contiene los datos de la tabla de hechos para mostrar en la tabla dinámica.
     */
    HechosTableData: HechosInfo[];
}

/**
 * Función que crea el estado inicial del trámite 32516.
 *
 * Inicializa el estado con valores predeterminados para ambos formularios (solicitud y mercancías).
 * Esta función se utiliza durante la construcción del store para establecer el estado base.
 *
 * @function createInitialState
 * @returns {TramiteState} Estado inicial del trámite con valores por defecto.
 */
export function createInitialState(): TramiteState {
    return {
        SolicitudState: {
          /**
           * @property {string} descripcionGenerica1
           * Primera descripción genérica de la solicitud.
           */
          descripcionGenerica1: '',

          /**
           * @property {string} descripcionGenerica2
           * Segunda descripción genérica de la solicitud.
           */
          descripcionGenerica2: '',

          /**
           * @property {string} descripcionGenerica3
           * Tercera descripción genérica de la solicitud.
           */
          descripcionGenerica3: '',

          /**
           * @property {string} capacidadAlmacenamiento
           * Capacidad de almacenamiento requerida.
           */
          capacidadAlmacenamiento: '',

          /**
           * @property {string} cantidadBienes
           * Cantidad de bienes en la solicitud.
           */
          cantidadBienes: ''
        },
        MercanciaState: {
          /**
           * @property {number|null} consecutivo
           * Número consecutivo de la mercancía.
           */
          consecutivo: null,

          /**
           * @property {string} descripcion
           * Descripción detallada de la mercancía.
           */
          descripcion: '',

          /**
           * @property {number|null} cantidad
           * Cantidad de la mercancía.
           */
          cantidad: null,

          /**
           * @property {string} unidadMedida
           * Unidad de medida para la mercancía.
           */
          unidadMedida: '',

          /**
           * @property {number|null} peso
           * Peso de la mercancía.
           */
          peso: null
        },
        /**
         * @property {HechosInfo[]} HechosTableData
         * Array de datos para la tabla de hechos.
         */
        HechosTableData: []
    };
}

/**
 * Store de estado para el trámite 32516 que extiende de Akita Store.
 *
 * Esta clase administra el estado del trámite utilizando el patrón de state management de Akita.
 * Proporciona métodos para actualizar el estado de la solicitud y las mercancías de manera reactiva.
 * El store está configurado con el nombre 'acta-de-hechos' y se inyecta como singleton en la aplicación.
 *
 * @class TramiteStore
 * @extends {Store<TramiteState>}
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'acta-de-hechos' })
export class TramiteStore extends Store<TramiteState> {
    /**
     * Constructor del TramiteStore.
     *
     * Inicializa el estado del store con los valores predeterminados definidos en `createInitialState`.
     * Se invoca automáticamente cuando se inyecta el servicio por primera vez.
     *
     * @constructor
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Actualiza el estado de la solicitud del trámite.
     *
     * Este método permite actualizar parcial o completamente el estado del formulario de solicitud.
     * Utiliza el patrón inmutable de Akita para garantizar la integridad del estado.
     *
     * @method setSolicitudTramite
     * @param {SolicitudForm} SolicitudState - Datos actualizados del formulario de solicitud.
     * @returns {void}
     */
    public setSolicitudTramite(SolicitudState: SolicitudForm): void {
        this.update((state) => ({
            ...state,
            SolicitudState,
        }));
    }

    /**
     * Actualiza el estado de las mercancías del trámite.
     *
     * Este método permite actualizar parcial o completamente el estado del formulario de mercancías.
     * Utiliza el patrón inmutable de Akita para garantizar la integridad del estado.
     *
     * @method setMercanciaTramite
     * @param {MercanciaForm} MercanciaState - Datos actualizados del formulario de mercancías.
     * @returns {void}
     */
    public setMercanciaTramite(MercanciaState: MercanciaForm): void {
        this.update((state) => ({
            ...state,
            MercanciaState,
        }));
    }

    /**
     * Agrega un nuevo elemento a la tabla de hechos.
     *
     * Este método permite agregar un nuevo registro de hechos al array de datos de la tabla.
     * Utiliza el patrón inmutable de Akita para garantizar la integridad del estado.
     *
     * @method addHechosTableData
     * @param {HechosInfo} hecho - Nuevo registro de hechos a agregar.
     * @returns {void}
     */
    public addHechosTableData(hecho: HechosInfo): void {
        
        this.update((state) => {
            const newData = [...state.HechosTableData, hecho];
            return {
                ...state,
                HechosTableData: newData,
            };
        });
    }

    /**
     * Actualiza completamente el array de datos de la tabla de hechos.
     *
     * Este método permite reemplazar todo el array de datos de hechos.
     * Utiliza el patrón inmutable de Akita para garantizar la integridad del estado.
     *
     * @method setHechosTableData
     * @param {HechosInfo[]} hechosData - Array completo de datos de hechos.
     * @returns {void}
     */
    public setHechosTableData(hechosData: HechosInfo[]): void {
        this.update((state) => ({
            ...state,
            HechosTableData: hechosData,
        }));
    }
}