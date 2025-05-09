import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * @interface DestruccionState
 * @description Representa el estado del formulario de destrucción.
 */
export interface DestruccionState {
    tipoDeAviso: string;
    nombre: string;
    rfc: string;
    entidadFederativa: string;
    alcaldiaMunicipo: string;
    colonia: string;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    codigoPostal: string;
    cartaCupo: string;
    numeraDeAcuse: string;
    destruccionMercancia: string;
    merccanciaEntidadFederativa: string;
    merccanciaAlcaldiaMunicipo: string;
    merccanciaColonia: string;
    merccanciaCalle: string;
    merccanciaNumeroExterior: string;
    merccanciaNumeroInterior: string;
    merccanciaCodigoPostal: string;
    destruir: string;
    tarifa: string;
    destruccionEntidadFederativa: string;
    destruccionAlcaldiaMunicipo: string;
    destruccionColonia: string;
    destruccionCalle: string;
    destruccionNumeroExterior: string;
    destruccionNumeroInterior: string;
    destruccionCodigoPostal: string;
    destruccionHora: string;
    desturccionProceso: string;
    casofortuito: string;
    donoMercancia: string;
    condicionesMateriales: string;
    caboDestruccionFecha: string;
}

/**
 * @function createInitialState
 * @description Crea el estado inicial del formulario de destrucción.
 * @returns {DestruccionState} Estado inicial.
 */
export function createInitialState(): DestruccionState {
    return {
        tipoDeAviso: '',
        nombre: '',
        rfc: '',
        entidadFederativa: '',
        alcaldiaMunicipo: '',
        colonia: '',
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        codigoPostal: '',
        cartaCupo: '',
        numeraDeAcuse: '',
        destruccionMercancia: '',
        merccanciaEntidadFederativa: '',
        merccanciaAlcaldiaMunicipo: '',
        merccanciaColonia: '',
        merccanciaCalle: '',
        merccanciaNumeroExterior: '',
        merccanciaNumeroInterior: '',
        merccanciaCodigoPostal: '',
        destruir: '',
        tarifa: '',
        destruccionEntidadFederativa: '',
        destruccionAlcaldiaMunicipo: '',
        destruccionColonia: '',
        destruccionCalle: '',
        destruccionNumeroExterior: '',
        destruccionNumeroInterior: '',
        destruccionCodigoPostal: '',
        destruccionHora: '',
        desturccionProceso: '',
        casofortuito: '',
        donoMercancia: '',
        condicionesMateriales: '',
        caboDestruccionFecha: '',
    };
}

/**
 * @class DestruccionStore
 * @description Almacén para gestionar el estado del formulario de destrucción.
 */
@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'Destruccion', resettable: true })
export class DestruccionStore extends Store<DestruccionState> {
    /**
     * @constructor
     * @description Inicializa el estado del almacén.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * @method setTipoDeAviso
     * @description Actualiza el tipo de aviso en el estado.
     * @param {string} tipoDeAviso - Tipo de aviso.
     */
    public setTipoDeAviso(tipoDeAviso: string) {
        this.update((state) => ({
            ...state,
            tipoDeAviso,
        }));
    }

    /**
     * @method setNombre
     * @description Actualiza el nombre en el estado.
     * @param {string} nombre - Nombre del solicitante.
     */
    public setNombre(nombre: string) {
        this.update((state) => ({
            ...state,
            nombre,
        }));
    }

    /**
     * @method setRfc
     * @description Actualiza el RFC en el estado.
     * @param {string} rfc - RFC del solicitante.
     */
    public setRfc(rfc: string) {
        this.update((state) => ({
            ...state,
            rfc,
        }));
    }

    /**
     * @method setEntidadFederativa
     * @description Actualiza la entidad federativa en el estado.
     * @param {string} entidadFederativa - Entidad federativa.
     */
    public setEntidadFederativa(entidadFederativa: string) {
        this.update((state) => ({
            ...state,
            entidadFederativa,
        }));
    }

    /**
     * @method setAlcaldiaMunicipo
     * @description Actualiza la alcaldía o municipio en el estado.
     * @param {string} alcaldiaMunicipo - Alcaldía o municipio.
     */
    public setAlcaldiaMunicipo(alcaldiaMunicipo: string) {
        this.update((state) => ({
            ...state,
            alcaldiaMunicipo,
        }));
    }

