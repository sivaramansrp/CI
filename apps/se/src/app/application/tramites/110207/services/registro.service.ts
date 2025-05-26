import { ColumnasTabla, SeleccionadasTabla } from '../models/registro.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@ng-mf/data-access-user';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { inject } from '@angular/core';
import { APPINJECT } from 'apps/se/src/app/app.inject';


/**
 * Servicio para gestionar las solicitudes relacionadas con los catálogos y datos del trámite 110207.
 */
@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  private readonly appConfig = inject(APPINJECT);

  /**
   * URL base del servidor principal.
   */
  urlServer = this.appConfig.URL_SERVER;

  /**
   * URL base del servidor de catálogos auxiliares.
   */
  urlServerCatalogos = this.appConfig.URL_SERVER_JSON_AUXILIAR;

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(private http: HttpClient) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene el catálogo de tratados.
   * @returns Observable con la respuesta del catálogo de tratados.
   */
  getTratado() {
    return this.http.get<RespuestaCatalogos>('assets/json/110207/tratado.json');
  }

  /**
   * Obtiene el catálogo de países.
   * @returns Observable con la respuesta del catálogo de países.
   */
  getPais() {
    return this.http.get<RespuestaCatalogos>('assets/json/110207/pais.json');
  }

  /**
   * Obtiene el catálogo de idiomas.
   * @returns Observable con la respuesta del catálogo de idiomas.
   */
  getIdioma() {
    return this.http.get<RespuestaCatalogos>('assets/json/110207/idioma.json');
  }

  /**
   * Obtiene el catálogo de países de destino.
   * @returns Observable con la respuesta del catálogo de países de destino.
   */
  getPaisDestino() {
    return this.http.get<RespuestaCatalogos>('assets/json/110207/pais.json');
  }

  /**
   * Obtiene el catálogo de transportes.
   * @returns Observable con la respuesta del catálogo de transportes.
   */
  getTransporte() {
    return this.http.get<RespuestaCatalogos>('assets/json/110207/pais.json');
  }

  /**
   * Obtiene el catálogo de entidades.
   * @returns Observable con la respuesta del catálogo de entidades.
   */
  getEntidad() {
    return this.http.get<RespuestaCatalogos>('assets/json/110207/entidad.json');
  }

  /**
   * Obtiene el catálogo de representaciones.
   * @returns Observable con la respuesta del catálogo de representaciones.
   */
  getRepresentacion() {
    return this.http.get<RespuestaCatalogos>('assets/json/110207/entidad.json');
  }

  /**
   * Obtiene el catálogo de tipos de factura.
   * @returns Observable con la respuesta del catálogo de tipos de factura.
   */
  getTipoFactura() {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/110207/tipofactura.json'
    );
  }

  /**
   * Obtiene el catálogo de unidades de medida comercial (UMC).
   * @returns Observable con la respuesta del catálogo de UMC.
   */
  getUMC() {
    return this.http.get<RespuestaCatalogos>('assets/json/110207/umc.json');
  }

  /**
   * Obtiene el catálogo de unidades de medida.
   * @returns Observable con la respuesta del catálogo de unidades de medida.
   */
  getUnidadMedida() {
    return this.http.get<RespuestaCatalogos>('assets/json/110207/umc.json');
  }

  /**
   * Obtiene un catálogo específico por su identificador.
   * @param id Identificador del catálogo.
   * @returns Observable con la respuesta del catálogo solicitado.
   */
  getCatalogoById(id: number) {
    return this.http.get<JSONResponse>(`${this.urlServerCatalogos}/${id}`);
  }

 /**
   * Recupera la lista de "Registro de Solicitudes" desde un archivo JSON.
   *
   * @returns {Observable<ColumnasTabla[]>} Un observable que contiene un array de objetos RegistroDeSolicitudesTabla.
   *
   * @throws Lanzará un error si la solicitud HTTP falla.
   */
 public getSolicitudesTabla():Observable<ColumnasTabla[]> {
  return this.http.get<ColumnasTabla[]>('assets/json/110207/mercancia-disponsible.json').pipe(
    catchError((error) => {
      return throwError(() => error);
    })
  );
}
/**
   * Recupera la lista de "Datos de Solicitudes Seleccionadas" desde un archivo JSON.
   * @returns Observable con un array de objetos que representan las columnas de la tabla seleccionada.
   * @throws Lanzará un error si la solicitud HTTP falla.
   */
public getSolicitudesDataTabla():Observable<SeleccionadasTabla[]> {
  return this.http.get<SeleccionadasTabla[]>('assets/json/110207/mercancia-seleccionadas.json').pipe(
    catchError((error) => {
      return throwError(() => error);
    })
  );
}


}
