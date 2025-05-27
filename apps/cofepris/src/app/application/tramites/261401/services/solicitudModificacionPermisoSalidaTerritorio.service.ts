import { Catalogo } from '@libs/shared/data-access-user/src';
import { Destinatario } from '../enums/destinatario.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { TramiteAsociados } from '../../../shared/models/tramite-asociados.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudModificacionPermisoSalidaTerritorioService {
  /**
   * Lista de bancos disponibles para el pago de derechos.
   */
  banco: Catalogo[] = [];

  /**
   * Constructor del servicio.
   * Param http Cliente HTTP para realizar solicitudes a servicios externos.
   */
  constructor(private http: HttpClient) {
    // Constructor
  }

  /**
   * Obtiene la lista de destinatarios desde un archivo JSON.
   * Retorna un observable con la lista de destinatarios.
   */
  obtenerDestinatarioListo(): Observable<Destinatario[]> {
    return this.http
      .get<Destinatario[]>('../../../assets/json/261401/destinatario-mock.json')
      .pipe();
  }

  /**
   * Inicializa los datos de los catálogos necesarios para el pago de derechos.
   * Realiza una solicitud para obtener la lista de bancos.
   */
  inicializaPagoDeDerechosDatosCatalogos(): void {
    this.obtenerRespuestaPorUrl(this, 'banco', '/261401/banco.json');
  }

  /**
   * Realiza una solicitud HTTP para obtener datos desde una URL específica
   * y los asigna a una variable del servicio.
   * Param self Referencia al servicio actual.
   * Param variable Nombre de la variable donde se almacenarán los datos.
   * Param url URL del archivo JSON que contiene los datos.
   */
  obtenerRespuestaPorUrl(
    self: SolicitudModificacionPermisoSalidaTerritorioService,
    variable: keyof SolicitudModificacionPermisoSalidaTerritorioService,
    url: string
  ): void {
    if (self && variable && url) {
      this.http
        .get<RespuestaCatalogos>(`assets/json${url}`)
        .subscribe((resp): void => {
          (self[variable] as Catalogo[]) =
            resp?.code === 200 && resp.data ? resp.data : [];
        });
    }
  }

  /**
   * Obtiene la lista de trámites asociados desde un archivo JSON.
   * Retorna un observable con la lista de trámites asociados.
   */
  obtenerTramitesAsociados(): Observable<TramiteAsociados[]> {
    return this.http.get<TramiteAsociados[]>(
      'assets/json/261401/tramite-asociados.json'
    );
  }

  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/261401/pais.json');
  }
}