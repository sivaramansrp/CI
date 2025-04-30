import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "@libs/shared/data-access-user/src";
import { CertificacionResponse } from "../../models/5701/Certificacion.model";
import { catchError, map, Observable, throwError } from "rxjs";
import { API_CERTIFICACION, RFC_QUERY } from "../../../shared/constants/api-constants";

@Injectable({
    providedIn: 'root',
})
export class CertificacionService {
    private readonly host: string;

    constructor(private http: HttpClient) {
        this.host = `${enviroment.API_HOST}/api/`;
    }

    getCertificacion(rfc: string): Observable<CertificacionResponse> {
        const ENDPOINT = `${this.host}${API_CERTIFICACION.replace(RFC_QUERY, rfc)}`;
        return this.http.get<CertificacionResponse>(ENDPOINT).pipe(
            map(
                (response) => {
                    return response;
                }),
            catchError(() => {
                const ERROR = new Error(`Ocurrió un error al devolver la información ${ENDPOINT} `);
                return throwError(() => ERROR);
            })
        );
    }
}