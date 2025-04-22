import { DatosDeLaTabla, RespuestaContenedor, RespuestaTramite } from '../models/datos-tramite.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsultaAvisoAcreditacionService {

  public selectedRowSource = new Subject<DatosDeLaTabla>();
  formData$ = this.selectedRowSource.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de documentos a partir de un catálogo especificado.
   *
   * Esta función realiza una petición HTTP GET para obtener un archivo JSON
   * ubicado en la ruta `assets/json/31501/` correspondiente al nombre del catálogo.
   *
   * @param catalogo - El nombre del archivo de catálogo (sin la extensión .json) que se desea cargar.
   * @returns Un Observable que emite la respuesta del trámite (`RespuestaTramite`) con los datos del catálogo.
   */
  getListaDeDocumentos(catalogo: string): Observable<RespuestaTramite> {
    return this.http.get<RespuestaTramite>(
      `assets/json/32101/${catalogo}.json`
    );
  }

    getDatosDeTabla(tabla: string): Observable<RespuestaContenedor> {
    return this.http.get<RespuestaContenedor>(
      `assets/json/32101/${tabla}.json`
    );
  }

  setUpdatedRow(row: DatosDeLaTabla): void {
    this.selectedRowSource.next(row);
  }
}
