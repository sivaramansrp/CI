import { AutorizacionProsecStore, ProsecState } from '../estados/autorizacion-prosec.store';
import { Catalogo, RespuestaCatalogos, SeccionLibStore } from '@ng-mf/data-access-user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';





@Injectable({
  providedIn: 'root'
})
export class ProsecService {
  url: string = '../../../../../assets/json/90101/';

  constructor(private readonly http: HttpClient,private store: AutorizacionProsecStore, private seccionStore: SeccionLibStore) { }
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

  obtenerTablaDatos<T>(fileName: string): Observable<T[]> {
    const JSONURL = this.url + fileName;
      return this.http.get<T[]>(JSONURL);
  }

  /**
   * @description Obtiene los datos de acuicultura desde un archivo JSON local.
   * @returns Observable con los datos de acuicultura.
   */
  public getAcuiculturaData(): Observable<ProsecState> {
    return this.http.get<ProsecState>('assets/json/220203/autorizacion-prosec.json');
  }

  /**
   * @description Actualiza el estado completo del formulario en el store de acuicultura.
   * @param DATOS Objeto de tipo Acuicultura con los datos a actualizar.
   */
  public actualizarEstadoFormulario(DATOS: ProsecState): void {
    this.store.setModalidad(DATOS.modalidad);
    this.store.setEstado(DATOS.Estado);
    this.store.setRepresentacionFederal(DATOS.RepresentacionFederal);
    this.store.setActividadProductiva(DATOS.ActividadProductiva);
    this.store.setSector(DATOS.Sector);
    this.store.setFraccionArancelaria(DATOS.Fraccion_arancelaria);
    this.store.setcontribuyentes(DATOS.contribuyentes);

  }

  public formValida(): void {
    if(this.store.getValue().domiciliosFormaValida &&
       this.store.getValue().productorFromValida &&
       this.store.getValue().sectoresFromValida) {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true])
    }
  }
}