    /**
     * @method setColonia
     * @description Actualiza la colonia en el estado.
     * @param {string} colonia - Colonia.
     */
    public setColonia(colonia: string) {
        this.update((state) => ({
            ...state,
            colonia,
        }));
    }

    /**
     * @method setCalle
     * @description Actualiza la calle en el estado.
     * @param {string} calle - Calle.
     */
    public setCalle(calle: string) {
        this.update((state) => ({
            ...state,
            calle,
        }));
    }

    /**
     * @method setNumeroExterior
     * @description Actualiza el número exterior en el estado.
     * @param {string} numeroExterior - Número exterior.
     */
    public setNumeroExterior(numeroExterior: string) {
        this.update((state) => ({
            ...state,
            numeroExterior,
        }));
    }

    /**
     * @method setNumeroInterior
     * @description Actualiza el número interior en el estado.
     * @param {string} numeroInterior - Número interior.
     */
    public setNumeroInterior(numeroInterior: string) {
        this.update((state) => ({
            ...state,
            numeroInterior,
        }));
    }

    /**
     * @method setCodigoPostal
     * @description Actualiza el código postal en el estado.
     * @param {string} codigoPostal - Código postal.
     */
    public setCodigoPostal(codigoPostal: string) {
        this.update((state) => ({
            ...state,
            codigoPostal,
        }));
    }

    /**
     * @method setCartaCupo
     * @description Establece el valor de la propiedad `cartaCupo` en el estado de la tienda.
     * @param cartaCupo {string} - El nuevo valor de la carta cupo que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setCartaCupo('nuevoValorCartaCupo');
     */
    public setCartaCupo(cartaCupo: string) {
        this.update((state) => ({
            ...state,
            cartaCupo,
        }));
    }

    /**
     * @method setNumeraDeAcuse
     * @description Establece el valor de la propiedad `numeraDeAcuse` en el estado de la tienda.
     * @param numeraDeAcuse {string} - El nuevo valor del número de acuse que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setNumeraDeAcuse('nuevoValorNumeraDeAcuse');
     */
    public setNumeraDeAcuse(numeraDeAcuse: string) {
        this.update((state) => ({
            ...state,
            numeraDeAcuse,
        }));
    }

    /**
     * @method setDestruccionMercancia
     * @description Establece el valor de la propiedad `destruccionMercancia` en el estado de la tienda.
     * @param destruccionMercancia {string} - El nuevo valor de la destrucción de mercancía que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setDestruccionMercancia('nuevoValorDestruccionMercancia');
     */
    public setDestruccionMercancia(destruccionMercancia: string) {
        this.update((state) => ({
            ...state,
            destruccionMercancia,
        }));
    }

    /**
     * @method setMerccanciaEntidadFederativa
     * @description Establece el valor de la propiedad `merccanciaEntidadFederativa` en el estado de la tienda.
     * @param merccanciaEntidadFederativa {string} - El nuevo valor de la entidad federativa de la mercancía que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setMerccanciaEntidadFederativa('nuevoValorEntidadFederativa');
     */
    public setMerccanciaEntidadFederativa(merccanciaEntidadFederativa: string) {
        this.update((state) => ({
            ...state,
            merccanciaEntidadFederativa,
        }));
    }

    /**
     * @method setMerccanciaAlcaldiaMunicipo
     * @description Establece el valor de la propiedad `merccanciaAlcaldiaMunicipo` en el estado de la tienda.
     * @param merccanciaAlcaldiaMunicipo {string} - El nuevo valor de la alcaldía o municipio de la mercancía que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setMerccanciaAlcaldiaMunicipo('nuevoValorAlcaldiaMunicipo');
     */
    public setMerccanciaAlcaldiaMunicipo(merccanciaAlcaldiaMunicipo: string) {
        this.update((state) => ({
            ...state,
            merccanciaAlcaldiaMunicipo,
        }));
    }
    
    /**
     * @method setMerccanciaColonia
     * @description Establece el valor de la propiedad `merccanciaColonia` en el estado de la tienda.
     * @param merccanciaColonia {string} - El nuevo valor de la colonia de la mercancía que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setMerccanciaColonia('nuevoValorColonia');
     */
    public setMerccanciaColonia(merccanciaColonia: string) {
        this.update((state) => ({
            ...state,
            merccanciaColonia,
        }));
    }

