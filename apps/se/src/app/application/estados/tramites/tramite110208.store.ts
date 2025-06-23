import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * Interfaz que representa el estado de Solicitud260211.
 */
export interface Solicitud110208State {
    /**
     * El valor de entidadFederativa.
     */
    entidadFederativa: string;
    /**
     * El valor de bloque.
     */
    bloque: string;
    /**
     * El valor de fraccionArancelariaForm.
     */
    fraccionArancelariaForm: string;
    /**
     * El valor de registroProductoForm.
     */
    registroProductoForm: string;
    /**
     * El valor de nombreComercialForm.
     */
    nombreComercialForm: string;
    /**
     * El valor de fechaInicio.
     */
    fechaInicio: string;
    /**
     * El valor de fechaFinal.
     */
    fechaFinal: string;
    /**
     * El valor de tercerOperador.
     */
    tercerOperador: string;
    /**
     * El valor de marca.
     */
    marca: string;
    /**
     * El valor de cantidad.
     */
    cantidad: string;
    /**
     * El valor de umc.
     */
    umc: string;
    /**
     * El valor de valorDeLa.
     */
    valorDeLa: string;
    /**
     * El valor de complementoDescripcion.
     */
    complementoDescripcion: string;
    /**
     * El valor de nFactura.
     */
    nFactura: string;
    /**
     * El valor de tipoDeFactura.
     */
    tipoDeFactura: string;
    /**
     * El valor de fechaFactura.
     */
    fechaFactura: string;
    /**
     * El valor de ciudad.
     */
    ciudad: string;
    /**
     * El valor de calle.
     */
    calle: string;
    /**
     * El valor de numeroLetra.
     */
    numeroLetra: string;
    /**
     * El valor de lada.
     */
    lada: string;
    /**
     * El valor de telefono.
     */
    telefono: string;
    /**
     * El valor de fax.
     */
    fax: string;
    /**
     * El valor de correoElectronico.
     */
    correoElectronico: string;
    /**
     * El valor de paisDestino.
     */
    paisDestino: string;
    /**
     * El valor de nombres.
     */
    nombres: string;
    /**
     * El valor de primerApellido.
     */
    primerApellido: string;
    /**
     * El valor de segundoApellido.
     */
    segundoApellido: string;
    /**
     * El valor de numeroFiscal.
     */
    numeroFiscal: string;
    /**
     * El valor de razonSocial.
     */
    razonSocial: string;
    /**
     * El valor de medioTransporte.
     */
    medioTransporte: string;
    /**
     * El valor de rutaCompleta.
     */
    rutaCompleta: string;
    /**
     * El valor de puertoDeEmbarque.
     */
    puertoDeEmbarque: string;
    /**
     * El valor de puertoDeDesembarque.
     */
    puertoDeDesembarque: string;
    /**
     * El valor de observaciones.
     */
    observaciones: string;
    /**
     * El valor de idioma.
     */
    idioma: string;
    /**
     * El valor de entidadFederativaCertificado.
     */
    entidadFederativaCertificado: string;
    /**
     * El valor de representacionFederal.
     */
    representacionFederal: string;
    
}
/**
 * Función para crear el estado inicial de Solicitud110208State.
 * @returns {Solicitud110208State} El estado inicial de Solicitud110208State.
 */
