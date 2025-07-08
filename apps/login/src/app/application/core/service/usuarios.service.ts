import { Observable, map } from 'rxjs';
import { Capturista } from '../models/capturista.model';
import { ConsultaRegistro } from '../models/consuta-registro.model';
import { HttpClient } from '@angular/common/http';
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
    consultaNotificadores(rfc: string): Observable<ConsultaRegistro | undefined> {
        return this.http.get<ConsultaRegistro[]>(`/assets/json/login/consulta-notificadores.json`).pipe(
            map((capturistas) => {
                return capturistas.find(c =>
                    (rfc ? c.rfc === rfc : true)
                );
            })
        );
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

    /**
 * Simula el guardado de la aceptación de condiciones de uso.
 * Envía los datos de firma y aceptación a un endpoint simulado y retorna un booleano.
 * 
 * @param firma Cadena con la firma electrónica del usuario.
 * @param aceptoCondiciones Booleano que indica si el usuario aceptó las condiciones de uso.
 * @returns Observable<boolean> indicando si la operación fue exitosa.
 */
    aceptaCondicionesUso(firma: string, aceptoCondiciones: boolean): Observable<boolean> {
        return this.http.get<{ success: boolean }>(
            'assets/json/login/guardar-condiciones-uso.json'
        ).pipe(
            map(response => response.success)
        );
    }


}