    /**
     * @method setMerccanciaCalle
     * @description Establece el valor de la propiedad `merccanciaCalle` en el estado de la tienda.
     * @param merccanciaCalle {string} - El nuevo valor de la calle de la mercancía que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setMerccanciaCalle('nuevoValorCalle');
     */
    public setMerccanciaCalle(merccanciaCalle: string) {
        this.update((state) => ({
            ...state,
            merccanciaCalle,
        }));
    }

    /**
     * @method setMerccanciaNumeroExterior
     * @description Establece el valor de la propiedad `merccanciaNumeroExterior` en el estado de la tienda.
     * @param merccanciaNumeroExterior {string} - El nuevo valor del número exterior de la mercancía que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setMerccanciaNumeroExterior('nuevoValorNumeroExterior');
     */
    public setMerccanciaNumeroExterior(merccanciaNumeroExterior: string) {
        this.update((state) => ({
            ...state,
            merccanciaNumeroExterior,
        }));
    }

    /**
     * @method setMerccanciaNumeroInterior
     * @description Establece el valor de la propiedad `merccanciaNumeroInterior` en el estado de la tienda.
     * @param merccanciaNumeroInterior {string} - El nuevo valor del número interior de la mercancía que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setMerccanciaNumeroInterior('nuevoValorNumeroInterior');
     */
    public setMerccanciaNumeroInterior(merccanciaNumeroInterior: string) {
        this.update((state) => ({
            ...state,
            merccanciaNumeroInterior,
        }));
    }

    /**
     * @method setMerccanciaCodigoPostal
     * @description Establece el valor de la propiedad `merccanciaCodigoPostal` en el estado de la tienda.
     * @param merccanciaCodigoPostal {string} - El nuevo valor del código postal de la mercancía que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setMerccanciaCodigoPostal('nuevoValorCodigoPostal');
     */
    public setMerccanciaCodigoPostal(merccanciaCodigoPostal: string) {
        this.update((state) => ({
            ...state,
            merccanciaCodigoPostal,
        }));
    }

    /**
     * @method setDestruir
     * @description Actualiza el estado con el valor proporcionado para la propiedad `destruir`.
     * @param destruir {string} - El nuevo valor para la propiedad `destruir`.
     * @example
     * // Ejemplo de uso:
     * store.setDestruir('nuevoValor');
     */
    public setDestruir(destruir: string) {
        this.update((state) => ({
            ...state,
            destruir,
        }));
    }

    /**
     * @method setTarifa
     * @description Establece el valor de la propiedad `tarifa` en el estado de la tienda.
     * @param tarifa {string} - El nuevo valor de la tarifa que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setTarifa('nuevoValorTarifa');
     */
    public setTarifa(tarifa: string) {
        this.update((state) => ({
            ...state,
            tarifa,
        }));
    }

    /**
     * @method setDestruccionEntidadFederativa
     * @description Establece el valor de la propiedad `destruccionEntidadFederativa` en el estado de la tienda.
     * @param destruccionEntidadFederativa {string} - El nuevo valor de la entidad federativa de destrucción que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setDestruccionEntidadFederativa('nuevoValorEntidadFederativa');
     */
    public setDestruccionEntidadFederativa(destruccionEntidadFederativa: string) {
        this.update((state) => ({
            ...state,
            destruccionEntidadFederativa,
        }));
    }

    /**
     * @method setDestruccionAlcaldiaMunicipo
     * @description Establece el valor de la propiedad `destruccionAlcaldiaMunicipo` en el estado de la tienda.
     * @param destruccionAlcaldiaMunicipo {string} - El nuevo valor de la alcaldía o municipio de destrucción que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setDestruccionAlcaldiaMunicipo('nuevoValorAlcaldiaMunicipo');
     */
    public setDestruccionAlcaldiaMunicipo(destruccionAlcaldiaMunicipo: string) {
        this.update((state) => ({
            ...state,
            destruccionAlcaldiaMunicipo,
        }));
    }

    /**
     * @method setDestruccionColonia
     * @description Establece el valor de la propiedad `destruccionColonia` en el estado de la tienda.
     * @param destruccionColonia {string} - El nuevo valor de la colonia de destrucción que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setDestruccionColonia('nuevoValorColonia');
     */
    public setDestruccionColonia(destruccionColonia: string) {
        this.update((state) => ({
            ...state,
            destruccionColonia,
        }));
    }

    /**
     * @method setDestruccionCalle
     * @description Actualiza el estado con el valor proporcionado para la propiedad `destruccionCalle`.
     * @param {string} destruccionCalle - El nuevo valor para la propiedad `destruccionCalle`.
     * @memberof Tramite32509Store
     */
    public setDestruccionCalle(destruccionCalle: string) {
        this.update((state) => ({
            ...state,
            destruccionCalle,
        }));
    }

