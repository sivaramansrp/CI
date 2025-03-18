import { Injectable } from '@angular/core';
import { MuestrasMercanciasStore } from '../models/registro-muestras-mercancias.model';
import { Query } from '@datorama/akita';
import { RenovacionesMuestrasMercanciasStore } from './renovaciones-muestras-mercancias.store';

@Injectable({
  providedIn: 'root',
})
/**
 * Consulta de datos (Query) para acceder al estado de las renovaciones de muestras de mercancías.
 * Utiliza Akita Query para proporcionar acceso a los datos almacenados en el store.
 */
export class RenovacionesMuestrasMercanciasQuery extends Query<MuestrasMercanciasStore> {

  /**
   * Constructor de la clase que inicializa la consulta con el store de renovaciones de muestras de mercancías.
   * @param renovacionesMuestrasMercanciasStore - Instancia del store de renovaciones de muestras de mercancías.
   */
  constructor(protected renovacionesMuestrasMercanciasStore: RenovacionesMuestrasMercanciasStore) {
    super(renovacionesMuestrasMercanciasStore);
  }

  /**
   * Selecciona la validez de la autorización del estado.
   * Retorna un observable con la lista de fechas de validez.
   */
  selectValidezDeLaAutorizacion$ = this.select((state) => {
    return state.validezDeLaAutorizacion;
  });

  /**
   * Selecciona el estado completo de las renovaciones de registro.
   * Retorna un observable con toda la información del estado.
   */
  selectRenovacionesDeRegistro$ = this.select((state) => {
    return state;
  });

  /**
   * Selecciona los datos de pago de derechos del estado.
   * Retorna un observable con la información de pagos registrados.
   */
  selectPagoDeDerechos$ = this.select((state) => {
    return state.pagoDeDerechos;
  });

}
