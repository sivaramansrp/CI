import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { Catalogo, CatalogoResponse } from '@libs/shared/data-access-user/src';
import { ClaveModel, OpcionesPublicacion, SolicitudModel } from '../models/permiso-maquila.models';
import { ReprestantanteData } from '../../260605/models/aduaneras-informaciones.model';





@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  
  /**
   * Constructor del servicio SolicitudService.
   * @param http Cliente HTTP para realizar solicitudes a recursos externos.
   */
  constructor(private http: HttpClient) { }


  /**
   * Obtiene la lista de solicitudes desde un recurso externo.
   * @returns Un Observable que emite un arreglo de objetos de tipo SolicitudModel.
   */
  getSolicitudes(): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>('assets/json/260212/solicitud.json');
  }

  /**
   * Obtiene la lista de claves desde un recurso externo.
   * @returns Un Observable que emite un arreglo de objetos de tipo CatalogoResponse.
   */
  getClave(): Observable<CatalogoResponse[]> {
    return this.http.get<CatalogoResponse[]>('assets/json/260212/clave.json');
  }

  /**
   * Obtiene las opciones de publicación desde un recurso externo.
   * @returns Un Observable que emite un arreglo de objetos de tipo OpcionesPublicacion.
   */
  getOpcionesPublicacion(): Observable<OpcionesPublicacion[]> {
    return this.http.get<OpcionesPublicacion[]>('/assets/json/260212/opciones-de-radio.json')
  }

  /**
  /**
   * Obtiene el estado físico desde un recurso externo.
   * @returns Un Observable que emite un arreglo de objetos de tipo EstadoFisico.
   */
  getTestadoFisico(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/260212/estadoFisico.json')
  }

  /**
   * @method getClasificacionProducto
   * @description
   * Obtiene la clasificación de productos realizando una petición HTTP GET al archivo JSON local.
   * 
   * @returns Observable<[]> Un observable que emite la lista de clasificaciones de productos.
   */
   getClasificacionProducto(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('/assets/json/260212/clasificacionProducto.json')
  }

  /**
   * Recupera los datos de SCIAN desde un archivo JSON local.
   * @returns {Observable<ClaveModel[]>} Un observable con los datos de SCIAN.
  */
  getScianDatos(): Observable<ClaveModel[]> {
    return this.http.get<ClaveModel[]>('assets/json/260402/scianDatos.json');
   }

    /**
     * Recupera los DATOS del representante desde un archivo JSON local.
     *
     * Este método envía una solicitud HTTP GET para recuperar los DATOS del archivo JSON especificado.
     * Se espera que los DATOS sean del tipo `ReprestantanteData`.
     *
     * @returns {Observable<ReprestantanteData>} Un observable que emite los DATOS del representante obtenidos.
     * @throws Lanzará un error si la solicitud HTTP falla.
     * @memberof ModificatNoticeService
     */
    public ObtenerReprestantanteData(): Observable<ReprestantanteData> {
      return this.http
        .get<ReprestantanteData>('assets/json/260605/represtantante.json')
        .pipe(
          catchError((error) => {
            return throwError(() => error);
          })
        );
    }
 
}
