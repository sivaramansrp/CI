import { CapturarSolicitud } from "../../models/220201/capturar-solicitud.model";
import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { ZoosanitarioStore } from "../../estados/220201/zoosanitario.store";

/**
 * @fileoverview Servicio de consulta para el estado zoosanitario.
 * Esta clase expone selectores para acceder a distintas partes del estado administrado por Akita,
 * permitiendo obtener datos de la solicitud, movilización nacional, terceros, pagos y validaciones.
 * @module ZoosanitarioQuery
 */

/**
 * Servicio de consulta para el estado zoosanitario.
 *
 * Esta clase extiende de `Query<CapturarSolicitud>` y se encarga de exponer
 * selectores que permiten acceder a distintas partes del estado administrado por Akita.
 *
 * @export
 * @class ZoosanitarioQuery
 * @extends {Query<CapturarSolicitud>}
 */
@Injectable({ providedIn: 'root' })
export class ZoosanitarioQuery extends Query<CapturarSolicitud> {

  /**
   * Crea una instancia del servicio de consulta zoosanitario.
   *
   * @param {ZoosanitarioStore} store - Instancia del almacén zoosanitario.
   * @memberof ZoosanitarioQuery
   */
  constructor(protected override store: ZoosanitarioStore) {
    super(store);
  }

  /**
   * Selector para obtener todo el estado zoosanitario.
   *
   * @readonly
   * @type {Observable<CapturarSolicitud>}
   * @memberof ZoosanitarioQuery
   */
  seleccionarTodo$ = this.select();

  /**
   * Selector para obtener los datos de la solicitud.
   *
   * @readonly
   * @type {Observable<any>}
   * @memberof ZoosanitarioQuery
   */
  seleccionarDatosSolicitud$ = this.select(estado => estado.datosDeLaSolicitud);

  /**
   * Selector para obtener los datos de movilización nacional.
   *
   * @readonly
   * @type {Observable<any>}
   * @memberof ZoosanitarioQuery
   */
  seleccionarMovilizacionNacional$ = this.select(estado => estado.datosParaMovilizacionNacional);

  /**
   * Selector para obtener la lista de terceros relacionados.
   *
   * @readonly
   * @type {Observable<any>}
   * @memberof ZoosanitarioQuery
   */
  seleccionarTercerosRelacionados$ = this.select(estado => estado.tercerosRelacionados);

  /**
   * Selector para obtener los datos de pago de derechos.
   *
   * @readonly
   * @type {Observable<any>}
   * @memberof ZoosanitarioQuery
   */
  seleccionarPagoDerechos$ = this.select(estado => estado.pagoDeDerechos);

  /**
   * Selector para obtener el estado de validación del envío.
   *
   * @readonly
   * @type {Observable<any>}
   * @memberof ZoosanitarioQuery
   */
  seleccionarValidarEnvio$ = this.select(estado => estado.validarEnvio);
}