    /**
     * @method setDestruccionNumeroExterior
     * @description Establece el valor de la propiedad `destruccionNumeroExterior` en el estado de la tienda.
     * @param destruccionNumeroExterior {string} - El nuevo valor del número exterior de destrucción que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setDestruccionNumeroExterior('nuevoValorNumeroExterior');
     */
    public setDestruccionNumeroExterior(destruccionNumeroExterior: string) {
        this.update((state) => ({
            ...state,
            destruccionNumeroExterior,
        }));
    }

    /**
     * @method setDestruccionNumeroInterior
     * @description Establece el valor de la propiedad `destruccionNumeroInterior` en el estado de la tienda.
     * @param destruccionNumeroInterior {string} - El nuevo valor del número interior de destrucción que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setDestruccionNumeroInterior('nuevoValorNumeroInterior');
     */
    public setDestruccionNumeroInterior(destruccionNumeroInterior: string) {
        this.update((state) => ({
            ...state,
            destruccionNumeroInterior,
        }));
    }

    /**
     * @method setDestruccionCodigoPostal
     * @description Establece el valor de la propiedad `destruccionCodigoPostal` en el estado de la tienda.
     * @param destruccionCodigoPostal {string} - El nuevo valor del código postal de destrucción que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setDestruccionCodigoPostal('nuevoValorCodigoPostal');
     */
    public setDestruccionCodigoPostal(destruccionCodigoPostal: string) {
        this.update((state) => ({
            ...state,
            destruccionCodigoPostal,
        }));
    }

    /**
     * @method setDestruccionHora
     * @description Establece el valor de la propiedad `destruccionHora` en el estado de la tienda.
     * @param destruccionHora {string} - El nuevo valor de la hora de destrucción que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setDestruccionHora('nuevoValorHora');
     */
    public setDestruccionHora(destruccionHora: string) {
        this.update((state) => ({
            ...state,
            destruccionHora,
        }));
    }

    /**
     * @method setDesturccionProceso
     * @description Establece el valor de la propiedad `desturccionProceso` en el estado de la tienda.
     * @param desturccionProceso {string} - El nuevo valor del proceso de destrucción que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setDesturccionProceso('nuevoValorProceso');
     */
    public setDesturccionProceso(desturccionProceso: string) {
        this.update((state) => ({
            ...state,
            desturccionProceso,
        }));
    }

    /**
     * @method setCasofortuito
     * @description Establece el valor de la propiedad `casofortuito` en el estado de la tienda.
     * @param casofortuito {string} - El nuevo valor del caso fortuito que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setCasofortuito('nuevoValorCasoFortuito');
     */
    public setCasofortuito(casofortuito: string) {
        this.update((state) => ({
            ...state,
            casofortuito,
        }));
    }

    /**
     * @method setDonoMercancia
     * @description Establece el valor de la propiedad `donoMercancia` en el estado de la tienda.
     * @param donoMercancia {string} - El nuevo valor de la donación de mercancía que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setDonoMercancia('nuevoValorDonoMercancia');
     */
    public setDonoMercancia(donoMercancia: string) {
        this.update((state) => ({
            ...state,
            donoMercancia,
        }));
    }

    /**
     * @method setCondicionesMateriales
     * @description Establece el valor de la propiedad `condicionesMateriales` en el estado de la tienda.
     * @param condicionesMateriales {string} - El nuevo valor de las condiciones materiales que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setCondicionesMateriales('nuevoValorCondicionesMateriales');
     */
    public setCondicionesMateriales(condicionesMateriales: string) {
        this.update((state) => ({
            ...state,
            condicionesMateriales,
        }));
    }

    /**
     * @method setCaboDestruccionFecha
     * @description Establece el valor de la propiedad `caboDestruccionFecha` en el estado de la tienda.
     * @param caboDestruccionFecha {string} - El nuevo valor de la fecha en que se llevó a cabo la destrucción que se asignará al estado.
     * @example
     * // Ejemplo de uso:
     * store.setCaboDestruccionFecha('nuevoValorFecha');
     */
    public setCaboDestruccionFecha(caboDestruccionFecha: string) {
        this.update((state) => ({
            ...state,
            caboDestruccionFecha,
        }));
    }
    
}