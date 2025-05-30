import { HttpClient, HttpParams } from '@angular/common/http';
import { ConsultaRegistro } from '../models/consuta-registro.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para operaciones relacionadas con trámites de usuario.
 * Proporciona métodos para interactuar con la API de cambio de contraseña.
 */
@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    /**
     * Constructor que inyecta el cliente HTTP de Angular.
     * @param http Cliente HTTP para realizar peticiones a la API.
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Consulta los datos de un usuario por RFC o CURP.
     * Realiza una petición GET a la API para obtener la información del usuario.
     * 
     * @param rfc RFC del usuario (opcional).
     * @param curp CURP del usuario (opcional).
     * @returns Observable con los datos del registro consultado.
     */
    consultaDatosPorRFCoCURP(rfc?: string, curp?: string): Observable<ConsultaRegistro> {
        let params = new HttpParams();
        if (rfc) {
            params = params.set('rfc', rfc);
        }
        if (curp) {
            params = params.set('curp', curp);
        }
        return this.http.get<ConsultaRegistro>(`/assets/json/login/consulta-registro.json`, { params });
    }
}