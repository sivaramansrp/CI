import { Observable, catchError, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Solicitud10301State } from "../estados/tramite10301.store";

@Injectable({
  providedIn: 'root'
})
export class DatosDelTramiteService {
    constructor(private http: HttpClient) { }
    public getDatosDelTramite(): Observable<Solicitud10301State> {
        return this.http.get<Solicitud10301State>(
            'assets/json/10301/datos-del-tramite.json'
        ).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }
}
