import { BodyValidaAereo, BodyValidaFerro, ValidacionesTransporteResponse } from "../../../models/shared/validaciones-transporte.model";
import { catchError, map, Observable, throwError } from "rxjs";
import { API_CONSULTAR_VALIDACION } from "../../../constants/api-constants";
import { enviroment } from "../../../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

    /**
     * Petición a la API para validar el número BL de transporte ferroviario.
     * @param numeroBL: BodyValidarFerro - Número BL a validar
     * @returns Observable con la respuesta de la API
     */
    getValidaFerroviario(numeroBL: BodyValidaFerro): Observable<ValidacionesTransporteResponse> {
        const TIPO = 'ferro';
        const ENDPOINT = `${this.host}/${API_CONSULTAR_VALIDACION.replace('{tipoTransporte}', TIPO)}`;

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

    /**
     * Petición a la API para validar la guía master o la guía house de transporte aéreo.
     * @param numeroGuia: BodyValidarAereo - Número de guía a validar
     * @returns Observable con la respuesta de la API
     */
    getValidaAereo(numeroGuia: BodyValidaAereo): Observable<ValidacionesTransporteResponse> {
        const TIPO = 'aereo';
        const ENDPOINT = `${this.host}/${API_CONSULTAR_VALIDACION.replace('{tipoTransporte}', TIPO)}`;
        return this.http.post<ValidacionesTransporteResponse>(ENDPOINT, numeroGuia).pipe(
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