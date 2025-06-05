import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Solicitud220502State, Solicitud220502Store } from '../../../220502/estados/tramites220502.store';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

/**
 * Servicio para gestionar las operaciones relacionadas con SAGARPA.
 */
@Injectable({
  providedIn: 'root'
})
export class SagarpaService {

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes.
   */
  constructor(
    private http: HttpClient,
    private solicitud220502Store: Solicitud220502Store,
  ) { }

  /**
   * Método para obtener los medios de transporte.
   * @returns Observable con la respuesta de los catálogos de medios de transporte.
   */
  getMediodetransporte(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/medio-transporte.json');
  }

  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * @param DATOS Datos de la solicitud que se utilizarán para actualizar el estado del formulario.
   * @returns {void}
   */
  actualizarEstadoFormulario(DATOS: Solicitud220502State): void {
    this.solicitud220502Store.setNombre(DATOS.nombre);
    this.solicitud220502Store.setPrimerapellido(DATOS.primerapellido);
    this.solicitud220502Store.setSegundoapellido(DATOS.segundoapellido);
    this.solicitud220502Store.setMercancia(DATOS.mercancia);
    this.solicitud220502Store.setTipocontenedor(DATOS.tipocontenedor);
    this.solicitud220502Store.setCertificadosAutorizados(DATOS.certificadosAutorizados);
    this.solicitud220502Store.setHoraDeInspeccion(DATOS.horaDeInspeccion);
    this.solicitud220502Store.setAduanaDeIngreso(DATOS.aduanaDeIngreso);
    this.solicitud220502Store.setFechaDeInspeccion(DATOS.fechaDeInspeccion);
    this.solicitud220502Store.setSanidadAgropecuaria(DATOS.sanidadAgropecuaria);
    this.solicitud220502Store.setPuntoDeInspeccion(DATOS.puntoDeInspeccion);
  }

  /**
   * Método para obtener los datos de registro de toma de muestras de mercancías.
   * @returns Observable con los datos del registro de toma de muestras de mercancías.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<any> {
    return this.http.get<any>('assets/json/220501/registro_toma_muestras_mercancias.json');
  }
}