export function createInitialState(): Solicitud110208State {
    return {
        /**
         * El valor de entidadFederativa.
         */
        entidadFederativa: '',
        /**
         * El valor de bloque.
         */
        bloque: '',
        /**
         * El valor de fraccionArancelariaForm.
         */
        fraccionArancelariaForm: '',
        /**
         * El valor de registroProductoForm.
         */
        registroProductoForm: '',
        /**
         * El valor de nombreComercialForm.
         */
        nombreComercialForm: '',
        /**
         * El valor de fechaInicio.
         */
        fechaInicio: '',
        /**
         * El valor de fechaFinal.
         */
        fechaFinal: '',
        /**
         * El valor de tercerOperador.
         */
        tercerOperador: '',
        /**
         * El valor de marca.
         */
        marca: '',
        /**
         * El valor de cantidad.
         */
        cantidad: '',
        /**
         * El valor de umc.
         */
        umc: '',
        /**
         * El valor de valorDeLa.
         */
        valorDeLa: '',
        /**
         * El valor de complementoDescripcion.
         */
        complementoDescripcion: '',
        /**
         * El valor de nFactura.
         */
        nFactura: '',
        /**
         * El valor de tipoDeFactura.
         */
        tipoDeFactura: '',
        /**
         * El valor de fechaFactura.
         */
        fechaFactura: '',
        /**
         * El valor de ciudad.
         */
        ciudad: '',
        /**
         * El valor de calle.
         */
        calle: '',
        /**
         * El valor de numeroLetra.
         */
        numeroLetra: '',
        /**
         * El valor de lada.
         */
        lada: '',
        /**
         * El valor de telefono.
         */
        telefono: '',
        /**
         * El valor de fax.
         */
        fax: '',
        /**
         * El valor de correoElectronico.
         */
        correoElectronico: '',
        /**
         * El valor de paisDestino.
         */
        paisDestino: '',
        /**
         * El valor de nombres.
         */
        nombres: '',
        /**
         * El valor de primerApellido.
         */
        primerApellido: '',
        /**
         * El valor de segundoApellido.
         */
        segundoApellido: '',
        /**
         * El valor de numeroFiscal.
         */
        numeroFiscal: '',
        /**
         * El valor de razonSocial.
         */
        razonSocial: '',
        /**
         * El valor de medioTransporte.
         */
        medioTransporte: '',
        /**
         * El valor de rutaCompleta.
         */
        rutaCompleta: '',
        /**
         * El valor de puertoDeEmbarque.
         */
        puertoDeEmbarque: '',
        /**
         * El valor de puertoDeDesembarque.
         */
        puertoDeDesembarque: '',
        /**
         * El valor de observaciones.
         */
        observaciones: '',
        /**
         * El valor de idioma.
         */
        idioma: '',
        /**
         * El valor de entidadFederativaCertificado.
         */
        entidadFederativaCertificado: '',
        /**
         * El valor de representacionFederal.
         */
        representacionFederal: '',
        
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
@StoreConfig({ name: 'tramite110208', resettable: true })

export class Tramite110208Store extends Store<Solicitud110208State>{
    /**
     * Crea una instancia de Tramite31601Store.
     * Inicializa la tienda con el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece el estado de entidadFederativa.
     * @param entidadFederativa - El valor de entidadFederativa.
     */
    public setEntidadFederativa(entidadFederativa: string):void {
        this.update((state) => ({
            ...state,
            entidadFederativa,
        }));
    }
    /**
     * Establece el estado de bloque.
     * @param bloque - El valor de bloque.
     */
    public setBloque(bloque: string):void {
        this.update((state) => ({
            ...state,
            bloque,
        }));
    }
    /**
     * Establece el estado de fraccionArancelariaForm.
     * @param fraccionArancelariaForm - El valor de fraccionArancelariaForm.
     */
    public setFraccionArancelariaForm(fraccionArancelariaForm: string):void {
        this.update((state) => ({
            ...state,
            fraccionArancelariaForm,
        }));
    }
    /**
     * Establece el estado de registroProductoForm.
     * @param registroProductoForm - El valor de registroProductoForm.
     */
    public setRegistroProductoForm(registroProductoForm: string):void {
        this.update((state) => ({
            ...state,
            registroProductoForm,
        }));
    }
    /**
     * Establece el estado de nombreComercialForm.
     * @param nombreComercialForm - El valor de nombreComercialForm.
     */
    public setNombreComercialForm(nombreComercialForm: string):void {
        this.update((state) => ({
            ...state,
            nombreComercialForm,
        }));
    }
    /**
     * Establece el estado de fechaInicio.
     * @param fechaInicio - El valor de fechaInicio.
     */
    public setFechaInicio(fechaInicio: string):void {
        this.update((state) => ({
            ...state,
            fechaInicio,
        }));
    }
    /**
     * Establece el estado de fechaFinal.
     * @param fechaFinal - El valor de fechaFinal.
     */
    public setFechaFinal(fechaFinal: string):void {
        this.update((state) => ({
            ...state,
            fechaFinal,
        }));
    }
    /**
     * Establece el estado de tercerOperador.
     * @param tercerOperador - El valor de tercerOperador.
     */
    public setTercerOperador(tercerOperador: string):void {
        this.update((state) => ({
            ...state,
            tercerOperador,
        }));
    }
    /**
     * Establece el estado de marca.
     * @param marca - El valor de marca.
     */
    public setMarca(marca: string):void {
        this.update((state) => ({
            ...state,
            marca,
        }));
    }
    /**
     * Establece el estado de cantidad.
     * @param cantidad - El valor de cantidad.
     */
    public setCantidad(cantidad: string):void {
        this.update((state) => ({
            ...state,
            cantidad,
        }));
    }
    /**
     * Establece el estado de umc.
     * @param umc - El valor de umc.
     */
    public setUmc(umc: string):void {
        this.update((state) => ({
            ...state,
            umc,
        }));
    }
    /**
     * Establece el estado de valorDeLa.
     * @param valorDeLa - El valor de valorDeLa.
     */
    public setValorDeLa(valorDeLa: string):void {
        this.update((state) => ({
            ...state,
            valorDeLa,
        }));
    }
    /**
     * Establece el estado de complementoDescripcion.
     * @param complementoDescripcion - El valor de complementoDescripcion.
     */
    public setComplementoDescripcion(complementoDescripcion: string):void {
        this.update((state) => ({
            ...state,
            complementoDescripcion,
        }));
    }
    /**
     * Establece el estado de nFactura.
     * @param nFactura - El valor de nFactura.
     */
    public setNFactura(nFactura: string):void {
        this.update((state) => ({
            ...state,
            nFactura,
        }));
    }
    /**
     * Establece el estado de tipoDeFactura.
     * @param tipoDeFactura - El valor de tipoDeFactura.
     */
    public setTipoDeFactura(tipoDeFactura: string):void {
        this.update((state) => ({
            ...state,
            tipoDeFactura,
        }));
    }
    /**
     * Establece el estado de fechaFactura.
     * @param fechaFactura - El valor de fechaFactura.
     */
    public setFechaFactura(fechaFactura: string):void {
        this.update((state) => ({
            ...state,
            fechaFactura,
        }));
    }
    /**
     * Establece el estado de ciudad.
     * @param ciudad - El valor de ciudad.
     */
    public setCiudad(ciudad: string):void {
        this.update((state) => ({
            ...state,
            ciudad,
        }));
    }
    /**
     * Establece el estado de calle.
     * @param calle - El valor de calle.
     */
    public setCalle(calle: string):void {
        this.update((state) => ({
            ...state,
            calle,
        }));
    }
    /**
     * Establece el estado de numeroLetra.
     * @param numeroLetra - El valor de numeroLetra.
     */
    public setNumeroLetra(numeroLetra: string):void {
        this.update((state) => ({
            ...state,
            numeroLetra,
        }));
    }
    /**
     * Establece el estado de lada.
     * @param lada - El valor de lada.
     */
    public setLada(lada: string):void {
        this.update((state) => ({
            ...state,
            lada,
        }));
    }
    /**
     * Establece el estado de telefono.
     * @param telefono - El valor de telefono.
     */
    public setTelefono(telefono: string):void {
        this.update((state) => ({
            ...state,
            telefono,
        }));
    }
    /**
     * Establece el estado de fax.
     * @param fax - El valor de fax.
     */
    public setFax(fax: string):void {
        this.update((state) => ({
            ...state,
            fax,
        }));
    }
    /**
     * Establece el estado de correoElectronico.
     * @param correoElectronico - El valor de correoElectronico.
     */
    public setCorreoElectronico(correoElectronico: string):void {
        this.update((state) => ({
            ...state,
            correoElectronico,
        }));
    }
    /**
     * Establece el estado de paisDestino.
     * @param paisDestino - El valor de paisDestino.
     */
    public setPaisDestino(paisDestino: string):void {
        this.update((state) => ({
            ...state,
            paisDestino,
        }));
    }
    /**
     * Establece el estado de nombres.
     * @param nombres - El valor de nombres.
     */
    public setNombres(nombres: string):void {
        this.update((state) => ({
            ...state,
            nombres,
        }));
    }
    /**
     * Establece el estado de primerApellido.
     * @param primerApellido - El valor de primerApellido.
     */
    public setPrimerApellido(primerApellido: string):void {
        this.update((state) => ({
            ...state,
            primerApellido,
        }));
    }
    /**
     * Establece el estado de segundoApellido.
     * @param segundoApellido - El valor de segundoApellido.
     */
    public setSegundoApellido(segundoApellido: string):void {
        this.update((state) => ({
            ...state,
            segundoApellido,
        }));
    }
    /**
     * Establece el estado de numeroFiscal.
     * @param numeroFiscal - El valor de numeroFiscal.
     */
    public setNumeroFiscal(numeroFiscal: string):void {
        this.update((state) => ({
            ...state,
            numeroFiscal,
        }));
    }
    /**
     * Establece el estado de razonSocial.
     * @param razonSocial - El valor de razonSocial.
     */
    public setRazonSocial(razonSocial: string):void {
        this.update((state) => ({
            ...state,
            razonSocial,
        }));
    }
    /**
     * Establece el estado de medioTransporte.
     * @param medioTransporte - El valor de medioTransporte.
     */
    public setMedioTransporte(medioTransporte: string):void {
        this.update((state) => ({
            ...state,
            medioTransporte,
        }));
    }
    /**
     * Establece el estado de rutaCompleta.
     * @param rutaCompleta - El valor de rutaCompleta.
     */
    public setRutaCompleta(rutaCompleta: string):void {
        this.update((state) => ({
            ...state,
            rutaCompleta,
        }));
    }
    /**
     * Establece el estado de puertoDeEmbarque.
     * @param puertoDeEmbarque - El valor de puertoDeEmbarque.
     */
    public setPuertoDeEmbarque(puertoDeEmbarque: string):void {
        this.update((state) => ({
            ...state,
            puertoDeEmbarque,
        }));
    }
    /**
     * Establece el estado de puertoDeDesembarque.
     * @param puertoDeDesembarque - El valor de puertoDeDesembarque.
     */
    public setPuertoDeDesembarque(puertoDeDesembarque: string):void {
        this.update((state) => ({
            ...state,
            puertoDeDesembarque,
        }));
    }
    /**
     * Establece el estado de observaciones.
     * @param observaciones - El valor de observaciones.
     */
    public setObservaciones(observaciones: string):void {
        this.update((state) => ({
            ...state,
            observaciones,
        }));
    }
    /**
     * Establece el estado de idioma.
     * @param idioma - El valor de idioma.
     */
    public setIdioma(idioma: string):void {
        this.update((state) => ({
            ...state,
            idioma,
        }));
    }
    /**
     * Establece el estado de entidadFederativaCertificado.
     * @param entidadFederativaCertificado - El valor de entidadFederativaCertificado.
     */
    public setEntidadFederativaCertificado(entidadFederativaCertificado: string):void {
        this.update((state) => ({
            ...state,
            entidadFederativaCertificado,
        }));
    }
    /**
     * Establece el estado de representacionFederal.
     * @param representacionFederal - El valor de representacionFederal.
     */
    public setRepresentacionFederal(representacionFederal: string):void {
        this.update((state) => ({
            ...state,
            representacionFederal,
        }));
    }
} 
  