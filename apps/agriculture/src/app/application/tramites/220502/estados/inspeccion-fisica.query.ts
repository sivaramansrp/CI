import { CargarDatosIniciales } from '../models/solicitud-pantallas.model';
import { Injectable } from '@angular/core';
import { InspeccionFisicaStore } from './inspeccion-fisica.store';
import { Query } from '@datorama/akita';

@Injectable({
    providedIn:'root'
})
/**
 * Clase que maneja las consultas del estado de la inspección física.
 * Extiende de `Query<CargarDatosIniciales>` para proporcionar acceso a los datos almacenados.
 */
export class InspeccionFisicaQuery extends Query<CargarDatosIniciales> {  
  /**
   * Constructor de la consulta de inspección física.
   * 
   * @param inspeccionFisicaStore - Instancia del store que contiene el estado de la inspección física.
   */
  constructor(protected inspeccionFisicaStore: InspeccionFisicaStore) {
    super(inspeccionFisicaStore);
  }

  /**
   * Observable que permite obtener los datos iniciales almacenados en el store.
   */
  obtenerDatosIniciales$ = this.select();
}
