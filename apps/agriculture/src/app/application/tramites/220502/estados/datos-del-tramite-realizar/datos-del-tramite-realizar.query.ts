import { DatosDelTramiteRealizar } from '../../models/solicitud-pantallas.model';
import { DatosDelTramiteRealizarStore } from './datos-del-tramite-realizar.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({
    providedIn:'root'
})
/**
 * Clase que maneja las consultas del estado de los datos del trámite a realizar.
 * Extiende de `Query<DatosDelTramiteRealizar>` para proporcionar acceso a los datos almacenados en el store.
 */
export class DatosDelTramiteRealizarQuery extends Query<DatosDelTramiteRealizar> {  
  /**
   * Constructor de la consulta para los datos del trámite a realizar.
   * 
   * @param datosDelTramiteRealizarStore - Instancia del store que contiene el estado del trámite.
   */
  constructor(protected datosDelTramiteRealizarStore: DatosDelTramiteRealizarStore) {
    super(datosDelTramiteRealizarStore);
  }

  /**
   * Observable que permite obtener los datos iniciales almacenados en el store.
   */
  obtenerProcedimientoCarryData$ = this.select();
}
