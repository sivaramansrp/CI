import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Capturista } from '../models/capturista.model';
import { ConsultaRegistro } from '../models/consulta-registro.model';
import { Injectable } from '@angular/core';

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
    consultaDatosPorRFCoCURP(rfc?: string): Observable<ConsultaRegistro> {
        let params = new HttpParams();
        if (rfc) {
            params = params.set('rfc', rfc);
        }
        return this.http.get<ConsultaRegistro>(`/assets/json/login/consulta-registro.json`, { params });
    }

    /**
    * Consulta un capturista por RFC o CURP.
    * Realiza una petición GET para obtener la lista de capturistas y busca el primero que coincida
    * con el RFC o CURP proporcionados. Si no se proporciona ningún parámetro, retorna el primer capturista.
    *
    * @param rfc RFC del capturista (opcional).
    * @param curp CURP del capturista (opcional).
    * @returns Observable con el capturista encontrado o undefined si no existe coincidencia.
    */
    consultaCapturista(rfc?: string, curp?: string): Observable<Capturista | undefined> {
        return this.http.get<Capturista[]>(`/assets/json/login/lista-capturista.json`).pipe(
            map((capturistas) => {
                return capturistas.find(c =>
                    (rfc ? c.rfc === rfc : true) &&
                    (curp ? c.curp === curp : true)
                );
            })
        );
    }

}