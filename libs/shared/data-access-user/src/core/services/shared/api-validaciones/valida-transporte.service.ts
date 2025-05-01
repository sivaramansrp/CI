import { enviroment } from "../../../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { BodyValidaFerro, ValidacionesTransporteResponse } from "../../../models/shared/validaciones-transporte.model";
import { API_CONSULTAR_VALIDACION } from "../../../constants/api-constants";

@Injectable({
    providedIn: 'root',
})

export class ValidaTransporteService {
    /**
     * Host de la API
     */
    private readonly host: string;

    constructor(private http: HttpClient) {
        this.host = `${enviroment.API_HOST}/api`;
    }

    getValidaFerroviario(tipo: string, numeroBL: BodyValidaFerro): Observable<ValidacionesTransporteResponse> {
        const ENDPOINT = `${this.host}/${API_CONSULTAR_VALIDACION.replace('{tipoTransporte}', tipo)}`;

        return this.http.post<ValidacionesTransporteResponse>(ENDPOINT, numeroBL).pipe(
            map((response) => {
                return response;
            }),
            catchError(() => {
                const ERROR = new Error(`Ocurrió un error al devolver la información ${ENDPOINT} `);
                return throwError(() => ERROR);
            })
        );
    }
}