import { Catalogo } from '@libs/shared/data-access-user/src';
import { Destinatario } from '../enums/destinatario.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos} from '@libs/shared/data-access-user/src';
import { TramiteAsociados } from '../../../shared/models/tramite-asociados.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudModificacionPermisoSalidaTerritorioService {
  banco: Catalogo[] = [];
  constructor(private http: HttpClient) { 
    // Constructor
  }
  obtenerDestinatarioListo(): Observable<Destinatario[]> {
    return this.http
      .get<Destinatario[]>('../../../assets/json/261401/destinatario-mock.json')
      .pipe();
  }

  inicializaPagoDeDerechosDatosCatalogos(): void {
    this.obtenerRespuestaPorUrl(this, 'banco', '/261401/banco.json');
  }
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

  obtenerTramitesAsociados(): Observable<TramiteAsociados[]> {
    return this.http.get<TramiteAsociados[]>(
      'assets/json/261401/tramite-asociados.json'
    );
  }
}
