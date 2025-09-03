import { API_GET_DOCUMENTOS130118, API_GET_DOCUMENTOS_OBLIGATORIOS, TRAMITE } from "../../../servers/api-router";
import { CatalogoDocumentosResponse, ParametrosGetDocumentos } from "../../../models/shared/anexar-documentos.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, catchError, map, throwError } from "rxjs";
import { ENVIRONMENT } from "../../../../enviroments/enviroment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class CatalogoDocumentosService {
    private readonly host: string;

    constructor(
        private http: HttpClient,
    ) {
        this.host = `${ENVIRONMENT.API_HOST}/api`;
    }

    getDocumentosObligatorios(tramite: string, params: ParametrosGetDocumentos): Observable<CatalogoDocumentosResponse> {
        const ENDPOINT = `${this.host}/${API_GET_DOCUMENTOS_OBLIGATORIOS.replace(TRAMITE, tramite)}`;

        return this.http.get<CatalogoDocumentosResponse>(ENDPOINT, {
            params: {
                especifico: params.especifico,
            }
        }).pipe(
            map((response) => {
                return response;
            }),
            catchError(() => {
                const ERROR = new Error(`Ocurrió un error al devolver la información ${ENDPOINT} `);
                return throwError(() => ERROR);
            })
        )
    }

    /**
     * Obtiene los documentos de la solicitud 130118.
     * @param especifico Indica si se deben obtener documentos específicos.
     * @param idSolicitud ID de la solicitud (opcional).
     * @returns Observable con la respuesta del catálogo de documentos.
     */
    getDocumentosSolicitud130118(especifico: boolean, idSolicitud?: number): Observable<CatalogoDocumentosResponse> {
        let params = new HttpParams().set('especifico', String(especifico));

        if (idSolicitud) {
            params = params.set('idSolicitud', idSolicitud);
        }

        const URL = `${this.host}/${API_GET_DOCUMENTOS130118}`;

        return this.http.get<CatalogoDocumentosResponse>(URL, { params }).pipe(
            map((response) => response),
            catchError((error) => {
                console.error('Error en getDocumentosSolicitud:', error);
                return throwError(() => new Error('Error al obtener documentos'));
            })
        );
    }


}
