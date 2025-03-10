import { Injectable } from '@angular/core';
import { InspeccionFisica } from '../models/solicitud-pantallas.model';
import { InspeccionFisicaStore } from './inspeccion-fisica.store';
import { Query } from '@datorama/akita';

@Injectable({
    providedIn:'root'
})
/**
 * Clase que maneja las consultas del estado de la inspección física.
 * Extiende de `Query<CargarDatosIniciales>` para proporcionar acceso a los datos almacenados.
 */
export class InspeccionFisicaQuery extends Query<InspeccionFisica> {  
  /**
   * Constructor de la consulta de Inspección Física.
   * Extiende la clase Query de Akita para acceder al estado de la tienda.
   * 
   * @param inspeccionFisicaStore - Tienda de inspección física utilizada para obtener el estado actual.
   */
  constructor(protected inspeccionFisicaStore: InspeccionFisicaStore) {
    super(inspeccionFisicaStore);
  }

  /**
   * Observable que selecciona y devuelve los datos iniciales de la inspección física.
   */
  selectCargarDatosIniciales$ = this.select((state) => {
    return state.cargarDatosIniciales;
  });

  /**
   * Observable que selecciona y devuelve los catálogos disponibles para la inspección.
   */
  selectCatalogos$ = this.select((state) => {
    return state.catalogosSelect;
  });

  /**
   * Observable que selecciona y devuelve los datos del trámite a realizar.
   */
  selectDatosDelTramiteRealizar$ = this.select((state) => {
    return state.datosDelTramiteRealizar;
  });
}
