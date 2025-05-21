import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CambioContrasena } from '../models/cambio-contrasena.model';
import { ConsultaRegistro } from '../models/consuta-registro.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TramiteService {
    constructor(private http: HttpClient) {
    }

    cambioContrasena(model: CambioContrasena): Observable<boolean> {
        return this.http.post<boolean>(
            `/assets/json/login/cambio-contrasena.json`,
            model
        ).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    consultaDatosPorRFCoCURP(rfc?: string, curp?: string): Observable<ConsultaRegistro> {
        let params = new HttpParams();
        if (rfc) {
            params = params.set('rfc', rfc);
        }

        if (curp) {
            params = params.set('curp', curp);
        }
        return this.http.get<ConsultaRegistro>(`/assets/json/funcionario/consulta-registro.json`, { params });
    }

}