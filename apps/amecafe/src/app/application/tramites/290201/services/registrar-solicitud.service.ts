import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/tabla-model';

@Injectable({
  providedIn: 'root'
})
export class RegistrarSolicitudService {

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos de tipos.
   * @returns Observable con los datos del catálogo de tipos.
   */
  getTiposData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/tipos.json');
  }

  /**
   * Obtiene los datos de formas del café.
   * @returns Observable con los datos del catálogo de formas del café.
   */
  getFormasdelcafeData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/formadelcafe.json');
  }

  /**
   * Obtiene los datos de calidad.
   * @returns Observable con los datos del catálogo de calidad.
   */
  getCalidadData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/calidad.json');
  }

  /**
   * Obtiene los datos de procesos.
   * @returns Observable con los datos del catálogo de procesos.
   */
  getProcesosData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/procesos.json');
  }

  /**
   * Obtiene los datos de aduana de salida.
   * @returns Observable con los datos del catálogo de aduana de salida.
   */
  getAduanadesalidaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/adunadesalida.json');
  }

  /**
   * Obtiene los datos de entidad de procedencia.
   * @returns Observable con los datos del catálogo de entidad de procedencia.
   */
  getEntidadDeProcedenciaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/entidaddeprocedencia.json');
  }

  /**
   * Obtiene los datos del ciclo cafetalero.
   * @returns Observable con los datos del catálogo del ciclo cafetalero.
   */
  getCiclocafetaleroData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/ciclocafetalero.json');
  }

  /**
   * Obtiene los datos de envasado.
   * @returns Observable con los datos del catálogo de envasado.
   */
  getEnvasadoenData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/envasadoen.json');
  }

  /**
   * Obtiene los datos de uso del café.
   * @returns Observable con los datos del catálogo de uso del café.
   */
  getUtilicoCafeComoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/utilizocafecomo.json');
  }

  /**
   * Obtiene los datos del país de importación.
   * @returns Observable con los datos del catálogo de país de importación.
   */
  getPaisDeImportacionData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/paisdeimportacion.json');
  }

  /**
   * Obtiene los datos de fracción arancelaria.
   * @returns Observable con los datos del catálogo de fracción arancelaria.
   */
  getFraccionArancelariaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/fraccionarancelaria.json');
  }

  /**
   * Obtiene los datos de unidad de medida.
   * @returns Observable con los datos del catálogo de unidad de medida.
   */
  getUnidadDeMedidaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/unidaddemedida.json');
  }

  /**
   * Obtiene los datos del dólar.
   * @returns Observable con los datos del catálogo del dólar.
   */
  getDollarData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/dolardata.json');
  }

  /**
   * Obtiene los datos del medio de transporte.
   * @returns Observable con los datos del catálogo de medio de transporte.
   */
  getMediaDeTransporte(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/mediodetransporte.json');
  }

  /**
   * Obtiene los datos del país.
   * @returns Observable con los datos del catálogo de país.
   */
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/paisdeimportacion.json');
  }

  /**
   * Obtiene los datos de la solicitud.
   * @returns Observable con los datos de la solicitud.
   */
  getSolicitudData(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>('./assets/json/290201/solicitud.json');
  }
}