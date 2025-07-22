import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Acuicultura, Consulta, Fila, FormularioMovilizacion, PagoDeDerechos, RealizarGroup, createDatosState } from '../../models/220203/importacion-de-acuicultura.module';
import { TercerosrelacionadosdestinoTable } from '../../../../shared/models/tercerosrelacionados.model';

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
     * Actualiza el estado con la información del formulario de pago.
     * @method actualizarFormularioPago
     * @param {FormularioPago} formularioPago - Datos del formulario de pago.
     * @returns {void}
     */
    public actualizarSoloRealizarGroup(realizarGroup: RealizarGroup): void {
        this.update(state => ({
            ...state,
            realizarGroup: realizarGroup,
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
    public actualizarDatosMercancia(realizarGroup: RealizarGroup): void {
        this.update(state => ({
            ...state,
            realizarGroup
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
    public actualizarMercanciaGroup(mercanciaGroup: Fila[]): void {
        this.update(state => ({
            ...state,
            mercanciaGroup: mercanciaGroup,
        }));
    }
   /**
   * Actualiza el store con la lista de terceros relacionados.
   * @method updateTercerosRelacionados
   * @param {TercerosrelacionadosdestinoTable[]} tercerosRelacionados Lista de personas terceros relacionadas.
   */
  public updateTercerosRelacionados(tercerosRelacionados: TercerosrelacionadosdestinoTable[]): void {
    this.update(state => ({
      ...state,
      tercerosRelacionados: tercerosRelacionados,
    }));
  }
   /**
   * Actualiza el store con la lista de terceros relacionados.
   * @method updateTercerosRelacionados
   * @param {TercerosrelacionadosdestinoTable[]} tercerosRelacionados Lista de personas terceros relacionadas.
   */
  public updatedatosForma(tercerosRelacionados: TercerosrelacionadosdestinoTable[]): void {
    this.update(state => ({
      ...state,
      datosForma: tercerosRelacionados,
    }));
  }

    /**
 * Actualiza el store con los datos de movilización nacional.
 * @method actualizarDatosParaMovilizacionNacional
 * @param {DatosParaMovilizacionNacional} datosParaMovilizacionNacional Datos de movilización nacional.
 */
  public actualizarSelectedTerceros(datosParaMovilizacionNacional: TercerosrelacionadosdestinoTable): void {
    this.update(state => ({
      ...state,
      seletedTerceros: datosParaMovilizacionNacional
    }));
  }
   /**
  * Actualiza el store con los datos de movilización nacional.
  * @method actualizarDatosParaMovilizacionNacional
  * @param {DatosParaMovilizacionNacional} datosParaMovilizacionNacional Datos de movilización nacional.
  */
  public actualizarSelectedExdora(datosParaMovilizacionNacional: TercerosrelacionadosdestinoTable): void {
    this.update(state => ({
      ...state,
      seletedExdora: datosParaMovilizacionNacional
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