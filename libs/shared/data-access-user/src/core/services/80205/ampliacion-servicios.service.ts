import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * Servicio para la ampliación de servicios.
 * Este servicio se encarga de realizar las peticiones HTTP relacionadas con la ampliación de servicios.
 * @service AmpliacionServiciosService
 */
@Injectable({
  providedIn: 'root',
})
export class AmpliacionServiciosService {
    constructor(private readonly http: HttpClient) {}

    /**
     * Obtiene los datos de ampliación de servicios desde un archivo JSON.
     * @method getDatos
     * @returns {Observable<any>} - Observable con los datos obtenidos.
     */
    getDatos(){
        return this.http.get("assets/json/80205/ampliacion-servicios.json");
    }
    obtenerIngresoSelectList(){
        return this.http.get("assets/json/80205/ampliacion-IMMEX-dropdown.json");
    }
}