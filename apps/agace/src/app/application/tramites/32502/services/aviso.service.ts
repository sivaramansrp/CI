import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Solicitud32502State } from '../../../estados/tramites/tramite32502.store';
import { Tramite32502Store } from '../../../estados/tramites/tramite32502.store';

@Injectable({
  providedIn: 'any'
})
export class AvisoService {

  constructor(
    private http: HttpClient,public tramite32502Store: Tramite32502Store,
  ) {
    //
   }

  getFraccionArancelariaCatalogo(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/32502/fraccion-arancelaria-catalogo.json');
  }

  getFraccionReglaCatalogo(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/32502/fraccion-regla-catalogo.json');
  }

  getTipoDocumento(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/32502/tipoDocumento.json');
  }

    /**
     * Obtiene los datos del estado de la solicitud desde un archivo JSON.
     * @returns Observable con el estado de la solicitud.
     */
    obtenerDatosEstado(): Observable<Solicitud32502State> {
      return this.http.get<Solicitud32502State>('assets/json/32502/datos.json');
    }
    /**
     * Establece los datos del estado de la solicitud en el store.
     * @param datos Datos del estado de la solicitud.
     */
    establecerDatosEstado(datos: Solicitud32502State): void {
      this.tramite32502Store.establecerDatos({ ...datos });
    }

}
