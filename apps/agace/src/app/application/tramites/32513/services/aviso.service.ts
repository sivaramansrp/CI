import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RespuestaCatalogos } from "@libs/shared/data-access-user/src";

/**
 * Servicio Injectable para gestionar las operaciones relacionadas con los datos del trámite.
 */
@Injectable({
  providedIn: 'any',
})
export class AvisoService {
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a la API.
   */
  constructor(
    private http: HttpClient
    // eslint-disable-next-line no-empty-function
  ) {}

  sendResultNotification(resultado: File) {
    return this.http.get(`assets/json/32513/emailNotification.json`);
  }

}
