import { API_GET_DOCUMENTOS_OBLIGATORIOS, TRAMITE } from "../../../constants/api-constants";
import { CatalogoDocumentosResponse, ParametrosGetDocumentos } from "../../../models/shared/anexar-documentos.model";
import { Observable, catchError, map, throwError } from "rxjs";
import { ENVIRONMENT } from "../../../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
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



}
