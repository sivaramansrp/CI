import { SolicitudPagoBancoState, TramitePagoBancoStore } from '../estados/stores/pago-banco.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TramitePagoBancoQuery } from '../estados/queries/pago-banco.query';

@Injectable({
  providedIn: 'root',
})
export class PagoBancoService {
  /**
   * Constructor de la clase PagoBancoService.
   *
   * @param http - Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor(public http: HttpClient,private query: TramitePagoBancoQuery, private tramitePagoBancoStore: TramitePagoBancoStore) {
    // Constructor de la clase PagoBancoService
  }

  /**
   * Obtiene los datos de la tabla desde un archivo JSON local.
   *
   * @returns Observable que emite un arreglo de objetos Catalogo.
   */
  getBancoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260501/banco-options.json');
  }
  
/**
 * Recupera el estado actual de `SolicitudPagoBanco` como un observable.
 *
 * @returns Un `Observable` que emite el estado actual de `SolicitudPagoBancoState`.
 */
 getSolicitudPagoBancoState(): Observable<SolicitudPagoBancoState> {
     return this.query.selectSolicitud$;
   }


  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * @param DATOS - Objeto de tipo SolicitudPagoBancoState que contiene los datos a actualizar.
   * Este método actualiza el estado del formulario de pago de banco con los datos proporcionados.
   */
  actualizarEstadoFormulario(DATOS: SolicitudPagoBancoState): void {
    this.tramitePagoBancoStore.setClaveDeReferencia(DATOS.claveDeReferencia);
    this.tramitePagoBancoStore.setCadenaDependencia(DATOS.cadenaDependencia);
    this.tramitePagoBancoStore.setBanco(DATOS.banco);
    this.tramitePagoBancoStore.setllaveDePago(DATOS.llaveDePago);
    this.tramitePagoBancoStore.setFechaPago(DATOS.fechaPago);
    this.tramitePagoBancoStore.setImportePago(DATOS.importePago);
  }

  /**
   * Obtiene los datos de la tabla de Registro Toma Muestras Mercancías desde un archivo JSON local.
   * @returns Observable que emite un objeto SolicitudPagoBancoState.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<SolicitudPagoBancoState> {
    return this.http.get<SolicitudPagoBancoState>('assets/json/260501/registro_pago_banco.json');
  }
}
