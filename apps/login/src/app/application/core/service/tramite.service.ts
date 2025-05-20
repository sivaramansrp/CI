import { Observable, catchError, throwError } from 'rxjs';
import { CambioContrasena } from '../models/cambio-contrasena.model';
import { HttpClient } from '@angular/common/http';
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

}