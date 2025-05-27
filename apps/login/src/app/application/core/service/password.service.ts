import { Observable, catchError, throwError } from 'rxjs';
import { CambioContrasena } from '../models/cambio-contrasena.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio para operaciones relacionadas con trámites de usuario.
 * Proporciona métodos para interactuar con la API de cambio de contraseña.
 */
@Injectable({
    providedIn: 'root'
})
export class PasswordService {
    /**
     * Constructor que inyecta el cliente HTTP de Angular.
     * @param http Cliente HTTP para realizar peticiones a la API.
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Realiza la petición para cambiar la contraseña del usuario.
     * @param model Objeto con los datos necesarios para el cambio de contraseña.
     * @returns Observable<boolean> que emite true si el cambio fue exitoso, o un error en caso contrario.
     */
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