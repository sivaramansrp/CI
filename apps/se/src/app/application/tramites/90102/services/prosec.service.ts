import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutorizacionProsecStore, ProsecState } from '../estados/autorizacion-prosec.store';

@Injectable({
  providedIn: 'root'
})
export class ProsecService {
  url: string = '../../../../../assets/json/90101/';
  url2: string = '../../../../../assets/json/90102/';

  constructor(private readonly http: HttpClient, 
  private autorizacionProsecStore : AutorizacionProsecStore) { }
  /**
   * Obtiene la lista de bancos.
   * @returns Observable de la lista de bancos.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }

  obtenerTablaDatos(fileName: string): Observable<Record<string, unknown>[]> {
    const JSON_URL = this.url2 + fileName;
    return this.http.get<Record<string, unknown>[]>(JSON_URL);
  }
      /**
   * Método para actualizar el estado del formulario con los datos proporcionados.
   * @param DATOS - Objeto que contiene el estado del trámite.
   */
  actualizarEstadoFormulario(DATOS: ProsecState): void {
    this.autorizacionProsecStore.setModalidad(DATOS.modalidad);
    this.autorizacionProsecStore.setEstado(DATOS.Estado);
    this.autorizacionProsecStore.setRepresentacionFederal(DATOS.RepresentacionFederal);
    this.autorizacionProsecStore.setActividadProductiva(DATOS.ActividadProductiva);
    this.autorizacionProsecStore.setSector(DATOS.Sector);
    this.autorizacionProsecStore.setFraccionArancelaria(DATOS.Fraccion_arancelaria);
    this.autorizacionProsecStore.setcontribuyentes(DATOS.contribuyentes);
    this.autorizacionProsecStore.setFormaValida(DATOS.formaValida);
  }

  /**
   * Método para obtener los datos del registro de toma de muestras de mercancías.
   * @returns Observable que emite el estado del trámite.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<ProsecState> {
    return this.http.get<ProsecState>('assets/json/90102/registro_toma_muestras_mercancias.json');
  }
}