import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ResponsableInspeccionEnPuntoStore } from './responsable-inspeccion-en-punto.store';

@Injectable({
    providedIn:'root'
})
/**
 * Clase que maneja las consultas del estado del responsable de inspección en punto.
 * Extiende de `Query<CatalogosSelect>` para proporcionar acceso a los datos almacenados en el store.
 */
export class ResponsableInspeccionEnPuntoQuery extends Query<CatalogosSelect> {  
  /**
   * Constructor de la consulta para el responsable de inspección en punto.
   * 
   * @param responsableInspeccionEnPuntoStore - Instancia del store que contiene el estado de la inspección en punto.
   */
  constructor(protected responsableInspeccionEnPuntoStore: ResponsableInspeccionEnPuntoStore) {
    super(responsableInspeccionEnPuntoStore);
  }

  /**
   * Observable que permite obtener los datos iniciales almacenados en el store.
   */
  obtenerDatosIniciales$ = this.select();
}
