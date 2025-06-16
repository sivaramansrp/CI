import { Catalogo, ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { Solicitud31803State, Tramite31803Store } from '../state/Tramite31803.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar las operaciones relacionadas con la solicitud del trámite 31803.
 * Proporciona métodos para obtener datos necesarios desde fuentes externas.
 */
@Injectable({
  providedIn: 'root',
})
export class RegistroSolicitudService {

  /**
    * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
    */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
   * Constructor del servicio.
   * Se utiliza para la inyección de dependencias.
   *
   * @param http Cliente HTTP para realizar solicitudes a servicios externos.
   */
  constructor(
    private http: HttpClient,
    private tramite31803Store: Tramite31803Store, // Asumiendo que este es un servicio relacionado con el trámite 31803
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

/**
   * Actualiza el estado del formulario en el store con los datos proporcionados.
   * @param DATOS Objeto con los datos del formulario de tipo Solicitud10301State.
   */

  public actualizarEstadoFormulario(DATOS: Solicitud31803State): void {
    this.tramite31803Store.setBanco(DATOS.banco ?? []);
    this.tramite31803Store.setNumeroOperacion(DATOS.numeroOperacion);
    this.tramite31803Store.setLlave(DATOS.llave);
    this.tramite31803Store.setManifiesto1(DATOS.manifiesto1);
    this.tramite31803Store.setManifiesto2(DATOS.manifiesto2);
    this.tramite31803Store.setFechaPago(DATOS.fechaPago);
  }

  /**
   * Obtiene los datos del catálogo de bancos.
   * Realiza una solicitud HTTP para obtener la lista de bancos desde un archivo JSON.
   *
   * @returns Un observable que emite una lista de objetos de tipo `Catalogo`.
   */
  obtenerDatosBanco(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/31803/banco.json');
  }

/**
 * Obtiene los datos de la solicitud desde un archivo JSON.
 * Realiza una solicitud HTTP para obtener un arreglo de objetos de tipo `Catalogo`
 * desde el archivo 'solicitud-banco.json'.
 *
 * @returns Un observable que emite una lista de objetos de tipo `Catalogo`.
 */
getSolicitudDatos(): Observable<Catalogo[]> {
  return this.http.get<Catalogo[]>('assets/json/31803/solicitud-banco.json');
}
}
