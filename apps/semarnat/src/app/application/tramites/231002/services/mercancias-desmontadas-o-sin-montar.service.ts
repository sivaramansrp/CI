import { Observable, throwError } from 'rxjs';
import { AvisoOpcionesDeRadio } from '../models/aviso-catalogo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { DatoSolicitudStore } from '../estados/tramites/dato-solicitud.store';
import { EstadoDatoSolicitud } from '../models/datos-solicitud.model';

/**
 * Servicio para gestionar la obtención de datos relacionados con
 * el aviso del catálogo, la operación de importación y los requisitos obligatorios.
 */
@Injectable({
  providedIn: 'root',
})
export class MercanciasDesmontadasOSinMontarService {
  /**
   * Constructor del servicio MercanciasDesmontadasOSinMontarService.
   * @param http Instancia de HttpClient para realizar peticiones HTTP.
   */
  constructor(private http: HttpClient, private datoSolicitudStore: DatoSolicitudStore) {}

  /**
   * Obtiene los datos de las opciones de radio desde un archivo JSON localizado en assets.
   *
   * @returns Observable que emite los datos del tipo AvisoOpcionesDeRadio.
   */
  obtenerAvisoOpcionesDeRadio(): Observable<AvisoOpcionesDeRadio> {
    return this.http
      .get<AvisoOpcionesDeRadio>('assets/json/231002/aviso-opciones-de-radio.json')
      .pipe(
        catchError((error) => throwError(() => error))
      );
  }

  actualizarEstadoFormulario(DATOS: EstadoDatoSolicitud): void {
    this.datoSolicitudStore.actualizarSolicitudForm(DATOS.solicitudForm);
    this.datoSolicitudStore.actualizarEmpresaReciclaje(DATOS.empresaReciclaje);
    this.datoSolicitudStore.actualizarLugarReciclaje(DATOS.lugarReciclaje);
    this.datoSolicitudStore.actualizarEmpresaTransportista(DATOS.empresaTransportista);
    this.datoSolicitudStore.actualizarPrecaucionesManejo(DATOS.precaucionesManejo);
  }

  /**
   * Obtiene los datos iniciales de la solicitud desde un archivo JSON local.
   * @returns Observable con el estado inicial de los datos de la solicitud.
   */
  obtenerDatosSolicitudInicial(): Observable<EstadoDatoSolicitud> {
    return this.http.get<EstadoDatoSolicitud>('assets/json/231002/inicializar-formulario-datos.json');
  }

  /**
   * Obtiene los datos completos del formulario (incluyendo residuos) desde un archivo JSON local.
   * @returns Observable con el estado completo de los datos de la solicitud.
   */
  obtenerDatosCompletosFormulario(): Observable<EstadoDatoSolicitud> {
    return this.http.get<EstadoDatoSolicitud>('assets/json/231002/inicializar-formulario-datos-residuos.json');
  }
}
