import {
  Catalogo,
  Destinatario,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src';
import { Fabricante, ManifiestosRespuesta } from '../model/solicitud-permiso.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScianData } from '../../../shared/models/datos-modificacion.model';
import { TramiteAsociados } from '../../../shared/models/tramite-asociados.model';

/**
 * Servicio que gestiona las operaciones relacionadas con la solicitud de permiso.
 * Proporciona métodos para obtener datos de destinatarios, fabricantes, manifiestos, SCIAN y otros catálogos necesarios para el trámite.
 */
@Injectable({
  providedIn: 'root',
})
export class SolicitudPermisoService {
  /**
   * Lista de bancos obtenidos desde un archivo JSON.
   */
  banco!: Catalogo[];

  /**
   * Constructor del servicio.
   * Inicializa el cliente HTTP para realizar solicitudes.
   * http Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los trámites asociados desde un archivo JSON.
   * Devuelve un observable con la lista de trámites asociados.
   */
  obtenerTramitesAsociados(): Observable<TramiteAsociados[]> {
    return this.http.get<TramiteAsociados[]>(
      'assets/json/260703/tramite-asociados.json'
    );
  }

  /**
   * Obtiene los datos de los destinatarios desde un archivo JSON.
   * Devuelve un observable con la lista de destinatarios.
   */
  obtenerDatosDestinatarios(): Observable<Destinatario[]> {
    return this.http.get<Destinatario[]>(
      'assets/json/260703/destinatario.json'
    );
  }

  /**
   * Obtiene los datos de los fabricantes desde un archivo JSON.
   * Devuelve un observable con la lista de fabricantes.
   */
  obtenerDatosFabricantes(): Observable<Fabricante[]> {
    return this.http.get<Fabricante[]>('assets/json/260703/fabricante.json');
  }

  /**
   * Inicializa los datos de los catálogos relacionados con el pago de derechos.
   * Realiza una solicitud HTTP para obtener los datos de los bancos.
   */
  inicializaPagoDeDerechosDatosCatalogos(): void {
    this.obtenerRespuestaPorUrl(this, 'banco', '/260703/banco.json');
  }

  /**
   * Obtiene los datos de los manifiestos desde un archivo JSON.
   * Devuelve un observable con la lista de manifiestos.
   */
  getManifiestos(): Observable<ManifiestosRespuesta> {
    return this.http.get<ManifiestosRespuesta>(
      'assets/json/260703/manifiestos.json'
    );
  }

  /**
   * Obtiene los datos de SCIAN desde un archivo JSON.
   * Devuelve un observable con la lista de datos SCIAN.
   */
  obtenerScianData(): Observable<ScianData[]> {
    return this.http.get<ScianData[]>('assets/json/260703/scian.json');
  }

  /**
   * Obtiene una respuesta desde una URL y asigna los datos a una variable.
   * self El objeto que contiene la variable donde se almacenarán los datos de la respuesta.
   * variable El nombre de la variable donde se almacenarán los datos de la respuesta.
   * url La URL desde la cual se obtendrá la respuesta.
   *
   * Si la variable y la URL son válidas, se realiza una solicitud HTTP GET a la URL especificada.
   * Si la respuesta tiene un código 200 y contiene datos, estos se asignan a la variable especificada.
   * Si la variable o la URL no son válidas, se asigna un arreglo vacío a la variable.
   */
  obtenerRespuestaPorUrl(
    self: SolicitudPermisoService,
    variable: keyof SolicitudPermisoService,
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
}