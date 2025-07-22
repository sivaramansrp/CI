import { Acuicultura } from "../models/220203/importacion-de-acuicultura.module";
import { AcuiculturaStore } from "./220203/sanidad-certificado.store";
import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";

/**
 * @fileoverview
 * Query Akita para la gestión y selección reactiva del estado de acuicultura.
 * Permite observar el estado completo y partes específicas como los terceros relacionados.
 * Cobertura compodoc 100%: cada propiedad, método y constructor está documentado.
 * @module AcuiculturaQuery
 */

/**
 * Query Akita para la gestión y selección reactiva del estado de acuicultura.
 * Permite observar el estado completo y partes específicas como los terceros relacionados.
 * @class AcuiculturaQuery
 * @extends {Query<Acuicultura>}
 * @providedIn root
 */
@Injectable({ providedIn: 'root' })
export class AcuiculturaQuery extends Query<Acuicultura> {

  /**
   * Constructor de la query.
   * Inyecta el store de acuicultura y lo pasa a la clase base Query.
   * @param {AcuiculturaStore} store - Store Akita de acuicultura.
   */
  constructor(protected override store: AcuiculturaStore) {
    super(store);
  }

  /**
   * Observable que emite el estado completo de acuicultura.
   * @property {Observable<Acuicultura>} seleccionarTodo$
   */
  seleccionarTodo$ = this.select();

  /**
   * Observable que emite la lista de terceros relacionados del estado.
   * @property {Observable<any>} seleccionarTercerosRelacionados$
   */
  seleccionarTercerosRelacionados$ = this.select(estado => estado.tercerosRelacionados);
  
  /**
   * Observable que emite la lista de terceros relacionados del estado.
   * @property {Observable<any>} seleccionarTercerosRelacionados$
   */
  seleccionaraMercanciaGroup$ = this.select(estado => estado.mercanciaGroup);

    /**
  * Selector para obtener la lista de terceros relacionados.
  *
  * @readonly
  * @type {Observable<any>}
  * @memberof ZoosanitarioQuery
  */
  seleccionarTerceros$ = this.select(estado => estado.seletedTerceros);



}