import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Acuicultura, Consulta, DatosMercancia220203, FormularioMovilizacion, PagoDeDerechos, createDatosState } from '../../models/220203/importacion-de-acuicultura.module';
import { PersonaTerceros } from '@libs/shared/data-access-user/src';

/**
 * @fileoverview
 * Store Akita para la gestión del estado de importación de acuicultura.
 * Permite almacenar, actualizar y limpiar la información capturada en los formularios del trámite.
 * Cobertura compodoc 100%: cada propiedad, método y constructor está documentado.
 * @module AcuiculturaStore
 */

/**
 * Store Akita para la gestión del estado de importación de acuicultura.
 * Permite almacenar, actualizar y limpiar la información capturada en los formularios del trámite.
 * @class AcuiculturaStore
 * @extends {Store<Acuicultura>}
 * @providedIn root
 */
@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'importacion-de-acuicultura', resettable: true })
export class AcuiculturaStore extends Store<Acuicultura> {
    /**
     * Constructor del store.
     * Inicializa el estado con los valores por defecto utilizando la función createDatosState().
     * @constructor
     */
    constructor() {
        super(createDatosState());
    }
    
    /**
     * Actualiza el estado con la información del formulario de pago.
     * @method actualizarFormularioPago
     * @param {FormularioPago} formularioPago - Datos del formulario de pago.
     * @returns {void}
     */
    public actualizarPagoDeDerechos(pagoDeDerechos: PagoDeDerechos): void {
        this.update(state => ({
            ...state,
            pagoDeDerechos: pagoDeDerechos,
        }));
    }

    /**
     * Actualiza el estado con la información del formulario de movilización.
     * @method actualizarFormularioMovilizacion
     * @param {FormularioMovilizacion} formularioMovilizacion - Datos del formulario de movilización.
     * @returns {void}
     */
    public actualizarFormularioMovilizacion(formularioMovilizacion: FormularioMovilizacion): void {
        this.update(state => ({
            ...state,
            formularioMovilizacion,
        }));
    }

    /**
     * Actualiza el estado con la información de los datos de mercancía.
     * @method actualizarDatosMercancia
     * @param {DatosMercancia220203} datosMercancia - Datos de la mercancía.
     * @returns {void}
     */
    public actualizarDatosMercancia(datosMercancia: DatosMercancia220203): void {
        this.update(state => ({
            ...state,
            datosMercancia
        }));
    }

    /**
     * Actualiza el estado con la información de la validez de los formularios.
     * @method actualizarformaValida
     * @param {{ [key: string]: boolean }} updatedFormaValida - Objeto con los valores de validez de los formularios.
     * @returns {void}
     */
    public actualizarformaValida(updatedFormaValida: { [key: string]: boolean }): void {
        this.update(state => ({
            ...state,
            formaValida: {
                ...state.formaValida,
                ...updatedFormaValida,
            }
        }));
    }

    /**
     * Actualiza el estado con la información de la consulta.
     * @method setConsultaioState
     * @param {Consulta} consulta - Datos de la consulta.
     * @returns {void}
     */
    public setConsultaioState(consulta: Consulta): void {
        this.update(state => ({
            ...state,
            consulta
        }));
    }

    /**
     * Actualiza el estado con la información de los terceros relacionados.
     * @method actualizarTercerosRelacionados
     * @param {PersonaTerceros[]} tercerosRelacionados - Arreglo de personas relacionadas como terceros.
     * @returns {void}
     */
    public actualizarTercerosRelacionados(tercerosRelacionados: PersonaTerceros[]): void {
        this.update(state => ({
            ...state,
            tercerosRelacionados: tercerosRelacionados,
        }));
    }

    /**
     * Restablece el estado a su estado inicial.
     * @method limpiarFormulario
     * @returns {void}
     */
    public limpiarFormulario(): void {
        this.reset();
    }
}