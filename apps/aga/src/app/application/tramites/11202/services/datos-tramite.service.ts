import { RespuestaConsulta, RespuestaContenedor } from '../models/datos-tramite.model';
import { Observable, of } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosTramiteService {
  private readonly url = './assets/json/11202/contenedor-mockdata.json';
  public uploadArchivo = DatosTramiteService.uploadArchivo;
  public submitSolicitud = DatosTramiteService.submitSolicitud;

  constructor(private http: HttpClient) {
    this.getAduanas();
    this.getContenedores();
    this.submitSolicitud();
    this.uploadArchivo();
  }
  /**
   * 
Obtenga una lista ficticia de Contenedores
   */
  getContenedores(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(this.url);
  }
  /**
   * Obtenga una lista ficticia de Aduanas
   */
  getAduanas(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(this.url);
  }

  /**
   * Simular carga de archivos
   */
  static uploadArchivo(archivo?: File): Observable<{ success: boolean; message: string }> {
    return of({
      success: true,
      message: `Archivo ${archivo?.name} cargado exitosamente`,
    });
  }

  /**
   * Simular un envío exitoso de formulario
   */
  static submitSolicitud(_solicitudData?: FormGroup): Observable<{ success: boolean; message: string }> {
    return of({ success: true, message: 'Solicitud enviada exitosamente' });
  }
  /**
   * @method getDatosTableData
   * @description Obtiene los datos de la tabla desde un archivo JSON local.
   * 
   * Este método realiza una solicitud HTTP GET para obtener los datos simulados desde el archivo `datosTabla.json`.
   * 
   * @returns {Observable<unknown[]>} Un observable que emite un arreglo con los datos de la tabla.
   */
  getDatosTableData(): Observable<unknown[]> {
    return this.http.get<unknown[]>(`assets/json/11202/datosTabla.json`);
  }
  /**
   * @method getDatosConsulta
   * @description Obtiene los datos de consulta desde un archivo JSON local.
   * 
   * Este método realiza una solicitud HTTP GET para obtener los datos de consulta simulados desde el archivo `consulta_11201.json`.
   * 
   * @returns {Observable<RespuestaConsulta>} Un observable que emite la respuesta de los datos de consulta.
   */
  getDatosConsulta(): Observable<RespuestaConsulta> {
    return this.http.get<RespuestaConsulta>(`assets/json/11202/consulta_11202.json`);
  }

  /**
   * Agrega una solicitud.
   * @returns Un observable con la respuesta del contenedor.
   */
  agregarSolicitud(): Observable<RespuestaContenedor> {
    return this.http.get<RespuestaContenedor>(`assets/json/11202/contenedorLista.json`);
  }
  
}
