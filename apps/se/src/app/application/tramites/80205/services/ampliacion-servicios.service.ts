import { AmpliacionServiciosState, ServicioAmpliacion, ServicioAutorizado } from '../models/datos-info.model';
import {Observable,map } from 'rxjs';
import {AmpliacionServiciosStore} from '../estados/tramite80205.store';
import { COMUN_URL } from '../../../core/server/api-router';
import { Catalogo } from '../constantes/modificacion.enum';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Servicio } from '../models/datos-info.model';




@Injectable({
  providedIn: 'root',
})
export class AmpliacionServiciosService {

  host!: string;

  constructor(private readonly http: HttpClient,
    private tramite80205Store: AmpliacionServiciosStore
  ) {
    this.host = `${COMUN_URL.BASE_URL}`;
  }

  /**
   * Obtiene los datos de ampliación de servicios desde un archivo JSON.
   * @returns {Observable<any>} - Observable con los datos obtenidos.
   */
  getDatos(): Observable<Servicio[]> {
    return this.http
    .get<Servicio[]>("assets/json/80205/ampliacion-servicios.json")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .pipe(map((res: any) => res.data));
}

  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * @param DATOS - Objeto que contiene los datos a actualizar en el estado del formulario.
   */

  actualizarEstadoFormulario(DATOS:AmpliacionServiciosState): void {
    this.tramite80205Store.setInfoRegistro(DATOS.servicios);
   this.tramite80205Store.setAduanaDeIngresoSeleccion(DATOS.aduanaDeIngresoSelecion as Catalogo);
    this.tramite80205Store.setNumeroPrograma(DATOS.numeroPrograma); 
    this.tramite80205Store.setRfcEmpresa(DATOS.rfcEmpresa);
    this.tramite80205Store.setTiempoPrograma(DATOS.tiempoPrograma);
    this.tramite80205Store.setDatosImmex(
      (DATOS.tablaDatosIMMEX as unknown as ServicioAmpliacion[])
    );
    this.tramite80205Store.setDatos(DATOS.tablaDatos);

  }
  /**
   * Obtiene los datos de ampliación de servicios desde un archivo JSON.
   * @returns {Observable<AmpliacionServiciosState>} - Observable con el estado de ampliación de servicios.
   */

  getServiciosData(): Observable<AmpliacionServiciosState> {
    return this.http.get<AmpliacionServiciosState>('assets/json/80205/ampliacion-campo.json');
  }
/**
 * Obtiene la tabla de datos desde un archivo JSON.
 * @return {Observable<ServicioAutorizado[]>} - Observable con la tabla de datos.
 */
  getTablaDatos(): Observable<ServicioAutorizado[]> {
    return this.http.get<ServicioAutorizado[]>('assets/json/80205/ampliaciaon-autrazidos.json');
  }

}


