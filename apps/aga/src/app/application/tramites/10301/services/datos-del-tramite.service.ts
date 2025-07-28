import { Observable, catchError, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Solicitud10301State } from "../estados/tramite10301.store";

@Injectable({
  providedIn: 'root'
})
export class DatosDelTramiteService {
  /**
   * Constructor que inyecta el HttpClient para hacer peticiones HTTP.
   * @param http Cliente HTTP de Angular para realizar solicitudes.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos del trámite desde un archivo JSON local.
   * @returns Observable que emite el estado de la solicitud (Solicitud10301State).
   * En caso de error en la petición, se propaga el error usando throwError.
   */
  public getDatosDelTramite(): Observable<Solicitud10301State> {
    return this.http.get<Solicitud10301State>(
      'assets/json/10301/datos-del-tramite.json'
    ).pipe(
      // Captura cualquier error en la petición HTTP y lo reenvía.
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
