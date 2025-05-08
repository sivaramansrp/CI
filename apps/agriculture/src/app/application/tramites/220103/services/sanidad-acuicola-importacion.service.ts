import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { DatosDelTerceroDestinatario, Mercancia } from "../../220103/modelos/sanidad-acuicola-importacion.model";
import { Observable } from "rxjs";

import { Catalogo } from "@libs/shared/data-access-user/src";

@Injectable({
    providedIn: 'root'
})
export class SanidadAcuicolaImportacionService {

    constructor(private http: HttpClient) { }

    getMercancias(): Observable<Mercancia[]> {
        return this.http.get<Mercancia[]>('/assets/json/220103/mercancia.json');
    }
    getAdunaDeIngreso(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('/assets/json/220103/aduna-de-ingreso.json');
    }
    getMedioDeTransporte(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('/assets/json/220103/medio-de-transporte.json');
    }
    getPais(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('/assets/json/220103/pais.json');
    }
    getOrigen(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('/assets/json/220103/origen.json');
    }
    getUmc(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('/assets/json/220103/umc.json');
    }
    getUso(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('/assets/json/220103/uso.json');
    }

    getColonia(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('/assets/json/220103/colonia.json');
    }

    getDestinatario(): Observable<DatosDelTerceroDestinatario[]> {
        return this.http.get<DatosDelTerceroDestinatario[]>('/assets/json/220103/destinatario.json');
    }
}