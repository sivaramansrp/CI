import { Solicitud10301State, Tramite10301Store } from '../estados/tramite10301.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class Solicitud10301Service {
    /**
     * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
     */
    urlServer = ENVIRONMENT.URL_SERVER;
    urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

    constructor(private http: HttpClient, private tramite10301Store: Tramite10301Store,) {
        // Lógica de inicialización si es necesario
    }

    actualizarEstadoFormulario(DATOS: Solicitud10301State): void {
        this.tramite10301Store.setTipoMercancia(DATOS.tipoMercancia);
        this.tramite10301Store.setUsoEspecifico(DATOS.usoEspecifico);
        this.tramite10301Store.setMarca(DATOS.marca);
        this.tramite10301Store.setModelo(DATOS.modelo);
        this.tramite10301Store.setSerie(DATOS.serie);
        this.tramite10301Store.setCalle(DATOS.calle);
        this.tramite10301Store.setNumeroExterior(DATOS.numeroExterior);
        this.tramite10301Store.setNumeroInterior(DATOS.numeroInterior);
        this.tramite10301Store.setTelefono(DATOS.telefono);
        this.tramite10301Store.setCorreoElectronico(DATOS.correoElectronico);
        this.tramite10301Store.setCodigoPostal(DATOS.codigoPostal);
        this.tramite10301Store.setEstado(DATOS.estado);
        this.tramite10301Store.setColonia(DATOS.colonia);
        this.tramite10301Store.setOpcion(DATOS.opcion);
    }

    public getDatosDeTrtamitelDoc(): Observable<Solicitud10301State> {
        return this.http.get<Solicitud10301State>(
            'assets/json/10301/datos-del-tramite.json'
        );
    }
}